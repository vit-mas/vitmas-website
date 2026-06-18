import React from "react";
import { motion } from "motion/react";
import { Sparkles, Calendar, MapPin } from "lucide-react";

export default function EventsSection() {
  return (
    <section 
      id="events" 
      className="relative min-h-screen w-full py-24 bg-transparent z-10 px-4 md:px-8"
    >
      {/* Background gradients aligned with Image 3 neon glows */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-pink-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[450px] h-[450px] rounded-full bg-cyan-900/15 blur-[150px] pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col justify-center">
        {/* Section Heading matching the wide, heavy glowing font on the image */}
        <div className="text-center mb-16 select-none overflow-hidden px-4">
          <h2 className="font-display font-black text-[8vw] sm:text-7xl md:text-8xl tracking-[0.2em] text-white leading-none uppercase text-glow-white mr-[-0.2em] whitespace-nowrap">
            EVENTS
          </h2>
          <div className="h-0.5 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mx-auto mt-6 rounded" />
        </div>

        {/* Core grids holding the actual Event Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 md:px-8">
          
          {/* Card 1: ZERO TO VIBE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="group relative h-[360px] md:h-[400px] rounded-2xl border-2 border-pink-500 bg-[#0d0718] p-6 flex flex-col overflow-hidden border-glow-pink hover:scale-[1.01] transition-transform duration-300"
            id="event-card-zero-to-vibe"
          >
            {/* Background design accents (digital net mesh) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="gridPattern" width="16" height="16" patternUnits="userSpaceOnUse">
                    <path d="M 16 0 L 0 0 0 16" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#gridPattern)" />
              </svg>
            </div>

            {/* Glowing neon background arcs */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-pink-500/20 blur-[60px] group-hover:bg-pink-500/30 transition-all duration-500" />
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple-500/20 blur-[50px]" />

            {/* Title Section (Large neon typography matching Image 3) */}
            <div className="text-center mt-6 z-10 select-none">
              <h3 
                className="font-display font-extrabold text-3xl md:text-5xl tracking-widest text-[#ff2e93] leading-none text-shadow-[0_0_15px_#ff2e93]"
                style={{ textShadow: "0 0 10px rgba(255, 46, 147, 0.7)" }}
              >
                &lt;ZERO TO VIBE/&gt;
              </h3>
            </div>

            {/* Embedded mockup-aligned browser graphic element */}
            <div className="mt-8 mx-auto w-full max-w-sm rounded-xl border border-cyan-400 bg-[#07030e]/85 p-3 flex flex-col z-10 border-glow-cyan">
              {/* Browser bar */}
              <div className="flex items-center gap-1.5 border-b border-cyan-400/40 pb-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <div className="h-3 w-32 rounded bg-cyan-950/40 border border-cyan-500/30 ml-2" />
              </div>

              {/* Graphic code layout */}
              <div className="flex items-center justify-between px-2 py-4">
                {/* SVG tags illustration */}
                <div className="text-cyan-400 font-mono text-[22px] font-bold tracking-tight">
                  <code>&lt;/&gt;</code>
                </div>

                {/* Cyber triangle icon dynamic */}
                <div className="w-8 h-8 flex items-center justify-center bg-pink-500/10 rounded-lg transform rotate-12">
                  <span className="text-pink-500 font-bold text-xs">▲</span>
                </div>
              </div>

              {/* Subtext info */}
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-cyan-400/20">
                <span className="font-mono text-[9px] text-[#06b6d4] tracking-widest uppercase">
                  STATUS // ACTIVE DEVELOPMENT
                </span>
                <span className="font-mono text-[10px] text-fuchsia-400 font-bold">
                  KOBE 2.0
                </span>
              </div>
            </div>

            {/* Bottom KNOW MORE pill exactly as indicated in mockup */}
            <div className="mt-auto flex justify-end z-10 w-full mb-2">
              <button className="px-5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#ff2e93] text-white font-black hover:bg-pink-600 border border-pink-400 border-glow-pink hover:scale-105 active:scale-95 transition-all cursor-pointer">
                KNOW MORE
              </button>
            </div>
          </motion.div>

          {/* Card 2: The Rational Game */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group relative h-[360px] md:h-[400px] rounded-2xl border-2 border-fuchsia-500 bg-[#0c0416] p-6 flex flex-col overflow-hidden border-glow-purple hover:scale-[1.01] transition-transform duration-300"
            id="event-card-rational-game"
          >
            {/* Pacman Maze coordinates background layout strictly styled */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg className="w-full h-full stroke-fuchsia-500" strokeWidth="0.8" fill="none">
                {/* Pacman walls paths */}
                <rect x="20" y="20" width="80" height="40" rx="4" />
                <rect x="120" y="20" width="80" height="40" rx="4" />
                <path d="M 200 40 L 260 40 L 260 120" />
                <path d="M 40 100 L 40 160 Q 60 200 120 200" />
                <circle cx="100" cy="150" r="1.5" className="fill-fuchsia-500" />
                <circle cx="140" cy="150" r="1.5" className="fill-fuchsia-500" />
                <circle cx="180" cy="150" r="1.5" className="fill-fuchsia-500" />
                <circle cx="220" cy="150" r="1.5" className="fill-fuchsia-500" />
              </svg>
            </div>

            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-purple-500/20 blur-[50px]" />
            <div className="absolute top-1/2 -right-10 w-44 h-44 rounded-full bg-pink-500/15 blur-[60px]" />

            <div className="my-auto text-center z-10 px-4 select-none">
              {/* Main title styled in retro PACMAN style typography */}
              <h3 
                className="font-display font-black text-4xl md:text-5xl tracking-wide text-cyan-300 uppercase leading-tight"
                style={{ textShadow: "0 0 15px rgba(34, 211, 238, 0.5)" }}
              >
                The Rational Game
              </h3>
              
              {/* Event Subheading code */}
              <p className="font-mono text-sm tracking-[0.3em] text-fuchsia-400 mt-4 uppercase font-semibold">
                — An Outreach Event —
              </p>
            </div>

            <div className="mt-auto flex justify-between items-center z-10 w-full mb-2">
              <div className="flex gap-4 font-mono text-[10px] text-white/50">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> OCT 18</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> VIT AUDI</span>
              </div>
              <button className="px-5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-transparent text-cyan-300 font-bold hover:bg-cyan-950/40 border border-cyan-400 border-glow-cyan hover:scale-105 active:scale-95 transition-all cursor-pointer">
                ENTER MATRIX
              </button>
            </div>
          </motion.div>

          {/* Card 3: Beyond Boundaries */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group relative h-[360px] md:h-[400px] rounded-2xl border-2 border-emerald-500 bg-[#061110] p-6 flex flex-col overflow-hidden border-glow-green hover:scale-[1.01] transition-transform duration-300"
            id="event-card-beyond-boundaries"
          >
            {/* Mathematical equations chalkboard background */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg className="w-full h-full fill-none stroke-emerald-500 font-mono text-[7px]" strokeWidth="0.7">
                {/* Cartesian coordinates, Integrals, and Formula text */}
                <line x1="10" y1="90" x2="190" y2="90" />
                <line x1="50" y1="20" x2="50" y2="180" />
                <path d="M 50 90 Q 70 30, 90 90 T 130 90 T 170 90" />
                <text x="140" y="50">{"y = A sin(\\omega t)"}</text>
                <text x="60" y="30">{"dxdy = r dr d\\theta"}</text>
                <text x="20" y="140">{"\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}"}</text>
                <polygon points="120,50 140,80 100,80" />
              </svg>
            </div>

            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-emerald-500/25 blur-[55px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 rounded-full bg-teal-500/15 blur-[65px]" />

            <div className="my-auto text-center z-10 px-4 select-none">
              {/* Category banner */}
              <span className="font-mono text-xs text-yellow-300 tracking-[0.25em] uppercase block mb-3 font-semibold">
                Beyond Boundaries:
              </span>

              {/* Title in elegant serif type display matching mockup */}
              <h3 
                className="font-serif italic font-extrabold text-3xl md:text-5xl tracking-wide text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', 'New York', 'Georgia', serif" }}
              >
                Women in Science
              </h3>
            </div>

            <div className="mt-auto flex justify-between items-center z-10 w-full mb-2">
              <span className="font-mono text-[9px] text-emerald-400 tracking-widest uppercase">
                PANEL DISCUSSION / ACADEMICS
              </span>
              <button className="px-5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-transparent text-emerald-400 font-bold hover:bg-emerald-950/40 border border-emerald-400 border-glow-green hover:scale-105 active:scale-95 transition-all cursor-pointer">
                INVITATION
              </button>
            </div>
          </motion.div>

          {/* Card 4: Green Computing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative h-[360px] md:h-[400px] rounded-2xl border-2 border-[#10b981] bg-[#030908] p-6 flex flex-col overflow-hidden border-glow-green hover:scale-[1.01] transition-transform duration-300"
            id="event-card-green-computing"
          >
            {/* Hexagonal cyber technology grid */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg className="w-full h-full stroke-[#10b981]" strokeWidth="0.6" fill="none">
                {/* Tech rings, targets and data lines */}
                <circle cx="100" cy="100" r="40" />
                <circle cx="100" cy="100" r="60" strokeDasharray="5,5" />
                <line x1="40" y1="100" x2="160" y2="100" />
                <line x1="100" y1="40" x2="100" y2="160" />
                <polygon points="100,50 143,75 143,125 100,150 57,125 57,75" strokeDasharray="3,3" />
              </svg>
            </div>

            <div className="absolute bottom-[-5%] right-[-5%] w-40 h-40 rounded-full bg-emerald-500/20 blur-[50px] group-hover:bg-emerald-500/30 transition-colors" />

            <div className="my-auto text-center z-10 px-4 select-none">
              {/* Visual technology header */}
              <h3 
                className="font-mono font-black text-3xl md:text-5xl tracking-widest text-[#10b981] uppercase leading-tight"
                style={{ textShadow: "0 0 10px rgba(16, 185, 129, 0.4)" }}
              >
                GREEN COMPUTING:
              </h3>
              
              {/* Event Subtitle block */}
              <p className="font-display font-medium text-xs md:text-sm tracking-[0.4em] text-white/80 mt-4 uppercase">
                ENERGY EFFICIENT COMPUTOLOGY
              </p>
            </div>

            <div className="mt-auto flex justify-between items-center z-10 w-full mb-2">
              <span className="font-mono text-[9px] text-[#10b981] opacity-75 tracking-widest">
                SYS_VER // 4.09.2
              </span>
              <button className="px-5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#10b981] text-black font-black hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all cursor-pointer">
                DOWNLOAD MANIFEST
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
