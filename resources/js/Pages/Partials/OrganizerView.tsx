import { Calendar, Ticket, BarChart3, ArrowUpRight, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface OrganizerViewProps {
    stats?: {
        total_events: number;
        total_tickets: number;
        total_revenue: number;
    };
    events: any[];
}

export default function OrganizerView({ stats, events = [] }: OrganizerViewProps) {
    const isEmpty = !Array.isArray(events) || events.length === 0;

    const summaryCards = [
        { label: 'Total Events', value: stats?.total_events || 0, icon: <Calendar size={20} />, color: 'indigo' },
        { label: 'Tickets Sold', value: stats?.total_tickets || 0, icon: <Ticket size={20} />, color: 'emerald' },
        { label: 'Revenue', value: `$${stats?.total_revenue || 0}`, icon: <BarChart3 size={20} />, color: 'blue' },
    ];

    if (isEmpty) {
        return (
            <div className="bg-white border border-dashed border-gray-200 rounded-[2.5rem] p-20 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <Calendar size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No events found</h3>
                <p className="text-gray-400 text-sm">Check back later for exciting upcoming events!</p>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {summaryCards.map((card, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm"
                    >
                        <div className={`w-12 h-12 rounded-2xl bg-${card.color}-50 text-${card.color}-600 flex items-center justify-center mb-5`}>
                            {card.icon}
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{card.label}</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-4xl font-black text-slate-900">{card.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Events List */}
            <div>
                <div className="flex items-center justify-between mb-6 px-4">
                    <h2 className="text-xl font-bold text-slate-900">Recent Events</h2>
                    <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition">View All</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event, i) => (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            key={event.id} 
                            className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300"
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                                        {event.category || 'General'}
                                    </span>
                                    <span className="text-gray-300 group-hover:text-indigo-600 transition-colors">
                                        <ArrowUpRight size={20} />
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-1">{event.title}</h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                                        <Clock size={16} /> {event.date || 'TBA'}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                                        <MapPin size={16} /> {event.location || 'Online'}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}