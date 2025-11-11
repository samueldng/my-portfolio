'use client';

import { motion } from 'framer-motion';
import { Code, Server, Smartphone, Database, Palette, Zap, Globe, GitBranch } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

export default function SkillVisualization() {
  const { t } = useLanguage();
  
  const skills: Skill[] = [
    { name: "Frontend", level: 95, icon: <Code className="w-6 h-6" />, color: "from-indigo-400 to-purple-500" },
    { name: "Backend", level: 90, icon: <Server className="w-6 h-6" />, color: "from-emerald-400 to-teal-500" },
    { name: "Mobile", level: 85, icon: <Smartphone className="w-6 h-6" />, color: "from-amber-400 to-orange-500" },
    { name: "Database", level: 88, icon: <Database className="w-6 h-6" />, color: "from-rose-400 to-pink-500" },
    { name: "UI/UX", level: 82, icon: <Palette className="w-6 h-6" />, color: "from-cyan-400 to-blue-500" },
    { name: "Performance", level: 92, icon: <Zap className="w-6 h-6" />, color: "from-violet-400 to-fuchsia-500" },
  ];

  const techStack = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 
    'Tailwind CSS', 'Three.js', 'Framer Motion', 'MongoDB',
    'PostgreSQL', 'Docker', 'Git', 'AWS'
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/20 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
          >
            {/* Subtle animated background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white shadow-lg`}>
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold ml-4">{skill.name}</h3>
            </div>
            
            <div className="w-full bg-gray-700/30 rounded-full h-2.5 mb-2 overflow-hidden">
              <motion.div 
                className={`bg-gradient-to-r ${skill.color} h-2.5 rounded-full relative`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              </motion.div>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-gray-400 text-sm">Proficiency</p>
              <span className={`text-sm font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                {skill.level}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8"
      >
        <h3 className="text-2xl font-bold text-center mb-8">{t('skillsTechStack')}</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                y: -3,
              }}
              className="px-4 py-2 bg-gray-800/30 backdrop-blur-sm rounded-full border border-gray-700/30 text-gray-300 tech-stack-item hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-emerald-500/10 transition-all duration-300"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}