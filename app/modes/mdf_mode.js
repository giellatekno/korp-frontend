
settings.primaryColor = "#E0F4F4";
settings.primaryLight = "#F2FFFF";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};


settings.corpora.mdf_wikipedia_20201209 = {
        id : "mdf_wikipedia_20201209",
        title : "Moksha Wikipedia",
        description : "Moksha texts collected from the <a href=\"http://mdf.wikipedia.org/wiki/%D0%9F%D1%80%D1%8F_%D0%BB%D0%BE%D0%BF%D0%B0\">Wikipedia</a>",
        within : settings.defaultWithin,
        context : settings.defaultContext,
        attributes : modernAttrs,
      	structAttributes : {
      		text_title : {label : "title"},
      		text_orig_lang : {label : "translated_from"},
      		text_gt_domain : {label : "domain"},
          text_text_date: {label: "date"},
      	}
};

settings.corpora.mdf_news_20201209 = {
        id : "mdf_news_20201209",
        title : "Moksha news",
        description : "Moksha texts collected from the <a href=\"http://mdf.wikipedia.org/wiki/%D0%9F%D1%80%D1%8F_%D0%BB%D0%BE%D0%BF%D0%B0\">Wikipedia</a>",
        within : settings.defaultWithin,
        context : settings.defaultContext,
        attributes : modernAttrs,
      	structAttributes : {
      		text_title : {label : "title"},
      		text_orig_lang : {label : "translated_from"},
      		text_gt_domain : {label : "domain"},
          text_text_date: {label: "date"},
      	}
};

settings.corpusListing = new CorpusListing(settings.corpora);
