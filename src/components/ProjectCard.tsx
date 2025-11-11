'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Eye, Calendar, Code } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  year: number;
  stars: number;
  views: number;
}

export default function ProjectCard({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -10, boxShadow: "0 20px 25px rgba(0, 0, 0, 0.3)" }}
        className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 project-card relative group"
      >
        {/* Floating tag */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2 py-1 bg-gradient-to-r from-teal-500 to-blue-600 text-white text-xs rounded-full">
            Destaque
          </span>
        </div>

        <div className="relative h-56 overflow-hidden">
          <Image
            alt={`Screenshot do projeto ${project.title}`}
            src={project.image} 
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all"
              aria-label={`Ver projeto ${project.title}`}
            >
              <ExternalLink className="text-white w-5 h-5" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all"
              aria-label={`Ver código no GitHub do projeto ${project.title}`}
            >
              <Github className="text-white w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(true)}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all"
              aria-label={`Ver detalhes do projeto ${project.title}`}
            >
              <Eye className="text-white w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{project.stars}</span>
            </div>
          </div>
          
          <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 bg-teal-500/20 text-teal-400 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{project.views} views</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Detail Modal */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto rounded-2xl bg-gray-900 border border-gray-700/50 z-50 p-6">
            <div className="flex justify-between items-start mb-4">
              <Dialog.Title className="text-2xl font-bold">
                {project.title}
              </Dialog.Title>
              <Dialog.Close className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Dialog.Close>
            </div>
            
            <div className="relative h-80 rounded-xl overflow-hidden mb-6">
              <Image
                src={project.image}
                alt={`Screenshot do projeto ${project.title}`}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold mb-2">Descrição</h3>
                <p className="text-gray-400">{project.description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Tecnologias</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gradient-to-r from-teal-500/20 to-blue-600/20 text-teal-400 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                Ver Projeto
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                Código Fonte
              </a>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}