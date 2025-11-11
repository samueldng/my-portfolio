'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, Server, Smartphone, MessageCircle, X, Globe, MapPin, Calendar, Award } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import Image from 'next/image';

// Language context for translations
const translations = {
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    heroTitle1: "Samuel",
    heroTitle2: "Oliveira",
    heroSubtitle: "Creating <span class='text-indigo-400'>immersive digital experiences</span> with cutting-edge technologies",
    exploreProjects: "Explore Projects",
    getInTouch: "Get in Touch",
    aboutJourney: "My Journey",
    aboutDescription1: "With years of experience in software development, I specialize in building scalable and user-friendly applications using cutting-edge technologies. My approach combines technical expertise with creative problem-solving.",
    aboutDescription2: "I'm constantly learning and staying updated with the latest industry trends to deliver innovative solutions that exceed expectations.",
    educationExperience: "Education & Experience",
    skillsTitle: "My Skills",
    skillsDescription: "Technologies and tools I master to create high-quality digital solutions",
    skillsProficiency: "Proficiency",
    technologies: "Technologies I Use",
    projectsTitle: "My Projects",
    projectsDescription: "A selection of my most recent and impactful work",
    connectWithMe: "Connect with me",
    allRightsReserved: "All rights reserved.",
    yearsOfExperience: "Years of Experience",
    completedProjects: "Completed Projects",
    happyClients: "Happy Clients",
    awardsWon: "Awards Won"
  },
  pt: {
    home: "Início",
    about: "Sobre",
    skills: "Habilidades",
    projects: "Projetos",
    contact: "Contato",
    heroTitle1: "Samuel",
    heroTitle2: "Oliveira",
    heroSubtitle: "Criando <span class='text-indigo-400'>experiências digitais imersivas</span> com tecnologias de ponta",
    exploreProjects: "Explorar Projetos",
    getInTouch: "Entrar em Contato",
    aboutJourney: "Minha Jornada",
    aboutDescription1: "Com anos de experiência em desenvolvimento de software, me especializo em construir aplicações escaláveis e amigáveis usando tecnologias de ponta. Minha abordagem combina expertise técnica com resolução criativa de problemas.",
    aboutDescription2: "Estou constantemente aprendendo e me atualizando com as últimas tendências da indústria para entregar soluções inovadoras que superam expectativas.",
    educationExperience: "Educação & Experiência",
    skillsTitle: "Minhas Habilidades",
    skillsDescription: "Tecnologias e ferramentas que domino para criar soluções digitais de alta qualidade",
    skillsProficiency: "Proficiência",
    technologies: "Tecnologias que Utilizo",
    projectsTitle: "Meus Projetos",
    projectsDescription: "Uma seleção dos meus trabalhos mais recentes e impactantes",
    connectWithMe: "Conecte-se comigo",
    allRightsReserved: "Todos os direitos reservados.",
    yearsOfExperience: "Anos de Experiência",
    completedProjects: "Projetos Completos",
    happyClients: "Clientes Satisfeitos",
    awardsWon: "Prêmios Conquistados"
  }
};

// Water ripple effect component
function WaterRippleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const ripples = useRef<Array<{x: number, y: number, time: number}>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      
      // Create small ripples periodically as mouse moves
      if (Math.random() > 0.7) {
        ripples.current.push({
          x: e.clientX,
          y: e.clientY,
          time: 0
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw ripples
      ripples.current = ripples.current.filter(ripple => {
        ripple.time += 0.016; // ~60fps
        
        if (ripple.time > 1) return false;
        
        const radius = ripple.time * 50;
        const opacity = 1 - ripple.time;
        
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        return true;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}

// Interactive 3D Scene that responds to mouse movement
function InteractiveNeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Create neural network nodes
  const nodes = useRef<Array<{
    position: [number, number, number];
    connections: number[];
  }>>([]);
  
  // Initialize nodes
  useEffect(() => {
    const nodeList = [];
    for (let i = 0; i < 100; i++) {
      nodeList.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ] as [number, number, number],
        connections: [] as number[]
      });
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        const dx = nodeList[i].position[0] - nodeList[j].position[0];
        const dy = nodeList[i].position[1] - nodeList[j].position[1];
        const dz = nodeList[i].position[2] - nodeList[j].position[2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < 2.5) {
          nodeList[i].connections.push(j);
        }
      }
    }
    
    nodes.current = nodeList;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the entire group based on time
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });
  
  // Create connection lines
  const lines = useMemo(() => {
    const lineList: Array<[[number, number, number], [number, number, number]]> = [];
    nodes.current.forEach((node, i) => {
      node.connections.forEach((connectedId) => {
        const start = node.position;
        const end = nodes.current[connectedId].position;
        lineList.push([start, end]);
      });
    });
    return lineList;
  }, []);
  
  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      {lines.map((line, index) => (
        <Line
          key={index}
          points={[line[0], line[1]]}
          color="#6366f1"
          lineWidth={0.5}
          transparent
          opacity={0.3}
        />
      ))}
      
      {/* Interactive nodes */}
      <Points>
        <PointMaterial 
          color="#6366f1"
          size={0.08}
          sizeAttenuation={true}
          transparent
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

