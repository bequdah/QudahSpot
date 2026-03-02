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
            return `https://wa.me/${material.contactValue.replace(/\D/g, '')}`;
        }
        return `https://instagram.com/${material.contactValue.replace('@', '')}`;
    };

    return (
        <div className="container">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-bold mb-2">Browse <span className="text-primary">Material</span></h1>
                {isAdmin && (
                    <div className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full border border-primary/20 uppercase tracking-widest animate-pulse">
                        Admin Mode Active
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

                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <BookOpen size={24} />
                                </div>
                                <div className="text-right">
                                    <span className={`text-sm font-bold ${material.price === 'Free' ? 'text-green-400' : 'text-primary'}`}>
                                        {material.price}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{material.title}</h3>
                            <p className="text-text-muted text-sm mb-6 line-clamp-2">{material.description}</p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                                    <GraduationCap size={14} className="text-primary" />
                                    <span>{material.college}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                                    <FileText size={14} className="text-primary" />
                                    <span>{material.subject}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                                    <MessageSquare size={14} className="text-primary" />
                                    <span>Owner: {material.giver}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <a
                                    href={getContactLink(material)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary flex-grow text-sm py-2"
                                >
                                    Contact via {material.contactType}
                                </a>
                                <div className="btn-secondary p-2 aspect-square flex items-center justify-center" title={material.contactType}>
                                    {material.contactType === 'WhatsApp' ? <Phone size={18} /> : <Instagram size={18} />}
                                </div>
                            </div>
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

