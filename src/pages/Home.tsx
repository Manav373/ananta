import whoWeAreVideo from '../assets/6561844-uhd_3840_2160_25fps.mp4';
import { useRef, useState, useEffect } from 'react';

import { motion, useMotionValue, useAnimationFrame, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowRight, TrendingUp, ShieldCheck, Smartphone, Globe, BadgeIndianRupee, ArrowUpRight, Plus, Minus, MoveRight, Loader2, Check } from 'lucide-react';

import { siteContent } from '../data/content';
import { Link } from 'react-router-dom';
import CommissionCalculator from '../components/CommissionCalculator';

import Section3D from '../components/ui/Section3D';
import Hero3D from '../components/Hero3D';
import ParallaxCard from '../components/ui/ParallaxCard';
import GetStartedWizard from '../components/GetStartedWizard';
import { InfiniteMovingCards } from '../components/ui/InfiniteMovingCards';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { TypewriterText } from '../components/ui/TypewriterText';

const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const viewportConfig = { once: false, amount: 0.2 };

// 3D Tilt Card Component replaced by ParallaxCard
const TiltCard = ParallaxCard;

// Swipeable Partners Carousel
function Marquee() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const [width, setWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (sliderRef.current) {
            // Calculate width of one set of items (half of total scrolling content)
            // We have 3 sets. 0 to -33% is the first set? 
            // Previous code had 4 sets. Let's stick to 4 sets for safety and seamless wrap.
            // Width of 1 set is TotalWidth / 4 ? 
            // The logic: We want to wrap when we've scrolled past the first "complete sequence".
            // If we have 4 sets: [S1][S2][S3][S4].
            // S1 matches S3? No, S1 matches S1.
            // We move from 0. Wrap when we hit end of S1? 
            // If we wrap at -S1_Width, we are at start of S2. S2 is identical to S1. So visually seamless.
            // So we need width of S1.
            // Total Scroll Width = 4 * S1_Width.
            // Loop point = ScrollWidth / 4. 
            // Measure:
            const totalWidth = sliderRef.current.scrollWidth;
            const singleSetWidth = totalWidth / 3; // We are rendering 3 sets below
            setWidth(singleSetWidth);
        }
    }, []);

    useAnimationFrame((_, delta) => {
        if (!isDragging && !isHovered && width > 0) {
            const moveBy = (delta / 1000) * 50; // Speed: 50px per second
            let newX = x.get() - moveBy;

            // Wrap logic: If we've scrolled past the first set, reset to 0
            // Since we are moving negative:
            if (newX <= -width) {
                newX += width;
            } else if (newX > 0) {
                newX -= width;
            }

            x.set(newX);
        }
    });

    return (
        <div className="relative overflow-hidden py-10 border-y border-white/5">
            <div className="container mx-auto px-6 text-center mb-10">
                <h3 className="text-3xl font-display font-bold text-white">Associate With</h3>
                <p className="text-slate-400 mt-2">We believe every client is a valuable, long-term partner.</p>
            </div>

            <div
                className="overflow-hidden cursor-grab active:cursor-grabbing px-6"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    ref={sliderRef}
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ right: 0, left: -(width * 2) }} // Allow dragging through 2 sets
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    className="flex items-center gap-8 w-max"
                >
                    {/* Render 3 copies for seamless looping */}
                    {[...siteContent.partners, ...siteContent.partners, ...siteContent.partners].map((partner, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center justify-center bg-white rounded-lg overflow-hidden opacity-100 hover:scale-105 transition-all duration-300 shadow-lg min-w-[200px] h-[100px] pointer-events-none"
                        >
                            {partner.logo && (
                                <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain p-4" />
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}



// FAQ Accordion Item
const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className="border-b border-white/10 last:border-none">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
            >
                <span className={`text-lg md:text-xl font-medium transition-colors ${isOpen ? 'text-primary' : 'text-white group-hover:text-primary-glow'}`}>
                    {question}
                </span>
                <span className={`p-2 rounded-full border transition-all ${isOpen ? 'bg-primary border-primary text-black' : 'border-white/20 text-white group-hover:border-primary'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-slate-400 leading-relaxed text-lg">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Home() {
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [activeIndustry, setActiveIndustry] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) return;

        setStatus('loading');

        try {
            // Use FormSubmit for free email handling
            const destinationEmail = "freecontent.me@gmail.com";

            const response = await fetch(`https://formsubmit.co/ajax/${destinationEmail}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: "New Newsletter Subscriber!",
                    email: email,
                    message: "A new user has subscribed to the newsletter.",
                    _template: "table"
                })
            });

            if (response.ok) {
                setStatus('success');
                setEmail("");
                // Reset to idle after 3 seconds
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
                console.error("Subscription failed:", await response.text());
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (error) {
            console.error("Subscription error:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    // Auto-rotate
    useEffect(() => {
        if (isHovering) return;
        const interval = setInterval(() => {
            setActiveIndustry((prev) => (prev + 1) % siteContent.industries.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [isHovering]);

    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
    const targetRef = useRef(null);

    const iconMap: any = {
        "ShieldCheck": <ShieldCheck className="w-10 h-10" />,
        "TrendingUp": <TrendingUp className="w-10 h-10" />,
        "Globe": <Globe className="w-10 h-10" />,
        "BadgeIndianRupee": <BadgeIndianRupee className="w-10 h-10" />,
        "Smartphone": <Smartphone className="w-10 h-10" />
    };

    return (
        <div className="flex flex-col w-full overflow-hidden" ref={targetRef}>
            {/* --- NEW 3D HERO --- */}
            <Hero3D onStart={() => setIsWizardOpen(true)} />

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 z-30"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-slate-500 to-transparent" />
            </motion.div>

            {/* --- STATS SECTION (New) --- */}
            <Section3D className="py-20 bg-slate-900 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    >
                        {siteContent.stats.map((stat, i) => (
                            <motion.div key={i} variants={fadeIn} className="text-center group">
                                <h3 className="text-5xl md:text-6xl font-display font-bold text-white mb-2 group-hover:text-primary-glow transition-colors duration-500">
                                    {stat.value}
                                </h3>
                                <p className="text-slate-400 text-lg uppercase tracking-widest">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Section3D>

            {/* --- PARTNERS MARQUEE --- */}
            <section className="bg-slate-900/50 py-20">
                <Marquee />
            </section>

            {/* --- WHO WE ARE (Refined) --- */}
            <Section3D className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative h-[600px] w-full order-2 lg:order-1">
                            <TiltCard className="w-full h-full">
                                <video
                                    src={whoWeAreVideo}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10 transition-all duration-700"
                                />
                            </TiltCard>
                        </div>
                        <div className="order-1 lg:order-2">
                            <span className="text-primary-glow font-bold tracking-widest uppercase text-sm mb-4 block">About Us</span>
                            <motion.h2
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportConfig}
                                variants={fadeIn}
                                className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight"
                            >
                                {siteContent.about.title}
                            </motion.h2>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportConfig}
                                variants={fadeIn}
                                className="space-y-6 text-slate-400 text-lg leading-relaxed"
                            >
                                <p className="font-medium text-white text-xl">{siteContent.about.header}</p>
                                <p>{siteContent.about.description}</p>
                                <p>{siteContent.about.description2}</p>
                            </motion.div>

                            <div className="mt-10">
                                <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
                                    Let's grow together <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Section3D>

            {/* --- PROCESS / HOW IT WORKS (New) --- */}
            <section className="py-24 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={fadeIn}
                        className="text-center mb-20"
                    >
                        <span className="text-primary-glow font-bold tracking-widest uppercase text-sm mb-4 block">Our Process</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Simple Steps to Success</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">We've streamlined the journey so you can focus on growth.</p>
                    </motion.div>

                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"
                            />
                        </div>

                        {siteContent.process && siteContent.process.map((step, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportConfig}
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: { y: 0, opacity: 1, transition: { delay: i * 0.2 } }
                                }}
                                className="relative z-10 flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-white/10 flex items-center justify-center text-3xl font-bold text-white mb-8 group-hover:border-primary group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-500 group-hover:from-primary group-hover:to-white">
                                        {step.step}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-slate-400 leading-relaxed max-w-xs mx-auto">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- COMMISSION CALCULATOR (New) --- */}
            <section className="py-20 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={fadeIn}
                        className="mb-12 text-center"
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Calculate Your Growth</h2>
                        <p className="text-slate-400">See how much you can earn by partnering with Ananta Fintech Services.</p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={fadeIn}
                    >
                        <CommissionCalculator />
                    </motion.div>
                </div>
            </section>

            {/* --- WHY CHOOSE US (New) --- */}
            <Section3D className="py-32 bg-slate-950 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={fadeIn}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Why Choose Ananta Fintech Services?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Unmatched advantages for your financial growth.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <SpotlightCard className="h-full" spotlightColor="rgba(37, 99, 235, 0.4)">
                            <div className="p-8 h-full flex flex-col relative z-20">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-6">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">Bank-Grade Security</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Top-tier encryption and compliance with RBI guidelines ensure complete safety.
                                </p>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="h-full" spotlightColor="rgba(37, 99, 235, 0.4)">
                            <div className="p-8 h-full flex flex-col relative z-20">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-6">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">Real-Time Tracking</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Monitor all transactions and commissions in real-time with our advanced dashboard.
                                </p>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="h-full" spotlightColor="rgba(37, 99, 235, 0.4)">
                            <div className="p-8 h-full flex flex-col relative z-20">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-6">
                                    <Smartphone className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">24/7 Expert Support</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Dedicated relationship managers available round-the-clock to resolve any queries.
                                </p>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </Section3D>

            {/* --- INDUSTRIES (Circular Mask + List) --- */}
            <section className="py-32 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern opacity-5" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <motion.h2
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportConfig}
                                variants={fadeIn}
                                className="text-5xl md:text-6xl font-display font-bold text-white mb-16"
                            >
                                Industries We Empower
                            </motion.h2>

                            <motion.ul
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportConfig}
                                variants={staggerContainer}
                                className="space-y-6"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                {siteContent.industries.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        variants={fadeIn}
                                        onMouseEnter={() => setActiveIndustry(i)}
                                        className="group relative pl-8 py-4 cursor-pointer"
                                    >
                                        {/* Active Indicator Line */}
                                        <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-full w-[2px] transition-all duration-300 ${activeIndustry === i ? 'bg-primary h-full' : 'bg-slate-800 h-0 group-hover:h-1/2'}`} />

                                        <div className="flex items-center justify-between">
                                            <span className={`text-2xl md:text-3xl font-medium transition-all duration-300 ${activeIndustry === i ? 'text-white translate-x-4' : 'text-slate-500 group-hover:text-slate-300'}`}>
                                                {typeof item === 'string' ? item : item.name}
                                            </span>
                                            <ArrowRight className={`w-6 h-6 text-primary opacity-0 -translate-x-4 transition-all duration-300 ${activeIndustry === i ? 'opacity-100 translate-x-0' : ''}`} />
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>

                        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeIndustry}
                                    src={(siteContent.industries[activeIndustry] as any)?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"}
                                    alt="Industry"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";
                                    }}
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-10">
                                <span className="text-primary font-bold tracking-widest uppercase mb-2 block">Industry Focus</span>
                                <h3 className="text-3xl text-white font-bold">{typeof siteContent.industries[activeIndustry] === 'string' ? siteContent.industries[activeIndustry] : (siteContent.industries[activeIndustry] as any).name}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- DETAILED SOLUTIONS GRID --- */}
            <section className="py-32 bg-surfaceHighlight/20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Explore Our Solutions</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Tailored strategies and infrastructure to drive your financial growth.
                        </p>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {siteContent.detailedSolutions.map((solution, i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                className={`h-full ${i === siteContent.detailedSolutions.length - 1 ? 'md:col-span-2' : ''}`}
                            >
                                <SpotlightCard
                                    className="group h-full"
                                    spotlightColor="rgba(37, 99, 235, 0.4)"
                                >
                                    <Link to="/solutions" className="block h-full w-full">
                                        <div
                                            className="h-full p-6 md:p-10 flex flex-col relative z-10"
                                        >
                                            <div className="absolute top-0 right-0 p-6 md:p-10 opacity-20 group-hover:opacity-40 transition-opacity transform group-hover:scale-110 duration-700 text-blue-600/50">
                                                {iconMap[solution.icon]}
                                            </div>

                                            <h3 className="text-3xl font-display font-bold text-white mb-6 italic tracking-wider">{solution.title}</h3>
                                            <p className="text-slate-300 leading-relaxed text-lg mb-8 font-light flex-grow">
                                                {solution.description}
                                            </p>

                                            {/* Learn More Footer */}
                                            <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-auto">
                                                <span className="text-sm font-bold text-blue-500 group-hover:text-white transition-colors uppercase tracking-widest">Learn more</span>
                                                <div className="w-10 h-10 rounded-full border border-blue-500/30 flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                                                    <ArrowUpRight className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- TESTIMONIALS (The Perfect Customer Experience) --- */}
            <section className="py-32 relative bg-gradient-to-b from-primary/10 to-transparent">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={fadeIn}
                        className="text-4xl md:text-6xl font-display font-bold text-center text-white mb-20"
                    >
                        The Perfect Customer Experience
                    </motion.h2>
                    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                        <InfiniteMovingCards
                            items={siteContent.testimonials.map(t => ({
                                quote: t.content,
                                name: t.name,
                                title: t.role,
                            }))}
                            direction="right"
                            speed="slow"
                        />
                    </div>
                </div>
            </section>

            {/* --- INSIGHTS / BLOG --- */}
            <section className="py-32 relative bg-slate-950">
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={fadeIn}
                        className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
                    >
                        Stay Ahead With Expert Knowledge
                    </motion.h2>
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={fadeIn}
                        className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg"
                    >
                        {siteContent.insights.subtitle}
                    </motion.p>

                    <div className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-sm p-12 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10 w-full max-w-md mx-auto">
                            <span className="inline-block p-4 rounded-full bg-white/10 mb-6 text-primary">
                                <TrendingUp className="w-8 h-8" />
                            </span>
                            <h3 className="text-3xl font-display text-white mb-4">Join 5,000+ Subscribers</h3>
                            <p className="text-slate-400 mb-8">Get exclusive fintech strategies and regulatory updates delivered to your inbox.</p>

                            <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    disabled={status === 'loading' || status === 'success'}
                                    className="flex-1 px-6 py-4 rounded-full bg-black/50 border border-white/20 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                                />
                                <button
                                    disabled={status === 'loading' || status === 'success'}
                                    className={`px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 min-w-[160px]
                                        ${status === 'success' ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-primary'}
                                        disabled:opacity-80
                                    `}
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : status === 'success' ? (
                                        <>Subscribed <Check className="w-5 h-5" /></>
                                    ) : (
                                        <>Subscribe <MoveRight className="w-4 h-4" /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="mt-16">
                        <Link to="/about" className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                            Our Insights <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>



            {/* --- FAQ SECTION (New) --- */}
            <section className="py-24 bg-slate-950 relative border-t border-white/5">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={fadeIn}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Frequently Asked Questions</h2>
                    </motion.div>

                    <div className="space-y-2">
                        {siteContent.faq && siteContent.faq.map((faq, i) => (
                            <FAQItem
                                key={i}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openFaqIndex === i}
                                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA --- */}
            <section className="py-40 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-primary/10" />
                <div className="absolute inset-0 bg-hero-glow blur-[150px] opacity-30 animate-pulse-slow" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="mb-10 text-center"
                    >
                        <TypewriterText
                            text={siteContent.cta.title}
                            className="text-5xl md:text-8xl font-display font-bold text-white tracking-tight inline-block"
                        />
                    </motion.div>
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={fadeIn}
                        className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto"
                    >
                        {siteContent.cta.subtitle}
                    </motion.p>
                    <Link to={siteContent.cta.link} className="inline-block relative group">
                        <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-primary blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <button className="relative px-12 py-6 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform duration-300">
                            {siteContent.cta.buttonText}
                        </button>
                    </Link>
                </div>
            </section>

            <GetStartedWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
        </div>
    );
};
