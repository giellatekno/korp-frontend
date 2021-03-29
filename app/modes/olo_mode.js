
settings.primaryColor = "#E0F4F4";
settings.primaryLight = "#F2FFFF";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};


settings.corpora.olo_wikipedia_20210319 = {
  id : "olo_wikipedia_20210319",
  title : "Livvi Wikipedia",
  description : "Livvi texts collected from the <a href=\"https://dumps.wikimedia.org/olowiki/20210301/\">Wikipedia</a>",
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
