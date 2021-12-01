settings.primaryColor = "#E0F4F4";
settings.primaryLight = "#F2FFFF";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};
settings.corpora.smj_admin_20211118 = {
  id: "smj_admin_20211118",
  title: "Administrative texts",
  description: "A collection of administrative texts",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: {
    pos: attrs.pos,
    msd: attrs.msd,
    lemma: attrs.baseform,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref,
  },
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora.smj_bible_20211118 = {
  id: "smj_bible_20211118",
  title: "Religion texts",
  description: "A collection of texts on religion",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: {
    pos: attrs.pos,
    msd: attrs.msd,
    lemma: attrs.baseform,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref,
  },
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora.smj_facta_20211118 = {
  id: "smj_facta_20211118",
  title: "Non-fiction texts",
  description: "A collection of non-fiction texts",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: {
    pos: attrs.pos,
    msd: attrs.msd,
    lemma: attrs.baseform,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref,
  },
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora.smj_ficti_20211118 = {
  id: "smj_ficti_20211118",
  title: "Fiction texts",
  description: "A collection of fiction texts",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: {
    pos: attrs.pos,
    msd: attrs.msd,
    lemma: attrs.baseform,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref,
  },
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora.smj_laws_20211118 = {
  id: "smj_laws_20211118",
  title: "Law texts",
  description: "A collection of legislative texts",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: {
    pos: attrs.pos,
    msd: attrs.msd,
    lemma: attrs.baseform,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref,
  },
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora.smj_news_20211118 = {
  id: "smj_news_20211118",
  title: "Newspaper texts",
  description: "A collection of newspaper texts",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: {
    pos: attrs.pos,
    msd: attrs.msd,
    lemma: attrs.baseform,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref,
  },
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
  },
};

settings.corpora.smj_science_20211118 = {
  id: "smj_science_20211118",
  title: "Science texts",
  description:
    "A collection of science texts such as masters theses, phd theses, and articles",
  within: settings.defaultWithin,
  context: settings.defaultContext,
  attributes: {
    pos: attrs.pos,
    msd: attrs.msd,
    lemma: attrs.baseform,
    dephead: attrs.dephead,
    deprel: attrs.deprel,
    ref: attrs.ref,
  },
  structAttributes: {
    text_title: { label: "title" },
    text_orig_lang: { label: "translated_from" },
    text_gt_domain: { label: "domain" },
  },
};

settings.corpusListing = new CorpusListing(settings.corpora);
