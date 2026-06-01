import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import InputError from '@/Components/InputError';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.email'));
    };

    const inputClasses = "w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200";

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
            <Head title="Forgot Password" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[440px] bg-white border border-gray-100 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
            >
                <div className="mb-6">
                    <Link href={route('login')} className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-indigo-600 transition group">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </Link>
                </div>

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reset Password</h1>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                        Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.
                    </p>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600 p-3 bg-green-50 rounded-xl border border-green-100">{status}</div>}

                <form onSubmit={submit} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input 
                            type="email" 
                            className={inputClasses} 
                            placeholder="Enter your email" 
                            value={data.email}
                            autoFocus
                            onChange={e => setData('email', e.target.value)} 
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <button 
                        disabled={processing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-indigo-100"
                    >
                        <span>Send Link</span>
                        <Send size={18} />
                    </button>
                </form>
            </motion.div>
        </div>
    );
}