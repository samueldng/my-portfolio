'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  index?: number;
  techLabel?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
  liveUrl,
  index = 0,
  techLabel = 'Tecnologias',
}: ProjectCardProps) {
  const [showTech, setShowTech] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, borderColor: 'rgba(99, 102, 241, 0.5)' }}
      className="bg-gray-950 border border-white/10 overflow-hidden group hover:shadow-2xl hover:shadow-green-500/5 transition-all"
    >
      <div className="relative h-56 overflow-hidden bg-gray-900 border-b border-white/5">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold font-mono tracking-tight text-white group-hover:text-green-400 transition-colors">
            {title}
          </h3>
          <div className="flex space-x-3 text-gray-500">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            )}
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light h-12 line-clamp-2">
          {description}
        </p>

        {/* FAB Tecnologias */}
        <div className="relative">
          <motion.button
            onClick={() => setShowTech(!showTech)}
            onMouseEnter={() => setShowTech(true)}
            onMouseLeave={() => setShowTech(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-white/10 text-gray-400 
                       hover:text-green-400 hover:border-green-500/40 transition-all font-mono text-xs 
                       uppercase tracking-wider cursor-pointer relative z-20"
          >
            <Layers className="w-3.5 h-3.5" />
            {techLabel}
          </motion.button>

          <AnimatePresence>
            {showTech && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onMouseEnter={() => setShowTech(true)}
                onMouseLeave={() => setShowTech(false)}
                className="absolute bottom-full left-0 mb-2 z-30 min-w-[200px]"
              >
                <div className="bg-gray-900/95 backdrop-blur-md border border-white/10 p-3 shadow-2xl shadow-black/40">
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.6, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.6, y: 10 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 20,
                          delay: i * 0.06,
                        }}
                        className="px-3 py-1.5 bg-gray-800/80 border border-green-500/20 text-green-300 
                                   text-[11px] uppercase tracking-wider font-mono whitespace-nowrap
                                   hover:bg-green-500/20 hover:border-green-500/40 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