// Holographic Text Component
function HolographicText({ children }: { children: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 blur-xl opacity-30 animate-pulse"></div>
      <h1 className="relative text-6xl md:text-8xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
        {children}
      </h1>
    </div>
  );
}

// Interactive Element that responds to mouse
function InteractiveElement({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate rotation based on mouse position relative to element center
        const rotateX = (e.clientY - centerY) / 30;
        const rotateY = (centerX - e.clientX) / 30;
        
        setPosition({ x: rotateX, y: rotateY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div
      ref={elementRef}
      style={{
        transform: `perspective(1000px) rotateX(${position.x}deg) rotateY(${position.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className="interactive-element"
    >
      {children}
    </div>
  );
}

// Project Card Component
function ProjectCard({ 
  title, 
  description, 
  technologies, 
  image,
  t
}: { 
  title: string; 
  description: string; 
  technologies: string[]; 
  image: string;
  t: (key: string) => string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 transition-all group backdrop-blur-sm"
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-slate-300 mb-4 text-sm">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <Tooltip.Provider key={tech}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs cursor-pointer">
                      {tech}
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
                      {tech} technology
                      <Tooltip.Arrow className="fill-slate-900" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            ))}
          </div>
          
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
              <button className="flex items-center text-indigo-400 hover:text-indigo-300 font-medium text-sm">
                {t('exploreProjects')}
                <ExternalLink className="ml-2 w-4 h-4" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
              <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700/50 z-50 p-6">
                <div className="flex justify-between items-start mb-4">
                  <Dialog.Title className="text-2xl font-bold text-white">
                    {title}
                  </Dialog.Title>
                  <Dialog.Close className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                    <X className="w-5 h-5 text-white" />
                  </Dialog.Close>
                </div>
                
                <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">{t('projectsTitle')}</h3>
                  <p className="text-slate-300">{description}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">{t('technologies')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                    <ExternalLink className="w-4 h-4" />
                    {t('exploreProjects')}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
                    <Github className="w-4 h-4" />
                    Source Code
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </motion.div>
    </>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<'en' | 'pt'>('en');
  
  // Get translation function
  const t = (key: string) => translations[language][key as keyof typeof translations[typeof language]] || key;

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle scroll events for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
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

  // Chat functionality
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: language === 'en' 
          ? "Thanks for your message! I'm an AI assistant demo. In a real implementation, I would provide helpful responses based on the portfolio content." 
          : "Obrigado pela sua mensagem! Sou um assistente de IA de demonstração. Em uma implementação real, eu forneceria respostas úteis com base no conteúdo do portfólio.",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  // Navigation items
  const navItems = [
    { id: 'home', label: t('home') },
    { id: 'about', label: t('about') },
    { id: 'skills', label: t('skills') },
    { id: 'projects', label: t('projects') },
    { id: 'contact', label: t('contact') }
  ];

  // Skills data
  const skills = [
    { name: "Frontend Development", level: 95, icon: Code },
    { name: "Backend Development", level: 90, icon: Server },
    { name: "Mobile Development", level: 85, icon: Smartphone }
  ];

  // Stats data
  const stats = [
    { value: "5+", label: t('yearsOfExperience'), icon: Calendar },
    { value: "50+", label: t('completedProjects'), icon: Code },
    { value: "30+", label: t('happyClients'), icon: Award },
    { value: "5", label: t('awardsWon'), icon: Award }
  ];

  // Projects data
  const projects = [
    {
      id: 1,
      title: 'Nell App',
      description: language === 'en' 
        ? 'Complete inventory management application with real-time dashboard' 
        : 'Aplicação completa de gerenciamento de inventário com painel em tempo real',
      technologies: ['React', 'Node.js', 'MongoDB'],
      image: '/images/projeto1.png'
    },
    {
      id: 2,
      title: 'SIS Frota',
      description: language === 'en' 
        ? 'Vehicle fleet management system with geolocation tracking' 
        : 'Sistema de gerenciamento de frota de veículos com rastreamento por geolocalização',
      technologies: ['React Native', 'Node.js', 'PostgreSQL'],
      image: '/images/projeto2.png'
    },
    {
      id: 3,
      title: 'Squid Game',
      description: language === 'en' 
        ? 'Interactive game based on the popular series with engaging mechanics' 
        : 'Jogo interativo baseado na série popular com mecânicas envolventes',
      technologies: ['JavaScript', 'TypeScript', 'CSS'],
      image: '/images/projeto3.png'
    }
  ];

  return (
    <div ref={containerRef} className="bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
      {/* Water ripple effect */}
      <WaterRippleEffect />
      
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 z-40 origin-left"
        style={{ scaleX: pathLength }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-30 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent"
            >
              Samuel O.
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`transition-all duration-300 hover:text-white relative group ${
                    activeSection === item.id ? 'text-indigo-400 font-medium' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-400 transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </a>
              ))}
            </div>

            {/* Language Toggle and Chat Button */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
                className="p-2 rounded-full hover:bg-slate-800 transition-colors"
              >
                <Globe className="w-5 h-5 text-slate-400" />
              </button>
              
              <button 
                onClick={() => setIsChatOpen(true)}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>AI Assistant</span>
              </button>

              {/* Mobile menu button */}
              <button 
                className="md:hidden text-slate-400"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden mt-4 pt-4 border-t border-slate-800"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`transition-colors hover:text-white ${
                      activeSection === item.id ? 'text-indigo-400 font-medium' : 'text-slate-400'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <button 
                  onClick={() => {
                    setIsChatOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>AI Assistant</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <InteractiveNeuralNetwork />
            <OrbitControls 
              enableZoom={false} 
              autoRotate 
              autoRotateSpeed={0.3}
              enablePan={false}
            />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-transparent to-emerald-900/20"></div>
        </div>
        
        {/* Grid overlay for depth */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <HolographicText>{t('heroTitle1')}</HolographicText>
              <HolographicText>{t('heroTitle2')}</HolographicText>
            </motion.div>
            
            <motion.p 
              className="text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              dangerouslySetInnerHTML={{ __html: t('heroSubtitle') }}
            >
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-6"
            >
              <motion.a 
                href="#projects" 
                className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white font-bold rounded-full hover:shadow-2xl transition-all text-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t('exploreProjects')}
              </motion.a>
              <motion.a 
                href="#contact" 
                className="px-10 py-4 border-2 border-indigo-500 text-indigo-400 font-bold rounded-full hover:bg-indigo-500/10 transition-all text-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t('getInTouch')}
              </motion.a>
            </motion.div>
            
            {/* Floating tech stack tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-3 mt-12"
            >
              {['React', 'Three.js', 'Next.js', 'TypeScript'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50 text-slate-300 text-sm"
                  whileHover={{ y: -5 }}
                >
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <InteractiveElement>
              <div className="relative w-96 h-96 mx-auto">
                {/* Animated rings */}
                {[0, 1, 2].map((ring) => (
                  <motion.div 
                    key={ring}
                    className="absolute inset-0 rounded-full border border-indigo-500/30"
                    style={{
                      transform: `scale(${1 + ring * 0.2})`,
                    }}
                    animate={{
                      scale: [1 + ring * 0.2, 1.5 + ring * 0.2, 1 + ring * 0.2],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 3 + ring,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                ))}
                
                {/* Profile image with glow */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                  <Image
                    src="/foto.jpeg"
                    alt="Samuel Oliveira"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Code className="text-white w-6 h-6" />
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    y: [0, 10, 0],
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Server className="text-white w-6 h-6" />
                </motion.div>
              </div>
            </InteractiveElement>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-indigo-400 flex justify-center">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 to-slate-900/30"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{t('about')}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {language === 'en' 
                ? "I'm a passionate Full-Stack Developer with expertise in creating modern web applications" 
                : "Sou um Desenvolvedor Full-Stack apaixonado com expertise em criar aplicações web modernas"}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">{t('aboutJourney')}</h3>
              <p className="text-slate-300 mb-6">
                {t('aboutDescription1')}
              </p>
              <p className="text-slate-300">
                {t('aboutDescription2')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-6">{t('educationExperience')}</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-indigo-500 pl-4 py-1">
                  <h4 className="font-bold text-lg">
                    {language === 'en' ? "Computer Science Degree" : "Graduação em Ciência da Computação"}
                  </h4>
                  <p className="text-indigo-400">
                    {language === 'en' ? "University Name" : "Nome da Universidade"}
                  </p>
                  <p className="text-slate-400 text-sm">2015 - 2019</p>
                </div>
                <div className="border-l-2 border-emerald-500 pl-4 py-1">
                  <h4 className="font-bold text-lg">
                    {language === 'en' ? "Senior Full-Stack Developer" : "Desenvolvedor Full-Stack Sênior"}
                  </h4>
                  <p className="text-emerald-400">
                    {language === 'en' ? "Tech Company" : "Empresa de Tecnologia"}
                  </p>
                  <p className="text-slate-400 text-sm">2020 - Present</p>
                </div>
                <div className="border-l-2 border-violet-500 pl-4 py-1">
                  <h4 className="font-bold text-lg">
                    {language === 'en' ? "Frontend Specialist" : "Especialista Frontend"}
                  </h4>
                  <p className="text-violet-400">
                    {language === 'en' ? "Digital Agency" : "Agência Digital"}
                  </p>
                  <p className="text-slate-400 text-sm">2018 - 2020</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{t('skillsTitle')}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {t('skillsDescription')}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 hover:border-indigo-500/50 transition-all backdrop-blur-sm group"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold ml-4 text-white">
                      {language === 'en' 
                        ? skill.name
                        : (skill.name === "Frontend Development" ? "Desenvolvimento Frontend" : 
                           skill.name === "Backend Development" ? "Desenvolvimento Backend" : 
                           "Desenvolvimento Mobile")}
                    </h3>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2.5 rounded-full relative"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                    </motion.div>
                  </div>
                  <p className="text-slate-400">{skill.level}% {t('skillsProficiency')}</p>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-8">{t('technologies')}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Three.js', 'Framer Motion', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'].map((tech, index) => (
                <Tooltip.Provider key={tech}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ 
                          scale: 1.1, 
                          y: -5,
                          boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)"
                        }}
                        className="px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50 text-slate-300 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-emerald-500/10 transition-all cursor-pointer"
                      >
                        {tech}
                      </motion.div>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
                        {tech} {language === 'en' ? "technology" : "tecnologia"}
                        <Tooltip.Arrow className="fill-slate-900" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 to-slate-900/10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{t('projectsTitle')}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {t('projectsDescription')}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Simplified */}
      <section id="contact" className="py-20 bg-slate-800/50 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{t('contact')}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {t('connectWithMe')}
            </p>
          </motion.div>
          
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 flex items-center justify-center mr-4">
                  <Mail className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Email</h4>
                  <p className="text-slate-400">samuel-dng@outlook.com</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 flex items-center justify-center mr-4">
                  <Phone className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Phone</h4>
                  <p className="text-slate-400">+55 (99) 98514-3916</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 flex items-center justify-center mr-4">
                  <MapPin className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Location</h4>
                  <p className="text-slate-400">São Luís, MA, Brazil</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 flex items-center justify-center mr-4">
                  <Calendar className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Availability</h4>
                  <p className="text-slate-400">Open to opportunities</p>
                </div>
              </motion.div>
            </div>
            
            <div className="flex space-x-6">
              <motion.a 
                href="https://github.com/samueldng" 
                target="_blank" 
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700/50 hover:border-indigo-500/50 transition-all backdrop-blur-sm"
              >
                <Github className="text-slate-400 hover:text-indigo-400 transition-colors w-8 h-8" />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/samuel-oliveira-26bb7014a/" 
                target="_blank" 
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700/50 hover:border-indigo-500/50 transition-all backdrop-blur-sm"
              >
                <Linkedin className="text-slate-400 hover:text-indigo-400 transition-colors w-8 h-8" />
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-slate-500 text-sm border-t border-slate-800 relative z-10 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} Samuel Oliveira. {t('allRightsReserved')}</p>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AnimatePresence>
        {isChatOpen && (
          <Dialog.Root open={isChatOpen} onOpenChange={setIsChatOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
              <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-[90vw] h-[500px] rounded-2xl bg-slate-900 border border-slate-700/50 z-50 flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <Dialog.Title className="font-bold text-white">
                      {language === 'en' ? "AI Assistant" : "Assistente de IA"}
                    </Dialog.Title>
                  </div>
                  <Dialog.Close className="p-1 rounded-full hover:bg-slate-800">
                    <X className="w-5 h-5 text-white" />
                  </Dialog.Close>
                </div>
                
                <div 
                  ref={chatContainerRef}
                  className="flex-1 p-4 overflow-y-auto space-y-4"
                >
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.sender === 'user' 
                            ? 'bg-indigo-500 text-white rounded-br-none' 
                            : 'bg-slate-800 text-slate-200 rounded-bl-none'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-slate-800">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={language === 'en' ? "Type your message..." : "Digite sua mensagem..."}
                      className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="p-2 bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </AnimatePresence>
    </div>
  );
}