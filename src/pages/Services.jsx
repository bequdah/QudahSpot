import React from 'react';
import { ShoppingBag, Coffee, FileText, Zap, MessageCircle, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const allServices = [
    { id: 101, title: "Lab Report Formatting", category: "Academic Support", price: "3 JOD / report", provider: "Khalid B.", description: "Professional formatting of your lab reports according to university standards." },
    { id: 102, title: "Chapter Summarization", category: "Study Aid", price: "5 JOD / chapter", provider: "Hala S.", description: "Concise and clear summarization of any textbook chapter." },
    { id: 103, title: "Campus Coffee Delivery", category: "Delivery", price: "0.5 JOD + Drink", provider: "QuickDrop", description: "Fast coffee delivery from any cafe on campus to your lecture hall." }
];

const Services = () => {
    return (
        <div className="container">
            <div className="mb-12">
                <h1 className="text-3xl font-bold mb-2">Campus <span className="text-primary">Micro-Services</span></h1>
                <p className="text-text-muted">Unique services provided by students for students. Fast, affordable, and reliable.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allServices.map((service, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={service.id}
                        className="card group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-indigo-500/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                {service.category === 'Delivery' ? <Coffee size={24} /> :
                                    service.category === 'Academic Support' ? <FileText size={24} /> : <Zap size={24} />}
                            </div>
                            <div className="flex items-center gap-1 text-sm font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-lg">
                                <Star size={14} className="fill-amber-500" /> 4.9
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                        <p className="text-text-muted text-sm mb-6 leading-relaxed">
                            {service.description}
                        </p>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-xs font-semibold text-text-muted">
                                <Clock size={14} className="text-indigo-400" /> Est. Delivery: 15-30 mins
                            </div>
                            <div className="flex items-center gap-3 text-xs font-semibold text-text-muted">
                                <ShoppingBag size={14} className="text-indigo-400" /> Provider: {service.provider}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-glass-border">
                            <span className="text-lg font-bold text-white">{service.price}</span>
                            <button className="btn-primary flex items-center gap-2 py-2 px-6">
                                Request <MessageCircle size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}

                {/* Add Service Placeholder */}
                <div className="card border-dashed border-2 border-glass-border flex flex-col items-center justify-center text-center py-12 hover:border-primary transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-surface-hover flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
                        <Zap size={24} className="text-text-muted group-hover:text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">Offer a Service</h3>
                    <p className="text-sm text-text-muted px-6">Got a skill or resource to share? Start earning on campus.</p>
                </div>
            </div>

            {/* Featured Service Alert */}
            <div className="mt-16 glass-morphism rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-indigo-500/30">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
                        <Zap size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-1">New Service: AI Tutor Assistant</h2>
                        <p className="text-text-muted">Get help with your assignments from AI-specialized seniors.</p>
                    </div>
                </div>
                <button className="btn-secondary whitespace-nowrap">View Service Details</button>
            </div>
        </div>
    );
};

export default Services;
