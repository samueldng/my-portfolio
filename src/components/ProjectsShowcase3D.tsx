'use client';

import { useRef, ReactNode, useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useMotionValueEvent,
    AnimatePresence,
} from "framer-motion";
import { ExternalLink, Github, Layers } from "lucide-react";
import Image from "next/image";
import { ScrollTiltText } from "@/components/ui/scroll-tilt-text";
import ScrollPinSection from "@/components/ScrollPinSection";

interface Project {
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    githubUrl?: string;
    liveUrl?: string;
}

interface ProjectsShowcase3DProps {
    projects: Project[];
    title: string;
    subtitle: string;
    techLabel?: string;
}

// Fixed width for each card so we can calculate total scroll distance
const CARD_WIDTH = 400;
const GAP = 32;

export default function ProjectsShowcase3D({
    projects,
    title,
    subtitle,
    techLabel = "Tecnologias",
}: ProjectsShowcase3DProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile screens
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // We need to scroll horizontally, but since we're using sticky,
    // we tie the x translation to the vertical scroll progress of our container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Calculate widths for horizontal scroll extent
    const cardWidth = isMobile ? window.innerWidth * 0.85 : 400; // 85vw or 400px
    const gap = isMobile ? 24 : 32; // gap-6 or gap-8

    // total scrolling width based on responsive card widths
    const totalItemsWidth = projects.length * cardWidth + (projects.length - 1) * gap;
    const paddingOffset = isMobile ? 48 : 200; // px-6 is 48px, md:px-24 is ~200px

    // Offset depends on window width
    const x = useTransform(scrollYProgress, [0, 1], ["0px", `calc(-${totalItemsWidth}px + 100vw - ${paddingOffset}px)`]);

    // Track velocity to create the 3D wave effect
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smooth out the velocity for the wave effect
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Map velocity to a rotation and Z offset (only used on desktop)
    const velocityRotation = useTransform(smoothVelocity, [-1000, 0, 1000], [-30, 0, 30]);
    const velocityZ = useTransform(smoothVelocity, [-1000, 0, 1000], [-200, 0, -200]);

    if (isMobile) {
        return (
            <div className="bg-gray-950 w-full">
                <ScrollPinSection itemCount={projects.length + 1}>
                    {/* Slide 1: Title */}
                    <div className="w-full h-full flex flex-col justify-center px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-left w-full max-w-sm mx-auto pt-10"
                        >
                            <h2 className="text-5xl font-black mb-4 tracking-tighter text-white">
                                {title}<span className="text-indigo-500">.</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-light border-l-2 border-indigo-500/50 pl-4">
                                {subtitle}
                            </p>
                        </motion.div>
                    </div>

                    {/* Slides 2+: Projects */}
                    {projects.map((project, i) => (
                        <div key={`mobile-proj-${i}`} className="w-full h-full flex flex-col justify-center items-center px-6">
                            <div className="w-full max-w-sm">
                                <MobileProjectCard project={project} techLabel={techLabel} />
                            </div>
                        </div>
                    ))}
                </ScrollPinSection>
            </div>
        );
    }

    return (
        <section ref={containerRef} style={{ height: "400vh" }} className="relative bg-gray-950">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center perspective-[1200px]">
                {/* Title area */}
                <div className="absolute top-20 left-6 md:left-24 z-10 w-full pr-6">
                    <ScrollTiltText startRotation={-10} startX={-60} offsetEnd={0.5}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-10 text-left"
                        >
                            <h2 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter text-white">
                                {title}<span className="text-indigo-500">.</span>
                            </h2>
                            <p className="text-gray-400 max-w-xl text-lg md:text-xl font-light border-l-2 border-indigo-500/50 pl-4 md:pl-6">
                                {subtitle}
                            </p>
                        </motion.div>
                    </ScrollTiltText>
                </div>

                {/* 3D Carousel container */}
                <motion.div
                    style={{ x }}
                    className="flex items-center gap-6 md:gap-8 px-6 md:px-24 preserve-3d mt-20"
                >
                    {projects.map((project, i) => (
                        <ProjectCard3D
                            key={i}
                            project={project}
                            index={i}
                            velocityRotation={velocityRotation}
                            velocityZ={velocityZ}
                            techLabel={techLabel}
                        />
                    ))}
                </motion.div>

                {/* Scroll Progress indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
                    <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">Scroll</span>
                    <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-indigo-500 origin-left"
                            style={{ scaleX: scrollYProgress }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

// Individual 3D Card
function ProjectCard3D({
    project,
    index,
    velocityRotation,
    velocityZ,
    techLabel
}: {
    project: Project;
    index: number;
    velocityRotation: any;
    velocityZ: any;
    techLabel: string;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [showTech, setShowTech] = useState(false);

    // Calculate a staggered delay base on index for the wave effect
    // In a real implementation with useTransform on velocity, we can use a spring to 
    // add a slight delay based on position
    const springConfig = { damping: 20, stiffness: 200, mass: 1 + index * 0.1 };

    const staggeredRotation = useSpring(velocityRotation, springConfig);
    const staggeredZ = useSpring(velocityZ, springConfig);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setShowTech(false);
            }}
            className={`relative rounded-xl border transition-colors duration-500 bg-gray-900 overflow-hidden flex-shrink-0
                  ${isHovered ? 'border-indigo-500 shadow-2xl shadow-indigo-500/20 z-20' : 'border-white/10 z-10'}`}
            style={{
                rotateY: isHovered ? 0 : staggeredRotation,
                translateZ: isHovered ? 50 : staggeredZ,
                width: CARD_WIDTH,
                height: 550,
                transformStyle: "preserve-3d",
            }}
        >
            {/* Image Container */}
            <div className="relative h-64 w-full border-b border-white/10 overflow-hidden">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-60'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

                {/* View Links (appear on hover) */}
                <div className={`absolute top-4 right-4 flex gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:text-indigo-400 hover:bg-black border border-white/20 transition-all"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:text-indigo-400 hover:bg-black border border-white/20 transition-all"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col h-[calc(100%-16rem)] justify-between">
                <div>
                    <h3 className="text-3xl font-black tracking-tight text-white mb-3 font-mono">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 font-light text-sm line-clamp-3">
                        {project.description}
                    </p>
                </div>

                {/* Technologies FAB */}
                <div className="mt-6 relative">
                    <button
                        onClick={() => setShowTech(!showTech)}
                        className={`flex items-center gap-2 px-4 py-2 border transition-colors text-xs uppercase tracking-wider font-mono
                       ${showTech || isHovered
                                ? 'border-indigo-500/50 text-indigo-400 bg-indigo-500/10'
                                : 'border-white/10 text-gray-500 bg-gray-800/50'}`}
                    >
                        <Layers className="w-4 h-4" />
                        {techLabel}
                    </button>

                    {/* Tech stack popover */}
                    <AnimatePresence>
                        {(showTech || isHovered) && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="absolute bottom-full left-0 mb-3 w-full origin-bottom-left z-30"
                            >
                                <div className="bg-gray-950 border border-indigo-500/30 p-4 rounded-lg shadow-xl shadow-black">
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: {
                                                opacity: 1,
                                                transition: { staggerChildren: 0.05 }
                                            }
                                        }}
                                        className="flex flex-wrap gap-2"
                                    >
                                        {project.technologies.map((tech) => (
                                            <motion.span
                                                key={tech}
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0.5 },
                                                    visible: { opacity: 1, scale: 1 }
                                                }}
                                                className="px-2.5 py-1 bg-gray-900 border border-white/10 text-gray-300 text-[10px] uppercase font-mono tracking-wider"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

// Mobile specific card without 3D transforms for better performance and snapping
function MobileProjectCard({ project, techLabel }: { project: Project; techLabel: string }) {
    const [showTech, setShowTech] = useState(false);

    return (
        <div className="relative rounded-xl border border-white/10 transition-colors duration-500 bg-gray-900 overflow-hidden w-full h-[550px] flex flex-col shrink-0">
            {/* Image Container */}
            <div className="relative h-56 w-full border-b border-white/10 shrink-0">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

                {/* View Links */}
                <div className="absolute top-4 right-4 flex gap-2">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/60 shadow-lg backdrop-blur-md rounded-full text-white border border-white/20 active:scale-95 transition-transform"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/60 shadow-lg backdrop-blur-md rounded-full text-white border border-white/20 active:scale-95 transition-transform"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1 justify-between overflow-y-auto">
                <div>
                    <h3 className="text-2xl font-black tracking-tight text-white mb-2 font-mono">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 font-light text-sm line-clamp-4">
                        {project.description}
                    </p>
                </div>

                {/* Technologies */}
                <div className="mt-4 relative">
                    <button
                        onClick={() => setShowTech(!showTech)}
                        className={`flex w-full justify-center items-center gap-2 px-4 py-3 border transition-colors text-xs uppercase tracking-wider font-mono
                            ${showTech ? 'border-indigo-500/50 text-indigo-400 bg-indigo-500/10' : 'border-white/10 text-gray-400 bg-gray-800/50'}`}
                    >
                        <Layers className="w-4 h-4" />
                        {techLabel}
                    </button>

                    <AnimatePresence>
                        {showTech && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3"
                            >
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 bg-gray-800 text-gray-300 text-xs font-mono rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
