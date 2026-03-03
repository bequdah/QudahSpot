import React from 'react';
import { Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-background border-t border-white/5 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <img src="/qudahspot_logo_icon.png" alt="Logo" className="w-8 h-8 rounded-lg" />
                    <span className="font-heading font-black text-xl text-white">QudahSpot</span>
                </div>

                <p className="text-text-dim text-sm text-center md:text-left">
                    A student-driven platform for exchanging study materials easily.
                </p>

                <a href="tel:0792118641" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                    <Phone size={16} />
                    <span className="text-sm font-bold">0792118641</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;


