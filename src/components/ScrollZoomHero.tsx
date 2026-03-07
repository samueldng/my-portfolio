'use client';

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollZoomHeroProps {
    children: ReactNode;
}

export default function ScrollZoomHero({ children }: ScrollZoomHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress within the hero container
    // Start tracking when the top of the container hits the top of the viewport
    // End tracking when the bottom of the container hits the top of the viewport
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Calculate values based on scroll progress (0 to 1)
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

    return (
        <div ref={containerRef} className="relative w-full h-[150vh] bg-gray-950">
            {/* Sticky container that stays in view while we scroll through the 150vh height */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <motion.div
                    style={{
                        scale,
                        opacity,
                        filter: blur,
                    }}
                    className="w-full h-full transform-origin-center"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
