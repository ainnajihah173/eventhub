import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { MapPin, Calendar, Search, ArrowRight, Flame } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Explore({ events, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('dashboard'), { search }, { preserveState: true });
    };

    return (
        <DashboardLayout>
            <Head title="Explore Events" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Discover Experiences</h1>
                    <p className="text-slate-500 mt-2 font-medium">Handpicked events approved by our team.</p>
                </div>

                <form onSubmit={handleSearch} className="relative group">
                    <Search className="absolute left-5 top-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input 
                        className="bg-white border-gray-100 rounded-[2rem] pl-14 pr-6 py-4 w-full md:w-96 shadow-sm focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                        placeholder="Search by title or city..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>
            </div>

            {events.data.length === 0 ? (
                <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-50">
                    <p className="text-gray-400 font-bold">No events matching your search were found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {events.data.map((event: any, i: number) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={event.id} 
                            className="group bg-white rounded-[2.5rem] border border-gray-50 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col"
                        >
                            <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                                {event.thumbnail ? (
                                    <img src={`/storage/${event.thumbnail}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300 italic">No Preview</div>
                                )}
                                
                                <div className="absolute top-5 left-5 px-4 py-2 bg-white/90 backdrop-blur rounded-2xl text-xs font-black text-indigo-600 shadow-sm">
                                    RM {event.price}
                                </div>

                                {event.available_slots < 10 && (
                                    <div className="absolute top-5 right-5 px-3 py-1.5 bg-orange-500 text-white rounded-xl text-[10px] font-black uppercase flex items-center gap-1 shadow-lg animate-pulse">
                                        <Flame size={12} /> Selling Fast
                                    </div>
                                )}
                            </div>

                            <div className="p-8 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors line-clamp-1">{event.title}</h3>
                                
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-gray-400 text-xs font-bold">
                                        <Calendar size={16} className="text-indigo-500" />
                                        {new Date(event.start_date_time).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400 text-xs font-bold">
                                        <MapPin size={16} className="text-indigo-500" />
                                        {event.location}
                                    </div>
                                </div>

                                <Link 
                                    href={route('events.show', event.id)}
                                    className="mt-auto w-full bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                                >
                                    Show Details <ArrowRight size={18} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}