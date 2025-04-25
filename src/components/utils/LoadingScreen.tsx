import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LoadingScreen = () => {
  const { t } = useTranslation();
  
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center">
      <div className="relative">
        {/* Lab flask icon with animated liquid */}
        <svg 
          width="80" 
          height="80" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <path 
            d="M9 3H15M10 3V7.53481C10 8.24584 9.785 8.93907 9.38873 9.49896L5.08873 15.5989C4.3582 16.6162 4 17.8301 4 19.073V19.5C4 20.8807 5.11929 22 6.5 22H17.5C18.8807 22 20 20.8807 20 19.5V19.073C20 17.8301 19.6418 16.6162 18.9113 15.5989L14.6113 9.49896C14.215 8.93907 14 8.24584 14 7.53481V3" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <motion.path
            d="M6 17H18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ 
              pathLength: 1, 
              pathOffset: 1,
              transition: { 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
          />
        </svg>
        
        {/* Pulsing circle behind the flask */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-primary/20"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </div>
      
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          Fotso.dev
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('loading')}...
        </p>
      </motion.div>
      
      {/* Loading progress bar */}
      <motion.div 
        className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;