import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Required for static export
  },
  // Configure Next.js to handle Three.js properly
  webpack: (config) => {
    // Ignore Three.js warnings
    config.ignoreWarnings = [
      { module: /node_modules\/\@react-three\/drei/ },
      { module: /node_modules\/\@react-three\/fiber/ },
      { module: /node_modules\/three/ },
    ];
    
    // Add fallback for Node.js modules that might be needed
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
  // Add server components configuration
  serverExternalPackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Ensure static export works properly
  trailingSlash: true,
  // Add asset prefix for static export
  // assetPrefix: './',
  // Add any other Next.js config options here
};

export default nextConfig;