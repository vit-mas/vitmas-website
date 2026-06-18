import React from "react";
import VITMASLogo from "./VITMASLogo";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function FooterSection() {
  return (
    <footer 
      id="footer" 
      className="relative w-full bg-transparent z-10 pt-24 pb-0 overflow-hidden border-t border-purple-500/10"
    >
      {/* Main Core Footer section wrapper */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        
        {/* Row 1: Logo & Contact Grid exactly as in Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-center justify-between pb-12" id="footer-contact-matrix">
          
          {/* Logo element on Left */}
          <div className="flex justify-center md:justify-start">
            <VITMASLogo size={135} className="filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
          </div>

          {/* Contact 1: Address Card (Plain Icon, simple layout) */}
          <div className="flex items-start gap-5 justify-center md:justify-start">
            <MapPin className="w-10 h-10 text-white/70 mt-1 flex-shrink-0" strokeWidth={1.5} />
            <div className="text-left font-sans text-sm md:text-base text-white">
              <span className="block font-bold text-xs text-white/50 tracking-wider mb-1">Address</span>
              <p className="text-white/80 leading-snug">
                VIT University<br />Vellore, Katpadi<br />TN, 632007
              </p>
            </div>
          </div>

          {/* Contact 2: Phone Card */}
          <div className="flex items-start gap-5 justify-center md:justify-start">
            <Phone className="w-10 h-10 text-white/70 mt-1 flex-shrink-0" strokeWidth={1.5} />
            <div className="text-left font-sans text-sm md:text-base text-white">
              <span className="block font-bold text-xs text-white/50 tracking-wider mb-1">Phone</span>
              <p className="text-white/90 font-medium leading-relaxed">
                +91 9121222122
              </p>
            </div>
          </div>

          {/* Contact 3: Email Card */}
          <div className="flex items-start gap-5 justify-center md:justify-start">
            <Mail className="w-10 h-10 text-white/70 mt-1 flex-shrink-0" strokeWidth={1.5} />
            <div className="text-left font-sans text-sm md:text-base text-white">
              <span className="block font-bold text-xs text-white/50 tracking-wider mb-1">Email</span>
              <p className="text-white/90 font-medium leading-relaxed hover:text-[#d946ef] transition-colors">
                <a href="mailto:vitmas@vit.ac.in">vitmas@vit.ac.in</a>
              </p>
            </div>
          </div>

        </div>

        {/* Solid continuous white/purple divider line stretching across */}
        <div className="w-full h-[1px] bg-white/20 my-8" />

        {/* Row 2: Social media brandings & Custom made text label */}
        <div className="flex flex-col items-center gap-8 pb-4" id="footer-branding-elements">
          
          {/* Centered Social elements list (clean, plain outlines) */}
          <div className="flex items-center gap-12 text-white/80">
            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors hover:scale-110 duration-200">
              <Facebook className="w-10 h-10" strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors hover:scale-110 duration-200">
              <Instagram className="w-10 h-10" strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors hover:scale-110 duration-200">
              <Twitter className="w-10 h-10" strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors hover:scale-110 duration-200">
              <Linkedin className="w-10 h-10" strokeWidth={1.5} />
            </a>
          </div>

          {/* MADE WITH HEART BY label with generous letter-spacing */}
          <span className="font-mono text-[10px] tracking-[0.6em] text-white/95 select-none uppercase font-black text-center w-full mt-4 flex items-center justify-center">
            M A D E &nbsp; W I T H &nbsp; <span className="text-red-500 text-3xl inline-block align-middle animate-pulse mx-1 transform -translate-y-[2px]">♥</span> &nbsp; B Y
          </span>

        </div>

      </div>

      {/* Massive high-fidelity cut-out text block strictly aligned to Image 2 with adjusted bottom margin for device adaptive rendering */}
      <div 
        className="relative w-full overflow-hidden select-none pointer-events-none mt-8 mb-[-1.5vw] flex justify-center px-4"
        id="giant-footer-watermark-wrapper"
      >
        <svg 
          className="w-full max-w-[1400px] h-auto select-none opacity-100 text-white" 
          viewBox="0 0 1000 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="50%"
            y="110"
            textAnchor="middle"
            dominantBaseline="central"
            fill="currentColor"
            className="font-display font-black uppercase"
            style={{ 
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: "155px",
              fontWeight: 900,
              letterSpacing: "0.22em"
            }}
          >
            VITMAS
          </text>
        </svg>
      </div>
    </footer>
  );
}
