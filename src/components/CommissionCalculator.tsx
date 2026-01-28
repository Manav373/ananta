
import { useState, useEffect } from 'react';
import { BadgeIndianRupee, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommissionCalculator() {
    const [transactions, setTransactions] = useState(50);
    const [avgTicket, setAvgTicket] = useState(2500);
    const [commission, setCommission] = useState(0);

    useEffect(() => {
        // Commission logic: approx 0.35% blended commission on volume
        const dailyVolume = transactions * avgTicket;
        const monthlyVolume = dailyVolume * 26; // 26 working days
        const estimatedCommission = monthlyVolume * 0.0035;
        setCommission(Math.round(estimatedCommission));
    }, [transactions, avgTicket]);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-violet/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Inputs */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary-glow">
                            <BadgeIndianRupee className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Earnings Calculator</h3>
                            <p className="text-sm text-slate-400">Estimate your potential monthly income</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Slider 1 */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <label className="text-slate-300">Daily Transactions</label>
                                <span className="text-primary-glow font-bold">{transactions}</span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="200"
                                value={transactions}
                                onChange={(e) => setTransactions(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-glow transition-all"
                            />
                        </div>

                        {/* Slider 2 */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <label className="text-slate-300">Avg. Transaction Value (₹)</label>
                                <span className="text-primary-glow font-bold">₹{avgTicket.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="500"
                                max="10000"
                                step="500"
                                value={avgTicket}
                                onChange={(e) => setAvgTicket(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-glow transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <p className="text-xs text-slate-500 italic">*Estimates based on average industry margins. Actual earnings may vary.</p>
                    </div>
                </div>

                {/* Result Card */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent-violet to-primary-dark opacity-20 rounded-2xl blur-sm" />
                    <div className="relative bg-slate-950/80 p-8 rounded-2xl border border-white/10 text-center">
                        <h4 className="text-slate-400 uppercase tracking-widest text-sm font-bold mb-2">Potential Monthly Income</h4>
                        <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
                            <span className="text-2xl align-top opacity-50">₹</span>
                            {commission.toLocaleString()}
                        </div>
                        <p className="text-primary-glow font-medium mb-8 flex items-center justify-center gap-2">
                            <TrendingUp className="w-4 h-4" /> High Growth Potential
                        </p>

                        <Link to="/contact" className="inline-flex w-full items-center justify-center gap-2 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors">
                            Start Earning Now <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
