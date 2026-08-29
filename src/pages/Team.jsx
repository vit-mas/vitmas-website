import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "motion/react";
import { Cpu, Layers, Award, Terminal, Code, Heart } from "lucide-react";
// @ts-ignore
import eventImg from "../assets/images/events.jpg";
import techImg from "../assets/images/tech.png";
import editorialImg from "../assets/images/editorial.png";
import projectsImg from "../assets/images/projects.png";
import genSecImg from "../assets/images/gensec.png";
import mgmtImg from "../assets/images/mgmt.png";
import chairImg from "../assets/images/chair.png";
import outImg from "../assets/images/outreach.jpg";
import vcImg from "../assets/images/vc.png";
import coSecImg from "../assets/images/cosec.jpeg";
import designImg from "../assets/images/design.png";
import facCordImg from "../assets/images/facCord.jpg"

const FoldingPointer = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 195 217"
    className={`${className} transition-transform group-hover:translate-x-1 duration-300`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* High quality 3D folding pointer representation based on figma:2:26 */}
    <path
      d="M19.5 56.5C19.5 40.2 36.3 29.5 51.1 36.2L167.3 88.8C185.3 97 186.2 122.1 168.9 131.5L78.1 180.7C62.9 188.9 44.1 178 44.1 160.7L19.5 56.5Z"
      fill="url(#ptr_grad_main)"
    />
    <path
      d="M167.3 88.8C175.5 92.5 178.5 102.5 175.6 110.8C163.5 145.4 125.8 171.2 78.1 180.7C125.6 150.3 158.4 116.8 167.3 88.8Z"
      fill="url(#ptr_grad_fold)"
    />
    <defs>
      <linearGradient
        id="ptr_grad_main"
        x1="19.5"
        y1="35"
        x2="167.3"
        y2="180.7"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#d946ef" />
        <stop offset="40%" stopColor="#a21caf" />
        <stop offset="100%" stopColor="#86198f" />
      </linearGradient>
      <linearGradient
        id="ptr_grad_fold"
        x1="167.3"
        y1="88.8"
        x2="78.1"
        y2="180.7"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#701a75" />
        <stop offset="100%" stopColor="#4c0519" />
      </linearGradient>
    </defs>
  </svg>
);

