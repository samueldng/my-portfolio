import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Add any other Next.js config options here
};

export default nextConfig;