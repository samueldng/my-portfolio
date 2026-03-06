"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";

// Dynamic import for the shader to avoid SSR issues
let LiquidMetalShader: any = null;
if (typeof window !== 'undefined') {
    import("@paper-design/shaders-react").then((mod) => {
        LiquidMetalShader = mod.LiquidMetal;
    });
}

export interface LiquidMetalProps {
    colorBack?: string;
    colorTint?: string;
    speed?: number;
    repetition?: number;
    distortion?: number;
    scale?: number;
    className?: string;
    style?: React.CSSProperties;
}

export const LiquidMetal = memo(function LiquidMetal({
    colorBack = "#aaaaac",
    colorTint = "#ffffff",
    speed = 0.5,
    repetition = 4,
    distortion = 0.1,
    scale = 1,
    className,
    style,
}: LiquidMetalProps) {
    const [ShaderComponent, setShaderComponent] = React.useState<any>(null);

    React.useEffect(() => {
        import("@paper-design/shaders-react").then((mod) => {
            setShaderComponent(() => mod.LiquidMetal);
        });
    }, []);

    if (!ShaderComponent) return null;

    return (
        <div
            className={cn("absolute inset-0 z-0 overflow-hidden", className)}
            style={style}
        >
            <ShaderComponent
                colorBack={colorBack}
                colorTint={colorTint}
                speed={speed}
                repetition={repetition}
                distortion={distortion}
                softness={0}
                shiftRed={0.3}
                shiftBlue={-0.3}
                angle={45}
                shape="none"
                scale={scale}
                fit="cover"
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
});

LiquidMetal.displayName = "LiquidMetal";

export default LiquidMetal;
