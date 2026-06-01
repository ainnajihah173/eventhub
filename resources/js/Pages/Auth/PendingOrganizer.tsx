import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, ShieldCheck, LogOut, Mail } from 'lucide-react';

export default function PendingOrganizer() {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
            <Head title="Application Pending" />

            {/* Logo */}
            <div className="mb-8 flex items-center gap-2">
                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-200">E</div>
                <span className="font-bold text-xl tracking-tight text-slate-900">EventHub <span className="text-indigo-600">Pro</span></span>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[500px] bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center"
            >
                {/* Animated Icon Section */}
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-indigo-100 rounded-full opacity-50"
                    />
                    <div className="relative w-full h-full bg-white border-4 border-indigo-50 rounded-full flex items-center justify-center text-indigo-600 shadow-inner">
                        <Clock size={40} />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">Application Under Review</h1>
                <p className="text-slate-500 text-sm leading-relaxed mb-10 px-4">
                    Thank you for joining EventHub Pro! Our team is currently reviewing your organization details and identity proof. This usually takes <span className="text-indigo-600 font-bold">12-24 hours</span>.
                </p>

                {/* Status Steps */}
                <div className="space-y-4 mb-10 text-left max-w-xs mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 size={14} />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Account Created</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ShieldCheck size={14} />
                            </motion.div>
                        </div>
                        <span className="text-sm font-bold text-slate-900">Admin Verification</span>
                    </div>
                    <div className="flex items-center gap-3 opacity-40">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <Mail size={14} />
                        </div>
                        <span className="text-sm font-medium text-slate-500">Access Granted</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-50 space-y-4">
                    <p className="text-xs text-slate-400">
                        We will send an email notification once your account is active.
                    </p>
                    
                    <div className="flex items-center justify-center gap-6">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm font-bold text-gray-400 hover:text-red-500 transition flex items-center gap-2"
                        >
                            <LogOut size={16} />
                            Log Out
                        </Link>
                        
                        <button 
                            onClick={() => window.location.reload()}
                            className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition"
                        >
                            Refresh Status
                        </button>
                    </div>
                </div>
            </motion.div>

            <p className="mt-8 text-slate-400 text-xs font-medium uppercase tracking-widest">
                Trusted by 500+ Organizers
            </p>
        </div>
    );
}