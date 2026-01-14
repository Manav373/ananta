import heroVideo from '../assets/Video_Generation_of_Glass_Building.mp4';
import whoWeAreVideo from '../assets/6561844-uhd_3840_2160_25fps.mp4';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame, type Variants } from 'framer-motion';
import { ArrowRight, TrendingUp, ShieldCheck, Smartphone, Globe, BadgeIndianRupee, ArrowUpRight } from 'lucide-react';
import { siteContent } from '../data/content';
import { Link } from 'react-router-dom';

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

// 3D Tilt Card Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            <div style={{ transform: "translateZ(20px)" }}>{children}</div>
        </motion.div>
    );
}

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

// Floating 3D Particles
function FloatingParticles() {
    // Generate static random data to avoid re-renders impacting performance
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-white/20 blur-[1px]"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay
                    }}
                />
            ))}
        </div>
    );
}




// Seamless Loop Video Component
function SeamlessLoopVideo({ src, className }: { src: string; className?: string }) {
    const parentRef = useRef<HTMLDivElement>(null);
    const video1Ref = useRef<HTMLVideoElement>(null);
    const video2Ref = useRef<HTMLVideoElement>(null);
    const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const playVideo = (video: HTMLVideoElement) => {
        video.play().catch(error => {
            console.log("Video play failed:", error);
        });
    };

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        const timeLeft = video.duration - video.currentTime;
        const transitionTime = 1; // 1 second overlap

        if (timeLeft <= transitionTime && !isTransitioning) {
            setIsTransitioning(true);
            const nextVideo = activeVideo === 1 ? video2Ref.current : video1Ref.current;

            if (nextVideo) {
                nextVideo.currentTime = 0;
                playVideo(nextVideo);
                setActiveVideo(activeVideo === 1 ? 2 : 1);
            }
        }
    };

    // Ensure initial video plays
    useEffect(() => {
        if (video1Ref.current) {
            playVideo(video1Ref.current);
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsTransitioning(false);
        }, 1200);
        return () => clearTimeout(timeout);
    }, [activeVideo]);

    return (
        <div className={`relative ${className}`} ref={parentRef}>
            <motion.video
                ref={video1Ref}
                src={src}
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 1 }}
                animate={{ opacity: activeVideo === 1 ? 0.6 : 0 }}
                transition={{ duration: 1 }}
                onTimeUpdate={activeVideo === 1 ? handleTimeUpdate : undefined}
                onEnded={() => { if (activeVideo === 1) video1Ref.current?.play() }}
            />
            <motion.video
                ref={video2Ref}
                src={src}
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: activeVideo === 2 ? 0.6 : 0 }}
                transition={{ duration: 1 }}
                onTimeUpdate={activeVideo === 2 ? handleTimeUpdate : undefined}
                onEnded={() => { if (activeVideo === 2) video2Ref.current?.play() }}
            />
        </div>
    );
}

