'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectCard({ 
  title, 
  description, 
  technologies, 
  imageUrl,
  githubUrl,
  liveUrl
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -10 }}
      className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="bg-transparent border-0 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-400 mt-2">{description}</p>
        </div>
        <div className="px-4 pb-2 flex-grow">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4 pt-2">
          <div className="flex space-x-3">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Github className="h-4 w-4 mr-1" />
                Code
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}