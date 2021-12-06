
settings.primaryColor = "#EDFCD5";
settings.primaryLight = "#f7fceb";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};

settings.corpora.smn_admin_20211118 = {
        id : "smn_admin_20211118",
        title : "Administrative texts",
        description : "Administrative texts, mostly from the <a href=\"http://www.samediggi.fi/index.php?lang=anaras/\">Saami Parliament</a> in Finland",
        within : settings.defaultWithin,
        context : settings.defaultContext,
        attributes : {
                pos : attrs.pos,
                msd : attrs.msd,
                lemma : attrs.baseform,
                dephead : attrs.dephead,
                deprel : attrs.deprel,
                ref : attrs.ref,
        },
        structAttributes : {
                text_title : {label : "title"},
                text_orig_lang : {label : "translated_from"},
                text_gt_domain : {label : "domain"},
                text_date: {label: "date"},
        }
};

settings.corpora.smn_bible_20211118 = {
        id : "smn_bible_20211118",
        title : "Religion texts",
        description : "Texts on religion",
        within : settings.defaultWithin,
        context : settings.defaultContext,
        attributes : {
                pos : attrs.pos,
                msd : attrs.msd,
                lemma : attrs.baseform,
                dephead : attrs.dephead,
                deprel : attrs.deprel,
                ref : attrs.ref,
        },
        structAttributes : {
                text_title : {label : "title"},
                text_orig_lang : {label : "translated_from"},
                text_gt_domain : {label : "domain"},
                text_date: {label: "date"},
        }
};

settings.corpora.smn_blogs_20211118 = {
  id: "smn_blogs_20211118",
  title: "Blogs",
  description: "A collection of blog texts",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes : {
        pos : attrs.pos,
        msd : attrs.msd,
        lemma : attrs.baseform,
        dephead : attrs.dephead,
        deprel : attrs.deprel,
        ref : attrs.ref,
  },
  structAttributes : {
        text_title : {label : "title"},
        text_orig_lang : {label : "translated_from"},
        text_gt_domain : {label : "domain"},
        text_date: {label: "date"},
  }
};


settings.corpora.smn_facta_20211118 = {
        id : "smn_facta_20211118",
        title : "Non-fiction texts",
        description : "A collection of non-fiction texts",
        within : settings.defaultWithin,
        context : settings.defaultContext,
        attributes : {
                pos : attrs.pos,
                msd : attrs.msd,
                lemma : attrs.baseform,
                dephead : attrs.dephead,
                deprel : attrs.deprel,
                ref : attrs.ref,
        },
        structAttributes : {
                text_title : {label : "title"},
                text_orig_lang : {label : "translated_from"},
                text_gt_domain : {label : "domain"},
                text_date: {label: "date"},
        }
};

settings.corpora.smn_ficti_20211118 = {
        id: "smn_ficti_20211118",
        title: "Fiction texts",
        description: "A collection of fiction texts",
        within: settings.defaultWithin,
        context: settings.defaultContext,
        attributes: modernAttrs,
        attributes : {
                pos : attrs.pos,
                msd : attrs.msd,
                lemma : attrs.baseform,
                dephead : attrs.dephead,
                deprel : attrs.deprel,
                ref : attrs.ref,
        },
        structAttributes : {
                text_title : {label : "title"},
                text_orig_lang : {label : "translated_from"},
                text_gt_domain : {label : "domain"},
                text_date: {label: "date"},
  }
};

settings.corpora.smn_news_20211118 = {
        id : "smn_news_20211118",
        title : "Newspaper texts",
        description : "Newspaper articles from Anarâš, Kierâš, and Min Áigi.",
        within : settings.defaultWithin,
        context : settings.defaultContext,
        attributes : {
                pos : attrs.pos,
                msd : attrs.msd,
                lemma : attrs.baseform,
                dephead : attrs.dephead,
                deprel : attrs.deprel,
                ref : attrs.ref,
        },
        structAttributes : {
                text_title : {label : "title"},
                text_orig_lang : {label : "translated_from"},
                text_gt_domain : {label : "domain"},
                text_date: {label: "date"},
        }
};


settings.corpora.smn_science_20211118 = {
        id : "smn_science_20211118",
        title : "Science texts",
        description : "A collection of science texts such as masters theses, phd theses, and articles",
        within : settings.defaultWithin,
        context : settings.defaultContext,
        attributes : {
                pos : attrs.pos,
                msd : attrs.msd,
                lemma : attrs.baseform,
                dephead : attrs.dephead,
                deprel : attrs.deprel,
                ref : attrs.ref,
        },
        structAttributes : {
                text_title : {label : "title"},
                text_orig_lang : {label : "translated_from"},
                text_gt_domain : {label : "domain"},
                text_date: {label: "date"},
        }
};

settings.corpora.smn_wikipedia_20211118 = {
        id : "smn_wikipedia_20211118",
        title : "Wikipedia texts",
        description : "A collection of wikipedia texts",
        within : settings.defaultWithin,
        context : settings.defaultContext,
        attributes : {
                pos : attrs.pos,
                msd : attrs.msd,
                lemma : attrs.baseform,
                dephead : attrs.dephead,
                deprel : attrs.deprel,
                ref : attrs.ref,
        },
        structAttributes : {
                text_title : {label : "title"},
                text_orig_lang : {label : "translated_from"},
                text_gt_domain : {label : "domain"},
                text_date: {label: "date"},
        }
};

settings.corpusListing = new CorpusListing(settings.corpora);
