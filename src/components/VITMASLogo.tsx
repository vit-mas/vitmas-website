import React from "react";

interface VITMASLogoProps {
  className?: string;
  size?: number;
}

export default function VITMASLogo({ className = "", size = 120 }: VITMASLogoProps) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none transition-all duration-300 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      id="vitmas-logo-container"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full text-white"
        xmlns="http://www.w3.org/2000/svg"
        id="vitmas-logo-svg"
      >
        <defs>
          {/* Clockwise Circular Path starting from 6 o'clock (100, 184) with radius 84 */}
          <path
            id="clockwiseLogoPath"
            d="M 100, 184 A 84,84 0 1,1 100.1, 184"
            fill="none"
            stroke="none"
          />
          {/* Inner Circle clipPath for mathematical coordinate grid */}
          <clipPath id="innerGridClip">
            <circle cx="100" cy="100" r="74" />
          </clipPath>
          {/* Mask to keep the grid visible everywhere except the central horizontal band */}
          <mask id="gridMask">
            {/* Solid white circle means fully visible */}
            <circle cx="100" cy="100" r="74" fill="white" />
            {/* Black rect means fully hidden in central band */}
            <rect x="15" y="80" width="170" height="40" fill="black" />
          </mask>
        </defs>

        {/* Background Solid Black Circle */}
        <circle cx="100" cy="100" r="94" fill="black" />

        {/* Outermost Circular white border ring */}
        <circle
          cx="100"
          cy="100"
          r="94"
          fill="none"
          stroke="white"
          strokeWidth="3.2"
        />

        {/* Text Area Inner Circle Border */}
        <circle
          cx="100"
          cy="100"
          r="74"
          fill="none"
          stroke="white"
          strokeWidth="3.2"
        />

        {/* Mathematical Coordinate Grid enclosed within inner circle, masked to hide central area */}
        <g mask="url(#gridMask)" opacity="0.8">
          {/* Vertical Grid Lines */}
          <line x1="30" y1="26" x2="30" y2="174" stroke="white" strokeWidth="0.8" />
          <line x1="44" y1="26" x2="44" y2="174" stroke="white" strokeWidth="0.8" />
          <line x1="58" y1="26" x2="58" y2="174" stroke="white" strokeWidth="0.8" />
          <line x1="72" y1="26" x2="72" y2="174" stroke="white" strokeWidth="0.8" />
          <line x1="86" y1="26" x2="86" y2="174" stroke="white" strokeWidth="0.8" />
          <line x1="100" y1="26" x2="100" y2="174" stroke="white" strokeWidth="1.5" />
          <line x1="114" y1="26" x2="114" y2="174" stroke="white" strokeWidth="0.8" />
          <line x1="128" y1="26" x2="128" y2="174" stroke="white" strokeWidth="0.8" />
          <line x1="142" y1="26" x2="142" y2="174" stroke="white" strokeWidth="0.8" />
          <line x1="156" y1="26" x2="156" y2="174" stroke="white" strokeWidth="0.8" />
          <line x1="170" y1="26" x2="170" y2="174" stroke="white" strokeWidth="0.8" />

          {/* Horizontal Grid Lines */}
          <line x1="26" y1="30" x2="174" y2="30" stroke="white" strokeWidth="0.8" />
          <line x1="26" y1="44" x2="174" y2="44" stroke="white" strokeWidth="0.8" />
          <line x1="26" y1="58" x2="174" y2="58" stroke="white" strokeWidth="0.8" />
          <line x1="26" y1="72" x2="174" y2="72" stroke="white" strokeWidth="0.8" />
          <line x1="26" y1="86" x2="174" y2="86" stroke="white" strokeWidth="0.8" />
          <line x1="26" y1="100" x2="174" y2="100" stroke="white" strokeWidth="1.5" />
          <line x1="26" y1="114" x2="174" y2="114" stroke="white" strokeWidth="0.8" />
          <line x1="26" y1="128" x2="174" y2="128" stroke="white" strokeWidth="0.8" />
          <line x1="26" y1="142" x2="174" y2="142" stroke="white" strokeWidth="0.8" />
          <line x1="26" y1="156" x2="174" y2="156" stroke="white" strokeWidth="0.8" />
          <line x1="26" y1="170" x2="174" y2="170" stroke="white" strokeWidth="0.8" />
        </g>

        {/* Horizontal Band masking the grid */}
        <rect
          x="15"
          y="80"
          width="170"
          height="40"
          fill="none"
          stroke="white"
          strokeWidth="3.2"
          clipPath="url(#innerGridClip)"
        />

        {/* Separator Dots (Clockwise spacing matching the logo image perfectly) */}
        {/* Dot 1 (Top-Left: 10:30, 225deg) */}
        <circle cx="40.6" cy="40.6" r="3.2" fill="white" />
        {/* Dot 2 (Top-Right: 1:30, 315deg) */}
        <circle cx="159.4" cy="40.6" r="3.2" fill="white" />
        {/* Dot 3 (Bottom-Right: 5:00, 60deg) */}
        <circle cx="142" cy="172.7" r="3.2" fill="white" />
        {/* Dot 4 (Bottom-Left: 7:00, 120deg) */}
        <circle cx="58" cy="172.7" r="3.2" fill="white" />

        {/* Circular text path rendering clockwise around the ring */}
        <text 
          className="fill-white font-bold"
          style={{ 
            fontFamily: "'Inter', 'Space Grotesk', system-ui, sans-serif",
            fontSize: "8.8px", 
            letterSpacing: "0.19em" 
          }}
        >
          {/* Top text */}
          <textPath href="#clockwiseLogoPath" startOffset="50%" textAnchor="middle">
            VELLORE INSTITUTE OF TECHNOLOGY
          </textPath>
        </text>

        <text 
          className="fill-white font-bold"
          style={{ 
            fontFamily: "'Inter', 'Space Grotesk', system-ui, sans-serif",
            fontSize: "8.5px", 
            letterSpacing: "0.14em" 
          }}
        >
          {/* Right text */}
          <textPath href="#clockwiseLogoPath" startOffset="78%" textAnchor="middle">
            MATHEMATICAL ASSOCIATION
          </textPath>
        </text>

        <text 
          className="fill-white font-bold"
          style={{ 
            fontFamily: "'Inter', 'Space Grotesk', system-ui, sans-serif",
            fontSize: "8.5px", 
            letterSpacing: "0.14em" 
          }}
        >
          {/* Bottom text */}
          <textPath href="#clockwiseLogoPath" startOffset="10%" textAnchor="middle">
            STUDENT CHAPTER
          </textPath>
        </text>

        <text 
          className="fill-white font-bold"
          style={{ 
            fontFamily: "'Inter', 'Space Grotesk', system-ui, sans-serif",
            fontSize: "8.5px", 
            letterSpacing: "0.12em" 
          }}
        >
          {/* Left text */}
          <textPath href="#clockwiseLogoPath" startOffset="25%" textAnchor="middle">
            EST.2017
          </textPath>
        </text>

        {/* Central master integral symbol "∫" rendered as custom SVG path for 100% platform-independent pixel-perfect rendering */}
        {/* Top circle terminal */}
        <circle cx="121.5" cy="45" r="4.5" fill="white" />
        {/* Bottom circle terminal */}
        <circle cx="78.5" cy="155" r="4.5" fill="white" />
        {/* Elegant classical tapering S-curve stem */}
        <path
          d="M 121.5,45 C 114,45 106,65 104.5,85 C 103,105 100.5,125 93,142 C 87.5,153.5 83.5,155 78.5,155 C 86,155 90,153.5 95.5,142 C 103,125 105.5,105 107,85 C 108.5,65 114.5,45 121.5,45 Z"
          fill="white"
        />

        {/* Left text label "VIT" */}
        <text
          x="60"
          y="108"
          className="fill-white font-bold select-none"
          textAnchor="middle"
          style={{
            fontFamily: "'Cinzel', 'Playfair Display', 'Times New Roman', serif",
            fontSize: "24px",
            fontWeight: "bold",
            letterSpacing: "0.06em"
          }}
        >
          VIT
        </text>

        {/* Right text label "MAS" */}
        <text
          x="140"
          y="108"
          className="fill-white font-bold select-none"
          textAnchor="middle"
          style={{
            fontFamily: "'Cinzel', 'Playfair Display', 'Times New Roman', serif",
            fontSize: "24px",
            fontWeight: "bold",
            letterSpacing: "0.06em"
          }}
        >
          MAS
        </text>
      </svg>
    </div>
  );
}
