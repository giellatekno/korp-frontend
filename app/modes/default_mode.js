settings.corpora = {};

/*
 * FOLDERS
*/
settings.corporafolders = {};

/*
	* CORPORA
*/
settings.preselected_corpora = ["kpv_ficti_20201209", "kpv_laws_20201209", "kpv_wikipedia_20201209", "kpv_facta_20201209"]

settings.corpora.kpv_ficti_20201209 = {
	id : "kpv_ficti_20201209",
	title : "Fiction texts",
	description : "A collection of fiction texts",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
	}
};

settings.corpora.kpv_laws_20201209 = {
	id : "kpv_laws_20201209",
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

settings.corpora.kpv_wikipedia_20201209 = {
	id : "kpv_wikipedia_20201209",
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

settings.corpora.kpv_facta_20201209 = {
	id : "kpv_facta_20201209",
	title : "Non-fiction texts",
	description : "A collection of fiction texts",
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
