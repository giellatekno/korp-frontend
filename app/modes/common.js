settings.senseAutoComplete = "<autoc model='model' placeholder='placeholder' type='sense'/>";

//var karpLemgramLink = "https://spraakbanken.gu.se/karp/#?mode=DEFAULT&search=extended||and|lemgram|equals|<%= val.replace(/:\\d+/, '') %>";

var selectType = {
    extendedTemplate: "<select ng-model='input' escaper "
     + "ng-options='tuple[0] as localize(tuple[1]) for tuple in dataset' ></select>",
    extendedController: function($scope) {
        $scope.localize = function(str) {
            if($scope.localize === false) {
                return str;
            } else {
                return util.getLocaleString( ($scope.translationKey || "") + str);
            }
        }

        $scope.translationKey = $scope.translationKey || "";
        var dataset;
        if(_.isArray($scope.dataset)) {
            // convert array datasets into objects
            dataset = _.object(_.map($scope.dataset, function(item) {
                return [item, item];
            }));
        }
        $scope.dataset = dataset || $scope.dataset;

        $scope.dataset = _.sortBy(_.pairs($scope.dataset), function(tuple) {
            return $scope.localize(tuple[1]);
        });
        $scope.model = $scope.model || $scope.dataset[0][0]
    }
};

var liteOptions = {
    "is": "=",
    "is_not": "!="
}
var setOptions = {
    "is": "contains",
    "is_not": "not contains"
};
var probabilitySetOptions = {
    "is": "highest_rank",
    "is_not": "not_highest_rank",
    "contains": "rank_contains",
    "contains_not": "not_rank_contains",
};

var defaultContext = {
    "1 sentence": "1 sentence"
};

var spContext = {
    "1 sentence": "1 sentence",
    "1 paragraph": "1 paragraph"
};
var spWithin = {
    "sentence": "sentence",
    "paragraph": "paragraph"
};

var attrs = {};  // positional attributes
var sattrs = {}; // structural attributes

attrs.pos = {
    label: "pos",
    displayType : "select",
    translationKey: "pos_",
    dataset: {
        "A" : "A",
        "N" : "N",
        "V" : "V",
        "Adv" : "Adv",
        "Po" : "Po",
        "Pr" : "Pr",
        "Pron" : "Pron",
        "Det" : "Det",
        "Num" : "Num",
        "Cmp_SplitR" : "Cmp_SplitR",
        "Cmp_Sh" : "Cmp_Sh",
        "CmpNP_First" : "CmpNP_First",
        "CmpNP_None" : "CmpNP_None",
        "Cmp_SgNom" : "Cmp_SgNom",
        "Pcle" : "Pcle",
        "PUNCT" : "PUNCT",
        "CC" : "CC",
        "Interj" : "Interj",
        "CS" : "CS",
        "CLB" : "CLB",
        "___" : "___"
    },
    opts: liteOptions,
    extendedTemplate: selectType.extendedTemplate,
    extendedController: selectType.extendedController,
    order: 0
};

/*
attrs.msd = {
    label : "msd",
    translationKey : "msdval_",
    opts : settings.defaultOptions,
    extended_template : '<input class="arg_value" ng-model="model" escaper>' +
    '<span ng-click="onIconClick()" class="fa fa-info-circle"></span>',
    controller : function($scope, $modal) {
        var modal = null;

        $scope.onIconClick = function() {
            modal = $modal.open({
                template : '<div>' +
                                '<div class="modal-header">' +
                                    '<h3 class="modal-title">{{\'msd_long\' | loc:lang}}</h3>' +
                                    '<span ng-click="clickX()" class="close-x">×</span>' +
                                '</div>' +
                                '<div class="modal-body msd-modal" ng-click="msdClick($event)" ng-include="\'markup/msd.html\'"></div>' +
                            '</div>',
                scope : $scope
            })
        }
        $scope.clickX = function(event) {
            modal.close()
        }
        $scope.msdClick = function(event) {
            val = $(event.target).parent().data("value")
            if(!val) return;
            $scope.model = val;


            modal.close();
        }
    }
};
*/


