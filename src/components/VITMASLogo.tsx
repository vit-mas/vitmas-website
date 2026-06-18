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
          {/* Concentric Clockwise Circular Path starting from 6 o'clock (100, 178) */}
          <path
            id="clockwiseLogoPath"
            d="M 100, 178 A 78,78 0 1,1 100.1, 178"
            fill="none"
            stroke="none"
          />
          {/* Inner Circle clipPath for mathematical coordinate grid */}
          <clipPath id="innerGridClip">
            <circle cx="100" cy="100" r="70" />
          </clipPath>
          {/* Mask to keep the grid visible everywhere except the central horizontal band */}
          <mask id="gridMask">
            {/* Solid white circle means fully visible */}
            <circle cx="100" cy="100" r="70" fill="white" />
            {/* Black rect means fully hidden in central band */}
            <rect x="15" y="76" width="170" height="48" fill="black" />
          </mask>
        </defs>

        {/* Outer Circular border ring removed as requested */}

        {/* Text Area Circle Border */}
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="white"
          strokeWidth="3.2"
        />

        {/* Mathematical Coordinate Grid enclosed within inner circle, masked to hide central area */}
        <g mask="url(#gridMask)" opacity="0.8">
          {/* Vertical Grid Lines */}
          <line x1="30" y1="30" x2="30" y2="170" stroke="white" strokeWidth="0.8" />
          <line x1="44" y1="30" x2="44" y2="170" stroke="white" strokeWidth="0.8" />
          <line x1="58" y1="30" x2="58" y2="170" stroke="white" strokeWidth="0.8" />
          <line x1="72" y1="30" x2="72" y2="170" stroke="white" strokeWidth="0.8" />
          <line x1="86" y1="30" x2="86" y2="170" stroke="white" strokeWidth="0.8" />
          <line x1="100" y1="30" x2="100" y2="170" stroke="white" strokeWidth="1.2" />
          <line x1="114" y1="30" x2="114" y2="170" stroke="white" strokeWidth="0.8" />
          <line x1="128" y1="30" x2="128" y2="170" stroke="white" strokeWidth="0.8" />
          <line x1="142" y1="30" x2="142" y2="170" stroke="white" strokeWidth="0.8" />
          <line x1="156" y1="30" x2="156" y2="170" stroke="white" strokeWidth="0.8" />
          <line x1="170" y1="30" x2="170" y2="170" stroke="white" strokeWidth="0.8" />

          {/* Horizontal Grid Lines */}
          <line x1="30" y1="30" x2="170" y2="30" stroke="white" strokeWidth="0.8" />
          <line x1="30" y1="44" x2="170" y2="44" stroke="white" strokeWidth="0.8" />
          <line x1="30" y1="58" x2="170" y2="58" stroke="white" strokeWidth="0.8" />
          <line x1="30" y1="72" x2="170" y2="72" stroke="white" strokeWidth="0.8" />
          <line x1="30" y1="86" x2="170" y2="86" stroke="white" strokeWidth="0.8" />
          <line x1="30" y1="100" x2="170" y2="100" stroke="white" strokeWidth="1.2" />
          <line x1="30" y1="114" x2="170" y2="114" stroke="white" strokeWidth="0.8" />
          <line x1="30" y1="128" x2="170" y2="128" stroke="white" strokeWidth="0.8" />
          <line x1="30" y1="142" x2="170" y2="142" stroke="white" strokeWidth="0.8" />
          <line x1="30" y1="156" x2="170" y2="156" stroke="white" strokeWidth="0.8" />
          <line x1="30" y1="170" x2="170" y2="170" stroke="white" strokeWidth="0.8" />
        </g>

        {/* Horizontal Band masking the grid */}
        <rect
          x="15"
          y="78"
          width="170"
          height="44"
          fill="none"
          stroke="white"
          strokeWidth="3.2"
          clipPath="url(#innerGridClip)"
        />

        {/* Separator Dots (Clockwise spacing aligning text quadrants) */}
        {/* Dot 1 (8 o'clock, 150deg) */}
        <circle cx="32.5" cy="139" r="3.2" fill="white" />
        {/* Dot 2 (10 o'clock, 210deg) */}
        <circle cx="32.5" cy="61" r="3.2" fill="white" />
        {/* Dot 3 (2 o'clock, 330deg) */}
        <circle cx="167.5" cy="61" r="3.2" fill="white" />
        {/* Dot 4 (6 o'clock, 90deg) */}
        <circle cx="100" cy="178" r="3.2" fill="white" />

        {/* Circular text path rendering clockwise around the ring */}
        <text 
          className="fill-white font-black hover:fill-slate-100"
          style={{ 
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "8.5px", 
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
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "8.2px", 
            letterSpacing: "0.14em" 
          }}
        >
          {/* Right text */}
          <textPath href="#clockwiseLogoPath" startOffset="83.3%" textAnchor="middle">
            MATHEMATICAL ASSOCIATION
          </textPath>
        </text>

        <text 
          className="fill-white font-bold"
          style={{ 
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "8px", 
            letterSpacing: "0.14em" 
          }}
        >
          {/* Bottom text */}
          <textPath href="#clockwiseLogoPath" startOffset="8.3%" textAnchor="middle">
            STUDENT CHAPTER
          </textPath>
        </text>

        <text 
          className="fill-white font-bold"
          style={{ 
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "8px", 
            letterSpacing: "0.12em" 
          }}
        >
          {/* Left text */}
          <textPath href="#clockwiseLogoPath" startOffset="25%" textAnchor="middle">
            EST.2017
          </textPath>
        </text>

        {/* Central master integral symbol "∫" */}
        <text
          x="100"
          y="138"
          className="fill-white font-light select-none text-center"
          textAnchor="middle"
          style={{
            fontFamily: "Times New Roman, Times, Georgia, serif",
            fontSize: "128px",
            fontWeight: 300,
          }}
        >
          ∫
        </text>

        {/* Left text label "VIT" */}
        <text
          x="61"
          y="108"
          className="fill-white font-bold font-serif select-none"
          textAnchor="middle"
          style={{
            fontFamily: "Times New Roman, Times, Georgia, serif",
            fontSize: "24px",
            letterSpacing: "0.06em"
          }}
        >
          VIT
        </text>

        {/* Right text label "MAS" */}
        <text
          x="139"
          y="108"
          className="fill-white font-bold font-serif select-none"
          textAnchor="middle"
          style={{
            fontFamily: "Times New Roman, Times, Georgia, serif",
            fontSize: "24px",
            letterSpacing: "0.06em"
          }}
        >
          MAS
        </text>
      </svg>
    </div>
  );
}
