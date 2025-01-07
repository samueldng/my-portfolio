import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Exporta como uma aplicação estática
  trailingSlash: true, // Adiciona a barra no final da URL
  images: {
    unoptimized: true, // Desabilita a otimização de imagens
  },
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/my-portfolio', // Caminho base para o repositório (produção)
    assetPrefix: '/my-portfolio/', // Garante que os assets sejam carregados corretamente
  }),
};

export default nextConfig;
