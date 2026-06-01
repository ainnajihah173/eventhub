import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'));
    };

    const inputClasses = "w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200";

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
            <Head title="Log in" />

            {/* Logo */}
            <div className="mb-8 flex items-center gap-2">
                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-200">E</div>
                <span className="font-bold text-xl tracking-tight text-slate-900">Event<span className="text-indigo-600">Hub</span></span>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[440px] bg-white border border-gray-100 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
            >
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
                    <p className="text-slate-500 text-sm mt-1">Please enter your details to sign in.</p>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600 text-center">{status}</div>}

                <form onSubmit={submit} className="space-y-5">
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input 
                            type="email" 
                            className={inputClasses} 
                            placeholder="Email Address" 
                            value={data.email}
                            onChange={e => setData('email', e.target.value)} 
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input 
                            type="password" 
                            className={inputClasses} 
                            placeholder="Password" 
                            value={data.password}
                            onChange={e => setData('password', e.target.value)} 
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer group">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                            />
                            <span className="ms-2 text-sm text-gray-500 group-hover:text-gray-700 transition">Remember me</span>
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <button 
                        disabled={processing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-indigo-100 mt-2"
                    >
                        <span>Sign In</span>
                        <LogIn size={18} />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        Don't have an account?{' '}
                        <Link href={route('register')} className="text-indigo-600 font-bold hover:text-indigo-700 transition">
                            Create Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}