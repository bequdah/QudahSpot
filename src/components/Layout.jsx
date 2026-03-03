import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();
    const isBrowsePage = location.pathname === '/browse';

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-6 pb-16">
                {children}
            </main>

            {!isBrowsePage && <Footer />}
        </div>
    );
};

export default Layout;
