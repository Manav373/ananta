import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isPointer, setIsPointer] = useState(false);


    // Spring configs
    const springConfigRing = { damping: 25, stiffness: 400, mass: 0.5 }; // Lagging ring
    const springConfigDot = { damping: 30, stiffness: 1000 }; // Snappy dot

    const cursorXRing = useSpring(cursorX, springConfigRing);
    const cursorYRing = useSpring(cursorY, springConfigRing);

    const cursorXDot = useSpring(cursorX, springConfigDot);
    const cursorYDot = useSpring(cursorY, springConfigDot);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            const target = e.target as HTMLElement;
            // More performant check than getComputedStyle
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer'; // Fallback

            setIsPointer(isClickable);


        };

        window.addEventListener('mousemove', moveCursor);
        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Lagging Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-exclusion"
                style={{
                    translateX: cursorXRing,
                    translateY: cursorYRing,
                    x: -16, // Center offset
                    y: -16, // Center offset
                }}
                animate={{
                    scale: isPointer ? 2.5 : 1,
                    opacity: isPointer ? 0.5 : 1,
                    backgroundColor: isPointer ? 'rgba(56, 189, 248, 0.1)' : 'transparent', // Light cyan tint on hover
                    borderColor: isPointer ? 'transparent' : 'rgba(56, 189, 248, 0.8)',
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Snappy Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-exclusion"
                style={{
                    translateX: cursorXDot,
                    translateY: cursorYDot,
                    x: -4, // Center offset
                    y: -4, // Center offset
                }}
                animate={{
                    scale: isPointer ? 0.5 : 1, // Shrink dot slightly on hover for focus
                }}
            />
        </>
    );
}
