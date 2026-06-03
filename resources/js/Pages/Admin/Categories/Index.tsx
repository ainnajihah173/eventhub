import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, LayoutGrid, Monitor, Armchair, X, Search, ArrowUpDown, ChevronLeft, ChevronRight, AlertCircle, Laptop, Users, Hash } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index({ categories }: { categories: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>({ key: 'name', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: '',
        type: 'physical',
        seating_type: 'standard',
        description: ''
    });

    const openCreateModal = () => {
        reset();
        setEditMode(false);
        setIsModalOpen(true);
    };

    const openEditModal = (category: any) => {
        setData({
            name: category.name,
            type: category.type || 'physical',
            seating_type: category.seating_type || 'standard',
            description: category.description || ''
        });
        setEditMode(true);
        setEditingId(category.id);
        setIsModalOpen(true);
    };

    const openDeleteModal = (category: any) => {
        setCategoryToDelete(category);
        setIsDeleteModalOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editMode && editingId) {
            put(route('admin.categories.update', editingId), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        } else {
            post(route('admin.categories.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            router.delete(route('admin.categories.destroy', categoryToDelete.id), {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setCategoryToDelete(null);
                }
            });
        }
    };

    // --- Client-side Filter/Sort/Page Logic ---
    const filteredItems = useMemo(() => {
        let items = [...categories];
        if (searchQuery) {
            items = items.filter(cat => 
                cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (sortConfig) {
            items.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return items;
    }, [categories, searchQuery, sortConfig]);

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredItems.slice(start, start + itemsPerPage);
    }, [filteredItems, currentPage]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <DashboardLayout>
            <Head title="Category Management" />
            
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Categories</h1>
                    <p className="text-slate-500 text-sm">Define how different event types behave.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group hidden md:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input 
                            type="text"
                            placeholder="Search..."
                            className="bg-white border-none rounded-2xl pl-12 pr-6 py-3 shadow-sm focus:ring-4 focus:ring-indigo-500/10 transition-all w-64"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        />
                    </div>
                    <button 
                        onClick={openCreateModal}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 whitespace-nowrap"
                    >
                        <Plus size={20} /> Add Category
                    </button>
                </div>
            </div>

            {/* Category Table */}
            <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                        <tr>
                            <th className="px-8 py-5 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleSort('name')}>
                                <div className="flex items-center gap-2">Category Name <ArrowUpDown size={12}/></div>
                            </th>
                            <th className="px-8 py-5 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleSort('description')}>
                                <div className="flex items-center gap-2">Description <ArrowUpDown size={12}/></div>
                            </th>
                            <th className="px-8 py-5 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleSort('type')}>
                                <div className="flex items-center gap-2">Category Type <ArrowUpDown size={12}/></div>
                            </th>
                            <th className="px-8 py-5 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleSort('seating_type')}>
                                <div className="flex items-center gap-2">Seating <ArrowUpDown size={12}/></div>
                            </th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {paginatedItems.length > 0 ? paginatedItems.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50/30 transition">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900">{cat.name}</div>
                                    <div className="text-xs text-gray-400">{cat.slug}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-xs text-indigo-600  tracking-tight px-3 py-1 rounded-lg w-fit">
                                        <div className="font-bold text-slate-900">{cat.description === null ? 'No Description' : cat.description}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-tight bg-indigo-50 px-3 py-1 rounded-lg w-fit">
                                        {cat.type === 'physical' && <Armchair size={14}/>}
                                        {cat.type === 'online' && <Monitor size={14}/>}
                                        {cat.type === 'hybrid' && <Laptop size={14}/>}
                                        <div className="font-bold text-slate-900">{cat.type}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-tight bg-slate-50 px-3 py-1 rounded-lg w-fit">
                                        {cat.seating_type === 'standard' && <Users size={14}/>}
                                        {cat.seating_type === 'seated' && <Armchair size={14}/>}
                                        <div className="font-bold text-slate-900">{cat.seating_type === 'standard' ? 'No Seating' : cat.seating_type}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => openEditModal(cat)} className="p-2 text-gray-400 hover:text-indigo-600 transition"><Edit2 size={18}/></button>
                                        <button onClick={() => openDeleteModal(cat)} className="p-2 text-gray-400 hover:text-rose-600 transition"><Trash2 size={18}/></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                            <Search size={24} />
                                        </div>
                                        <p className="text-slate-400 font-bold">No categories found.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="p-2 rounded-xl border border-gray-100 bg-white text-slate-400 disabled:opacity-30 hover:text-indigo-600 transition shadow-sm"
                    ><ChevronLeft size={20}/></button>
                    <span className="text-sm font-black text-slate-400 px-4">Page {currentPage} of {totalPages}</span>
                    <button 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="p-2 rounded-xl border border-gray-100 bg-white text-slate-400 disabled:opacity-30 hover:text-indigo-600 transition shadow-sm"
                    ><ChevronRight size={20}/></button>
                </div>
            )}

            {/* --- DELETE CONFIRMATION MODAL --- */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="relative bg-white w-full max-w-sm p-10 rounded-[3rem] shadow-2xl text-center space-y-6"
                        >
                            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto">
                                <Trash2 size={32} />
                            </div>
                            
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Are you sure?</h3>
                                <p className="text-slate-500 text-sm">
                                    You are about to delete <span className="font-bold text-slate-900">"{categoryToDelete?.name}"</span>. 
                                    This action cannot be undone.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 pt-2">
                                <button 
                                    onClick={confirmDelete}
                                    disabled={processing}
                                    className="w-full bg-rose-600 text-white py-4 rounded-2xl font-bold hover:bg-rose-700 transition shadow-lg shadow-rose-100 disabled:opacity-50 flex justify-center items-center gap-2"
                                >
                                    {processing && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />}
                                    Yes, Delete Category
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="w-full bg-slate-50 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-100 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- CREATE / EDIT MODAL --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.form 
                            onSubmit={submit}
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="relative bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl space-y-6"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{editMode ? 'Edit Category' : 'New Category'}</h3>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400"><X size={24}/></button>
                            </div>

                            <div className="space-y-4">
                                {Object.keys(errors).length > 0 && (
                                    <div className="bg-rose-50 p-4 rounded-2xl flex items-center gap-3 text-rose-600">
                                        <AlertCircle size={18} />
                                        <p className="text-xs font-bold uppercase tracking-tight">Please correct the errors below</p>
                                    </div>
                                )}

                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2 ml-2">Name</label>
                                    <input 
                                        autoFocus
                                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-4 focus:ring-indigo-500/5 outline-none transition" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)} 
                                    />
                                    {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2 ml-2">Category Type</label>
                                    <select 
                                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-4 focus:ring-indigo-500/5 outline-none transition"
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value)}
                                    >
                                        <option value="physical">Physical</option>
                                        <option value="online">Online</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                    {errors.type && <p className="text-rose-500 text-xs mt-1">{errors.type}</p>}
                                </div>


                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2 ml-2">Seating Type</label>
                                    <select 
                                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-4 focus:ring-indigo-500/5 outline-none transition"
                                        value={data.seating_type}
                                        onChange={e => setData('seating_type', e.target.value)}
                                    >
                                        <option value="standard">No Seating</option>
                                        <option value="seated">Seated</option>
                                    </select>
                                    {errors.seating_type && <p className="text-rose-500 text-xs mt-1">{errors.seating_type}</p>}
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2 ml-2">Description</label>
                                    <textarea 
                                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4"
                                        rows={3}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                    />
                                    {errors.description && <p className="text-rose-500 text-xs mt-1">{errors.description}</p>}
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={processing}
                                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 disabled:opacity-50 flex justify-center items-center gap-2"
                            >
                                {processing && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />}
                                {editMode ? 'Update Category' : 'Create Category'}
                            </button>
                        </motion.form>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}