settings.wordpicture = false;
settings.enableMap = false;
var start_lang = "nob";

settings.hitsPerPageDefault = 10;
settings.hitsPerPageValues = [10, 25, 50, 75, 100, 500, 1000];

korpApp.controller("SearchCtrl", function (
  $rootScope,
  $scope,
  $controller,
  $location
) {
  // resolve globalFilterDef since globalFilter-directive is not used
  $rootScope.globalFilterDef.resolve();

  $controller(window.SearchCtrl, { $scope: $scope });
  $scope.visibleTabs = [false, true, false, false];
  $scope.extendedTmpl = "modes/parallel_extended_tmpl.html";

  $scope.corpusChangeListener(); // remove prev listener
  $scope.$on("reduceattrupdate", function () {
    $scope.statCurrentAttrs = settings.corpusListing.getStatsAttributeGroups(
      settings.corpusListing.getReduceLang()
    );
    $scope.statSelectedAttrs = $location.search().stats_reduce.split(",");
    insensitiveAttrs = $location.search().stats_reduce_insensitive;
    if (insensitiveAttrs)
      $scope.statInsensitiveAttrs = insensitiveAttrs.split(",");
  });

  $scope.settings = settings;
  $scope.showStatistics = true;
  $scope.showStats = function () {
    return settings.statistics != false;
  };
});

function parseLocationLangs() {
  try {
    var langs = _(location.hash.split("?")[1].split("&"))
      .invoke("split", "=")
      .object()
      .value()
      ["parallel_corpora"].split(",");
  } catch (e) {
    return ["nob"];
  }
  c.log("lang", langs);
  if (langs.length) return langs;
  else return ["nob"];
}

korpApp.controller("ParallelSearch", function (
  $scope,
  $location,
  $rootScope,
  $timeout,
  searches
) {
  var s = $scope;
  s.negates = [];

  if ($location.search().parallel_corpora)
    s.langs = _.map($location.search().parallel_corpora.split(","), function (
      lang
    ) {
      var obj = { lang: lang };
      if (locationSearch()["cqp_" + lang])
        obj.cqp = locationSearch()["cqp_" + lang];
      return obj;
    });
  else s.langs = [{ lang: "nob" }];
  s.negChange = function () {
    $location.search("search", null);
  };

  var onLangChange = function () {
    c.log("ParallelSearch language change");
    var currentLangList = _.pluck(s.langs, "lang");
    settings.corpusListing.setActiveLangs(currentLangList);
    $location.search("parallel_corpora", currentLangList.join(","));
    var struct = settings.corpusListing.getLinksFromLangs(currentLangList);
    function getLangMapping(excludeLangs) {
      return _(struct)
        .flatten()
        .filter(function (item) {
          return !_.contains(excludeLangs, item.lang);
        })
        .groupBy("lang")
        .value();
    }

    try {
      var output = CQP.expandOperators(s.langs[0].cqp);
    } catch (e) {
      c.log("parallel cqp parsing error", e);
      return;
    }
    output += _.map(s.langs.slice(1), function (langobj, i) {
      var neg = s.negates[i + 1] ? "!" : "";
      var langMapping = getLangMapping(currentLangList.slice(0, i + 1));
      var linkedCorpus = _(langMapping[langobj.lang])
        .pluck("id")
        .invoke("toUpperCase")
        .join("|");

      try {
        var expanded = CQP.expandOperators(langobj.cqp);
      } catch (e) {
        c.log("parallel cqp parsing error", e);
        return;
      }
      return ":LINKED_CORPUS:" + linkedCorpus + " " + neg + " " + expanded;
    }).join("");

    _.each(s.langs, function (langobj, i) {
      locationSearch("cqp_" + langobj.lang, langobj.cqp);
    });
    $rootScope.extendedCQP = output;
    s.$broadcast("corpuschooserchange");
    $rootScope.$broadcast("reduceattrupdate");
    searches.langDef.resolve();
    return output;
  };
  s.$watch(
    "langs",
    function () {
      onLangChange();
    },
    true
  );

  s.onSubmit = function () {
    $location.search("search", null);
    $timeout(function () {
      // $location.search("search", "cqp|" + onLangChange())
      util.searchHash("cqp", onLangChange());
      c.log("onLangChange", onLangChange());
    }, 300); // <--
    // TODO: this is a little hacky.
    // if changed, look at ng-model-option debounce value as well
  };

  s.keydown = function ($event) {
    if ($event.keyCode == 13) {
      // enter
      // _.defer()
      var current = $(".arg_value:focus");
      c.log("current", current);
      if (current.length) {
        $timeout(function () {
          s.onSubmit();
        }, 0);
      }
    }
  };

  enabledLangsHelper = function (lang) {
    return _(settings.corpusListing.getLinksFromLangs([lang]))
      .flatten()
      .pluck("lang")
      .unique()
      .value();
  };

  s.getEnabledLangs = function (i) {
    if (i === 0) {
      if (!s.langs[0].lang) {
        s.langs[0].lang = start_lang;
      }
      return enabledLangsHelper(start_lang);
    }
    var currentLangList = _.pluck(s.langs, "lang");
    delete currentLangList[i];
    var firstlang;
    if (s.langs.length) firstlang = s.langs[0].lang;
    var other = enabledLangsHelper(firstlang || start_lang);
    var langResult = _.difference(other, currentLangList);
    if (s.langs[i] && !s.langs[i].lang) {
      s.langs[i].lang = langResult[0];
    }
    return langResult;
  };

  s.addLangRow = function () {
    s.langs.push({ lang: s.getEnabledLangs()[0] });
  };
  s.removeLangRow = function (i) {
    s.langs.pop();
  };
});

