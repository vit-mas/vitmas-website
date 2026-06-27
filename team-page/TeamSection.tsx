import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { Linkedin, Github, X } from "lucide-react";
import "./team-styles.css";

// Fallback high-quality elegant placeholder image in case local file is missing
const fallbackProfileImg = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600";

// Generative Mathematical / Technical Profile Vector Artwork for each team member
const getMemberArtwork = (initials: string) => {
  switch (initials) {
    case "AS": // ASHMAN SODI - Stochastic Models
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full text-indigo-400 group-hover:text-indigo-300 transition-colors" fill="none">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.25" />
          {/* Stochastic node tree / Markov chains */}
          <g className="transition-transform duration-700 group-hover:rotate-12 transform-gpu origin-center">
            <circle cx="70" cy="70" r="6" fill="#6366f1" className="animate-pulse" />
            <circle cx="130" cy="70" r="6" fill="#818cf8" />
            <circle cx="100" cy="140" r="6" fill="#4f46e5" />
            
            {/* Transition vectors with arrows */}
            <path d="M 76 70 L 124 70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M 74 74 L 96 136" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 126 74 L 104 136" stroke="currentColor" strokeWidth="1.5" />
            
            {/* Probability curve (normal distribution curve) */}
            <path d="M 30 110 Q 100 20, 170 110" stroke="#a855f7" strokeWidth="2" strokeOpacity="0.8" />
            <line x1="100" y1="20" x2="100" y2="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" strokeOpacity="0.4" />
          </g>
          {/* Coordinate tick lines */}
          <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
        </svg>
      );
    case "AD": // ADITI - Matrix Algebras
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" fill="none">
          {/* Isometric matrix sheets */}
          <g className="transition-all duration-500 transform group-hover:translate-y-[-4px]">
            <path d="M 100 40 L 160 70 L 100 100 L 40 70 Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(217, 70, 239, 0.05)" />
            <path d="M 100 100 L 160 130 L 100 160 L 40 130 Z" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" fill="rgba(217, 70, 239, 0.02)" />
            
            {/* Vector projections */}
            <line x1="100" y1="100" x2="100" y2="40" stroke="#f472b6" strokeWidth="2" className="animate-pulse" />
            <line x1="100" y1="100" x2="140" y2="80" stroke="#d946ef" strokeWidth="2" />
            <line x1="100" y1="100" x2="60" y2="80" stroke="#bfdbfe" strokeWidth="1.5" />
            
            {/* Corner crosshairs */}
            <circle cx="100" cy="40" r="3" fill="#ec4899" />
            <circle cx="160" cy="70" r="3" fill="#d946ef" />
            <circle cx="40" cy="70" r="3" fill="#ec4899" />
          </g>
          <text x="110" y="55" className="font-mono text-[8px] fill-fuchsia-400/50">[λ = 2.718]</text>
        </svg>
      );
    case "SG": // SAKSHAM GOYAL - Hyper-geometry
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="none">
          {/* Hypercube project coordinates */}
          <g className="origin-center transition-transform duration-1000 group-hover:rotate-90">
            {/* Outer cube */}
            <rect x="50" y="50" width="100" height="100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            {/* Inner cube */}
            <rect x="75" y="75" width="50" height="50" stroke="#22d3ee" strokeWidth="1.5" />
            {/* Connecting lines */}
            <line x1="50" y1="50" x2="75" y2="75" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="150" y1="50" x2="125" y2="75" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="50" y1="150" x2="75" y2="125" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="150" y1="150" x2="125" y2="125" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
          </g>
          <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" strokeOpacity="0.2" />
          <text x="55" y="40" className="font-mono text-[8px] fill-cyan-400/50">ℝ⁴ → ℝ³ PROJ</text>
        </svg>
      );
    case "DH": // DEVARINTI HARSHITHA - Scientific publications
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full text-rose-400 group-hover:text-rose-300 transition-colors" fill="none">
          {/* Golden Spiral / Fibonacci layout */}
          <g className="origin-center transition-transform duration-700 group-hover:rotate-45">
            {/* Fibonacci rectangles */}
            <rect x="30" y="30" width="140" height="140" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
            <line x1="116" y1="30" x2="116" y2="170" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
            <line x1="116" y1="116" x2="170" y2="116" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
            <line x1="63" y1="116" x2="116" y2="116" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
            
            {/* Spiral curve arc segments */}
            <path d="M 30 170 A 140 140 0 0 1 170 30" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
            <path d="M 170 30 A 86 86 0 0 1 116 116" stroke="#f43f5e" strokeWidth="1.5" />
            <path d="M 116 116 A 53 53 0 0 1 63 63" stroke="#fb7185" strokeWidth="2" />
          </g>
          <text x="35" y="185" className="font-mono text-[7px] fill-rose-500/40">Φ = 1.6180339</text>
        </svg>
      );
    case "RK": // ROHAN KULKARNI - System scalability
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full text-teal-400 group-hover:text-teal-300 transition-colors" fill="none">
          {/* Binary hierarchy nodes */}
          <g className="transition-all duration-300 group-hover:scale-105 origin-center">
            {/* System connections */}
            <line x1="100" y1="40" x2="60" y2="90" stroke="currentColor" strokeWidth="1.5" />
            <line x1="100" y1="40" x2="140" y2="90" stroke="currentColor" strokeWidth="1.5" />
            <line x1="60" y1="90" x2="40" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="60" y1="90" x2="80" y2="140" stroke="currentColor" strokeWidth="1" />
            <line x1="140" y1="90" x2="120" y2="140" stroke="currentColor" strokeWidth="1" />
            <line x1="140" y1="90" x2="160" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            
            {/* Active Nodes */}
            <circle cx="100" cy="40" r="10" fill="#0d9488" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="60" cy="90" r="8" fill="#14b8a6" className="animate-pulse" />
            <circle cx="140" cy="90" r="8" fill="#0f766e" />
            <circle cx="40" cy="140" r="6" fill="#115e59" />
            <circle cx="80" cy="140" r="6" fill="#2dd4bf" />
            <circle cx="120" cy="140" r="6" fill="#14b8a6" />
            <circle cx="160" cy="140" r="6" fill="#115e59" />
          </g>
          <text x="115" y="45" className="font-mono text-[8px] fill-teal-400/50">O(log N)</text>
        </svg>
      );
    case "AM": // ANANYA MEHTA - Ledger
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full text-purple-400 group-hover:text-purple-300 transition-colors" fill="none">
          {/* Dynamic contour terrain map */}
          <g className="transition-transform duration-500 group-hover:scale-95 origin-center">
            {/* Gradient contour lines */}
            <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.2" />
            <circle cx="100" cy="100" r="40" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="100" cy="100" r="20" stroke="#c084fc" strokeWidth="1.5" />
            
            {/* Gradient descent route path */}
            <path d="M160 50 Q130 80, 105 95" stroke="#ec4899" strokeWidth="2.5" className="animate-pulse" />
            <circle cx="160" cy="50" r="4" fill="#ec4899" />
            <circle cx="105" cy="95" r="3.5" fill="#f43f5e" />
          </g>
          <text x="35" y="32" className="font-mono text-[8.5px] fill-purple-500/50">min f(x)</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" fill="none">
          <path d="M 20 50 Q 70 20, 100 80 T 180 60" stroke="#f472b6" strokeWidth="2" />
          <path d="M 20 90 Q 70 60, 100 120 T 180 100" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
          <text x="50" y="180" className="font-mono text-[7px] fill-fuchsia-400/50">BEZIER_SPLINE_OK</text>
        </svg>
      );
  }
};

