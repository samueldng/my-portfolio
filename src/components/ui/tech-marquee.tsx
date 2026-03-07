'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TechItem {
    name: string;
    category?: 'language' | 'framework' | 'database' | 'tool' | 'library';
}

const techItems: TechItem[] = [
    { name: 'TypeScript', category: 'language' },
    { name: 'JavaScript', category: 'language' },
    { name: 'HTML5', category: 'language' },
    { name: 'CSS3', category: 'language' },
    { name: 'React', category: 'framework' },
    { name: 'Next.js', category: 'framework' },
    { name: 'Node.js', category: 'framework' },
    { name: 'React Native', category: 'framework' },
    { name: 'Tailwind CSS', category: 'framework' },
    { name: 'Express', category: 'framework' },
    { name: 'MongoDB', category: 'database' },
    { name: 'PostgreSQL', category: 'database' },
    { name: 'MySQL', category: 'database' },
    { name: 'Firebase', category: 'database' },
    { name: 'Framer Motion', category: 'library' },
    { name: 'Three.js', category: 'library' },
    { name: 'GSAP', category: 'library' },
    { name: 'Radix UI', category: 'library' },
    { name: 'Lucide Icons', category: 'library' },
    { name: 'Docker', category: 'tool' },
    { name: 'Git', category: 'tool' },
];

const categoryColors: Record<string, string> = {
    language: 'border-cyan-500/30 text-cyan-400',
    framework: 'border-indigo-500/30 text-indigo-400',
    database: 'border-emerald-500/30 text-emerald-400',
    tool: 'border-amber-500/30 text-amber-400',
    library: 'border-purple-500/30 text-purple-400',
};

const categoryDotColors: Record<string, string> = {
    language: 'bg-cyan-400',
    framework: 'bg-indigo-400',
    database: 'bg-emerald-400',
    tool: 'bg-amber-400',
    library: 'bg-purple-400',
};

function TechPill({ tech }: { tech: TechItem }) {
    return (
        <div
            className={cn(
                'flex items-center gap-2.5 px-5 py-2.5 bg-gray-900/80 border rounded-none whitespace-nowrap cursor-default shrink-0',
                'transition-all duration-300 hover:bg-gray-800/90 hover:shadow-lg hover:shadow-indigo-500/5 hover:scale-105 hover:-translate-y-1',
                categoryColors[tech.category || 'tool']
            )}
        >
            <div className={cn('w-1.5 h-1.5 rounded-full', categoryDotColors[tech.category || 'tool'])} />
            <span className="font-mono text-sm tracking-wide">{tech.name}</span>
        </div>
    );
}

function MarqueeRow({ items, reverse = false, duration = 20 }: { items: TechItem[]; reverse?: boolean; duration?: number }) {
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollerRef.current) return;
        const scroller = scrollerRef.current;

        // Duplicate the inner content for seamless loop
        const inner = scroller.querySelector('.marquee-inner');
        if (!inner) return;

        const children = Array.from(inner.children);
        children.forEach(child => {
            const clone = child.cloneNode(true) as HTMLElement;
            clone.setAttribute('aria-hidden', 'true');
            inner.appendChild(clone);
        });

        // Apply animation via direct style
        (inner as HTMLElement).style.animation = `marquee-scroll ${duration}s linear infinite`;
        if (reverse) {
            (inner as HTMLElement).style.animationDirection = 'reverse';
        }
    }, [duration, reverse]);

    return (
        <div ref={scrollerRef} className="relative overflow-hidden group/marquee">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

            <div
                className="marquee-inner flex gap-4 py-2 w-max group-hover/marquee:[animation-play-state:paused]"
            >
                {items.map((tech, i) => (
                    <TechPill key={`${tech.name}-${i}`} tech={tech} />
                ))}
            </div>
        </div>
    );
}

export function TechMarquee() {
    const firstRow = techItems.slice(0, Math.ceil(techItems.length / 2));
    const secondRow = techItems.slice(Math.ceil(techItems.length / 2));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
        >
            <MarqueeRow items={firstRow} duration={22} />
            <MarqueeRow items={secondRow} reverse duration={26} />

            {/* Category legend */}
            <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                {[
                    { label: 'Linguagens', color: 'bg-cyan-400' },
                    { label: 'Frameworks', color: 'bg-indigo-400' },
                    { label: 'Banco de Dados', color: 'bg-emerald-400' },
                    { label: 'Bibliotecas', color: 'bg-purple-400' },
                    { label: 'Ferramentas', color: 'bg-amber-400' },
                ].map((cat) => (
                    <div key={cat.label} className="flex items-center gap-2 text-gray-500 text-xs font-mono uppercase tracking-wider">
                        <div className={cn('w-2 h-2 rounded-full', cat.color)} />
                        {cat.label}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default TechMarquee;
