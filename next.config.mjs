/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // React Strict Mode is usually fine in Next 14, but disabling it helps with some 3D interactions
  reactStrictMode: false,

  images: {
    unoptimized: true,
  },

  // Transpile the 3D packages to ensuring they work correctly with App Router
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;