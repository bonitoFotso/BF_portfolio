import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { ArrowDownIcon, Terminal, Beaker, ChevronRight, Code, Database, Globe, Laptop } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { cn } from '../../utils/cn';

// Display mode types
type DisplayMode = 'default' | 'terminal' | 'interactive';

const HeroSection = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('default');
  const [terminalIndex, setTerminalIndex] = useState(0);
  const fullName = t('hero.name');
  const sectionRef = useRef<HTMLElement>(null);
  
  // Get scroll progress for parallax effects
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  
  // Terminal commands for the terminal mode
  const terminalCommands = [
    { cmd: "npm install portfolio", output: "Installing portfolio dependencies..." },
    { cmd: "npm run dev", output: "Starting development server..." },
    { cmd: "cat about.md", output: t('hero.terminalAbout') },
  ];
  
  // Interactive floating elements
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  
  const bind = useGesture({
    onMove: ({ xy: [px, py] }) => {
      api.start({ x: (px - window.innerWidth / 2) / 20, y: (py - window.innerHeight / 2) / 20 });
    },
  });
  
  // Typing effect for the name
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setTypedText(fullName.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        
        // Start cursor blinking after typing is complete
        const cursorInterval = setInterval(() => {
          setShowCursor(prev => !prev);
        }, 500);
        
        return () => clearInterval(cursorInterval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [fullName]);
  
  // Terminal typing effect
  useEffect(() => {
    if (displayMode === 'terminal') {
      const terminalInterval = setInterval(() => {
        if (terminalIndex < terminalCommands.length) {
          setTerminalIndex(prev => prev + 1);
        } else {
          clearInterval(terminalInterval);
        }
      }, 1500);
      
      return () => clearInterval(terminalInterval);
    } else {
      setTerminalIndex(0);
    }
  }, [displayMode, terminalCommands.length, terminalIndex]);
  
  // Lab equipment icons floating around
  const techIcons = [
    { icon: <Code size={24} className="text-blue-500" />, x: -150, y: -120, scale: 1.3 },
    { icon: <Globe size={24} className="text-green-500" />, x: 180, y: -80, scale: 1.5 },
    { icon: <Database size={24} className="text-purple-500" />, x: -100, y: 120, scale: 1.2 },
    { icon: <Laptop size={24} className="text-yellow-500" />, x: 150, y: 100, scale: 1.4 },
    { icon: <Beaker size={24} className="text-red-400" />, x: -200, y: 0, scale: 1.6 },
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  
  const iconVariants = {
    initial: ({ x, y, scale }: { x: number, y: number, scale: number }) => ({
      x,
      y,
      scale,
      opacity: 0.7,
    }),
    animate: ({ x, y, scale }: { x: number, y: number, scale: number }) => ({
      x: [x, x + 30, x - 10, x],
      y: [y, y - 20, y + 30, y],
      scale: [scale, scale * 1.1, scale * 0.9, scale],
      opacity: [0.7, 0.9, 0.8, 0.7],
      transition: {
        duration: 10 + Math.random() * 5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    }),
  };
  
  // Change display mode
  const cycleDisplayMode = () => {
    if (displayMode === 'default') setDisplayMode('terminal');
    else if (displayMode === 'terminal') setDisplayMode('interactive');
    else setDisplayMode('default');
  };
  
  // Cameroonian pattern inspired background
  const Pattern = () => (
    <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23000000' fill-opacity='0.1'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
    </div>
  );
  
  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden"
      {...bind()}
    >
      <Pattern />
      
      {/* Laboratory-themed background elements */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 overflow-hidden">
        <animated.div
          style={{ x, y }}
          className="absolute top-1/4 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
        <animated.div
          style={{ x: x.to(x => -x), y: y.to(y => -y) }}
          className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
        />
        
        {/* Tech icons floating around */}
        {techIcons.map((tech, index) => (
          <motion.div
            key={index}
            custom={tech}
            variants={iconVariants}
            initial="initial"
            animate="animate"
            className="absolute p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm"
            style={{ 
              left: `calc(50% + ${tech.x}px)`, 
              top: `calc(50% + ${tech.y}px)`,
              transform: `translate(-50%, -50%) scale(${tech.scale})` 
            }}
          >
            {tech.icon}
          </motion.div>
        ))}
        
        {/* Laboratory decorative elements */}
        <motion.div
          style={{ opacity }}
          className="absolute top-20 right-20 text-primary/20 dark:text-primary/40"
        >
          <Beaker size={120} />
        </motion.div>
      </motion.div>
      
      <div className="container mx-auto px-4 z-10 relative">
        {/* Default mode - standard intro */}
        {displayMode === 'default' && (
          <motion.div
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 rounded-full text-sm font-medium backdrop-blur-sm">
                {t('hero.greeting')}
              </span>
              <Terminal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className={cn(
                "text-4xl md:text-6xl font-bold mb-4",
                "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              )}
            >
              {typedText}<span className={cn("animate-pulse", showCursor ? "opacity-100" : "opacity-0")}>|</span>
            </motion.h1>
            
            <motion.h2 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200"
            >
              {t('hero.title')}
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8"
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors backdrop-blur-sm flex items-center justify-center gap-2"
              >
                {t('hero.cta.projects')}
                <ChevronRight size={16} />
              </a>
              <a
                href="#contact"
                className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors backdrop-blur-sm"
              >
                {t('hero.cta.contact')}
              </a>
            </motion.div>
          </motion.div>
        )}
        
        {/* Terminal mode */}
        {displayMode === 'terminal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl text-left">
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex-1 text-center text-sm text-gray-400">
                  fotso@portfolio ~ 
                </div>
              </div>
              <div className="p-4 font-mono text-sm text-green-400">
                {terminalCommands.slice(0, terminalIndex).map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex items-center">
                      <span className="text-blue-400">~$</span>
                      <span className="ml-2">{item.cmd}</span>
                    </div>
                    <div className="mt-1 text-gray-300 pl-5">{item.output}</div>
                  </div>
                ))}
                
                {terminalIndex < terminalCommands.length && (
                  <div className="flex items-center">
                    <span className="text-blue-400">~$</span>
                    <span className="ml-2 relative">
                      {terminalCommands[terminalIndex]?.cmd.substring(0, Math.floor(Date.now() / 150) % (terminalCommands[terminalIndex]?.cmd.length + 1))}
                      <span className="absolute animate-pulse">|</span>
                    </span>
                  </div>
                )}
                
                {terminalIndex >= terminalCommands.length && (
                  <div className="flex items-center mt-2">
                    <span className="text-blue-400">~$</span>
                    <span className="ml-2 relative">
                      <span className="absolute animate-pulse">|</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Interactive mode */}
        {displayMode === 'interactive' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">{t('hero.interactive.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 rounded-lg p-5 text-left transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <Code size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('hero.interactive.viewProjects')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('hero.interactive.projectsDesc')}</p>
                  </div>
                </div>
              </motion.a>
              
              <motion.a
                href="#skills"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-secondary/10 hover:bg-secondary/20 dark:bg-secondary/20 dark:hover:bg-secondary/30 rounded-lg p-5 text-left transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-secondary/20 rounded-lg text-secondary">
                    <Database size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('hero.interactive.skills')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('hero.interactive.skillsDesc')}</p>
                  </div>
                </div>
              </motion.a>
              
              <motion.a
                href="#about"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-green-500/10 hover:bg-green-500/20 dark:bg-green-500/20 dark:hover:bg-green-500/30 rounded-lg p-5 text-left transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg text-green-500">
                    <Beaker size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('hero.interactive.about')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('hero.interactive.aboutDesc')}</p>
                  </div>
                </div>
              </motion.a>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-yellow-500/10 hover:bg-yellow-500/20 dark:bg-yellow-500/20 dark:hover:bg-yellow-500/30 rounded-lg p-5 text-left transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-500">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('hero.interactive.contact')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('hero.interactive.contactDesc')}</p>
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>
        )}
        
        {/* Mode switcher button */}
        <motion.button
          onClick={cycleDisplayMode}
          className="mt-12 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {t('hero.switchMode')}
          <span className="inline-block ml-1">
            {displayMode === 'default' 
              ? '→ Terminal' 
              : displayMode === 'terminal' 
                ? '→ Interactive' 
                : '→ Default'}
          </span>
        </motion.button>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1,
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        <a 
          href="#about" 
          className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
        >
          <span className="text-sm mb-2">{t('hero.scrollDown')}</span>
          <ArrowDownIcon size={20} />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;