interface TeamMember {
  name: string;
  role: string;
  linkedin: string;
  github: string;
  avatarGradient: string;
  initials: string;
  bio: string;
  stats: {
    projects: string;
    forte: string;
    commit: string;
  };
  favSong?: string;
  favArtist?: string;
  favEquation?: string;
  favQuote?: string;
  personalImage?: string; // Support for dedicated photo overrides
}

interface TeamMemberCardProps {
  key?: string;
  member: TeamMember;
  index: number;
  onSelect: (member: TeamMember) => void;
}

function TeamMemberCard({ member, index, onSelect }: TeamMemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Viewport scroll tracking of this card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Smooth out scroll tracking using customized spring physics for cinematic flow
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.15,
    restDelta: 0.001
  });

  // Cards have deep 3D relative positions
  // Parallax trailing shift: card moves slightly slower than the scroll, adding deep 3D sliding feeling
  const translateY = useTransform(smoothProgress, [0, 0.5, 1], [90, 0, -90]);

  // Dramatic X-axis rotation that creates circular rolling cylinder effect
  const scrollRotateX = useTransform(smoothProgress, [0, 0.5, 1], [35, 0, -35]);

  // Dynamic Y-axis curve based on the card's column in the 3D grid
  // Left column (colIndex 0) tilts left, Right column (colIndex 2) tilts right, Middle column (colIndex 1) stays centered
  const colIndex = index % 3;
  const colRotateFactor = colIndex === 0 ? -12 : colIndex === 2 ? 12 : 0;
  const scrollRotateY = useTransform(smoothProgress, [0, 0.5, 1], [colRotateFactor, 0, -colRotateFactor]);

  // Z-depth scaling as elements roll in from background and back out
  const translateZ = useTransform(smoothProgress, [0, 0.5, 1], [-180, 0, -180]);

  // Smooth scroll opacity - highly visible in center of view, blurred/faded on outer borders
  const scrollOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  // Mouse hover coordinate tilt
  const rotateXMouse = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateYMouse = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  // Dynamically combine mouse-tilt with scroll-tilt (X-axis and Y-axis)
  const rotateX = useTransform(
    [rotateXMouse, scrollRotateX],
    ([mouseVal, scrollVal]) => `${Number(mouseVal) + Number(scrollVal)}deg`
  );

  const rotateY = useTransform(
    [rotateYMouse, scrollRotateY],
    ([mouseVal, scrollVal]) => `${Number(mouseVal) + Number(scrollVal)}deg`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Image source resolution (fall back to high-quality placeholder if not provided)
  const imageSource = member.personalImage || fallbackProfileImg;

  return (
    <motion.div
      ref={cardRef}
      className="w-full flex items-center justify-center p-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.05
      }}
      style={{ perspective: "1200px" }}
    >
      <motion.section 
        onClick={() => onSelect(member)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ 
          scale: 1.055,
          z: 35,
          boxShadow: "0 25px 45px rgba(168, 85, 247, 0.45)"
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 300,
            damping: 18
          }
        }}
        style={{
          rotateX,
          rotateY,
          z: translateZ,
          y: translateY,
          opacity: scrollOpacity,
          transformStyle: "preserve-3d",
          perspective: "1200px"
        }}
        className="profile-card cursor-pointer group relative"
        id={`team-card-${member.initials}`}
      >
        <div className="card-bg" style={{ transform: "translateZ(0px)" }}>
          <div className="card-bg-fill"></div>
          <div className="card-divider-line"></div>
          <div className="card-border"></div>
        </div>
      
        {/* Main profile avatar container */}
        <div 
          className="profile-photo flex items-center justify-center bg-[#070114]/95 overflow-hidden border border-white/5 shadow-inner"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${member.avatarGradient} opacity-20 group-hover:opacity-45 transition-opacity duration-300`} />
          <img 
            src={imageSource} 
            alt={member.name}
            className="w-full h-full object-cover relative z-10 transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="photo-circle-overlay" style={{ transform: "translateZ(32px)" }}></div>
        
        <div className="social-icons" style={{ transform: "translateX(-50%) translateZ(40px)" }}>
          <a 
            href={member.linkedin} 
            target="_blank" 
            rel="noreferrer" 
            onClick={(e) => e.stopPropagation()}
            className="transition-transform hover:scale-110"
          >
            <svg className="icon-linkedin text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] hover:text-[#0077b5] transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a 
            href={member.github} 
            target="_blank" 
            rel="noreferrer" 
            onClick={(e) => e.stopPropagation()}
            className="transition-transform hover:scale-110"
          >
            <svg className="icon-github text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] hover:text-[#9333ea] transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
        <h2 className="card-role" style={{ transform: "translateX(-50%) translateZ(20px)" }}>{member.role}</h2>
        <h2 className="card-name" style={{ transform: "translateX(-50%) translateZ(15px)" }}>{member.name}</h2>
        
        {/* Glowing vector spark in the bottom right  */}
        <div 
          className="absolute bottom-4 right-4 opacity-25 group-hover:opacity-80 group-hover:scale-110 pointer-events-none transition-all duration-300 z-10"
          style={{ transform: "translateZ(18px)" }}
        >
          <svg className="w-4 h-4 text-slate-100 filter drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2 Q12 12 22 12 Q12 12 12 22 Q12 12 2 12 Q12 12 12 2 Z" />
          </svg>
        </div>
      </motion.section>
    </motion.div>
  );
}

// ── Interactive 3D and Shockwave Bursting Name Header ──
const Bursting3DHeader: React.FC = () => {
  const words = ["MEET", "THE", "TEAM"];

  // Interactive 3D tilt tracking using motion values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = -(mouseY / height) * 16;
    const rY = (mouseX / width) * 16;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div 
      className="relative flex flex-col items-center justify-center py-10 select-none cursor-pointer group"
      style={{ 
        perspective: 1200,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative flex flex-col items-center justify-center p-4"
      >
        {/* Shockwave expanding circles */}
        <motion.div
          initial={{ scale: 0.1, opacity: 0 }}
          whileInView={{
            scale: [0.1, 1.8, 2.6],
            opacity: [0, 0.9, 0],
          }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            delay: 0.6,
            duration: 0.9,
            ease: "easeOut"
          }}
          className="absolute w-72 h-72 rounded-full border-4 border-purple-500/80 blur-sm pointer-events-none z-0"
        />

        <motion.div
          initial={{ scale: 0.1, opacity: 0 }}
          whileInView={{
            scale: [0.1, 1.3, 2.1],
            opacity: [0, 0.7, 0],
          }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            delay: 0.7,
            duration: 0.8,
            ease: "easeOut"
          }}
          className="absolute w-72 h-72 rounded-full border-2 border-pink-500/60 blur-md pointer-events-none z-0"
        />

        {/* Ambient background glow */}
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          whileInView={{
            scale: [0.2, 1.4, 1.0],
            opacity: [0, 0.85, 0.2],
          }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            delay: 0.5,
            duration: 1.2,
            ease: "circOut"
          }}
          className="absolute w-[450px] h-[150px] bg-gradient-to-r from-purple-600/30 via-pink-500/40 to-purple-600/30 blur-[60px] rounded-full pointer-events-none z-0"
        />

        {/* Impact sparks */}
        {[
          { x: -160, y: -70, rot: -15, size: 28, delay: 0.6 },
          { x: 170, y: -65, rot: 25, size: 24, delay: 0.65 },
          { x: -140, y: 75, rot: -30, size: 22, delay: 0.7 },
          { x: 150, y: 80, rot: 20, size: 26, delay: 0.68 }
        ].map((spark, idx) => (
          <motion.div
            key={idx}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
            whileInView={{
              x: [0, spark.x],
              y: [0, spark.y],
              scale: [0, 1.3, 1.0],
              opacity: [0, 1, 0.8],
              rotate: [0, spark.rot]
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              delay: spark.delay,
              duration: 1.0,
              type: "tween",
              ease: "easeOut"
            }}
            className="absolute pointer-events-none z-10 text-white/95 drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]"
            style={{ width: spark.size, height: spark.size }}
          >
            <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
              <path d="M12 2 Q12 12 22 12 Q12 12 12 22 Q12 12 2 12 Q12 12 12 2 Z" />
            </svg>
          </motion.div>
        ))}

        {/* Flying 3D Text Header */}
        <motion.div 
          className="flex flex-nowrap items-center justify-center gap-x-[0.8em] sm:gap-x-[1.8em] md:gap-x-[3.2em] whitespace-nowrap"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              }
            }
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {words.map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              className="inline-block relative font-black"
              style={{ transformStyle: "preserve-3d" }}
              variants={{
                hidden: { 
                  opacity: 0, 
                  scale: 0.01, 
                  z: -650, 
                  rotateX: -40, 
                  rotateY: 20,
                  filter: "blur(20px)" 
                },
                visible: {
                  opacity: [0, 1, 1],
                  scale: [0.01, 1.35, 1],
                  z: [0, 180, 0],
                  rotateX: [ -40, 15, 0 ],
                  rotateY: [ 20, -5, 0 ],
                  filter: ["blur(20px)", "blur(0px)", "blur(0px)"],
                  transition: {
                    duration: 1.15,
                    times: [0, 0.65, 1],
                    type: "tween",
                    ease: "easeOut"
                  }
                }
              }}
            >
              <h1 className="meet-the-team leading-none select-none relative z-10 tracking-wider">
                {word}
              </h1>

              {/* Offset shadow layer */}
              <h1 
                className="meet-the-team leading-none select-none absolute inset-0 text-purple-950/50 pointer-events-none font-black filter blur-sm tracking-wider"
                style={{ 
                  transform: "translateZ(-8px) translateY(4px)",
                  WebkitTextStroke: "1px rgba(168,85,247,0.3)"
                }}
              >
                {word}
              </h1>
            </motion.span>
          ))}
        </motion.div>

        {/* Decorative flourish line */}
        <motion.div 
          className="mt-6 h-0.5 w-42 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const team: TeamMember[] = [
    {
      name: "ASHMAN",
      role: "CHAIRPERSON",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-purple-600 to-indigo-600",
      initials: "AS",
      bio: "Masterminding strategic visions, coordinate modeling, stochastic computations, and leading high-profile institutional engineering panels.",
      stats: { projects: "15+ Conducted", forte: "Stochastic Models", commit: "High Peak" },
      favSong: "Perfect",
      favArtist: "Ed Sheeran",
      favEquation: "e^(iπ) + 1 = 0",
      favQuote: "The essence of mathematics lies in its freedom."
    },
    {
      name: "ADITI",
      role: "GENERAL SECRETARY",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-pink-600 to-fuchsia-600",
      initials: "AD",
      bio: "Orchestrating mathematical directives, running organizational workflows, and ensuring cross-department coordination with absolute precision.",
      stats: { projects: "12+ Orchestrated", forte: "Matrix Algebras", commit: "Endless Stream" },
      favSong: "Aasa Kooda",
      favArtist: "Sai Abhyankkar",
      favEquation: "det(A - λI) = 0",
      favQuote: "There should be no boundaries to human endeavor."
    },
    {
      name: "SAKSHAM",
      role: "VICE CHAIR",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-blue-600 to-cyan-600",
      initials: "SG",
      bio: "Propelling structural developments and analytical agendas. Specialized in high-dimensional computational geometry and numerical simulation architectures.",
      stats: { projects: "10+ Engineered", forte: "Hyper-Geometry", commit: "Constant Acceleration" },
      favSong: "Blinding Lights",
      favArtist: "The Weeknd",
      favEquation: "∇ × E = -∂B/∂t",
      favQuote: "Speed is nothing without direction."
    },
    {
      name: "DHANESH",
      role: "VICE SECRETARY",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-rose-600 to-amber-600",
      initials: "DH",
      bio: "Synthesizing theoretical concepts into stunning media digests, organizing knowledgebases, and maintaining publications of mathematical research.",
      stats: { projects: "8+ Publications", forte: "Scientific Literature", commit: "Polished Flow" },
      favSong: "Mockingbird",
      favArtist: "Eminem",
      favEquation: "∫ e^(-x²) dx = √π",
      favQuote: "Simplicity is the ultimate sophistication."
    },
    {
      name: "ROOPESH",
      role: "EVENTS HEAD",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-teal-600 to-emerald-600",
      initials: "RK",
      bio: "Pioneering the web platforms, mathematical visualization systems, and computational servers with optimal low-latency algorithms.",
      stats: { projects: "20+ Deployments", forte: "System Scalability", commit: "Pure Terminal" },
      favSong: "Yennai Maatrum",
      favArtist: "Anirudh Ravichander",
      favEquation: "1 + w + w² = 0",
      favQuote: "know what you are to whom before thinking about why"
    },
    {
      name: "ANANYA",
      role: "TREASURER",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-violet-600 to-purple-600",
      initials: "AM",
      bio: "Formulating operational ledger vectors, optimizing resources dynamically, and overseeing treasury models for large-scale technical symposiums.",
      stats: { projects: "14+ Managed", forte: "Optimization Theory", commit: "Rigorous Balance" },
      favSong: "Math Symphony",
      favArtist: "Mozart",
      favEquation: "x² + y² = r²",
      favQuote: "Curiosity is the engine of achievement."
    },
    {
      name: "NAME",
      role: "POSITION",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-fuchsia-600 to-purple-800",
      initials: "SS",
      bio: "Spearheading UI layouts, custom graphic algorithms, and projecting the premium cryptographic aesthetic layout of VITMAS on digital fronts.",
      stats: { projects: "18+ Designs", forte: "Vector Topography", commit: "Creative Peak" },
      favSong: "Math Symphony",
      favArtist: "Mozart",
      favEquation: "e^(iπ) + 1 = 0",
      favQuote: "The essence of mathematics lies in its freedom."
    },
    {
      name: "NAME",
      role: "POSITION",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-indigo-600 to-cyan-600",
      initials: "MI",
      bio: "Probing modern horizons of deep reinforcement learning, neural differential integrations, and chairing mathematical research colloquiums.",
      stats: { projects: "6+ Deep Papers", forte: "Neural Dynamics", commit: "High Entropy" },
      favSong: "Math Symphony",
      favArtist: "Mozart",
      favEquation: "x² + y² = r²",
      favQuote: "Curiosity is the engine of achievement."
    },
    {
      name: "NAME",
      role: "POSITION",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-cyan-600 to-teal-600",
      initials: "KP",
      bio: "Governing real-time field deployments, resource allocations, and leading critical event logistics across departments.",
      stats: { projects: "11+ Operations", forte: "Logistics Optimization", commit: "Unwavering Focus" },
      favSong: "Math Symphony",
      favArtist: "Mozart",
      favEquation: "x² + y² = r²",
      favQuote: "Curiosity is the engine of achievement."
    },
    {
      name: "NAME",
      role: "POSITION",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-violet-600 to-rose-600",
      initials: "RS",
      bio: "Refining visual frontends, dynamic wireframe topologies, and crafting pixel-perfect interactive component systems for user delight.",
      stats: { projects: "14+ Blueprints", forte: "Dynamic Interaction", commit: "Aesthetic Rigor" },
      favSong: "Math Symphony",
      favArtist: "Mozart",
      favEquation: "x² + y² = r²",
      favQuote: "Curiosity is the engine of achievement."
    },
    {
      name: "NAME",
      role: "POSITION",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-amber-600 to-pink-600",
      initials: "IB",
      bio: "Fostering strategic communication grids with corporate entities, academic associations, and maintaining premium client liaisons.",
      stats: { projects: "16+ Partnerships", forte: "Strategic Alliances", commit: "Always Online" },
      favSong: "Math Symphony",
      favArtist: "Mozart",
      favEquation: "x² + y² = r²",
      favQuote: "Curiosity is the engine of achievement."
    }
  ];

  return (
    <section 
      id="team" 
      className="relative min-h-screen w-full py-24 bg-transparent z-10 px-4 md:px-8 overflow-hidden"
    >
      {/* Blueprint grid layout lines backdrop */}
      <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
        <svg className="w-full h-full stroke-purple-900/40" strokeWidth="0.8">
          <defs>
            <pattern id="gridLargeExport" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridLargeExport)" />
        </svg>
      </div>

      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-purple-950/10 blur-[130px] pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col justify-center">
        {/* Title Block with Interactive 3D and Shockwave Bursting Animation */}
        <div className="text-center mb-16 select-none px-4">
          <Bursting3DHeader />
        </div>

        {/* Profiles Layout: Custom grid separating top leaders from board members */}
        <div className="space-y-16">
          {/* Top Leaders Row */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-x-12 max-w-[1000px] mx-auto w-full px-4">
            {team.filter(m => m.role === "CHAIRPERSON" || m.role === "GENERAL SECRETARY").map((member) => {
              const originalIndex = team.indexOf(member);
              return (
                <div key={`${member.name}-${originalIndex}`} className="w-full md:w-1/2 max-w-[442px] mx-auto">
                  <TeamMemberCard 
                    member={member}
                    index={originalIndex !== -1 ? originalIndex : 0}
                    onSelect={setSelectedMember}
                  />
                </div>
              );
            })}
          </div>

          {/* Board Members 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-7xl mx-auto w-full justify-items-center mt-6">
            {team.filter(m => m.role !== "CHAIRPERSON" && m.role !== "GENERAL SECRETARY").map((member) => {
              const originalIndex = team.indexOf(member);
              return (
                <div key={`${member.name}-${originalIndex}`} className="w-full max-w-[442px] mx-auto">
                  <TeamMemberCard 
                    member={member}
                    index={originalIndex !== -1 ? originalIndex : 2}
                    onSelect={setSelectedMember}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Dossier Modal Popup */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 200 }}
              className="relative w-full max-w-4xl bg-[#FAF6EB] border-8 border-[#3D1A3C] rounded-[40px] p-6 md:p-10 overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-12 gap-6 text-left text-[#3D1A3C]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* absolute vector curves backdrop */}
              <svg className="absolute top-2 right-12 w-48 h-24 text-[#3D1A3C]/85 pointer-events-none z-0" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10,15 Q100,55 190,15" />
                <polygon points="30,22 35,60 55,29" />
              </svg>

              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 z-40 p-2 text-[#3D1A3C]/70 hover:text-[#3D1A3C] bg-[#3D1A3C]/10 hover:bg-[#3D1A3C]/20 rounded-full border border-[#3D1A3C]/20 transition-all cursor-pointer shadow-sm"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Header Title block */}
              <div className="col-span-12 relative z-10 select-none pb-2">
                <h2 className="font-display font-black text-4xl sm:text-6xl tracking-wider text-[#3D1A3C] uppercase leading-[0.9] mb-1">
                  {selectedMember.name}
                </h2>
                <h3 className="text-lg sm:text-2xl font-black tracking-widest text-[#542d54] uppercase">
                  {selectedMember.role}
                </h3>
              </div>

              {/* Left Column: Favourites Card */}
              <div className="col-span-12 md:col-span-6 flex flex-col justify-between relative z-10">
                <div className="bg-[#2E112D] border-4 border-[#3D1A3C] rounded-[32px] p-6 shadow-xl flex flex-col justify-between h-full min-h-[350px]">
                  
                  <div className="text-4xl text-[#FAF6EB] font-black tracking-widest text-center mb-6 select-none font-serif">
                    FAVOURITES
                  </div>

                  <div className="space-y-6 flex-grow flex flex-col justify-around">
                    <div className="flex gap-4 items-center">
                      <div className="flex flex-col text-[#FAF6EB]">
                        <span className="font-bold text-xl leading-tight tracking-wide italic">
                          {selectedMember.favSong || "Yennai Maatrum"}
                        </span>
                        <span className="text-lg opacity-85 mt-0.5">
                          - {selectedMember.favArtist || "Anirudh"}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="font-bold text-xl sm:text-2xl text-[#FAF6EB] tracking-wider italic">
                        {selectedMember.favEquation || "1 + w + w² = 0"}
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="text-xl text-[#FAF6EB]/95 leading-tight italic max-w-xs">
                        &ldquo;{selectedMember.favQuote || "Know what you are to whom before thinking about why"}&rdquo;
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 w-full">
                    <div className="relative w-11 h-11 rounded-full border-2 border-[#FAF6EB]/40 overflow-hidden z-10 bg-black">
                      <img 
                        src={selectedMember.personalImage || fallbackProfileImg} 
                        alt={selectedMember.name} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer" 
                      />
                    </div>

                    <div className="flex gap-3 z-10">
                      <a href={selectedMember.linkedin} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/10">
                        <Linkedin className="w-4 h-4 text-[#0077b5]" />
                      </a>
                      <a href={selectedMember.github} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/10">
                        <Github className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Standing Photo & Doodles */}
              <div className="col-span-12 md:col-span-6 flex items-center justify-center relative min-h-[360px] z-10">
                <div className="relative w-full max-w-[290px] aspect-[11/14] rounded-2xl overflow-hidden border-4 border-[#3D1A3C] shadow-xl transform rotate-[-1deg] transition-all duration-300 hover:rotate-0 hover:scale-[1.02] bg-[#FAF6EB]">
                  <img 
                    src={selectedMember.personalImage || fallbackProfileImg} 
                    alt={selectedMember.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
