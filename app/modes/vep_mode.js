
settings.primaryColor = "#E0F4F4";
settings.primaryLight = "#F2FFFF";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};


settings.corpora.vep_wikipedia_20210319 = {
  id : "vep_wikipedia_20210319",
  title : "Veps Wikipedia",
  description : "Veps texts collected from the <a href=\"http://vep.wikipedia.org/wiki/P%C3%A4lehtpol%E2%80%99\">Wikipedia</a>",
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
