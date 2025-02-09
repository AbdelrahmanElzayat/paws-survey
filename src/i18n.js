import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translations
import translationsEN from "./locals/en.json";
import translationsAR from "./locals/ar.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: translationsEN,
      },
      ar: {
        translation: translationsAR,
      },
    },
    lng: "ar", // default language
    fallbackLng: "ar", // fallback language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
