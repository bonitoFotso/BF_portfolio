import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { Briefcase, Calendar, MapPin, ExternalLink, Building, Award } from 'lucide-react';
import { cn } from '../../utils/cn';

// Define types for experience data
interface Experience {
  id: string;
  company: {
    en: string;
    fr: string;
  };
  role: {
    en: string;
    fr: string;
  };
  location: string;
  period: {
    start: string;
    end: string | null; // null means present/current
  };
  description: {
    en: string;
    fr: string;
  };
  achievements: {
    en: string[];
    fr: string[];
  };
  skills: string[];
  companyUrl?: string;
  logo?: string;
}

// Sample experience data
const experiences: Experience[] = [
  {
    id: 'kes',
    company: {
      en: 'KES Africa',
      fr: 'KES Africa'
    },
    role: {
      en: 'Full-stack Developer',
      fr: 'Développeur Full-stack'
    },
    location: 'Douala, Cameroon',
    period: {
      start: '2024-03',
      end: null
    },
    description: {
      en: 'Developing innovative applications for business management and training certification, implementing containerization and CI/CD pipelines.',
      fr: 'Développement d\'applications innovantes pour la gestion d\'entreprise et la certification de formations, mise en place de conteneurisation et pipelines CI/CD.'
    },
    achievements: {
      en: [
        'Designed and implemented QR code identification system for equipment tracking',
        'Built certificate generation application that reduced issuance time from days to minutes',
        'Implemented Docker containerization for all applications',
        'Set up CI/CD pipelines with GitHub Actions'
      ],
      fr: [
        'Conception et implémentation d\'un système d\'identification par QR code pour le suivi des équipements',
        'Développement d\'une application de génération de certificats qui a réduit le temps d\'émission de jours à minutes',
        'Mise en place de la conteneurisation Docker pour toutes les applications',
        'Configuration de pipelines CI/CD avec GitHub Actions'
      ]
    },
    skills: ['Django', 'React', 'Flutter', 'Docker', 'CI/CD', 'GitHub Actions'],
    companyUrl: 'https://example.com/kes-africa',
    logo: '/api/placeholder/150/150'
  },
  {
    id: 'servitel',
    company: {
      en: 'Servitel',
      fr: 'Servitel'
    },
    role: {
      en: 'Web Developer & Network Specialist',
      fr: 'Développeur Web & Spécialiste Réseaux'
    },
    location: 'Douala, Cameroon',
    period: {
      start: '2023-03',
      end: '2023-12'
    },
    description: {
      en: 'Developed helpdesk task management application while also working on network systems, access control, and video surveillance.',
      fr: 'Développement d\'une application de gestion de tâches pour le helpdesk tout en travaillant sur les systèmes de réseaux, le contrôle d\'accès et la vidéosurveillance.'
    },
    achievements: {
      en: [
        'Built task management system that reduced coordination time by 40%',
        'Improved client satisfaction rates by 25% with efficient reporting',
        'Optimized technician routes by 15% through geolocation integration',
        'Configured and installed security equipment from Hikvision, Dahua, and other manufacturers'
      ],
      fr: [
        'Développement d\'un système de gestion des tâches qui a réduit le temps de coordination de 40%',
        'Amélioration des taux de satisfaction client de 25% grâce à des rapports efficaces',
        'Optimisation des itinéraires des techniciens de 15% grâce à l\'intégration de la géolocalisation',
        'Configuration et installation d\'équipements de sécurité des marques Hikvision, Dahua et autres fabricants'
      ]
    },
    skills: ['React.js', 'Django REST Framework', 'MySQL', 'Network Configuration', 'Security Systems'],
    companyUrl: 'https://example.com/servitel',
    logo: '/api/placeholder/150/150'
  },
  {
    id: 'innovation',
    company: {
      en: 'Innovation SARL',
      fr: 'Innovation SARL'
    },
    role: {
      en: 'IT Intern',
      fr: 'Stagiaire Informatique'
    },
    location: 'Douala, Cameroon',
    period: {
      start: '2020-06',
      end: '2022-05'
    },
    description: {
      en: 'Completed three 3-month internships at this startup specializing in networks, access control, video surveillance, and web development.',
      fr: 'Réalisation de trois stages de 3 mois chacun dans cette start-up spécialisée dans les réseaux, le contrôle d\'accès, la vidéosurveillance et le développement web.'
    },
    achievements: {
      en: [
        'Received practical training on security systems and equipment',
        'Participated in network infrastructure setup projects',
        'Assisted with client-side video surveillance installations',
        'Learned Odoo services implementation for business management'
      ],
      fr: [
        'Formation pratique sur les systèmes et équipements de sécurité',
        'Participation à des projets de mise en place d\'infrastructures réseau',
        'Assistance aux installations de vidéosurveillance chez les clients',
        'Apprentissage de l\'implémentation des services Odoo pour la gestion d\'entreprise'
      ]
    },
    skills: ['Network Basics', 'Security Systems', 'Odoo', 'Video Surveillance'],
    companyUrl: 'https://example.com/innovation-sarl',
    logo: '/api/placeholder/150/150'
  }
];

