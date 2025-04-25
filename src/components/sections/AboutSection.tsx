import { useTranslation } from 'react-i18next';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { BookOpen, Code, Eye, Users, Clock, CheckCircle, Award } from 'lucide-react';
import { cn } from '../../utils/cn';

const AboutSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // Experience metrics with counter animation
  const [animatedExperience, setAnimatedExperience] = useState(0);
  const [animatedProjects, setAnimatedProjects] = useState(0);
  const [animatedClients, setAnimatedClients] = useState(0);
  
  const metricsRef = useRef<HTMLDivElement>(null);
  const isMetricsInView = useInView(metricsRef, { once: true, amount: 0.5 });
  
  // Start counter animation when metrics section is in view
  if (isMetricsInView) {
    setTimeout(() => {
      const experienceDuration = 2000; // 2 seconds
      const projectsDuration = 1500;
      const clientsDuration = 1000;
      
      const experienceIncrement = 3 / (experienceDuration / 16);
      const projectsIncrement = 15 / (projectsDuration / 16);
      const clientsIncrement = 10 / (clientsDuration / 16);
      
      const experienceInterval = setInterval(() => {
        setAnimatedExperience(prev => {
          const next = prev + experienceIncrement;
          if (next >= 3) {
            clearInterval(experienceInterval);
            return 3;
          }
          return next;
        });
      }, 16);
      
      const projectsInterval = setInterval(() => {
        setAnimatedProjects(prev => {
          const next = prev + projectsIncrement;
          if (next >= 15) {
            clearInterval(projectsInterval);
            return 15;
          }
          return next;
        });
      }, 16);
      
      const clientsInterval = setInterval(() => {
        setAnimatedClients(prev => {
          const next = prev + clientsIncrement;
          if (next >= 10) {
            clearInterval(clientsInterval);
            return 10;
          }
          return next;
        });
      }, 16);
    }, 300);
  }
  
  const values = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: t('about.values.continuous_learning'),
      description: t('about.values.continuous_learning_desc'),
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: t('about.values.problem_solving'),
      description: t('about.values.problem_solving_desc'),
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: t('about.values.attention_to_detail'),
      description: t('about.values.attention_to_detail_desc'),
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: t('about.values.collaboration'),
      description: t('about.values.collaboration_desc'),
    },
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <motion.div 
        style={{ y: y1 }} 
        className="absolute top-20 right-0 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        style={{ y: y2 }} 
        className="absolute bottom-20 left-0 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl -z-10"
      />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column with photo and personal info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 shadow-md">
              {/* Profile photo with decorative border */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-sm transform -rotate-6"></div>
                <div className="absolute inset-0 border-2 border-primary/30 rounded-full"></div>
                <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-white dark:border-gray-800">
                  <img 
                    src="/api/placeholder/400/400" 
                    alt={t('about.profile_alt')} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              
              {/* Personal quote */}
              <div className="mb-6 text-center">
                <blockquote className="relative italic text-gray-700 dark:text-gray-300 px-8">
                  <div className="absolute top-0 left-0 text-4xl text-primary opacity-30">"</div>
                  <p className="relative z-10">{t('about.personal_quote')}</p>
                  <div className="absolute bottom-0 right-0 text-4xl text-primary opacity-30">"</div>
                </blockquote>
              </div>
              
              {/* Experience metrics */}
              <div ref={metricsRef} className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-primary mr-1" />
                    <span className="text-2xl font-bold">{Math.floor(animatedExperience)}+</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('about.metrics.years')}</p>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="h-5 w-5 text-primary mr-1" />
                    <span className="text-2xl font-bold">{Math.floor(animatedProjects)}+</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('about.metrics.projects')}</p>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-5 w-5 text-primary mr-1" />
                    <span className="text-2xl font-bold">{Math.floor(animatedClients)}+</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('about.metrics.clients')}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column with about text and journey */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('about.title')}</h2>
            <div className="h-1 w-20 bg-primary mb-8 rounded-full"></div>
            
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p className="text-lg">{t('about.intro')}</p>
              
              {/* Journey visualization */}
              <div className="relative py-8 px-4 border-l-2 border-primary/30 my-8">
                <div className="absolute top-0 left-0 w-4 h-4 -ml-2 rounded-full bg-primary"></div>
                
                <div className="ml-6 mb-8">
                  <h4 className="text-xl font-semibold mb-2">{t('about.journey.education')}</h4>
                  <p>{t('about.background')}</p>
                </div>
                
                <div className="absolute top-1/2 left-0 w-4 h-4 -ml-2 rounded-full bg-primary"></div>
                
                <div className="ml-6">
                  <h4 className="text-xl font-semibold mb-2">{t('about.journey.professional')}</h4>
                  <p>{t('about.philosophy')}</p>
                </div>
                
                <div className="absolute bottom-0 left-0 w-4 h-4 -ml-2 rounded-full bg-primary"></div>
              </div>
              
              <p className="text-lg">{t('about.conclusion')}</p>
            </div>
          </motion.div>
        </div>
        
        {/* Values section */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-8">{t('about.values.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={item}
                className={cn(
                  "bg-gray-50 dark:bg-gray-700 p-6 rounded-lg",
                  "border border-gray-100 dark:border-gray-600",
                  "hover:shadow-md dark:hover:shadow-gray-800/20 transition-shadow transform hover:-translate-y-1",
                  "flex flex-col items-center text-center"
                )}
              >
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;