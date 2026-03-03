import React, { useState } from 'react';
import { useMaterials } from '../context/MaterialContext';
import { Rocket, Trash2, Gauge, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLLEGES } from '../data/mockData';
import { db } from '../firebase';
import { collection, serverTimestamp, writeBatch, doc, getDocs, query, where } from 'firebase/firestore';

const LoadTester = () => {
    const { isAdmin, authLoading } = useMaterials();
    const [status, setStatus] = useState('idle'); // idle, injecting, cleaning, success
    const [count, setCount] = useState(0);

    if (authLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={40} />
        </div>
    );

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="premium-card p-12 text-center max-w-md">
                    <AlertTriangle className="text-rose-500 mx-auto mb-6" size={48} />
                    <h1 className="text-2xl font-black mb-4">Access Restricted</h1>
                    <p className="text-text-muted mb-8 text-sm">You must be an administrator to access the Load Testing suite.</p>
                </div>
            </div>
        );
    }

    const generateMockPosts = async () => {
        setStatus('injecting');
        setCount(0);

        const adjectives = ['Advanced', 'Comprehensive', 'Simplified', 'Essential', 'Key', 'Master', 'Pocket', 'Ultimate'];
        const subjects = ['Calculus', 'Physics', 'Biology', 'History', 'Programming', 'Marketing', 'Economics', 'Chemistry'];
        const types = ['Notes', 'Summary', 'Slides', 'Lab Report', 'Guide', 'Flashcards'];

        const CHUNK_SIZE = 50;
        const TOTAL = 2000;

        try {
            for (let i = 0; i < TOTAL; i += CHUNK_SIZE) {
                const batch = writeBatch(db);
                for (let j = 0; j < CHUNK_SIZE; j++) {
                    const materialRef = doc(collection(db, "materials"));
                    const title = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${subjects[Math.floor(Math.random() * subjects.length)]} ${types[Math.floor(Math.random() * types.length)]} #${i + j + 1}`;

                    batch.set(materialRef, {
                        title,
                        giver: 'Mock Bot',
                        college: COLLEGES[Math.floor(Math.random() * COLLEGES.length)],
                        price: Math.random() > 0.5 ? 'Free' : (0.25 * Math.floor(Math.random() * 4 + 1)).toFixed(2) + ' JOD',
                        description: 'This is a mock post generated for load testing. It contains placeholder text to simulate content volume.',
                        contactType: 'WhatsApp',
                        contactValue: '96270000000',
                        userId: 'mock-test-id',
                        approved: true,
                        isMock: true,
                        createdAt: serverTimestamp()
                    });
                }
                await batch.commit();
                setCount(i + CHUNK_SIZE);
            }
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('idle');
        }
    };

    const cleanupMockPosts = async () => {
        setStatus('cleaning');
        try {
            const q = query(collection(db, "materials"), where("isMock", "==", true));
            const querySnapshot = await getDocs(q);

            const docs = querySnapshot.docs;

            // Delete in chunks of 500 (Firestore batch limit)
            for (let i = 0; i < docs.length; i += 500) {
                const batch = writeBatch(db);
                const chunk = docs.slice(i, i + 500);
                chunk.forEach(d => batch.delete(d.ref));
                await batch.commit();
            }

            setStatus('idle');
            setCount(0);
        } catch (error) {
            console.error(error);
            setStatus('idle');
        }
    };

    return (
        <div className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
            <div className="bg-glow">
                <div className="glow-1" />
                <div className="glow-2" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card p-12 text-center"
            >
                <div className="w-20 h-20 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary mx-auto mb-8 border border-primary/20 shadow-2xl">
                    <Gauge size={40} />
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Load <span className="gradient-text">Testing Suite</span></h1>
                <p className="text-text-muted mb-12 max-w-md mx-auto leading-relaxed">
                    Internal tool to stress-test the database and UI performance before public deployment.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                        disabled={status !== 'idle' && status !== 'success'}
                        onClick={generateMockPosts}
                        className="flex flex-col items-center gap-6 p-10 glass rounded-[40px] hover:bg-white/5 transition-all group border-white/5 disabled:opacity-50"
                    >
                        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-xl">
                            {status === 'injecting' ? <Loader2 className="animate-spin" size={32} /> : <Rocket size={32} />}
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-black mb-2">Inject 2000 Posts</h3>
                            <p className="text-xs text-text-dim uppercase tracking-widest font-black">Simulation mode</p>
                        </div>
                    </button>

                    <button
                        disabled={status !== 'idle' && status !== 'success'}
                        onClick={cleanupMockPosts}
                        className="flex flex-col items-center gap-6 p-10 glass rounded-[40px] hover:bg-rose-500/5 transition-all group border-rose-500/10 disabled:opacity-50"
                    >
                        <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform shadow-xl">
                            {status === 'cleaning' ? <Loader2 className="animate-spin" size={32} /> : <Trash2 size={32} />}
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-black mb-2">Clear Mock Data</h3>
                            <p className="text-xs text-rose-500/50 uppercase tracking-widest font-black">Revert changes</p>
                        </div>
                    </button>
                </div>

                <AnimatePresence>
                    {(status === 'injecting' || status === 'cleaning' || status === 'success') && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-12 overflow-hidden"
                        >
                            <div className="p-8 glass-pill rounded-3xl border-primary/20">
                                {status === 'injecting' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between px-2">
                                            <span className="text-xs font-black uppercase tracking-widest text-primary">Creating Materials...</span>
                                            <span className="font-black text-primary">{Math.round((count / 2000) * 100)}%</span>
                                        </div>
                                        <div className="bg-white/5 h-3 rounded-full overflow-hidden p-0.5 border border-white/5">
                                            <motion.div
                                                className="bg-primary h-full rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(count / 2000) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-[10px] text-text-dim text-center uppercase tracking-widest font-bold">Injecting batch: {count}/2000</p>
                                    </div>
                                )}
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        className="flex flex-col items-center gap-4 text-emerald-400"
                                    >
                                        <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
                                            <CheckCircle size={24} />
                                        </div>
                                        <span className="font-black">DATABASE STRESSED - 2000 POSTS LIVE</span>
                                    </motion.div>
                                )}
                                {status === 'cleaning' && (
                                    <div className="flex flex-col items-center gap-4 text-rose-400">
                                        <Loader2 className="animate-spin" size={32} />
                                        <span className="font-black uppercase tracking-widest text-xs">Purging all mock entries...</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-16 p-8 glass rounded-[32px] border-amber-500/10 text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <AlertTriangle size={80} />
                    </div>
                    <div className="flex gap-6 relative z-10">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 shrink-0 border border-amber-500/20">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-amber-500 mb-2">Performance Analytics</h4>
                            <p className="text-sm text-text-dim leading-relaxed mb-4">
                                Firestore is highly scalable and handles millions of reads. The primary bottleneck will be the <b>React Virtual DOM</b> rendering 2000+ cards at once if not using pagination.
                            </p>
                            <ul className="text-xs text-text-muted space-y-2 list-disc pl-4 font-medium">
                                <li>Current Browse page uses real-time <code>onSnapshot</code> listeners.</li>
                                <li>2000 items is a heavy load for mobile browsers.</li>
                                <li>30 concurrent users will have zero impact on Firestore's speed.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoadTester;
