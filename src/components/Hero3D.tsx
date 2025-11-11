'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={1.5}>
        <MeshDistortMaterial
          color="#00ccff"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const particleCount = 100;
  
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        particlesRef.current.matrixWorldNeedsUpdate = true;
        
        // Animate particles
        const matrix = new THREE.Matrix4();
        matrix.setPosition(
          positions[i3] + Math.sin(time + i) * 0.5,
          positions[i3 + 1] + Math.cos(time + i) * 0.5,
          positions[i3 + 2] + Math.sin(time * 0.5 + i) * 0.5
        );
        particlesRef.current.setMatrixAt(i, matrix);
      }
    }
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#4dffb8" />
    </instancedMesh>
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedSphere />
      <FloatingParticles />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}