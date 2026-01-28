
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Section3DProps {
    children: React.ReactNode;
    className?: string;
}

export default function Section3D({ children, className }: Section3DProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [40, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

    return (
        <div style={{ perspective: '1000px' }} className={className} ref={ref}>
            <motion.div
                style={{
                    rotateX,
                    scale,
                    opacity,
                    transformStyle: "preserve-3d"
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
