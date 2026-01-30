
import { motion, type Variants } from 'framer-motion';
import { siteContent } from '../data/content';
import { Award, Linkedin, Mail, Calendar, Shield, Globe, Zap, Instagram, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Staggered Blur Effect Variants
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
    hidden: {
        opacity: 0,
        y: 20,
        filter: 'blur(10px)'
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9] // Custom elegant easing
        }
    }
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const timelineData = [
    { year: "2023", title: "Inception", description: "Ananta Fintech Services was born with a vision to bridge the gap between traditional banking and the unbanked sector." },
    { year: "2024", title: "Market Penetration", description: "Established a robust network of 100+ CSPs across Tier-2 cities, generating over ₹50M in transaction volume." },
    { year: "2025", title: "Digital Expansion", description: " Launching our proprietary digital platform and expanding services to include deeper financial advisory." },
    { year: "Future", title: "National Dominance", description: "Aiming for a pan-India presence, empowering 10,000+ micro-entrepreneurs." }
];

const features = [
    { icon: Shield, title: "Unwavering Trust", desc: "SEBI compliant processes and transparent reporting." },
    { icon: Zap, title: "Rapid Execution", desc: "Setting up KIOSK banking points in record time." },
    { icon: Globe, title: "Deep Reach", desc: "Penetrating the most remote corners of the market." }
];

export default function About() {
    return (
        <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-blue-500/30">

            {/* Optimized CSS Background Animation (REMOVED JS PARTICLES) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[80px] animate-blob" />
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[80px] animate-blob animation-delay-2000" />
                    <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[80px] animate-blob animation-delay-4000" />
                </div>
                <div className="absolute inset-0 opacity-[0.15]" style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}></div>
            </div>

            <div className="relative z-10 pt-20">
                {/* --- HERO SECTION --- */}
                <section className="relative py-24 lg:py-32">
                    <div className="container mx-auto px-6 text-center">
                        <motion.span
                            initial="hidden" animate="visible" variants={fadeInUp}
                            className="inline-block py-2 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-blue-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-glow"
                        >
                            Who We Are
                        </motion.span>

                        {/* STAGGERED BLUR REVEAL TITLE */}
                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight max-w-5xl mx-auto drop-shadow-2xl flex flex-wrap justify-center gap-x-4 gap-y-2"
                        >
                            <motion.span variants={wordVariants}>Architecting</motion.span>
                            <motion.span variants={wordVariants}>the</motion.span>
                            <span className="relative inline-flex overflow-hidden">
                                <motion.span
                                    variants={wordVariants}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 pb-2"
                                >
                                    Financial Future
                                </motion.span>
                            </span>
                            <motion.span variants={wordVariants}>of</motion.span>
                            <motion.span variants={wordVariants}>India.</motion.span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
                            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                        >
                            We are more than consultants. We are the architects of financial inclusion, building the infrastructure that powers the next billion transactions.
                        </motion.p>
                    </div>
                </section>

                {/* --- MISSION STATEMENT --- */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-display font-bold text-white">Bridging the Gap</h2>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    {siteContent.about.description}
                                </p>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Our mission is simple but ambitious: to make banking accessible to every citizen, regardless of their location. By empowering local entrepreneurs to become Customer Service Points (CSPs), we create a decentralized banking network that serves the community at the grassroots level.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                                className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
                            >
                                <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"
                                    alt="Modern Corporate Architecture"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* --- TIMELINE SECTION --- */}
                <section className="py-24 relative">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
                            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full shadow-[0_0_10px_#3b82f6]" />
                        </div>

                        <div className="space-y-12 relative">
                            {/* Connecting Line */}
                            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

                            {timelineData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* GLASS CARD */}
                                    <div className="ml-12 md:ml-0 md:w-1/2 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 shadow-lg group">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Calendar className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                            <span className="text-blue-400 font-bold tracking-widest text-sm shadow-blue-500/50 drop-shadow-sm">{item.year}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">{item.title}</h3>
                                        <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                                    </div>

                                    {/* Center Dot */}
                                    <div className="absolute left-[20px] md:left-1/2 top-8 -translate-x-1/2 w-4 h-4 bg-slate-950 border-4 border-blue-500 rounded-full z-10 shadow-[0_0_15px_#3b82f6]" />

                                    {/* Empty Spacer */}
                                    <div className="hidden md:block md:w-1/2" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- FOUNDER SECTION (GLASS) --- */}
                <section className="py-24">
                    <div className="container mx-auto px-6">
                        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative hover:border-blue-500/20 transition-colors duration-500">
                            {/* Founder Background Glow */}
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="relative h-[400px] md:h-full group overflow-hidden first:rounded-t-3xl md:first:rounded-l-3xl md:first:rounded-tr-none">
                                    <img
                                        src={siteContent.about.founder.image}
                                        alt={siteContent.about.founder.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-90" />
                                    <div className="absolute bottom-8 left-8">
                                        <h3 className="text-3xl font-bold text-white mb-1">{siteContent.about.founder.name}</h3>
                                        <p className="text-blue-400 font-medium tracking-wide">{siteContent.about.founder.role}</p>
                                    </div>
                                </div>
                                <div className="p-10 md:p-16 flex flex-col justify-center relative z-10">
                                    <Award className="w-12 h-12 text-blue-500 mb-8 drop-shadow-lg" />
                                    <h3 className="text-2xl font-display font-bold text-white mb-6">Leadership Vision</h3>
                                    <p className="text-slate-300 leading-relaxed italic mb-10 border-l-4 border-blue-500 pl-6 py-2">
                                        "{siteContent.about.founder.bio}"
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <a href={siteContent.about.founder.socials.linkedin} className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transform hover:-translate-y-1">
                                            <Linkedin className="w-5 h-5" /> Connect
                                        </a>
                                        <a href={siteContent.about.founder.socials.instagram} className="flex items-center gap-2 px-5 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl text-white font-medium transition-all shadow-lg shadow-pink-600/20 hover:shadow-pink-600/40 transform hover:-translate-y-1">
                                            <Instagram className="w-5 h-5" /> Instagram
                                        </a>
                                        <a href={siteContent.about.founder.socials.email} className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all transform hover:-translate-y-1">
                                            <Mail className="w-5 h-5" /> Contact
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- WHY US (GLASS CARDS) --- */}
                <section className="py-24 pb-32">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Why Partner With Us?</h2>
                            <p className="text-slate-400">The Ananta Fintech Services Advantage</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {features.map((feat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-blue-500/40 transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="w-14 h-14 rounded-2xl bg-blue-900/40 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:text-white group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300 mb-8 relative z-10 shadow-lg">
                                        <feat.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{feat.title}</h3>
                                    <p className="text-slate-400 leading-relaxed relative z-10">{feat.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- HEADQUARTERS SECTION (New) --- */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-900/5" />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 text-center shadow-2xl group hover:border-blue-500/30 transition-all duration-500">

                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 group-hover:scale-110 transition-transform duration-300">
                                <MapPin className="w-10 h-10 text-blue-400" />
                            </div>

                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Our Headquarters</h2>

                            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                                {siteContent.brand.contact.address}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <a
                                    href={siteContent.brand.contact.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/25 flex items-center gap-3 group/btn"
                                >
                                    Get Directions <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                                <Link
                                    to="/contact"
                                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all flex items-center gap-3"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    );
}
