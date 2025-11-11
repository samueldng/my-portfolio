'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sphere, Box, Torus } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function FloatingGeometries() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 32, 32]} position={[-3, 2, 0]}>
          <meshStandardMaterial color="#00ccff" roughness={0.1} metalness={0.9} />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <Box args={[1.5, 1.5, 1.5]} position={[3, -1, 1]}>
          <meshStandardMaterial color="#ff00ff" roughness={0.2} metalness={0.8} />
        </Box>
      </Float>
      
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <Torus args={[1, 0.4, 16, 100]} position={[0, 2, -3]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#00ff88" roughness={0.1} metalness={0.95} />
        </Torus>
      </Float>
      
      <Float speed={1.8} rotationIntensity={1} floatIntensity={2.5}>
        <Box args={[1, 1, 1]} position={[-2, -2, 2]}>
          <meshStandardMaterial color="#ffaa00" roughness={0.3} metalness={0.7} />
        </Box>
      </Float>
    </group>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const particleCount = 200;
  
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const matrix = new THREE.Matrix4();
        
        // Animate particles in a wave pattern
        matrix.setPosition(
          positions[i3] + Math.sin(time * 0.5 + i * 0.1) * 0.5,
          positions[i3 + 1] + Math.cos(time * 0.3 + i * 0.1) * 0.5,
          positions[i3 + 2] + Math.sin(time * 0.4 + i * 0.1) * 0.5
        );
        
        particlesRef.current.setMatrixAt(i, matrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#4dffb8" />
    </instancedMesh>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ccff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
    </>
  );
}

export default function ModelShowcase() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Only render on client side to avoid SSR issues
  if (typeof window === 'undefined') return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-96 rounded-2xl overflow-hidden border border-gray-700/30 bg-gradient-to-br from-gray-900 to-black"
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <SceneLights />
        <FloatingGeometries />
        <ParticleField />
        <OrbitControls 
          enableZoom={true} 
          enablePan={true}
          autoRotate={!isMounted}
          autoRotateSpeed={0.5}
        />
        <Text
          position={[0, -4, 0]}
          color="#ffffff"
          fontSize={0.5}
          maxWidth={10}
          textAlign="center"
        >
          Interaja com o modelo 3D
        </Text>
      </Canvas>
      
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-gray-300">
        <p>Arraste para rotacionar • Scroll para zoom</p>
      </div>
    </motion.div>
  );
}