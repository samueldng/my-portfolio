'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, animate, useMotionValue, useMotionTemplate } from 'framer-motion';

export default function LoadingOverlay() {
    const [isComplete, setIsComplete] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Progress value from 0 to 100
    const progress = useMotionValue(0);

    // Spring physics for smooth animation
    const springProgress = useSpring(progress, {
        damping: 30,
        stiffness: 100,
        restDelta: 0.001
    });

    // Phase 1: Vertical line extending (0% to 50% progress)
    // Maps to top/bottom coordinates of the polygon
    const yRange = useTransform(springProgress, [0, 50], [50, 0]);

    // Phase 2: Horizontal expansion (50% to 100% progress)
    // Maps to left/right coordinates of the polygon
    const xRange = useTransform(springProgress, [50, 100], [49.8, 0]);

    // Compose the clip path using Motion template string
    const clipPath = useMotionTemplate`polygon(${xRange}% ${yRange}%, calc(100% - ${xRange}%) ${yRange}%, calc(100% - ${xRange}%) calc(100% - ${yRange}%), ${xRange}% calc(100% - ${yRange}%))`;

    useEffect(() => {
        // Disable scrolling while loading
        document.body.style.overflow = 'hidden';

        // Start animation sequence
        const sequence = async () => {
            // Small delay before starting
            await new Promise(resolve => setTimeout(resolve, 300));

            // Phase 1: Draw vertical line
            await animate(progress, 50, {
                duration: 1,
                ease: "easeInOut"
            });

            // Small pause before expansion
            await new Promise(resolve => setTimeout(resolve, 200));

            // Phase 2: Expand horizontally
            await animate(progress, 100, {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1] // Custom easing for snappy expansion
            });

            setIsComplete(true);

            // Enable scrolling again
            document.body.style.overflow = '';

            // Remove overlay after content is visible
            setTimeout(() => {
                setIsVisible(false);
            }, 500);
        };

        sequence();

        return () => {
            document.body.style.overflow = '';
        };
    }, [progress]);

    const textOpacity = useTransform(springProgress, [40, 50], [1, 0]);
    const lineOpacity = useTransform(springProgress, [50, 70], [1, 0]);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
            style={{ opacity: isComplete ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}
        >
            {/* Dark background before reveal */}
            <div className="absolute inset-0 bg-gray-950">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                    {/* We hide the text when the line starts expanding horizontally */}
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="text-white/50 tracking-[0.3em] font-mono text-xs font-bold"
                    >
                        INICIALIZANDO<span className="animate-pulse">_</span>
                    </motion.div>
                </div>
            </div>

            {/* The animated clip-path container */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-400 to-green-500 opacity-20"
                style={{ clipPath }}
            />

            {/* The visible thin line before horizontal expansion */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-transparent via-green-400 to-transparent"
                style={{
                    clipPath,
                    opacity: lineOpacity // Fades out as it expands
                }}
            />
        </div>
    );
}

