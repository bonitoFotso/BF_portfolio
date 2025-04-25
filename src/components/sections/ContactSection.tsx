import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, Check, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
  
  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired');
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid');
      isValid = false;
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.errors.subjectRequired');
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired');
      isValid = false;
    } else if (formData.message.trim().length < 20) {
      newErrors.message = t('contact.errors.messageLength');
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('submitting');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On success
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset after showing success message
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      setFormStatus('error');
      
      // Reset after showing error message
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };
  
  // Field change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-xl font-bold mb-6"
            >
              {t('contact.getInTouch')}
            </motion.h3>
            
            <div className="space-y-6">
              <motion.div 
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <div className="mt-1 p-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-medium">{t('contact.email')}</h4>
                  <a 
                    href="mailto:contact@fotso.dev" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    contact@fotso.dev
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <div className="mt-1 p-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-medium">{t('contact.phone')}</h4>
                  <a 
                    href="tel:+237XXXXXXXXX" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    +237 XX XX XX XX XX
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <div className="mt-1 p-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium">{t('contact.location')}</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Douala, Cameroon
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="mt-12"
            >
              <h3 className="text-xl font-bold mb-6">{t('contact.socialMedia')}</h3>
              
              <div className="flex gap-4">
                <a 
                  href="https://linkedin.com/in/yourprofile" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-800/10 dark:bg-gray-200/10 text-gray-800 dark:text-gray-200 hover:bg-gray-800/20 dark:hover:bg-gray-200/20 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://twitter.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </motion.div>
            
            {/* Download CV */}
            <motion.div
              variants={itemVariants}
              className="mt-12"
            >
              <a 
                href="/cv.pdf" 
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <span>{t('contact.downloadCV')}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 13L12 16L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 16V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>
          
          {/* Contact form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-xl font-bold mb-6"
            >
              {t('contact.sendMessage')}
            </motion.h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block mb-2 text-sm font-medium">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary",
                    errors.name 
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 dark:border-gray-600"
                  )}
                  disabled={formStatus === 'submitting'}
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary",
                    errors.email 
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 dark:border-gray-600"
                  )}
                  disabled={formStatus === 'submitting'}
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                  {t('contact.form.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary",
                    errors.subject 
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 dark:border-gray-600"
                  )}
                  disabled={formStatus === 'submitting'}
                />
                {errors.subject && (
                  <p className="mt-1 text-red-500 text-sm">{errors.subject}</p>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary",
                    errors.message 
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 dark:border-gray-600"
                  )}
                  disabled={formStatus === 'submitting'}
                />
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{t('contact.form.sending')}</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>{t('contact.form.send')}</span>
                    </>
                  )}
                </button>
              </motion.div>
            </form>
            
            {/* Form status messages */}
            <AnimatePresence>
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 flex items-center gap-2"
                >
                  <Check size={20} className="flex-shrink-0" />
                  <span>{t('contact.form.successMessage')}</span>
                </motion.div>
              )}
              
              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 flex items-center gap-2"
                >
                  <AlertCircle size={20} className="flex-shrink-0" />
                  <span>{t('contact.form.errorMessage')}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;