'use client'; // Necessário para habilitar o uso de hooks do lado do cliente (useEffect)

import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Remover a exportação de metadata do layout (já foi movida para outro arquivo)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://chatling.ai/js/embed.js";
    script.dataset.id = "4873935879"; // Seu chatbotId
    script.dataset.display = "page_inline"; // Exibição inline do chatbot

    script.async = true; // Melhor uso de async

    script.onload = () => {
      console.log("Chatbot script carregado com sucesso.");
    };

    script.onerror = (error) => {
      console.error("Erro ao carregar o chatbot:", error);
    };

    document.body.appendChild(script);

    // Adicionar a configuração do Chatbot, se necessário
    const chatConfig = document.createElement("script");
    chatConfig.innerHTML = `
      window.chtlConfig = { 
        chatbotId: "4873935879", 
        display: "page_inline" 
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-gray-900 antialiased`}
      >
        {children}

        {/* Botão do Chatbot visível no layout */}
        <div id="chatbot-container"></div>
      </body>
    </html>
  );
}
