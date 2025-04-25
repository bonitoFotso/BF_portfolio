import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

const NotFoundPage = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4"
    >
      <h1 className="text-6xl md:text-8xl font-bold text-primary">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-2">{t('notFound.title')}</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        {t('notFound.subtitle')}
      </p>
      <Link
        to={`/${language}`}
        className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        {t('notFound.action')}
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;