'use client';

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ArrowUp, Code, Server, Smartphone, Languages, Bot, Download, Menu, X } from "lucide-react";
import Image from "next/image";
import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";
import AIChatModal from "@/components/AIChatModal";
import { useLanguage } from '@/contexts/LanguageContext';
import { FlipText } from "@/components/ui/flip-text";
import AnimatedButton from "@/components/ui/animated-button";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { ScrollTiltText } from "@/components/ui/scroll-tilt-text";
import { TechMarquee } from "@/components/ui/tech-marquee";
import { GlassDock } from "@/components/ui/glass-dock";
import ScrollZoomHero from "@/components/ScrollZoomHero";
import ScrollPinSection from "@/components/ScrollPinSection";
import ProjectsShowcase3D from "@/components/ProjectsShowcase3D";

// ThreeHero component removed as requested for performance optimization

const Page = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const { language, toggleLanguage, t } = useLanguage();

  // Optimized Scroll Tracking using Framer Motion
  useMotionValueEvent(scrollYProgress, "change", () => {
    const scrollPosition = window.scrollY;
    // Set scroll top visibility efficiently
    if (scrollPosition > 300 && !showScrollTop) {
      setShowScrollTop(true);
    } else if (scrollPosition <= 300 && showScrollTop) {
      setShowScrollTop(false);
    }
  });

  // Intersection Observer for Active Section
  useEffect(() => {
    const sections = ['home', 'skills', 'projetos', 'chatbot', 'contato'];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
           setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 }); // Trigger when 30% of the section is visible

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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

  // Real Projects Data
  const realProjects = [
    {
      title: "MaintQR",
      description: "Plataforma de gestão de ativos e serviços de manutenção baseada em QR Codes. Centraliza histórico, gera OS transparentes e possui portal do cliente em tempo real.",
      technologies: ["React", "Node.js", "Supabase", "Tailwind"],
      imageUrl: "/images/maintqr.png",
      githubUrl: "https://github.com/samueldng/Service_App",
      liveUrl: "https://frostserviceapp.vercel.app/"
    },
    {
      title: "LogicSales",
      description: "App híbrido para força de vendas. Facilita o processo comercial de ponta a ponta com interface imersiva desenvolvida com foco em UX.",
      technologies: ["React Native", "Expo", "PostgreSQL", "Zustand"],
      imageUrl: "/images/logicsales.png",
      liveUrl: "https://www.figma.com/design/OCEnCituKthn1SViXZpgWP/LogicSales"
    },
    {
      title: "Catálogo Morais",
      description: "Catálogo online exclusivo para Morais Distribuidora, integrado ao WhatsApp para orçamentos automáticos rápidos e de alta conversão.",
      technologies: ["Next.js", "Tailwind CSS", "Prisma", "Vercel"],
      imageUrl: "/images/logicsales-web.png",
      githubUrl: "https://github.com/samueldng/logicsales-web",
      liveUrl: "https://moraisdistribuidora.vercel.app/"
    },
    {
      title: "Hemolab Showcase",
      description: "Landing page para a imersão sobre Inteligência Artificial onde atuei como palestrante, focada em gestão estratégica com IA para líderes do Hemolab.",
      technologies: ["React", "Next.js", "Framer Motion", "Three.js"],
      imageUrl: "/images/hemolab.png",
      githubUrl: "https://github.com/samueldng/hemolab-showcase",
      liveUrl: "https://hemolab-showcase.vercel.app/"
    },
    {
      title: "UBS Inventário",
      description: "Sistema completo de inventário para a SEMUS (Secretaria Municipal de Saúde) de Bacabal, para controle de todos os equipamentos e suporte nas unidades de saúde.",
      technologies: ["React", "TypeScript", "Vite", "Node.js"],
      imageUrl: "/images/ubs-inventario.png",
      liveUrl: "https://gestortibacabal.netlify.app/"
    },
    {
      title: "NativeShop",
      description: "Aplicativo de commerce completo focado em pequenos e médios negócios, possibilitando transição digital acessível.",
      technologies: ["React Native", "Firebase", "Redux"],
      imageUrl: "/images/projeto2.png", // Using existing placeholder since no image was provided
      githubUrl: "https://github.com/samueldng/NativeShop"
    }
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
    <div ref={containerRef} className="bg-gray-950 text-gray-100 [overflow-x:clip] font-sans selection:bg-green-500/30">
      {/* Custom Cursor */}




      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 z-50 origin-left"
        style={{ scaleX: pathLength }}
      />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-40 bg-[#020A05]/90 border-b border-white/5 py-4 px-6 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="text-xl font-black tracking-tighter text-white cursor-pointer"
          >
            SAMUEL<span className="text-[#00FF66]">.</span>DEV
          </motion.div>

          <div className="hidden md:flex items-center space-x-2 bg-white/5 rounded-full px-2 py-2 border border-white/10">
              {['home', 'skills', 'projetos', 'contato'].map((tab) => {
                  const labels: Record<string, string> = { home: 'HOME', skills: 'HABILIDADES', projetos: 'PROJETOS', contato: 'CONTATO' };
                  const isActive = activeSection === tab;
                  return (
                    <button 
                      key={tab}
                      onClick={() => document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' })}
                      className={`px-6 py-2 text-sm font-bold tracking-wider transition-colors ${isActive ? 'bg-[#064E3B] text-white rounded-full' : 'text-[#A1A1AA] hover:text-white'}`}
                    >
                        {labels[tab]}
                    </button>
                  );
              })}
          </div>

          <div className="flex items-center space-x-3">
            {/* AI Chat Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsChatModalOpen(true)}
              className="p-2 bg-transparent border border-white/10 text-white hover:bg-white/5 transition-all rounded-md cursor-pointer"
              aria-label="Open AI Chat"
            >
              <Bot className="h-5 w-5" />
            </motion.button>

            {/* Language Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="px-3 py-2 bg-transparent border border-white/10 text-white hover:bg-white/5 transition-all rounded-md flex items-center cursor-pointer gap-2"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4" />
              <span className="text-xs font-mono font-bold">
                {language === 'pt' ? 'EN' : 'PT'}
              </span>
            </motion.button>
            {/* Mobile Menu Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 bg-transparent border border-white/10 text-white hover:bg-white/5 transition-all rounded-md cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-40 bg-[#020A05]/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-2 mt-10">
              {[
                { label: t('nav.home'), value: 'home' },
                { label: t('nav.skills') || 'Skills', value: 'skills' },
                { label: t('nav.projects'), value: 'projetos' },
                { label: t('nav.contact'), value: 'contato' },
              ].map((item, index) => (
                <motion.button
                  key={item.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      document.getElementById(item.value)?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  className="text-left py-6 text-3xl font-black tracking-tighter border-b border-white/10 text-gray-400 hover:text-white transition-colors uppercase"
                >
                  {item.label}
                  <span className="text-[#00FF66]">.</span>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto pb-12 flex justify-center"
            >
              <GlassDock
                items={[
                  { title: 'Email', icon: Mail, onClick: () => window.location.href = 'mailto:samuel-dng@outlook.com' },
                  { title: 'WhatsApp', icon: Phone, onClick: () => window.open('https://wa.me/5599985143916', '_blank') },
                  { title: 'GitHub', icon: Github, href: 'https://github.com/samueldng' }
                ]}
                dockClassName="scale-90"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-[#020A05]">
        {/* Foundation: Background & Particles (Z-0) */}
        <div className="absolute inset-0 z-0">
          {/* Main Background Image - Adjusted Zoom & Blur */}
          <div 
            className="absolute inset-0 bg-cover bg-center md:bg-[center_top_-4rem] bg-no-repeat blur-[2px]"
            style={{ backgroundImage: "url('/hero-bg.jpg')" }}
          ></div>
          <div className="absolute inset-0 bg-[#00FF66]/15 mix-blend-multiply pointer-events-none"></div>
          {/* Dark Overlay for readability - Adjusted Opacity */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020A05]/80 via-[#0A1F10]/40 to-[#020A05]/95 pointer-events-none"></div>
        </div>

        {/* Z-10 Giant Typography - Adjusted Opacity & Blend Mode */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none">
          <h1 className="text-[16vw] font-black leading-[0.8] tracking-tighter text-[#00FF66] opacity-[0.25] text-center mt-20 md:mt-10">
            SAMUEL<br/>OLIVEIRA
          </h1>
        </div>

        {/* Z-20 Content - Redesigned Asymmetric Centered Architecture */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center md:justify-start pt-28 md:pt-0 pointer-events-none">
           
           {/* Left Col: Info and CTA */}
           <motion.div 
             initial={{ opacity: 0, x: -50 }} 
             animate={{ opacity: 1, x: 0 }} 
             transition={{ duration: 0.8, delay: 0.2 }}
             className="flex flex-col gap-6 items-center md:items-start text-center md:text-left z-30 pointer-events-auto max-w-[580px] md:mt-0"
           >
              <div className="flex items-center justify-center md:justify-start gap-4">
                 <div className="hidden md:block w-12 h-[2px] bg-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.8)]"></div>
                 <span className="text-[#00FF66] font-mono tracking-[0.2em] font-medium text-xs md:text-sm drop-shadow-[0_0_8px_rgba(0,255,102,0.8)]">FULL STACK DEVELOPER</span>
              </div>

              <p className="text-[#E4E4E7] text-base md:text-[1.1rem] font-light leading-relaxed border-none md:border-l-2 md:border-white/10 md:pl-5 py-1 text-center md:text-left w-full mx-auto md:mx-0 drop-shadow-md">
                 {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-4 relative z-40 w-full">
                  <AnimatedButton
                    as="a"
                    href="#projetos"
                    className="w-full sm:w-auto px-8 py-3 bg-[#020A05]/90 backdrop-blur-md border border-[#00FF66]/50 text-white rounded font-medium tracking-wider text-xs md:text-sm hover:bg-[#00FF66]/10 hover:border-[#00FF66] transition-all cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    {t('hero.viewProjects')} <ArrowUp className="rotate-45 w-4 h-4 text-[#00FF66] transition-all" />
                  </AnimatedButton>

                  <AnimatedButton
                    as="a"
                    href="#contato"
                    className="hidden sm:flex w-full sm:w-auto px-8 py-3 bg-[#020A05]/90 backdrop-blur-md border border-white/10 text-white rounded font-medium tracking-wider text-xs md:text-sm hover:bg-white/5 hover:border-white/30 transition-all cursor-pointer items-center justify-center gap-2"
                  >
                    {t('hero.contactMe')}
                  </AnimatedButton>
                  
                  <AnimatedButton
                    as="a"
                    href="/Samuel_OLIVEIRA.pdf"
                    download="Samuel_OLIVEIRA.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3 bg-[#020A05]/90 backdrop-blur-md border border-white/10 text-white rounded font-medium tracking-wider text-xs md:text-sm hover:bg-white/5 hover:border-white/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    CV <Download className="w-4 h-4 text-[#A1A1AA]" />
                  </AnimatedButton>
              </div>
           </motion.div>

           {/* Centered Photo and Neon Ring */}
           <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center w-full md:w-auto z-20 mt-12 md:mt-0 pointer-events-none">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }} 
               animate={{ opacity: 1, scale: 1 }} 
               transition={{ duration: 1, delay: 0.4 }}
               className="relative w-72 h-72 md:w-[480px] md:h-[480px] flex items-center justify-center"
             >
                 
                 {/* The Ring */}
                 <motion.div 
                   animate={{ rotate: 360 }} 
                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 rounded-full border-[3px] border-[#00FF66]/50 shadow-[0_0_40px_rgba(0,255,102,0.6)] z-10 pointer-events-none"
                 >
                    {/* Orbiting Icons */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#020A05] p-2 md:p-3 rounded-full border border-[#00FF66]/80 text-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.8)]">
                      <Github className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-[#020A05] p-2 md:p-3 rounded-full border border-[#00FF66]/80 text-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.8)]">
                      <Code className="w-4 h-4 md:w-5 md:h-5" />
                    </div>

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#020A05] p-2 md:p-3 rounded-full border border-[#00FF66]/80 text-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.8)]">
                      <Server className="w-4 h-4 md:w-5 md:h-5" />
                    </div>

                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-[#020A05] p-2 md:p-3 rounded-full border border-[#00FF66]/80 text-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.8)]">
                      <Smartphone className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                 </motion.div>

                 {/* Photo */}
                 <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden border-[6px] border-transparent z-20 bg-[#020A05] pointer-events-auto">
                   <Image 
                      src="/me.png" 
                      fill 
                      className="object-cover object-[center_top] scale-[1.05]" 
                      alt="Samuel Developer" 
                      priority
                   />
                   {/* Inset shadow ring overlay */}
                   <div className="absolute inset-0 rounded-full shadow-[inset_0_-25px_80px_rgba(0,255,102,0.4)] pointer-events-none"></div>
                 </div>

             </motion.div>
           </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
            <span className="text-[10px] text-[#A1A1AA] font-mono tracking-widest uppercase opacity-70">Scroll</span>
            <motion.div 
               animate={{ y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-[#A1A1AA] to-transparent"
            ></motion.div>
        </div>
      </section>

      {/* Skills Section with Scroll Pinning */}
      <div id="skills" ref={skillsRef}>
        <ScrollPinSection itemCount={3}>
          {/* Slide 1: Title & Overview (shown first, then fades up) */}
          <div className="w-full h-full flex flex-col justify-center px-10 md:px-24">
            <ScrollTiltText startRotation={-12} startX={-80} offsetEnd={0.5}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 text-left"
              >
                <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white">
                  {t('skills.title')}<span className="text-green-500">.</span>
                </h2>
                <p className="text-gray-400 max-w-2xl text-2xl font-light border-l-4 border-green-500 pl-6 py-2">
                  {t('skills.subtitle')}
                </p>
              </motion.div>
            </ScrollTiltText>
          </div>

          {/* Slide 2: Core Skills Cards (fades in after title) */}
          <div className="w-full max-w-6xl px-10 md:px-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
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
          </div>

          {/* Slide 3: Tech Marquee (fades in after cards) */}
          <div className="w-full max-w-7xl px-10 md:px-24">
            <h3 className="text-3xl font-black mb-12 text-gray-200 font-mono tracking-widest border-b border-green-500/30 pb-4 inline-block">
              {t('skills.techStack')}
            </h3>
            <TechMarquee />
          </div>
        </ScrollPinSection>
      </div>

      {/* Projects Section with 3D Velocity Carousel */}
      <div id="projetos" ref={projectsRef}>
        <ProjectsShowcase3D
          projects={realProjects}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
          techLabel={t('projects.technologies') || 'Tecnologias'}
        />
      </div>

      {/* Chatbot Section */}
      < motion.section
        id="chatbot"
        className="py-24 relative border-t border-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollTiltText startRotation={-8} startX={-50} offsetEnd={0.5}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-left"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
                {t('chat.title')}<span className="text-green-500">.</span>
              </h2>
              <p className="text-gray-400 max-w-xl text-lg font-light">
                {t('chat.subtitle')}
              </p>
            </motion.div>
          </ScrollTiltText>

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
                    className="px-6 py-2 bg-green-600 text-white rounded-none hover:bg-green-700 transition-colors text-sm font-medium tracking-wide uppercase"
                  >
                    {showChatbot ? t('chat.hide') : t('chat.show')}
                  </button>
                </div>

                {showChatbot && (
                  <div className="mt-4">
                    <div className="bg-white/5 rounded-none p-4 border-l-2 border-green-500 mb-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-300 font-mono uppercase">Online System</span>
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
      </motion.section >

      {/* Contact Section */}
      < motion.section
        id="contato"
        ref={contactRef}
        className="py-32 relative border-t border-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollTiltText startRotation={-10} startX={-60} offsetEnd={0.5}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-20 text-left"
            >
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
                {t('contact.title')}<span className="text-green-500">.</span>
              </h2>
              <p className="text-gray-400 max-w-xl text-xl font-light border-l-2 border-green-500/50 pl-6">
                {t('contact.subtitle')}
              </p>
            </motion.div>
          </ScrollTiltText>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50, scale: 0.9 },
                visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
            >
              <h3 className="text-2xl font-bold mb-8 text-gray-200">{t('contact.workTogether')}</h3>

              <div className="space-y-8">
                <div className="flex items-start group cursor-pointer">
                  <div className="w-12 h-12 bg-gray-900 border border-white/10 flex items-center justify-center mr-6 group-hover:border-green-500 transition-colors">
                    <Mail className="text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1 group-hover:text-green-400 transition-colors uppercase tracking-wider text-xs">Email</h4>
                    <p className="text-gray-400 text-lg font-light">samuel-dng@outlook.com</p>
                  </div>
                </div>

                <div className="flex items-start group cursor-pointer">
                  <div className="w-12 h-12 bg-gray-900 border border-white/10 flex items-center justify-center mr-6 group-hover:border-green-500 transition-colors">
                    <Phone className="text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1 group-hover:text-green-400 transition-colors uppercase tracking-wider text-xs">WhatsApp</h4>
                    <p className="text-gray-400 text-lg font-light">+55 (99) 98514-3916</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50, scale: 0.9 },
                visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
              }}
              className="flex flex-col gap-8"
            >
              <div className="relative w-32 h-32 bg-gray-900 border-2 border-green-500/30 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 mx-auto shadow-2xl shadow-green-500/20">
                <Image
                  src="/me.png"
                  alt="Samuel Oliveira"
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="flex justify-center mt-6">
                <GlassDock
                  items={[
                    { title: 'Email', icon: Mail, onClick: () => window.location.href = 'mailto:samuel-dng@outlook.com' },
                    { title: 'WhatsApp', icon: Phone, onClick: () => window.open('https://wa.me/5599985143916', '_blank') },
                    { title: 'GitHub', icon: Github, href: 'https://github.com/samueldng' },
                    { title: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/samuel-oliveira-26bb7014a/' }
                  ]}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section >

      {/* Footer */}
      < footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800/50" >
        <div className="max-w-7xl mx-auto px-6">
          <p>{t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}</p>
        </div>
      </footer >

      {/* Scroll to top button */}
      <AnimatePresence>
        {
          showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-lg z-50"
            >
              <ArrowUp />
            </motion.button>
          )
        }
      </AnimatePresence >

      {/* AI Chat Modal */}
      < AIChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />

    </div >
  );
};

export default Page;
