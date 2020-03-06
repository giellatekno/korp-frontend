
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
settings.defaultLanguage = "se";

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

settings.newsDeskUrl = "http://gtweb.uit.no/korp/pub/gt_news.json";

settings.wordpictureTagset = {
    // supported pos-tags
    verb: "V",
    noun: "N",
    adjective: "A",
    //adverb: "Adv",
    //pronoun: "Pron",
    popos: "Po",
    prpos: "Pr",
    //cc: "CC",

    // dependency releations
    //subject: "SUBJ",
    sub_to_left: "SUBJ→",
    sub_to_right: "←SUBJ",
    fsubj_to_left: "-FSUBJ→",

    //object: "OBJ",
    obj_to_left: "OBJ→",
    obj_to_right: "←OBJ",
    fobj_to_left: "-FOBJ→",
    fobj_to_right: "-F←OBJ", //?? same description as -FOBJ→

    advl_to_left: "ADVL→",
    advl_to_right: "←ADVL",
    complement_of_advl: "ADVL←", //to left or right?
    modifier_of_advl:"→ADVL",

    modifier_of_noun: "N←",
    prenominal_modifier_to_left: "→N",
    hnoun: "HNOUN",

    modifier_of_adj_to_left:"→A",
    modifier_of_adj_to_right:"A←",

    complement_of_popos_to_left: "→P",
    complement_of_prpos_to_right: "P←",

    fmv: "FMV",
    faux: "FAUX",

    modifier_of_pron_to_left: "→Pron",
    modifier_of_pron_to_right: "Pron←",
}


settings.wordPictureConf = {
    verb: [
      [
        {rel: "sub_to_left", css_class: "color_blue", alt_label: "Subject"},
        {rel: "fsubj_to_left", css_class: "color_blue", alt_label: "F-Subject"},
        {rel: "obj_to_left", css_class: "color_yellow", alt_label: "Object"},
        {rel: "fobj_to_left", css_class: "color_yellow", alt_label: "Object"},
        {rel: "advl_to_left", css_class: "color_purple", alt_label: "Adverbial"},
        {rel: "faux", css_class: "color_green", alt_label: "Finite auxiliary verb"},
        "_"
      ],
      [
        "_",
        {rel: "sub_to_right", css_class: "color_blue", alt_label: "Subject"},
        {rel: "obj_to_right", css_class: "color_yellow", alt_label: "Object"},
        {rel: "fobj_to_right", css_class: "color_yellow", alt_label: "Object"},
        {rel: "advl_to_right", css_class: "color_purple", alt_label: "Adverbial"},
        {rel: "fmv", css_class: "color_red", alt_label: "Finite main verb"},
      ],
    ],
    noun: [
      [
        {rel: "modifier_of_advl", css_class: "color_purple_light", alt_label: "Mod. of advl."},
        {rel: "prenominal_modifier_to_left", css_class: "color_white", alt_label: "Prenom. mod."},
        {rel: "complement_of_popos_to_left", css_class: "color_azure", alt_label: "Compl. of Po"},
        {rel: "modifier_of_advl", css_class: "color_purple_light dep", field_reverse: true, alt_label: "Mod. of advl. (dep)"},
        {rel: "prenominal_modifier_to_left", css_class: "color_white dep", field_reverse: true, alt_label: "Prenom. mod. (dep)"},
        {rel: "complement_of_popos_to_left", css_class: "color_azure dep", field_reverse: true, alt_label: "Compl. of Po (dep)"},
        {rel: "obj_to_left", css_class: "color_yellow dep", field_reverse: true, alt_label: "Object (dep)"},
        {rel: "sub_to_left", css_class: "color_blue dep", field_reverse: true, alt_label: "Subject (dep)"},
        "_"
      ],
      [
        "_",
        {rel: "modifier_of_noun", css_class: "color_white", alt_label: "Noun mod."},
        {rel: "complement_of_advl", css_class: "color_purple", alt_label: "Compl. of advl."},
        {rel: "complement_of_prpos_to_right", css_class: "color_azure", alt_label: "Compl. of Po"},
        {rel: "advl_to_right", css_class: "color_purple", alt_label: "Adverbial"},
        {rel: "modifier_of_noun", css_class: "color_white dep", field_reverse: true, alt_label: "Noun mod. (dep)"},
        {rel: "complement_of_advl", css_class: "color_purple dep", field_reverse: true, alt_label: "Compl. of advl. (dep)"},
        {rel: "complement_of_prpos_to_right", css_class: "color_azure dep", field_reverse: true, alt_label: "Compl. of Po (dep)"},
        {rel: "advl_to_right", css_class: "color_purple dep", field_reverse: true, alt_label: "Adverbial (dep)"},
        {rel: "obj_to_right", css_class: "color_yellow dep", field_reverse: true, alt_label: "Object (dep)"},
        {rel: "sub_to_right", css_class: "color_blue dep", field_reverse: true, alt_label: "Subject (dep)"},
      ]
    ],
    adjective: [
      [
        {rel: "modifier_of_adj_to_left", css_class: "color_purple", alt_label: "Mod. of adj."},
        {rel: "prenominal_modifier_to_left", css_class: "color_white", alt_label: "Prenom. mod."},
        {rel: "prenominal_modifier_to_left", css_class: "color_white dep", field_reverse: true, alt_label: "Prenom. mod. (dep)"},
        "_"
      ],
      [
        "_",
        {rel: "modifier_of_adj_to_right", css_class: "color_purple", alt_label: "Mod. of adj."},
      ],
    ],
    popos: [
      [
        {rel: "complement_of_popos_to_left", css_class: "color_azure", alt_label: "Compl. of Po"},
        {rel: "advl_to_left", css_class: "color_purple", field_reverse: true, alt_label: "Adverbial"},
        "_",
      ],
      [
        "_",
        {rel: "advl_to_right", css_class: "color_purple", field_reverse: true, alt_label: "Adverbial"},
      ],
    ],
    prpos: [
      [
        {rel: "prenominal_modifier_to_left", css_class: "color_white", field_reverse: true, alt_label: "Prenom. mod."},
        {rel: "advl_to_left", css_class: "color_purple", field_reverse: true, alt_label: "Adverbial"},
        "_"
      ],
      [
        "_",
        {rel: "complement_of_prpos_to_right", css_class: "color_azure", alt_label: "Compl. of Po"},
        {rel: "advl_to_right", css_class: "color_purple", field_reverse: true, alt_label: "Adverbial"},
      ],

    ]
}

