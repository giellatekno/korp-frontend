
settings.primaryColor = "#E0F4F4";
settings.primaryLight = "#F2FFFF";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};

settings.corpora.fit_admin_20210319 = {
	id : "fit_admin_20210319",
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

settings.corpora.fit_bible_20210319 = {
	id : "fit_bible_20210319",
	title : "Religious texts",
	description : "A collection of religious texts",
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

settings.corpora.fit_facta_20210319 = {
	id : "fit_facta_20210319",
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

settings.corpora.fit_ficti_20210319 = {
	id : "fit_ficti_20210319",
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

settings.corpora.fit_news_20210319 = {
	id : "fit_news_20210319",
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

settings.corpora.fit_laws_20210319 = {
	id : "fit_laws_20210319",
	title : "Law texts",
	description : "A collection of legislative texts",
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

settings.corpora.fit_science_20210319 = {
	id : "fit_science_20210319",
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


settings.corpusListing = new CorpusListing(settings.corpora);
