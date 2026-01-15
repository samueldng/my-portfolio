'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Portfólio profissional de Samuel Oliveira - Desenvolvedor Full-Stack especializado em Node.js, React e tecnologias modernas" />
        <meta name="keywords" content="desenvolvedor, full-stack, node.js, react, javascript, typescript, portfolio" />
        <meta name="author" content="Samuel Oliveira" />
        <title>Samuel Oliveira - Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} bg-gray-900 text-gray-100 antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}