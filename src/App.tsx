import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "./components/Navigation";
import TeamSection from "./components/TeamSection";
import FooterSection from "./components/FooterSection";

export default function App() {
  // Navigation path tracking state
  const [currentPath, setCurrentPath] = useState("team");

  // Custom cursor tracking state
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isClickable = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer") ||
        target.classList.contains("cursor-pointer");

      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    if (path === "faq" || path === "footer") {
      const footer = document.getElementById("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-slate-100 flex flex-col overflow-x-hidden selection:bg-purple-500 selection:text-white" id="vitmas-app-root">
      
      {/* Dynamic High-Definition Figma Grid Backdrop */}
      <div className="fixed inset-0 select-none pointer-events-none overflow-hidden z-0">
        {/* Deep background color layer */}
        <div className="absolute inset-0 bg-[#000000]" />

        {/* High Definition Grid Mesh with high visibility/contrast lines */}
        <div 
          className="absolute inset-0 opacity-100" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(162, 28, 175, 0.45) 1.5px, transparent 1.5px),
              linear-gradient(to bottom, rgba(162, 28, 175, 0.45) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "60px 60px"
          }}
        />

        {/* Baseline ambient purple/fuchsia glow in the bottom-left corner */}
        <div 
          className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[800px] rounded-full blur-[120px] opacity-80"
          style={{
            background: "radial-gradient(circle at bottom left, #a21caf 0%, #7e22ce 35%, rgba(126, 34, 206, 0.15) 60%, transparent 80%)"
          }}
        />

        {/* Animated Diagonal Cloud Glow 1 */}
        <div 
          className="absolute bottom-[-10vw] left-[-10vw] w-[40vw] h-[40vw] rounded-full blur-[130px] opacity-75 animate-diagonal-cloud-1 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #b026cc 0%, rgba(176, 38, 204, 0.45) 50%, transparent 80%)"
          }}
        />

        {/* Animated Diagonal Cloud Glow 2 */}
        <div 
          className="absolute bottom-[-15vw] left-[-15vw] w-[45vw] h-[45vw] rounded-full blur-[140px] opacity-65 animate-diagonal-cloud-2 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #861d9a 0%, rgba(134, 29, 154, 0.4) 50%, transparent 80%)"
          }}
        />

        {/* Animated Diagonal Cloud Glow 3 */}
        <div 
          className="absolute bottom-[-12vw] left-[-12vw] w-[35vw] h-[35vw] rounded-full blur-[120px] opacity-70 animate-diagonal-cloud-3 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #e879f9 0%, rgba(232, 121, 249, 0.35) 40%, transparent 80%)"
          }}
        />

        {/* Crisp mathematical four-pointed sparkling star in the bottom-right corner exactly as shown on the background mockup */}
        <div className="absolute bottom-12 right-12 opacity-90 animate-pulse scale-110">
          <svg className="w-16 h-16 text-slate-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.85)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2 Q12 12 22 12 Q12 12 12 22 Q12 12 2 12 Q12 12 12 2 Z" />
          </svg>
        </div>

        {/* Elegant tiny white star sparkles around */}
        <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15%" cy="20%" r="1" fill="white" className="animate-pulse" />
          <circle cx="85%" cy="30%" r="1" fill="white" />
          <circle cx="75%" cy="80%" r="1.5" fill="white" />
          <circle cx="45%" cy="65%" r="1" fill="white" className="animate-pulse" style={{ animationDuration: "5s" }} />
        </svg>
      </div>

      {/* Render the single team page layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key="integrated-layout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col min-h-screen w-full relative z-10"
          id="integrated-responsive-site"
        >
          {/* Nav Menu with routing props */}
          <Navigation currentPath={currentPath} onNavigate={navigateTo} />

          {/* Routed View Container containing only the Team page */}
          <div className="flex-grow w-full pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full"
            >
              <TeamSection />
            </motion.div>
          </div>

          {/* Shared bottom footer strictly aligned */}
          <FooterSection />
        </motion.div>
      </AnimatePresence>

      {/* Premium futuristic custom interactive tracking cursor using Figma SVG pointer */}
      <div 
        className="hidden md:block fixed pointer-events-none z-50 animate-fade-in"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-20.14%, -39.25%)`,
          width: "26px",
          height: "28px"
        }}
      >
        <div 
          className="w-full h-full transition-transform duration-100 ease-out origin-[20.14%_39.25%]"
          style={{
            transform: `scale(${isHovering ? 1.35 : 1})`
          }}
        >
          <svg 
            viewBox="0 0 283 293" 
            className="w-full h-full text-purple-500 drop-shadow-[0_1px_4px_rgba(172,47,183,0.4)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#cursor_glow_filter)">
              <path fillRule="evenodd" clipRule="evenodd" d="M253.565 90.0262C251.847 89.4349 250.257 89.4535 248.302 89.2321C174.483 84.8539 174.483 84.8538 174.483 84.8538C81.1153 79.8516 81.1153 79.8516 81.1153 79.8516C61.8069 78.857 48.8657 98.7892 57.8719 115.651C100.433 198.906 100.433 198.906 100.433 198.906C134.232 264.924 134.232 264.924 134.232 264.924C144.494 284.703 173.897 282.282 180.099 260.597C200.362 191.378 200.362 191.378 200.362 191.378C200.47 190.4 200.95 189.661 201.189 189.292C226.297 106.953 226.297 106.953 226.297 106.953C230.051 94.6964 242.063 88.3279 253.565 90.0262Z" fill="#AC2FB7"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M226.484 106.607C201.325 188.966 201.325 188.966 201.325 188.966C202.746 185.164 205.144 181.47 208.168 179.233C263.386 132.141 263.386 132.141 263.386 132.141C279.102 119.243 272.222 94.3046 253.743 89.6568C242.255 87.9701 230.247 94.3501 226.484 106.607Z" fill="#64106C"/>
            </g>
            <defs>
              <filter id="cursor_glow_filter" x="45.0482" y="73.9159" width="236.969" height="218.396" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="4.95"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.657419 0 0 0 0 0.0235762 0 0 0 0 0.817308 0 0 0 1 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_26"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_26" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
