import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Configure Next.js to handle Three.js properly
  webpack: (config) => {
    // Ignore Three.js warnings
    config.ignoreWarnings = [
      { module: /node_modules\/@react-three\/drei/ },
      { module: /node_modules\/@react-three\/fiber/ },
      { module: /node_modules\/three/ },
    ];
    
    return config;
  },
  // Add server components configuration
  serverExternalPackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Add any other Next.js config options here
};

export default nextConfig;