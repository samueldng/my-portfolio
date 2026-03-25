'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleWave() {
  const count = 10000;
  
  const [positions, scales] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    let i = 0, j = 0;
    // creating a 100x100 grid centered at logic 0,0
    for (let x = 0; x < 100; x++) {
      for (let z = 0; z < 100; z++) {
        positions[i] = (x - 50) * 0.4;
        positions[i + 1] = 0;
        positions[i + 2] = (z - 50) * 0.4;
        scales[j] = 1;
        i += 3;
        j++;
      }
    }
    return [positions, scales];
  }, [count]);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#00ff66') } // green-400
    },
    vertexShader: `
      uniform float uTime;
      attribute float scale;
      void main() {
        vec3 pos = position;
        // GPU Calculated Wave
        pos.y = sin(pos.x * 0.5 + uTime) * 0.5 + 
                sin(pos.z * 0.3 + uTime * 0.5) * 0.5 + 
                sin((pos.x + pos.z) * 0.2 + uTime) * 0.2;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = scale * (15.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      void main() {
        // Soft circular particle
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = (0.5 - dist) * 2.0;
        gl_FragColor = vec4(uColor, alpha * 0.6);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }), []);

  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        args={[shaderArgs]}
      />
    </points>
  );
}

export default function ThreeHero() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-gray-950">
      {/* 
        gl={{ antialias: false }} enhances performance heavily on mobile and high-DPI
        dpr restricts pixel ratio to avoid over-rendering on modern phones
      */}
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }} gl={{ antialias: false, alpha: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <fog attach="fog" args={['#030712', 5, 20]} />
          <ambientLight intensity={0.5} />
          <ParticleWave />
        </Suspense>
      </Canvas>
    </div>
  );
}

