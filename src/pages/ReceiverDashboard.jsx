import React, { useState } from 'react';
import { Search, Filter, BookOpen, MapPin, Phone, Instagram, ExternalLink, FileText, ArrowRight, GraduationCap, MessageSquare, Trash2 } from 'lucide-react';
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
            material.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            material.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCollege = selectedCollege === 'All' || material.college === selectedCollege;
        const isApproved = material.approved === true; // Only show approved posts

        return matchesSearch && matchesCollege && isApproved;
    });

    const getContactLink = (material) => {
        if (material.contactType === 'WhatsApp') {
            let phone = material.contactValue.replace(/\D/g, ''); // Clear non-digits

            // If starts with 07 and 10 digits (Jordan standard)
            if (phone.startsWith('0') && phone.length === 10) {
                phone = '962' + phone.substring(1);
            }
            // If starts with 7 and 9 digits (local without 0)
            else if (phone.startsWith('7') && phone.length === 9) {
                phone = '962' + phone;
            }

            return `https://wa.me/${phone}`;
        }
        return `https://instagram.com/${material.contactValue.replace('@', '')}`;
    };

    return (
        <div className="container">
            <div className="flex justify-between items-center mb-10">
                <div className="relative">
                    <h1 className="text-4xl font-black tracking-tight">Browse <span className="text-primary italic">Material</span></h1>
                    <div className="h-1 w-20 bg-primary rounded-full mt-4" />
                </div>
                {isAdmin && (
                    <div className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-lg border border-primary/20 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Admin
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-8 mb-12">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                        <input
                            className="pl-12 w-full"
                            placeholder="Search for subjects, topics, or reviews..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative w-full md:w-64">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                        <select
                            className="pl-12 w-full appearance-none"
                            value={selectedCollege}
                            onChange={(e) => setSelectedCollege(e.target.value)}
                        >
                            <option value="All">All Colleges</option>
                            {COLLEGES.map(college => (
                                <option key={college} value={college}>{college}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode='popLayout'>
                    {filteredMaterials.map((material) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="card group hover:border-primary/50 transition-all duration-300 relative"
                            key={material.id}
                        >
                            {isAdmin && (
                                <div className="absolute top-4 right-4 z-50">
                                    {confirmDeleteId === material.id ? (
                                        <div className="flex items-center gap-2 bg-rose-500 p-1 rounded-xl animate-fade-in shadow-xl">
                                            <button
                                                onClick={(e) => { e.preventDefault(); deleteMaterial(material.id); setConfirmDeleteId(null); }}
                                                className="bg-white text-rose-500 text-[10px] font-bold px-3 py-2 rounded-lg hover:bg-rose-50"
                                            >
                                                SURE? DELETE
                                            </button>
                                            <button
                                                onClick={(e) => { e.preventDefault(); setConfirmDeleteId(null); }}
                                                className="bg-rose-600 text-white text-[10px] font-bold px-3 py-2 rounded-lg"
                                            >
                                                NO
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={(e) => { e.preventDefault(); setConfirmDeleteId(material.id); }}
                                            className="w-10 h-10 bg-rose-500/20 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl flex items-center justify-center transition-all border border-rose-500/30"
                                            title="Admin: Delete Post"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Price Badge */}
                            <div className="flex justify-between items-center mb-4">
                                <span className={`text-sm font-black px-4 py-1.5 rounded-xl ${material.price === 'Free' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                                    {material.price}
                                </span>
                                <div className="flex items-center gap-2 text-xs font-bold text-text-muted bg-white/5 px-3 py-1.5 rounded-lg">
                                    <GraduationCap size={14} className="text-primary" />
                                    {material.college}
                                </div>
                            </div>

                            {/* Material Name */}
                            <h3 className="text-xl font-black mb-2 group-hover:text-primary transition-colors leading-tight">{material.title}</h3>

                            {/* Description */}
                            <p className="text-text-muted text-sm mb-6 line-clamp-3 leading-relaxed">{material.description}</p>

                            {/* Contact Info (visible as fallback) */}
                            <div className="flex items-center gap-2 text-xs text-text-muted bg-white/5 px-4 py-2.5 rounded-xl mb-4 border border-white/5">
                                {material.contactType === 'WhatsApp' ? <Phone size={14} className="text-primary shrink-0" /> : <Instagram size={14} className="text-primary shrink-0" />}
                                <span className="font-bold text-white/80 select-all">{material.contactValue}</span>
                            </div>

                            {/* Contact Button */}
                            <a
                                href={getContactLink(material)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary w-full text-sm py-4 rounded-xl flex items-center justify-center gap-3 active:scale-95 font-bold"
                            >
                                {material.contactType === 'WhatsApp' ? <Phone size={18} /> : <Instagram size={18} />}
                                Contact via {material.contactType}
                            </a>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredMaterials.length === 0 && (
                    <div className="col-span-full py-24 text-center glass-morphism rounded-3xl">
                        <Search size={48} className="mx-auto text-text-muted mb-4 opacity-20" />
                        <h3 className="text-xl font-bold mb-2">No papers found</h3>
                        <p className="text-text-muted">Try a different search or subject.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReceiverDashboard;

