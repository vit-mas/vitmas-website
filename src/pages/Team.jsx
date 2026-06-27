import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { Link, GitBranch, X, Cpu, Layers, Award, Terminal, Code, Heart } from "lucide-react";
// @ts-ignore
import temporaryProfileImg from "../assets/images/temporary_profile_1781792241865.jpg";
import eventImg from "../assets/images/events.png";
import techImg from "../assets/images/tech.png";
import editorialImg from "../assets/images/editorial.png";
import projectsImg from "../assets/images/projects.png";
import genSecImg from "../assets/images/gensec.png";
import mgmtImg from "../assets/images/mgmt.png";
import chairImg from "../assets/images/chair.png";
import outImg from "../assets/images/outreach.png";
import vcImg from "../assets/images/vc.png";
import coSecImg from "../assets/images/cosec.png";
import designImg from "../assets/images/design.png";

const FoldingPointer = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 195 217" className={`${className} transition-transform group-hover:translate-x-1 duration-300`} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* High quality 3D folding pointer representation based on figma:2:26 */}
    <path d="M19.5 56.5C19.5 40.2 36.3 29.5 51.1 36.2L167.3 88.8C185.3 97 186.2 122.1 168.9 131.5L78.1 180.7C62.9 188.9 44.1 178 44.1 160.7L19.5 56.5Z" fill="url(#ptr_grad_main)" />
    <path d="M167.3 88.8C175.5 92.5 178.5 102.5 175.6 110.8C163.5 145.4 125.8 171.2 78.1 180.7C125.6 150.3 158.4 116.8 167.3 88.8Z" fill="url(#ptr_grad_fold)" />
    <defs>
      <linearGradient id="ptr_grad_main" x1="19.5" y1="35" x2="167.3" y2="180.7" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#d946ef" />
        <stop offset="40%" stopColor="#a21caf" />
        <stop offset="100%" stopColor="#86198f" />
      </linearGradient>
      <linearGradient id="ptr_grad_fold" x1="167.3" y1="88.8" x2="78.1" y2="180.7" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#701a75" />
        <stop offset="100%" stopColor="#4c0519" />
      </linearGradient>
    </defs>
  </svg>
);

