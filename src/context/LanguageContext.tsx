import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

type Language = "en" | "fr";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
  updateURLPath?: boolean;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  isLanguageLoading: boolean;
};

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  isLanguageLoading: true,
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "portfolio-language",
  updateURLPath = true,
  ...props
}: LanguageProviderProps) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLanguageLoading, setIsLanguageLoading] = useState(true);
  
  // Initialize language from URL, localStorage, or browser
  const [language, setLanguageState] = useState<Language>(() => {
    // Check URL path first
    const pathLang = location.pathname.split('/')[1];
    if (pathLang === 'fr' || pathLang === 'en') {
      return pathLang as Language;
    }
    
    // Then check localStorage
    const storedLang = localStorage.getItem(storageKey) as Language;
    if (storedLang === 'en' || storedLang === 'fr') {
      return storedLang;
    }
    
    // Finally check browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'fr') return 'fr';
    
    // Default fallback
    return defaultLanguage;
  });
  
  // Handle language change with proper URL updates
  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
  }, []);
  
  // Update i18n instance and URL on language change
  useEffect(() => {
    const updateLanguage = async () => {
      setIsLanguageLoading(true);
      
      // Change i18n language
      await i18n.changeLanguage(language);
      
      // Save to localStorage
      localStorage.setItem(storageKey, language);
      
      // Update URL if enabled
      if (updateURLPath) {
        const currentPath = location.pathname;
        const currentSearch = location.search;
        const currentHash = location.hash;
        
        // Get path without language prefix
        let pathWithoutLang = currentPath;
        const pathSegments = currentPath.split('/').filter(Boolean);
        
        if (pathSegments[0] === 'en' || pathSegments[0] === 'fr') {
          // Remove language segment
          pathSegments.shift();
          pathWithoutLang = pathSegments.length ? `/${pathSegments.join('/')}` : '/';
        }
        
        // Create new path with current language
        const newPath = language === defaultLanguage 
          ? pathWithoutLang // Default language doesn't need prefix
          : `/${language}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
        
        const fullPath = `${newPath}${currentSearch}${currentHash}`;
        
        if (fullPath !== `${currentPath}${currentSearch}${currentHash}`) {
          navigate(fullPath, { replace: true });
        }
      }
      
      setIsLanguageLoading(false);
    };
    
    updateLanguage();
  }, [language, i18n, navigate, location, storageKey, updateURLPath, defaultLanguage]);
  
  return (
    <LanguageProviderContext.Provider
      {...props}
      value={{ language, setLanguage, isLanguageLoading }}
    >
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguageContext = () => {
  const context = useContext(LanguageProviderContext);
  if (context === undefined)
    throw new Error("useLanguageContext must be used within a LanguageProvider");
  return context;
};