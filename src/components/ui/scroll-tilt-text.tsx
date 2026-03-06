"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollTiltTextProps {
    children: React.ReactNode;
    className?: string;
    /** Initial rotation in degrees (tilted state) */
    startRotation?: number;
    /** Final rotation in degrees (aligned state) */
    endRotation?: number;
    /** Start X offset in pixels */
    startX?: number;
    /** How far before element enters viewport to start animating (0-1) */
    offsetStart?: number;
    /** How far into viewport to finish animating (0-1) */
    offsetEnd?: number;
}

export function ScrollTiltText({
    children,
    className,
    startRotation = -8,
    endRotation = 0,
    startX = -60,
    offsetStart = 0,
    offsetEnd = 0.6,
}: ScrollTiltTextProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`start ${1 - offsetStart}`, `start ${1 - offsetEnd}`],
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [startRotation, endRotation]);
    const x = useTransform(scrollYProgress, [0, 1], [startX, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 0.7, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

    return (
        <div ref={ref}>
            <motion.div
                style={{
                    rotate,
                    x,
                    opacity,
                    scale,
                    transformOrigin: "left center",
                }}
                className={cn("will-change-transform", className)}
            >
                {children}
            </motion.div>
        </div>
    );
}

export default ScrollTiltText;
