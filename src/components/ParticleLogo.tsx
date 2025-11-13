'use client';

import { useEffect, useRef } from 'react';
import type { Container, Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { tsParticles } from '@tsparticles/engine';

const ParticleLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initParticles = async () => {
      // Load the slim version of tsparticles
      await loadSlim(tsParticles);

      // Check if container exists
      if (!containerRef.current) return;

      // Create particle configuration for the "S" shape
      const particlesConfig: any = {
        autoPlay: true,
        background: {
          color: {
            value: "transparent"
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#4285f4", "#34A853", "#FBBC05", "#EA4335"],
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none" as const,
            enable: true,
            outModes: {
              default: "bounce" as const,
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle" as const,
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      };

      // Initialize particles
      const particlesContainer = await tsParticles.load({
        id: "particle-logo",
        options: particlesConfig,
      });

      // Clean up function
      return () => {
        if (particlesContainer) {
          particlesContainer.destroy();
        }
      };
    };

    initParticles();
  }, []);

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* The "S" letter as the central element */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <span className="text-6xl font-bold text-white" style={{ 
          fontFamily: 'Arial, sans-serif',
          textShadow: '0 0 10px rgba(66, 133, 244, 0.7), 0 0 20px rgba(52, 168, 83, 0.5), 0 0 30px rgba(251, 188, 5, 0.3)'
        }}>
          S
        </span>
      </div>
      
      {/* Particle container */}
      <div 
        id="particle-logo" 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default ParticleLogo;