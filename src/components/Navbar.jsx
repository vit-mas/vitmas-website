import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import vitmasLogo from '../assets/vitmas_logo.png';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name : 'HOME', path: '/'},
    { name: 'ABOUT', path: '/about' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'EVENTS', path: '/events' },
    { name: 'BLOGS', path: '/blogs' },
    { name: 'TEAM', path: '/team' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 flex justify-between items-center pointer-events-none">

      {/* Logo (Left) */}
      <div className="pointer-events-auto order-2 sm:order-1">
        <Link to="/" className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 overflow-hidden relative transition-transform hover:scale-105">
          <img src={vitmasLogo} alt="VITMAS LOGO" className="w-full h-full object-contain" />
        </Link>
      </div>

      {/* Center Links */}
      <div className="order-3 hidden gap-8 bg-[#1a1325]/80 px-10 py-4 shadow-2xl backdrop-blur-xl pointer-events-auto md:order-2 md:flex rounded-full border border-white/5">
        {links.map((link) => {
          const isActive = currentPath === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold tracking-wider transition-colors ${isActive ? 'text-white border-b-2 border-white pb-1' : 'text-white/70 hover:text-white'}`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Contact Button (Right) */}
      <div className="order-1 flex items-center gap-2 pointer-events-auto sm:order-3">
        <Link to="/contact" className="hidden sm:inline-flex bg-[#cc22ff] hover:bg-[#d94dff] text-white text-sm font-bold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(204,34,255,0.6)] transition-all hover:shadow-[0_0_30px_rgba(204,34,255,0.8)] uppercase tracking-widest">
          Contact
        </Link>
        <button
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-[#1a1325]/90 p-3 text-white sm:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute left-4 right-4 top-20 rounded-2xl border border-white/10 bg-[#1a1325]/95 p-4 shadow-2xl backdrop-blur-xl sm:hidden pointer-events-auto">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} className={`rounded-lg px-4 py-3 text-sm font-semibold tracking-wider ${currentPath === link.path ? 'bg-fuchsia-500/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                {link.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="mt-2 rounded-lg bg-[#cc22ff] px-4 py-3 text-center text-sm font-bold uppercase tracking-widest text-white">
              Contact
            </Link>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;0