const ExperienceSection: React.FC = () => {
  const { t, language, formatDate } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Spring animation for smooth scrolling progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
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
  
  // Format date for display
  const formatDisplayDate = (dateString: string | null): string => {
    if (!dateString) return t('experience.present');
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-US', { 
        year: 'numeric', 
        month: 'long' 
      }).format(date);
    } catch (error) {
      return dateString;
    }
  };
  
  // Calculate duration in months/years
  const calculateDuration = (start: string, end: string | null): string => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    
    const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 
                        + (endDate.getMonth() - startDate.getMonth());
    
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    let duration = '';
    
    if (years > 0) {
      duration += `${years} ${years === 1 ? t('experience.year') : t('experience.years')}`;
    }
    
    if (months > 0 || years === 0) {
      if (years > 0) duration += ' ';
      duration += `${months} ${months === 1 ? t('experience.month') : t('experience.months')}`;
    }
    
    return duration;
  };
  
  return (
    <section id="experience" className="py-20 relative">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 -left-20 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -right-20 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('experience.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </motion.div>
        
        {/* Timeline with experiences */}
        <div className="relative" ref={sectionRef}>
          {/* Progress line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary origin-top"
            style={{ 
              height: smoothProgress, 
              scaleY: smoothProgress
            }}
          ></motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative"
          >
            {experiences.map((experience, index) => (
              <motion.div 
                key={experience.id}
                variants={itemVariants}
                custom={index}
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative",
                  index % 2 === 0 ? "md:grid-flow-row" : "md:grid-flow-row"
                )}
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-gray-800 border-4 border-primary z-10"></div>
                
                {/* Date marker */}
                <div className={cn(
                  "absolute left-1/2 transform -translate-x-1/2 mt-8 bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap",
                  index % 2 === 0 ? "md:translate-x-20" : "md:-translate-x-20"
                )}>
                  {formatDisplayDate(experience.period.start)} - {formatDisplayDate(experience.period.end)}
                </div>
                
                {/* Content box */}
                <motion.div 
                  className={cn(
                    "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg md:col-span-1",
                    index % 2 === 0 
                      ? "md:text-right md:col-start-1" 
                      : "md:col-start-2"
                  )}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    {experience.logo && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={experience.logo}
                          alt={experience.company[language as keyof typeof experience.company]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className={cn(
                      "flex-grow",
                      index % 2 === 0 ? "md:text-right" : ""
                    )}>
                      <h3 className="text-xl font-bold">
                        {experience.role[language as keyof typeof experience.role]}
                      </h3>
                      <div className="flex items-center gap-1 text-primary">
                        <Building size={16} />
                        <span className="font-medium">
                          {experience.company[language as keyof typeof experience.company]}
                        </span>
                        {experience.companyUrl && (
                          <a 
                            href={experience.companyUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-primary transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="flex-shrink-0" />
                        <span>{calculateDuration(experience.period.start, experience.period.end)}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="flex-shrink-0" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400">
                      {experience.description[language as keyof typeof experience.description]}
                    </p>
                    
                    {/* Key achievements */}
                    <div>
                      <h4 className="font-bold mb-2 flex items-center gap-1">
                        <Award size={16} className="text-primary" />
                        {t('experience.keyAchievements')}
                      </h4>
                      <ul className="space-y-1">
                        {experience.achievements[language as keyof typeof experience.achievements].map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Skills used */}
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* Visual spacer for the alternating layout */}
                <div className="hidden md:block"></div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Final marker */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-5 h-5 rounded-full bg-primary z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;