import { motion } from 'framer-motion';
import { siteContent } from '../data/content';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
    return (
        <div className="pt-32 min-h-screen bg-background text-white">
            <section className="relative py-20 pb-10">
                <div className="container mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-display font-bold mb-6"
                    >
                        Let's Start a <span className="text-primary-glow">Conversation</span>.
                    </motion.h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Have questions? We're here to help you start your journey towards financial excellence.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="space-y-12">
                            <div className="flex items-start gap-8 group">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary-glow group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg hover:shadow-primary/30 shrink-0">
                                    <Mail className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Email Us</h3>
                                    <p className="text-slate-400 mb-2">For general inquiries and support.</p>
                                    <a href={`mailto:${siteContent.brand.contact.email}`} className="text-lg font-medium text-white hover:text-primary-glow transition-colors">
                                        {siteContent.brand.contact.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-8 group">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary-glow group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg hover:shadow-primary/30 shrink-0">
                                    <Phone className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Call Us</h3>
                                    <p className="text-slate-400 mb-2">Mon-Fri from 9am to 6pm.</p>
                                    <a href={`tel:${siteContent.brand.contact.phone}`} className="text-lg font-medium text-white hover:text-primary-glow transition-colors">
                                        {siteContent.brand.contact.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-8 group">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary-glow group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg hover:shadow-primary/30 shrink-0">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Visit Us</h3>
                                    <p className="text-slate-400 mb-2">Come say hello at our office.</p>
                                    <span className="text-lg font-medium text-white">
                                        {siteContent.brand.contact.address}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-surfaceHighlight/30 backdrop-blur-md p-10 rounded-3xl border border-white/10"
                    >
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label htmlFor="name" className="text-sm font-bold text-slate-300 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-sm font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="subject" className="text-sm font-bold text-slate-300 uppercase tracking-wider">Subject</label>
                                <select id="subject" className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all [&>option]:bg-slate-900">
                                    <option>General Inquiry</option>
                                    <option>KIOSK Banking</option>
                                    <option>Partnership</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="message" className="text-sm font-bold text-slate-300 uppercase tracking-wider">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full py-5 bg-gradient-to-r from-primary-dark to-primary text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                                Send Message <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
