import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, Box, User, LogOut, Menu, X, ShieldAlert } from 'lucide-react';
import { useMaterials } from '../context/MaterialContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { currentUser, logout, isAdmin } = useMaterials();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <GraduationCap size={20} /> },
    { name: 'Browse', path: '/browse', icon: <Box size={20} /> },
    { name: 'Post', path: '/post', icon: <LayoutDashboard size={20} /> },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin', icon: <ShieldAlert size={20} /> });
  }

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-surface/95 backdrop-blur-xl border-b border-white/5">
        <div className="container py-3 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setIsOpen(false)}>
            <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10 bg-primary/10 shadow-lg leading-none">
              <img src="/qudahspot_logo_icon.png" alt="QudahSpot Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-black tracking-tighter">Qudah<span className="text-primary italic">Spot</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 bg-white/5 rounded-2xl p-1 px-2 border border-white/5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-text-muted hover:text-white'
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-white/5">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-surface p-1 pr-3 rounded-2xl border border-white/5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <User size={16} />
                </div>
                <span className="text-sm font-bold text-white max-w-[120px] truncate">{currentUser.displayName || 'User'}</span>
                <button onClick={handleLogout} className="p-1.5 text-text-muted hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary py-2.5 px-6 text-sm font-bold">Login</Link>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button onClick={toggleMenu} className="lg:hidden w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 text-white active:scale-90 transition-all shadow-xl">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Professional Backdrop */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[110] lg:hidden" />

            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 bottom-0 w-[90%] bg-surface z-[120] lg:hidden border-l border-white/10 p-10 flex flex-col shadow-2xl">

              {/* Sidebar Header */}
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
                    <img src="/qudahspot_logo_icon.png" alt="" className="w-8 h-8 object-contain" />
                  </div>
                  <span className="text-2xl font-black tracking-tighter text-white">Qudah<span className="text-primary italic">Spot</span></span>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 text-text-muted active:scale-95">
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links - Large & Clean */}
              <div className="flex-grow space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-6 px-8 py-6 rounded-3xl text-2xl font-black transition-all ${isActive ? 'bg-primary text-white shadow-2xl shadow-primary/40 translate-x-3' : 'text-text-muted hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <div className={location.pathname === link.path ? 'text-white' : 'text-primary'}>
                      {React.cloneElement(link.icon, { size: 32 })}
                    </div>
                    {link.name}
                  </NavLink>
                ))}
              </div>

              {/* Footer / Account Section */}
              <div className="mt-auto pt-10 border-t border-white/5">
                {currentUser ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-5 px-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-xl">
                        <User size={32} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm text-text-muted font-bold opacity-60">Signed in as</p>
                        <p className="text-xl font-black text-white truncate max-w-[200px] leading-tight">{currentUser.displayName || 'User'}</p>
                      </div>
                    </div>
                    <button onClick={handleLogout} className="w-full h-16 bg-rose-500 hover:bg-rose-600 text-white font-black text-lg rounded-3xl flex items-center justify-center gap-4 transition-all shadow-xl shadow-rose-500/20 active:scale-95">
                      <LogOut size={24} /> Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)} className="btn-primary w-full h-16 text-xl font-black rounded-3xl shadow-2xl flex items-center justify-center active:scale-95">Login Account</Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
