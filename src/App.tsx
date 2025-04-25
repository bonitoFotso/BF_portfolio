import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './hooks/useLanguage';
import ScrollToTop from './components/utils/ScrollToTop';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoadingScreen from './components/utils/LoadingScreen';

function App() {
  const { i18n } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { theme } = useTheme();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Extract language from URL and set it if needed
  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const langInUrl = pathSegments[0];
    
    if ((langInUrl === 'fr' || langInUrl === 'en') && langInUrl !== language) {
      changeLanguage(langInUrl);
    }
  }, [location.pathname, language, changeLanguage]);

  // Update document metadata based on current language
  useEffect(() => {
    // Update the page title
    document.title = i18n.t('site.title');
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', i18n.t('site.description'));
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = i18n.t('site.description');
      document.head.appendChild(newMeta);
    }
    
    // Set the document language attribute for accessibility
    document.documentElement.lang = language;
    
    // Add a data-language attribute to the html element for CSS targeting
    document.documentElement.setAttribute('data-language', language);
  }, [language, i18n]);

  // Handle theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Add a data-theme attribute for CSS targeting
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Preload important assets
  useEffect(() => {
    // Preload any critical images or resources
    const criticalImages = [
      '/logo.png', 
      '/background-pattern.svg'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Route change scroll handling */}
      <ScrollToTop />
      
      {/* Toast notifications system */}
     
      
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/:lang" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;