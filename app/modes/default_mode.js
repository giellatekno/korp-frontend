settings.corpora = {};
settings.corporafolders = {};

/*
 * FOLDERS
 */

/*
 * PRESELECTED CORPORA
 * Folders will be expanded to all corpora. Optionally prefix folders with __ , which will be ignored.
 */
// TODO: this should be moved when modern texts are moved to their own mode
if (window.currentMode == "default")
  settings.preselected_corpora = [
    "sme_admin_20211118",
    "sme_bible_20211118",
    "sme_facta_20211118",
    "sme_ficti_20211118",
    "sme_laws_20211118",
    "sme_science_20211118",
    "sme_news_20211118",
    "sme_blogs_20211118",
  ];
/*

  settings.preselected_corpora = ["test_admin", "sme_admin_20211118"];
  */

/*
 * CORPORA
 */

settings.corpora.sme_admin_20211118 = {
  id: "sme_admin_20211118",
  title: "Administrative texts",
  description:
    'Administrative texts, mostly from the <a href="http://www.samediggi.no/" target="_blank">Saami Parliament</a> in Norway',
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: modernAttrs,
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
    text_date: {label: "date"},
  },
};

settings.corpora.sme_bible_20211118 = {
  id: "sme_bible_20211118",
  title: "Religion texts",
  description: "Texts on religion",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: modernAttrs,
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
    text_date: {label: "date"},
  },
};

settings.corpora.sme_facta_20211118 = {
  id: "sme_facta_20211118",
  title: "Non-fiction texts",
  description: "A collection of non-fiction texts",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: modernAttrs,
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
    text_date: {label: "date"},
  },
};

settings.corpora.sme_ficti_20211118 = {
  id: "sme_ficti_20211118",
  title: "Fiction texts",
  description: "A collection of fiction texts",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: modernAttrs,
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
    text_date: {label: "date"},
  },
};


settings.corpora.sme_laws_20211118 = {
  id: "sme_laws_20211118",
  title: "Law texts",
  description: "A collection of legislative texts",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: modernAttrs,
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
    text_date: {label: "date"},
  },
};

settings.corpora.sme_news_20211118 = {
  id: "sme_news_20211118",
  title: "News texts",
  description: "A collection of news texts",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: modernAttrs,
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
    text_date: {label: "date"},
  },
};

settings.corpora.sme_science_20211118 = {
  id: "sme_science_20211118",
  title: "Science texts",
  description:
    "A collection of science texts such as masters theses, phd theses, and articles",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: modernAttrs,
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
    text_date: {label: "date"},
  },
};

settings.corpora.sme_blogs_20211118 = {
  id: "sme_blogs_20211118",
  title: "North Saami blogs",
  description: "A collection of blog texts",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: modernAttrs,
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
    text_date: {label: "date"},
  },
};


/*
settings.corpora.test_admin = {
  id: "test_admin",
  title: "Test corpus",
  description:
    'Administrative texts, mostly from the <a href="http://www.samediggi.no/" target="_blank">Saami Parliament</a> in Norway',
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: modernAttrs,
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
    //text_first_name : {label : "autor_first_name"},
    //text_last_name : {label : "autor_last_name"},
    //text_year : {label : "year"},
    //text_path : {label : "path"},
  },
};
*/

settings.corpusListing = new CorpusListing(settings.corpora);
