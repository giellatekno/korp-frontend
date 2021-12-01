
settings.primaryColor = "#EDFCD5";
settings.primaryLight = "#f7fceb";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};

settings.corpora.sms_admin_20211118 = {
        id : "sms_admin_20211118",
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
        }
};

settings.corpora.sms_blogs_20211118 = {
        id: "sms_blogs_20211118",
        title: "Blogs",
        description: "A collection of blog texts",
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
        }
};

settings.corpora.sms_facta_20211118 = {
        id : "sms_facta_20211118",
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
        }
};

settings.corpora.sms_laws_20211118 = {
        id : "sms_laws_20211118",
        title : "Law texts",
        description : "A collection of legislative texts",
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
        }
};

settings.corpora.sms_literature_20211118 = {
        id : "sms_literature_20211118",
        title : "Literary texts",
        description : "A small collection of literary texts",
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
        }
};

settings.corpora.sms_science_20211118 = {
        id : "sms_science_20211118",
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
        }
};

settings.corpora.sms_news_20211118 = {
        id: "sms_news_20211118",
        title: "News texts",
        description: "A collection of news texts",
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
        }
};

settings.corpusListing = new CorpusListing(settings.corpora);
