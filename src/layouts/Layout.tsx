import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '../data/content';
import CustomCursor from '../components/CustomCursor';
import WhatsAppButton from '../components/WhatsAppButton';
import clsx from 'clsx';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="min-h-screen flex flex-col font-sans bg-background text-text-primary selection:bg-primary-glow/30">
            <CustomCursor />

            {/* Navbar - Floating Glass Capsule */}
            <div className="fixed top-0 w-full z-50 flex justify-center pt-6 px-4">
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={clsx(
                        "w-full max-w-5xl rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500",
                        isScrolled
                            ? "bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-900/10"
                            : "bg-transparent border border-transparent"
                    )}
                >
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500 blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                            <img src={siteContent.brand.logo} alt="Ananta Fintech Services" width="32" height="32" className="h-8 w-auto relative z-10" />
                        </div>
                        <span className="font-display font-bold text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Ananta Fintech Services
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        {['Home', 'About', 'Solutions', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className="relative px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group overflow-hidden rounded-full hover:bg-white/5"
                            >
                                <span className="relative z-10">{item.toUpperCase()}</span>
                                {location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute inset-0 bg-white/10 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/contact"
                            className="group flex items-center gap-2 px-8 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-full font-bold transition-all shadow-lg hover:shadow-blue-600/30"
                        >
                            Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-white bg-white/10 rounded-full backdrop-blur-md"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </motion.nav>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-3xl pt-32 px-6 md:hidden flex flex-col items-center gap-8"
                    >
                        {['Home', 'About', 'Solutions', 'Contact'].map((item, i) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Link
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className="text-3xl font-display font-bold text-white hover:text-primary-glow transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-grow pt-0">
                {children}
            </main>

            {/* Footer */}
            <footer className="relative bg-slate-950 text-slate-400 pt-32 pb-12 overflow-hidden">
                {/* Glow Effects */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-violet/20 rounded-full blur-[128px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-1 md:col-span-2">
                            <Link to="/" className="inline-block mb-8">
                                <span className="text-3xl font-display font-bold text-white tracking-tight">Ananta Fintech Services</span>
                            </Link>
                            <p className="text-lg leading-relaxed max-w-md text-slate-400 mb-8">
                                {siteContent.brand.tagline}. Redefining financial distribution with cutting-edge technology and strategic expertise.
                            </p>
                            <div className="flex gap-4">
                                {[
                                    { Icon: Instagram, url: siteContent.brand.socials.instagram },
                                    { Icon: Facebook, url: siteContent.brand.socials.facebook },
                                    { Icon: Twitter, url: siteContent.brand.socials.twitter },
                                    { Icon: Linkedin, url: siteContent.brand.socials.linkedin }
                                ].map(({ Icon, url }, i) => (
                                    <a
                                        key={i}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                                        aria-label={`Follow us on ${url.includes('instagram') ? 'Instagram' : url.includes('facebook') ? 'Facebook' : url.includes('twitter') ? 'Twitter' : 'LinkedIn'}`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-8 text-lg">Company</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Home', path: '/' },
                                    { name: 'About Us', path: '/about' },
                                    { name: 'Our Solutions', path: '/solutions' },
                                    { name: 'Careers', path: '/contact' },
                                    { name: 'Contact', path: '/contact' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link to={item.path} className="text-slate-400 hover:text-primary-glow transition-colors">{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-8 text-lg">Contact</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Email</span>
                                        <span className="text-white">{siteContent.brand.contact.email}</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Phone</span>
                                        <span className="text-white">{siteContent.brand.contact.phone}</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 group">
                                    <a
                                        href={siteContent.brand.contact.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0"
                                    >
                                        <MapPin className="w-5 h-5" />
                                    </a>
                                    <div>
                                        <span className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Visit Us</span>
                                        <a
                                            href={siteContent.brand.contact.mapLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:text-primary-glow transition-colors text-sm leading-relaxed"
                                        >
                                            {siteContent.brand.contact.address}
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <span>© {new Date().getFullYear()} Ananta Fintech Services. All rights reserved.</span>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
            {/* WhatsApp Float */}
            <WhatsAppButton />
        </div >
    );
}
