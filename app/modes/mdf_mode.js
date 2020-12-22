
settings.primaryColor = "#E0F4F4";
settings.primaryLight = "#F2FFFF";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};


settings.corpora.mdf_wikipedia_20201209 = {
        id : "mdf_wikipedia_20201209",
        title : "Moksha Wikipedia",
        description : "Moksha texts collected from the <a href=\"http://mdf.wikipedia.org/wiki/%D0%9F%D1%80%D1%8F_%D0%BB%D0%BE%D0%BF%D0%B0\">Wikipedia</a>",
        within : settings.defaultWithin,
        context : settings.defaultContext,
        attributes : modernAttrs,
      	structAttributes : {
      		text_title : {label : "title"},
      		text_orig_lang : {label : "translated_from"},
      		text_gt_domain : {label : "domain"},
      	}
};

settings.corpora.mdf_news_20201209 = {
        id : "mdf_news_20201209",
        title : "Moksha news",
        description : "Moksha texts collected from the <a href=\"http://mdf.wikipedia.org/wiki/%D0%9F%D1%80%D1%8F_%D0%BB%D0%BE%D0%BF%D0%B0\">Wikipedia</a>",
        within : settings.defaultWithin,
        context : settings.defaultContext,
        attributes : modernAttrs,
      	structAttributes : {
      		text_title : {label : "title"},
      		text_orig_lang : {label : "translated_from"},
      		text_gt_domain : {label : "domain"},
      	}
};

/*
settings.corpora.mdf_erme_20160725 = {
        id : "mdf_erme_20160725",
        title : "ERME (Mokša/Moksha)",
        description : "ERME (Mokša/Moksha)",
        within : settings.defaultWithin,
        context : settings.defaultContext,
        attributes : {
                //pos : attrs.pos,
                //msd : attrs.msd,
                //lemma : attrs.baseform,
        },
        struct_attributes : {
                text_title : {label : "title"},
                //text_orig_lang : {label : "translated_from"},
                //text_gt_domain : {label : "domain"},
                text_author : {label : "author"},
                //text_last_name : {label : "autor_last_name"},
                text_year : {label : "year"},
                sentence_p : {label : "page_number"},
                //text_path : {label : "path"},
        }
};
*/
settings.corpusListing = new CorpusListing(settings.corpora);
