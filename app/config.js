
var settings = {};

var isLab = window.isLab || false;

settings.autocomplete = false;
settings.enableMap = !isLab;
settings.mapPosTag = ["PM", "NNP", "NNPS"]
settings.newMapEnabled = isLab;
settings.hitsPerPageDefault = 100
settings.hitsPerPageValues = [25,50,75,100,500,1000]
settings.enableBackendKwicDownload = false
settings.enableFrontendKwicDownload = true

settings.languages = ["se", "nb", "fi", "sv", "en"];
settings.defaultLanguage = "fi";

settings.downloadFormats = [
    "csv",
    "tsv",
    "annot",
    "ref",
];

settings.downloadFormatParams = {
    "*": {
        structs: "+"
    },
    "ref": {
        format: "bibref,xls"
    },
    "csvp": {
        format: "tokens,csv",
        attrs: "+,-lex",
        match_marker: "***"
    },
    "csv": {
        format: "sentences,csv"
    },
    "annot": {
        format: "tokens,xls",
        attrs: "+,-lex",
        match_marker: "***"
    },
    "nooj": {
        attrs: "+"
    },
    "tsv": {
        format: "sentences,tsv"
    },
    "vrt": {
        attrs: "+"
    },
};

// for extended search dropdown, can be 'union' or 'intersection'
settings.wordAttributeSelector = "union";
settings.structAttributeSelector = "union";

// for 'compile statistics by' selector, can be 'union' or 'intersection'
settings.reduceWordAttributeSelector = "intersection";
settings.reduceStructAttributeSelector = "intersection";

settings.filterSelection = "intersection"

settings.newsDeskUrl = "news.json";

settings.visibleModes = 7
settings.modeConfig = [
  {
      localekey: "fkv_texts",
      mode: "default"
  },
  {
      localekey: "fit_texts",
      mode: "fit",
  },
  {
      localekey: "vep_texts",
      mode: "vep",
  },
  {
      localekey: "vro_texts",
      mode: "vro",
  },
  {
      localekey: "fao_texts",
      mode: "fao",
  },
  {
      localekey: "olo_texts",
      mode: "olo",
  },
  {
      localekey: "parallel_texts",
      mode: "parallel"
  }
];

settings.primaryColor = "rgb(221, 233, 255)";
settings.primaryLight = "rgb(242, 247, 255)";
settings.secondaryColor = "";

settings.corpora = {};

settings.defaultContext = {
	"1 sentence" : "1 sentence"
};
settings.spContext = {
	"1 sentence" : "1 sentence",
	"1 paragraph" : "1 paragraph"
};
settings.defaultWithin = {
	"sentence" : "sentence"
};
settings.spWithin = {
	"sentence" : "sentence",
	"paragraph" : "paragraph"
};

settings.defaultOverviewContext = "1 sentence"
settings.defaultReadingContext = "1 paragraph"


// for optimization purposes
settings.cqp_prio = ['deprel', 'pos', 'msd', 'grundform', 'lemgram', 'word'];

settings.defaultOptions = {
    "is": "=",
    "is_not": "!=",
    "starts_with": "^=",
    "contains": "_=",
    "ends_with": "&=",
    "matches": "*=",
    "matches_not": "!*=",
}

settings.contRegexOptions = {
        "contains" : "contains",
        "matches" : "matches"
};

settings.defaultOptionsMsd = {
    "contains": "_=",
    "is": "=",
    "is_not": "!=",
    "starts_with": "^=",
    "ends_with": "&=",
    "matches": "*=",
    "matches_not": "!*=",
}

settings.korpBackendURL = "http://gtweb.uit.no/ws/gt_korp";

settings.mapCenter = {
  lat: 62.99515845212052,
  lng: 16.69921875,
  zoom: 4
};
