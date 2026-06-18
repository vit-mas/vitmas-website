import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import VITMASLogo from "./VITMASLogo";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  id: string;
}

interface NavigationProps {
  currentPath?: string;
  onNavigate?: (id: string) => void;
}

export default function Navigation({ currentPath = "about", onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: "ABOUT", id: "about" },
    { label: "PROJECTS", id: "projects" },
    { label: "EVENTS", id: "events" },
    { label: "BLOGS", id: "blogs" },
    { label: "TEAM", id: "team" },
    { label: "FAQ", id: "faq" },
  ];

  // Scroll observer to monitor header background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Standard route transition handler
  const handleNavigation = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      window.history.pushState(null, "", "/" + id);
      window.dispatchEvent(new Event("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 px-6 md:px-12 py-5 sm:py-6 ${
        isScrolled ? "bg-black/45 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"
      }`}
      id="global-header-navbar"
      role="banner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Interactive Emblem Logo (Enlarged, Span Removed) */}
        <div 
          className="cursor-pointer flex items-center gap-3"
          onClick={() => handleNavigation("about")}
          id="header-logo-trigger"
        >
          <VITMASLogo size={82} className="filter drop-shadow-[0_0_16px_rgba(255,255,255,0.25)] transform hover:scale-105 transition-transform" />
        </div>

        {/* Middle: Desktop Glassmorphism Navbar Pill (Enlarged spacing/sizes) */}
        <nav 
          className="hidden md:flex items-center px-4.5 py-2 rounded-full border border-white/12 bg-white/7 backdrop-blur-md shadow-inner relative"
          id="desktop-glassmorphism-pill"
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`relative px-8 py-4 font-display font-extrabold text-[18px] tracking-widest leading-none outline-none transition-colors duration-300 cursor-pointer ${
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {/* Underline current highlight using Framer Motion slide layout */}
                {isActive && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-2.5 inset-x-8 h-[2.5px] bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Glow Pill CTA "CONTACT" (Enlarged size/padding/font, reduced by 10% as requested) */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNavigation("faq")}
            className="px-10 py-[18px] rounded-full font-display font-black text-[17.6px] tracking-widest text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border border-glow-pink hover:border-white shadow-2xl shadow-purple-500/25 active:scale-95 transition-all cursor-pointer uppercase"
            id="navbar-contact-glowing-trigger"
          >
            CONTACT
          </button>
        </div>

        {/* Mobile Hamburger toggle trigger */}
        <div className="md:hidden flex items-center gap-3">
          {/* Glowing Contact button for mobile alongside menu */}
          <button
            onClick={() => handleNavigation("faq")}
            className="px-4 py-2 rounded-full font-display font-black text-[10px] tracking-wider bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md active:scale-95 transition-all text-shadow"
          >
            CONTACT
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:text-fuchsia-400 transition-colors"
            id="mobile-hamburger-trigger"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full inset-x-0 bg-black border-b border-white/10 shadow-2xl p-6 flex flex-col gap-4 md:hidden z-40 bg-grid-pattern"
          id="mobile-drawer-menu"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full text-left font-display font-bold text-sm tracking-widest py-3 border-b border-white/5 pl-2 transition-colors ${
                currentPath === item.id ? "text-fuchsia-400 font-black" : "text-white/70"
              }`}
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </header>
  );
}
