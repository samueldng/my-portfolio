'use client';

import { useEffect, useState, useRef } from 'react';

export default function ThreeHero() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Dynamically load Three.js components only on client side
    const loadThreeComponents = async () => {
      try {
        if (typeof window !== 'undefined') {
          // Only load Three.js components on the client side
          const { Canvas, useFrame } = await import('@react-three/fiber');
          const { OrbitControls, Sphere, MeshDistortMaterial, Float } = await import('@react-three/drei');
          const THREE = await import('three');
          
          // Create the 3D scene dynamically
          if (containerRef.current) {
            // Clear any existing content
            containerRef.current.innerHTML = '';
            
            // Create a simple canvas element as fallback
            const canvas = document.createElement('canvas');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.background = 'linear-gradient(to bottom, #111827, #1f2937, #111827)';
            containerRef.current.appendChild(canvas);
            
            // Add a simple animation to the canvas
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = canvas.clientWidth;
              canvas.height = canvas.clientHeight;
              
              let time = 0;
              const animate = () => {
                if (!ctx) return;
                
                time += 0.02;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw a simple animated circle
                const x = canvas.width / 2 + Math.cos(time) * 50;
                const y = canvas.height / 2 + Math.sin(time) * 50;
                const radius = 50 + Math.sin(time * 2) * 10;
                
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                gradient.addColorStop(0, '#22d3ee');
                gradient.addColorStop(1, '#3b82f6');
                
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                requestAnimationFrame(animate);
              };
              
              // Handle window resize
              const handleResize = () => {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
              };
              
              window.addEventListener('resize', handleResize);
              animate();
              
              // Cleanup
              return () => {
                window.removeEventListener('resize', handleResize);
              };
            }
          }
        }
      } catch (err) {
        console.error('Failed to load 3D components:', err);
        setError(true);
      }
    };
    
    loadThreeComponents();
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-cyan-400">Loading 3D content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
       
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* 3D content will be dynamically loaded here */}
    </div>
  );
}