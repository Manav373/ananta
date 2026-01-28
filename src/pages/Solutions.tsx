import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { siteContent } from '../data/content';
import { Landmark, ArrowUpRight } from 'lucide-react';
import ServiceModal, { iconMap } from '../components/ServiceModal';

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
    }
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};



export default function Solutions() {
    const [selectedService, setSelectedService] = useState<typeof siteContent.services[0] | null>(null);

    return (
        <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-blue-500/30">

            {/* --- ANIMATED BACKGROUND --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-[100px] animate-blob" />
                    <div className="absolute top-[20%] right-[-20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
                    <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
                </div>
                <div className="absolute inset-0 opacity-[0.1]" style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}></div>
            </div>

            <div className="relative z-10 pt-32">
                <section className="relative py-20 text-center container mx-auto px-6">
                    <motion.span
                        initial="hidden" animate="visible" variants={fadeInUp}
                        className="inline-block py-2 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-blue-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-glow"
                    >
                        Our Expertise
                    </motion.span>

                    {/* STAGGERED TITLE */}
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight max-w-4xl mx-auto drop-shadow-2xl flex flex-wrap justify-center gap-x-4"
                    >
                        <motion.span variants={wordVariants}>Solutions</motion.span>
                        <motion.span variants={wordVariants}>that</motion.span>
                        <span className="relative inline-flex overflow-hidden pb-2">
                            <motion.span
                                variants={wordVariants}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
                            >
                                Scale.
                            </motion.span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
                        className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        Comprehensive financial services designed to empower your business growth in the digital economy.
                    </motion.p>
                </section>

                <section className="py-20 pb-40">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {siteContent.services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setSelectedService(service)}
                                    className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-blue-500/40 transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-2"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                                            {iconMap[service.icon] || <Landmark className="w-8 h-8" />}
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">{service.title}</h3>
                                        <p className="text-slate-400 leading-relaxed mb-8 text-sm">
                                            {service.description}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                            <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">Explore Solution</span>
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all transform group-hover:rotate-45">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Service Details Modal */}
                <AnimatePresence>
                    {selectedService && (
                        <ServiceModal
                            service={selectedService}
                            onClose={() => setSelectedService(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
