'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Hero Section
    heroTitle: "Samuel Oliveira",
    heroSubtitle: "Desenvolvedor Full-Stack especializado em criar experiências digitais excepcionais com Node.js, React e tecnologias modernas",
    heroProjectsBtn: "Ver Projetos",
    heroContactBtn: "Entrar em Contato",
    
    // Navigation
    navHome: "Home",
    navSkills: "Habilidades",
    navProjects: "Projetos",
    navContact: "Contato",
    
    // Skills Section
    skillsTitle: "Minhas Habilidades",
    skillsSubtitle: "Tecnologias e ferramentas que domino para criar soluções digitais de alta qualidade",
    skillsTechStack: "Tecnologias que utilizo",
    
    // Projects Section
    projectsTitle: "Meus Projetos",
    projectsSubtitle: "Uma seleção dos meus trabalhos mais recentes e impactantes",
    
    // Project Details
    projectDescription: "Descrição",
    projectTechnologies: "Tecnologias",
    projectView: "Ver Projeto",
    projectSource: "Código Fonte",
    
    // Contact Section
    contactTitle: "Entre em Contato",
    contactSubtitle: "Vamos conversar sobre seu próximo projeto ou oportunidade",
    contactCTA: "Vamos trabalhar juntos!",
    contactMessage: "Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades para fazer parte da sua equipe.",
    contactEmail: "Email",
    contactPhone: "WhatsApp",
    contactConnect: "Conecte-se comigo",
    contactSendMessage: "Enviar Mensagem",
    contactSending: "Enviando...",
    contactSuccess: "Mensagem enviada!",
    contactSuccessMessage: "Obrigado por entrar em contato. Retornarei sua mensagem em breve.",
    
    // Form Fields
    formName: "Nome",
    formEmail: "Email",
    formMessage: "Mensagem",
    formNamePlaceholder: "Seu nome",
    formEmailPlaceholder: "seu.email@exemplo.com",
    formMessagePlaceholder: "Sua mensagem...",
    
    // Footer
    footerText: "© {year} Samuel Oliveira. Todos os direitos reservados.",
    
    // Project Specifics
    nellAppTitle: "Nell App",
    nellAppDesc: "Aplicação completa de gestão e controle de estoque com dashboard em tempo real",
    sisFrotaTitle: "SIS Frota",
    sisFrotaDesc: "Sistema completo de gestão e conferência de frotas veiculares com geolocalização",
    squidGameTitle: "Squid Game",
    squidGameDesc: "Jogo interativo baseado na famosa série Round 6 com mecânicas envolventes",
  },
  en: {
    // Hero Section
    heroTitle: "Samuel Oliveira",
    heroSubtitle: "Full-Stack Developer specialized in creating exceptional digital experiences with Node.js, React, and modern technologies",
    heroProjectsBtn: "View Projects",
    heroContactBtn: "Get in Touch",
    
    // Navigation
    navHome: "Home",
    navSkills: "Skills",
    navProjects: "Projects",
    navContact: "Contact",
    
    // Skills Section
    skillsTitle: "My Skills",
    skillsSubtitle: "Technologies and tools I master to create high-quality digital solutions",
    skillsTechStack: "Technologies I use",
    
    // Projects Section
    projectsTitle: "My Projects",
    projectsSubtitle: "A selection of my most recent and impactful work",
    
    // Project Details
    projectDescription: "Description",
    projectTechnologies: "Technologies",
    projectView: "View Project",
    projectSource: "Source Code",
    
    // Contact Section
    contactTitle: "Get in Touch",
    contactSubtitle: "Let's talk about your next project or opportunity",
    contactCTA: "Let's work together!",
    contactMessage: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your team.",
    contactEmail: "Email",
    contactPhone: "WhatsApp",
    contactConnect: "Connect with me",
    contactSendMessage: "Send Message",
    contactSending: "Sending...",
    contactSuccess: "Message sent!",
    contactSuccessMessage: "Thank you for contacting me. I'll get back to you soon.",
    
    // Form Fields
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formNamePlaceholder: "Your name",
    formEmailPlaceholder: "your.email@example.com",
    formMessagePlaceholder: "Your message...",
    
    // Footer
    footerText: "© {year} Samuel Oliveira. All rights reserved.",
    
    // Project Specifics
    nellAppTitle: "Nell App",
    nellAppDesc: "Complete inventory management and control application with real-time dashboard",
    sisFrotaTitle: "SIS Frota",
    sisFrotaDesc: "Complete vehicle fleet management and inspection system with geolocation",
    squidGameTitle: "Squid Game",
    squidGameDesc: "Interactive game based on the famous Round 6 series with engaging mechanics",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations.pt] || key;
    // Replace {year} with current year if present
    if (typeof translation === 'string' && translation.includes('{year}')) {
      return translation.replace('{year}', new Date().getFullYear().toString());
    }
    return translation as string;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}