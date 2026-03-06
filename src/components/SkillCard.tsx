'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import LiquidMetal to avoid SSR/WebGL issues
const LiquidMetal = dynamic(
  () => import('@/components/ui/liquid-metal').then(mod => mod.LiquidMetal),
  { ssr: false }
);

interface SkillCardProps {
  title: string;
  level: number;
  icon: LucideIcon;
  description: string;
  index?: number;
}

// Color themes for each card
const metalThemes = [
  { colorBack: '#3b82f6', colorTint: '#93c5fd' }, // Blue - Frontend
  { colorBack: '#8b5cf6', colorTint: '#c4b5fd' }, // Purple - Backend
  { colorBack: '#10b981', colorTint: '#6ee7b7' }, // Emerald - Mobile
];

export default function SkillCard({ title, level, icon: Icon, description, index = 0 }: SkillCardProps) {
  const theme = metalThemes[index % metalThemes.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.5)' }}
      className="relative rounded-none overflow-hidden group"
      style={{ padding: 2 }}
    >
      {/* Liquid Metal Border */}
      <LiquidMetal
        colorBack={theme.colorBack}
        colorTint={theme.colorTint}
        speed={0.3}
        repetition={6}
        distortion={0.12}
        scale={1.2}
        className="absolute inset-0 z-0 rounded-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Card Content */}
      <div className="relative z-10 bg-gray-950 p-6 h-full">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold font-mono tracking-tight text-gray-100 group-hover:text-indigo-400 transition-colors">
                {title}
              </h3>
              <Icon className="h-6 w-6 text-gray-500 group-hover:text-indigo-400 transition-colors" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light">
              {description}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono uppercase text-gray-500">
              <span>Proficiency</span>
              <span>{level}%</span>
            </div>
            <div className="w-full bg-gray-900 h-1">
              <motion.div
                className="bg-indigo-500 h-1"
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}