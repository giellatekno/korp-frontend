settings.corpora = {};

/*
 * FOLDERS
*/
settings.corporafolders = {};

/*
	* CORPORA
*/
settings.preselected_corpora = ["fkv_admin_20210319.vrt",  "fkv_bible_20210319.vrt",  "fkv_facta_20210319.vrt",  "fkv_ficti_20210319.vrt", "fkv_news_20210319.vrt"]

settings.corpora.fkv_admin_20210319 = {
	id : "fkv_admin_20210319",
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

settings.corpora.fkv_bible_20210319 = {
	id : "fkv_bible_20210319",
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

settings.corpora.fkv_facta_20210319 = {
	id : "fkv_facta_20210319",
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

settings.corpora.fkv_ficti_20210319 = {
	id : "fkv_ficti_20210319",
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

settings.corpora.fkv_news_20210319 = {
	id : "fkv_news_20210319",
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
