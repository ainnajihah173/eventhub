import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Search, Mail, UserCheck, Download } from 'lucide-react';
import { useState } from 'react';

export default function Attendees({ event, bookings }: any) {
    const [search, setSearch] = useState('');

    // Local filter for the current page
    const filteredBookings = bookings.data.filter((b: any) => 
        b.user.name.toLowerCase().includes(search.toLowerCase()) || 
        b.user.email.toLowerCase().includes(search.toLowerCase()) ||
        b.booking_reference.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout>
            <Head title={`Attendees - ${event.title}`} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <Link href={route('organizer.events.index')} className="text-xs font-bold text-gray-400 hover:text-indigo-600 flex items-center gap-1 mb-2">
                        <ArrowLeft size={14} /> Back to Events
                    </Link>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">{event.title}</h1>
                    <p className="text-slate-500 text-sm">Guest List & Check-in Status</p>
                </div>

                <div className="flex gap-3">
                    <button className="bg-white border border-gray-100 p-3 rounded-xl text-slate-600 hover:bg-gray-50 transition">
                        <Download size={20} />
                    </button>
                    <div className="relative">
                        <Search className="absolute left-4 top-3 text-gray-400" size={18} />
                        <input 
                            className="bg-white border-gray-100 rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 transition"
                            placeholder="Search guests..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100 text-[10px] uppercase font-black text-gray-400 tracking-widest">
                        <tr>
                            <th className="px-8 py-5">Guest</th>
                            <th className="px-8 py-5">Reference</th>
                            <th className="px-8 py-5">Status</th>
                            <th className="px-8 py-5 text-right">Registered</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredBookings.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-8 py-20 text-center text-gray-400 italic">No attendees found.</td>
                            </tr>
                        ) : (
                            filteredBookings.map((booking: any) => (
                                <tr key={booking.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs">
                                                {booking.user.name[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm">{booking.user.name}</div>
                                                <div className="text-xs text-gray-400 flex items-center gap-1"><Mail size={10}/> {booking.user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <code className="text-[11px] font-mono bg-slate-100 px-2 py-1 rounded text-slate-600 tracking-tighter">
                                            {booking.booking_reference}
                                        </code>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${
                                            booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right text-xs text-gray-400 font-medium">
                                        {new Date(booking.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}