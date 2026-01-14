import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { siteContent } from '../data/content';
import { Landmark, CreditCard, BadgeIndianRupee, Send, Smartphone, Banknote, ArrowUpRight, X, CheckCircle } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    "Landmark": <Landmark className="w-8 h-8" />,
    "CreditCard": <CreditCard className="w-8 h-8" />,
    "BadgeIndianRupee": <BadgeIndianRupee className="w-8 h-8" />,
    "Send": <Send className="w-8 h-8" />,
    "Atm": <Banknote className="w-8 h-8" />,
    "Smartphone": <Smartphone className="w-8 h-8" />,
};

function ServiceModal({ service, onClose }: { service: typeof siteContent.services[0]; onClose: () => void }) {
    const navigate = useNavigate();
    // Determine which icon to render
    const Icon = iconMap[service.icon] || <Landmark className="w-8 h-8" />;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
                layoutId={`service-${service.title}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left Content */}
                    <div className="p-10 md:p-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-primary-glow mb-8">
                                {Icon}
                            </div>
                            <h2 className="text-4xl font-display font-bold text-white mb-6">{service.title}</h2>
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                {service.longDescription || service.description}
                            </p>

                            <div className="mt-auto pt-8 border-t border-white/10">
                                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-primary" /> Key Benefits
                                </h4>
                                <ul className="space-y-3">
                                    {service.benefits?.map((benefit, i) => (
                                        <li key={i} className="text-slate-400 flex items-start gap-3 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Content (Darker) */}
                    <div className="bg-white/5 p-10 md:p-12 border-l border-white/5">
                        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Features & Capabilities</h3>
                        <div className="space-y-4">
                            {service.features?.map((feature, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                                    <h5 className="text-white font-medium mb-1">{feature}</h5>
                                    <p className="text-sm text-slate-500">Advanced capability for seamless operations.</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-accent-violet/20 border border-primary/20">
                            <h4 className="text-white font-bold mb-2">Ready to get started?</h4>
                            <p className="text-slate-400 text-sm mb-4">Contact our team for a personalized demo.</p>
                            <button
                                onClick={() => navigate('/contact')}
                                className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors"
                            >
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function Solutions() {
    const [selectedService, setSelectedService] = useState<typeof siteContent.services[0] | null>(null);

    return (
        <div className="pt-32 min-h-screen bg-background text-white">
            <section className="relative py-20">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-accent-cyan font-bold tracking-[0.2em] uppercase text-sm mb-6 block"
                    >
                        Our Expertise
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-display font-bold mb-8"
                    >
                        Solutions that <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-glow to-accent-violet">Scale</span>.
                    </motion.h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Comprehensive financial services designed to empower your business growth in the digital economy.
                    </p>
                </div>
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
                                whileHover={{ y: -10 }}
                                onClick={() => setSelectedService(service)}
                                className="group relative bg-surfaceHighlight/30 backdrop-blur-sm rounded-3xl p-8 border border-white/5 hover:border-primary/50 transition-all duration-500 overflow-hidden cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-300 mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg group-hover:shadow-primary/30">
                                        {iconMap[service.icon] || <Landmark className="w-8 h-8" />}
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-glow transition-colors">{service.title}</h3>
                                    <p className="text-slate-400 leading-relaxed mb-8">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                        <span className="text-sm font-bold text-white">Learn more</span>
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
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
    );
}
