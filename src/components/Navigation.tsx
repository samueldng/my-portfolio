'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('navHome') },
    { id: 'skills', label: t('navSkills') },
    { id: 'projetos', label: t('navProjects') },
    { id: 'contato', label: t('navContact') }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-gray-900/80 backdrop-blur-xl py-3 border-b border-gray-800/50' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent"
          >
            Samuel O.
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="transition-all duration-300 nav-link text-gray-300 hover:text-white relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
            
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800 transition-colors"
            >
              <Globe className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">
                {language === 'pt' ? 'EN' : 'PT'}
              </span>
            </motion.button>
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-gray-900/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col h-full pt-20 px-6">
              <div className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setIsOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-2xl font-medium text-gray-300 hover:text-white py-2"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-auto pb-8">
                <motion.button
                  onClick={() => {
                    toggleLanguage();
                    setIsOpen(false);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 w-full justify-center"
                >
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-300">
                    {language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}