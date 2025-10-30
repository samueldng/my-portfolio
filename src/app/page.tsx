'use client';

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaArrowUp, FaCode, FaMobile, FaServer } from "react-icons/fa";
import Image from "next/image";
import { gsap } from "gsap";

const Page = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
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
    { name: "Frontend", icon: <FaCode />, level: 95 },
    { name: "Backend", icon: <FaServer />, level: 90 },
    { name: "Mobile", icon: <FaMobile />, level: 85 },
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
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-blue-600 z-50 origin-left"
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
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent"
          >
            Samuel O.
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {['Home', 'Skills', 'Projetos', 'Contato'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`transition-all duration-300 nav-link ${
                  activeSection === item.toLowerCase() 
                    ? 'text-teal-400 font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item}
              </motion.a>
            ))}
          </div>
          
          {/* Contato button removed as requested */}
        </div>
      </motion.nav>

      {/* Hero Section with Parallax */}
      <section 
        id="home" 
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      >
        {/* Animated background elements with parallax */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            ref={parallaxRef1}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div 
            ref={parallaxRef2}
            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div 
            ref={parallaxRef3}
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="relative inline-block mb-6"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 p-1 mx-auto">
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
              <motion.div 
                className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="block bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Samuel Oliveira
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Desenvolvedor Full-Stack especializado em criar experiências digitais excepcionais com Node.js, React e tecnologias modernas
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.a
                href="#projetos"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Ver Projetos
              </motion.a>
              
              <motion.a
                href="#contato"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent border-2 border-teal-500 text-teal-400 font-medium rounded-full hover:bg-teal-500/10 transition-all"
              >
                Entrar em Contato
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-teal-400 flex justify-center">
            <div className="w-1 h-1 bg-teal-400 rounded-full mt-2 animate-pulse"></div>
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
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Minhas Habilidades
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Tecnologias e ferramentas que domino para criar soluções digitais de alta qualidade
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white text-xl">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold ml-4">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                  <motion.div 
                    className="bg-gradient-to-r from-teal-500 to-blue-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  ></motion.div>
                </div>
                <p className="text-gray-400">{skill.level}% Proficiência</p>
              </motion.div>
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
            <h3 className="text-2xl font-bold text-center mb-8">Tecnologias que utilizo</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'Node.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Docker'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"
                  }}
                  className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 text-gray-300 tech-stack-item"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section with Parallax */}
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
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Meus Projetos
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Uma seleção dos meus trabalhos mais recentes e impactantes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px rgba(0, 0, 0, 0.3)" }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 project-card"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  alt="Screenshot do projeto Nell App"
                  src="/images/projeto1.png" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Nell App</h3>
                <p className="text-gray-400 mb-4">Aplicação completa de gestão e controle de estoque com dashboard em tempo real</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Node.js', 'MongoDB'].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-teal-500/20 text-teal-400 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/samueldng/nell-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium"
                >
                  Ver no GitHub
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px rgba(0, 0, 0, 0.3)" }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 project-card"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  alt="Screenshot do projeto SIS Frota"
                  src="/images/projeto2.png" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">SIS Frota</h3>
                <p className="text-gray-400 mb-4">Sistema completo de gestão e conferência de frotas veiculares com geolocalização</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React Native', 'Node.js', 'PostgreSQL'].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-teal-500/20 text-teal-400 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/samueldng/Rvehicle-photo-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium"
                >
                  Ver no GitHub
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Project 3 - Corrected technologies */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px rgba(0, 0, 0, 0.3)" }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 project-card"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  alt="Screenshot do projeto Squid Game"
                  src="/images/projeto3.png" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Squid Game</h3>
                <p className="text-gray-400 mb-4">Jogo interativo baseado na famosa série Round 6 com mecânicas envolventes</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['JavaScript', 'TypeScript', 'CSS'].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-teal-500/20 text-teal-400 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/samueldng/round6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium"
                >
                  Ver no GitHub
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.div>
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
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Assistente Virtual
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Converse com meu assistente para saber mais sobre meus projetos e habilidades
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
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full text-sm hover:opacity-90 transition-opacity"
                >
                  {showChatbot ? 'Ocultar Chat' : 'Mostrar Chat'}
                </button>
              </div>
              
              {showChatbot && (
                <div className="mt-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-gray-700/50 mb-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
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
                    onClick={() => setShowChatbot(true)}
                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full text-sm hover:opacity-90 transition-opacity"
                  >
                    Iniciar Conversa com IA
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
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Entre em Contato
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Vamos conversar sobre seu próximo projeto ou oportunidade
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">Vamos trabalhar juntos!</h3>
              <p className="text-gray-400 mb-8">
                Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades para fazer parte da sua equipe.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center mr-4">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-400">samuel-dng@outlook.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center mr-4">
                    <FaWhatsapp className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">WhatsApp</h4>
                    <p className="text-gray-400">+55 (99) 98514-3916</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-8"
            >
              <motion.a
                href="https://github.com/samueldng"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-teal-500/50 transition-all group w-40"
              >
                <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center group-hover:bg-teal-500/10 transition-colors mb-4">
                  <FaGithub className="text-2xl text-gray-300 group-hover:text-teal-400 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">GitHub</h3>
                <p className="text-gray-400 text-sm">@samueldng</p>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/samuel-oliveira-26bb7014a/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-teal-500/50 transition-all group w-40"
              >
                <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center group-hover:bg-teal-500/10 transition-colors mb-4">
                  <FaLinkedin className="text-2xl text-gray-300 group-hover:text-teal-400 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                <p className="text-gray-400 text-sm">Samuel Oliveira</p>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} Samuel Oliveira. Todos os direitos reservados.</p>
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
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white flex items-center justify-center shadow-lg z-50"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;