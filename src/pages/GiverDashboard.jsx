import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, FileText, Share2, DollarSign, Phone, Instagram, Send, ArrowRight, Lock } from 'lucide-react';
import { useMaterials } from '../context/MaterialContext';
import { COLLEGES } from '../data/mockData';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GiverDashboard = () => {
    const { allMaterials, addMaterial, updateMaterial, deleteMaterial, currentUser, authLoading } = useMaterials();
    const navigate = useNavigate();

    // Reset user identity based on Firebase Auth
    const userName = currentUser?.displayName || 'Student';

    const materials = allMaterials.filter(m => m.userId === currentUser?.uid);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const [newMaterial, setNewMaterial] = useState({
        title: '',
        giver: userName,
        college: COLLEGES[0],
        price: 'Free',
        description: '',
        contactType: 'WhatsApp',
        contactValue: ''
    });

    // Update form name when user changes
    useEffect(() => {
        if (currentUser) {
            setNewMaterial(prev => ({ ...prev, giver: currentUser.displayName || 'Student' }));
        }
    }, [currentUser]);

    if (authLoading) return <div className="container py-20 text-center text-text-muted">Loading Auth...</div>;

    if (!currentUser) {
        return (
            <div className="container py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card max-w-2xl mx-auto py-20 px-12 text-center"
                >
                    <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary shadow-2xl shadow-primary/20">
                        <Lock size={48} />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">Login to <span className="text-primary">Share</span></h1>
                    <p className="text-xl text-text-muted mb-12">
                        To maintain a safe and quality environment, only registered students can post materials.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/login" className="btn-primary py-4 px-10 text-lg">
                            Log In / Sign Up
                        </Link>
                        <Link to="/browse" className="btn-secondary py-4 px-10 text-lg">
                            Keep Browsing
                        </Link>
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
            // Sanitize WhatsApp number for Jordan
            let processedMaterial = { ...newMaterial };
            if (processedMaterial.contactType === 'WhatsApp') {
                let digits = processedMaterial.contactValue.replace(/\D/g, '');
                if (digits.startsWith('0') && digits.length === 10) {
                    processedMaterial.contactValue = '+962' + digits.substring(1);
                } else if (digits.startsWith('7') && digits.length === 9) {
                    processedMaterial.contactValue = '+962' + digits;
                } else if (digits.length === 12 && digits.startsWith('962')) {
                    processedMaterial.contactValue = '+' + digits;
                }
            }

            if (editingId) {
                await updateMaterial({ ...processedMaterial, id: editingId });
            } else {
                await addMaterial(processedMaterial);
            }
            resetForm();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Failed to post:", error);
            alert("حدث خطأ أثناء النشر، حاول مرة أخرى.");
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

    const handleDelete = (id) => {
        deleteMaterial(id);
        setConfirmDeleteId(null);
    };

    return (
        <div className="container pt-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Post Your <span className="text-primary italic">Material</span></h1>
                    <div className="h-1 w-24 bg-primary rounded-full mt-4" />
                </div>
            </div>

            {showForm && (
                <div className="card mb-12 animate-fade-in border-primary/50" id="form-section">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Share2 className="text-primary" size={24} /> {editingId ? 'Edit Material Details' : 'Paper Details'}
                    </h2>
                    <form onSubmit={handleAddMaterial} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Material Title</label>
                            <input
                                required
                                placeholder="e.g. Calculus I Midterm Notes"
                                value={newMaterial.title}
                                onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">College / Faculty</label>
                            <select
                                required
                                value={newMaterial.college}
                                onChange={(e) => setNewMaterial({ ...newMaterial, college: e.target.value })}
                            >
                                {COLLEGES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Price (Free to 1 JOD)</label>
                            <select
                                value={newMaterial.price}
                                onChange={(e) => setNewMaterial({ ...newMaterial, price: e.target.value })}
                            >
                                <option value="Free">Free</option>
                                <option value="0.25 JOD">0.25 JOD</option>
                                <option value="0.50 JOD">0.50 JOD</option>
                                <option value="0.75 JOD">0.75 JOD</option>
                                <option value="1.00 JOD">1.00 JOD</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Contact Method</label>
                            <div className="flex gap-4">
                                <select
                                    className="w-1/3"
                                    value={newMaterial.contactType}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, contactType: e.target.value })}
                                >
                                    <option value="WhatsApp">WhatsApp</option>
                                    <option value="Instagram">Instagram</option>
                                </select>
                                <input
                                    required
                                    className="flex-grow"
                                    placeholder={newMaterial.contactType === 'WhatsApp' ? '07XXXXXXXX' : '@username'}
                                    value={newMaterial.contactValue}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, contactValue: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-text-muted">Description (Mention contents, quality, etc.)</label>
                            <textarea
                                rows="3"
                                required
                                placeholder="e.g. High-quality handwritten notes for CV, includes previous years' questions..."
                                value={newMaterial.description}
                                onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-4 mt-2">
                            <button type="button" onClick={resetForm} className="btn-secondary">Discard</button>
                            <button type="submit" className="btn-primary px-8">
                                {editingId ? 'Update Material' : 'Post Material'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Your Listed Papers</h2>
                {materials.length === 0 ? (
                    <div className="text-center py-20 glass-morphism rounded-2xl">
                        <p className="text-text-muted mb-4">You haven't listed any papers yet.</p>
                        <button onClick={() => setShowForm(true)} className="text-primary font-bold hover:underline">List Your First Paper</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {materials.map((material) => (
                            <div key={material.id} className="card flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md mb-1 inline-block ${material.approved ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                    {material.approved ? 'Live' : 'Pending Review'}
                                                </span>
                                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{material.title}</h3>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-sm font-bold ${material.price === 'Free' ? 'text-green-400' : 'text-primary'}`}>
                                                {material.price}
                                            </span>

                                        </div>
                                    </div>
                                    <p className="text-sm text-text-muted line-clamp-1">{material.description}</p>
                                </div>
                                <div className="flex gap-2 relative z-50 isolate">
                                    {confirmDeleteId === material.id ? (
                                        <div className="flex items-center gap-2 bg-rose-500/10 p-1 rounded-xl animate-fade-in border border-rose-500/20">
                                            <span className="text-[10px] font-bold text-rose-400 px-2">Sure?</span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(material.id);
                                                }}
                                                className="px-3 py-1.5 bg-rose-500 text-white text-[11px] font-bold rounded-lg hover:bg-rose-600 transition-colors"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setConfirmDeleteId(null);
                                                }}
                                                className="px-3 py-1.5 bg-surface text-text-muted text-[11px] font-bold rounded-lg hover:bg-surface-hover transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(material);
                                                }}
                                                className="p-3 rounded-xl hover:bg-surface-hover text-text-muted transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setConfirmDeleteId(material.id);
                                                }}
                                                className="p-3 rounded-xl hover:bg-rose-500/10 text-rose-500 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── EMPTY STATE or CALL TO ACTION ── */}
            {!showForm && (
                <div className="mt-16">
                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full group relative overflow-hidden rounded-3xl border border-white/5 bg-[#161b22] p-12 text-center transition-all hover:border-indigo-500/30 hover:bg-[#1c2128]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                                <Plus size={40} />
                            </div>
                            <h2 className="mb-3 text-3xl font-bold text-white tracking-tight">Ready to Share?</h2>
                            <p className="max-w-md text-lg text-text-muted leading-relaxed">
                                List your notes, summaries, or exam papers and help your fellow students. It only takes a minute.
                            </p>

                            <div className="mt-8 flex items-center gap-2 font-bold text-indigo-400 uppercase tracking-widest text-xs">
                                <span>Click to Post New Papers</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
};

export default GiverDashboard;

