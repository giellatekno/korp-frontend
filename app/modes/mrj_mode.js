
settings.primaryColor = "#E0F4F4";
settings.primaryLight = "#F2FFFF";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};

settings.corpora.mrj_facta_20201209 = {
	id : "mrj_facta_20201209",
	title : "Non-fiction texts",
	description : "A collection of non-fiction texts",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
	}
};

settings.corpora.mrj_laws_20201209 = {
	id : "mrj_laws_20201209",
	title : "Law texts",
	description : "A collection of legislative texts",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
	}
};

settings.corpora.mrj_science_20201209 = {
	id : "mrj_science_20201209",
	title : "Science texts",
	description : "A collection of science texts such as masters theses, phd theses, and articles",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
	}
};

settings.corpora.mrj_news_20201209 = {
	id : "mrj_news_20201209",
	title : "News texts",
	description : "A collection of news texts",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
	}
};

settings.corpora.mrj_wikipedia_20201209 = {
	id : "mrj_wikipedia_20201209",
	title : "Wikipedia texts",
	description : "A collection of wikipedia texts",
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