export default function Home() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);


    const iconMap: any = {
        "ShieldCheck": <ShieldCheck className="w-10 h-10" />,
        "TrendingUp": <TrendingUp className="w-10 h-10" />,
        "Globe": <Globe className="w-10 h-10" />,
        "BadgeIndianRupee": <BadgeIndianRupee className="w-10 h-10" />,
        "Smartphone": <Smartphone className="w-10 h-10" />
    };

    return (
        <div className="flex flex-col w-full overflow-hidden" ref={targetRef}>
            <FloatingParticles />

            {/* --- HERO SECTION --- */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
                {/* Animated Background Mesh */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[120px] animate-aurora mix-blend-screen" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent-violet/20 rounded-full blur-[100px] animate-aurora delay-1000 mix-blend-screen" />
                    <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-accent-cyan/10 rounded-full blur-[80px] animate-pulse-slow mix-blend-screen" />



                    <SeamlessLoopVideo
                        src={heroVideo}
                        className="absolute inset-0 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                    <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="mb-8 inline-block"
                        >
                            <span className="py-2 px-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-accent-cyan tracking-wider uppercase">
                                Leading Fintech Solutions
                            </span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 leading-none tracking-tighter text-white">
                            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
                                Strategic
                            </span>
                            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-glow to-accent-violet animate-text-shimmer">
                                Excellence.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                            {siteContent.hero.subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link to="/contact" className="group relative px-8 py-4 bg-white/10 overflow-hidden rounded-full backdrop-blur-md border border-white/20 hover:border-white/50 transition-all cursor-none ">
                                <div className="absolute inset-0 bg-primary/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <span className="relative z-10 font-bold text-white flex items-center gap-3">
                                    Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-slate-500 to-transparent" />
                </motion.div>
            </section>

            {/* --- STATS SECTION (New) --- */}
            <section className="py-20 bg-slate-900 border-y border-white/5">
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
            </section>

            {/* --- PARTNERS MARQUEE --- */}
            <section className="bg-slate-900/50 py-20">
                <Marquee />
            </section>

            {/* --- WHO WE ARE (Refined) --- */}
            <section className="py-32 relative">
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
            </section>

            {/* --- WHY CHOOSE US (New) --- */}
            <section className="py-32 bg-slate-950/50 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={fadeIn}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Why Choose Ananta?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Unmatched advantages for your financial growth.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {siteContent.benefits.map((benefit, i) => (
                            <TiltCard key={i} className="h-full">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportConfig}
                                    variants={fadeIn}
                                    className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors h-full"
                                >
                                    <div className="text-primary mb-6">
                                        {iconMap[benefit.icon]}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
                                </motion.div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- INDUSTRIES (Circular Mask + List) --- */}
            <section className="py-32 bg-slate-950 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <motion.h2
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportConfig}
                                variants={fadeIn}
                                className="text-5xl md:text-6xl font-display font-bold text-white mb-16"
                            >
                                Industries
                            </motion.h2>

                            <motion.ul
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportConfig}
                                variants={staggerContainer}
                                className="space-y-8"
                            >
                                {siteContent.industries.map((item, i) => (
                                    <motion.li key={i} variants={fadeIn} className="group flex items-center gap-6 cursor-pointer">
                                        <div className="w-12 h-[1px] bg-slate-700 group-hover:w-20 group-hover:bg-primary transition-all duration-300" />
                                        <span className="text-2xl md:text-3xl text-slate-400 group-hover:text-white transition-colors">{item}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>

                        <div className="relative flex justify-center items-center">
                            <div className="relative w-[500px] h-[500px] rounded-full overflow-hidden border border-white/10">
                                <img
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                                    alt="Industries"
                                    className="w-full h-full object-cover opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
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
                            <TiltCard key={i} className={`group ${i === siteContent.detailedSolutions.length - 1 ? 'md:col-span-2' : ''}`}>
                                <motion.div
                                    variants={fadeIn}
                                    whileHover={{ y: -10 }}
                                    className="h-full bg-slate-900/50 backdrop-blur-md border border-white/10 p-10 rounded-3xl hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700 text-white">
                                        {iconMap[solution.icon]}
                                    </div>

                                    <h3 className="text-3xl font-display font-bold text-white mb-6 italic">{solution.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-lg mb-8">
                                        {solution.description}
                                    </p>

                                    {/* Learn More Footer */}
                                    <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-auto">
                                        <span className="text-sm font-bold text-white group-hover:text-primary-glow transition-colors">Learn more</span>
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </motion.div>
                            </TiltCard>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {siteContent.testimonials.map((testimonial, i) => (
                            <TiltCard key={i} className="group h-full">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportConfig}
                                    variants={fadeIn}
                                    className="p-10 rounded-3xl bg-primary/20 backdrop-blur-md border border-white/5 relative h-full flex flex-col hover:bg-primary/30 transition-all duration-500 shadow-xl"
                                >
                                    <p className="text-white/90 text-lg mb-8 leading-relaxed flex-grow font-medium">"{testimonial.content}"</p>
                                    <div className="border-t border-white/10 pt-6">
                                        <div className="flex items-center gap-4 mb-1">
                                            <div className="w-10 h-1 bg-black group-hover:w-16 transition-all duration-500" />
                                            <h4 className="font-bold text-white text-xl">{testimonial.name}</h4>
                                        </div>
                                        <p className="text-sm text-slate-300 pl-14">{testimonial.role}</p>
                                    </div>
                                </motion.div>
                            </TiltCard>
                        ))}
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

                    <div className="w-full max-w-4xl mx-auto bg-black p-20 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-display text-white mb-4">Check back soon</span>
                        <p className="text-slate-500">Once posts are published, you'll see them here.</p>
                    </div>

                    <div className="mt-16">
                        <Link to="/about" className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                            Our Insights <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>


            {/* --- CTA --- */}
            <section className="py-40 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-primary/10" />
                <div className="absolute inset-0 bg-hero-glow blur-[150px] opacity-30 animate-pulse-slow" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={fadeIn}
                        className="text-5xl md:text-8xl font-display font-bold text-white mb-10 tracking-tight"
                    >
                        {siteContent.cta.title}
                        {/* Ready to <span className="opacity-50 italic">scale</span>? */}
                    </motion.h2>
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
        </div>
    );
}
