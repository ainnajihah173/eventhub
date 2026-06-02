import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Users, Calendar, MapPin, Mail, Clock } from 'lucide-react';

export default function Show({ event, participants }: any) {
    return (
        <DashboardLayout>
            <Head title={`Details - ${event.title}`} />

            <div className="max-w-6xl mx-auto space-y-8">
                <Link 
                    href={route('organizer.events.index')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-indigo-600 transition group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to My Events
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Event Summary Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <img src={event.thumbnail_url} className="w-full aspect-square object-cover rounded-3xl mb-6 shadow-inner bg-slate-50" alt="" />
                            <h2 className="text-2xl font-black text-slate-900 leading-tight mb-4">{event.title}</h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-500 text-sm">
                                    <Calendar size={18} className="text-indigo-500" />
                                    {new Date(event.start_date_time).toLocaleString()}
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 text-sm">
                                    <MapPin size={18} className="text-indigo-500" />
                                    {event.location}
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                                    <Users size={18} className="text-indigo-500" />
                                    {participants.length} / {event.available_slots} Slots Filled
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Participants List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-900">Registered Participants</h3>
                                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tighter">
                                    Confirmed List
                                </span>
                            </div>
                            
                            {participants.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50/50">
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {participants.map((user: any) => (
                                                <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                                                    <td className="px-8 py-5 font-bold text-slate-700">{user.name}</td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                            <Mail size={14} /> {user.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                                                            <Clock size={14} /> {new Date(user.pivot.created_at).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="p-20 text-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300">
                                        <Users size={32} />
                                    </div>
                                    <h4 className="text-slate-900 font-bold">No participants yet</h4>
                                    <p className="text-gray-400 text-sm">Your event details will appear here once users join.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
