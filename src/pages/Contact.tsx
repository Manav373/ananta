import { motion, AnimatePresence } from 'framer-motion';

import { siteContent } from '../data/content';
import { Mail, Phone, MapPin, Send, MessageSquare, ChevronDown, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: ""
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const destinationEmail = "freecontent.me@gmail.com";

            const response = await fetch(`https://formsubmit.co/ajax/${destinationEmail}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New Contact: ${formData.subject}`,
                    ...formData,
                    _template: "table"
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden selection:bg-blue-500/30">
            {/* --- ANIMATED BACKGROUND --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] animate-blob" />
                    <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
                    <div className="absolute bottom-[10%] left-[30%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
                </div>
                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.2]" style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}></div>
            </div>

            <main className="relative z-10 pt-40 pb-20 container mx-auto px-6">

                {/* HERO SECTION */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-blue-300 text-xs font-bold tracking-widest uppercase mb-8 shadow-glow"
                    >
                        <MessageSquare className="w-4 h-4" />
                        <span>Get in Touch</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight drop-shadow-2xl"
                    >
                        Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">Conversation</span>.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        Have questions about our financial solutions? We're here to help you accelerate your business growth.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* LEFT COLUMN: CONTACT CARDS */}
                    <div className="space-y-6">
                        <ContactCard
                            icon={<Mail className="w-6 h-6" />}
                            title="Email Us"
                            label="For general inquiries"
                            value={siteContent.brand.contact.email}
                            href={`mailto:${siteContent.brand.contact.email}`}
                            delay={0.3}
                            color="blue"
                        />
                        <ContactCard
                            icon={<Phone className="w-6 h-6" />}
                            title="Call Us"
                            label="Mon-Fri from 9am to 6pm"
                            value={siteContent.brand.contact.phone}
                            href={`tel:${siteContent.brand.contact.phone}`}
                            delay={0.4}
                            color="purple"
                        />
                        <ContactCard
                            icon={<MapPin className="w-6 h-6" />}
                            title="Visit Us"
                            label="Our Headquarters"
                            value={siteContent.brand.contact.address}
                            href={siteContent.brand.contact.mapLink}
                            delay={0.5}
                            color="cyan"
                        />
                    </div>

                    {/* RIGHT COLUMN: FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-slate-900/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center h-[500px] space-y-6"
                            >
                                <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4">
                                    <Check className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
                                <p className="text-slate-400 max-w-sm">
                                    Thank you for reaching out. We've received your message and will get back to you shortly.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors"
                                >
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputGroup
                                        label="Full Name"
                                        placeholder="John Doe"
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Email Address"
                                        placeholder="john@company.com"
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                                    <CustomSelect
                                        options={[
                                            "General Inquiry",
                                            "Digital Banking Solutions",
                                            "Partnership Opportunities",
                                            "Technical Support"
                                        ]}
                                        value={formData.subject}
                                        onChange={(val) => setFormData({ ...formData, subject: val })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
                                        placeholder="Tell us about your project..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 group-hover:from-blue-500 group-hover:to-cyan-500 disabled:opacity-70 disabled:hover:scale-100"
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>Send Message <Send className="w-5 h-5" /></>
                                    )}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-400 text-center text-sm">Something went wrong. Please try again.</p>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

function ContactCard({ icon, title, label, value, href, delay, color }: any) {
    const colorClasses: Record<string, string> = {
        blue: "bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white",
        purple: "bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white",
        cyan: "bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white",
    };

    return (
        <motion.a
            href={href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group relative overflow-hidden ${!href ? 'cursor-default' : ''}`}
        >
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${color === 'blue' ? 'bg-blue-500' : color === 'purple' ? 'bg-purple-500' : 'bg-cyan-500'} opacity-0 group-hover:opacity-100 transition-opacity`} />

            <div className="flex items-start gap-6 relative z-10">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ${colorClasses[color]}`}>
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{title}</h3>
                    <p className="text-slate-400 text-sm mb-2">{label}</p>
                    <p className="text-lg font-medium text-white group-hover:text-blue-200 transition-colors">{value}</p>
                </div>
            </div>
        </motion.a>
    );
}

function InputGroup({ label, placeholder, id, type, value, onChange, required }: any) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
            <input
                type={type}
                id={id}
                className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
}

function CustomSelect({ options, value, onChange }: { options: string[], value: string, onChange: (val: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-xl text-white flex items-center justify-between hover:bg-white/10 hover:border-blue-500/30 transition-all text-left group"
            >
                <span className="font-medium group-hover:text-blue-200 transition-colors">{value}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 p-1 ring-1 ring-white/10"
                    >
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-3 rounded-lg text-left flex items-center justify-between transition-colors ${value === option
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span className="text-sm font-medium">{option}</span>
                                {value === option && <Check className="w-4 h-4" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
