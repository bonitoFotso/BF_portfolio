import { Heart, ArrowUp } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <span className="text-lg font-bold">Fotso.dev</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('footer.copyright', { year: currentYear })}
            </p>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
              {t('footer.madeWith')}
            </span>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
              {t('footer.usingTech')}
            </span>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-4 md:mt-0 p-3 rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
            aria-label={t('footer.backToTop')}
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;