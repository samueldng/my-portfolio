'use client'; // Certifique-se de que está habilitado para o uso de hooks no lado do cliente

import { useEffect } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Carregar o script do chatbot quando o componente for montado
    const script = document.createElement('script');
    script.src = "https://chatling.ai/js/embed.js";
    script.async = true;
    script.dataset.id = "4873935879"; // Seu chatbotId
    script.dataset.display = "fullscreen"; // Exibição fullscreen
    document.body.appendChild(script);
  
    // Adicionar a configuração do Chatbot, se necessário
    const chatConfig = document.createElement('script');
    chatConfig.innerHTML = `
      window.chtlConfig = { 
        chatbotId: "4873935879", 
        display: "fullscreen", 
        theme: { 
          color: "#4caf50", 
          backgroundColor: "#ffffff", 
          button: { 
            backgroundColor: "#4caf50", 
            textColor: "#ffffff" 
          } 
        }
      };
    `;
    document.body.appendChild(chatConfig);
  
    return () => {
      // Remover o script do chatbot quando o componente for desmontado
      document.body.removeChild(script);
      document.body.removeChild(chatConfig);
    };
  }, []);

  return (
    <html lang="pt-br">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Samuel Oliveira - Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
