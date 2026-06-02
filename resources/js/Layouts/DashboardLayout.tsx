import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard, Calendar, Users, ShieldCheck,
    Ticket, Smartphone, Sparkles, CreditCard,
    Settings, LogOut, Search, Heart, UserCircle,
    CheckSquare, Bell, User, ChevronRight, HelpCircle,
    CheckCircle, AlertCircle, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { auth, url, flash } = usePage().props as any;
    const role = auth?.user?.role;

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (flash?.message || flash?.success || flash?.error) {
            setIsVisible(true);
            const timer = setTimeout(() => setIsVisible(false), 5000); // Auto-hide after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [flash]);

    // Navigation Structure (Strictly based on your Project requirements)
    const navigation = {
        admin: [
            {
                label: 'PLATFORM', items: [
                    { label: 'Overview', icon: <LayoutDashboard size={18} />, href: '/dashboard' },
                    { label: 'Organizer Apps', icon: <UserCircle size={18} />, href: '/admin/approvals' },
                ]
            },
            {
                label: 'MODERATION', items: [
                    { label: 'Event Review', icon: <CheckSquare size={18} />, href: route('admin.events.moderation') },
                ]
            }
        ],
        organizer: [
            {
                label: 'MANAGEMENT', items: [
                    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/dashboard' },
                    { label: 'My Events', icon: <Calendar size={18} />, href: '/organizer/events' },
                ]
            },
            {
                label: 'TOOLS', items: [
                    { label: 'Mobile Scanner', icon: <Smartphone size={18} />, href: '#' },
                ]
            }
        ],
        user: [
            {
                label: 'DISCOVERY', items: [
                    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/dashboard' },
                    { label: 'Explore', icon: <Search size={18} />, href: route('events.explore') },
                ]
            },
            {
                label: 'TICKETS', items: [
                    { label: 'My Bookings', icon: <Ticket size={18} />, href: '#' },
                ]
            }
        ]
    };

    const currentNav = navigation[role as keyof typeof navigation] || [];

    return (
        <div className="h-screen bg-[#f8fafc] flex overflow-hidden">
            {/* --- SIDEBAR --- */}
            <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col h-screen sticky top-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">

                {/* Logo Section */}
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center text-white font-black text-xl">
                        E
                    </div>
                    <div>
                        <span className="font-black text-slate-900 tracking-tighter text-lg block leading-none">EVENTHUB</span>
                        {/* <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Pro SaaS</span> */}
                    </div>
                </div>

                {/* Main Navigation Groups */}
                <div className="flex-1 overflow-y-auto px-6 space-y-8 scrollbar-hide">
                    {currentNav.map((group, idx) => (
                        <div key={idx}>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-4">
                                {group.label}
                            </h4>
                            <nav className="space-y-1">
                                {group.items.map((item, i) => {
                                    const isActive = url === item.href;
                                    return (
                                        <Link
                                            key={i}
                                            href={item.href}
                                            className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:bg-gray-50 hover:text-slate-900'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 font-bold text-sm">
                                                {item.icon}
                                                {item.label}
                                            </div>
                                            {isActive && <ChevronRight size={14} className="opacity-50" />}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    ))}

                    {/* ACCOUNT SECTION (Shared by all roles) */}
                    <div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-4">Account</h4>
                        <nav className="space-y-1">
                            <Link href='#' className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:bg-gray-50 hover:text-slate-900 transition font-bold text-sm">
                                <User size={18} /> My Profile
                            </Link>
                            <Link href='#' className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:bg-gray-50 hover:text-slate-900 transition font-bold text-sm">
                                <Settings size={18} /> Settings
                            </Link>
                            <Link href={route('logout')} method="post" as="button" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition font-bold text-sm w-full">
                                <LogOut size={18} /> Logout
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Help/Support Section */}
                <div className="p-6">
                    <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                                <HelpCircle size={18} />
                            </div>
                            <span className="text-xs font-bold text-slate-900">Need Help?</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Check our documentation or contact support.</p>
                        <button className="w-full py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-900 hover:bg-slate-100 transition">
                            Open Tickets
                        </button>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">

                {/* Notification System (Flash Messages) */}
                <div className="fixed top-6 right-6 z-[100] pointer-events-none flex flex-col gap-3 w-full max-w-sm">
                    <AnimatePresence>
                        {(flash?.message || flash?.success) && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                                className="pointer-events-auto bg-white border-l-4 border-emerald-500 shadow-2xl shadow-emerald-100 p-4 rounded-xl flex items-start gap-3"
                            >
                                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                                    <CheckCircle size={18} />
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Success</h5>
                                    <p className="text-sm font-medium text-slate-500 mt-0.5">{flash.message || flash.success}</p>
                                </div>
                            </motion.div>
                        )}

                        {flash?.error && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                                className="pointer-events-auto bg-white border-l-4 border-rose-500 shadow-2xl shadow-rose-100 p-4 rounded-xl flex items-start gap-3"
                            >
                                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                                    <AlertCircle size={18} />
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Error</h5>
                                    <p className="text-sm font-medium text-slate-500 mt-0.5">{flash.error}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Global Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex-shrink-0 flex items-center justify-end px-10">
                    <div className="flex items-center gap-6">
                        <button className="text-slate-400 hover:text-indigo-600"><Bell size={20} /></button>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-900">{auth.user.name}</span>
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                                {auth.user.name[0]}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Viewport */}
                <div className="p-12 w-full max-w-8xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}