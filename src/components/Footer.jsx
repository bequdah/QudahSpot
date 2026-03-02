import React from 'react';
import { Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0a0c10] border-t border-white/5 py-12">
            <div className="container flex flex-col items-center gap-8 text-sm text-text-muted">

                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 overflow-hidden rounded-lg border border-white/10 bg-surface shadow-lg shadow-indigo-500/10">
                            <img
                                src="/qudahspot_logo_icon.png"
                                alt="QudahSpot Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="font-bold text-white tracking-tight text-base">QudahSpot</span>
                    </div>

                    <p className="text-center max-w-sm leading-relaxed opacity-70">
                        A dedicated platform for students to share and exchange physical study materials — for free or up to 1 JOD.
                    </p>

                    <a href="tel:0792118641" className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/5 hover:border-primary/50 hover:text-primary transition-all bg-white/[0.02]">
                        <Phone size={16} />
                        <span className="font-medium">0792118641</span>
                    </a>
                </div>

            </div>
        </footer>
    );
};


export default Footer;


