import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, Box } from 'lucide-react';

const Navbar = () => {

  const navLinks = [
    { name: 'Home', path: '/', icon: <GraduationCap size={18} /> },
    { name: 'Browse', path: '/browse', icon: <Box size={18} /> },
    { name: 'Post', path: '/post', icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <nav className="glass-morphism fixed top-0 left-0 right-0 z-50">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10 bg-surface shadow-lg transition-transform group-hover:scale-110">
            <img
              src="/qudahspot_logo_icon.png"
              alt="QudahSpot Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-bold tracking-tight">Qudah<span className="text-indigo-400">Spot</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-medium transition-colors hover:text-indigo-400 ${isActive ? 'text-indigo-400' : 'text-text-muted'}`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
