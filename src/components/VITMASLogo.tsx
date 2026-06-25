import React from "react";
import logoImage from "../assets/images/VITMAS-LOGO-WHITE.png";

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
      <img
        src={logoImage}
        alt="VITMAS Logo"
        className="w-full h-full object-contain"
        id="vitmas-logo-img"
      />
    </div>
  );
}
