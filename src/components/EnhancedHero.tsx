'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, useTexture } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1, 128, 128]} scale={1.8}>
        <MeshDistortMaterial
          color="#4F46E5"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.05}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const particleCount = 200;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const matrix = new THREE.Matrix4();
        
        // Create a more organic, flowing motion
        matrix.setPosition(
          positions[i3] + Math.sin(time * 0.5 + i * 0.1) * 0.6,
          positions[i3 + 1] + Math.cos(time * 0.3 + i * 0.1) * 0.6,
          positions[i3 + 2] + Math.sin(time * 0.4 + i * 0.1) * 0.6
        );
        
        particlesRef.current.setMatrixAt(i, matrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#818CF8" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function GeometricOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={1}>
        <mesh position={[-5, 3, -2]} scale={0.8}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#EC4899" 
            transparent 
            opacity={0.7} 
            roughness={0.1} 
            metalness={0.8} 
          />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[6, -2, 1]} scale={1.2}>
          <torusKnotGeometry args={[0.8, 0.2, 128, 32]} />
          <meshStandardMaterial 
            color="#10B981" 
            transparent 
            opacity={0.6} 
            roughness={0.2} 
            metalness={0.7} 
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function EnhancedHero() {
  const { t } = useLanguage();
  
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#818CF8" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        <AnimatedSphere />
        <FloatingParticles />
        <GeometricOrbs />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.3}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-transparent to-emerald-900/10 pointer-events-none"></div>
    </div>
  );
}