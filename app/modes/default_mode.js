settings.corpora = {};
settings.corporafolders = {};

/*
 * FOLDERS
 */

settings.corporafolders.news = {
    title : "Newspapers",
    contents : ["sme_assu_20181106", "sme_avvir_20181106", "sme_minaigi_20181106", "sme_nrk_20181106"]
 //   description : "This is a collection of newspaper texts from Aššu, Avvir and Min Aigi."
};

/*
 * PRESELECTED CORPORA
 * Folders will be expanded to all corpora. Optionally prefix folders with __ , which will be ignored.
 */
// TODO: this should be moved when modern texts are moved to their own mode
if(window.currentMode == "default")

    settings.preselected_corpora = ["sme_assu_20181106", "sme_avvir_20181106", "sme_minaigi_20181106",
				    "sme_nrk_20181106", "sme_blogs_20181106",
                                    "sme_admin_20181106", "sme_bible_20181106", "sme_facta_20181106",
                                    "sme_ficti_20181106", "sme_laws_20181106", "sme_science_20181106",
                                    "sme_muitalus_20170319", "__sme_wikipedia_DATE"];

/*
 * CORPORA
 */

settings.corpora.sme_admin_20181106 = {
	id : "sme_admin_20181106",
	title : "Administrative texts",
	description : "Administrative texts, mostly from the <a href=\"http://www.samediggi.no/\" target=\"_blank\">Saami Parliament</a> in Norway",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		//text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
		//text_first_name : {label : "autor_first_name"},
		//text_last_name : {label : "autor_last_name"},
		//text_year : {label : "year"},
		//text_path : {label : "path"},
	}
};

settings.corpora.sme_bible_20181106 = {
	id : "sme_bible_20181106",
	title : "Religion texts",
	description : "Texts on religion",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		//text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
		//text_first_name : {label : "autor_first_name"},
		//text_last_name : {label : "autor_last_name"},
		//text_year : {label : "year"},
		//text_path : {label : "path"},
	}
};

settings.corpora.sme_facta_20181106 = {
	id : "sme_facta_20181106",
	title : "Non-fiction texts",
	description : "A collection of non-fiction texts",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		//text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
		//text_first_name : {label : "autor_first_name"},
		//text_last_name : {label : "autor_last_name"},
		//text_year : {label : "year"},
		//text_path : {label : "path"},
	}
};

settings.corpora.sme_ficti_20181106 = {
	id : "sme_ficti_20181106",
	title : "Fiction texts",
	description : "A collection of fiction texts",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		//text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
		//text_first_name : {label : "autor_first_name"},
		//text_last_name : {label : "autor_last_name"},
		//text_year : {label : "year"},
		//text_path : {label : "path"},
	}
};

settings.corpora.sme_laws_20181106 = {
	id : "sme_laws_20181106",
	title : "Law texts",
	description : "A collection of legislative texts",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		//text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
		//text_first_name : {label : "autor_first_name"},
		//text_last_name : {label : "autor_last_name"},
		//text_year : {label : "year"},
		//text_path : {label : "path"},
	}
};

settings.corpora.sme_science_20181106 = {
	id : "sme_science_20181106",
	title : "Science texts",
	description : "A collection of science texts such as masters theses, phd theses, and articles",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		//text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
		//text_first_name : {label : "autor_first_name"},
		//text_last_name : {label : "autor_last_name"},
		//text_year : {label : "year"},
		//text_path : {label : "path"},
	}
};


settings.corpora.sme_assu_20181106 = {
	id : "sme_assu_20181106",
	title : "Aššu",
	description : "Aššu newspaper",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		//text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
		//text_first_name : {label : "autor_first_name"},
		//text_last_name : {label : "autor_last_name"},
		//text_year : {label : "year"},
		//text_path : {label : "path"},
	}
};

settings.corpora.sme_avvir_20181106 = {
	id : "sme_avvir_20181106",
	title : "Avvir",
	description : "Avvir newspaper",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		//text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
		//text_first_name : {label : "autor_first_name"},
		//text_last_name : {label : "autor_last_name"},
		//text_year : {label : "year"},
		//text_path : {label : "path"},
	}
};

settings.corpora.sme_minaigi_20181106 = {
	id : "sme_minaigi_20181106",
	title : "Min Aigi",
	description : "Min Aigi newspaper",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		//text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
		//text_first_name : {label : "autor_first_name"},
		//text_last_name : {label : "autor_last_name"},
		//text_year : {label : "year"},
		//text_path : {label : "path"},
	}
};

settings.corpora.sme_nrk_20181106 = {
	id : "sme_nrk_20181106",
	title : "NRK news",
	description : "A collection of articles from the Norwegian broadcasting corporation <a href=\"https://www.nrk.no/\">NRK</a>.",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		//text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
		//text_first_name : {label : "autor_first_name"},
		//text_last_name : {label : "autor_last_name"},
		//text_year : {label : "year"},
		//text_path : {label : "path"},
	}
};

settings.corpora.sme_blogs_20181106 = {
	id : "sme_blogs_20181106",
	title : "North Saami blogs",
	description : "A collection of blog texts",
	within : settings.defaultWithin,
	context : settings.defaultContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		//text_orig_lang : {label : "translated_from"},
		text_gt_domain : {label : "domain"},
		//text_first_name : {label : "autor_first_name"},
		//text_last_name : {label : "autor_last_name"},
		//text_year : {label : "year"},
		//text_path : {label : "path"},
	}
};


settings.corpora.sme_muitalus_20170319 = {
	id : "sme_muitalus_20170319",
	title : "An Account of the Sami",
	description : "<b>Muitalus sámiid birra</b>, <i>An Account of the Sami</i>, written in 1910 by <a href=\"http://en.wikipedia.org/wiki/Johan_Turi\">Johan Turi</a> is seen as the first book in Sami.",
	within : settings.spWithin,
	context : settings.spContext,
	attributes : modernAttrs,
	structAttributes : {
		text_title : {label : "title"},
		text_gt_domain : {label : "domain"},
		//text_first_name : {label : "autor_first_name"},
		//text_last_name : {label : "autor_last_name"},
		//text_year : {label : "year"},
	}
};

settings.corpusListing = new CorpusListing(settings.corpora);
