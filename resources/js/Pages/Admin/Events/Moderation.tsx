import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, router, Link } from '@inertiajs/react';
import { Check, X, Search, ChevronUp, ChevronDown, Eye, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Moderation({ events, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [rejectingEvent, setRejectingEvent] = useState<any>(null);
    const [adminNote, setAdminNote] = useState('');
    const placeholderGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

    // Handle Search
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.events.moderation'), { search, sort: filters.sort, order: filters.order }, { preserveState: true });
    };

    // Handle Sorting
    const toggleSort = (field: string) => {
        const order = filters.sort === field && filters.order === 'asc' ? 'desc' : 'asc';
        router.get(route('admin.events.moderation'), { search, sort: field, order });
    };

    const submitReject = () => {
        router.post(route('admin.events.reject', rejectingEvent.id), { admin_note: adminNote }, {
            onSuccess: () => { setRejectingEvent(null); setAdminNote(''); }
        });
    };

    return (
        <DashboardLayout>
            <Head title="Event Moderation" />
            
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Event Moderation</h1>
                    <p className="text-slate-500 text-sm">Review event details and organizer credentials.</p>
                </div>
                
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input 
                        className="bg-white border-gray-100 rounded-2xl pl-12 pr-4 py-3 w-80 shadow-sm focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                        placeholder="Search events or organizers..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>
            </div>

            <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                        <tr>
                                <th className="px-6 py-5">Thumb</th>
                                <th className="px-8 py-5 cursor-pointer hover:text-indigo-600" onClick={() => toggleSort('title')}>Title & Description</th>
                                <th className="px-8 py-5">When & Where</th>
                                <th className="px-8 py-5">Organizer</th>
                                <th className="px-8 py-5 cursor-pointer hover:text-indigo-600" onClick={() => toggleSort('price')}>Price / person</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                            {events.data.map((event: any) => (
                                <tr key={event.id} className="hover:bg-gray-50/30 transition group">
                                    <td className="px-6 py-6">
                                        {event.thumbnail ? (
                                                <div className="w-20 h-12 rounded overflow-hidden bg-gray-100 relative">
                                                    <img src={`/storage/${event.thumbnail}`} className="w-full h-full object-cover" onError={(e:any) => { e.currentTarget.style.display = 'none'; const fb = e.currentTarget.nextElementSibling as HTMLElement; if (fb) fb.style.display = 'flex'; e.currentTarget.src = placeholderGif; }} />
                                                    <div style={{ display: 'none' }} className="absolute inset-0 flex items-center justify-center text-xs text-gray-300">No image</div>
                                                </div>
                                            ) : (
                                                <div className="w-20 h-12 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-300">No image</div>
                                            )}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-slate-900">{event.title}</div>
                                        <div className="text-sm text-gray-600 mt-2">
                                            {event.description ? (event.description.length > 30 ? event.description.slice(0, 30) + '…' : event.description) : <span className="text-gray-400">No description</span>}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-600">
                                        {event.start_date_time || '—'} <span className="text-gray-300">—</span> {event.end_date_time || '—'}
                                        <div className="text-xs text-gray-400 mt-1">{event.location || '—'}</div>
                                    </td>
                                    <td className="px-8 py-6 text-sm">
                                        <div className="font-bold text-indigo-600">{event.user?.name || 'Unknown'}</div>
                                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                                            {event.user?.organizer_profile?.org_name || 'Individual'}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-slate-700">RM {event.price ?? '0.00'}</td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => router.post(route('admin.events.approve', event.id))} className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition shadow-sm"><Check size={18}/></button>
                                            <button onClick={() => setRejectingEvent(event)} className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition shadow-sm"><X size={18}/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                
                {/* Simple Paging */}
                <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-center gap-2">
                    {events.links.map((link: any, i: number) => (
                        <Link 
                            key={i} 
                            href={link.url} 
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-400 hover:text-indigo-600'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Rejection Modal */}
            <AnimatePresence>
                {rejectingEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRejectingEvent(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl">
                            <h3 className="text-xl font-bold mb-2">Reject Event</h3>
                            <p className="text-sm text-gray-500 mb-6">Explain to {rejectingEvent.user.name} why this event is not suitable.</p>
                            <textarea 
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 mb-6 focus:ring-2 focus:ring-rose-500 outline-none transition"
                                rows={4}
                                placeholder="E.g. Incomplete information, blurry thumbnail..."
                                onChange={e => setAdminNote(e.target.value)}
                            />
                            <div className="flex gap-3">
                                <button onClick={() => setRejectingEvent(null)} className="flex-1 py-3 text-sm font-bold text-gray-400">Cancel</button>
                                <button onClick={submitReject} className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-bold">Submit Rejection</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}