
import { useState, useEffect } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { siteContent } from '../data/content';
import { CheckCircle, Award, TrendingUp, Users, Linkedin, Mail } from 'lucide-react';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function About() {
    const [step, setStep] = useState(0);
    const valuesList = siteContent.about.values.list;
    const totalValues = valuesList.length;
    const activeIndex = step % totalValues;

    // Auto-rotate steps
    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => prev + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pt-32 min-h-screen bg-background text-white">
            {/* Header */}
            <section className="relative pb-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[128px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="max-w-4xl"
                    >
                        <span className="text-primary-glow font-bold tracking-widest uppercase text-sm mb-4 block">About Us</span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                            Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Financial Future</span>.
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                            We are not just consultants; we are strategic partners committed to bridging the gap between complex financial systems and end-users.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            className="relative group"
                        >
                            {/* Card Background with Glassmorphism */}
                            <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm transition-all duration-500 group-hover:bg-white/10 group-hover:border-primary/30">

                                {/* Image Container */}
                                <div className="relative mb-8 overflow-hidden rounded-2xl aspect-[4/5]">
                                    {/* Floating Founder Label */}
                                    <div className="absolute top-8 left-8 z-30 flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(79,70,229,0.8)] z-10 relative" />
                                            <div className="absolute inset-0 rounded-full bg-primary/50 animate-ping" />
                                        </div>
                                        <span className="text-white/90 text-sm font-bold tracking-[0.2em] uppercase font-display backdrop-blur-md bg-black/30 px-3 py-1 rounded-full border border-white/10">Founder</span>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 z-10" />
                                    <img
                                        src={siteContent.about.founder.image}
                                        alt={siteContent.about.founder.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Founder Tag */}
                                    <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                        <Award className="w-3 h-3 text-primary-glow" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-white">Founder</span>
                                    </div>
                                </div>

                                {/* Founder Details */}
                                <div>
                                    <h3 className="text-3xl font-display font-bold text-white mb-1">
                                        {siteContent.about.founder.name}
                                    </h3>
                                    <p className="text-primary-glow font-medium uppercase tracking-widest text-sm mb-6">
                                        {siteContent.about.founder.role}
                                    </p>

                                    <p className="text-slate-300 italic leading-relaxed mb-8 border-l-2 border-primary/50 pl-4">
                                        "{siteContent.about.founder.bio}"
                                    </p>

                                    {/* Social Links */}
                                    <div className="flex gap-4">
                                        <a href={siteContent.about.founder.socials.linkedin} className="p-3 rounded-full bg-white/5 text-slate-400 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a href={siteContent.about.founder.socials.email} className="p-3 rounded-full bg-white/5 text-slate-400 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                                            <Mail className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            className="space-y-12"
                        >
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-6">Who We Are</h2>
                                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                    {siteContent.about.description}
                                </p>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Founded in 2024, Anantaa Consultancy has rapidly evolved into a premier fintech distribution powerhouse. We specialize in providing robust infrastructure for KIOSK banking, enabling financial inclusion in underserved areas.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    "Proven Track Record",
                                    "Expert Consultation",
                                    "24/7 Support",
                                    "Innovative Tech"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-glow group-hover:bg-primary group-hover:text-white transition-all">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                        <span className="text-slate-300 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- OUR VALUES (Rotating Bubble) --- */}
            <section className="py-32 bg-slate-950 relative overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        {/* Left: Text Description */}
                        <div>
                            <motion.h2
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false }}
                                variants={fadeInUp}
                                className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
                            >
                                {siteContent.about.values.title}
                            </motion.h2>
                            <motion.p
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false }}
                                variants={fadeInUp}
                                className="text-slate-400 text-lg leading-relaxed mb-12"
                            >
                                {siteContent.about.values.description}
                            </motion.p>

                            {/* Value Description (Dynamic) */}
                            <div className="h-24">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-2xl text-primary-glow font-light italic"
                                    >
                                        "{valuesList[activeIndex]} is at the core of everything we do."
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Right: Planetary Ring Visualization */}
                        <div className="relative h-[600px] flex items-center justify-center -mr-20 lg:-mr-32">

                            {/* Main Ring Container */}
                            <div className="relative w-[500px] h-[500px] flex items-center justify-center">

                                {/* Trail Ring Layer */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 1 }}
                                    className="relative w-full h-full flex items-center justify-center"
                                >
                                    {/* Static Orbit Ring */}
                                    <div className="absolute inset-0 rounded-full border border-white/5" />

                                    {/* Inner Decorative Ring */}
                                    <div className="absolute inset-12 rounded-full border border-white/5 border-dashed opacity-30" />

                                    {/* Active Rotating Trail */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 rounded-full"
                                    >
                                        <div
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                background: 'conic-gradient(from 0deg, transparent 0%, transparent 60%, rgba(56, 189, 248, 0.1) 80%, rgba(255, 255, 255, 0.8) 100%)',
                                                maskImage: 'radial-gradient(transparent 68%, black 69%, black 71%, transparent 72%)',
                                                WebkitMaskImage: 'radial-gradient(transparent 68%, black 69%, black 71%, transparent 72%)'
                                            }}
                                        />
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[1px] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
                                    </motion.div>

                                    {/* Central Core Glow */}
                                    <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full" />
                                    <div className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-primary/20 to-transparent blur-xl" />
                                </motion.div>

                                {/* Planetary Values (Distributed around circle) */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {valuesList.map((value, i) => {
                                        const isActive = i === activeIndex;

                                        // Distribute in a circle starting from -90deg (Top)
                                        const angleDeg = (360 / totalValues) * i - 90;
                                        const radian = (angleDeg * Math.PI) / 180;
                                        const radius = 250; // On the border of the 500px ring

                                        const x = Math.cos(radian) * radius;
                                        const y = Math.sin(radian) * radius;

                                        // Determine Text Alignment relative to center
                                        const isRight = x > 10;
                                        const isLeft = x < -10;
                                        const alignClass = isRight ? "text-left items-start flex-row" : (isLeft ? "text-right items-end flex-row-reverse" : "text-center items-center flex-col");

                                        // Offset text further outward for clear "outer" placement
                                        const textX = Math.cos(radian) * (radius + 60);
                                        const textY = Math.sin(radian) * (radius + 60);

                                        return (
                                            <div key={i}>
                                                {/* Cursor-Style Dot on Ring */}
                                                <motion.div
                                                    className="absolute top-1/2 left-1/2 z-10 flex items-center justify-center"
                                                    style={{
                                                        x,
                                                        y,
                                                        translateX: "-50%",
                                                        translateY: "-50%"
                                                    }}
                                                >
                                                    {/* Outer Ring Effect (Like Cursor) */}
                                                    <motion.div
                                                        animate={{
                                                            scale: isActive ? 1.5 : 0,
                                                            opacity: isActive ? 1 : 0
                                                        }}
                                                        className="absolute w-8 h-8 rounded-full border border-primary/50"
                                                    />

                                                    {/* Central Dot */}
                                                    <motion.div
                                                        animate={{
                                                            scale: isActive ? 1 : 0.8,
                                                            backgroundColor: isActive ? "#38bdf8" : "#94a3b8"
                                                        }}
                                                        className="w-2 h-2 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                                                    />
                                                </motion.div>

                                                {/* Label */}
                                                <motion.div
                                                    className={`absolute top-1/2 left-1/2 flex gap-4 ${alignClass}`}
                                                    style={{
                                                        x: textX,
                                                        y: textY,
                                                        translateX: "-50%",
                                                        translateY: "-50%"
                                                    }}
                                                    animate={{ opacity: isActive ? 1 : 0.3, scale: isActive ? 1.1 : 1 }}
                                                >
                                                    <span className={`text-xl font-display tracking-wider whitespace-nowrap ${isActive ? 'text-white font-bold text-shadow-glow' : 'text-slate-500'}`}>
                                                        {value}
                                                    </span>
                                                </motion.div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-surfaceHighlight/30 skew-y-3 scale-110" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {siteContent.stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.2 }}
                                className="text-center group"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 mb-6 group-hover:bg-primary/20 transition-all duration-500">
                                    {index === 0 && <Award className="w-10 h-10 text-white" />}
                                    {index === 1 && <Users className="w-10 h-10 text-white" />}
                                    {index === 2 && <TrendingUp className="w-10 h-10 text-white" />}
                                </div>
                                <div className="text-6xl font-display font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-primary-glow font-medium tracking-widest uppercase text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