/*
*/
attrs.msd = {
    label: "msd",
    translationKey : "msdval_",
    opts: settings.defaultOptions,
    extendedTemplate: '<input ng-model="input" class="arg_value" escaper ng-model-options=\'{debounce : {default : 300, blur : 0}, updateOn: "default blur"}\'>' +
    '<span ng-click="onIconClick()" class="fa fa-info-circle"></span>',
    extendedController: function($scope, $uibModal) {
        var modal = null;

        $scope.onIconClick = function() {
            modal = $uibModal.open({
                template: '<div>' +
                                '<div class="modal-header">' +
                                    '<h3 class="modal-title">{{\'msd_long\' | loc:lang}}</h3>' +
                                    '<span ng-click="clickX()" class="close-x">×</span>' +
                                '</div>' +
                                '<div class="modal-body msd-modal" ng-click="msdClick($event)" ng-include="\'markup/msd.html\'"></div>' +
                            '</div>',
                scope: $scope
            })
        }
        $scope.clickX = function(event) {
            modal.close()
        }
        $scope.msdClick = function(event) {
            val = $(event.target).parent().data("value")
            if(!val) return;
            $scope.input = val;
            modal.close();
        }
    }
};
/*
*/

attrs.baseform = {
    label: "baseform",
    //type: "set",
    //opts: setOptions,
    opts :  settings.defaultOptions,
    extendedTemplate: "<input ng-model='model' >",
    order: 1
};
attrs.lemgram = {
    label: "lemgram",
    type: "set",
    opts: setOptions,
    stringify: function(lemgram) {
        // TODO: what if we're getting more than one consequtive lemgram back?
        return util.lemgramToString(_.str.trim(lemgram), true);
    },
    //externalSearch: karpLemgramLink,
    internalSearch: true,
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' typeahead-close-callback='checkForError(valueSelected)'/>"
                        + "<span ng-if='valueError' style='color: red; position: relative; top: 3px; margin-left: 6px'>{{'choose_lemgram' | loc:lang}}</span>",
    extendedController: function($scope) {
        $scope.valueError = false;

        $scope.checkForError = function(valueSelected) {
            $scope.valueError = !valueSelected;
        }
    },
    order: 2
};
attrs.dephead = {
    label: "dephead",
    displayType: "hidden"
};
attrs.deprel = {
    label: "deprel",
    translationKey: "deprel_",
    extendedTemplate: selectType.extendedTemplate,
    extendedController: selectType.extendedController,
    dataset: {
     	"→A"        : 	 "→A",
     	"→ADVL"     : 	 "→ADVL",
     	"→CC"       : 	 "→CC",
     	"→N"        : 	 "→N",
     	"→Num"      : 	 "→Num",
     	"→P"        : 	 "→P",
     	"→Pron"     : 	 "→Pron",
     	"←ADVL"     : 	 "←ADVL",
     	"←OBJ"      : 	 "←OBJ",
     	"←OPRED"    : 	 "←OPRED",
     	"←PPRED"    : 	 "←PPRED",
     	"←SPRED"    : 	 "←SPRED",
     	"←SUBJ"     : 	 "←SUBJ",
     	"-F←ADVL"   : 	 "-F←ADVL",
     	"-F←OBJ"    : 	 "-F←OBJ",
     	"-F←OPRED"  : 	 "-F←OPRED",
     	"-F←SUBJ"   : 	 "-F←SUBJ",
     	"-FADVL→"   : 	 "-FADVL→",
     	"-FOBJ→"    : 	 "-FOBJ→",
     	"-FSUBJ→"   : 	 "-FSUBJ→",
     	"A←"        : 	 "A←",
     	"ADVL"      : 	 "ADVL",
     	"ADVL→"     : 	 "ADVL→",
     	"ADVL→CS"   : 	 "ADVL→CS",
     	"ADVL←"     : 	 "ADVL←",
     	"APP-ADVL←" : 	 "APP-ADVL←",
     	"APP-N←"    : 	 "APP-N←",
     	"APP-Pron←" : 	 "APP-Pron←",
     	"CNP"       : 	 "CNP",
     	"COMP-CS←"  : 	 "COMP-CS←",
     	"CVP"       : 	 "CVP",
     	"FAUX"      : 	 "FAUX",
     	"FMV"       : 	 "FMV",
     	"FMVdic"    : 	 "FMVdic",
     	"FS-←ADVL"  : 	 "FS-←ADVL",
     	"FS-←SUBJ"  : 	 "FS-←SUBJ",
     	"FS-ADVL→"  : 	 "FS-ADVL→",
     	"FS-IAUX"   : 	 "FS-IAUX",
     	"FS-IMV"    : 	 "FS-IMV",
     	"FS-N←"     : 	 "FS-N←",
     	"FS-N←IAUX" : 	 "FS-N←IAUX",
     	"FS-N←IMV"  : 	 "FS-N←IMV",
     	"FS-OBJ"    : 	 "FS-OBJ",
     	"FS-P←"     : 	 "FS-P←",
     	"FS-VFIN←"  : 	 "FS-VFIN←",
     	"HNOUN"     : 	 "HNOUN",
     	"IAUX"      : 	 "IAUX",
     	"ICL-OBJ"   : 	 "ICL-OBJ",
     	"ICL-SUBJ"  : 	 "ICL-SUBJ",
     	"IMV"       : 	 "IMV",
     	"IMVdic"    : 	 "IMVdic",
     	"INTERJ"    : 	 "INTERJ",
     	"N←"        : 	 "N←",
     	"Num←"      : 	 "Num←",
     	"OBJ→"      : 	 "OBJ→",
     	"OPRED→"    : 	 "OPRED→",
     	"P←"        : 	 "P←",
     	"PCLE"      : 	 "PCLE",
     	"Pron←"     : 	 "Pron←",
     	"S←"        : 	 "S←",
     	"SPRED→"    : 	 "SPRED→",
     	"SPRED←OBJ" : 	 "SPRED←OBJ",
     	"SUBJ→"     : 	 "SUBJ→",
     	"VOC"       : 	 "VOC",
     	"X"         : 	 "X"
    },
    opts: liteOptions
};
attrs.prefix = {
    label: "prefix",
    type: "set",
    opts: setOptions,
    stringify: function(lemgram) {
        return util.lemgramToString(lemgram, true);
    },
    //externalSearch: karpLemgramLink,
    internalSearch: true,
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' variant='affix'/>"
};
attrs.suffix = {
    label: "suffix",
    type: "set",
    opts: setOptions,
    stringify: function(lemgram) {
        return util.lemgramToString(lemgram, true);
    },
//    externalSearch: karpLemgramLink,
    internalSearch: true,
    extendedTemplate: "<autoc model='model' placeholder='placeholder' type='lemgram' variant='affix'/>"
};
attrs.ref = {
    label: "ref",
    displayType: "hidden"
};
attrs.link = {
    label: "sentence_link"
};
attrs.ne_ex = {
    label: "ne_expr",
    translationKey: "ne_expr_",
    extendedTemplate: selectType.extendedTemplate,
    extendedController: selectType.extendedController,
    isStructAttr: true,
    dataset: [
       "ENAMEX",
       "TIMEX",
       "NUMEX",
   ]
};
attrs.ne_type = {
    label: "ne_type",
    translationKey: "ne_type_",
    extendedTemplate: selectType.extendedTemplate,
    extendedController: selectType.extendedController,
    isStructAttr: true,
    dataset: [
       "LOC",
       "PRS",
       "ORG",
       "EVN",
       "WRK",
       "OBJ",
       "MSR",
       "TME"
   ]
};
attrs.ne_subtype = {
    label: "ne_subtype",
    translationKey: "ne_subtype_",
    extendedTemplate: selectType.extendedTemplate,
    extendedController: selectType.extendedController,
    isStructAttr: true,
    dataset: [
        "AST",
        "GPL",
        "PPL",
        "FNC",
        "STR",
        "HUM",
        "MTH",
        "ANM",
        "CLC",
        "FIN",
        "ATH",
        "CLT",
        "PLT",
        "TVR",
        "EDU",
        "TRN",
        "CRP",
        "HPL",
        "WTH",
        "CLU",
        "ATL",
        "RLG",
        "WRT",
        "RTV",
        "WAO",
        "PRJ",
        "WMD",
        "WAE",
        "MDC",
        "FWP",
        "CMP",
        "VHA",
        "VHG",
        "VHW",
        "PRZ",
        "PRD",
        "VLM",
        "TMP",
        "INX",
        "DST",
        "PRC",
        "CUR",
        "DEN",
        "DSG",
        "SPD",
        "FRQ",
        "AGE",
        "MSU",
        "WMU",
        "CMU",
        "WEB",
        "PSS",
        "CVU",
        "IDX",
        "LST",
        "DAT",
        "PER"
   ],
   stringify: function(val) {
       lString = util.getLocaleStringUndefined("ne_subtype_" + val)
       return lString || val;
   }
};
attrs.ne_name = {
    label: "ne_name",
    isStructAttr: true
};
sattrs.date = {
    label: "date"
};

