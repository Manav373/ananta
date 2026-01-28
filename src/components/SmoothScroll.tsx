
import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        const stopScroll = () => lenisRef.current?.stop();
        const startScroll = () => lenisRef.current?.start();

        window.addEventListener('lenis-stop', stopScroll);
        window.addEventListener('lenis-start', startScroll);

        return () => {
            lenisRef.current?.destroy();
            window.removeEventListener('lenis-stop', stopScroll);
            window.removeEventListener('lenis-start', startScroll);
        };
    }, []);

    return <div className="w-full min-h-screen">{children}</div>;
}
