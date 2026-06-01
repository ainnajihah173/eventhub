import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Upload, CheckCircle2, User, Building2, Mail, Lock } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '', email: '', password: '', password_confirmation: '',
        role: 'user', org_name: '', id_proof: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'));
    };

    const inputClasses = "w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200";

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
            <Head title="Create Account" />

            {/* Logo */}
            <div className="mb-8 flex items-center gap-2">
                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-200">E</div>
                <span className="font-bold text-xl tracking-tight text-slate-900">Event<span className="text-indigo-600">Hub</span></span>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[460px] bg-white border border-gray-100 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
            >
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create your account</h1>
                    <p className="text-slate-500 text-sm mt-1">Join thousands of event creators worldwide.</p>
                </div>

                {/* Light Minimalist Role Switcher */}
                <div className="flex p-1 bg-gray-50 rounded-2xl border border-gray-100 mb-8">
                    <button 
                        type="button"
                        onClick={() => setData('role', 'user')}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${data.role === 'user' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    > Attendee </button>
                    <button 
                        type="button"
                        onClick={() => setData('role', 'organizer')}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${data.role === 'organizer' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    > Organizer </button>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input className={inputClasses} placeholder="Full Name" onChange={e => setData('name', e.target.value)} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input type="email" className={inputClasses} placeholder="Email Address" onChange={e => setData('email', e.target.value)} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <AnimatePresence>
                        {data.role === 'organizer' && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-5"
                            >
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input className={inputClasses} placeholder="Organization Name" onChange={e => setData('org_name', e.target.value)} />
                                </div>
                                <div className="relative border-2 border-dashed border-gray-100 rounded-2xl p-6 flex flex-col items-center hover:bg-gray-50 hover:border-indigo-200 transition-all cursor-pointer group">
                                    <Upload className="text-gray-400 mb-2 group-hover:text-indigo-500" size={20} />
                                    <span className="text-xs font-medium text-gray-500 text-center">Upload Proof of Identity <br/><span className="text-gray-400 font-normal">(PDF, JPG)</span></span>
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setData('id_proof', e.target.files ? e.target.files[0] : null)} />
                                    {data.id_proof && <div className="mt-2 flex items-center gap-1 text-indigo-600 text-[11px] font-bold"><CheckCircle2 size={12}/> {data.id_proof.name}</div>}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-5">
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                            <input type="password" className={inputClasses} placeholder="Password" onChange={e => setData('password', e.target.value)} />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                            <input type="password" className={inputClasses} placeholder="Confirm Password" onChange={e => setData('password_confirmation', e.target.value)} />
                        </div>
                    </div>

                    <button 
                        disabled={processing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-indigo-100 mt-4"
                    >
                        <span>{data.role === 'organizer' ? 'Submit Application' : 'Create Account'}</span>
                        <ArrowRight size={18} />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        Already have an account?{' '}
                        <Link href={route('login')} className="text-indigo-600 font-bold hover:text-indigo-700 transition">Log In</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}