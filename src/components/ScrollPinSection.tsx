'use client';

import { useRef, ReactNode, Children } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollPinSectionProps {
    children: ReactNode;
    itemCount: number;
    scrollMultiplier?: number;
}

/**
 * Individual slide that fades in based on scroll progress.
 * Extracted as a separate component so useTransform hooks are at the top level.
 */
function RevealSlide({
    child,
    scrollYProgress,
    start,
    slideRange,
    isLast,
    zIndex,
}: {
    child: ReactNode;
    scrollYProgress: MotionValue<number>;
    start: number;
    slideRange: number;
    isLast: boolean;
    zIndex: number;
}) {
    const mid = start + slideRange * 0.3;
    const fadeOutStart = start + slideRange * 0.85;
    const end = start + slideRange;

    const opacity = useTransform(
        scrollYProgress,
        isLast
            ? [start, mid, 1]
            : [start, mid, fadeOutStart, end],
        isLast
            ? [0, 1, 1]
            : [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [start, mid],
        [80, 0]
    );

    const scale = useTransform(
        scrollYProgress,
        [start, mid],
        [0.92, 1]
    );

    return (
        <motion.div
            style={{ opacity, y, scale, zIndex }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            <div className="pointer-events-auto w-full h-full flex items-center justify-center">
                {child}
            </div>
        </motion.div>
    );
}

export default function ScrollPinSection({ children, itemCount }: ScrollPinSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Title moves up as we start scrolling
    const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);

    const childrenArray = Children.toArray(children);

    // Title occupies 0 â†’ 0.2 of scroll progress
    // Content slides share the range 0.2 â†’ 0.95 (leave 5% breathing room at end)
    const contentSlides = childrenArray.slice(1);
    const slideRange = contentSlides.length > 0 ? 0.75 / contentSlides.length : 0;

    return (
        <section
            ref={containerRef}
            // Each content item gets ~150vh of scroll distance, plus title area
            style={{ height: `${itemCount * 150}vh` }}
            className="relative"
        >
            <div className="sticky top-0 h-screen overflow-hidden bg-gray-950">
                {/* Title slide (first child) â€” starts visible, moves up and fades */}
                {childrenArray[0] && (
                    <motion.div
                        style={{ y: titleY, opacity: titleOpacity, zIndex: 10 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {childrenArray[0]}
                    </motion.div>
                )}

                {/* Content slides â€” each fades in during its scroll segment */}
                {contentSlides.map((child, i) => (
                    <RevealSlide
                        key={i}
                        child={child}
                        scrollYProgress={scrollYProgress}
                        start={0.2 + i * slideRange}
                        slideRange={slideRange}
                        isLast={i === contentSlides.length - 1}
                        zIndex={20 + i}
                    />
                ))}

                {/* Scroll progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 z-50">
                    <motion.div
                        className="h-full bg-green-500 origin-left"
                        style={{ scaleX: scrollYProgress }}
                    />
                </div>
            </div>
        </section>
    );
}

