import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Exporta como uma aplicação estática
  basePath: '/portfolio', // Caminho base para o repositório
  assetPrefix: '/portfolio/', // Garante que os assets (imagens, fontes, etc) sejam carregados corretamente
  trailingSlash: true, // Adiciona a barra no final da URL
};

export default nextConfig;
