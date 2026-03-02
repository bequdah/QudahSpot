import React, { useState } from 'react';
import { useMaterials } from '../context/MaterialContext';
import { Check, Trash2, Shield, Eye, Clock, User, BookOpen, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const { allMaterials, approveMaterial, deleteMaterial, isAdmin, authLoading } = useMaterials();
    const [filter, setFilter] = useState('pending');
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    if (authLoading) return <div className="container py-20 text-center font-bold text-text-muted">Authenticating Admin...</div>;

    if (!isAdmin) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card max-w-md w-full p-12 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500/50 via-rose-500 to-rose-500/50" />
                    <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-rose-500 border border-rose-500/20 shadow-2xl shadow-rose-500/20">
                        <AlertCircle size={40} />
                    </div>
                    <h1 className="text-3xl font-bold mb-3 text-white">Access <span className="text-rose-500">Denied</span></h1>
                    <p className="text-text-muted mb-10 text-sm leading-relaxed">
                        This area is restricted to administrators. <br />
                        Please log in with an authorized account.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link to="/login" className="btn-primary w-full py-4 text-sm font-bold shadow-xl shadow-primary/20 bg-rose-500 hover:bg-rose-600 border-none">
                            Switch Account
                        </Link>
                        <Link to="/" className="text-text-muted hover:text-white text-xs font-bold transition-all underline underline-offset-4">
                            Return Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    const displayedMaterials = allMaterials.filter(m => {
        if (filter === 'pending') return !m.approved;
        return true;
    });

    const pendingCount = allMaterials.filter(m => !m.approved).length;

    return (
        <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <Shield className="text-primary" size={32} />
                        Admin <span className="text-primary">Moderation</span>
                    </h1>
                    <p className="text-text-muted">Review and manage student posts to maintain quality.</p>
                </div>

                <div className="flex bg-card p-1 rounded-xl border border-white/5">
                    <button
                        onClick={() => { setFilter('pending'); setConfirmDeleteId(null); }}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'pending' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white'}`}
                    >
                        Pending ({pendingCount})
                    </button>
                    <button
                        onClick={() => { setFilter('all'); setConfirmDeleteId(null); }}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'all' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white'}`}
                    >
                        All Posts
                    </button>
                </div>
            </div>

            {displayedMaterials.length === 0 ? (
                <div className="card text-center py-20 border-dashed border-white/10">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="text-text-muted" size={32} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Queue is Clear!</h2>
                    <p className="text-text-muted">No posts currently awaiting moderation.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {displayedMaterials.map((material) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={material.id}
                                className={`card border-l-4 ${material.approved ? 'border-l-green-500' : 'border-l-amber-500'}`}
                            >
                                <div className="flex flex-col lg:flex-row gap-8">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${material.approved ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                {material.approved ? 'Approved / Live' : 'Awaiting Review'}
                                            </span>
                                            <span className="text-xs text-text-muted flex items-center gap-1">
                                                <Clock size={12} /> {material.createdAt?.toDate ? material.createdAt.toDate().toLocaleDateString() : 'Recently'}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-2">{material.title}</h3>
                                        <p className="text-text-muted mb-6 leading-relaxed">{material.description}</p>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-white/5 p-3 rounded-xl">
                                                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Giver</div>
                                                <div className="text-sm font-bold flex items-center gap-2"><User size={14} className="text-primary" /> {material.giver}</div>
                                            </div>
                                            <div className="bg-white/5 p-3 rounded-xl">
                                                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">College</div>
                                                <div className="text-sm font-bold flex items-center gap-2"><BookOpen size={14} className="text-primary" /> {material.college}</div>
                                            </div>
                                            <div className="bg-white/5 p-3 rounded-xl">
                                                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Price</div>
                                                <span className="text-sm font-bold text-green-400">{material.price}</span>
                                            </div>
                                            <div className="bg-white/5 p-3 rounded-xl text-xs text-text-muted">
                                                <div className="text-[10px] uppercase tracking-wider mb-1">Contact</div>
                                                <div className="font-bold text-white">{material.contactType}: {material.contactValue}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row lg:flex-col gap-3 justify-center lg:pt-8 min-w-[200px] relative z-[50]" style={{ pointerEvents: 'auto' }}>
                                        {!material.approved && (
                                            <button
                                                onClick={async (e) => {
                                                    e.stopPropagation();
                                                    try {
                                                        await approveMaterial(material.id);
                                                        alert('✅ Post approved!');
                                                    } catch (err) {
                                                        alert('❌ Error: ' + err.message);
                                                    }
                                                }}
                                                className="flex-grow bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20 cursor-pointer"
                                            >
                                                <Check size={20} /> Approve Post
                                            </button>
                                        )}

                                        {confirmDeleteId === material.id ? (
                                            <div className="flex items-center gap-2 bg-rose-500/10 p-2 rounded-xl animate-fade-in border border-rose-500/20">
                                                <span className="text-[10px] font-bold text-rose-500 px-2 uppercase">Sure?</span>
                                                <button
                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        try {
                                                            await deleteMaterial(material.id);
                                                            setConfirmDeleteId(null);
                                                            alert('🗑️ Post deleted!');
                                                        } catch (err) {
                                                            alert('❌ Error: ' + err.message);
                                                        }
                                                    }}
                                                    className="bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors cursor-pointer"
                                                >
                                                    YES DELETE
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(null); }}
                                                    className="bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                                                >
                                                    NO
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(material.id); }}
                                                className="flex-grow bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-bold py-3 px-6 rounded-xl border border-rose-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                                            >
                                                <Trash2 size={20} /> {material.approved ? 'Delete Post' : 'Reject & Delete'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
