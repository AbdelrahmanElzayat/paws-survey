import { useState } from "react";
import { createContext } from "react";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "en";
  });
  const { i18n } = useTranslation();
  useEffect(() => {
    const langLocal = localStorage.getItem("lang");
    if (langLocal) {
      setLang(langLocal);
    } else {
      localStorage.setItem("lang", lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
