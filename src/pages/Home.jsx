import React from 'react';
import { ArrowRight, Sparkles, Box, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Ambient Background Effects */}
            <div className="bg-glow">
                <div className="glow-1" />
                <div className="glow-2" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                    <div className="flex-1 text-center lg:text-left z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-8"
                        >
                            Give Your Materials <br />
                            <span className="gradient-text">A Second Life</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-text-muted text-lg md:text-xl mb-12 max-w-2xl lg:mx-0 mx-auto leading-relaxed"
                        >
                            The simplest and most sustainable way for students to exchange physical notes, slides, and exam preparation materials.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <Link
                                to="/browse"
                                className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:shadow-primary/30 active:translate-y-0"
                            >
                                <Box size={20} />
                                Browse Materials
                            </Link>
                            <Link
                                to="/post"
                                className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all hover:bg-white/5"
                            >
                                <LayoutDashboard size={20} />
                                Post Material
                                <ArrowRight size={18} className="text-text-dim" />
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex-1 w-full max-w-2xl relative"
                    >
                        {/* Decorative background for image */}
                        <div className="absolute -inset-4 bg-primary/20 rounded-[40px] blur-3xl opacity-20 animate-pulse" />

                        <div className="relative premium-card p-2">
                            <img
                                src="/qudahspot_hero_isometric.png"
                                alt="QudahSpot Dashboard Preview"
                                className="w-full h-auto rounded-[18px] shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
