(function() {
  var BaseResults,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  BaseResults = (function() {
    function BaseResults(resultSelector, tabSelector, scope) {
      var def;
      this.s = scope;
      this.$tab = $(tabSelector);
      this.$result = $(resultSelector);
      this.optionWidget = $("#search_options");
      this.$result.add(this.$tab).addClass("not_loading");
      this.injector = $("body").injector();
      def = this.injector.get("$q").defer();
      this.firstResultDef = def;
    }

    BaseResults.prototype.onProgress = function(progressObj) {
      return safeApply(this.s, (function(_this) {
        return function() {
          _this.s.$parent.progress = Math.round(progressObj["stats"]);
          return _this.s.hits_display = util.prettyNumbers(progressObj["total_results"]);
        };
      })(this));
    };

    BaseResults.prototype.abort = function() {
      this.ignoreAbort = false;
      return this.proxy.abort();
    };

    BaseResults.prototype.getSearchTabs = function() {
      return $(".search_tabs > ul").scope().tabs;
    };

    BaseResults.prototype.getResultTabs = function() {
      return $(".result_tabs > ul").scope().tabs;
    };

    BaseResults.prototype.renderResult = function(data) {
      this.$result.find(".error_msg").remove();
      if (data.ERROR) {
        safeApply(this.s, (function(_this) {
          return function() {
            return _this.firstResultDef.reject();
          };
        })(this));
        this.resultError(data);
        return false;
      } else {
        return safeApply(this.s, (function(_this) {
          return function() {
            c.log("firstResultDef.resolve");
            _this.firstResultDef.resolve();
            return _this.hasData = true;
          };
        })(this));
      }
    };

    BaseResults.prototype.resultError = function(data) {
      c.error("json fetch error: ", data);
      this.hidePreloader();
      this.resetView();
      return $('<object class="korp_fail" type="image/svg+xml" data="img/korp_fail.svg">').append("<img class='korp_fail' src='img/korp_fail.svg'>").add($("<div class='fail_text' />").localeKey("fail_text")).addClass("inline_block").prependTo(this.$result).wrapAll("<div class='error_msg'>");
    };

    BaseResults.prototype.showPreloader = function() {
      return this.s.$parent.loading = true;
    };

    BaseResults.prototype.hidePreloader = function() {
      return this.s.$parent.loading = false;
    };

    BaseResults.prototype.resetView = function() {
      this.hasData = false;
      return this.$result.find(".error_msg").remove();
    };

    BaseResults.prototype.countCorpora = function() {
      var ref;
      return (ref = this.proxy.prevParams) != null ? ref.corpus.split(",").length : void 0;
    };

    BaseResults.prototype.onentry = function() {
      this.s.$root.jsonUrl = null;
      return this.firstResultDef.promise.then((function(_this) {
        return function() {
          var ref;
          c.log("firstResultDef.then", _this.isActive());
          if (_this.isActive()) {
            return _this.s.$root.jsonUrl = (ref = _this.proxy) != null ? ref.prevUrl : void 0;
          }
        };
      })(this));
    };

    BaseResults.prototype.onexit = function() {
      return this.s.$root.jsonUrl = null;
    };

    BaseResults.prototype.isActive = function() {
      var ref;
      return !!((ref = this.getResultTabs()[this.tabindex]) != null ? ref.active : void 0);
    };

    return BaseResults;

  })();

  view.KWICResults = (function(superClass) {
    extend(KWICResults, superClass);

    function KWICResults(tabSelector, resultSelector, scope) {
      var self;
      self = this;
      this.prevCQP = null;
      KWICResults.__super__.constructor.call(this, tabSelector, resultSelector, scope);
      window.kwicProxy = new model.KWICProxy();
      this.proxy = kwicProxy;
      this.readingProxy = new model.KWICProxy();
      this.current_page = search().page || 0;
      this.tabindex = 0;
      this.s = scope;
      this.selectionManager = scope.selectionManager;
      this.setupReadingHash();
      this.$result.click((function(_this) {
        return function() {
          if (!_this.selectionManager.hasSelected()) {
            return;
          }
          _this.selectionManager.deselect();
          return safeApply(_this.s.$root, function(s) {
            return s.$root.word_selected = null;
          });
        };
      })(this));
      $(document).keydown($.proxy(this.onKeydown, this));
      this.$result.on("click", ".word", (function(_this) {
        return function(event) {
          return _this.onWordClick(event);
        };
      })(this));
    }

    KWICResults.prototype.setupReadingHash = function() {
      return this.s.setupReadingHash();
    };

    KWICResults.prototype.onWordClick = function(event) {
      var obj, scope, sent, word;
      c.log("wordclick", this.tabindex, this.s);
      if (this.isActive()) {
        this.s.$root.sidebar_visible = true;
      }
      scope = $(event.currentTarget).scope();
      obj = scope.wd;
      sent = scope.sentence;
      event.stopPropagation();
      word = $(event.target);
      if ($("#sidebar").data().korpSidebar != null) {
        $("#sidebar").sidebar("updateContent", sent.structs, obj, sent.corpus.toLowerCase(), sent.tokens);
      }
      return this.selectWord(word, scope, sent);
    };

    KWICResults.prototype.selectWord = function(word, scope) {
      var aux, i, l, obj, paragraph, querySentStart, sent_start;
      obj = scope.wd;
      if (obj.dephead == null) {
        scope.selectionManager.select(word, null);
        safeApply(this.s.$root, function(s) {
          return s.$root.word_selected = word;
        });
        return;
      }
      i = Number(obj.dephead);
      paragraph = word.closest(".sentence").find(".word");
      sent_start = 0;
      querySentStart = ".open_sentence";
      if (word.is(querySentStart)) {
        sent_start = paragraph.index(word);
      } else {
        l = paragraph.filter(function(__, item) {
          return $(item).is(word) || $(item).is(querySentStart);
        });
        sent_start = paragraph.index(l.eq(l.index(word) - 1));
        c.log("i", l.index(word), i, sent_start);
      }
      aux = $(paragraph.get(sent_start + i - 1));
      scope.selectionManager.select(word, aux);
      return safeApply(this.s.$root, function(s) {
        return s.$root.word_selected = word;
      });
    };

    KWICResults.prototype.resetView = function() {
      return KWICResults.__super__.resetView.call(this);
    };

    KWICResults.prototype.getProxy = function() {
      return this.proxy;
    };

    KWICResults.prototype.isReadingMode = function() {
      return this.s.reading_mode;
    };

    KWICResults.prototype.onentry = function() {
      KWICResults.__super__.onentry.call(this);
      c.log("onentry kwic");
      this.s.$root.sidebar_visible = true;
      this.$result.find(".token_selected").click();
      _.defer((function(_this) {
        return function() {
          return _this.centerScrollbar();
        };
      })(this));
    };

    KWICResults.prototype.onexit = function() {
      KWICResults.__super__.onexit.call(this);
      c.log("onexit kwic");
      this.s.$root.sidebar_visible = false;
    };

    KWICResults.prototype.onKeydown = function(event) {
      var isSpecialKeyDown, next;
      isSpecialKeyDown = event.shiftKey || event.ctrlKey || event.metaKey;
      if (isSpecialKeyDown || $("input, textarea, select").is(":focus") || !this.$result.is(":visible")) {
        return;
      }
      switch (event.which) {
        case 78:
          safeApply(this.s, (function(_this) {
            return function() {
              _this.s.$parent.page++;
              return _this.s.$parent.pageObj.pager = _this.s.$parent.page + 1;
            };
          })(this));
          return false;
        case 70:
          safeApply(this.s, (function(_this) {
            return function() {
              _this.s.$parent.page--;
              return _this.s.$parent.pageObj.pager = _this.s.$parent.page + 1;
            };
          })(this));
          return false;
      }
      if (!this.selectionManager.hasSelected()) {
        return;
      }
      switch (event.which) {
        case 38:
          next = this.selectUp();
          break;
        case 39:
          next = this.selectNext();
          break;
        case 37:
          next = this.selectPrev();
          break;
        case 40:
          next = this.selectDown();
      }
      if (next) {
        this.scrollToShowWord($(next));
      }
      return false;
    };

    KWICResults.prototype.getPageInterval = function(page) {
      var items_per_page, output;
      items_per_page = Number(this.s.$root._searchOpts.hits_per_page) || settings.hits_per_page_default;
      page = Number(page);
      output = {};
      output.start = (page || 0) * items_per_page;
      output.end = (output.start + items_per_page) - 1;
      return output;
    };

    KWICResults.prototype.renderCompleteResult = function(data) {
      c.log("renderCompleteResult", data);
      this.current_page = search().page || 0;
      safeApply(this.s, (function(_this) {
        return function() {
          _this.hidePreloader();
          _this.s.hits = data.hits;
          return _this.s.hits_display = util.prettyNumbers(data.hits);
        };
      })(this));
      if (!data.hits) {
        c.log("no kwic results");
        this.showNoResults();
        return;
      }
      this.$result.removeClass("zero_results");
      return this.renderHitsPicture(data);
    };

    KWICResults.prototype.renderResult = function(data) {
      var firstWord, isReading, k, len, linked, mainrow, offset, ref, resultError, scrollLeft;
      c.log("data", data, this.proxy.prevUrl);
      resultError = KWICResults.__super__.renderResult.call(this, data);
      if (resultError === false) {
        return;
      }
      if (!data.kwic) {
        data.kwic = [];
      }
      c.log("corpus_results");
      isReading = this.isReadingMode();
      if (this.isActive()) {
        this.s.$root.jsonUrl = this.proxy.prevUrl;
      }
      this.s.$apply((function(_this) {
        return function($scope) {
          c.log("apply kwic search data", data);
          if (isReading) {
            $scope.setContextData(data);
            _this.selectionManager.deselect();
            _this.s.$root.word_selected = null;
          } else {
            $scope.setKwicData(data);
          }
          return setTimeout(function() {
            return safeApply(_this.s, function() {
              return _this.s.gotFirstKwic = true;
            });
          }, 0);
        };
      })(this));
      if (currentMode === "parallel" && !isReading) {
        scrollLeft = $(".table_scrollarea", this.$result).scrollLeft() || 0;
        ref = $(".table_scrollarea > .kwic .linked_sentence");
        for (k = 0, len = ref.length; k < len; k++) {
          linked = ref[k];
          mainrow = $(linked).prev();
          if (!mainrow.length) {
            continue;
          }
          firstWord = mainrow.find(".left .word:first");
          if (!firstWord.length) {
            firstWord = mainrow.find(".match .word:first");
          }
          offset = (firstWord.position().left + scrollLeft) - 25;
          $(linked).find(".lnk").css("padding-left", Math.round(offset));
        }
      }
      this.$result.localize();
      this.centerScrollbar();
      if (!this.selectionManager.hasSelected() && !isReading) {
        return this.$result.find(".match").children().first().click();
      }
    };

    KWICResults.prototype.showNoResults = function() {
      this.hidePreloader();
      this.$result.addClass("zero_results").click();
      return this.$result.find(".hits_picture").html("");
    };

    KWICResults.prototype.renderHitsPicture = function(data) {
      var index, items;
      items = _.map(data.corpus_order, function(obj) {
        return {
          "rid": obj,
          "rtitle": settings.corpusListing.getTitle(obj.toLowerCase()),
          "relative": data.corpus_hits[obj] / data.hits,
          "abs": data.corpus_hits[obj]
        };
      });
      items = _.filter(items, function(item) {
        return item.abs > 0;
      });
      index = 0;
      _.each(items, (function(_this) {
        return function(obj) {
          obj.page = Math.floor(index / _this.proxy.prevMisc.hitsPerPage);
          return index += obj.abs;
        };
      })(this));
      return this.s.$apply(function($scope) {
        return $scope.hitsPictureData = items;
      });
    };

    KWICResults.prototype.scrollToShowWord = function(word) {
      var area, newX, newY, offset, wordLeft, wordTop;
      if (!word.length) {
        return;
      }
      offset = 200;
      wordTop = word.offset().top;
      newY = window.scrollY;
      if (wordTop > $(window).height() + window.scrollY) {
        newY += offset;
      } else {
        if (wordTop < window.scrollY) {
          newY -= offset;
        }
      }
      $("html, body").stop(true, true).animate({
        scrollTop: newY
      });
      wordLeft = word.offset().left;
      area = this.$result.find(".table_scrollarea");
      newX = Number(area.scrollLeft());
      if (wordLeft > (area.offset().left + area.width())) {
        newX += offset;
      } else {
        if (wordLeft < area.offset().left) {
          newX -= offset;
        }
      }
      return area.stop(true, true).animate({
        scrollLeft: newX
      });
    };

    KWICResults.prototype.buildQueryOptions = function(cqp, isPaging) {
      var getSortParams, opts;
      c.log("buildQueryOptions", cqp);
      opts = {};
      getSortParams = function() {
        var rnd, sort;
        sort = search().sort;
        if (!sort) {
          return {};
        }
        if (sort === "random") {
          if (search().random_seed) {
            rnd = search().random_seed;
          } else {
            rnd = Math.ceil(Math.random() * 10000000);
            search({
              random_seed: rnd
            });
          }
          return {
            sort: sort,
            random_seed: rnd
          };
        }
        return {
          sort: sort
        };
      };
      opts.ajaxParams = {
        command: "query",
        corpus: settings.corpusListing.stringifySelected(),
        cqp: cqp || this.proxy.prevCQP,
        queryData: this.proxy.queryData ? this.proxy.queryData : void 0,
        context: this.isReadingMode() || currentMode === "parallel" ? settings.corpusListing.getContextQueryString() : void 0,
        within: search().within ? settings.corpusListing.getWithinQueryString() : void 0,
        incremental: !isPaging && $.support.ajaxProgress
      };
      _.extend(opts.ajaxParams, getSortParams());
      return opts;
    };

    KWICResults.prototype.makeRequest = function(cqp, isPaging) {
      var isReading, page, params, progressCallback, req;
      c.log("kwicResults.makeRequest", cqp, isPaging);
      page = Number(search().page) || 0;
      if (this.hasInitialized == null) {
        c.log("not init set page", page + 1);
        this.s.$parent.pageObj.pager = page + 1;
      } else if (!isPaging) {
        this.s.gotFirstKwic = false;
        this.s.$parent.pageObj.pager = 0;
        c.log("not isPaging page reset");
      }
      if (this.hasInitialized == null) {
        this.hasInitialized = false;
      }
      this.showPreloader();
      this.s.aborted = false;
      if (this.proxy.hasPending()) {
        this.ignoreAbort = true;
      } else {
        this.ignoreAbort = false;
      }
      isReading = this.isReadingMode();
      params = this.buildQueryOptions(cqp, isPaging);
      progressCallback = !params.ajaxParams.incremental ? $.noop : $.proxy(this.onProgress, this);
      req = this.getProxy().makeRequest(params, page, progressCallback, (function(_this) {
        return function(data) {
          return _this.renderResult(data);
        };
      })(this));
      req.success((function(_this) {
        return function(data) {
          _this.hidePreloader();
          return _this.renderCompleteResult(data);
        };
      })(this));
      return req.fail((function(_this) {
        return function(jqXHR, status, errorThrown) {
          c.log("kwic fail");
          if (_this.ignoreAbort) {
            c.log("stats ignoreabort");
            return;
          }
          if (status === "abort") {
            return safeApply(_this.s, function() {
              _this.hidePreloader();
              return _this.s.aborted = true;
            });
          }
        };
      })(this));
    };

    KWICResults.prototype.getActiveData = function() {
      if (this.isReadingMode()) {
        return this.s.contextKwic;
      } else {
        return this.s.kwic;
      }
    };

    KWICResults.prototype.centerScrollbar = function() {
      var area, m, match, sidebarWidth;
      m = this.$result.find(".match:first");
      if (!m.length) {
        return;
      }
      area = this.$result.find(".table_scrollarea").scrollLeft(0);
      match = m.first().position().left + m.width() / 2;
      sidebarWidth = $("#sidebar").outerWidth() || 0;
      area.stop(true, true).scrollLeft(match - ($("body").innerWidth() - sidebarWidth) / 2);
    };

    KWICResults.prototype.getCurrentRow = function() {
      var tr;
      tr = this.$result.find(".token_selected").closest("tr");
      if (this.$result.find(".token_selected").parent().is("td")) {
        return tr.find("td > .word");
      } else {
        return tr.find("div > .word");
      }
    };

    KWICResults.prototype.selectNext = function() {
      var i, next;
      if (!this.isReadingMode()) {
        i = this.getCurrentRow().index(this.$result.find(".token_selected").get(0));
        next = this.getCurrentRow().get(i + 1);
        if (next == null) {
          return;
        }
        $(next).click();
      } else {
        next = this.$result.find(".token_selected").next().click();
      }
      return next;
    };

    KWICResults.prototype.selectPrev = function() {
      var i, prev;
      if (!this.isReadingMode()) {
        i = this.getCurrentRow().index(this.$result.find(".token_selected").get(0));
        if (i === 0) {
          return;
        }
        prev = this.getCurrentRow().get(i - 1);
        $(prev).click();
      } else {
        prev = this.$result.find(".token_selected").prev().click();
      }
      return prev;
    };

    KWICResults.prototype.selectUp = function() {
      var current, def, prevMatch, searchwords;
      current = this.selectionManager.selected;
      if (!this.isReadingMode()) {
        prevMatch = this.getWordAt(current.offset().left + current.width() / 2, current.closest("tr").prevAll(".not_corpus_info").first());
        prevMatch.click();
      } else {
        searchwords = current.prevAll(".word").get().concat(current.closest(".not_corpus_info").prevAll(".not_corpus_info").first().find(".word").get().reverse());
        def = current.parent().prev().find(".word:last");
        prevMatch = this.getFirstAtCoor(current.offset().left + current.width() / 2, $(searchwords), def).click();
      }
      return prevMatch;
    };

    KWICResults.prototype.selectDown = function() {
      var current, def, nextMatch, searchwords;
      current = this.selectionManager.selected;
      if (!this.isReadingMode()) {
        nextMatch = this.getWordAt(current.offset().left + current.width() / 2, current.closest("tr").nextAll(".not_corpus_info").first());
        nextMatch.click();
      } else {
        searchwords = current.nextAll(".word").add(current.closest(".not_corpus_info").nextAll(".not_corpus_info").first().find(".word"));
        def = current.parent().next().find(".word:first");
        nextMatch = this.getFirstAtCoor(current.offset().left + current.width() / 2, searchwords, def).click();
      }
      return nextMatch;
    };

    KWICResults.prototype.getFirstAtCoor = function(xCoor, wds, default_word) {
      var output;
      output = null;
      wds.each(function(i, item) {
        var thisLeft, thisRight;
        thisLeft = $(this).offset().left;
        thisRight = $(this).offset().left + $(this).width();
        if (xCoor > thisLeft && xCoor < thisRight) {
          output = $(this);
          return false;
        }
      });
      return output || default_word;
    };

    KWICResults.prototype.getWordAt = function(xCoor, $row) {
      var output;
      output = $();
      $row.find(".word").each(function() {
        var thisLeft, thisRight;
        output = $(this);
        thisLeft = $(this).offset().left;
        thisRight = $(this).offset().left + $(this).width();
        if ((xCoor > thisLeft && xCoor < thisRight) || thisLeft > xCoor) {
          return false;
        }
      });
      return output;
    };

    return KWICResults;

  })(BaseResults);

  view.ExampleResults = (function(superClass) {
    extend(ExampleResults, superClass);

    function ExampleResults(tabSelector, resultSelector, scope) {
      c.log("ExampleResults constructor", tabSelector, resultSelector, scope);
      ExampleResults.__super__.constructor.call(this, tabSelector, resultSelector, scope);
      this.proxy = new model.KWICProxy();
      this.current_page = 0;
      if (this.s.$parent.queryParams) {
        this.makeRequest().then((function(_this) {
          return function() {
            return _this.onentry();
          };
        })(this));
      }
      this.tabindex = (this.getResultTabs().length - 1) + this.s.$parent.$index;
    }

    ExampleResults.prototype.setupReadingHash = function() {};

    ExampleResults.prototype.makeRequest = function() {
      var def, items_per_page, opts, prev, progress;
      c.log("ExampleResults.makeRequest()", this.current_page);
      items_per_page = parseInt(this.optionWidget.find(".num_hits").val());
      opts = this.s.$parent.queryParams;
      this.resetView();
      opts.ajaxParams.incremental = false;
      opts.ajaxParams.start = this.current_page * items_per_page;
      opts.ajaxParams.end = opts.ajaxParams.start + items_per_page;
      prev = _.pick(this.proxy.prevParams, "cqp", "command", "corpus", "head", "rel", "source", "dep", "depextra");
      _.extend(opts.ajaxParams, prev);
      this.showPreloader();
      progress = opts.command === "query" ? $.proxy(this.onProgress, this) : $.noop;
      def = this.proxy.makeRequest(opts, null, progress, (function(_this) {
        return function(data) {
          c.log("first part done", data);
          _this.renderResult(data, opts.cqp);
          _this.renderCompleteResult(data);
          return safeApply(_this.s, function() {
            return _this.hidePreloader();
          });
        };
      })(this));
      return def.fail(function() {
        return safeApply(this.s, (function(_this) {
          return function() {
            return _this.hidePreloader();
          };
        })(this));
      });
    };

    ExampleResults.prototype.renderResult = function(data) {
      ExampleResults.__super__.renderResult.call(this, data);
      return this.s.setupReadingWatch();
    };

    ExampleResults.prototype.renderCompleteResult = function(data) {
      var curr;
      curr = this.current_page;
      ExampleResults.__super__.renderCompleteResult.call(this, data);
      return this.current_page = curr;
    };

    return ExampleResults;

  })(view.KWICResults);

  view.LemgramResults = (function(superClass) {
    extend(LemgramResults, superClass);

    function LemgramResults(tabSelector, resultSelector, scope) {
      var self;
      self = this;
      LemgramResults.__super__.constructor.call(this, tabSelector, resultSelector, scope);
      this.s = scope;
      this.tabindex = 2;
      this.resultDeferred = $.Deferred();
      this.proxy = new model.LemgramProxy();
      window.lemgramProxy = this.proxy;
      this.$result.find("#wordclassChk").change(function() {
        if ($(this).is(":checked")) {
          return $(".lemgram_result .wordclass_suffix", self.$result).show();
        } else {
          return $(".lemgram_result .wordclass_suffix", self.$result).hide();
        }
      });
    }

    LemgramResults.prototype.resetView = function() {
      LemgramResults.__super__.resetView.call(this);
      $(".content_target", this.$result).empty();
      return safeApply(this.s, (function(_this) {
        return function() {
          _this.s.$parent.aborted = false;
          return _this.s.$parent.no_hits = false;
        };
      })(this));
    };

    LemgramResults.prototype.makeRequest = function(word, type) {
      var def;
      if (this.proxy.hasPending()) {
        this.ignoreAbort = true;
      } else {
        this.ignoreAbort = false;
        this.resetView();
      }
      this.showPreloader();
      def = this.proxy.makeRequest(word, type, (function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this.onProgress.apply(_this, args);
        };
      })(this));
      def.success((function(_this) {
        return function(data) {
          return safeApply(_this.s, function() {
            return _this.renderResult(data, word);
          });
        };
      })(this));
      return def.fail((function(_this) {
        return function(jqXHR, status, errorThrown) {
          c.log("def fail", status);
          if (_this.ignoreAbort) {
            c.log("lemgram ignoreabort");
            return;
          }
          if (status === "abort") {
            return safeApply(_this.s, function() {
              _this.hidePreloader();
              c.log("aborted true", _this.s);
              return _this.s.$parent.aborted = true;
            });
          }
        };
      })(this));
    };

    LemgramResults.prototype.renderResult = function(data, query) {
      var resultError;
      c.log("lemgram renderResult", data, query);
      $(".content_target", this.$result).empty();
      resultError = LemgramResults.__super__.renderResult.call(this, data);
      this.hidePreloader();
      this.s.$parent.progress = 100;
      if (resultError === false) {
        return;
      }
      if (!data.relations) {
        this.s.$parent.no_hits = true;
        return this.resultDeferred.reject();
      } else if (util.isLemgramId(query)) {
        this.renderTables(query, data.relations);
        return this.resultDeferred.resolve();
      } else {
        this.renderWordTables(query, data.relations);
        return this.resultDeferred.resolve();
      }
    };

    LemgramResults.prototype.renderHeader = function(wordClass, isLemgram) {
      wordClass = (_.invert(settings.wordpictureTagset))[wordClass.toLowerCase()];
      return $(".tableContainer:last .lemgram_section").each(function(i) {
        var $parent;
        $parent = $(this).find(".lemgram_help");
        return $(this).find(".lemgram_result").each(function(j) {
          var cell, classes, confObj, label;
          confObj = settings.wordPictureConf[wordClass][i][j];
          if (confObj !== "_") {
            if (!$(this).find("table").length) {
              return;
            }
            if (confObj.alt_label) {
              label = confObj.alt_label;
            } else {
              label = "rel_" + $(this).data("rel");
            }
            cell = $("<span />", {
              "class": "lemgram_header_item"
            }).localeKey(label).addClass(confObj.css_class || "").appendTo($parent);
            return $(this).addClass(confObj.css_class).css("border-color", $(this).css("background-color"));
          } else {
            label = $(this).data("word") || $(this).tmplItem().lemgram;
            classes = "hit";
            if (isLemgram) {
              classes += " lemgram";
            }
            return $("<span class='" + classes + "'><b>" + label + "</b></span>").appendTo($parent);
          }
        });
      }).append("<div style='clear:both;'/>");
    };

    LemgramResults.prototype.renderWordTables = function(word, data) {
      var self, tagsetTrans, unique_words, wordlist;
      self = this;
      wordlist = $.map(data, function(item) {
        var output;
        output = [];
        if (item.head.split("_")[0] === word) {
          output.push([item.head, item.headpos.toLowerCase()]);
        }
        if (item.dep.split("_")[0] === word) {
          output.push([item.dep, item.deppos.toLowerCase()]);
        }
        return output;
      });
      unique_words = _.uniq(wordlist, function(arg) {
        var pos, word;
        word = arg[0], pos = arg[1];
        return word + pos;
      });
      tagsetTrans = _.invert(settings.wordpictureTagset);
      unique_words = _.filter(unique_words, function(arg) {
        var currentWd, pos;
        currentWd = arg[0], pos = arg[1];
        return settings.wordPictureConf[tagsetTrans[pos]] != null;
      });
      if (!unique_words.length) {
        this.showNoResults();
        return;
      }
      $.each(unique_words, (function(_this) {
        return function(i, arg) {
          var content, currentWd, pos;
          currentWd = arg[0], pos = arg[1];
          self.drawTable(currentWd, pos, data);
          self.renderHeader(pos, false);
          content = currentWd + " (<span rel=\"localize[pos]\">" + (util.getLocaleString(pos)) + "</span>)";
          return $(".tableContainer:last").prepend($("<div>", {
            "class": "header"
          }).html(content)).find(".hit .wordclass_suffix").hide();
        };
      })(this));
      $(".lemgram_result .wordclass_suffix").hide();
      return this.hidePreloader();
    };

    LemgramResults.prototype.renderTables = function(lemgram, data) {
      var wordClass;
      if (data[0].head === lemgram) {
        wordClass = data[0].headpos;
      } else {
        wordClass = data[0].deppos;
      }
      this.drawTable(lemgram, wordClass, data);
      $(".lemgram_result .wordclass_suffix").hide();
      this.renderHeader(wordClass, true);
      return this.hidePreloader();
    };

    LemgramResults.prototype.drawTable = function(token, wordClass, data) {
      var container, getRelType, inArray, orderArrays, tagsetTrans;
      inArray = function(rel, orderList) {
        var i, type;
        i = _.findIndex(orderList, function(item) {
          return (item.field_reverse || false) === (rel.field_reverse || false) && item.rel === rel.rel;
        });
        type = (rel.field_reverse ? "head" : "dep");
        return {
          i: i,
          type: type
        };
      };
      tagsetTrans = _.invert(settings.wordpictureTagset);
      getRelType = function(item) {
        return {
          rel: tagsetTrans[item.rel.toLowerCase()],
          field_reverse: item.dep === token
        };
      };
      wordClass = (_.invert(settings.wordpictureTagset))[wordClass.toLowerCase()];
      if (settings.wordPictureConf[wordClass] == null) {
        return;
      }
      orderArrays = [[], [], []];
      $.each(data, (function(_this) {
        return function(index, item) {
          return $.each(settings.wordPictureConf[wordClass] || [], function(i, rel_type_list) {
            var list, rel, ret;
            list = orderArrays[i];
            rel = getRelType(item);
            if (!rel) {
              return;
            }
            ret = inArray(rel, rel_type_list);
            if (ret.i === -1) {
              return;
            }
            if (!list[ret.i]) {
              list[ret.i] = [];
            }
            item.show_rel = ret.type;
            return list[ret.i].push(item);
          });
        };
      })(this));
      $.each(orderArrays, function(i, unsortedList) {
        var toIndex;
        $.each(unsortedList, function(_, list) {
          if (list) {
            return list.sort(function(first, second) {
              return second.mi - first.mi;
            });
          }
        });
        if (settings.wordPictureConf[wordClass][i] && unsortedList.length) {
          toIndex = $.inArray("_", settings.wordPictureConf[wordClass][i]);
          if (util.isLemgramId(token)) {
            unsortedList.splice(toIndex, 0, {
              word: token.split("..")[0].replace(/_/g, " ")
            });
          } else {
            unsortedList.splice(toIndex, 0, {
              word: util.lemgramToString(token)
            });
          }
        }
        return unsortedList = $.grep(unsortedList, function(item, index) {
          return Boolean(item);
        });
      });
      container = $("<div>", {
        "class": "tableContainer radialBkg"
      }).appendTo(".content_target", this.$result);
      c.log("orderArrays", orderArrays);
      $("#lemgramResultsTmpl").tmpl(orderArrays, {
        lemgram: token
      }).find(".example_link").append($("<span>").addClass("ui-icon ui-icon-document")).css("cursor", "pointer").click((function(_this) {
        return function(event) {
          return _this.onClickExample(event);
        };
      })(this)).end().appendTo(container);
      return $("td:nth-child(2)", this.$result).each(function() {
        var $siblings, hasHomograph, label, prefix, siblingLemgrams;
        $siblings = $(this).parent().siblings().find("td:nth-child(2)");
        siblingLemgrams = $.map($siblings, function(item) {
          return $(item).data("lemgram").slice(0, -1);
        });
        hasHomograph = $.inArray($(this).data("lemgram").slice(0, -1), siblingLemgrams) !== -1;
        prefix = ($(this).data("depextra").length ? $(this).data("depextra") + " " : "");
        data = $(this).tmplItem().data;
        if (!data.dep) {
          label = "&mdash;";
        } else {
          label = util.lemgramToString($(this).data("lemgram"), hasHomograph);
        }
        return $(this).html(prefix + label);
      });
    };

    LemgramResults.prototype.onClickExample = function(event) {
      var $target, data, opts, self;
      self = this;
      $target = $(event.currentTarget);
      c.log("onClickExample", $target);
      data = $target.parent().tmplItem().data;
      opts = {};
      opts.ajaxParams = {
        start: 0,
        end: 24,
        command: "relations_sentences",
        source: data.source.join(","),
        corpus: null,
        head: data.head,
        dep: data.dep,
        rel: data.rel,
        depextra: data.depextra,
        corpus: data.corpus
      };
      return this.s.$root.kwicTabs.push(opts);
    };

    LemgramResults.prototype.showWarning = function() {
      var hasWarned;
      hasWarned = !!$.jStorage.get("lemgram_warning");
      if (!hasWarned) {
        $.jStorage.set("lemgram_warning", true);
        $("#sidebar").sidebar("refreshContent", "lemgramWarning");
        safeApply(this.s, (function(_this) {
          return function() {
            return _this.s.$root.sidebar_visible = true;
          };
        })(this));
        return self.timeout = setTimeout((function(_this) {
          return function() {
            return safeApply(_this.s, function() {
              _this.s.$root.sidebar_visible = false;
              return $("#sidebar").sidebar("refreshContent");
            });
          };
        })(this), 5000);
      }
    };

    LemgramResults.prototype.onentry = function() {
      c.log("lemgram onentry");
      LemgramResults.__super__.onentry.call(this);
      this.resultDeferred.done(this.showWarning);
    };

    LemgramResults.prototype.onexit = function() {
      LemgramResults.__super__.onexit.call(this);
      clearTimeout(self.timeout);
      safeApply(this.s, (function(_this) {
        return function() {
          return _this.s.$root.sidebar_visible = false;
        };
      })(this));
    };

    LemgramResults.prototype.showNoResults = function() {
      return this.hidePreloader();
    };

    LemgramResults.prototype.hideWordclass = function() {
      return $("td:first-child", this.$result).each(function() {
        return $(this).html($.format("%s <span class='wordClass'>%s</span>", $(this).html().split(" ")));
      });
    };

    return LemgramResults;

  })(BaseResults);

  view.StatsResults = (function(superClass) {
    extend(StatsResults, superClass);

    function StatsResults(resultSelector, tabSelector, scope) {
      var self;
      StatsResults.__super__.constructor.call(this, resultSelector, tabSelector, scope);
      c.log("StatsResults constr", self = this);
      this.tabindex = 1;
      this.gridData = null;
      this.proxy = new model.StatsProxy();
      window.statsProxy = this.proxy;
      this.$result.on("click", ".arcDiagramPicture", (function(_this) {
        return function(event) {
          var parts;
          parts = $(event.currentTarget).attr("id").split("__");
          if (parts[1] !== "Σ") {
            return _this.newDataInGraph(parts[1]);
          } else {
            return _this.newDataInGraph("SIGMA_ALL");
          }
        };
      })(this));
      this.$result.on("click", ".slick-cell.l1.r1 .link", function() {
        var opts, query;
        query = $(this).data("query");
        opts = {};
        opts.ajaxParams = {
          start: 0,
          end: 24,
          command: "query",
          corpus: $(this).data("corpora").join(",").toUpperCase(),
          cqp: decodeURIComponent(self.proxy.prevParams.cqp),
          cqp2: decodeURIComponent(query),
          expand_prequeries: false
        };
        return safeApply(scope.$root, function() {
          return scope.$root.kwicTabs.push(opts);
        });
      });
      $(window).resize(_.debounce((function(_this) {
        return function() {
          var h, nRows, ref;
          $("#myGrid:visible").width($(window).width() - 40);
          nRows = ((ref = _this.gridData) != null ? ref.length : void 0) || 2;
          h = (nRows * 2) + 4;
          h = Math.min(h, 40);
          return $("#myGrid:visible").height($("#myGrid .slick-viewport").height() + 40);
        };
      })(this), 100));
      $("#kindOfData,#kindOfFormat").change((function(_this) {
        return function() {
          $("#exportButton").hide();
          return $("#generateExportButton").show();
        };
      })(this));
      $("#exportButton").hide();
      $("#generateExportButton").unbind("click").click((function(_this) {
        return function() {
          $("#exportButton").show();
          $("#generateExportButton").hide();
          return _this.updateExportBlob();
        };
      })(this));
      if ($("html.msie7,html.msie8").length) {
        $("#showGraph").hide();
        return;
      }
      $("#showGraph").on("click", (function(_this) {
        return function() {
          var activeCorpora, cell, chk, cqp, k, key, labelMapping, len, mainCQP, params, reduceVal, ref, showTotal, subExprs, val;
          if ($("#showGraph").is(".disabled")) {
            return;
          }
          params = _this.proxy.prevParams;
          reduceVal = params.groupby;
          subExprs = [];
          labelMapping = {};
          showTotal = false;
          mainCQP = params.cqp;
          console.log("DOING GRAPH CHECKING");
          ref = _this.$result.find(".slick-cell > input:checked");
          for (k = 0, len = ref.length; k < len; k++) {
            chk = ref[k];
            cell = $(chk).parent();
            cqp = decodeURIComponent(cell.next().find(" > .link").data("query"));
            if (cqp === "undefined") {
              showTotal = true;
              continue;
            }
            subExprs.push(cqp);
            labelMapping[cqp] = cell.next().text();
          }
          activeCorpora = _.flatten([
            (function() {
              var ref1, results;
              ref1 = this.savedData.corpora;
              results = [];
              for (key in ref1) {
                val = ref1[key];
                if (val.sums.absolute) {
                  results.push(key);
                }
              }
              return results;
            }).call(_this)
          ]);
          return _this.s.$apply(function() {
            return _this.s.onGraphShow({
              cqp: mainCQP,
              subcqps: subExprs,
              labelMapping: labelMapping,
              showTotal: showTotal,
              corpusListing: settings.corpusListing.subsetFactory(activeCorpora)
            });
          });
        };
      })(this));
    }

    StatsResults.prototype.updateExportBlob = function() {
      var blob, cl, corp, csv, csvUrl, csvstr, dataDelimiter, fmt, header, k, len, output, ref, row, selType, selVal, total, val, values, wd;
      selVal = $("#kindOfData option:selected").val();
      selType = $("#kindOfFormat option:selected").val();
      dataDelimiter = ";";
      if (selType === "tsv") {
        dataDelimiter = "%09";
      }
      cl = settings.corpusListing.subsetFactory(_.keys(this.savedData.corpora));
      header = [util.getLocaleString("stats_hit"), util.getLocaleString("stats_total")];
      header = header.concat(_.pluck(cl.corpora, "title"));
      fmt = function(what) {
        return what.toString();
      };
      total = ["Σ", fmt(this.savedData.total.sums[selVal])];
      total = total.concat((function() {
        var k, len, ref, results;
        ref = _.pluck(cl.corpora, "id");
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          corp = ref[k];
          results.push(fmt(this.savedData.corpora[corp.toUpperCase()].sums[selVal]));
        }
        return results;
      }).call(this));
      output = [total];
      ref = this.savedWordArray;
      for (k = 0, len = ref.length; k < len; k++) {
        wd = ref[k];
        row = [wd, fmt(this.savedData.total[selVal][wd])];
        values = (function() {
          var len1, o, ref1, results;
          ref1 = _.pluck(cl.corpora, "id");
          results = [];
          for (o = 0, len1 = ref1.length; o < len1; o++) {
            corp = ref1[o];
            val = this.savedData.corpora[corp.toUpperCase()][selVal][wd];
            if (val) {
              results.push(val = fmt(val));
            } else {
              results.push(val = "0");
            }
          }
          return results;
        }).call(this);
        output.push(row.concat(values));
      }
      csv = new CSV(output, {
        header: header,
        delimiter: dataDelimiter
      });
      csvstr = csv.encode();
      blob = new Blob([csvstr], {
        type: "text/" + selType
      });
      csvUrl = URL.createObjectURL(blob);
      return $("#exportButton", this.$result).attr({
        download: "export." + selType,
        href: csvUrl
      });
    };

    StatsResults.prototype.makeRequest = function(cqp) {
      var withinArg;
      c.log("statsrequest makerequest", cqp);
      if (currentMode === "parallel") {
        cqp = cqp.replace(/\:LINKED_CORPUS.*/, "");
      }
      if (this.proxy.hasPending()) {
        this.ignoreAbort = true;
      } else {
        this.ignoreAbort = false;
        this.resetView();
      }
      this.showPreloader();
      if (search().within) {
        withinArg = settings.corpusListing.getWithinQueryString();
      }
      return this.proxy.makeRequest(cqp, ((function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _this.onProgress.apply(_this, args);
        };
      })(this)), withinArg).done((function(_this) {
        return function(arg) {
          var columns, data, dataset, wordArray;
          data = arg[0], wordArray = arg[1], columns = arg[2], dataset = arg[3];
          c.log("dataset.length", dataset.length);
          safeApply(_this.s, function() {
            return _this.hidePreloader();
          });
          _this.savedData = data;
          _this.savedWordArray = wordArray;
          return _this.renderResult(columns, dataset);
        };
      })(this)).fail((function(_this) {
        return function(textStatus, err) {
          c.log("fail", arguments);
          c.log("stats fail", _this.s.$parent.loading, _.map(_this.proxy.pendingRequests, function(item) {
            return item.readyState;
          }));
          if (_this.ignoreAbort) {
            c.log("stats ignoreabort");
            return;
          }
          return safeApply(_this.s, function() {
            _this.hidePreloader();
            if (textStatus === "abort") {
              return _this.s.aborted = true;
            } else {
              return _this.resultError(err);
            }
          });
        };
      })(this));
    };

    StatsResults.prototype.renderResult = function(columns, data) {
      var checkboxSelector, grid, log, refreshHeaders, resultError, sortCol;
      refreshHeaders = function() {
        return $(".slick-column-name:nth(1),.slick-column-name:nth(2)").not("[rel^=localize]").each(function() {
          return $(this).localeKey($(this).text());
        });
      };
      this.gridData = data;
      resultError = StatsResults.__super__.renderResult.call(this, data);
      if (resultError === false) {
        return;
      }
      if (data[0].total_value.absolute === 0) {
        safeApply(this.s, (function(_this) {
          return function() {
            return _this.s.no_hits = true;
          };
        })(this));
        return;
      }
      checkboxSelector = new Slick.CheckboxSelectColumn({
        cssClass: "slick-cell-checkboxsel"
      });
      columns = [checkboxSelector.getColumnDefinition()].concat(columns);
      $("#myGrid").width(800);
      $("#myGrid").height(600);
      console.log("grad data", data);
      grid = new Slick.Grid($("#myGrid"), data, columns, {
        enableCellNavigation: false,
        enableColumnReorder: false
      });
      grid.setSelectionModel(new Slick.RowSelectionModel({
        selectActiveRow: false
      }));
      grid.registerPlugin(checkboxSelector);
      this.grid = grid;
      this.grid.autosizeColumns();
      sortCol = columns[2];
      log = _.debounce(function() {
        return c.log("grid sort");
      }, 200);
      grid.onSort.subscribe(function(e, args) {
        sortCol = args.sortCol;
        data.sort(function(a, b) {
          var ret, x, y;
          log();
          if (sortCol.field === "hit_value") {
            x = a[sortCol.field];
            y = b[sortCol.field];
          } else {
            x = a[sortCol.field][0] || 0;
            y = b[sortCol.field][0] || 0;
          }
          ret = (x === y ? 0 : (x > y ? 1 : -1));
          if (!args.sortAsc) {
            ret *= -1;
          }
          return ret;
        });
        grid.setData(data);
        grid.updateRowCount();
        return grid.render();
      });
      grid.onHeaderCellRendered.subscribe(function(e, args) {
        return refreshHeaders();
      });
      refreshHeaders();
      $(".slick-row:first input", this.$result).click();
      $(window).trigger("resize");
      $.when(timeDeferred).then((function(_this) {
        return function() {
          return safeApply(_this.s, function() {
            return _this.updateGraphBtnState();
          });
        };
      })(this));
      return safeApply(this.s, (function(_this) {
        return function() {
          return _this.hidePreloader();
        };
      })(this));
    };

    StatsResults.prototype.updateGraphBtnState = function() {
      var cl;
      this.s.graphEnabled = true;
      cl = settings.corpusListing.subsetFactory(this.proxy.prevParams.corpus.split(","));
      if (!(_.compact(cl.getTimeInterval())).length) {
        return this.s.graphEnabled = false;
      }
    };

    StatsResults.prototype.newDataInGraph = function(dataName) {
      var corpusArray, dataItems, wordArray;
      dataItems = [];
      wordArray = [];
      corpusArray = [];
      this.lastDataName = dataName;
      return $.each(this.savedData["corpora"], function(corpus, obj) {
        var freq, locstring, relHitsString, stats2Instance, statsSwitchInstance, topheader, totfreq;
        if (dataName === "SIGMA_ALL") {
          totfreq = 0;
          $.each(obj["relative"], function(wordform, freq) {
            var numFreq;
            numFreq = parseFloat(freq);
            if (numFreq) {
              return totfreq += numFreq;
            }
          });
          dataItems.push({
            value: totfreq,
            caption: settings.corpora[corpus.toLowerCase()]["title"] + ": " + util.formatDecimalString(totfreq.toString()),
            shape_id: "sigma_all"
          });
        } else {
          freq = parseFloat(obj["relative"][dataName]);
          if (freq) {
            dataItems.push({
              value: freq,
              caption: settings.corpora[corpus.toLowerCase()]["title"] + ": " + util.formatDecimalString(freq.toString()),
              shape_id: dataName
            });
          } else {
            dataItems.push({
              value: 0,
              caption: "",
              shape_id: dataName
            });
          }
        }
        $("#dialog").remove();
        if (dataName === "SIGMA_ALL") {
          topheader = util.getLocaleString("statstable_hitsheader_lemgram");
          locstring = "statstable_hitsheader_lemgram";
        } else {
          topheader = util.getLocaleString("statstable_hitsheader") + ("<i>" + dataName + "</i>");
          locstring = "statstable_hitsheader";
        }
        relHitsString = util.getLocaleString("statstable_relfigures_hits");
        $("<div id='dialog' title='" + topheader + "' />").appendTo("body").append("<div id=\"pieDiv\"><br/><div id=\"statistics_switch\" style=\"text-align:center\">\n    <a href=\"javascript:\" rel=\"localize[statstable_relfigures]\" data-mode=\"relative\">Relativa frekvenser</a>\n    <a href=\"javascript:\" rel=\"localize[statstable_absfigures]\" data-mode=\"absolute\">Absoluta frekvenser</a>\n</div>\n<div id=\"chartFrame\" style=\"height:380\"></div>\n<p id=\"hitsDescription\" style=\"text-align:center\" rel=\"localize[statstable_absfigures_hits]\">" + relHitsString + "</p></div>").dialog({
          width: 400,
          height: 500,
          resize: function() {
            $("#chartFrame").css("height", $("#chartFrame").parent().width() - 20);
            return stats2Instance.pie_widget("resizeDiagram", $(this).width() - 60);
          },
          resizeStop: function(event, ui) {
            var h, w;
            w = $(this).dialog("option", "width");
            h = $(this).dialog("option", "height");
            if (this.width * 1.25 > this.height) {
              $(this).dialog("option", "height", w * 1.25);
            } else {
              $(this).dialog("option", "width", h * 0.80);
            }
            return stats2Instance.pie_widget("resizeDiagram", $(this).width() - 60);
          },
          close: function() {
            return $("#pieDiv").remove();
          }
        }).css("opacity", 0).parent().find(".ui-dialog-title").localeKey("statstable_hitsheader_lemgram");
        $("#dialog").fadeTo(400, 1);
        $("#dialog").find("a").blur();
        stats2Instance = $("#chartFrame").pie_widget({
          container_id: "chartFrame",
          data_items: dataItems
        });
        return statsSwitchInstance = $("#statistics_switch").radioList({
          change: (function(_this) {
            return function() {
              var loc, typestring;
              typestring = statsSwitchInstance.radioList("getSelected").attr("data-mode");
              dataItems = [];
              dataName = _this.lastDataName;
              $.each(_this.savedData["corpora"], function(corpus, obj) {
                if (dataName === "SIGMA_ALL") {
                  totfreq = 0;
                  $.each(obj[typestring], function(wordform, freq) {
                    var numFreq;
                    if (typestring === "absolute") {
                      numFreq = parseInt(freq);
                    } else {
                      numFreq = parseFloat(freq);
                    }
                    if (numFreq) {
                      return totfreq += numFreq;
                    }
                  });
                  return dataItems.push({
                    value: totfreq,
                    caption: settings.corpora[corpus.toLowerCase()]["title"] + ": " + util.formatDecimalString(totfreq.toString(), false),
                    shape_id: "sigma_all"
                  });
                } else {
                  if (typestring === "absolute") {
                    freq = parseInt(obj[typestring][dataName]);
                  } else {
                    freq = parseFloat(obj[typestring][dataName]);
                  }
                  if (freq) {
                    return dataItems.push({
                      value: freq,
                      caption: settings.corpora[corpus.toLowerCase()]["title"] + ": " + util.formatDecimalString(freq.toString(), false),
                      shape_id: dataName
                    });
                  } else {
                    return dataItems.push({
                      value: 0,
                      caption: "",
                      shape_id: dataName
                    });
                  }
                }
              });
              stats2Instance.pie_widget("newData", dataItems);
              if (typestring === "absolute") {
                loc = "statstable_absfigures_hits";
              } else {
                loc = "statstable_relfigures_hits";
              }
              return $("#hitsDescription").localeKey(loc);
            };
          })(this),
          selected: "relative"
        });
      });
    };

    StatsResults.prototype.onentry = function() {
      StatsResults.__super__.onentry.call(this);
      $(window).trigger("resize");
    };

    StatsResults.prototype.resetView = function() {
      StatsResults.__super__.resetView.call(this);
      $("myGrid").empty();
      $("#exportStatsSection").show();
      $("#exportButton").attr({
        download: null,
        href: null
      });
      this.s.no_hits = false;
      return this.s.aborted = false;
    };

    return StatsResults;

  })(BaseResults);

  view.GraphResults = (function(superClass) {
    extend(GraphResults, superClass);

    function GraphResults(tabSelector, resultSelector, scope) {
      GraphResults.__super__.constructor.call(this, tabSelector, resultSelector, scope);
      this.zoom = "year";
      this.granularity = this.zoom[0];
      this.proxy = new model.GraphProxy();
      this.makeRequest(this.s.data.cqp, this.s.data.subcqps, this.s.data.corpusListing, this.s.data.labelMapping, this.s.data.showTotal);
      c.log("adding chart listener", this.$result);
      $(".chart", this.$result).on("click", (function(_this) {
        return function(event) {
          var cqp, end, k, m, n_tokens, opts, results, start, target, timecqp, val;
          target = $(".chart", _this.$result);
          val = $(".detail .x_label > span", target).data("val");
          cqp = $(".detail .item.active > span", target).data("cqp");
          c.log("chart click", cqp, target, _this.s.data.subcqps, _this.s.data.cqp);
          if (cqp) {
            m = moment(val * 1000);
            start = m.format("YYYYMMDD");
            end = m.add(1, "year").subtract(1, "day").format("YYYYMMDD");
            timecqp = "[(int(_.text_datefrom) >= " + start + " & int(_.text_dateto) <= " + end + ")]";
            n_tokens = _this.s.data.cqp.split("]").length - 2;
            timecqp = ([timecqp].concat(_.map((function() {
              results = [];
              for (var k = 0; 0 <= n_tokens ? k < n_tokens : k > n_tokens; 0 <= n_tokens ? k++ : k--){ results.push(k); }
              return results;
            }).apply(this), function() {
              return "[]";
            }))).join(" ");
            opts = {};
            opts.ajaxParams = {
              start: 0,
              end: 24,
              command: "query",
              corpus: _this.s.data.corpusListing.stringifySelected(),
              cqp: _this.s.data.cqp,
              cqp2: decodeURIComponent(cqp),
              cqp3: timecqp,
              expand_prequeries: false
            };
            return safeApply(_this.s.$root, function() {
              return _this.s.$root.kwicTabs.push(opts);
            });
          }
        };
      })(this));
    }

    GraphResults.prototype.parseDate = function(granularity, time) {
      var day, month, ref, year;
      ref = [null, 0, 1], year = ref[0], month = ref[1], day = ref[2];
      switch (granularity) {
        case "y":
          year = time;
          break;
        case "m":
          year = time.slice(0, 4);
          month = time.slice(4, 6);
          break;
        case "d":
          year = time.slice(0, 4);
          month = time.slice(4, 6);
          day = time.slice(6, 8);
      }
      return moment([Number(year), Number(month), Number(day)]);
    };

    GraphResults.prototype.fillMissingDate = function(data) {
      var dateArray, diff, duration, i, k, lastYVal, max, maybeCurrent, min, momentMapping, n_diff, newMoment, newMoments, ref;
      dateArray = _.pluck(data, "x");
      min = _.min(dateArray, function(mom) {
        return mom.toDate();
      });
      max = _.max(dateArray, function(mom) {
        return mom.toDate();
      });
      duration = (function() {
        switch (this.granularity) {
          case "y":
            duration = moment.duration({
              year: 1
            });
            return diff = "year";
          case "m":
            duration = moment.duration({
              month: 1
            });
            return diff = "month";
          case "d":
            duration = moment.duration({
              day: 1
            });
            return diff = "day";
        }
      }).call(this);
      n_diff = moment(max).diff(min, diff);
      momentMapping = _.object(_.map(data, function(item) {
        return [moment(item.x).unix(), item.y];
      }));
      newMoments = [];
      for (i = k = 0, ref = n_diff; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
        newMoment = moment(min).add(diff, i);
        maybeCurrent = momentMapping[newMoment.unix()];
        if (typeof maybeCurrent !== 'undefined') {
          lastYVal = maybeCurrent;
        } else {
          newMoments.push({
            x: newMoment,
            y: lastYVal
          });
        }
      }
      return [].concat(data, newMoments);
    };

    GraphResults.prototype.getSeriesData = function(data) {
      var first, firstVal, hasFirstValue, hasLastValue, k, last, lastVal, len, mom, output, ref, tuple, x, y;
      delete data[""];
      ref = settings.corpusListing.getTimeInterval(), first = ref[0], last = ref[1];
      firstVal = this.parseDate("y", first);
      lastVal = this.parseDate("y", last.toString());
      hasFirstValue = false;
      hasLastValue = false;
      output = (function() {
        var k, len, ref1, ref2, results;
        ref1 = _.pairs(data);
        results = [];
        for (k = 0, len = ref1.length; k < len; k++) {
          ref2 = ref1[k], x = ref2[0], y = ref2[1];
          mom = this.parseDate(this.granularity, x);
          if (mom.isSame(firstVal)) {
            hasFirstValue = true;
          }
          if (mom.isSame(lastVal)) {
            hasLastValue = true;
          }
          results.push({
            x: mom,
            y: y
          });
        }
        return results;
      }).call(this);
      if (!hasFirstValue) {
        output.push({
          x: firstVal,
          y: 0
        });
      }
      output = this.fillMissingDate(output);
      output = output.sort(function(a, b) {
        return a.x.unix() - b.x.unix();
      });
      output.splice(output.length - 1, 1);
      for (k = 0, len = output.length; k < len; k++) {
        tuple = output[k];
        tuple.x = tuple.x.unix();
      }
      return output;
    };

    GraphResults.prototype.hideNthTick = function(graphDiv) {
      return $(".x_tick:visible", graphDiv).hide().filter(function(n) {
        return n % 2 === 0;
      }).show();
    };

    GraphResults.prototype.updateTicks = function() {
      var firstTick, margin, secondTick, ticks;
      ticks = $(".chart .title:visible", this.$result);
      firstTick = ticks.eq(0);
      secondTick = ticks.eq(1);
      margin = 5;
      if (!firstTick.length || !secondTick.length) {
        return;
      }
      if (firstTick.offset().left + firstTick.width() + margin > secondTick.offset().left) {
        this.hideNthTick($(".chart", this.$result));
        return this.updateTicks();
      }
    };

    GraphResults.prototype.getNonTime = function() {
      var non_time, sizelist, totalsize;
      non_time = _.reduce(_.pluck(settings.corpusListing.selected, "non_time"), (function(a, b) {
        return (a || 0) + (b || 0);
      }), 0);
      sizelist = _.map(settings.corpusListing.selected, function(item) {
        return Number(item.info.Size);
      });
      totalsize = _.reduce(sizelist, function(a, b) {
        return a + b;
      });
      return (non_time / totalsize) * 100;
    };

    GraphResults.prototype.getEmptyIntervals = function(data) {
      var breaker, i, interval, intervals, item;
      intervals = [];
      i = 0;
      while (i < data.length) {
        item = data[i];
        if (item.y === null) {
          interval = [_.clone(item)];
          breaker = true;
          while (breaker) {
            i++;
            item = data[i];
            if ((item != null ? item.y : void 0) === null) {
              interval.push(_.clone(item));
            } else {
              intervals.push(interval);
              breaker = false;
            }
          }
        }
        i++;
      }
      return intervals;
    };

    GraphResults.prototype.drawIntervals = function(graph, intervals) {
      var from, k, len, list, max, min, offset, ref, results, to, unitSpan, unitWidth;
      if (!$(".zoom_slider", this.$result).is(".ui-slider")) {
        return;
      }
      ref = $('.zoom_slider', this.$result).slider("values"), from = ref[0], to = ref[1];
      unitSpan = moment.unix(to).diff(moment.unix(from), this.zoom);
      unitWidth = graph.width / unitSpan;
      $(".empty_area", this.$result).remove();
      results = [];
      for (k = 0, len = intervals.length; k < len; k++) {
        list = intervals[k];
        max = _.max(list, "x");
        min = _.min(list, "x");
        from = Math.round(graph.x(min.x));
        to = Math.round(graph.x(max.x));
        offset = 8;
        results.push($("<div>", {
          "class": "empty_area"
        }).css({
          left: from - unitWidth / 2,
          width: (to - from) + unitWidth
        }).appendTo(graph.element));
      }
      return results;
    };

    GraphResults.prototype.setBarMode = function() {
      if ($(".legend .line", this.$result).length > 1) {
        $(".legend li:last:not(.disabled) .action", this.$result).click();
        if (_.all(_.map($(".legend .line", this.$result), function(item) {
          return $(item).is(".disabled");
        }))) {
          $(".legend li:first .action", this.$result).click();
        }
      }
    };

    GraphResults.prototype.setLineMode = function() {};

    GraphResults.prototype.setTableMode = function() {};

    GraphResults.prototype.makeRequest = function(cqp, subcqps, corpora, labelMapping, showTotal) {
      c.log("makeRequest", cqp, subcqps, corpora, labelMapping, showTotal);
      this.s.loading = true;
      this.showPreloader();
      return this.proxy.makeRequest(cqp, subcqps, corpora.stringifySelected()).progress((function(_this) {
        return function(data) {
          return _this.onProgress(data);
        };
      })(this)).fail((function(_this) {
        return function(data) {
          c.log("graph crash");
          _this.resultError(data);
          return _this.s.loading = false;
        };
      })(this)).done((function(_this) {
        return function(data) {
          var HTMLFormatter, color, emptyIntervals, first, graph, hoverDetail, i, item, k, key, last, legend, len, len1, len2, len3, len4, new_time_row, nontime, o, old_ceil, old_render, old_tickOffsets, p, palette, q, r, ref, ref1, ref2, ref3, row, s, series, shelving, slider, time, time_grid, time_table_columns, time_table_columns_intermediate, time_table_data, timestamp, timeunit, toDate, xAxis, yAxis;
          c.log("graph data", data);
          if (data.ERROR) {
            _this.resultError(data);
            return;
          }
          nontime = _this.getNonTime();
          if (nontime) {
            $(".non_time", _this.$result).text(nontime.toFixed(2) + "%").parent().localize();
          } else {
            $(".non_time_div", _this.$result).hide();
          }
          if (_.isArray(data.combined)) {
            palette = new Rickshaw.Color.Palette("colorwheel");
            series = [];
            ref = data.combined;
            for (k = 0, len = ref.length; k < len; k++) {
              item = ref[k];
              color = palette.color();
              series.push({
                data: _this.getSeriesData(item.relative),
                color: color,
                name: item.cqp ? labelMapping[item.cqp] : "&Sigma;",
                cqp: item.cqp || cqp,
                abs_data: _this.getSeriesData(item.absolute)
              });
            }
          } else {
            series = [
              {
                data: _this.getSeriesData(data.combined.relative),
                color: 'steelblue',
                name: "&Sigma;",
                cqp: cqp,
                abs_data: _this.getSeriesData(data.combined.absolute)
              }
            ];
          }
          Rickshaw.Series.zeroFill(series);
          emptyIntervals = _this.getEmptyIntervals(series[0].data);
          _this.s.hasEmptyIntervals = emptyIntervals.length;
          for (o = 0, len1 = series.length; o < len1; o++) {
            s = series[o];
            s.data = _.filter(s.data, function(item) {
              return item.y !== null;
            });
          }
          graph = new Rickshaw.Graph({
            element: $(".chart", _this.$result).get(0),
            renderer: 'line',
            interpolation: "linear",
            series: series,
            padding: {
              top: 0.1,
              right: 0.01
            }
          });
          graph.render();
          window._graph = graph;
          _this.drawIntervals(graph, emptyIntervals);
          $(window).on("resize", _.throttle(function() {
            if (_this.$result.is(":visible")) {
              graph.setSize();
              return graph.render();
            }
          }, 200));
          $(".form_switch", _this.$result).click(function(event) {
            var cls, h, len2, nRows, p, ref1, ref2, setExportUrl, val;
            val = _this.s.mode;
            ref1 = _this.$result.attr("class").split(" ");
            for (p = 0, len2 = ref1.length; p < len2; p++) {
              cls = ref1[p];
              if (cls.match(/^form-/)) {
                _this.$result.removeClass(cls);
              }
            }
            _this.$result.addClass("form-" + val);
            $(".chart,.zoom_slider,.legend", _this.$result.parent()).show();
            $(".time_table", _this.$result.parent()).hide();
            if (val === "bar") {
              if ($(".legend .line", _this.$result).length > 1) {
                $(".legend li:last:not(.disabled) .action", _this.$result).click();
                if (_.all(_.map($(".legend .line", _this.$result), function(item) {
                  return $(item).is(".disabled");
                }))) {
                  $(".legend li:first .action", _this.$result).click();
                }
              }
            } else if (val === "table") {
              $(".chart,.zoom_slider,.legend", _this.$result).hide();
              $(".time_table", _this.$result.parent()).show();
              nRows = series.length || 2;
              h = (nRows * 2) + 4;
              h = Math.min(h, 40);
              $(".time_table:visible", _this.$result).height(h + ".1em");
              if ((ref2 = _this.time_grid) != null) {
                ref2.resizeCanvas();
              }
              $(".exportTimeStatsSection", _this.$result).show();
              setExportUrl = function() {
                var blob, cell, cells, csv, csvUrl, csvstr, dataDelimiter, header, i, len3, len4, len5, output, q, r, ref3, ref4, row, selType, selVal, t;
                selVal = $(".timeKindOfData option:selected", this.$result).val();
                selType = $(".timeKindOfFormat option:selected", this.$result).val();
                dataDelimiter = selType === "TSV" ? "%09" : ";";
                header = [util.getLocaleString("stats_hit")];
                ref3 = series[0].data;
                for (q = 0, len3 = ref3.length; q < len3; q++) {
                  cell = ref3[q];
                  header.push(moment(cell.x * 1000).format("YYYY"));
                }
                output = [header];
                for (r = 0, len4 = series.length; r < len4; r++) {
                  row = series[r];
                  cells = [row.name === "&Sigma;" ? "Σ" : row.name];
                  ref4 = row.data;
                  for (t = 0, len5 = ref4.length; t < len5; t++) {
                    cell = ref4[t];
                    if (selVal === "relative") {
                      cells.push(cell.y);
                    } else {
                      i = _.indexOf(_.pluck(row.abs_data, "x"), cell.x, true);
                      cells.push(row.abs_data[i].y);
                    }
                  }
                  output.push(cells);
                }
                csv = new CSV(output, {
                  header: header,
                  delimiter: dataDelimiter
                });
                csvstr = csv.encode();
                blob = new Blob([csvstr], {
                  type: "text/" + selType
                });
                csvUrl = URL.createObjectURL(blob);
                return $(".exportTimeStatsSection .btn.export", this.$result).attr({
                  download: "export." + selType,
                  href: csvUrl
                });
              };
              setExportUrl();
            }
            if (val !== "table") {
              graph.setRenderer(val);
              graph.render();
              return $(".exportTimeStatsSection", _this.$result).hide();
            }
          });
          HTMLFormatter = function(row, cell, value, columnDef, dataContext) {
            return value;
          };
          time_table_data = [];
          time_table_columns_intermediate = {};
          for (p = 0, len2 = series.length; p < len2; p++) {
            row = series[p];
            new_time_row = {
              "label": row.name
            };
            ref1 = row.data;
            for (q = 0, len3 = ref1.length; q < len3; q++) {
              item = ref1[q];
              timestamp = moment(item.x * 1000).format("YYYY");
              time_table_columns_intermediate[timestamp] = {
                "name": timestamp,
                "field": timestamp,
                "formatter": function(row, cell, value, columnDef, dataContext) {
                  var fmt, loc;
                  loc = {
                    'sv': "sv-SE",
                    'en': "gb-EN"
                  }[$("body").scope().lang];
                  fmt = function(valTup) {
                    if (typeof valTup[0] === "undefined") {
                      return "";
                    }
                    return "<span>" + "<span class='relStat'>" + Number(valTup[1].toFixed(1)).toLocaleString(loc) + "</span> " + "<span class='absStat'>(" + valTup[0].toLocaleString(loc) + ")</span> " + "<span>";
                  };
                  return fmt(value);
                }
              };
              i = _.indexOf(_.pluck(row.abs_data, "x"), item.x, true);
              new_time_row[timestamp] = [item.y, row.abs_data[i].y];
            }
            time_table_data.push(new_time_row);
          }
          time_table_columns = [
            {
              "name": "Hit",
              "field": "label",
              "formatter": HTMLFormatter
            }
          ];
          ref2 = _.keys(time_table_columns_intermediate).sort();
          for (r = 0, len4 = ref2.length; r < len4; r++) {
            key = ref2[r];
            time_table_columns.push(time_table_columns_intermediate[key]);
          }
          time_grid = new Slick.Grid($(".time_table", _this.$result), time_table_data, time_table_columns, {
            enableCellNavigation: false,
            enableColumnReorder: false
          });
          $(".time_table", _this.$result).width("100%");
          _this.time_grid = time_grid;
          legend = new Rickshaw.Graph.Legend({
            element: $(".legend", _this.$result).get(0),
            graph: graph
          });
          shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
            graph: graph,
            legend: legend
          });
          if (!showTotal && $(".legend .line", _this.$result).length > 1) {
            $(".legend .line:last .action", _this.$result).click();
          }
          hoverDetail = new Rickshaw.Graph.HoverDetail({
            graph: graph,
            xFormatter: function(x) {
              var d, out, output;
              d = new Date(x * 1000);
              output = ["<span rel='localize[year]'>" + (util.getLocaleString('year')) + "</span>: <span class='currently'>" + (d.getFullYear()) + "</span>", "<span rel='localize[month]'>" + (util.getLocaleString('month')) + "</span>: <span class='currently'>" + (d.getMonth()) + "</span>", "<span rel='localize[day]'>" + (util.getLocaleString('day')) + "</span>: <span class='currently'>" + (d.getDay()) + "</span>"];
              out = (function() {
                switch (this.granularity) {
                  case "y":
                    return output[0];
                  case "m":
                    return output.slice(0, 2).join("\n");
                  case "d":
                    return output.join("\n");
                }
              }).call(_this);
              return "<span data-val='" + x + "'>" + out + "</span>";
            },
            yFormatter: function(y) {
              var val;
              val = util.formatDecimalString(y.toFixed(2), false, true, true);
              return ("<br><span rel='localize[rel_hits_short]'>" + (util.getLocaleString('rel_hits_short')) + "</span> ") + val;
            },
            formatter: function(series, x, y, formattedX, formattedY, d) {
              var abs_y, rel;
              i = _.indexOf(_.pluck(series.abs_data, "x"), x, true);
              abs_y = series.abs_data[i].y;
              rel = series.name + ':&nbsp;' + formattedY;
              return "<span data-cqp=\"" + (encodeURIComponent(series.cqp)) + "\">\n    " + rel + "\n    <br>\n    " + (util.getLocaleString('abs_hits_short')) + ": " + abs_y + "\n</span>";
            }
          });
          ref3 = settings.corpusListing.getTimeInterval(), first = ref3[0], last = ref3[1];
          timeunit = last - first > 100 ? "decade" : _this.zoom;
          toDate = function(sec) {
            return moment(sec * 1000).toDate();
          };
          time = new Rickshaw.Fixtures.Time();
          old_ceil = time.ceil;
          time.ceil = function(time, unit) {
            var mom, out;
            if (unit.name === "decade") {
              out = Math.ceil(time / unit.seconds) * unit.seconds;
              mom = moment(out * 1000);
              if (mom.date() === 31) {
                mom.add("day", 1);
              }
              return mom.unix();
            } else {
              return old_ceil(time, unit);
            }
          };
          xAxis = new Rickshaw.Graph.Axis.Time({
            graph: graph,
            timeUnit: time.unit(timeunit)
          });
          slider = new Rickshaw.Graph.RangeSlider({
            graph: graph,
            element: $('.zoom_slider', _this.$result)
          });
          old_render = xAxis.render;
          xAxis.render = function() {
            old_render.call(xAxis);
            _this.updateTicks();
            return _this.drawIntervals(graph, emptyIntervals);
          };
          old_tickOffsets = xAxis.tickOffsets;
          xAxis.tickOffsets = function() {
            var count, domain, offsets, ref4, runningTick, t, tickValue, unit;
            domain = xAxis.graph.x.domain();
            unit = xAxis.fixedTimeUnit || xAxis.appropriateTimeUnit();
            count = Math.ceil((domain[1] - domain[0]) / unit.seconds);
            runningTick = domain[0];
            offsets = [];
            for (i = t = 0, ref4 = count; 0 <= ref4 ? t < ref4 : t > ref4; i = 0 <= ref4 ? ++t : --t) {
              tickValue = time.ceil(runningTick, unit);
              runningTick = tickValue + unit.seconds / 2;
              offsets.push({
                value: tickValue,
                unit: unit,
                _date: moment(tickValue * 1000).toDate()
              });
            }
            return offsets;
          };
          xAxis.render();
          yAxis = new Rickshaw.Graph.Axis.Y({
            graph: graph
          });
          yAxis.render();
          _this.hidePreloader();
          safeApply(_this.s, function() {
            return _this.s.loading = false;
          });
          return $(window).trigger("resize");
        };
      })(this));
    };

    return GraphResults;

  })(BaseResults);

}).call(this);

//# sourceMappingURL=results.js.map
