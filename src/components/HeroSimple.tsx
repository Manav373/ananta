
import { motion } from 'framer-motion';
import heroVideo from '../assets/Video_Generation_of_Glass_Building.mp4';
import { ArrowRight } from 'lucide-react';

export default function HeroSimple({ onStart }: { onStart: () => void }) {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10" />
                <video
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-20 text-center max-w-5xl px-6">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mb-6 md:mb-8"
                >
                    <span className="py-2 px-4 md:px-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs md:text-sm font-medium text-accent-cyan tracking-wider uppercase">
                        The Future of Finance
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-black mb-6 md:mb-8 leading-none tracking-tighter text-white"
                >
                    ANANTAA
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-magenta">
                        CONSULTANCY
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-base sm:text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 md:mb-12 font-sans font-light tracking-wide"
                >
                    ARCHITECTING THE BRIDGE BETWEEN <span className="text-neon-cyan font-medium">TRADITION</span> AND THE <span className="text-neon-magenta font-medium">FUTURE</span>.
                </motion.p>

                <motion.button
                    onClick={onStart}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-3 md:px-10 md:py-4 bg-white text-black font-display font-bold rounded-full overflow-hidden text-base md:text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all"
                >
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-primary transition-colors">
                        START JOURNEY <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </motion.button>
            </div>
        </section>
    );
}
