
settings.primaryColor = "#E0F4F4";
settings.primaryLight = "#F2FFFF";
settings.autocomplete = false;
settings.lemgramSelect = false;
settings.wordpicture = false;

settings.corpora = {};
settings.corporafolders = {};


settings.corpora.koi_wikipedia_20201209 = {
        id : "koi_wikipedia_20201209",
        title : "Komi-Permyak Wikipedia",
        description : "Komi-Permyak texts collected from the <a href=\"https://koi.wikipedia.org/wiki/Пондӧтчан_листбок\">Wikipedia</a>",
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
