import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    MapPin, Calendar, Clock, ArrowLeft, Ticket, 
    ShieldCheck, UserCircle, Share2, Info, Users, 
    ChevronRight, Sparkles 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventDetails({ event }: any) {
    const { post, processing } = useForm();

    const handleBooking = () => {
        post(route('booking.store', event.id));
    };

    return (
        <DashboardLayout>
            <Head title={event.title} />

            <div className="mx-auto pb-10">
                {/* 1. TOP NAVIGATION & ACTION BAR */}
                <div className="flex items-center justify-between mb-6">
                    <Link 
                        href={route('dashboard')} 
                        className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 transition"
                    >
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                            <ArrowLeft size={16} />
                        </div>
                        Back to explore
                    </Link>
                    <button className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition shadow-sm">
                        <Share2 size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT COLUMN: Content & Experience (8 Cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Event Hero Area */}
                        <section className="space-y-4">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-white"
                            >
                                {event.thumbnail ? (
                                    <img src={`/storage/${event.thumbnail}`} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 font-black text-4xl">EXPERIENCE</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                            </motion.div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-100">
                                        Verified Experience
                                    </span>
                                    <span className="flex items-center gap-1 text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                                        <Users size={12}/> {event.available_slots} Slots Left
                                    </span>
                                </div>
                                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                    {event.title}
                                </h1>
                            </div>
                        </section>

                        {/* Logistics Grid */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { icon: <Calendar size={20}/>, label: 'Date', val: new Date(event.start_date_time).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
                                { icon: <Clock size={20}/>, label: 'Time', val: new Date(event.start_date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
                                { icon: <MapPin size={20}/>, label: 'Location', val: event.location },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-50 p-4 rounded-2xl shadow-sm flex flex-col gap-2">
                                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                                        <p className="text-sm font-bold text-slate-900 mt-0.5">{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Description Section */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 text-indigo-600">
                                <Info size={18} />
                                <h3 className="text-lg font-bold tracking-tight">The Experience</h3>
                            </div>
                            <div className="prose prose-slate max-w-none">
                                <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line bg-white p-6 rounded-3xl border border-gray-50 shadow-sm">
                                    {event.description}
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: Conversion & Organizer (4 Cols) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            
                            {/* The Floating Ticket Card */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden"
                            >
                                {/* Decorative Glow */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>

                                <div className="relative z-10 space-y-6">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-indigo-200 uppercase tracking-[0.2em]">Admission Price</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-sm font-bold">RM</span>
                                            <span className="text-4xl font-black">{event.price}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <button 
                                            onClick={handleBooking}
                                            disabled={processing}
                                            className="w-full bg-white text-indigo-600 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-50 transition active:scale-[0.98]"
                                        >
                                            Secure My Ticket <ChevronRight size={18} />
                                        </button>
                                        <p className="text-[9px] text-center text-indigo-100 font-bold flex items-center justify-center gap-2">
                                            <ShieldCheck size={14} className="text-emerald-500" />
                                            Instant confirmation via email
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Organizer Card */}
                            <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center justify-between group cursor-pointer hover:border-indigo-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 font-black border border-gray-100 shadow-inner text-sm">
                                        {event.user.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Organizer</p>
                                        <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{event.user.name}</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-gray-300 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                            </div>

                            {/* Need Help Card */}
                            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center text-center gap-2">
                                <Sparkles size={20} className="text-indigo-400 mb-1" />
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Event Support</h4>
                                <p className="text-[10px] text-slate-500 font-medium">Have questions? Contact the organizer directly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}