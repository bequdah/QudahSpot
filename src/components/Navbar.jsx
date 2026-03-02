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
          <div className="hidden md:flex items-center gap-8">
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

          <div className="flex items-center gap-4 pl-4 border-l border-glass-border">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 text-sm font-bold text-white hover:text-indigo-400 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-primary border border-indigo-500/20">
                    <User size={16} />
                  </div>
                  <span className="hidden sm:inline">{currentUser.displayName || 'User'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-text-muted hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                  title="Log Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary py-2 px-5 text-sm flex items-center gap-2"
              >
                Login <User size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
