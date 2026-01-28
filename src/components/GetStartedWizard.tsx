
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle, Landmark, CreditCard, BadgeIndianRupee, ChevronRight } from 'lucide-react';

type Step = 'SERVICE' | 'DETAILS' | 'SUCCESS';

interface WizardProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function GetStartedWizard({ isOpen, onClose }: WizardProps) {
    const [step, setStep] = useState<Step>('SERVICE');
    const [selectedService, setSelectedService] = useState<string>('');
    const [formData, setFormData] = useState({ name: '', phone: '' });

    const services = [
        { id: 'kiosk', title: 'Start a Kiosk', icon: Landmark, desc: 'Open a mini-bank in your area' },
        { id: 'payment', title: 'Payment Gateway', icon: CreditCard, desc: 'Accept payments for your business' },
        { id: 'loan', title: 'Get a Loan', icon: BadgeIndianRupee, desc: 'Apply for personal or business loans' },
    ];

    const handleServiceSelect = (id: string) => {
        setSelectedService(id);
        setStep('DETAILS');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send data to backend
        console.log('Submitted:', { service: selectedService, ...formData });
        setStep('SUCCESS');
    };

    // Reset when closed
    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setStep('SERVICE');
            setSelectedService('');
            setFormData({ name: '', phone: '' });
        }, 500);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="relative w-full max-w-lg bg-[#0B0F19] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                    <button onClick={handleClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-20">
                        <X className="w-5 h-5" />
                    </button>

                    {/* Progress Bar */}
                    <div className="flex gap-1 mb-8 justify-center max-w-[200px] mx-auto">
                        <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step === 'SERVICE' || step === 'DETAILS' || step === 'SUCCESS' ? 'bg-primary' : 'bg-white/10'}`} />
                        <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step === 'DETAILS' || step === 'SUCCESS' ? 'bg-primary' : 'bg-white/10'}`} />
                        <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step === 'SUCCESS' ? 'bg-primary' : 'bg-white/10'}`} />
                    </div>

                    <div className="relative z-10 min-h-[400px]">
                        {step === 'SERVICE' && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="h-full flex flex-col"
                            >
                                <h2 className="text-3xl font-display font-bold text-white mb-2 text-center">How can we help you?</h2>
                                <p className="text-slate-400 text-center mb-10">Select a service to get started</p>

                                <div className="space-y-4 flex-1">
                                    {services.map((s, i) => (
                                        <motion.button
                                            key={s.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            onClick={() => handleServiceSelect(s.id)}
                                            className="w-full flex items-center gap-5 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/50 hover:bg-white/[0.06] transition-all group text-left relative overflow-hidden"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                                <s.icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-white text-lg mb-1">{s.title}</h3>
                                                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{s.desc}</p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 'DETAILS' && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="h-full flex flex-col"
                            >
                                <h2 className="text-3xl font-display font-bold text-white mb-2 text-center">Almost there!</h2>
                                <p className="text-slate-400 text-center mb-10">We just need a way to reach you.</p>

                                <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">Phone Number</label>
                                            <input
                                                required
                                                type="tel"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 group"
                                        >
                                            Submit Request <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setStep('SERVICE')}
                                            className="w-full text-center mt-4 text-slate-500 hover:text-white text-sm py-2"
                                        >
                                            Back to Services
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {step === 'SUCCESS' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center h-full"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20" />
                                    <div className="relative w-24 h-24 bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-8">
                                        <CheckCircle className="w-12 h-12" />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-display font-bold text-white mb-4">Request Received!</h2>
                                <p className="text-slate-400 mb-10 max-w-xs mx-auto text-lg">
                                    Our team will call you shortly at <span className="text-white font-medium block mt-1">{formData.phone}</span>
                                </p>

                                <button
                                    onClick={handleClose}
                                    className="px-8 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white hover:text-black transition-all"
                                >
                                    Close Window
                                </button>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

