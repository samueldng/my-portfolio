'use client';

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ArrowUp, Code, Server, Smartphone, Languages, Bot } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";
import AIChatModal from "@/components/AIChatModal";
import { useLanguage } from '@/contexts/LanguageContext';
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import MagneticButton from "@/components/MagneticButton";
import ParticleLogo from "@/components/ParticleLogo";
import dynamic from 'next/dynamic';

// Dynamically import ThreeHero to avoid SSR issues
const ThreeHero = dynamic(() => import('@/components/ThreeHero').then(mod => mod.default), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
});

const Page = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const { language, toggleLanguage, t } = useLanguage();
  
  // Parallax refs
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const skillsRef = useRef(null);
  
  // Parallax elements
  const parallaxRef1 = useRef(null);
  const parallaxRef2 = useRef(null);
  const parallaxRef3 = useRef(null);

  useEffect(() => {
    // GSAP animations
    if (heroRef.current) {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2
      });
    }

    // Falling animation for profile photo
    const animateProfilePhoto = () => {
      const profilePhoto = document.getElementById('profile-photo');
      const notificationDot = profilePhoto?.querySelector('div.absolute div');
      
      if (profilePhoto) {
        // Set initial position above the screen and hidden
        gsap.set(profilePhoto, { 
          y: -200, 
          opacity: 0,
          scale: 0.8
        });
        
        // Animate falling with bounce effect and scale up
        gsap.to(profilePhoto, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "bounce.out",
          delay: 0.5
        });
      }
      
      // Animate the notification dot
      if (notificationDot) {
        gsap.to(notificationDot, {
          scale: 1.2,
          repeat: -1,
          yoyo: true,
          duration: 1,
          ease: "power1.inOut",
          delay: 2 // Start after the photo has landed
        });
      }
    };

    // Try to animate immediately, and also after a small delay to ensure DOM is ready
    animateProfilePhoto();
    setTimeout(animateProfilePhoto, 100);

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (parallaxRef1.current) {
        (parallaxRef1.current as HTMLElement).style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
      
      if (parallaxRef2.current) {
        (parallaxRef2.current as HTMLElement).style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
      
      if (parallaxRef3.current) {
        (parallaxRef3.current as HTMLElement).style.transform = `translateY(${scrollPosition * 0.7}px)`;
      }
      
      // Scroll to top button
      setShowScrollTop(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle scroll events for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projetos', 'chatbot', 'contato'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
     });
  };

  // Skills data
  const skills = [
    { name: "frontend", icon: Code, level: 95 },
    { name: "backend", icon: Server, level: 90 },
    { name: "mobile", icon: Smartphone, level: 85 },
  ];

  // Initialize chatbot
  useEffect(() => {
    if (showChatbot) {
      // Chatbot initialization
      const script = document.createElement('script');
      script.src = "https://chatling.ai/js/embed.js";
      script.async = true;
      script.id = "chtl-script";
      script.type = "text/javascript";
      script.setAttribute('data-id', "4873935879");
      script.setAttribute('data-display', "page_inline");
      
      // Add config before script
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        if (typeof window.chtlConfig === 'undefined') {
          window.chtlConfig = { 
            chatbotId: "4873935879", 
            display: "page_inline" 
          };
        }
      `;
      
      document.body.appendChild(configScript);
      document.body.appendChild(script);

      return () => {
        // Clean up only the script, not the config
        if (document.getElementById('chtl-script')) {
          document.getElementById('chtl-script')?.remove();
        }
      };
    }
  }, [showChatbot]);

  return (
    <div ref={containerRef} className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 z-50 origin-left"
        style={{ scaleX: pathLength }}
      />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-40 bg-black/20 backdrop-blur-md py-4 px-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <MagneticButton>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="cursor-gradient"
            >
              <ParticleLogo />
            </motion.div>
          </MagneticButton>
          
          <div className="hidden md:flex space-x-8">
            {[
              { label: 'Home', key: 'home' },
              { label: 'Skills', key: 'skills' },
              { label: 'Projetos', key: 'projetos' },
              { label: 'Contato', key: 'contato' }
            ].map((item) => (
              <MagneticButton key={item.key}>
                <motion.a
                  href={`#${item.key}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`transition-all duration-300 nav-link cursor-hover ${
                    activeSection === item.key 
                      ? 'text-cyan-400 font-semibold' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {t(`nav.${item.key === 'projetos' ? 'projects' : item.key === 'contato' ? 'contact' : item.key}`)}
                </motion.a>
              </MagneticButton>
            ))}
          </div>
          
          <div className="flex items-center space-x-3">
            {/* AI Chat Button */}
            <MagneticButton>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsChatModalOpen(true)}
                className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg hover:shadow-cyan-500/30 transition-all cursor-magnetic"
                aria-label="Open AI Chat"
              >
                <Bot className="h-5 w-5" />
              </motion.button>
            </MagneticButton>
            
            {/* Language Toggle Button */}
            <MagneticButton>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                className="p-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center cursor-gradient"
                aria-label="Toggle language"
              >
                <Languages className="h-5 w-5" />
                <span className="ml-2 text-sm font-medium">
                  {language === 'pt' ? 'EN' : 'PT'}
                </span>
              </motion.button>
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with 3D Background */}
      <section 
        id="home" 
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      >
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <ThreeHero />
        </div>

        <div className="max-w-7xl mx-auto px-6 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <MagneticButton>
              <div
                className="relative inline-block mb-6 cursor-magnetic"
                id="profile-photo"
                style={{ opacity: 0 }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-1 mx-auto">
                  <div className="bg-gray-800 rounded-full w-full h-full overflow-hidden">
                    {/* Your photo here */}
                    <Image
                      src="/foto.jpeg"
                      alt="Samuel Oliveira"
                      width={124}
                      height={124}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                </div>
                <div 
                  className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center"
                >
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </MagneticButton>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent cursor-gradient">
                {t('hero.title')}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <MagneticButton>
                <motion.a
                  href="#projetos"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all cursor-magnetic"
                >
                  {t('hero.viewProjects')}
                </motion.a>
              </MagneticButton>
              
              <MagneticButton>
                <motion.a
                  href="#contato"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-transparent border-2 border-cyan-500 text-cyan-400 font-medium rounded-full hover:bg-cyan-500/10 transition-all cursor-magnetic"
                >
                  {t('hero.contactMe')}
                </motion.a>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-hover"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-cyan-400 flex justify-center">
            <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <motion.section 
        id="skills"
        ref={skillsRef}
        className="py-24 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-800/20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-gradient">
                {t('skills.title')}
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              {t('skills.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <MagneticButton key={skill.name}>
                <SkillCard 
                  title={t(`skills.${skill.name.toLowerCase()}`)} 
                  level={skill.level} 
                  icon={skill.icon} 
                  description={t(`skills.${skill.name.toLowerCase()}.desc`)}
                />
              </MagneticButton>
            ))}
          </div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8 cursor-gradient">{t('skills.techStack')}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'Node.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Docker'].map((tech) => (
                <MagneticButton key={tech}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0 }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -5,
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"
                    }}
                    className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 text-gray-300 tech-stack-item cursor-magnetic"
                  >
                    {tech}
                  </motion.div>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projetos"
        ref={projectsRef}
        className="py-24 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-800/30"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-gradient">
                {t('projects.title')}
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              {t('projects.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MagneticButton>
              <ProjectCard
                title="Nell App"
                description={t('project.nell.description')}
                technologies={['React', 'Node.js', 'MongoDB']}
                imageUrl="/images/projeto1.png"
                githubUrl="https://github.com/samueldng/nell-app"
              />
            </MagneticButton>
            <MagneticButton>
              <ProjectCard
                title="SIS Frota"
                description={t('project.sis.description')}
                technologies={['React Native', 'Node.js', 'PostgreSQL']}
                imageUrl="/images/projeto2.png"
                githubUrl="https://github.com/samueldng/Rvehicle-photo-app"
              />
            </MagneticButton>
            <MagneticButton>
              <ProjectCard
                title="Squid Game"
                description={t('project.squid.description')}
                technologies={['JavaScript', 'TypeScript', 'CSS']}
                imageUrl="/images/projeto3.png"
                githubUrl="https://github.com/samueldng/round6"
              />
            </MagneticButton>
          </div>
        </div>
      </motion.section>

      {/* Chatbot Section - Moved above contact and fixed functionality */}
      <motion.section 
        id="chatbot"
        className="py-16 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-800/30"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t('chat.title')}
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              {t('chat.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-200">
                  Chat Inteligente
                </h3>
                <button 
                  onClick={() => setShowChatbot(!showChatbot)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm hover:opacity-90 transition-opacity"
                >
                  {showChatbot ? t('chat.hide') : t('chat.show')}
                </button>
              </div>
              
              {showChatbot && (
                <div className="mt-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-gray-700/50 mb-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-400">Assistente Virtual Online</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Olá! Sou o assistente virtual do Samuel. Posso te ajudar com informações sobre seus projetos, habilidades técnicas e experiências profissionais. Como posso ajudar você hoje?
                    </p>
                  </div>
                  
                  {/* Chatbot container */}
                  <div id="chtl-inline-bot" style={{ width: '100%', height: '400px', borderRadius: '0.5rem', overflow: 'hidden' }} className="bg-gray-900/50 border border-gray-700/50"></div>
                </div>
              )}
              
              {!showChatbot && (
                <div className="mt-4 text-center py-8">
                  <button 
                    onClick={() => setIsChatModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full text-sm hover:opacity-90 transition-opacity flex items-center mx-auto"
                  >
                    <Bot className="h-4 w-4 mr-2" />
                    {t('chat.start')}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contato"
        ref={contactRef}
        className="py-24 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black/50"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-gradient">
                {t('contact.title')}
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">{t('contact.workTogether')}</h3>
              <p className="text-gray-400 mb-8">
                {t('contact.description')}
              </p>
              
              <div className="space-y-4">
                <MagneticButton>
                  <div className="flex items-center cursor-magnetic">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-4">
                      <Mail className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{t('contact.email')}</h4>
                      <p className="text-gray-400">samuel-dng@outlook.com</p>
                    </div>
                  </div>
                </MagneticButton>
                
                <MagneticButton>
                  <div className="flex items-center cursor-magnetic">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-4">
                      <Phone className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{t('contact.whatsapp')}</h4>
                      <p className="text-gray-400">+55 (99) 98514-3916</p>
                    </div>
                  </div>
                </MagneticButton>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-8"
            >
              <MagneticButton>
                <motion.a
                  href="https://github.com/samueldng"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-cyan-500/50 transition-all group w-40 cursor-magnetic"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors mb-4">
                    <Github className="text-2xl text-gray-300 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">GitHub</h3>
                  <p className="text-gray-400 text-sm">@samueldng</p>
                </motion.a>
              </MagneticButton>

              <MagneticButton>
                <motion.a
                  href="https://www.linkedin.com/in/samuel-oliveira-26bb7014a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-cyan-500/50 transition-all group w-40 cursor-magnetic"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors mb-4">
                    <Linkedin className="text-2xl text-gray-300 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                  <p className="text-gray-400 text-sm">Samuel Oliveira</p>
                </motion.a>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <p>{t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}</p>
        </div>
      </footer>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg z-50"
          >
            <ArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI Chat Modal */}
      <AIChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />

    </div>
  );
};

export default Page;