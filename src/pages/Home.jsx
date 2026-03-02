import React from 'react';
import { BookOpen, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="relative flex flex-col overflow-hidden">

            {/* ── BACKGROUND ── */}
            <div className="absolute inset-0 -z-10 bg-[#0d1117]">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-500/5 blur-[120px] rounded-full" />
            </div>

            {/* ── CENTRAL HERO ── */}
            <section className="container relative z-10 flex flex-col lg:flex-row items-center gap-16 py-20 lg:py-32">
                <div className="flex-1 text-center lg:text-left">
                    <div className="badge mb-8 inline-flex">University Material Exchange</div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8">
                        Give Your Materials <br />
                        <span className="gradient-text">A Second Life</span>
                    </h1>

                    <p className="text-text-muted text-xl md:text-2xl mb-12 max-w-2xl lg:mx-0 mx-auto opacity-80 italic" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.01em' }}>
                        The simplest way for students to exchange physical notes, slides, and exams.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                        <Link to="/browse" className="btn-primary px-10 py-4 text-base font-bold">
                            Browse
                        </Link>
                        <Link to="/post" className="btn-secondary px-10 py-4 text-base font-bold">
                            Post
                        </Link>
                    </div>
                </div>

                <div className="flex-1 w-full max-w-2xl animate-fade-in">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] rounded-full group-hover:bg-indigo-500/30 transition-colors" />
                        <img
                            src="/qudahspot_hero_isometric.png"
                            alt="QudahSpot Isometric Illustration"
                            className="relative z-10 w-full h-auto rounded-3xl shadow-2xl border border-white/5 transition-transform group-hover:scale-[1.02] duration-500"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
