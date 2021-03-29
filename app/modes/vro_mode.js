
settings.primaryColor = "#E0F4F4";
settings.primaryLight = "#F2FFFF";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};


settings.corpora.vro_wikipedia_20210319 = {
  id : "vro_wikipedia_20210319",
  title : "Võro Wikipedia",
  description : "Võro texts collected from the <a href=\"http://fiu-vro.wikipedia.org/wiki/P%C3%A4%C3%A4leht\">Wikipedia</a>",
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
