'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Star, Eye, Calendar, Play, Pause } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  year: number;
  stars: number;
  views: number;
}

export default function InteractiveShowcase() {
  const { t, language } = useLanguage();
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  
  const projects: Project[] = [
    {
      id: 1,
      title: t('nellAppTitle'),
      description: t('nellAppDesc'),
      technologies: ['React', 'Node.js', 'MongoDB'],
      image: "/images/projeto1.png",
      githubUrl: "https://github.com/samueldng/nell-app",
      liveUrl: "#",
      year: 2024,
      stars: 42,
      views: 1200
    },
    {
      id: 2,
      title: t('sisFrotaTitle'),
      description: t('sisFrotaDesc'),
      technologies: ['React Native', 'Node.js', 'PostgreSQL'],
      image: "/images/projeto2.png",
      githubUrl: "https://github.com/samueldng/Rvehicle-photo-app",
      liveUrl: "#",
      year: 2023,
      stars: 38,
      views: 980
    },
    {
      id: 3,
      title: t('squidGameTitle'),
      description: t('squidGameDesc'),
      technologies: ['JavaScript', 'TypeScript', 'CSS'],
      image: "/images/projeto3.png",
      githubUrl: "https://github.com/samueldng/round6",
      liveUrl: "#",
      year: 2023,
      stars: 56,
      views: 2100
    }
  ];

  // Auto-rotate projects
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  const nextProject = () => {
    setDirection(1);
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setDirection(index > currentProject ? 1 : -1);
    setCurrentProject(index);
  };

  const current = projects[currentProject];
  
  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative bg-gray-800/20 backdrop-blur-sm rounded-3xl border border-gray-700/20 p-8 shadow-2xl overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/5 via-transparent to-emerald-900/5 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              {t('projectsTitle')}
            </h3>
            <p className="text-gray-400 mt-2">{t('projectsSubtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-gray-700/30 hover:bg-gray-700/50 transition-colors border border-gray-600/30"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  {language === 'pt' ? 'Pausar' : 'Pause'}
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  {language === 'pt' ? 'Reproduzir' : 'Play'}
                </>
              )}
            </button>
          </div>
        </div>
        
        <div 
          className="relative h-96 rounded-2xl overflow-hidden mb-8 cursor-pointer group"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={`Screenshot do projeto ${current.title}`}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation arrows */}
          <button 
            onClick={prevProject}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
            aria-label={language === 'pt' ? "Projeto anterior" : "Previous project"}
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
          
          <button 
            onClick={nextProject}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
            aria-label={language === 'pt' ? "Próximo projeto" : "Next project"}
          >
            <ChevronRight className="text-white w-6 h-6" />
          </button>
          
          {/* Project indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProject 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`${language === 'pt' ? 'Ir para o projeto' : 'Go to project'} ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-2xl font-bold">{current.title}</h4>
                <div className="flex items-center gap-1 text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{current.stars}</span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 text-lg">{current.description}</p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {current.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 text-indigo-300 border border-indigo-500/20 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  <span className="text-gray-400">{language === 'pt' ? 'Ano' : 'Year'}</span>
                </div>
                <span className="font-medium">{current.year}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-400">{language === 'pt' ? 'Visualizações' : 'Views'}</span>
                </div>
                <span className="font-medium">{current.views}</span>
              </div>
              
              <div className="flex gap-3 pt-2">
                <a
                  href={current.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-xl hover:opacity-90 transition-opacity flex-1 font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('projectView')}
                </a>
                <a
                  href={current.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-800 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors flex-1 font-medium"
                >
                  <Github className="w-4 h-4" />
                  {t('projectSource')}
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}