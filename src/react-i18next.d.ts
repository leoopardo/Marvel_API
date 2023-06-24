// import the original type declarations
import "react-i18next";
// import all namespaces (for the default language, only)
import en from "../public/locales/en/translation.json";
import ptbr from "../public/locales/ptbr/translation.json";

// react-i18next versions lower than 11.11.0
declare module "react-i18next" {
  // and extend them!
  interface Resources {
    en: typeof en;
    pt: typeof ptbr;
  }
}

// react-i18next versions higher than 11.11.0
declare module "react-i18next" {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: "ptbr";
    // custom resources type
    resources: {
      en: typeof en;
      ptbr: typeof ptbr;
    };
  }
}
