import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/portfolio', // Definindo o caminho base do repositório
  trailingSlash: true,    // Adiciona a barra no final da URL
};

export default nextConfig;
