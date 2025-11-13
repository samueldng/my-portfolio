'use client';

import { useRef, useEffect, useState } from 'react';

export default function ThreeHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-cyan-400">Loading 3D content...</div>
      </div>
    );
  }

  // Simplified version without Three.js to avoid React context conflicts
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl font-bold text-cyan-400 mb-4">3D Portfolio</div>
        <div className="text-gray-400">Interactive 3D experience coming soon</div>
      </div>
    </div>
  );
}