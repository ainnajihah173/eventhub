import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { Plus, Calendar, MapPin, MoreHorizontal, Users, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ events }: { events: any[] }) {
    return (
        <DashboardLayout>
            <Head title="My Events" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Events</h1>
                    <p className="text-slate-500 text-sm">Manage and monitor your upcoming experiences.</p>
                </div>
                <Link href={route('organizer.events.create')} className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition shadow-xl shadow-indigo-100">
                    <Plus size={20} /> Create New Event
                </Link>
            </div>

            {events.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-dashed border-gray-200 rounded-[3rem] p-20 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-300">
                        <Calendar size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">No events found</h3>
                    <p className="text-slate-500 max-w-xs mx-auto mt-2 mb-8">You haven't created any events yet. Start by creating your first one!</p>
                    <Link href={route('organizer.events.create')} className="text-indigo-600 font-bold hover:underline">Create your first event &rarr;</Link>
                </motion.div>
            ) : (
                <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] uppercase font-black tracking-[0.2em]">
                                <tr>
                                    <th className="px-8 py-5">Event Details</th>
                                    <th className="px-8 py-5 text-center">Status</th>
                                    <th className="px-8 py-5">Capacity</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {events.map((event) => (
                                    <tr key={event.id} className="hover:bg-gray-50/30 transition group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex-shrink-0 overflow-hidden relative">
                                                    {event.thumbnail ? (
                                                        <img src={`/storage/${event.thumbnail}`} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Calendar className="m-auto text-slate-300" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition">{event.title}</h4>
                                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                                        <span className="flex items-center gap-1"><MapPin size={12}/> {event.location}</span>
                                                        <span>•</span>
                                                        <span>{new Date(event.start_date_time).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                event.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                            }`}>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                                <Users size={16} className="text-gray-300" />
                                                0 / {event.available_slots}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 text-gray-300 hover:text-indigo-600 transition">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}