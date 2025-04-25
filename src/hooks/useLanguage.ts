import { useTranslation } from "react-i18next";
import { useLanguageContext } from "../context/LanguageContext";
import { useCallback } from "react";

export const useLanguage = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguageContext();
  
  // Toggle between supported languages
  const toggleLanguage = useCallback(() => {
    const newLanguage = language === "en" ? "fr" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  }, [language, setLanguage, i18n]);
  
  // Change to a specific language
  const changeLanguage = useCallback((lang: string) => {
    if (lang === "en" || lang === "fr") {
      setLanguage(lang);
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    } else {
      console.warn(`Language ${lang} is not supported.`);
    }
  }, [setLanguage, i18n]);
  
  // Format date according to current language
  const formatDate = useCallback((date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString(
      language === 'fr' ? 'fr-FR' : 'en-US', 
      options
    );
  }, [language]);
  
  return {
    language,
    setLanguage,
    toggleLanguage,
    changeLanguage,
    formatDate,
    t,
    i18n
  };
};