'use client';

import { useEffect, useRef } from 'react';
import type { Container, Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { tsParticles } from '@tsparticles/engine';
import { loadPolygonMaskPlugin } from '@tsparticles/plugin-polygon-mask';

const ParticleLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initParticles = async () => {
      // Load the slim version of tsparticles
      await loadSlim(tsParticles);
      await loadPolygonMaskPlugin(tsParticles);

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
            distance: 50,
            enable: true,
            opacity: 0.8,
            width: 1,
          },
          move: {
            direction: "none" as const,
            enable: true,
            outModes: {
              default: "bounce" as const,
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 150,
          },
          opacity: {
            value: 0.8,
          },
          shape: {
            type: "circle" as const,
          },
          size: {
            value: { min: 2, max: 4 },
          },
        },
        detectRetina: true,
        polygon: {
          enable: true,
          scale: 1,
          type: "inline",
          inline: {
            arrangement: "equidistant"
          },
          draw: {
            enable: false,
          },
          move: {
            radius: 10,
            type: "path"
          },
          url: "M 30 20 C 70 20 70 40 50 50 C 30 60 30 80 70 80",
        }
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
      {/* Particle container for the "S" shape */}
      <div 
        id="particle-logo" 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default ParticleLogo;