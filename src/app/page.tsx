import { FC } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa"; // Ícones atualizados para Email e WhatsApp
import Image from "next/image"; // Para otimizar o carregamento de imagens

const Page: FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900">
      {/* Seção de Introdução */}
      <section className="min-h-screen flex flex-col justify-center bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 text-white text-center py-16 transform hover:scale-105 transition-all duration-700">
        <h1 className="text-6xl font-extrabold tracking-wide mb-6 animate__animated animate__fadeIn animate__delay-1s sm:text-5xl md:text-6xl">Samuel Oliveira</h1>
        <p className="text-2xl font-semibold mb-8 animate__animated animate__fadeIn animate__delay-2s sm:text-xl">Desenvolvedor Full-Stack | Especialista em Node.js, React e muito mais!</p>
        <a
          href="#projetos"
          className="inline-block px-8 py-4 text-lg font-semibold bg-white text-gray-900 rounded-xl shadow-xl hover:scale-110 transition-transform transform hover:shadow-2xl animate__animated animate__fadeIn animate__delay-3s sm:px-6 sm:py-3"
        >
          Ver Projetos
        </a>
      </section>

      {/* Seção de Sobre Mim */}
      <section id="sobre" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900 mb-6 sm:text-3xl">Sobre Mim</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-6 sm:text-lg">
            Sou um desenvolvedor apaixonado por tecnologia, com experiência em projetos de larga escala
            utilizando Node.js, React, TypeScript e outras tecnologias. Meu objetivo é criar soluções inovadoras
            que impactem positivamente os usuários e empresas.
          </p>
        </div>
      </section>

      {/* Seção de Projetos */}
      <section id="projetos" className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-center text-white mb-10 sm:text-3xl">Meus Projetos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Projeto 1 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image
                src="/images/projeto1.png" // Ajustado para caminho relativo considerando o nome do repositório
                alt="Screenshot do projeto 1"
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
                src="/portfolio/images/projeto2.png" // Ajustado para caminho relativo considerando o nome do repositório
                alt="Screenshot do projeto 2"
                width={400}
                height={300}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-900 sm:text-xl">SIS Frota</h3>
              <p className="text-gray-600 mb-4 sm:text-base">Gestão e conferencia de frotas</p>
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
                src="/portfolio/images/projeto3.png" // Ajustado para caminho relativo considerando o nome do repositório
                alt="Screenshot do projeto 3"
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

      {/* Seção de Habilidades */}
      <section id="habilidades" className="py-24 px-6 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900 mb-10 sm:text-3xl">Habilidades</h2>
          <div className="flex flex-wrap justify-center space-x-12 sm:space-x-8">
            <div className="text-center transform hover:scale-110 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800 sm:text-lg">React</h3>
              <div className="text-7xl text-blue-600">⚛️</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800 sm:text-lg">Node.js</h3>
              <div className="text-7xl text-green-600">🌿</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800 sm:text-lg">TypeScript</h3>
              <div className="text-7xl text-blue-500">🟦</div>
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