var c3 = view.KWICResults.prototype.constructor;
view.KWICResults = Subclass(
  view.KWICResults,
  function () {
    c3.apply(this, arguments);
    this.selected = [];
  },
  {
    selectWord: function (word, scope, sentence) {
      // c.log ("word, scope, sentence", word, scope, sentence)
      c3.prototype.selectWord.apply(this, arguments);
      this.clearLinks();
      var self = this;
      var obj = scope.wd;

      if (!obj.linkref) return;

      var corpus = settings.corpusListing.get(sentence.corpus);

      function findRef(ref, sentence) {
        var out = null;
        _.each(sentence, function (word) {
          if (word.linkref == ref.toString()) {
            out = word;
            return false;
          }
        });
        return out;
      }

      if (sentence.isLinked) {
        // a secondary language was clicked
        var sent_index = scope.$parent.$index;
        // c.log ("sent_index", sent_index)
        var data = this.getActiveData();
        var mainSent = null;
        while (data[sent_index]) {
          var sent = data[sent_index];
          if (!sent.isLinked) {
            mainSent = sent;
            break;
          }
          sent_index--;
        }

        // c.log( "mainSent", mainSent)
        var linkNum = Number(obj.linkref);
        var lang = corpus.id.split("-")[1];
        var mainCorpus = mainSent.corpus.split("-")[0];

        _.each(mainSent.tokens, function (token) {
          var refs = _.map(
            _.compact(token["wordlink-" + lang].split("|")),
            Number
          );
          if (_.contains(refs, linkNum)) {
            token._link_selected = true;
            self.selected.push(token);
          }
        });
      } else {
        var links = _.pick(obj, function (val, key) {
          return _.str.startsWith(key, "wordlink");
        });
        _.each(links, function (val, key) {
          var wordsToLink = _.each(_.compact(val.split("|")), function (num) {
            var lang = key.split("-")[1];
            var mainCorpus = corpus.id.split("-")[0];

            var link = findRef(num, sentence.aligned[mainCorpus + "-" + lang]);
            link._link_selected = true;
            self.selected.push(link);
          });
        });
      }
      safeApply($("body").scope(), $.noop);
    },

    clearLinks: function () {
      _.each(this.selected, function (word) {
        delete word._link_selected;
      });
      this.selected = [];
    },
  }
);

