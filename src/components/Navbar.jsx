import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, Box, User, LogOut } from 'lucide-react';
import { useMaterials } from '../context/MaterialContext';

const Navbar = () => {
  const { currentUser, logout } = useMaterials();

  const navLinks = [
    { name: 'Home', path: '/', icon: <GraduationCap size={18} /> },
    { name: 'Browse', path: '/browse', icon: <Box size={18} /> },
    { name: 'Post', path: '/post', icon: <LayoutDashboard size={18} /> },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <nav className="glass-morphism fixed top-0 left-0 right-0 z-[100] border-b border-white/5">
      <div className="container py-3 h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="relative w-9 h-9 overflow-hidden rounded-xl border border-white/10 bg-surface shadow-lg">
            <img
              src="/qudahspot_logo_icon.png"
              alt="QudahSpot Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-bold tracking-tight hidden sm:block">Qudah<span className="text-indigo-400">Spot</span></span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center bg-white/5 rounded-2xl p-1 px-2 border border-white/5 backdrop-blur-md">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-text-muted hover:text-white'
                }`
              }
            >
              {link.icon}
              <span className="hidden md:inline">{link.name}</span>
            </NavLink>
          ))}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-1">
              <Link to="/profile" className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all">
                <User size={18} />
              </Link>
              <button
                onClick={handleLogout}
                className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                title="Log Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-primary py-2 px-4 text-xs font-bold"
            >
              <span className="hidden xs:inline">Login</span>
              <User size={14} className="xs:hidden" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
