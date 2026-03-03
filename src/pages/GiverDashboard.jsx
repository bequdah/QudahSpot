import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, FileText, Share2, DollarSign, Phone, Instagram, Send, ArrowRight, Lock, Sparkles, User, GraduationCap, Loader2 } from 'lucide-react';
import { useMaterials } from '../context/MaterialContext';
import { COLLEGES } from '../data/mockData';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GiverDashboard = () => {
    const { allMaterials, addMaterial, updateMaterial, deleteMaterial, currentUser, authLoading, loginWithGoogle } = useMaterials();
    const navigate = useNavigate();

    const userName = currentUser?.displayName || 'Student';
    const materials = allMaterials.filter(m => m.userId === currentUser?.uid);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [loginLoading, setLoginLoading] = useState(false);

    const handleDirectLogin = async () => {
        setLoginLoading(true);
        try {
            await loginWithGoogle();
        } catch (err) {
            console.error("Login failed:", err);
        } finally {
            setLoginLoading(false);
        }
    };

    const [newMaterial, setNewMaterial] = useState({
        title: '',
        giver: userName,
        college: COLLEGES[0],
        price: 'Free',
        description: '',
        contactType: 'WhatsApp',
        contactValue: ''
    });

    useEffect(() => {
        if (currentUser) {
            setNewMaterial(prev => ({ ...prev, giver: currentUser.displayName || 'Student' }));
        }
    }, [currentUser]);

    if (authLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Sparkles className="text-primary" size={40} />
            </motion.div>
        </div>
    );

    if (!currentUser) {
        return (
            <div className="relative min-h-[90vh] flex items-center justify-center p-6 sm:p-12">
                <div className="bg-glow">
                    <div className="glow-1" />
                    <div className="glow-2" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass max-w-xl w-full p-12 py-20 text-center border border-white/10 rounded-[40px] shadow-2xl relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <h1 className="text-4xl font-black mb-6 tracking-tight text-white flex flex-col items-center gap-2 text-center">
                            Welcome to
                            <span className="gradient-text-alt text-5xl">QudahSpot</span>
                        </h1>

                        <p className="text-white/40 text-sm mb-12 max-w-xs text-center leading-relaxed">
                            To start contributing and sharing materials with your fellow students, please sign in to your account.
                        </p>

                        <div className="w-full max-w-xs">
                            <button
                                onClick={handleDirectLogin}
                                disabled={loginLoading}
                                className="w-full h-14 bg-white text-slate-900 font-bold rounded-full flex items-center justify-center gap-4 hover:bg-slate-50 hover:scale-[1.02] transition-all shadow-xl text-lg group/btn disabled:opacity-70"
                            >
                                {loginLoading ? (
                                    <Loader2 className="animate-spin text-primary" size={24} />
                                ) : (
                                    <>
                                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Continue with Google
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    const resetForm = () => {
        setShowForm(false);
        setEditingId(null);
        setNewMaterial({
            title: '',
            giver: userName,
            college: COLLEGES[0],
            price: 'Free',
            description: '',
            contactType: 'WhatsApp',
            contactValue: ''
        });
    };

    const handleAddMaterial = async (e) => {
        e.preventDefault();
        try {
            let processedMaterial = { ...newMaterial };
            if (processedMaterial.contactType === 'WhatsApp') {
                let digits = processedMaterial.contactValue.replace(/\D/g, '');
                // Basic Jordanian number handling
                if (digits.startsWith('0') && digits.length === 10) digits = '962' + digits.substring(1);
                else if (digits.startsWith('7') && digits.length === 9) digits = '962' + digits;
                else if (digits.length === 9) digits = '962' + digits;

                processedMaterial.contactValue = digits;
            } else if (processedMaterial.contactType === 'Instagram') {
                processedMaterial.contactValue = processedMaterial.contactValue.replace('@', '').trim();
            }

            if (editingId) await updateMaterial({ ...processedMaterial, id: editingId });
            else await addMaterial(processedMaterial);

            resetForm();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Failed to post:", error);
        }
    };

    const handleEdit = (material) => {
        setNewMaterial({
            title: material.title,
            giver: material.giver || userName,
            college: material.college || COLLEGES[0],
            price: material.price,
            description: material.description,
            contactType: material.contactType || 'WhatsApp',
            contactValue: material.contactValue || ''
        });
        setEditingId(material.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative min-h-[90vh] pb-20 px-6">
            <div className="bg-glow">
                <div className="glow-1" />
                <div className="glow-2" />
            </div>

            <div className="max-w-7xl mx-auto pt-12 md:pt-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill mb-4"
                        >
                            <Share2 size={14} className="text-primary" />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-primary">
                                Contributor Dashboard
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black tracking-tight"
                        >
                            {editingId ? 'Edit' : 'Post'} Your <span className="gradient-text">Material</span>
                        </motion.h1>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="premium-card p-8 md:p-12 mb-16 border-primary/20"
                        >
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                                    <Sparkles size={24} />
                                </div>
                                <h2 className="text-2xl font-bold">Paper Details</h2>
                            </div>

                            <form onSubmit={handleAddMaterial} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-xs font-black uppercase tracking-widest text-text-dim">Material Title</label>
                                    <input
                                        required
                                        className="premium-input w-full"
                                        placeholder="e.g. Calculus I Midterm Notes"
                                        value={newMaterial.title}
                                        onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-black uppercase tracking-widest text-primary">Sharer Name</label>
                                    <input
                                        required
                                        className="premium-input w-full border-primary/20"
                                        placeholder="Your full name"
                                        value={newMaterial.giver}
                                        onChange={(e) => setNewMaterial({ ...newMaterial, giver: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-black uppercase tracking-widest text-text-dim">College / Faculty</label>
                                    <div className="relative">
                                        <select
                                            required
                                            className="premium-input w-full appearance-none cursor-pointer pr-10"
                                            value={newMaterial.college}
                                            onChange={(e) => setNewMaterial({ ...newMaterial, college: e.target.value })}
                                        >
                                            {COLLEGES.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-dim">
                                            <ArrowRight size={16} className="rotate-90" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-black uppercase tracking-widest text-text-dim">Price</label>
                                    <div className="relative">
                                        <select
                                            className="premium-input w-full appearance-none cursor-pointer pr-10"
                                            value={newMaterial.price}
                                            onChange={(e) => setNewMaterial({ ...newMaterial, price: e.target.value })}
                                        >
                                            <option value="Free" className="bg-slate-900">Free / Voluntary</option>
                                            <option value="0.25 JOD" className="bg-slate-900">0.25 JOD</option>
                                            <option value="0.50 JOD" className="bg-slate-900">0.50 JOD</option>
                                            <option value="0.75 JOD" className="bg-slate-900">0.75 JOD</option>
                                            <option value="1.00 JOD" className="bg-slate-900">1.00 JOD</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-dim">
                                            <ArrowRight size={16} className="rotate-90" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 md:col-span-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-text-dim">Contact Information</label>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="relative sm:w-1/3">
                                            <select
                                                className="premium-input w-full appearance-none cursor-pointer pr-10"
                                                value={newMaterial.contactType}
                                                onChange={(e) => setNewMaterial({ ...newMaterial, contactType: e.target.value })}
                                            >
                                                <option value="WhatsApp" className="bg-slate-900">WhatsApp</option>
                                                <option value="Instagram" className="bg-slate-900">Instagram</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-dim">
                                                <ArrowRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                        <input
                                            required
                                            className="premium-input flex-grow"
                                            placeholder={newMaterial.contactType === 'WhatsApp' ? 'e.g. 079... ' : '@username'}
                                            value={newMaterial.contactValue}
                                            onChange={(e) => setNewMaterial({ ...newMaterial, contactValue: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-4">
                                    <label className="text-xs font-black uppercase tracking-widest text-text-dim">Description</label>
                                    <textarea
                                        rows="4"
                                        required
                                        className="premium-input w-full resize-none"
                                        placeholder="Tell students about the material (Quality, contents, language...)"
                                        value={newMaterial.description}
                                        onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-4 pt-6 border-t border-white/5">
                                    <button type="button" onClick={resetForm} className="px-8 py-3 glass text-white font-bold rounded-xl hover:bg-white/5 transition-all">
                                        Discard
                                    </button>
                                    <button type="submit" className="px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all">
                                        {editingId ? 'Update Post' : 'Share Material'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <FileText className="text-text-dim" size={24} />
                            Your Listed Papers
                        </h2>
                        {!showForm && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-6 py-2 bg-primary/10 text-primary font-bold rounded-xl border border-primary/20 hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                            >
                                <Plus size={18} /> New Post
                            </button>
                        )}
                    </div>

                    {materials.length === 0 ? (
                        <div className="text-center py-20 glass rounded-[32px] border-dashed border-white/10">
                            <p className="text-text-muted mb-6">You haven't shared any materials yet.</p>
                            <button onClick={() => setShowForm(true)} className="gradient-text font-black tracking-tight hover:scale-110 transition-transform">
                                Create Your First Post
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {materials.map((material) => (
                                <motion.div
                                    layout
                                    key={material.id}
                                    className="premium-card p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center"
                                >
                                    <div className="flex-grow min-w-0">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-text-dim border border-white/5">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border ${material.approved
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                        : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                        }`}>
                                                        {material.approved ? 'Live' : 'Reviewing'}
                                                    </span>
                                                    <span className="text-[10px] text-text-dim font-bold uppercase opacity-50 px-2 flex items-center gap-1">
                                                        <GraduationCap size={10} /> {material.college}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold truncate pr-4">{material.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-sm text-text-dim line-clamp-2 max-w-2xl leading-relaxed">
                                            {material.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-white/5">
                                        <div className="flex-grow md:flex-grow-0 md:min-w-[100px] text-center md:text-right pr-4">
                                            <p className="text-[10px] font-black text-text-dim uppercase tracking-widest mb-1">Status</p>
                                            <p className={`font-bold ${material.price === 'Free' ? 'text-emerald-400' : 'text-primary'}`}>{material.price}</p>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(material)}
                                                className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-text-dim hover:text-white transition-all flex items-center justify-center border border-white/5"
                                                title="Edit Post"
                                            >
                                                <Edit size={18} />
                                            </button>

                                            {confirmDeleteId === material.id ? (
                                                <div className="flex items-center gap-1 bg-rose-500 p-1 rounded-xl shadow-xl animate-fade-in">
                                                    <button onClick={() => deleteMaterial(material.id)} className="bg-white text-rose-600 text-[10px] font-black px-3 py-2 rounded-lg">DELETE</button>
                                                    <button onClick={() => setConfirmDeleteId(null)} className="text-white px-2">X</button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setConfirmDeleteId(material.id)}
                                                    className="w-12 h-12 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-all flex items-center justify-center border border-rose-500/10"
                                                    title="Remove Post"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {!showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-20"
                    >
                        <button
                            onClick={() => setShowForm(true)}
                            className="w-full relative premium-card p-12 text-center group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="mb-6 w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-primary/20">
                                    <Plus size={40} />
                                </div>
                                <h2 className="text-3xl font-black mb-3">Ready to contribute?</h2>
                                <p className="text-text-muted max-w-md mx-auto mb-8">
                                    Sharing your notes can help dozens of students. It takes less than a minute to list your material.
                                </p>
                                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs">
                                    <span>Post a new paper now</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default GiverDashboard;

