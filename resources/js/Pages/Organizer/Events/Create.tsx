import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, Head, Link } from '@inertiajs/react';
import { Sparkles, Send, MapPin, Calendar, Tag, Users, Clock, Upload, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '', description: '', location: '',
        start_date_time: '', end_date_time: '',
        price: '', available_slots: '', thumbnail: null as File | null
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setData('thumbnail', file);
        setPreview(URL.createObjectURL(file));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('organizer.events.store'));
    };

    const inputClasses = "w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none text-slate-900 placeholder:text-gray-400";

    const handleAIGenerate = async () => {
        if (!data.title || !data.location) {
            alert('Please fill in the Title and Location first!');
            return;
        }

        try {
            const response = await axios.post('/organizer/events/ai-generate', {
                title: data.title,
                location: data.location
            });
            setData('description', response.data.suggestion);
        } catch (error) {
            console.error("AI Error", error);
        }
    };


    return (
        <DashboardLayout>
            <Head title="Create New Event" />

            <div className="mx-auto">
                {/* Header with Back Button */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link
                            href={route('organizer.events.index')}
                            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-indigo-600 transition mb-4 group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            Back to My Events
                        </Link>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Experience</h1>
                        <p className="text-slate-500 text-sm mt-1">Fill in the details to submit your event for moderation.</p>
                    </div>
                </div>

                <form onSubmit={submit} className="flex flex-col lg:flex-row gap-10">

                    {/* LEFT: Poster Preview */}
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-28">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block ml-2">Event Poster</label>
                            <div className="relative aspect-[3/4] bg-white border-2 border-dashed border-gray-100 rounded-[2.5rem] overflow-hidden group hover:border-indigo-200 transition-all cursor-pointer">
                                {preview ? (
                                    <img src={preview} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                                        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                                            <Upload size={24} />
                                        </div>
                                        <p className="text-sm font-bold text-slate-900">Upload Poster</p>
                                        <p className="text-xs text-gray-400 mt-1 italic">JPG or PNG (Max 2MB)</p>
                                    </div>
                                )}
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Form Body */}
                    <div className="flex-1 bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block ml-2">Title</label>
                            <input value={data.title} className={inputClasses} placeholder="Something memorable..." onChange={e => setData('title', e.target.value)} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block ml-2">Starts</label>
                                <div className="relative">
                                    <Calendar className="absolute left-5 top-5 text-gray-400" size={18} />
                                    <input type="datetime-local" value={data.start_date_time} className={`${inputClasses} pl-12`} onChange={e => setData('start_date_time', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block ml-2">Ends</label>
                                <div className="relative">
                                    <Clock className="absolute left-5 top-5 text-gray-400" size={18} />
                                    <input type="datetime-local" value={data.end_date_time} className={`${inputClasses} pl-12`} onChange={e => setData('end_date_time', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block ml-2">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-5 top-5 text-gray-400" size={18} />
                                <input value={data.location} className={`${inputClasses} pl-12`} placeholder="City, Building, or Virtual URL" onChange={e => setData('location', e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-3 ml-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Description</label>
                                <button type="button" onClick={handleAIGenerate} className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:bg-indigo-100 transition">
                                    <Sparkles size={12} /> AI Helper
                                </button>
                            </div>
                            <textarea
                                rows={6}
                                className={inputClasses}
                                placeholder="What makes this event special?"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block ml-2">Price (RM)</label>
                                <input type="number" value={data.price} className={inputClasses} placeholder="0.00" onChange={e => setData('price', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block ml-2">Max Capacity</label>
                                <input type="number" value={data.available_slots} className={inputClasses} placeholder="Slots" onChange={e => setData('available_slots', e.target.value)} />
                            </div>
                        </div>

                        <button disabled={processing} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl shadow-indigo-100 mt-6">
                            Submit to Admin <Send size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}