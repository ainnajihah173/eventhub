import { Head, useForm, router } from '@inertiajs/react';
import { Check, X, Eye, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/Layouts/DashboardLayout';

interface Props {
    pendingOrganizers: any[];
}

export default function OrganizerApprovals({ pendingOrganizers }: Props) {
    const handleApprove = (id: number) => {
        if (confirm('Approve this organizer?')) {
            router.post(route('admin.approvals.approve', id));
        }
    };

    return (
        <DashboardLayout>
            <Head title="Organizer Approvals" />

            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Organizer Approvals</h1>
                        <p className="text-slate-500 mt-1">Review and manage organizer applications.</p>
                    </div>
                    <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                        <ShieldCheck size={18} />
                        Admin Secured
                    </div>
                </div>

                {pendingOrganizers.length === 0 ? (
                    <div className="bg-white border border-gray-100 rounded-[2rem] p-20 text-center shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Check size={32} />
                        </div>
                        <p className="text-gray-500 font-medium">No pending applications at the moment.</p>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-100 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Organizer</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Documents</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {pendingOrganizers.map((profile) => (
                                    <motion.tr key={profile.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900">{profile.org_name}</span>
                                                <span className="text-sm text-slate-500">{profile.user.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <a 
                                                href={`/storage/${profile.id_proof_path}`} 
                                                target="_blank" 
                                                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition"
                                            >
                                                <FileText size={16} />
                                                View ID Proof
                                                <ExternalLink size={14} />
                                            </a>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button 
                                                    onClick={() => handleApprove(profile.id)}
                                                    className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                                    title="Approve"
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button 
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                    title="Reject"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}