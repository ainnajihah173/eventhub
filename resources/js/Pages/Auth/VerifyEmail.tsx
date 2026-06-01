import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { MailCheck, LogOut, Send, CheckCircle2 } from 'lucide-react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
            <Head title="Email Verification" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[440px] bg-white border border-gray-100 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center"
            >
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
                    <MailCheck size={40} />
                </div>

                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">Verify your email</h1>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you?
                </p>

                {status === 'verification-link-sent' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-2 text-emerald-700 text-sm font-medium"
                    >
                        <CheckCircle2 size={18} />
                        A new link has been sent to your inbox.
                    </motion.div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <button 
                        disabled={processing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-indigo-100"
                    >
                        <span>Resend Email</span>
                        <Send size={18} />
                    </button>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full py-3 text-sm font-semibold text-gray-400 hover:text-gray-600 transition flex items-center justify-center gap-2"
                    >
                        <LogOut size={16} />
                        Log Out
                    </Link>
                </form>
            </motion.div>
        </div>
    );
}