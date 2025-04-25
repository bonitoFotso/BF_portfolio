import { useState, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { Code, Server, PaintBucket, Database, Settings, Wrench, Globe, Monitor, Layers, 
         Container, Network, CloudCog, Cpu } from 'lucide-react';
import { cn } from '../../utils/cn';

// Define types for skills data
interface Skill {
  name: string;
  level: number; // 1-5
  icon?: React.ReactNode;
  category: 'frontend' | 'backend' | 'mobile' | 'devops' | 'other';
  years: number;
}

interface SkillCategory {
  id: string;
  title: {
    en: string;
    fr: string;
  };
  icon: React.ReactNode;
  color: string;
}

// Sample skills data
const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 5, icon: <Code />, category: 'frontend', years: 3 },
  { name: 'TypeScript', level: 4, icon: <Code />, category: 'frontend', years: 2 },
  { name: 'JavaScript', level: 5, icon: <Code />, category: 'frontend', years: 4 },
  { name: 'HTML/CSS', level: 5, icon: <PaintBucket />, category: 'frontend', years: 4 },
  { name: 'Tailwind CSS', level: 4, icon: <PaintBucket />, category: 'frontend', years: 2 },
  { name: 'Redux', level: 4, icon: <Layers />, category: 'frontend', years: 2 },
  
  // Backend
  { name: 'Django', level: 5, icon: <Server />, category: 'backend', years: 3 },
  { name: 'Python', level: 4, icon: <Code />, category: 'backend', years: 3 },
  { name: 'PostgreSQL', level: 4, icon: <Database />, category: 'backend', years: 3 },
  { name: 'MySQL', level: 3, icon: <Database />, category: 'backend', years: 2 },
  { name: 'REST API', level: 5, icon: <Globe />, category: 'backend', years: 3 },
  { name: 'SQLite', level: 4, icon: <Database />, category: 'backend', years: 3 },
  
  // Mobile
  { name: 'Flutter', level: 4, icon: <Monitor />, category: 'mobile', years: 2 },
  { name: 'Dart', level: 4, icon: <Code />, category: 'mobile', years: 2 },
  
  // DevOps
  { name: 'Docker', level: 3, icon: <Container />, category: 'devops', years: 1 },
  { name: 'Docker Compose', level: 3, icon: <Layers />, category: 'devops', years: 1 },
  { name: 'CI/CD', level: 3, icon: <Settings />, category: 'devops', years: 1 },
  { name: 'GitHub Actions', level: 3, icon: <Settings />, category: 'devops', years: 1 },
  
  // Other
  { name: 'Network Configuration', level: 4, icon: <Network />, category: 'other', years: 3 },
  { name: 'Access Control Systems', level: 4, icon: <Wrench />, category: 'other', years: 3 },
  { name: 'Video Surveillance', level: 3, icon: <Monitor />, category: 'other', years: 3 },
];

// Skill categories
const categories: SkillCategory[] = [
  { 
    id: 'frontend', 
    title: { en: 'Frontend Development', fr: 'Développement Frontend' },
    icon: <Monitor />,
    color: 'bg-blue-500'
  },
  { 
    id: 'backend', 
    title: { en: 'Backend Development', fr: 'Développement Backend' },
    icon: <Server />,
    color: 'bg-green-500'
  },
  { 
    id: 'mobile', 
    title: { en: 'Mobile Development', fr: 'Développement Mobile' },
    icon: <Cpu />,
    color: 'bg-purple-500'
  },
  { 
    id: 'devops', 
    title: { en: 'DevOps & Infrastructure', fr: 'DevOps & Infrastructure' },
    icon: <CloudCog />,
    color: 'bg-orange-500'
  },
  { 
    id: 'other', 
    title: { en: 'Networks & Security', fr: 'Réseaux & Sécurité' },
    icon: <Network />,
    color: 'bg-gray-500'
  }
];

// Learning skills
const learningSkills = [
  { name: 'Next.js', progress: 70 },
  { name: 'AWS', progress: 40 },
  { name: 'React Native', progress: 30 },
  { name: 'GraphQL', progress: 50 }
];

const SkillsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Filter skills based on active category
  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);
    
  // Sort skills by level
  const sortedSkills = [...filteredSkills].sort((a, b) => b.level - a.level);
  
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
  
  const barVariants: Variants = {
    hidden: { width: 0 },
    visible: (level) => ({ 
      width: `${level * 20}%`,
      transition: { duration: 1, delay: 0.3 }
    })
  };
  
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 -left-20 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -right-20 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        
        {/* Tech pattern background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L40 20L30 35L20 20L30 5z' fill='%23000000' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('skills.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>
        
        {/* Skill Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              "px-4 py-2 rounded-lg flex items-center gap-2 transition-all",
              activeCategory === 'all' 
                ? "bg-primary text-white shadow-md" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            <Layers size={18} />
            {t('skills.categories.all')}
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-lg flex items-center gap-2 transition-all",
                activeCategory === category.id 
                  ? `${theme === 'dark' ? 'bg-opacity-80' : ''} ${category.color.replace('bg-', 'bg-')} text-white shadow-md` 
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {category.icon}
              {category.title[language as keyof typeof category.title]}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" ref={ref}>
          {/* Skills Visualization */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {sortedSkills.map((skill) => (
              <motion.div 
                key={skill.name}
                variants={itemVariants}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={cn(
                  "relative p-4 rounded-lg transition-all",
                  hoveredSkill === skill.name 
                    ? "bg-gray-100 dark:bg-gray-800 shadow-md" 
                    : "bg-transparent"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-1.5 rounded-md",
                      skill.category === 'frontend' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-500' : 
                      skill.category === 'backend' ? 'bg-green-100 dark:bg-green-900/30 text-green-500' :
                      skill.category === 'mobile' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-500' :
                      skill.category === 'devops' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-500' :
                      'bg-gray-100 dark:bg-gray-800 text-gray-500'
                    )}>
                      {skill.icon}
                    </div>
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.years} {skill.years === 1 ? t('skills.year') : t('skills.years')}
                  </span>
                </div>
                
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    custom={skill.level}
                    variants={barVariants}
                    className={cn(
                      "h-full rounded-full",
                      skill.category === 'frontend' ? 'bg-blue-500' : 
                      skill.category === 'backend' ? 'bg-green-500' :
                      skill.category === 'mobile' ? 'bg-purple-500' :
                      skill.category === 'devops' ? 'bg-orange-500' :
                      'bg-gray-500'
                    )}
                  ></motion.div>
                </div>
                
                {/* Skill level indicators */}
                <div className="flex justify-between mt-1 px-0">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div key={level} className="flex flex-col items-center">
                      <div 
                        className={cn(
                          "w-1 h-1 rounded-full",
                          level <= skill.level 
                            ? skill.category === 'frontend' ? 'bg-blue-500' : 
                              skill.category === 'backend' ? 'bg-green-500' :
                              skill.category === 'mobile' ? 'bg-purple-500' :
                              skill.category === 'devops' ? 'bg-orange-500' :
                              'bg-gray-500' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        )}
                      ></div>
                    </div>
                  ))}
                </div>
                
                {/* Skill details on hover */}
                {hoveredSkill === skill.name && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 w-full"
                  >
                    <div className="text-sm">
                      <div className="font-medium mb-1">{t('skills.details.expertise')}</div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {skill.level === 5 ? t('skills.details.expert') : 
                         skill.level === 4 ? t('skills.details.advanced') :
                         skill.level === 3 ? t('skills.details.intermediate') :
                         t('skills.details.beginner')}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Tech Tree Visualization and Learning Skills */}
          <div className="flex flex-col gap-8">
            {/* Tech Tree Visualization - Lab Themed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Layers className="text-primary" size={20} />
                {t('skills.techTree.title')}
              </h3>
              
              <div className="relative">
                {/* Base of the tree */}
                <div className="relative flex justify-center mb-4">
                  <div className="absolute left-1/2 top-full -ml-1 w-2 h-32 bg-primary/20 dark:bg-primary/30"></div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative z-10 p-4 rounded-full bg-primary/10 dark:bg-primary/20 border-2 border-primary"
                  >
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Code size={32} className="text-primary" />
                    </div>
                  </motion.div>
                </div>
                
                {/* Branches */}
                <div className="grid grid-cols-3 gap-4 pt-32">
                  {/* Frontend Branch */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col items-center"
                  >
                    <div className="absolute top-24 left-[calc(16.67%+1rem)] w-20 h-1 bg-blue-500/50 transform -rotate-45"></div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                      <Monitor size={24} />
                    </div>
                    <p className="mt-2 text-sm font-medium">Frontend</p>
                    <div className="h-20 w-px bg-blue-500/30 my-2"></div>
                    <div className="grid grid-cols-2 gap-2">
                      {skills.filter(s => s.category === 'frontend').slice(0, 4).map((skill, i) => (
                        <motion.div 
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.7 + (i * 0.1) }}
                          className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 text-xs"
                        >
                          {skill.name.slice(0, 2)}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Backend Branch */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col items-center"
                  >
                    <div className="absolute top-24 left-1/2 w-1 h-10 bg-green-500/50"></div>
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500">
                      <Server size={24} />
                    </div>
                    <p className="mt-2 text-sm font-medium">Backend</p>
                    <div className="h-20 w-px bg-green-500/30 my-2"></div>
                    <div className="grid grid-cols-2 gap-2">
                      {skills.filter(s => s.category === 'backend').slice(0, 4).map((skill, i) => (
                        <motion.div 
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.8 + (i * 0.1) }}
                          className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500 text-xs"
                        >
                          {skill.name.slice(0, 2)}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Mobile Branch */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex flex-col items-center"
                  >
                    <div className="absolute top-24 left-[calc(83.33%-1rem)] w-20 h-1 bg-purple-500/50 transform rotate-45"></div>
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-500">
                      <Cpu size={24} />
                    </div>
                    <p className="mt-2 text-sm font-medium">Mobile</p>
                    <div className="h-20 w-px bg-purple-500/30 my-2"></div>
                    <div className="grid grid-cols-2 gap-2">
                      {skills.filter(s => s.category === 'mobile').map((skill, i) => (
                        <motion.div 
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.9 + (i * 0.1) }}
                          className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500 text-xs"
                        >
                          {skill.name.slice(0, 2)}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Learning & Growth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Settings className="text-primary" size={20} />
                {t('skills.learning.title')}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('skills.learning.subtitle')}
              </p>
              
              <div className="space-y-6">
                {learningSkills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.progress}%
                      </span>
                    </div>
                    
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.7 + (index * 0.1) }}
                        className="h-full bg-gradient-to-r from-blue-500 to-primary rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;