import React, { useState } from 'react';
import { useMaterials } from '../context/MaterialContext';
import { Check, Trash2, Shield, Eye, Clock, User, Box, AlertCircle, Sparkles, Filter, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { allMaterials, approveMaterial, deleteMaterial, isAdmin, authLoading } = useMaterials();
    const [filter, setFilter] = useState('pending');
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    if (authLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Shield className="text-primary" size={40} />
            </motion.div>
        </div>
    );

    if (!isAdmin) {
        return (
            <div className="relative min-h-[90vh] flex items-center justify-center p-6 px-6">
                <div className="bg-glow">
                    <div className="glow-1" />
                    <div className="glow-2" />
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="premium-card max-w-md w-full p-12 text-center relative overflow-hidden"
                >
                    <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-rose-500 border border-rose-500/20 shadow-2xl">
                        <Shield size={40} />
                    </div>
                    <h1 className="text-3xl font-black mb-3 text-white">Access <span className="text-rose-500">Denied</span></h1>
                    <p className="text-text-muted mb-10 text-sm leading-relaxed">
                        This area is restricted to administrators. <br />
                        Please log in with an authorized account.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link to="/login" className="px-8 py-4 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20">
                            Switch Account
                        </Link>
                        <Link to="/" className="text-text-dim hover:text-white text-xs font-black uppercase tracking-widest transition-all">
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
        <div className="relative min-h-[90vh] pb-20 px-6">
            <div className="bg-glow">
                <div className="glow-1" />
                <div className="glow-2" />
            </div>

            <div className="max-w-7xl mx-auto pt-12 md:pt-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill mb-4"
                        >
                            <Shield size={14} className="text-primary" />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-primary">
                                Moderation Control
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black tracking-tight"
                        >
                            Admin <span className="gradient-text">Moderation</span>
                        </motion.h1>
                    </div>

                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 backdrop-blur-xl">
                        <button
                            onClick={() => { setFilter('pending'); setConfirmDeleteId(null); }}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'pending' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-dim hover:text-white'}`}
                        >
                            Pending ({pendingCount})
                        </button>
                        <button
                            onClick={() => { setFilter('all'); setConfirmDeleteId(null); }}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-dim hover:text-white'}`}
                        >
                            All Posts
                        </button>
                    </div>
                </div>

                {displayedMaterials.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-24 text-center glass rounded-[32px]"
                    >
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                            <Check className="text-emerald-500" size={32} />
                        </div>
                        <h2 className="text-2xl font-black mb-2">Queue is Clear!</h2>
                        <p className="text-text-dim">No posts currently awaiting moderation.</p>
                    </motion.div>
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
                                    className={`premium-card p-6 md:p-8 flex flex-col lg:flex-row gap-8 border-l-[6px] ${material.approved ? 'border-l-emerald-500' : 'border-l-amber-500 animate-pulse-slow'}`}
                                >
                                    <div className="flex-grow min-w-0">
                                        <div className="flex flex-wrap items-center gap-3 mb-6">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${material.approved
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                    : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                }`}>
                                                {material.approved ? 'Approved' : 'Needs Review'}
                                            </span>
                                            <span className="text-[10px] text-text-dim font-bold flex items-center gap-1.5 px-2">
                                                <Clock size={12} className="opacity-50" />
                                                {material.createdAt?.toDate ? material.createdAt.toDate().toLocaleDateString() : 'Recently Posted'}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-black mb-3 truncate">{material.title}</h3>
                                        <p className="text-text-dim text-sm mb-8 leading-relaxed max-w-3xl pr-4">
                                            {material.description}
                                        </p>

                                        <div className="flex flex-wrap gap-3">
                                            <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                                                <User size={12} className="text-primary" />
                                                <span className="text-xs font-bold">{material.giver}</span>
                                            </div>
                                            <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                                                <GraduationCap size={12} className="text-primary" />
                                                <span className="text-xs font-bold">{material.college}</span>
                                            </div>
                                            <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                                                <span className="text-xs font-black text-emerald-400">{material.price}</span>
                                            </div>
                                            <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 opacity-60">
                                                <span className="text-[10px] font-black uppercase tracking-widest">{material.contactType}</span>
                                                <span className="text-xs font-bold">{material.contactValue}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row lg:flex-col gap-3 justify-center items-center lg:items-end min-w-[200px] lg:border-l lg:border-white/5 lg:pl-8 border-t lg:border-t-0 pt-6 lg:pt-0 border-white/5">
                                        {!material.approved && (
                                            <button
                                                onClick={() => approveMaterial(material.id)}
                                                className="flex-grow w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                                            >
                                                <Check size={20} /> Approve Post
                                            </button>
                                        )}

                                        {confirmDeleteId === material.id ? (
                                            <div className="flex items-center gap-1 bg-rose-500 p-1 rounded-2xl shadow-xl animate-fade-in w-full">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); deleteMaterial(material.id); }}
                                                    className="bg-white text-rose-600 text-[10px] font-black px-4 py-3 rounded-xl flex-grow"
                                                >
                                                    CONFIRM DELETE
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(null); }}
                                                    className="text-white px-4 font-black"
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(material.id); }}
                                                className="flex-grow w-full bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-black py-4 px-8 rounded-2xl border border-rose-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                                            >
                                                <Trash2 size={20} /> {material.approved ? 'Remove' : 'Reject'}
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
