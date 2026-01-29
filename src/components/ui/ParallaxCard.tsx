import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ParallaxCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function ParallaxCard({ children, className = "" }: ParallaxCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // Optimization: Disable 3D tilt on mobile/tablet
        if (window.innerWidth < 1024) return;

        const rect = ref.current!.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-all duration-200 ease-linear ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl" />
        </motion.div>
    );
}
