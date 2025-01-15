'use client'; // Diretiva que marca o componente como cliente

import { FC, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import Image from "next/image"; // Para otimizar o carregamento de imagens

const Page: FC = () => {
  useEffect(() => {
    // Carregar o script do chatbot quando o componente for montado
    const script = document.createElement('script');
    script.src = "https://chatling.ai/js/embed.js";
    script.async = true;
    script.dataset.id = "4873935879"; // Seu chatbotId
    script.dataset.display = "page_inline"; // Exibição inline do chatbot
    document.body.appendChild(script);

    // Adicionar a configuração do Chatbot, se necessário
    const chatConfig = document.createElement('script');
    chatConfig.innerHTML = `window.chtlConfig = { chatbotId: "4873935879", display: "page_inline", theme: { color: "#4caf50", backgroundColor: "#ffffff", button: { backgroundColor: "#4caf50", textColor: "#ffffff" }} };`;
    document.body.appendChild(chatConfig);

    return () => {
      // Remover o script do chatbot quando o componente for desmontado
      document.body.removeChild(script);
      document.body.removeChild(chatConfig);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900 relative">
      {/* Seção de Introdução */}
      <section className="min-h-screen flex flex-col justify-center bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 text-white text-center py-16 transform hover:scale-105 transition-all duration-700">
        <h1 className="text-6xl font-extrabold tracking-wide mb-6 animate__animated animate__fadeIn animate__delay-1s sm:text-5xl md:text-6xl">Samuel Oliveira</h1>
        <p className="text-2xl font-semibold mb-8 animate__animated animate__fadeIn animate__delay-2s sm:text-xl">Desenvolvedor Full-Stack | Especialista em Node.js, React e muito mais!</p>

        {/* Seção do Chatbot (entre o título e o botão "Ver Projetos") */}
        <div className="py-8">
          <h2 className="text-3xl font-semibold text-white mb-6 sm:text-2xl">Estou Aqui Para Ajudar!</h2>
          <p className="text-xl mb-6 sm:text-lg text-white">Precisa de informações sobre meus projetos ou quer conversar? Fique à vontade para falar comigo!</p>

          {/* Contêiner do chatbot */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md h-80 bg-white rounded-2xl shadow-lg border-2 border-gray-300 relative">
              <div id="chatling-chatbot" className="w-full h-full bg-white rounded-xl overflow-hidden shadow-lg border-2 border-gray-300"></div>

              {/* Botão de Abertura do Chatbot */}
              <div className="absolute bottom-4 left-4">
                <button 
                  onClick={() => document.getElementById('chatling-chatbot')?.classList.toggle('hidden')}
                  className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-all"
                >
                  Iniciar Chat
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botão "Ver Projetos" */}
        <a
          href="#projetos"
          className="inline-block px-8 py-4 text-lg font-semibold bg-white text-gray-900 rounded-xl shadow-xl hover:scale-110 transition-transform transform hover:shadow-2xl animate__animated animate__fadeIn animate__delay-3s sm:px-6 sm:py-3"
        >
          Ver Projetos
        </a>
      </section>

      {/* Seção de Projetos */}
      <section id="projetos" className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-center text-white mb-10 sm:text-3xl">Meus Projetos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Projeto 1 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image
                alt="Screenshot do projeto 1"
                src="/images/projeto1.png" 
                width={400}
                height={300}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-900 sm:text-xl">Nell App</h3>
              <p className="text-gray-600 mb-4 sm:text-base">App de gestão e estoque</p>
              <a
                href="https://github.com/samueldng/nell-app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md transition-transform transform hover:scale-110 hover:bg-blue-700"
              >
                Ver no GitHub
              </a>
            </div>

            {/* Projeto 2 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image
                alt="Screenshot do projeto 2"
                src="/images/projeto2.png" 
                width={400}
                height={300}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-900 sm:text-xl">SIS Frota</h3>
              <p className="text-gray-600 mb-4 sm:text-base">Gestão e conferência de frotas</p>
              <a
                href="https://github.com/samueldng/Rvehicle-photo-app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md transition-transform transform hover:scale-110 hover:bg-blue-700"
              >
                Ver no GitHub
              </a>
            </div>

            {/* Projeto 3 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image
                alt="Screenshot do projeto 3"
                src="/images/projeto3.png" 
                width={400}
                height={300}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-900 sm:text-xl">Squid Game</h3>
              <p className="text-gray-600 mb-4 sm:text-base">Jogo baseado em Round 6</p>
              <a
                href="https://github.com/samueldng/round6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md transition-transform transform hover:scale-110 hover:bg-blue-700"
              >
                Ver no GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Contato */}
      <section id="contato" className="py-24 px-6 text-center bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <h2 className="text-4xl font-semibold mb-6 sm:text-3xl">Entre em Contato</h2>
        <div className="flex justify-center space-x-8">
          <a href="https://github.com/samueldng" target="_blank" rel="noopener noreferrer">
            <FaGithub size={35} className="hover:text-white transition-all duration-300 transform hover:scale-125" />
          </a>
          <a href="https://www.linkedin.com/in/samuel-oliveira-26bb7014a/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={35} className="hover:text-white transition-all duration-300 transform hover:scale-125" />
          </a>
          <a href="mailto:samuel-dng@outlook.com" target="_blank" rel="noopener noreferrer">
            <FaEnvelope size={35} className="hover:text-white transition-all duration-300 transform hover:scale-125" />
          </a>
          <a href="https://wa.me/5599985143916" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={35} className="hover:text-white transition-all duration-300 transform hover:scale-125" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Page;
