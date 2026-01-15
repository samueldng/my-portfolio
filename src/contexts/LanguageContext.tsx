'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Navigation
    'nav.home': 'Home',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',

    // Hero Section
    'hero.title': 'Samuel Oliveira',
    'hero.subtitle': 'Desenvolvedor Full-Stack especializado em criar experiências digitais excepcionais com Node.js, React e tecnologias modernas',
    'hero.viewProjects': 'Ver Projetos',
    'hero.contactMe': 'Entrar em Contato',

    // Skills Section
    'skills.title': 'HABILIDADES',
    'skills.subtitle': 'Tecnologias e ferramentas que domino para criar soluções digitais de alta qualidade',
    'skills.frontend': 'Frontend',
    'skills.frontend.desc': 'Desenvolvimento de interfaces modernas e responsivas com React, Next.js e Tailwind CSS',
    'skills.backend': 'Backend',
    'skills.backend.desc': 'APIs robustas e escaláveis com Node.js, Express e bancos de dados relacionais e não relacionais',
    'skills.mobile': 'Mobile',
    'skills.mobile.desc': 'Aplicativos móveis nativos e multiplataforma com React Native',
    'skills.techStack': 'Tecnologias que utilizo',

    // Projects Section
    'projects.title': 'TRABALHOS',
    'projects.subtitle': 'Uma seleção dos meus trabalhos mais recentes e impactantes',
    'project.nell.description': 'Aplicação completa de gestão e controle de estoque com dashboard em tempo real',
    'project.sis.description': 'Sistema completo de gestão e conferência de frotas veiculares com geolocalização',
    'project.squid.description': 'Jogo interativo baseado na famosa série Round 6 com mecânicas envolventes',

    // Chat Section
    'chat.title': 'ASSISTENTE IA',
    'chat.subtitle': 'Converse com meu assistente para saber mais sobre meus projetos e habilidades',
    'chat.show': 'Mostrar Chat',
    'chat.hide': 'Ocultar Chat',
    'chat.start': 'Iniciar Conversa com IA',

    // Contact Section
    'contact.title': 'CONTATO',
    'contact.subtitle': 'Vamos conversar sobre seu próximo projeto ou oportunidade',
    'contact.workTogether': 'Vamos trabalhar juntos!',
    'contact.description': 'Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades para fazer parte da sua equipe.',
    'contact.email': 'Email',
    'contact.whatsapp': 'WhatsApp',

    // Footer
    'footer.copyright': '© {year} Samuel Oliveira. Todos os direitos reservados.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title': 'Samuel Oliveira',
    'hero.subtitle': 'Full-Stack Developer specialized in creating exceptional digital experiences with Node.js, React, and modern technologies',
    'hero.viewProjects': 'View Projects',
    'hero.contactMe': 'Contact Me',

    // Skills Section
    'skills.title': 'SKILLS',
    'skills.subtitle': 'Technologies and tools I master to create high-quality digital solutions',
    'skills.frontend': 'Frontend',
    'skills.frontend.desc': 'Development of modern and responsive interfaces with React, Next.js, and Tailwind CSS',
    'skills.backend': 'Backend',
    'skills.backend.desc': 'Robust and scalable APIs with Node.js, Express, and relational and non-relational databases',
    'skills.mobile': 'Mobile',
    'skills.mobile.desc': 'Native and cross-platform mobile applications with React Native',
    'skills.techStack': 'Technologies I use',

    // Projects Section
    'projects.title': 'WORK',
    'projects.subtitle': 'A selection of my most recent and impactful work',
    'project.nell.description': 'Complete inventory management and control application with real-time dashboard',
    'project.sis.description': 'Complete vehicle fleet management and inspection system with geolocation',
    'project.squid.description': 'Interactive game based on the famous Round 6 series with engaging mechanics',

    // Chat Section
    'chat.title': 'AI ASSISTANT',
    'chat.subtitle': 'Chat with my assistant to learn more about my projects and skills',
    'chat.show': 'Show Chat',
    'chat.hide': 'Hide Chat',
    'chat.start': 'Start AI Conversation',

    // Contact Section
    'contact.title': 'CONTACT',
    'contact.subtitle': 'Let\'s talk about your next project or opportunity',
    'contact.workTogether': 'Let\'s work together!',
    'contact.description': 'I\'m always open to discussing new projects, creative ideas, or opportunities to join your team.',
    'contact.email': 'Email',
    'contact.whatsapp': 'WhatsApp',

    // Footer
    'footer.copyright': '© {year} Samuel Oliveira. All rights reserved.',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    if (!translation) {
      // If translation doesn't exist, try to get it from the other language
      const fallbackLanguage = language === 'pt' ? 'en' : 'pt';
      return translations[fallbackLanguage][key as keyof typeof translations[typeof fallbackLanguage]] || key;
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}