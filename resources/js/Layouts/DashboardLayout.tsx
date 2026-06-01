import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, Calendar, Users, ShieldAlert, 
    Ticket, Smartphone, Sparkles, CreditCard, 
    Settings, LogOut, Search, Heart, UserCircle, CheckSquare 
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props as any;
    const role = auth.user.role;

    // Navigation logic based on role
    const getNavGroups = () => {
        if (role === 'admin') return [
            {
                label: 'Platform',
                items: [
                    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: route('dashboard') },
                    { label: 'Organizer Apps', icon: <UserCircle size={20} />, href: route('admin.approvals.index') },
                    { label: 'User Manager', icon: <Users size={20} />, href: '#' },
                ]
            },
            {
                label: 'Moderation',
                items: [
                    { label: 'Event Review', icon: <CheckSquare size={20} />, href: '#' },
                    { label: 'Fraud Alerts', icon: <ShieldAlert size={20} />, href: '#' },
                ]
            },
        ];

        if (role === 'organizer') return [
            {
                label: 'Management',
                items: [
                    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: route('dashboard') },
                    { label: 'My Events', icon: <Calendar size={20} />, href: route('organizer.events.index') },
                    { label: 'Bookings & Sales', icon: <CreditCard size={20} />, href: '#' },
                ]
            },
            {
                label: 'SaaS Tools',
                items: [
                    { label: 'AI Helper', icon: <Sparkles size={20} className="text-indigo-500" />, href: '#' },
                    { label: 'QR Check-in', icon: <Smartphone size={20} />, href: '#' },
                ]
            },
        ];

        return [ // Attendee / User
            {
                label: 'Discovery',
                items: [
                    { label: 'Explore Events', icon: <Search size={20} />, href: route('dashboard') },
                    { label: 'My Favorites', icon: <Heart size={20} />, href: '#' },
                ]
            },
            {
                label: 'Orders',
                items: [
                    { label: 'My Tickets', icon: <Ticket size={20} />, href: '#' },
                    { label: 'Billing History', icon: <CreditCard size={20} />, href: '#' },
                ]
            },
        ];
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">E</div>
                    <span className="font-extrabold text-slate-900 tracking-tighter text-xl">Event<span className="text-indigo-600">Hub</span></span>
                </div>

                <div className="flex-1 overflow-y-auto px-6 space-y-8">
                    {getNavGroups().map((group, i) => (
                        <div key={i}>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-4">
                                {group.label}
                            </p>
                            <nav className="space-y-1">
                                {group.items.map((item, j) => (
                                    <Link 
                                        key={j} 
                                        href={item.href} 
                                        className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all duration-200 group font-semibold text-sm"
                                    >
                                        <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-gray-50">
                    <Link href={route('logout')} method="post" as="button" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition w-full font-bold text-sm">
                        <LogOut size={20} /> Logout
                    </Link>
                </div>
            </aside>

            {/* Main Workspace */}
            <main className="flex-1 h-screen overflow-y-auto bg-[#f8fafc]">
                <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-10 px-10 flex items-center justify-between border-b border-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            {auth.user.name[0]}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">{auth.user.name}</p>
                            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{role}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-400 hover:text-indigo-600 transition"><Settings size={20} /></button>
                    </div>
                </header>

                <div className="p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}