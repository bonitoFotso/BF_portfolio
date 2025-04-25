import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { ExternalLink, Github, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '../../utils/cn';

// Project interface
interface Project {
  id: string;
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  challenge: {
    en: string;
    fr: string;
  };
  solution: {
    en: string;
    fr: string;
  };
  impact: {
    en: string;
    fr: string;
  };
  technologies: string[];
  screenshots: string[];
  repositoryUrl?: string;
  liveUrl?: string;
}

// Sample project data
const projectsData: Project[] = [
  {
    id: 'qr-app',
    title: {
      en: 'QR Code Label Generator',
      fr: 'Générateur d\'Étiquettes QR Code'
    },
    description: {
      en: 'Web application for generating, printing and managing identification labels with QR codes for equipment tracking.',
      fr: 'Application web permettant la génération, l\'impression et la gestion d\'étiquettes d\'identification avec QR codes pour le suivi d\'équipements.'
    },
    challenge: {
      en: 'Optimize the simultaneous generation of multiple QR codes while ensuring each code is unique and validated.',
      fr: 'Optimiser la génération simultanée de multiples QR codes tout en garantissant que chaque code est unique et validé.'
    },
    solution: {
      en: 'Implemented a batch processing system with database validation to prevent duplicates and optimize performance.',
      fr: 'Mise en place d\'un système de traitement par lots avec validation en base de données pour éviter les doublons et optimiser les performances.'
    },
    impact: {
      en: 'Reduced label generation time by 60% and eliminated duplicate QR codes, significantly improving inventory management.',
      fr: 'Réduction du temps de génération d\'étiquettes de 60% et élimination des codes QR dupliqués, améliorant significativement la gestion d\'inventaire.'
    },
    technologies: ['React', 'TypeScript', 'Django', 'PostgreSQL', 'QR Code API'],
    screenshots: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ],
    repositoryUrl: 'https://github.com/yourusername/qr-generator',
    liveUrl: 'https://qr-generator.example.com'
  },
  {
    id: 'training-mgmt',
    title: {
      en: 'Training Management System',
      fr: 'Système de Gestion de Formations'
    },
    description: {
      en: 'Mobile and web application for complete management of training sessions, participants, and automated certificate generation.',
      fr: 'Application mobile et web permettant la gestion complète des formations, des participants et la génération automatisée d\'attestations.'
    },
    challenge: {
      en: 'Create a system that works both online and offline with seamless data synchronization between mobile and server.',
      fr: 'Créer un système fonctionnant aussi bien en ligne que hors ligne avec une synchronisation fluide des données entre mobile et serveur.'
    },
    solution: {
      en: 'Developed a sophisticated data syncing mechanism using SQLite for local storage and PostgreSQL for server with conflict resolution algorithms.',
      fr: 'Développement d\'un mécanisme sophistiqué de synchronisation des données utilisant SQLite pour le stockage local et PostgreSQL pour le serveur avec des algorithmes de résolution de conflits.'
    },
    impact: {
      en: 'Increased training completion rate by 30% and reduced certificate issuing time from 2 days to mere minutes.',
      fr: 'Augmentation du taux d\'achèvement des formations de 30% et réduction du temps d\'émission des certificats de 2 jours à quelques minutes.'
    },
    technologies: ['Flutter', 'Dart', 'Django', 'REST API', 'SQLite', 'PostgreSQL'],
    screenshots: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ],
    repositoryUrl: 'https://github.com/yourusername/training-management',
    liveUrl: 'https://training-app.example.com'
  },
  {
    id: 'helpdesk',
    title: {
      en: 'Helpdesk Task Management',
      fr: 'Gestion de Tâches Helpdesk'
    },
    description: {
      en: 'Web platform developed for Servitel to track and coordinate technical teams during client interventions.',
      fr: 'Plateforme web développée pour Servitel permettant le suivi et la coordination des équipes techniques lors d\'interventions chez les clients.'
    },
    challenge: {
      en: 'Track multiple technical teams in real-time and optimize their intervention routes while providing actionable data to management.',
      fr: 'Suivre plusieurs équipes techniques en temps réel et optimiser leurs parcours d\'intervention tout en fournissant des données exploitables à la direction.'
    },
    solution: {
      en: 'Created a React-based dashboard with geolocation tracking, task assignment algorithms, and comprehensive reporting system.',
      fr: 'Création d\'un tableau de bord basé sur React avec suivi de géolocalisation, algorithmes d\'attribution des tâches et système de reporting complet.'
    },
    impact: {
      en: 'Reduced coordination time by 40%, improved client satisfaction by 25%, and optimized intervention routes by 15%.',
      fr: 'Réduction de 40% du temps de coordination, amélioration de 25% de la satisfaction client et optimisation de 15% des parcours d\'intervention.'
    },
    technologies: ['React.js', 'Django REST Framework', 'MySQL', 'Docker', 'Geolocation API'],
    screenshots: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  }
];

