'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<'default' | 'hover' | 'magnetic' | 'gradient'>('default');

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const mouseLeaveHandler = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseleave', mouseLeaveHandler);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseleave', mouseLeaveHandler);
    };
  }, []);

  // Magnetic cursor effect for interactive elements
  useEffect(() => {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    const handleMouseEnter = () => {
      setVariant('magnetic');
    };
    
    const handleMouseLeave = () => {
      setVariant('default');
    };
    
    magneticElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      magneticElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Hover effect for interactive elements
  useEffect(() => {
    const hoverElements = document.querySelectorAll('.cursor-hover');
    
    const handleMouseEnter = () => {
      setVariant('hover');
    };
    
    const handleMouseLeave = () => {
      setVariant('default');
    };
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      hoverElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Gradient effect for special elements
  useEffect(() => {
    const gradientElements = document.querySelectorAll('.cursor-gradient');
    
    const handleMouseEnter = () => {
      setVariant('gradient');
    };
    
    const handleMouseLeave = () => {
      setVariant('default');
    };
    
    gradientElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      gradientElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const cursorVariants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: 'rgba(34, 211, 238, 0.7)',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      x: position.x - 10,
      y: position.y - 10,
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(34, 211, 238, 0.3)',
      border: '2px solid rgba(34, 211, 238, 1)',
      x: position.x - 30,
      y: position.y - 30,
    },
    magnetic: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(129, 140, 248, 0.3)',
      border: '2px solid rgba(129, 140, 248, 1)',
      x: position.x - 20,
      y: position.y - 20,
    },
    gradient: {
      width: 80,
      height: 80,
      backgroundColor: 'transparent',
      border: 'none',
      x: position.x - 40,
      y: position.y - 40,
    }
  };

  return (
    <>
      {isVisible && (
        <motion.div
          ref={cursorRef}
          className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
          variants={cursorVariants}
          animate={variant}
          transition={{
            type: 'spring',
            mass: 0.1,
            stiffness: 800,
            damping: 20,
          }}
        >
          {variant === 'gradient' && (
            <div className="absolute inset-0 rounded-full animate-spin-slow">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-70 blur-md"></div>
            </div>
          )}
        </motion.div>
      )} 
      
      {/* Cursor follower for trailing effect */}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 w-4 h-4 rounded-full bg-cyan-400 pointer-events-none z-40 mix-blend-difference"
          animate={{
            x: position.x - 8,
            y: position.y - 8,
          }}
          transition={{
            type: 'spring',
            mass: 0.3,
            stiffness: 600,
            damping: 30,
          }}
        />
      )}
    </>
  );
}