function TeamMemberCard({ member, index }) {
  const cardRef = useRef(null);

  // Viewport scroll tracking of this card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Smooth out scroll tracking using customized spring physics for cinematic flow
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.15,
    restDelta: 0.001,
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
  const scrollRotateY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [colRotateFactor, 0, -colRotateFactor],
  );

  // Codrops Style 2: Z-depth scaling as elements roll in from background and back out
  const translateZ = useTransform(smoothProgress, [0, 0.5, 1], [-180, 0, -180]);

  // Smooth scroll opacity - highly visible in center of view, blurred/faded on outer borders
  const scrollOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3],
  );

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
    ([mouseVal, scrollVal]) => `${Number(mouseVal) + Number(scrollVal)}deg`,
  );

  const rotateY = useTransform(
    [rotateYMouse, scrollRotateY],
    ([mouseVal, scrollVal]) => `${Number(mouseVal) + Number(scrollVal)}deg`,
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

  const initialsCode =
    (member.initials?.charCodeAt(0) || 0) +
    (member.initials?.charCodeAt(1) || 0);
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
        delay: index * 0.05,
      }}
      style={{ perspective: "1200px" }}
    >
      <motion.section
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          scale: 1.055,
          z: 35,
          boxShadow: "0 25px 45px rgba(168, 85, 247, 0.45)",
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 300,
            damping: 18,
          },
        }}
        style={{
          rotateX,
          rotateY,
          z: translateZ,
          y: translateY,
          opacity: scrollOpacity,
          transformStyle: "preserve-3d",
          perspective: "1200px",
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
          <div
            className={`absolute inset-0 bg-gradient-to-br ${member.avatarGradient} opacity-20 group-hover:opacity-45 transition-opacity duration-300`}
          />
          <img
            src={member.photo || temporaryProfileImg}
            alt={member.name}
            className="relative z-10 h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        <div
          className="photo-circle-overlay"
          style={{ transform: "translateZ(32px)" }}
        ></div>

        <div
          className="social-icons"
          style={{ transform: "translateX(-50%) translateZ(40px)" }}
        >
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="transition-transform hover:scale-110"
          >
            <svg
              className="icon-linkedin text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] hover:text-[#0077b5] transition-colors"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href={member.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="transition-transform hover:scale-110"
          >
            <svg
              className="icon-github text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] hover:text-[#9333ea] transition-colors"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
        <h2
          className="card-role"
          style={{ transform: "translateX(-50%) translateZ(20px)" }}
        >
          {member.role}
        </h2>
        <h2
          className="card-name"
          style={{ transform: "translateX(-50%) translateZ(15px)" }}
        >
          {member.name}
        </h2>
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
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
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
            ease: "easeOut",
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
            ease: "easeOut",
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
            ease: "circOut",
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
          { x: 220, y: 5, rot: 15, size: 25, delay: 0.68 },
        ].map((spark, idx) => (
          <motion.div
            key={idx}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
            whileInView={{
              x: [0, spark.x],
              y: [0, spark.y],
              scale: [0, 1.3, 1.0],
              opacity: [0, 1, 0.8],
              rotate: [0, spark.rot],
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              delay: spark.delay,
              duration: 1.0,
              type: "tween",
              ease: "easeOut",
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
              },
            },
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
                  filter: "blur(20px)",
                },
                visible: {
                  opacity: [0, 1, 1],
                  scale: [0.01, 1.35, 1],
                  z: [0, 180, 0],
                  rotateX: [-40, 15, 0],
                  rotateY: [20, -5, 0],
                  filter: ["blur(20px)", "blur(0px)", "blur(0px)"],
                  transition: {
                    duration: 1.15,
                    times: [0, 0.65, 1],
                    type: "tween",
                    ease: "easeOut",
                  },
                },
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
                  WebkitTextStroke: "1px rgba(168,85,247,0.3)",
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

  const team = [
    {
      name: "Dr. JAGADEESH KUMAR M.S",
      role: "Faculty Coordinator",
      linkedin: "https://www.linkedin.com/in/dr-m-s-jagadeesh-kumar-01015830/",
      github: "https://www.researchgate.net/profile/Ms-Jagadeesh-Kumar",
      photo: facCordImg,
      avatarGradient: "from-purple-600 to-indigo-600",
      initials: "JK",
    },
    {
      name: "Ashman Sodhi",
      role: "Chairperson",
      linkedin: "https://www.linkedin.com/in/ashman-sodhi-094b53243/",
      github: "https://github.com/AshmanSodhi",
      photo: chairImg,
      avatarGradient: "from-purple-600 to-indigo-600",
      initials: "AS",
    },
    {
      name: "Aditi Chaudhary",
      role: "General Secretary",
      photo: genSecImg,
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-pink-600 to-fuchsia-600",
      initials: "AD",
    },
    {
      name: "Saksham Goyal",
      role: "Vice Chairperson",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-blue-600 to-cyan-600",
      initials: "SG",
      photo: vcImg,
    },
    {
      name: "Dhanesh Baheti",
      role: "Co-Secretary",
      photo: coSecImg,
      linkedin: "https://www.linkedin.com/in/dhaneshbaheti/",
      github: "https://github.com/DhaneshBaheti",
      avatarGradient: "from-rose-600 to-amber-600",
      initials: "DH",
    },
    {
      name: "Anirudha",
      role: "Design Head",
      photo: designImg,
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-amber-600 to-pink-600",
      initials: "IB",
    },
    {
      name: "Abha Dongre",
      role: "Tech Head",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-violet-600 to-purple-600",
      initials: "AM",
      photo: techImg,
    },
    {
      name: "Harshitha D",
      role: "Projects Head",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-fuchsia-600 to-purple-800",
      initials: "SS",
      photo: projectsImg,
    },
    {
      name: "Gargee Saha",
      role: "Editorial Head",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-indigo-600 to-cyan-600",
      initials: "MI",
      photo: editorialImg,
    },
    {
      name: "Roopesh",
      role: "Events Head",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-teal-600 to-emerald-600",
      initials: "RK",
      photo: eventImg,
    },
    {
      name: "Tanisi Choudhari",
      photo: outImg,
      role: "Outreach and PR Head",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      avatarGradient: "from-cyan-600 to-teal-600",
      initials: "KP",
    },
    {
      name: "Nishmeethaa",
      role: "Management Head",
      linkedin: "https://linkedin.com/in/#",
      github: "https://github.com/#",
      photo: mgmtImg,
      avatarGradient: "from-violet-600 to-rose-600",
      initials: "RS",
    },
  ];

  const row1 = team.slice(0, 3);
  const row2 = team.slice(3, 6);
  const row3 = team.slice(6, 9);
  const row4 = team.slice(9, 12);

  return (
    <section
      id="team"
      className="relative min-h-screen w-full py-24 bg-transparent z-10 px-4 md:px-8 overflow-hidden"
    >
      {/* Blueprint grid layout lines matching context */}
      <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
        <svg className="w-full h-full stroke-purple-900/40" strokeWidth="0.8">
          <defs>
            <pattern
              id="gridLarge"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 80 0 L 0 0 0 80" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridLarge)" />
        </svg>
      </div>

      {/* Pink Vector visual flash projected at the bottom left of Team Page */}
      <div className="absolute left-[-2%] bottom-[-2%] w-[25vw] max-w-[280px] aspect-[666/366] opacity-35 pointer-events-none mix-blend-screen z-0">
        <svg
          className="w-full h-full text-purple-900"
          viewBox="0 0 666 366"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#bg_vector_blur_team)">
            <path
              d="M183.904 659.201L253.243 718.975L281.037 787.132L488.355 343.475L55.5655 176.937L-94.2272 236.285L-118.053 383.826L-438.6 476.267L-220.4 684.206L-60.4626 626.981L-28.158 888.357L138.496 785.546L183.904 659.201Z"
              fill="#6B0884"
            />
            <path
              d="M183.904 659.201L253.243 718.975L281.037 787.132L488.355 343.475L55.5655 176.937L-94.2272 236.285L-118.053 383.826L-438.6 476.267L-220.4 684.206L-60.4626 626.981L-28.158 888.357L138.496 785.546L183.904 659.201Z"
              stroke="rgba(168, 85, 247, 0.4)"
              strokeWidth="1.5"
            />
          </g>
          <defs>
            <filter
              id="bg_vector_blur_team"
              x="-615.976"
              y="-9.15527e-05"
              width="1281.41"
              height="1065.59"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="24"
                result="effect1_foregroundBlur"
              />
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

        {/* Profiles Layout: 3-3-3-3 grid structure */}
        <div className="space-y-16">
          {[row1, row2, row3, row4].map((row, rowIndex) => (
            <div
              key={`team-row-${rowIndex}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-7xl mx-auto w-full justify-items-center"
            >
              {row.map((member) => {
                const originalIndex = team.indexOf(member);
                return (
                  <div
                    key={`${member.name}-${originalIndex}`}
                    className="w-full max-w-[442px] mx-auto"
                  >
                    <TeamMemberCard
                      member={member}
                      index={originalIndex !== -1 ? originalIndex : rowIndex * 3}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