settings.visibleModes = 7
settings.modeConfig = [
    {
        localekey: "se_texts",
        mode: "default"
    },
    {
        localekey: "smj_texts",
        mode: "smj",
    },
    {
        localekey: "sma_texts",
        mode: "sma",
    },
    {
        localekey: "smn_texts",
        mode: "smn",
    },
    {
        localekey: "sms_texts",
        mode: "sms",
    },
    {
        localekey: "parallel_texts",
        mode: "parallel"
    },
    {
        localekey: "parallel_fin",
        mode: "parallel_fin"
    }
];

settings.primaryColor = "rgb(221, 233, 255)";
settings.primaryLight = "rgb(242, 247, 255)";
/*
settings.defaultOverviewContext = "1 sentence"
settings.defaultReadingContext = "1 paragraph"

settings.defaultWithin = {
    "sentence": "sentence"
};
*/
settings.defaultOverviewContext = "1 sentence"
settings.defaultReadingContext = "1 paragraph"

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

// for optimization purposes
settings.cqpPrio = ['deprel', 'pos', 'msd', 'suffix', 'prefix', 'grundform', 'lemgram', 'saldo', 'word'];

settings.defaultOptions = {
    "is": "=",
    "is_not": "!=",
    "starts_with": "^=",
    "contains": "_=",
    "ends_with": "&=",
    "matches": "*=",
    "matches_not": "!*=",
}

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
//settings.downloadCgiScript = "https://ws.spraakbanken.gu.se/ws/korp/download";

settings.mapCenter = {
  lat: 62.99515845212052,
  lng: 16.69921875,
  zoom: 4
};
