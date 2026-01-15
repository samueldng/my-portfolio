'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleWave() {
  const count = 5000;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2; // y (flatter)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
    }
    return positions;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Animate wave
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];

      // Calculate wave height based on position and time
      // Multiple sine waves for complexity
      const y =
        Math.sin(x * 0.5 + time) * 0.5 +
        Math.sin(z * 0.3 + time * 0.5) * 0.5 +
        Math.sin((x + z) * 0.2 + time) * 0.2;

      positions[i * 3 + 1] = y;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Slow rotation
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

export default function ThreeHero() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 2, 6], fov: 60 }}>
        <Suspense fallback={null}>
          <fog attach="fog" args={['#000000', 5, 15]} />
          <ambientLight intensity={0.5} />

          <ParticleWave />

        </Suspense>
      </Canvas>
    </div>
  );
}
