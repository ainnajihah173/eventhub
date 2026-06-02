import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Ticket, Search, Sparkles, MapPin } from 'lucide-react';

export default function AttendeeView({ upcoming_events = [], my_bookings = [], stats }: any) {
    return (
        <div className="space-y-10 pb-10">
            
            {/* --- 1. PREMIUM HERO SECTION --- */}
            <section className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                <div className="relative bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
                    <div className="relative z-10 max-w-xl">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-wider mb-4"
                        >
                            <Sparkles size={12} /> Personalized for you
                        </motion.span>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
                            Life is better <span className="text-indigo-600">in person.</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-medium mb-8 max-w-sm">
                            Discover exclusive experiences curated for you.
                        </p>
                        
                        <div className="relative max-w-sm">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search experiences..." 
                                className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400 font-medium"
                            />
                        </div>
                    </div>

                    <div className="hidden lg:block bg-slate-900 text-white p-6 rounded-3xl text-center min-w-[140px]">
                        <Ticket className="text-indigo-400 mx-auto mb-2" size={24} />
                        <span className="text-2xl font-black block">{stats?.total_tickets || 0}</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">Active Tickets</span>
                    </div>
                </div>
            </section>

            {/* --- 2. THE DISCOVERY GRID --- */}
            <section>
                <div className="flex items-center justify-between mb-6 px-2">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Handpicked Experiences</h2>
                        <p className="text-slate-400 text-xs font-medium">Verified events in your area</p>
                    </div>
                    <Link href={route('events.explore')} className="group flex items-center gap-2 text-sm font-bold text-indigo-600">
                        View all <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcoming_events.length === 0 ? (
                        <div className="col-span-full py-12 text-center bg-white border border-dashed border-slate-200 rounded-3xl">
                           <p className="text-slate-400 text-sm font-bold italic">No events published yet.</p>
                        </div>
                    ) : (
                        upcoming_events.map((event: any, i: number) => (
                            <motion.div 
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link 
                                    href={route('events.show', event.id)} 
                                    className="group block relative bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                                        {event.thumbnail ? (
                                            <img 
                                                src={`/storage/${event.thumbnail}`} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300 font-black tracking-tighter text-xl">EVENT</div>
                                        )}
                                        
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-xl shadow-sm">
                                            <span className="text-[10px] font-black text-slate-900 uppercase">RM {event.price}</span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase mb-2">
                                            <Calendar size={12} className="text-indigo-500" />
                                            {new Date(event.start_date_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </div>
                                        <h3 className="text-base font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">{event.title}</h3>
                                        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase truncate">
                                            <MapPin size={12} /> {event.location}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    )}
                </div>
            </section>

            {/* --- 3. COMPACT TICKETS SLIDER --- */}
            {my_bookings.length > 0 && (
                <section className="bg-slate-900 rounded-[2rem] p-8 text-white">
                    <div className="flex items-center justify-between mb-6 px-2">
                        <h2 className="text-lg font-black tracking-tight flex items-center gap-3">
                            <Ticket className="text-indigo-400" /> Your Tickets
                        </h2>
                        <button className="text-[10px] font-bold opacity-50 uppercase tracking-widest hover:opacity-100 transition">View History</button>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {my_bookings.map((booking: any) => (
                            <Link 
                                key={booking.id}
                                href="#"
                                className="flex-shrink-0 w-64 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-between group"
                            >
                                <div>
                                    <h4 className="font-bold text-xs mb-1 line-clamp-1">{booking.event.title}</h4>
                                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter">REF: {booking.booking_reference}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors">
                                    <ArrowRight size={14} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}