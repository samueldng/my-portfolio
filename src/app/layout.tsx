import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "globals.css";

// Configuração das fontes do Google
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados do projeto
export const metadata: Metadata = {
  title: "Samuel Oliveira - Portfólio",
  description: "Portfólio de Samuel Oliveira, desenvolvedor Full-Stack | Especialista em Node.js, React, e muito mais!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        {/* Defina o ícone do seu portfólio ou projeto, se necessário */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-gray-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