// Filter type
type FilterType = 'all' | 'frontend' | 'backend' | 'mobile';

const ProjectsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // For parallax effect in project cards
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  // Filter projects based on current filter
  const filteredProjects = projectsData.filter(project => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'frontend' && 
        (project.technologies.includes('React') || 
         project.technologies.includes('React.js') || 
         project.technologies.includes('TypeScript'))) return true;
    if (currentFilter === 'backend' && 
        (project.technologies.includes('Django') || 
         project.technologies.includes('PostgreSQL') || 
         project.technologies.includes('MySQL'))) return true;
    if (currentFilter === 'mobile' && 
        (project.technologies.includes('Flutter') || 
         project.technologies.includes('Dart'))) return true;
    return false;
  });
  
  // Handle mouse move for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setMousePosition({
      x: (e.clientX - centerX) / 20,
      y: (e.clientY - centerY) / 20
    });
    
    x.set((e.clientX - centerX) / 20);
    y.set((e.clientY - centerY) / 20);
  };
  
  // Navigate to next/previous project
  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    
    const currentIndex = projectsData.findIndex(p => p.id === selectedProject.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % projectsData.length;
    } else {
      newIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    }
    
    setSelectedProject(projectsData[newIndex]);
    setSelectedImageIndex(0); // Reset image index for new project
  };

  // Navigation for project images
  const navigateImages = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    
    const imageCount = selectedProject.screenshots.length;
    
    if (direction === 'next') {
      setSelectedImageIndex((selectedImageIndex + 1) % imageCount);
    } else {
      setSelectedImageIndex((selectedImageIndex - 1 + imageCount) % imageCount);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Generate gradient based on technologies
  const getGradient = (technologies: string[]): string => {
    const techColors: Record<string, string> = {
      'React': 'from-blue-500',
      'React.js': 'from-blue-500',
      'TypeScript': 'from-blue-400',
      'Django': 'from-green-600',
      'Flutter': 'from-sky-400',
      'Dart': 'from-blue-300',
      'PostgreSQL': 'from-indigo-600',
      'MySQL': 'from-orange-400',
      'Docker': 'from-blue-600',
    };
    
    // Find first matching technology for gradient start
    const fromColor = technologies.find(tech => techColors[tech]) || 'from-primary';
    const toColor = 'to-primary/50';
    
    return `bg-gradient-to-br ${techColors[fromColor] || fromColor} ${toColor}`;
  };
  
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('projects.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
          
          {/* Filter controls */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentFilter('all')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                currentFilter === 'all' 
                  ? "bg-primary text-white" 
                  : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              )}
            >
              {t('projects.filters.all')}
            </button>
            <button
              onClick={() => setCurrentFilter('frontend')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                currentFilter === 'frontend' 
                  ? "bg-primary text-white" 
                  : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              )}
            >
              {t('projects.filters.frontend')}
            </button>
            <button
              onClick={() => setCurrentFilter('backend')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                currentFilter === 'backend' 
                  ? "bg-primary text-white" 
                  : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              )}
            >
              {t('projects.filters.backend')}
            </button>
            <button
              onClick={() => setCurrentFilter('mobile')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                currentFilter === 'mobile' 
                  ? "bg-primary text-white" 
                  : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              )}
            >
              {t('projects.filters.mobile')}
            </button>
          </div>
        </motion.div>
        
        {/* Laboratory-themed background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        
        {/* Project cards grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project card */}
              <motion.div
                style={{
                  rotateX: rotateX,
                  rotateY: rotateY,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Project image with gradient overlay */}
                <div className="relative h-48 overflow-hidden">
                  <div className={cn(
                    "absolute inset-0 opacity-80",
                    getGradient(project.technologies)
                  )} />
                  <img 
                    src={project.screenshots[0]} 
                    alt={project.title[language as keyof typeof project.title]} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Technologies floating over image */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-white/90 dark:bg-gray-900/90 rounded text-xs font-medium backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/90 dark:bg-gray-900/90 rounded text-xs font-medium backdrop-blur-sm">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Project info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">
                    {project.title[language as keyof typeof project.title]}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {project.description[language as keyof typeof project.description]}
                  </p>
                  
                  {/* Links */}
                  <div className="flex justify-between items-center">
                    <button 
                      className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium"
                    >
                      {t('projects.viewDetails')}
                      <ChevronRight size={16} />
                    </button>
                    
                    <div className="flex gap-2">
                      {project.repositoryUrl && (
                        <a 
                          href={project.repositoryUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Project detail modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Images carousel */}
                  <div className="relative h-72 md:h-96 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={selectedImageIndex}
                        src={selectedProject.screenshots[selectedImageIndex]} 
                        alt={`Screenshot ${selectedImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>
                    
                    {/* Image navigation */}
                    {selectedProject.screenshots.length > 1 && (
                      <>
                        <button 
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateImages('prev');
                          }}
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateImages('next');
                          }}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                    
                    {/* Image indicators */}
                    {selectedProject.screenshots.length > 1 && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                        {selectedProject.screenshots.map((_, index) => (
                          <button
                            key={index}
                            className={cn(
                              "w-2 h-2 rounded-full transition-all",
                              index === selectedImageIndex 
                                ? "bg-white w-4" 
                                : "bg-white/50 hover:bg-white/80"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImageIndex(index);
                            }}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Project navigation */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button 
                        className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateProject('prev');
                        }}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateProject('next');
                        }}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Project info */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedProject.title[language as keyof typeof selectedProject.title]}
                    </h2>
                    
                    <div className="flex flex-wrap gap-1 mb-6">
                      {selectedProject.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-primary/10 dark:bg-primary/20 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {selectedProject.description[language as keyof typeof selectedProject.description]}
                    </p>
                    
                    {/* Problem-Solution-Impact boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/20">
                        <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">
                          {t('projects.challenge')}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {selectedProject.challenge[language as keyof typeof selectedProject.challenge]}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/20">
                        <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
                          {t('projects.solution')}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {selectedProject.solution[language as keyof typeof selectedProject.solution]}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/20">
                        <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">
                          {t('projects.impact')}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {selectedProject.impact[language as keyof typeof selectedProject.impact]}
                        </p>
                      </div>
                    </div>
                    
                    {/* Links */}
                    <div className="flex flex-wrap gap-4">
                      {selectedProject.repositoryUrl && (
                        <a 
                          href={selectedProject.repositoryUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Github size={18} />
                          {t('projects.viewCode')}
                        </a>
                      )}
                      {selectedProject.liveUrl && (
                        <a 
                          href={selectedProject.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <ExternalLink size={18} />
                          {t('projects.liveSite')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;