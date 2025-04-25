import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import { cn } from '../../utils/cn';

// Define types for education data
interface Education {
  id: string;
  degree: {
    en: string;
    fr: string;
  };
  field: {
    en: string;
    fr: string;
  };
  institution: {
    en: string;
    fr: string;
  };
  location: string;
  period: {
    start: string;
    end: string;
  };
  description?: {
    en: string;
    fr: string;
  };
  achievements?: {
    en: string[];
    fr: string[];
  };
  logo?: string;
}

// Sample education data
const educations: Education[] = [
  {
    id: 'iut-douala',
    degree: {
      en: "Bachelor's Degree",
      fr: "Licence"
    },
    field: {
      en: "Software Engineering",
      fr: "Génie Logiciel"
    },
    institution: {
      en: "IUT Douala",
      fr: "IUT de Douala"
    },
    location: "Douala, Cameroon",
    period: {
      start: "2022",
      end: "2023"
    },
    description: {
      en: "Studied advanced software engineering concepts with a focus on web and mobile development.",
      fr: "Étude de concepts avancés de génie logiciel avec une spécialisation en développement web et mobile."
    },
    achievements: {
      en: [
        "Graduated with honors",
        "Developed multiple web applications as part of the academic projects",
        "Participated in coding competitions"
      ],
      fr: [
        "Diplômé avec mention",
        "Développement de plusieurs applications web dans le cadre des projets académiques",
        "Participation à des compétitions de programmation"
      ]
    },
    logo: '/api/placeholder/150/150'
  },
  {
    id: 'est-la-salle',
    degree: {
      en: "Higher Technician Certificate (BTS)",
      fr: "Brevet de Technicien Supérieur (BTS)"
    },
    field: {
      en: "Industrial Computing and Automation",
      fr: "Informatique Industrielle et Automatisme"
    },
    institution: {
      en: "EST La Salle",
      fr: "EST La Salle"
    },
    location: "Douala, Cameroon",
    period: {
      start: "2020",
      end: "2022"
    },
    description: {
      en: "Learned the fundamentals of industrial computing, automation systems, and basic software development.",
      fr: "Apprentissage des fondamentaux de l'informatique industrielle, des systèmes d'automatisation et du développement logiciel de base."
    },
    achievements: {
      en: [
        "Completed practical training in industrial control systems",
        "Designed automated solutions for industrial processes",
        "Developed programming skills in various languages"
      ],
      fr: [
        "Formation pratique complète sur les systèmes de contrôle industriel",
        "Conception de solutions automatisées pour les processus industriels",
        "Développement de compétences en programmation dans divers langages"
      ]
    },
    logo: '/api/placeholder/150/150'
  },
  {
    id: 'college-progressif',
    degree: {
      en: "Baccalaureate",
      fr: "Baccalauréat"
    },
    field: {
      en: "Science",
      fr: "Sciences"
    },
    institution: {
      en: "Collège Progressif Ngouno",
      fr: "Collège Progressif Ngouno"
    },
    location: "Bonabéri, Douala, Cameroon",
    period: {
      start: "2017",
      end: "2020"
    },
    description: {
      en: "Completed secondary education with a focus on scientific disciplines including mathematics and physics.",
      fr: "Éducation secondaire complétée avec une concentration sur les disciplines scientifiques, notamment les mathématiques et la physique."
    },
    logo: '/api/placeholder/150/150'
  }
];

const EducationSection: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('education.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('education.subtitle')}
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          {educations.map((education, index) => (
            <motion.div 
              key={education.id}
              variants={itemVariants}
              className="relative"
            >
              {/* Connecting line */}
              {index < educations.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-1 bg-gray-200 dark:bg-gray-700"></div>
              )}
              
              <div className="flex gap-6 mb-12">
                {/* Icon / Logo */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center z-10 relative">
                    {education.logo ? (
                      <img
                        src={education.logo}
                        alt={education.institution[language as keyof typeof education.institution]}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <GraduationCap size={24} className="text-primary" />
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-xl font-bold mb-1">
                      {education.degree[language as keyof typeof education.degree]} - {education.field[language as keyof typeof education.field]}
                    </h3>
                    
                    <div className="text-primary font-medium mb-3">
                      {education.institution[language as keyof typeof education.institution]}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="flex-shrink-0" />
                        <span>{education.period.start} - {education.period.end}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="flex-shrink-0" />
                        <span>{education.location}</span>
                      </div>
                    </div>
                    
                    {education.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {education.description[language as keyof typeof education.description]}
                      </p>
                    )}
                    
                    {/* Achievements if any */}
                    {education.achievements && (
                      <div className="mt-3">
                        <h4 className="font-medium mb-2 flex items-center gap-1">
                          <Award size={16} className="text-primary" />
                          {t('education.achievements')}
                        </h4>
                        <ul className="space-y-1">
                          {education.achievements[language as keyof typeof education.achievements].map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Additional certifications/courses section */}
          <motion.div
            variants={itemVariants}
            className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="text-primary" size={20} />
              {t('education.additionalCertifications')}
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="font-medium">{t('education.certifications.programming')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  FreeCodeCamp, 2021
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="font-medium">{t('education.certifications.network')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Innovation SARL, 2022
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;