var superType = model.StatsProxy.prototype.constructor;
model.StatsProxy = Subclass(
  model.StatsProxy,
  function () {
    superType.apply(this, arguments);
  },
  {
    makeParameters: function (reduceVals, cqp, ignoreCase) {
      params = superType.prototype.makeParameters.apply(this, arguments);

      params.within = settings.corpusListing
        .getAttributeQuery("within")
        .replace(/\|.*?:/g, ":");

      return params;
    },
  }
);

// model.StatsProxy.prototype.makeRequest = function(){};

settings.primaryColor = "#FFF3D8";
settings.primaryLight = "#FFF9EE";

var context = {
  defaultAligned: {
    "1 link": "1 link",
  },
};

settings.defaultOverviewContext = "1 link";
settings.defaultReadingContext = "1 link";

settings.defaultWithin = { link: "link" };

settings.corporafolders = {};

settings.corporafolders.nob2sme = {
  title: "Norwegian-North Saami parallel texts",
  //contents: ["nob2sme_20131127-nob"]
  contents: [
    "nob2sme_admin_20191210-nob",
    "nob2sme_bible_20191210-nob",
    "nob2sme_facta_20191210-nob",
    "nob2sme_science_20191210-nob",
    "nob2sme_laws_20191210-nob",
    "nob2sme_mixed_20191210-nob",
  ],
  //description: "xxx"
};

settings.corporafolders.nob2sma = {
  title: "Norwegian-South Saami parallel texts",
  contents: [
    "nob2sma_admin_20190926-nob",
    "nob2sma_bible_20190926-nob",
    "nob2sma_science_20190926-nob",
    "nob2sma_facta_20190926-nob",
  ],
  //description: "xxx"
};

settings.corporafolders.nob2smj = {
  title: "Norwegian-Lule Saami parallel texts",
  contents: ["nob2smj_admin_20210929-nob", "nob2smj_facta_20210929-nob"],
  //description: "xxx"
};

settings.corpora = {};

//////////////////////////
//corporafolders.nob2sme//
//////////////////////////

settings.corpora["nob2sme_admin_20191210-nob"] = {
  id: "nob2sme_admin_20191210-nob",
  lang: "nob",
  linkedTo: ["nob2sme_admin_20191210-sme"],
  pivot: true,
  title: "Norwegian-North Saami administrative corpus",
  context: context.defaultAligned,
  within: {
    linksme: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
  },
  structAttributes: {
    //text_de_title : {label : "title"},
    //            //text_o_lang : {label : "origlang"},
    //                        //text_author : {label : "author"},
  },
};

settings.corpora["nob2sme_admin_20191210-sme"] = {
  id: "nob2sme_admin_20191210-sme",
  lang: "sme",
  linkedTo: ["nob2sme_admin_20191210-nob"],
  title: "Norwegian-North Saami administrative corpus",
  context: {
    "1 link": "1 link",
  },
  within: {
    link: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
  },
  structAttributes: {},
  hide: true,
};