var modernAttrs = {
    pos: attrs.pos,
    msd: attrs.msd,
    lemma: attrs.baseform,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref
};


var modernAttrsNew = {
    pos: attrs.pos,
    msd: attrs.msd,
    lemma: attrs.baseform,
    lex: attrs.lemgram,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref,
    prefix: attrs.prefix,
    suffix: attrs.suffix,
    ne_ex: attrs.ne_ex,
    ne_type: attrs.ne_type,
    ne_subtype: attrs.ne_subtype,
    ne_name: attrs.ne_name,
    complemgram: {
        label: "complemgram",
        internalSearch: true,
        ranked: true,
        display: {
            expandList: {
                splitValue: function(value) { return value.split("+"); },
                searchKey: "lex",
                joinValues: " + ",
                stringify: function(lemgram) { return util.lemgramToString(lemgram, true); },
                linkAllValues: true
            }
        },
        type: "set",
        hideStatistics: true,
        hideExtended: true,
        hideCompare: true
    },
    compwf: {
        label: "compwf",
        display: {
            "expandList": {}
        },
        type: "set",
        hideStatistics: true,
        hideExtended: true,
        hideCompare: true
    },
    sense: {
        label: "sense",
        type: "set",
        ranked: true,
        display: {
            expandList: {
                internalSearch: function(key, value) { return "[" + key + " highest_rank '" + regescape(value) + "']"}
            }
        },
        stringify: function(sense) { return util.saldoToString(sense, true); },
        opts: probabilitySetOptions,
        externalSearch: "https://spraakbanken.gu.se/karp/#?mode=DEFAULT&search=extended||and|sense|equals|<%= val %>",
        internalSearch: true,
        extendedTemplate: settings.senseAutoComplete
    }
};

