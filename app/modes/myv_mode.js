
settings.primaryColor = "#EDFCD5";
settings.primaryLight = "#f7fceb";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};

settings.corpora.myv_wikipedia_20201209 = {
        id : "myv_wikipedia_20201209",
        title : "Erzya Wikipedia",
        description : "Erzya texts collected from the <a href=\"http://myv.wikipedia.org/wiki/%D0%9F%D1%80%D1%8F%D0%B2%D1%82%D0%BB%D0%BE%D0%BF%D0%B0\">Wikipedia</a>",
        within : settings.defaultWithin,
        context : settings.defaultContext,
        attributes : modernAttrs,
        structAttributes : {
      		text_title : {label : "title"},
      		text_orig_lang : {label : "translated_from"},
      		text_gt_domain : {label : "domain"},
          text_date: {label: "date"},
      	}
};

settings.corpora.myv_ficti_20201209 = {
	id : "myv_ficti_20201209",
	title : "Fiction texts",
	description : "A collection of fiction texts",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
    text_date: {label: "date"},
	}
};

settings.corpora.myv_news_20201209 = {
	id : "myv_news_20201209",
	title : "News texts",
	description : "A collection of news texts",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
    text_date: {label: "date"},
	}
};


settings.corpusListing = new CorpusListing(settings.corpora);
