
import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import heroVideo from '../assets/Video_Generation_of_Glass_Building.mp4';
import { ArrowRight } from 'lucide-react';

export default function Hero3D({ onStart }: { onStart: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig); // Reduced intensity
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig); // Reduced intensity

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        // Optimization: Disable parallax calculation on mobile/tablet
        if (window.innerWidth < 1024) return;

        const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    }

    return (
        <section
            ref={ref}
            onMouseMove={handleMouseMove}
            style={{ perspective: 1000 }}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950"
        >
            {/* Background Video Layer */}
            <motion.div
                style={{ y, scale, opacity }}
                className="absolute inset-0 z-0"
            >
                {/* Lighter overlay to show more video details */}
                <div className="absolute inset-0 bg-slate-950/30 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30 z-10" />
                <video
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-100"
                />
            </motion.div>

            {/* 3D Content Layer (Just CSS 3D now, no WebGL) */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    z: 100
                }}
                className="relative z-20 text-center max-w-5xl px-6"
            >
                {/* Floating Elements (simulated depth) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} // Changed z to y for simpler fade up
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mb-8"
                >
                    <span className="py-2 px-6 rounded-full bg-blue-900/40 border border-blue-500/30 backdrop-blur-md text-sm font-semibold text-blue-200 tracking-widest uppercase">
                        Ananta Fintech Services
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    style={{ transform: "translateZ(50px)" }}
                    className="text-5xl md:text-8xl font-display font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-xl"
                >
                    Ananta
                    <span className="block text-blue-500">
                        Fintech Services
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    style={{ transform: "translateZ(20px)" }}
                    className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                >
                    ARCHITECTING THE BRIDGE BETWEEN <span className="text-white font-bold">TRADITION</span> AND THE <span className="text-blue-400 font-bold">FUTURE</span>.
                </motion.p>

                <motion.button
                    onClick={onStart}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ transform: "translateZ(80px)" }}
                    className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-blue-600/50 transition-all flex items-center gap-3 mx-auto"
                >
                    START JOURNEY
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </motion.div>
        </section>
    );
}
