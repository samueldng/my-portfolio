'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  title: string;
  level: number;
  icon: LucideIcon;
  description: string;
  index?: number;
}

export default function SkillCard({ title, level, icon: Icon, description, index = 0 }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.5)' }}
      className="bg-gray-950 rounded-none border border-white/10 p-6 hover:shadow-2xl transition-all group"
    >
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
    </motion.div>
  );
}