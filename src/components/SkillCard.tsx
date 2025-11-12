'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  title: string;
  level: number;
  icon: LucideIcon;
  description: string;
}

export default function SkillCard({ title, level, icon: Icon, description }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 p-1 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="bg-transparent border-0">
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
        </div>
        <div className="p-4 pt-0">
          <div className="space-y-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <motion.div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{level}% proficiency</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}