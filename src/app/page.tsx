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
    <div ref={containerRef} className="bg-gray-950 text-gray-100 overflow-x-hidden font-sans selection:bg-indigo-500/30">
      {/* Custom Cursor */}




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
        className="fixed top-0 w-full z-40 bg-gray-950/90 border-b border-white/5 py-4 px-6 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="text-xl font-black tracking-tighter text-white cursor-pointer"
          >
            SAMUEL<span className="text-indigo-500">.</span>DEV
          </motion.div>

          <div className="hidden md:flex space-x-12">
            {[
              { label: 'Home', key: 'home' },
              { label: 'Skills', key: 'skills' },
              { label: 'Projetos', key: 'projetos' },
              { label: 'Contato', key: 'contato' }
            ].map((item) => (
              <motion.a
                key={item.key}
                href={`#${item.key}`}
                whileHover={{ y: -2 }}
                className={`transition-all duration-300 text-sm font-mono tracking-widest uppercase cursor-pointer ${activeSection === item.key
                  ? 'text-white border-b-2 border-indigo-500 pb-1'
                  : 'text-gray-500 hover:text-white'
                  }`}
              >
                {t(`nav.${item.key === 'projetos' ? 'projects' : item.key === 'contato' ? 'contact' : item.key}`)}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {/* AI Chat Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsChatModalOpen(true)}
              className="p-2 bg-gray-900 border border-white/10 text-white hover:bg-gray-800 transition-all cursor-pointer"
              aria-label="Open AI Chat"
            >
              <Bot className="h-5 w-5" />
            </motion.button>

            {/* Language Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="px-3 py-1 bg-gray-900 border border-white/10 text-white hover:bg-gray-800 transition-all flex items-center cursor-pointer gap-2"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4" />
              <span className="text-xs font-mono font-bold">
                {language === 'pt' ? 'EN' : 'PT'}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with 3D Background */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      >
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-80">
          <ThreeHero />
        </div>

        <div className="max-w-7xl mx-auto px-6 z-10 relative pointer-events-none w-full h-full flex items-center md:items-end pb-20">
          {/* Main Content Container - Asymmetric/Bottom-Left */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
            className="text-left pointer-events-auto max-w-4xl"
          >
            {/* Small Tagline */}
            <motion.div
              variants={{
                hidden: { x: -20, opacity: 0 },
                visible: { x: 0, opacity: 1 }
              }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[2px] w-12 bg-cyan-400"></div>
              <span className="text-cyan-400 font-mono tracking-widest text-sm uppercase">Full Stack Developer</span>
            </motion.div>

            {/* Title - Massive Typography */}
            <motion.div variants={{
              hidden: { y: 50, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}>
              <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-[0.9]">
                <span className="block text-white">SAMUEL</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">OLIVEIRA.</span>
              </h1>
            </motion.div>

            {/* Subtitle/Description */}
            <motion.p
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10 font-light leading-relaxed border-l-2 border-gray-800 pl-6"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Buttons - Left Aligned */}
            <motion.div
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              className="flex flex-wrap gap-6"
            >
              <motion.a
                href="#projetos"
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black font-bold rounded-none hover:bg-cyan-400 transition-colors cursor-pointer flex items-center gap-2"
              >
                {t('hero.viewProjects')} <ArrowUp className="rotate-45 w-5 h-5" />
              </motion.a>

              <motion.a
                href="#contato"
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-none hover:bg-white/10 backdrop-blur-sm transition-colors cursor-pointer"
              >
                {t('hero.contactMe')}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-hover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-gray-500 text-sm">
            <span>Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        ref={skillsRef}
        className="py-32 relative border-t border-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-left"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
              {t('skills.title')}<span className="text-indigo-500">.</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-xl font-light border-l-2 border-indigo-500/50 pl-6">
              {t('skills.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                title={t(`skills.${skill.name.toLowerCase()}`)}
                level={skill.level}
                icon={skill.icon}
                description={t(`skills.${skill.name.toLowerCase()}.desc`)}
                index={index}
              />
            ))}
          </div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20"
          >
            <h3 className="text-xl font-bold mb-8 text-gray-200 font-mono uppercase tracking-widest">{t('skills.techStack')}</h3>
            <div className="flex flex-wrap gap-3">
              {['React', 'Node.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Docker'].map((tech) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -3, borderColor: '#6366f1' }}
                  viewport={{ once: true }}
                  className="px-6 py-3 bg-gray-900 border border-white/5 text-gray-400 font-mono text-sm hover:text-white transition-colors cursor-default"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projetos"
        ref={projectsRef}
        className="py-32 relative border-t border-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-left"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
              {t('projects.title')}<span className="text-indigo-500">.</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-xl font-light border-l-2 border-indigo-500/50 pl-6">
              {t('projects.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="Nell App"
              description={t('project.nell.description')}
              technologies={['React', 'Node.js', 'MongoDB']}
              imageUrl="/images/projeto1.png"
              githubUrl="https://github.com/samueldng/nell-app"
              index={0}
            />
            <ProjectCard
              title="SIS Frota"
              description={t('project.sis.description')}
              technologies={['React Native', 'Node.js', 'PostgreSQL']}
              imageUrl="/images/projeto2.png"
              githubUrl="https://github.com/samueldng/Rvehicle-photo-app"
              index={1}
            />
            <ProjectCard
              title="Squid Game"
              description={t('project.squid.description')}
              technologies={['JavaScript', 'TypeScript', 'CSS']}
              imageUrl="/images/projeto3.png"
              githubUrl="https://github.com/samueldng/round6"
              index={2}
            />
          </div>
        </div>
      </motion.section>

      {/* Chatbot Section */}
      <motion.section
        id="chatbot"
        className="py-24 relative border-t border-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-left"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
              {t('chat.title')}<span className="text-indigo-500">.</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg font-light">
              {t('chat.subtitle')}
            </p>
          </motion.div>

          {/* ... existing chatbot integration container, but darkened ... */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-0"
          >
            <div className="bg-gray-950 rounded-lg border border-white/10 p-1 shadow-2xl">
              <div className="bg-gray-900/50 p-6 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-200">
                    Interactive Chat
                  </h3>
                  <button
                    onClick={() => setShowChatbot(!showChatbot)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-none hover:bg-indigo-700 transition-colors text-sm font-medium tracking-wide uppercase"
                  >
                    {showChatbot ? t('chat.hide') : t('chat.show')}
                  </button>
                </div>

                {showChatbot && (
                  <div className="mt-4">
                    <div className="bg-white/5 rounded-none p-4 border-l-2 border-indigo-500 mb-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-indigo-300 font-mono uppercase">Online System</span>
                      </div>
                      <p className="text-gray-300 text-sm font-light">
                        Olá! Sou o assistente virtual do Samuel. Posso te ajudar com informações sobre seus projetos, habilidades técnicas e experiências profissionais. Como posso ajudar você hoje?
                      </p>
                    </div>

                    {/* Chatbot container */}
                    <div id="chtl-inline-bot" style={{ width: '100%', height: '400px', borderRadius: '4px', overflow: 'hidden' }} className="bg-black border border-white/5"></div>
                  </div>
                )}

                {!showChatbot && (
                  <div className="mt-4 text-center py-8">
                    <button
                      onClick={() => setIsChatModalOpen(true)}
                      className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-gray-200 transition-colors flex items-center mx-auto gap-2"
                    >
                      <Bot className="h-4 w-4" />
                      {t('chat.start')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contato"
        ref={contactRef}
        className="py-32 relative border-t border-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-left"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
              {t('contact.title')}<span className="text-indigo-500">.</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-xl font-light border-l-2 border-indigo-500/50 pl-6">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-8 text-gray-200">{t('contact.workTogether')}</h3>

              <div className="space-y-8">
                <div className="flex items-start group cursor-pointer">
                  <div className="w-12 h-12 bg-gray-900 border border-white/10 flex items-center justify-center mr-6 group-hover:border-indigo-500 transition-colors">
                    <Mail className="text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1 group-hover:text-indigo-400 transition-colors uppercase tracking-wider text-xs">Email</h4>
                    <p className="text-gray-400 text-lg font-light">samuel-dng@outlook.com</p>
                  </div>
                </div>

                <div className="flex items-start group cursor-pointer">
                  <div className="w-12 h-12 bg-gray-900 border border-white/10 flex items-center justify-center mr-6 group-hover:border-indigo-500 transition-colors">
                    <Phone className="text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1 group-hover:text-indigo-400 transition-colors uppercase tracking-wider text-xs">WhatsApp</h4>
                    <p className="text-gray-400 text-lg font-light">+55 (99) 98514-3916</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-6 items-start"
            >
              <motion.a
                href="https://github.com/samueldng"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="flex-1 p-8 bg-gray-950 border border-white/10 hover:border-indigo-500 transition-all group text-center"
              >
                <Github className="text-4xl text-gray-500 group-hover:text-white mx-auto mb-4 transition-colors" />
                <h3 className="text-lg font-bold text-white mb-2">GITHUB</h3>
                <p className="text-gray-500 text-sm font-mono">@samueldng</p>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/samuel-oliveira-26bb7014a/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="flex-1 p-8 bg-gray-950 border border-white/10 hover:border-indigo-500 transition-all group text-center"
              >
                <Linkedin className="text-4xl text-gray-500 group-hover:text-white mx-auto mb-4 transition-colors" />
                <h3 className="text-lg font-bold text-white mb-2">LINKEDIN</h3>
                <p className="text-gray-500 text-sm font-mono">Samuel Oliveira</p>
              </motion.a>
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