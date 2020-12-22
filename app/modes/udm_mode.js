
settings.primaryColor = "#E0F4F4";
settings.primaryLight = "#F2FFFF";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};


settings.corpora.udm_wikipedia_20201209 = {
        id : "udm_wikipedia_20201209",
        title : "Udmurt Wikipedia",
        description : "Udmurt texts collected from the <a href=\"http://udm.wikipedia.org/wiki/%D0%9A%D1%83%D1%82%D1%81%D0%BA%D0%BE%D0%BD_%D0%B1%D0%B0%D0%BC\">Wikipedia</a>",
        within : settings.defaultWithin,
        context : settings.defaultContext,
        attributes : modernAttrs,
      	structAttributes : {
      		text_title : {label : "title"},
      		text_orig_lang : {label : "translated_from"},
      		text_gt_domain : {label : "domain"},
      	}
};

settings.corpusListing = new CorpusListing(settings.corpora);
