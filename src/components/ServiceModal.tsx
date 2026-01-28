import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { siteContent } from '../data/content';
import { Landmark, CreditCard, BadgeIndianRupee, Send, Smartphone, Banknote, X, CheckCircle, ArrowUpRight } from 'lucide-react';

export const iconMap: Record<string, React.ReactNode> = {
    "Landmark": <Landmark className="w-8 h-8" />,
    "CreditCard": <CreditCard className="w-8 h-8" />,
    "BadgeIndianRupee": <BadgeIndianRupee className="w-8 h-8" />,
    "Send": <Send className="w-8 h-8" />,
    "Atm": <Banknote className="w-8 h-8" />,
    "Smartphone": <Smartphone className="w-8 h-8" />,
};

interface ServiceModalProps {
    service: typeof siteContent.services[0];
    onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
    const navigate = useNavigate();
    const Icon = iconMap[service.icon] || <Landmark className="w-8 h-8" />;

    // Lock Body Scroll via Lenis & CSS
    useEffect(() => {
        // Dispatch custom event to stop Lenis
        window.dispatchEvent(new Event('lenis-stop'));
        // Also strictly lock body overflow as a fallback
        document.body.style.overflow = 'hidden';

        return () => {
            window.dispatchEvent(new Event('lenis-start'));
            document.body.style.overflow = 'unset';
        };
    }, []);

    return createPortal(
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
                />
                <motion.div
                    layoutId={`service-${service.title}`}
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 40 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    data-lenis-prevent
                    className="relative w-full max-w-5xl bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors z-20 border border-white/5"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Left Content */}
                        <div className="p-6 md:p-14 relative overflow-hidden flex flex-col">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />

                            {/* Icon with Glow */}
                            <div className="relative w-24 h-24 mb-8">
                                <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full" />
                                <div className="relative w-full h-full rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-blue-400 shadow-xl backdrop-blur-md">
                                    {Icon}
                                </div>
                            </div>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 mb-6 leading-tight"
                            >
                                {service.title}
                            </motion.h2>

                            <p className="text-slate-300 text-lg leading-relaxed mb-10 border-l-4 border-blue-500/30 pl-6">
                                {service.longDescription || service.description}
                            </p>

                            <div className="mt-auto">
                                <h4 className="text-white font-bold mb-6 flex items-center gap-3 text-lg uppercase tracking-wider opacity-80">
                                    Key Benefits
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {service.benefits?.map((benefit, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                            className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-start gap-3 hover:bg-white/10 transition-colors"
                                        >
                                            <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                            <span className="text-slate-300 text-sm font-medium">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="bg-slate-950/30 p-6 md:p-14 border-l border-white/5 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

                            <h3 className="text-lg font-bold text-white mb-8 uppercase tracking-widest text-blue-300 relative z-10">Capabilities</h3>
                            <div className="space-y-4 mb-10 relative z-10">
                                {service.features?.map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-blue-400/30 hover:bg-blue-500/5 transition-all group cursor-default"
                                    >
                                        <h5 className="text-white font-semibold mb-1 group-hover:text-blue-200 transition-colors">{feature}</h5>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider">Enterprise Grade</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-auto p-1 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 relative z-10">
                                <div className="bg-slate-900/90 rounded-xl p-6 border border-white/10 backdrop-blur-sm relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <h4 className="text-white font-bold mb-2 relative z-10 text-xl">Ready to integrate?</h4>
                                    <p className="text-slate-400 text-sm mb-6 relative z-10">Get a custom solution tailored to your specific business needs.</p>

                                    <button
                                        onClick={() => navigate('/contact')}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all shadow-lg relative z-10 flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Contact Sales <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
}
