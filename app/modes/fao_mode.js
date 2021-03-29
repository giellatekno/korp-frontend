
settings.primaryColor = "#E0F4F4";
settings.primaryLight = "#F2FFFF";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};

settings.corpora.fao_admin_20210319 = {
	id : "fao_admin_20210319",
	title : "Administration texts",
	description : "A collection of administration texts",
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

settings.corpora.fao_facta_20210319 = {
	id : "fao_facta_20210319",
	title : "Non-fiction texts",
	description : "A collection of non-fiction texts",
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

settings.corpora.fao_science_20210319 = {
	id : "fao_science_20210319",
	title : "Science texts",
	description : "A collection of science texts such as masters theses, phd theses, and articles",
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

settings.corpora.fao_wikipedia_20210319 = {
  id : "fao_wikipedia_20210319",
  title : "Faroese Wikipedia",
  description : "Faroese texts collected from the <a href=\"https://dumps.wikimedia.org/fowiki/20201221/\">Wikipedia</a>",
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
