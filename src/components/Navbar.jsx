import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, Box, User, LogOut, Menu, X, ShieldAlert } from 'lucide-react';
import { useMaterials } from '../context/MaterialContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { currentUser, logout, isAdmin } = useMaterials();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <GraduationCap size={18} /> },
    { name: 'Browse', path: '/browse', icon: <Box size={18} /> },
    { name: 'Post', path: '/post', icon: <LayoutDashboard size={18} /> },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin', icon: <ShieldAlert size={18} /> });
  }

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 pt-4 ${scrolled ? 'translate-y-0' : 'translate-y-2'
          }`}
      >
        <div
          className={`mx-auto max-w-7xl h-16 flex items-center justify-between px-6 rounded-2xl transition-all duration-500 ${scrolled
            ? 'glass shadow-xl'
            : 'bg-transparent border border-transparent'
            }`}
        >
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <div className="relative w-9 h-9 overflow-hidden rounded-xl border border-white/10 bg-primary/20 shadow-lg group-hover:scale-110 transition-transform">
              <img src="/qudahspot_logo_icon.png" alt="Logo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-black tracking-tighter">
              Qudah<span className="text-primary">Spot</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {currentUser && (
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <User size={14} />
                  </div>
                  <span className="text-xs font-bold text-white max-w-[100px] truncate">
                    {currentUser.displayName || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-text-dim hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 text-text-muted hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-surface z-[120] p-8 flex flex-col shadow-2xl border-l border-white/5"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-bold tracking-tight">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-white/5 rounded-lg text-text-muted"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-4 rounded-xl font-semibold transition-all ${isActive
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'text-text-muted hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/5">
                {currentUser ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/10">
                        <User size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-text-dim">Signed in</p>
                        <p className="font-bold text-white truncate truncate">{currentUser.displayName || 'User'}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full py-4 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <LogOut size={20} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg flex items-center justify-center transition-all active:scale-95"
                  >
                    Get Started
                  </Link>
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