settings.commonStructTypes = {
    date_interval: {
        label: "date_interval",
        hideSidebar: "true",
        hideCompare: "true",
        hideStatistics: "true",
        opts: false,
        extendedTemplate: '<div class="date_interval_arg_type"> <div class="section"> <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> <i class="fa fa-calendar"></i> Från </button> {{combined.format("YYYY-MM-DD HH:mm")}} <time-interval ng-click="from_click($event)" class="date_interval popper_menu dropdown-menu" date-model="from_date" time-model="from_time" model="combined" min-date="minDate" max-date="maxDate"> </time-interval> </div> <div class="section"> <button class="btn btn-default btn-sm" popper no-close-on-click my="left top" at="right top"> <i class="fa fa-calendar"></i> Till </button> {{combined2.format("YYYY-MM-DD HH:mm")}} <time-interval ng-click="from_click($event)" class="date_interval popper_menu dropdown-menu" date-model="to_date" time-model="to_time" model="combined2" my="left top" at="right top" min-date="minDate" max-date="maxDate"> </time-interval> </div> </div>',
        extendedController: [
            "$scope", "searches", "$timeout", function($scope, searches, $timeout) {
                var cl, getTime, getYear, ref, ref1, ref2, s, updateIntervals;
                s = $scope;
                cl = settings.corpusListing;

                updateIntervals = function() {
                    var from, moments, ref, ref1, to;
                    moments = cl.getMomentInterval();
                    if (moments.length) {
                        return ref = _.invoke(moments, "toDate"), s.minDate = ref[0], s.maxDate = ref[1], ref;
                    } else {
                        ref1 = cl.getTimeInterval(), from = ref1[0], to = ref1[1];
                        s.minDate = moment(from.toString(), "YYYY").toDate();
                        return s.maxDate = moment(to.toString(), "YYYY").toDate();
                    }
                };

                s.$on("corpuschooserchange", function() {
                  return updateIntervals();
                });

                updateIntervals();

                s.from_click = function(event) {
                  event.originalEvent.preventDefault();
                  return event.originalEvent.stopPropagation();
                };

                getYear = function(val) {
                  return moment(val.toString(), "YYYYMMDD").toDate();
                };

                getTime = function(val) {
                  return moment(val.toString(), "HHmmss").toDate();
                };

                if (!s.model) {
                    s.from_date = s.minDate;
                    s.to_date = s.maxDate;
                    ref = _.invoke(cl.getMomentInterval(), "toDate"), s.from_time = ref[0], s.to_time = ref[1];
                } else if (s.model.length === 4) {
                    ref1 = _.map(s.model.slice(0, 3), getYear), s.from_date = ref1[0], s.to_date = ref1[1];
                    ref2 = _.map(s.model.slice(2), getTime), s.from_time = ref2[0], s.to_time = ref2[1];
                }
                return s.$watchGroup(["combined", "combined2"], function(arg) {
                    var combined, combined2;
                    combined = arg[0], combined2 = arg[1];
                    return s.model = [moment(s.from_date).format("YYYYMMDD"), moment(s.to_date).format("YYYYMMDD"), moment(s.from_time).format("HHmmss"), moment(s.to_time).format("HHmmss")];
                });
            }
        ]
    }
};