settings.corpora["nob2sme_bible_20191210-nob"] = {
  id: "nob2sme_bible_20191210-nob",
  lang: "nob",
  linkedTo: ["nob2sme_bible_20191210-sme"],
  pivot: true,
  title: "Norwegian-North Saami religion parallel corpus",
  context: context.defaultAligned,
  within: {
    linksme: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora["nob2sme_bible_20191210-sme"] = {
  id: "nob2sme_bible_20191210-sme",
  lang: "sme",
  linkedTo: ["nob2sme_bible_20191210-nob"],
  title: "Norwegian-North Saami religion parallel corpus",
  context: {
    "1 link": "1 link",
  },
  within: {
    link: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
    msd: attrs.msd,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
  hide: true,
};

settings.corpora["nob2sme_facta_20191210-nob"] = {
  id: "nob2sme_facta_20191210-nob",
  lang: "nob",
  linkedTo: ["nob2sme_facta_20191210-sme"],
  pivot: true,
  title: "Norwegian-North Saami non-fiction parallel corpus",
  context: context.defaultAligned,
  within: {
    linksme: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora["nob2sme_facta_20191210-sme"] = {
  id: "nob2sme_facta_20191210-sme",
  lang: "sme",
  linkedTo: ["nob2sme_facta_20191210-nob"],
  title: "Norwegian-North Saami non-fiction parallel corpus",
  context: {
    "1 link": "1 link",
  },
  within: {
    link: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
    msd: attrs.msd,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
  hide: true,
};

settings.corpora["nob2sme_laws_20191210-nob"] = {
  id: "nob2sme_laws_20191210-nob",
  lang: "nob",
  linkedTo: ["nob2sme_laws_20191210-sme"],
  pivot: true,
  title: "Norwegian-North Saami legislative parallel corpus",
  context: context.defaultAligned,
  within: {
    linksme: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora["nob2sme_laws_20191210-sme"] = {
  id: "nob2sme_laws_20191210-sme",
  lang: "sme",
  linkedTo: ["nob2sme_laws_20191210-nob"],
  title: "Norwegian-North Saami legislative parallel corpus",
  context: {
    "1 link": "1 link",
  },
  within: {
    link: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
    msd: attrs.msd,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
  hide: true,
};

settings.corpora["nob2sme_science_20191210-nob"] = {
  id: "nob2sme_science_20191210-nob",
  lang: "nob",
  linkedTo: ["nob2sme_science_20191210-sme"],
  pivot: true,
  title: "Norwegian-North Saami science parallel corpus",
  context: context.defaultAligned,
  within: {
    linksme: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora["nob2sme_science_20191210-sme"] = {
  id: "nob2sme_science_20191210-sme",
  lang: "sme",
  linkedTo: ["nob2sme_science_20191210-nob"],
  title: "Norwegian-North Saami science parallel corpus",
  context: {
    "1 link": "1 link",
  },
  within: {
    link: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
    msd: attrs.msd,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
  hide: true,
};

settings.corpora["nob2sme_mixed_20191210-nob"] = {
  id: "nob2sme_mixed_20191210-nob",
  lang: "nob",
  linkedTo: ["nob2sme_mixed_20191210-sme"],
  pivot: true,
  title: "Norwegian-North Saami mixed parallel corpus from 2012 and before",
  context: context.defaultAligned,
  within: {
    linksme: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora["nob2sme_mixed_20191210-sme"] = {
  id: "nob2sme_mixed_20191210-sme",
  lang: "sme",
  linkedTo: ["nob2sme_mixed_20191210-nob"],
  title: "Norwegian-North Saami mixed parallel corpus from 2012 and before",
  context: {
    "1 link": "1 link",
  },
  within: {
    link: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
    msd: attrs.msd,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
  hide: true,
};

//////////////////////////
//corporafolders.nob2sma//
//////////////////////////
settings.corpora["nob2sma_admin_20190926-nob"] = {
  id: "nob2sma_admin_20190926-nob",
  lang: "nob",
  linkedTo: ["nob2sma_admin_20190926-sma"],
  pivot: true,
  title: "Norwegian-South Saami administrative parallel corpus",
  context: context.defaultAligned,
  within: {
    linksma: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora["nob2sma_admin_20190926-sma"] = {
  id: "nob2sma_admin_20190926-sma",
  lang: "sma",
  linkedTo: ["nob2sma_admin_20190926-nob"],
  title: "Norwegian-South Saami administrative parallel corpus",
  context: {
    "1 link": "1 link",
  },
  within: {
    link: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
    msd: attrs.msd,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
  hide: true,
};

settings.corpora["nob2sma_bible_20190926-nob"] = {
  id: "nob2sma_bible_20190926-nob",
  lang: "nob",
  linkedTo: ["nob2sma_bible_20190926-sma"],
  pivot: true,
  title: "Norwegian-South Saami religion parallel corpus",
  context: context.defaultAligned,
  within: {
    linksma: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora["nob2sma_bible_20190926-sma"] = {
  id: "nob2sma_bible_20190926-sma",
  lang: "sma",
  linkedTo: ["nob2sma_bible_20190926-nob"],
  title: "Norwegian-South Saami religion parallel corpus",
  context: {
    "1 link": "1 link",
  },
  within: {
    link: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
    msd: attrs.msd,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
  hide: true,
};

settings.corpora["nob2sma_facta_20190926-nob"] = {
  id: "nob2sma_facta_20190926-nob",
  lang: "nob",
  linkedTo: ["nob2sma_facta_20190926-sma"],
  pivot: true,
  title: "Norwegian-South Saami non-fiction parallel corpus",
  context: context.defaultAligned,
  within: {
    linksma: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora["nob2sma_facta_20190926-sma"] = {
  id: "nob2sma_facta_20190926-sma",
  lang: "sma",
  linkedTo: ["nob2sma_facta_20190926-nob"],
  title: "Norwegian-South Saami non-fiction parallel corpus",
  context: {
    "1 link": "1 link",
  },
  within: {
    link: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
    msd: attrs.msd,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
  hide: true,
};

settings.corpora["nob2sma_science_20190926-nob"] = {
  id: "nob2sma_science_20190926-nob",
  lang: "nob",
  linkedTo: ["nob2sma_science_20190926-sma"],
  pivot: true,
  title: "Norwegian-South Saami science parallel corpus",
  context: context.defaultAligned,
  within: {
    linksma: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora["nob2sma_science_20190926-sma"] = {
  id: "nob2sma_science_20190926-sma",
  lang: "sma",
  linkedTo: ["nob2sma_science_20190926-nob"],
  title: "Norwegian-South Saami science parallel corpus",
  context: {
    "1 link": "1 link",
  },
  within: {
    link: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
    msd: attrs.msd,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
  hide: true,
};

//////////////////////////
//corporafolders.nob2smj//
//////////////////////////
settings.corpora["nob2smj_admin_20210929-nob"] = {
  id: "nob2smj_admin_20210929-nob",
  lang: "nob",
  linkedTo: ["nob2smj_admin_20210929-smj"],
  pivot: true,
  title: "Norwegian-Lule Saami administrative parallel corpus",
  context: context.defaultAligned,
  within: {
    linksmj: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora["nob2smj_admin_20210929-smj"] = {
  id: "nob2smj_admin_20210929-smj",
  lang: "smj",
  linkedTo: ["nob2smj_admin_20210929-nob"],
  title: "Norwegian-Lule Saami administrative parallel corpus",
  context: {
    "1 link": "1 link",
  },
  within: {
    link: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
    msd: attrs.msd,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
  hide: true,
};

settings.corpora["nob2smj_facta_20210929-nob"] = {
  id: "nob2smj_facta_20210929-nob",
  lang: "nob",
  linkedTo: ["nob2smj_facta_20210929-smj"],
  pivot: true,
  title: "Norwegian-Lule Saami non-fiction parallel corpus",
  context: context.defaultAligned,
  within: {
    linksmj: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora["nob2smj_facta_20210929-smj"] = {
  id: "nob2smj_facta_20210929-smj",
  lang: "smj",
  linkedTo: ["nob2smj_facta_20210929-nob"],
  title: "Norwegian-Lule Saami non-fiction parallel corpus",
  context: {
    "1 link": "1 link",
  },
  within: {
    link: "meningspar",
  },
  attributes: {
    pos: attrs.pos,
    lemma: attrs.baseform,
    msd: attrs.msd,
  },
  structAttributes: {
    text_gt_domain: { label: "domain" },
  },
  hide: true,
};

window.cl = settings.corpusListing = new ParallelCorpusListing(
  settings.corpora,
  parseLocationLangs()
);
delete ParallelCorpusListing;
delete context;
