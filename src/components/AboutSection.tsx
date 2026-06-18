import React from "react";
import { motion } from "motion/react";
import MathWireframe from "./MathWireframe";

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent z-10 px-4 md:px-8 py-32"
    >
      {/* Visual background atmospheric elements - glowing orbs matching Figma style */}
      <div className="absolute top-1/4 left-1/4 w-[25vw] h-[25vw] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-fuchsia-950/15 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-[20vw] h-[20vw] rounded-full bg-indigo-950/25 blur-[100px] pointer-events-none" />



      {/* Floating 3D projection mathematical wireframes exactly placed like mockup */}
      
      {/* Top central wireframe - Hyperbolic Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 opacity-30 select-none scale-125 md:scale-150">
        <MathWireframe type="hyperbolic" width={500} height={500} speed={0.15} />
      </div>

      {/* Bottom left wireframe - Horn Torus */}
      <div className="absolute bottom-[-10%] left-[-5%] md:left-[5%] opacity-40 select-none scale-90 md:scale-125">
        <MathWireframe type="torus" width={420} height={420} speed={0.3} />
      </div>

      {/* Bottom right wireframe - Concentric Spherical Spiral Grid */}
      <div className="absolute bottom-[-15%] right-[-10%] md:right-[5%] opacity-45 select-none scale-90 md:scale-125">
        <MathWireframe type="concentric" width={450} height={450} speed={0.25} />
      </div>

      {/* Main Core Content Container */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-5xl mx-auto select-none mt-12 w-full">
        {/* Massive glowing VITMAS Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
          id="vitmas-display-title-wrapper"
        >
          {/* Main Title text with custom letters matching Image 5 */}
          <h1 
            className="font-display font-extrabold text-[12vw] xs:text-[13vw] sm:text-[14vw] md:text-[10rem] tracking-[0.18em] text-white leading-none text-glow-white uppercase select-none mr-[-0.18em] whitespace-nowrap"
            id="vitmas-display-title"
          >
            VITMAS
          </h1>
        </motion.div>

        {/* Detailed Tagline with proper letter pacing matching mockups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="mt-8 md:mt-12 max-w-3xl flex flex-col items-center gap-2 px-4"
          id="tagline-wrapper"
        >
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase font-mono font-medium text-purple-300 select-none">
            [ MATHEMATICAL ASSOCIATION ]
          </span>
          
          <p 
            className="font-display font-medium text-base md:text-2xl tracking-[0.25em] text-white leading-relaxed select-none opacity-90 uppercase mt-4 text-glow-purple"
            id="vitmas-tagline"
          >
            Bridging the gap between mathematical theory
            <span className="block mt-2 font-display">and technological innovation</span>
          </p>
        </motion.div>

        {/* Floating/pulse interactive design indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-20 flex flex-col items-center gap-2 cursor-pointer opacity-40 hover:opacity-80 transition-opacity duration-300"
          id="scroll-indicator"
          onClick={() => {
            window.location.hash = "projects";
          }}
        >
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/60">Explore Dimensions</span>
          <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
