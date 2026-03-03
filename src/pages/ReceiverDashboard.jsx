import React, { useState } from 'react';
import { Search, Filter, Box, User, Phone, Instagram, Trash2, Sparkles, AlertCircle, GraduationCap, ChevronDown } from 'lucide-react';
import { useMaterials } from '../context/MaterialContext';
import { COLLEGES } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const ReceiverDashboard = () => {
    const { allMaterials, isAdmin, deleteMaterial } = useMaterials();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('All');
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const filteredMaterials = allMaterials.filter(material => {
        const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            material.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            material.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCollege = selectedCollege === 'All' || material.college === selectedCollege;
        const isApproved = material.approved === true;

        return matchesSearch && matchesCollege && isApproved;
    });

    const getContactLink = (material) => {
        const value = material.contactValue.trim();
        if (material.contactType === 'WhatsApp') {
            let phone = value.replace(/\D/g, '');
            if (phone.startsWith('0') && phone.length === 10) phone = '962' + phone.substring(1);
            else if (phone.startsWith('7') && phone.length === 9) phone = '962' + phone;
            return `https://wa.me/${phone}`;
        }
        return `https://instagram.com/${value.replace('@', '')}`;
    };

    return (
        <div className="relative min-h-[90vh] pb-20 px-6">
            {/* Ambient Background Effects */}
            <div className="bg-glow">
                <div className="glow-1" />
                <div className="glow-2" />
            </div>

            <div className="max-w-7xl mx-auto pt-12 md:pt-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 px-2">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black tracking-tight"
                        >
                            Browse <span className="gradient-text">Materials</span>
                        </motion.h1>
                    </div>

                    {isAdmin && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20 backdrop-blur-md">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Admin Access</span>
                        </div>
                    )}
                </div>

                {/* Search & Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass p-2 rounded-[24px] mb-12 flex flex-col md:flex-row gap-2 shadow-2xl border border-white/5"
                >
                    <div className="relative flex-grow">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                        <input
                            className="premium-input !pl-14 w-full h-14 border-none bg-transparent text-white placeholder:text-text-dim/50"
                            placeholder="What material are you looking for?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="h-px md:h-10 md:w-px bg-white/10 my-2 md:my-auto mx-2" />
                    <div className="relative min-w-[280px]">
                        <select
                            className="premium-input pl-6 pr-12 w-full h-14 border-none bg-transparent appearance-none cursor-pointer font-bold text-sm"
                            value={selectedCollege}
                            onChange={(e) => setSelectedCollege(e.target.value)}
                        >
                            <option value="All">All University Colleges</option>
                            {COLLEGES.map(college => (
                                <option key={college} value={college} className="bg-background">{college}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" size={16} />
                    </div>
                </motion.div>

                {/* Materials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredMaterials.map((material, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="premium-card p-8 flex flex-col group relative overflow-hidden transition-all duration-300 border border-white/10"
                                key={material.id}
                            >
                                {/* Header: Tags */}
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
                                        <GraduationCap size={14} className="text-secondary shrink-0" />
                                        <span className="text-[11px] font-black uppercase tracking-widest text-text-dim">
                                            {material.college}
                                        </span>
                                    </div>

                                    <span className={`text-[12px] font-black px-4 py-2 rounded-xl uppercase tracking-widest border shadow-2xl transition-all ${material.price === 'Free'
                                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-600/20'
                                        : 'bg-indigo-600 text-white border-indigo-400 shadow-indigo-600/20'
                                        }`}>
                                        {material.price}
                                    </span>
                                </div>

                                {/* Content: Balanced Center Layout */}
                                <div className="flex flex-col items-center text-center mb-8">
                                    <h3 className="text-3xl font-black leading-tight group-hover:text-primary transition-colors mb-4 line-clamp-2 min-h-[4.5rem] flex items-center">
                                        {material.title}
                                    </h3>

                                    <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-white/5 rounded-full border border-white/5 mb-6 group-hover:bg-primary/10 transition-colors">
                                        <User size={14} className="text-primary" />
                                        <span className="text-[10px] uppercase font-black tracking-[0.2em] text-text-dim">
                                            Shared by <span className="text-white">{material.giver}</span>
                                        </span>
                                    </div>

                                    <p className="text-text-dim text-sm line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                        {material.description}
                                    </p>
                                </div>

                                {/* Action Area */}
                                <div className="mt-auto pt-6 border-t border-white/5 relative z-30">
                                    <a
                                        href={getContactLink(material)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full h-14 rounded-2xl flex items-center justify-center gap-4 transition-all active:scale-[0.97] group/btn shadow-2xl border border-white/10 cursor-pointer ${material.contactType === 'WhatsApp'
                                            ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20'
                                            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:brightness-110 shadow-purple-500/20'
                                            }`}
                                    >
                                        {material.contactType === 'WhatsApp' ? <Phone size={18} /> : <Instagram size={18} />}
                                        <span className="text-[11px] font-black uppercase tracking-[0.25em]">Get Material Now</span>
                                        <Sparkles size={18} className="group-hover/btn:rotate-12 transition-transform" />
                                    </a>
                                </div>

                                {/* Admin Actions: Corner Hover */}
                                {isAdmin && (
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                                        {confirmDeleteId === material.id ? (
                                            <div className="flex items-center gap-1 bg-rose-500 p-1 rounded-lg shadow-2xl">
                                                <button
                                                    onClick={(e) => { e.preventDefault(); deleteMaterial(material.id); }}
                                                    className="bg-white text-rose-600 text-[8px] font-black px-2 py-1.5 rounded"
                                                >CONFIRM</button>
                                                <button
                                                    onClick={(e) => { e.preventDefault(); setConfirmDeleteId(null); }}
                                                    className="text-white text-[8px] font-black px-2 py-1.5"
                                                >X</button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={(e) => { e.preventDefault(); setConfirmDeleteId(material.id); }}
                                                className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center border border-rose-500/20 backdrop-blur-xl"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredMaterials.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-32 text-center glass rounded-[40px] mt-12 border border-white/5"
                    >
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <AlertCircle size={48} className="text-text-dim opacity-20" />
                        </div>
                        <h3 className="text-3xl font-black mb-3">No results found</h3>
                        <p className="text-text-dim text-lg">Try adjusting your filters or search keywords.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ReceiverDashboard;