function TeamMemberCard({ member, index, onSelect }) {
  const cardRef = useRef(null);

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

  // Codrops Style 2: cards have deep 3D relative positions
  // Parallax trailing shift: card moves slightly slower than the scroll, adding deep 3D sliding feeling
  const translateY = useTransform(smoothProgress, [0, 0.5, 1], [90, 0, -90]);

  // Codrops Style 2: dramatic X-axis rotation that creates circular rolling cylinder effect
  const scrollRotateX = useTransform(smoothProgress, [0, 0.5, 1], [35, 0, -35]);

  // Codrops Style 2: dynamic Y-axis curve based on the card's column in the 3D grid
  // Left column (colIndex 0) tilts left, Right column (colIndex 2) tilts right, Middle column (colIndex 1) stays centered
  const colIndex = index % 3;
  const colRotateFactor = colIndex === 0 ? -12 : colIndex === 2 ? 12 : 0;
  const scrollRotateY = useTransform(smoothProgress, [0, 0.5, 1], [colRotateFactor, 0, -colRotateFactor]);

  // Codrops Style 2: Z-depth scaling as elements roll in from background and back out
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

  const handleMouseMove = (e) => {
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

  const initialsCode = (member.initials?.charCodeAt(0) || 0) + (member.initials?.charCodeAt(1) || 0);
  const staggerDelay = (initialsCode % 5) * 0.12;

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
        /*onClick={() => onSelect(member)}*/
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
      
      {/* Main profile avatar container (displays temporary profile image) */}
      <div 
        className="profile-photo flex items-center justify-center bg-[#070114]/95 overflow-hidden border border-white/5 shadow-inner"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${member.avatarGradient} opacity-20 group-hover:opacity-45 transition-opacity duration-300`} />
        <img 
          src={member.photo || temporaryProfileImg} 
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
      
    </motion.section>
    </motion.div>
  );
}

// ── Interactive 3D and Shockwave Bursting Name Header ──
const Bursting3DHeader = () => {
  const words = ["MEET", "THE", "TEAM"];

  // Interactive 3D tilt tracking using motion values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Smooth subtle tilts
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
        {/* Shockwave expanding circle 1 */}
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

        {/* Shockwave expanding circle 2 */}
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

        {/* Light flare background behind text */}
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

        {/* Launching SVG spark stars at the moment of text impact */}
        {[
          { x: -160, y: -70, rot: -15, size: 28, delay: 0.6 },
          { x: 170, y: -65, rot: 25, size: 24, delay: 0.65 },
          { x: -140, y: 75, rot: -30, size: 22, delay: 0.7 },
          { x: 150, y: 80, rot: 20, size: 26, delay: 0.68 },
          { x: 0, y: -100, rot: 5, size: 20, delay: 0.55 },
          { x: -210, y: 10, rot: -10, size: 24, delay: 0.65 },
          { x: 220, y: 5, rot: 15, size: 25, delay: 0.68 }
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

        {/* Flying 3D Text Core */}
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

              {/* Offset 3D ambient drop-shadow text layer */}
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

        {/* Dynamic decorative line flourish */}
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

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(null);

  // Close modal on Escape press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const team = [
    {
      name: "ASHMAN",
      role: "CHAIRPERSON",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      photo: chairImg,
      avatarGradient: "from-purple-600 to-indigo-600",
      initials: "AS",
      bio: "Masterminding the strategic visions of VITMAS. Specialized in coordinate modeling, stochastic computations, and leading high-profile institutional engineering panels.",
      stats: { projects: "15+ Conducted", forte: "Stochastic Models", commit: "High Peak" },
      favSong: "Perfect",
      favArtist: "Ed Sheeran",
      favEquation: "e^(iπ) + 1 = 0",
      favQuote: "The essence of mathematics lies in its freedom."
    },
    {
      name: "ADITI",
      role: "GENERAL SECRETARY",
      photo: genSecImg,
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-pink-600 to-fuchsia-600",
      initials: "AD",
      bio: "Orchestrating mathematical directives, running organizational workflows, and ensuring cross-department coordination with absolute algebraic precision.",
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
      photo: vcImg,
      bio: "Propelling structural developments and analytical agendas. Lead researcher in high-dimensional computational geometry and numerical simulation architectures.",
      stats: { projects: "10+ Engineered", forte: "Hyper-Geometry", commit: "Constant Acceleration" },
      favSong: "Blinding Lights",
      favArtist: "The Weeknd",
      favEquation: "∇ × E = -∂B/∂t",
      favQuote: "Speed is nothing without direction."
    },
    {
      name: "DHANESH",
      role: "VICE SECRETARY",
      photo: coSecImg,
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-rose-600 to-amber-600",
      initials: "DH",
      bio: "Synthesizing theoretical theories into stunning media digests, organizing knowledgebases, and maintaining VITMAS publications of mathematical research.",
      stats: { projects: "8+ Publications", forte: "Scientific Literature", commit: "Polished Flow" },
      favSong: "Mockingbird",
      favArtist: "Eminem",
      favEquation: "∫ e^(-x²) dx = √π",
      favQuote: "Simplicity is the ultimate sophistication."
    },
    {
      name: "ANIRUDHA",
      role: "POSITION",
      photo: designImg,
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
    },
    {
      name: "ABHA",
      role: "POSITION",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-violet-600 to-purple-600",
      initials: "AM",
      photo: techImg,
      bio: "Formulating operational ledger vectors, optimizing resources dynamically, and overseeing treasury models for large-scale technical symposiums.",
      stats: { projects: "14+ Managed", forte: "Optimization Theory", commit: "Rigorous Balance" },
      favSong: "Math Symphony",
      favArtist: "Mozart",
      favEquation: "x² + y² = r²",
      favQuote: "Curiosity is the engine of achievement."
    },
    {
      name: "HARSHITHA",
      role: "POSITION",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-fuchsia-600 to-purple-800",
      initials: "SS",
      photo: projectsImg,
      bio: "Spearheading UI layouts, custom graphic algorithms, and projecting the premium cryptographic aesthetic layout of VITMAS on digital fronts.",
      stats: { projects: "18+ Designs", forte: "Vector Topography", commit: "Creative Peak" },
      favSong: "Math Symphony",
      favArtist: "Mozart",
      favEquation: "e^(iπ) + 1 = 0",
      favQuote: "The essence of mathematics lies in its freedom."
    },
    {
      name: "GARGEE",
      role: "POSITION",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-indigo-600 to-cyan-600",
      initials: "MI",
      photo: editorialImg,
      bio: "Probing modern horizons of deep reinforcement learning, neural differential integrations, and chairing mathematical research colloquiums.",
      stats: { projects: "6+ Deep Papers", forte: "Neural Dynamics", commit: "High Entropy" },
      favSong: "Math Symphony",
      favArtist: "Mozart",
      favEquation: "x² + y² = r²",
      favQuote: "Curiosity is the engine of achievement."
    },
    {
      name: "ROOPESH",
      role: "EVENTS HEAD",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-teal-600 to-emerald-600",
      initials: "RK",
      photo: eventImg,
      bio: "Pioneering the web platforms, mathematical visualization systems, and computational servers with optimal low-latency algorithms.",
      stats: { projects: "20+ Deployments", forte: "System Scalability", commit: "Pure Terminal" },
      favSong: "Yennai Maatrum",
      favArtist: "Anirudh Ravichander",
      favEquation: "1 + w + w² = 0",
      favQuote: "know what you are to whom before thinking about why"
    },
    {
      name: "TANISI",
      photo: outImg,
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
      name: "NISHMEETHAA",
      role: "POSITION",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      photo: mgmtImg,
      avatarGradient: "from-violet-600 to-rose-600",
      initials: "RS",
      bio: "Refining visual frontends, dynamic wireframe topologies, and crafting pixel-perfect interactive component systems for user delight.",
      stats: { projects: "14+ Blueprints", forte: "Dynamic Interaction", commit: "Aesthetic Rigor" },
      favSong: "Math Symphony",
      favArtist: "Mozart",
      favEquation: "x² + y² = r²",
      favQuote: "Curiosity is the engine of achievement."
    }
  ];

  // Divide the 11 members into two distinct infinite sliding marquee tracks
  const track1Members = team.slice(0, 6);
  const track2Members = team.slice(6, 11);

  // Triple the elements inside each track array for completely seamless infinite loop
  const t1Infinite = [...track1Members, ...track1Members, ...track1Members];
  const t2Infinite = [...track2Members, ...track2Members, ...track2Members];

  return (
    <section 
      id="team" 
      className="relative min-h-screen w-full py-24 bg-transparent z-10 px-4 md:px-8 overflow-hidden"
    >
      {/* Blueprint grid layout lines matching context */}
      <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
        <svg className="w-full h-full stroke-purple-900/40" strokeWidth="0.8">
          <defs>
            <pattern id="gridLarge" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridLarge)" />
        </svg>
      </div>

      {/* Pink Vector visual flash projected at the bottom left of Team Page */}
      <div className="absolute left-[-2%] bottom-[-2%] w-[25vw] max-w-[280px] aspect-[666/366] opacity-35 pointer-events-none mix-blend-screen z-0">
        <svg className="w-full h-full text-purple-900" viewBox="0 0 666 366" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#bg_vector_blur_team)">
            <path d="M183.904 659.201L253.243 718.975L281.037 787.132L488.355 343.475L55.5655 176.937L-94.2272 236.285L-118.053 383.826L-438.6 476.267L-220.4 684.206L-60.4626 626.981L-28.158 888.357L138.496 785.546L183.904 659.201Z" fill="#6B0884"/>
            <path d="M183.904 659.201L253.243 718.975L281.037 787.132L488.355 343.475L55.5655 176.937L-94.2272 236.285L-118.053 383.826L-438.6 476.267L-220.4 684.206L-60.4626 626.981L-28.158 888.357L138.496 785.546L183.904 659.201Z" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1.5"/>
          </g>
          <defs>
            <filter id="bg_vector_blur_team" x="-615.976" y="-9.15527e-05" width="1281.41" height="1065.59" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="24" result="effect1_foregroundBlur"/>
            </filter>
          </defs>
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
            id="team-dossier-overlay"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 200 }}
              className="relative w-full max-w-4xl bg-[#FAF6EB] border-8 border-[#3D1A3C] rounded-[40px] p-6 md:p-10 overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-12 gap-6 text-left text-[#3D1A3C]"
              onClick={(e) => e.stopPropagation()}
              id="team-dossier-container"
            >
              {/* Absolute background hand-drawn doodle assets mapping the attached design */}
              
              {/* 1. Flag pennants garland hanging top right */}
              <svg className="absolute top-2 right-12 w-48 h-24 text-[#3D1A3C]/85 pointer-events-none z-0" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M10,15 Q100,55 190,15" />
                <polygon points="30,22 35,60 55,29" fill="#3D1A3C" fillOpacity="0.1" />
                <polygon points="30,22 35,60 55,29" />
                <line x1="32" y1="32" x2="48" y2="42" />
                <line x1="33" y1="42" x2="42" y2="48" />
                
                <polygon points="70,30 80,72 95,32" fill="#3D1A3C" fillOpacity="0.1" />
                <polygon points="70,30 80,72 95,32" />
                <line x1="72" y1="40" x2="88" y2="50" />
                
                <polygon points="110,32 125,72 135,30" fill="#3D1A3C" fillOpacity="0.1" />
                <polygon points="110,32 125,72 135,30" />
                <line x1="112" y1="42" x2="128" y2="52" />
                
                <polygon points="150,24 165,60 175,19" fill="#3D1A3C" fillOpacity="0.1" />
                <polygon points="150,24 165,60 175,19" />
              </svg>

              {/* 2. Hand-drawn mountains and flying birds */}
              <svg className="absolute left-[33%] top-[20%] w-28 h-14 text-[#3D1A3C]/75 pointer-events-none z-0 hidden sm:block" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M5,45 Q20,15 40,45" />
                <path d="M30,45 Q48,22 65,45" />
                <path d="M45,12 Q49,8 53,12 Q57,8 61,12" />
                <path d="M63,18 Q66,15 69,18 Q72,15 75,18" />
              </svg>

              {/* 3. Squiggly curls in margins */}
              <svg className="absolute left-3 top-[35%] w-8 h-20 text-[#3D1A3C]/40 pointer-events-none z-0" viewBox="0 0 30 100" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5,10 C22,10 27,24 12,34 C-3,44 27,54 12,68 C-3,82 22,92 12,102" />
              </svg>

              {/* 4. Swirl and stars bottom left */}
              <svg className="absolute left-6 bottom-4 w-12 h-12 text-[#3D1A3C]/60 pointer-events-none z-0" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M10,40 A 15,15 0 1,1 40,40 A 12,12 0 1,1 20,30" />
              </svg>

              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 z-40 p-2 text-[#3D1A3C]/70 hover:text-[#3D1A3C] bg-[#3D1A3C]/10 hover:bg-[#3D1A3C]/20 rounded-full border border-[#3D1A3C]/20 transition-all cursor-pointer shadow-sm"
                id="team-modal-close"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Header Title block */}
              <div className="col-span-12 relative z-10 select-none pb-2">
                <h2 className="font-display font-black text-4xl sm:text-6xl tracking-wider text-[#3D1A3C] uppercase leading-[0.9] mb-1">
                  {selectedMember.name}
                </h2>
                <h3 className="font-doodle text-lg sm:text-2xl font-black tracking-widest text-[#542d54] uppercase">
                  {selectedMember.role}
                </h3>
                {/* Wavy divider line doodle */}
                <div className="w-64 max-w-full h-3 text-[#3D1A3C]/70 mt-3 select-none">
                  <svg className="w-full h-full" viewBox="0 0 300 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M 5,6 Q 75,10 150,4 T 295,8" />
                    <path d="M 12,9 Q 100,5 200,9 T 288,7" />
                  </svg>
                </div>
              </div>

              {/* Left Column: Favourites Card */}
              <div className="col-span-12 md:col-span-6 flex flex-col justify-between relative z-10">
                <div className="bg-[#2E112D] border-4 border-[#3D1A3C] rounded-[32px] p-6 shadow-xl flex flex-col justify-between h-full min-h-[380px]">
                  
                  {/* Card Title "FAVOURITES" */}
                  <div className="font-handwritten text-4xl text-[#FAF6EB] font-black tracking-widest text-center mb-6 select-none">
                    FAVOURITES
                  </div>

                  <div className="space-y-6 flex-grow flex flex-col justify-around">
                    {/* Item 1: Song */}
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-[#FAF6EB] bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="3" />
                          <line x1="5" y1="14" x2="19" y2="14" />
                          <circle cx="12" cy="8" r="3" />
                          <circle cx="12" cy="18" r="3.5" />
                          <circle cx="12" cy="18" r="1" fill="currentColor" />
                        </svg>
                      </div>
                      <div className="flex flex-col text-[#FAF6EB]">
                        <span className="font-serif-italic font-bold text-xl leading-tight tracking-wide italic">
                          {selectedMember.favSong || "Yennai Maatrum"}
                        </span>
                        <span className="font-handwritten text-lg opacity-85 mt-0.5">
                          - {selectedMember.favArtist || "Anirudh Ravichander"}
                        </span>
                      </div>
                    </div>

                    {/* Item 2: Equation */}
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-[#FAF6EB] bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                          <path d="M10 8 l2 4 l3 -6 h3" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="font-display font-bold text-xl sm:text-2xl text-[#FAF6EB] tracking-wider italic">
                        {selectedMember.favEquation || "1 + w + w² = 0"}
                      </div>
                    </div>

                    {/* Item 3: Quote */}
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-[#FAF6EB] bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                        <span className="text-4xl font-serif-italic font-black text-[#FAF6EB]/60 select-none">“</span>
                      </div>
                      <div className="font-handwritten text-xl text-[#FAF6EB]/95 leading-tight italic max-w-xs">
                        &ldquo;{selectedMember.favQuote || "know what you are to whom before thinking about why"}&rdquo;
                      </div>
                    </div>
                  </div>

                  {/* Favourites profile avatar and social links bottom row */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 w-full">
                    <div className="relative flex items-center gap-3">
                      {/* Leaf sprouts doodle background and round mini avatar */}
                      <div className="absolute -left-3 -top-3 w-16 h-16 pointer-events-none text-[#FAF6EB]/15 z-0">
                        <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M15,25 Q5,15 12,5" />
                          <path d="M12,5 Q18,12 15,25" />
                          <path d="M15,25 Q28,18 32,10" />
                          <path d="M32,10 Q25,22 15,25" />
                        </svg>
                      </div>
                      <div className="relative w-11 h-11 rounded-full border-2 border-[#FAF6EB]/40 overflow-hidden z-10 bg-black">
                        <img 
                          src={temporaryProfileImg} 
                          alt={selectedMember.name} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer" 
                        />
                      </div>
                      <div className="absolute -bottom-1 left-7 bg-purple-600 border border-white/20 p-1 rounded-full z-20 shadow cursor-pointer">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex gap-3 z-10">
                      <a href={selectedMember.linkedin} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/10">
                        <Link className="w-4 h-4 text-[#0077b5]" />
                      </a>
                      <a href={selectedMember.github} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/10">
                        <GitBranch className="w-4 h-4 text-[#ffffff]" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Standing Photo & Doodles */}
              <div className="col-span-12 md:col-span-6 flex items-center justify-center relative min-h-[360px] z-10">
                
                {/* Crown doodle sitting right on his head */}
                <div className="absolute -top-12 left-[48%] -translate-x-1/2 w-16 h-12 text-[#3D1A3C] rotate-[8deg] z-20 select-none">
                  <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10,65 L15,30 L38,48 L50,18 L62,48 L85,30 L90,65 Z" fill="#3D1A3C" fillOpacity="0.08" />
                    <circle cx="15" cy="30" r="3.5" fill="currentColor" />
                    <circle cx="50" cy="18" r="3.5" fill="currentColor" />
                    <circle cx="85" cy="30" r="3.5" fill="currentColor" />
                    <path d="M10,65 Q50,70 90,65" strokeWidth="2.5" />
                    <path d="M12,60 Q50,65 88,60" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Stars near crown */}
                <div className="absolute top-[-8px] right-[15%] w-6 h-6 text-[#3D1A3C]/50 pointer-events-none z-0">
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12,2 L14,9 L21,9 L15,13 L17,20 L12,16 L7,20 L9,13 L3,9 L10,9 Z" fill="currentColor" />
                  </svg>
                </div>
                
                {/* Free ground standing shadow line under the frame */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-52 h-8 text-[#3D1A3C]/25 pointer-events-none select-none z-0">
                  <svg className="w-full h-full" viewBox="0 0 200 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M 10,25 Q 100,45 190,25" />
                    <path d="M 20,30 Q 100,50 180,30" />
                  </svg>
                </div>

                {/* Standing Frame: Beautifully styled rectangular portrait with thick purple border matching Image 1 */}
                <div className="relative w-full max-w-[290px] aspect-[11/14] rounded-2xl overflow-hidden border-4 border-[#3D1A3C] shadow-xl transform rotate-[-1deg] transition-all duration-300 hover:rotate-0 hover:scale-[1.02] bg-[#FAF6EB]">
                  <img 
                    src={temporaryProfileImg} 
                    alt={selectedMember.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle leafy doodle overlays at the bottom-left edges */}
                  <div className="absolute bottom-2 left-2 pointer-events-none text-[#FAF6EB]/40">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2,22 Q10,12 22,2" />
                    </svg>
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}