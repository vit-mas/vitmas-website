import { Link, useLocation } from 'react-router-dom';
import vitmasLogo from '../assets/vitmas_logo.png';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [
    { name : 'HOME', path: '/'},
    { name: 'ABOUT', path: '/about' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'EVENTS', path: '/events' },
    { name: 'BLOGS', path: '/blogs' },
    { name: 'TEAM', path: '/team' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 px-8 flex justify-between items-center pointer-events-none">

      {/* Logo (Left) */}
      <div className="pointer-events-auto">
        <Link to="/" className="flex items-center justify-center w-20 h-20 overflow-hidden relative transition-transform hover:scale-105">
          <img src={vitmasLogo} alt="VITMAS LOGO" className="w-full h-full object-contain" />
        </Link>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex gap-8 bg-[#1a1325]/80 backdrop-blur-xl px-10 py-4 rounded-full border border-white/5 shadow-2xl pointer-events-auto">
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
      <div className="pointer-events-auto">
        <Link to="/contact" className="bg-[#cc22ff] hover:bg-[#d94dff] text-white text-sm font-bold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(204,34,255,0.6)] transition-all hover:shadow-[0_0_30px_rgba(204,34,255,0.8)] uppercase tracking-widest">
          Contact
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;0