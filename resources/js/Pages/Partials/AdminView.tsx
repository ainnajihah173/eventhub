import { motion } from 'framer-motion';
import { Users, Calendar, ShieldCheck, ArrowUpRight, Clock, AlertCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface AdminViewProps {
    stats: {
        total_users: number;
        pending_organizers: number;
        pending_events: number;
    };
}

export default function AdminView({ stats }: AdminViewProps) {
    const summaryCards = [
        { label: 'Total Members', value: stats.total_users, icon: <Users size={20} />, color: 'indigo' },
        { label: 'Pending Organizers', value: stats.pending_organizers, icon: <ShieldCheck size={20} />, color: 'amber' },
        { label: 'Events Awaiting Approval', value: stats.pending_events, icon: <Clock size={20} />, color: 'blue' },
    ];

    return (
        <div className="space-y-8">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {summaryCards.map((card, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className={`w-12 h-12 rounded-2xl bg-${card.color}-50 text-${card.color}-600 flex items-center justify-center mb-5`}>
                            {card.icon}
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{card.label}</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-4xl font-black text-slate-900">{card.value}</h3>
                            <span className="text-emerald-500 text-xs font-bold flex items-center">
                                <ArrowUpRight size={14} /> +12%
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Admin Actions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Task 1: Organizer Verification */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-900">Organizer Queue</h3>
                        <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-xs font-bold uppercase tracking-tighter">
                            {stats.pending_organizers} Action Required
                        </span>
                    </div>
                    
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                        Verify business licenses and identity proofs for new organizers to maintain platform trust.
                    </p>

                    <Link 
                        href={route('admin.approvals.index')} 
                        className="inline-flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition shadow-lg shadow-indigo-100"
                    >
                        Review Applications
                    </Link>
                </div>

                {/* Task 2: Event Verification */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-900">Event Moderation</h3>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-tighter">
                            {stats.pending_events} Pending Review
                        </span>
                    </div>

                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                        Check event descriptions, pricing, and guidelines before publishing them to the public marketplace.
                    </p>

                    <Link 
                        href="#" // To be built in next step
                        className="inline-flex items-center justify-center w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition"
                    >
                        Audit Events
                    </Link>
                </div>

            </div>

            {/* Quick Warning / Platform Health */}
            <div className="bg-rose-50 border border-rose-100 p-6 rounded-[2rem] flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm">
                    <AlertCircle size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-rose-900 tracking-tight">Fraud Prevention Active</h4>
                    <p className="text-xs text-rose-700 opacity-80 font-medium">3 Suspicious login attempts were blocked in the last 24 hours.</p>
                </div>
            </div>
        </div>
    );
}