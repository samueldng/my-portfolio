"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
    label: string;
    value: string;
}

interface AnimatedTabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabClick: (value: string) => void;
    className?: string;
    tabClassName?: string;
    activeTabClassName?: string;
}

export function AnimatedTabs({
    tabs,
    activeTab,
    onTabClick,
    className,
    tabClassName,
    activeTabClassName,
}: AnimatedTabsProps) {
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);

    return (
        <div
            className={cn(
                "relative flex items-center space-x-1 rounded-full bg-gray-900/80 border border-white/10 p-1 backdrop-blur-md",
                className
            )}
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab.value;
                const isHovered = hoveredTab === tab.value;

                return (
                    <button
                        key={tab.value}
                        onClick={() => onTabClick(tab.value)}
                        onMouseEnter={() => setHoveredTab(tab.value)}
                        onMouseLeave={() => setHoveredTab(null)}
                        className={cn(
                            "relative z-10 px-4 py-2 text-sm font-mono tracking-widest uppercase transition-colors duration-200 cursor-pointer rounded-full",
                            isActive
                                ? "text-white"
                                : "text-gray-500 hover:text-gray-300",
                            tabClassName,
                            isActive && activeTabClassName
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="active-tab-pill"
                                className="absolute inset-0 bg-green-600/80 rounded-full"
                                style={{ zIndex: -1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                }}
                            />
                        )}
                        {!isActive && isHovered && (
                            <motion.div
                                layoutId="hover-tab-pill"
                                className="absolute inset-0 bg-white/5 rounded-full"
                                style={{ zIndex: -1 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default AnimatedTabs;

