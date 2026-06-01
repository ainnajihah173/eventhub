import { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Lock, ShieldAlert, ArrowRight } from 'lucide-react';
import InputError from '@/Components/InputError';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    const inputClasses = "w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200";

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
            <Head title="Confirm Password" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[440px] bg-white border border-gray-100 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-600">
                        <ShieldAlert size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Secure Area</h1>
                    <p className="text-slate-500 text-sm mt-2">
                        This is a secure area of the application. Please confirm your password before continuing.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input 
                            type="password" 
                            name="password"
                            value={data.password}
                            className={inputClasses} 
                            placeholder="Enter your password" 
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <button 
                        disabled={processing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-indigo-100"
                    >
                        <span>Confirm Access</span>
                        <ArrowRight size={18} />
                    </button>
                </form>
            </motion.div>
        </div>
    );
}