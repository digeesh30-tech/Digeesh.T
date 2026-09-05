import React from "react";

interface EcoLensLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showLabel?: boolean;
  pulse?: boolean;
  className?: string;
}

export const EcoLensLogo: React.FC<EcoLensLogoProps> = ({
  size = "md",
  showLabel = true,
  pulse = false,
  className = "",
}) => {
  const sizeMap = {
    sm: { box: "w-8 h-8", svg: 32, text: "text-base", badge: "text-[10px]" },
    md: { box: "w-11 h-11", svg: 44, text: "text-lg", badge: "text-xs" },
    lg: { box: "w-16 h-16", svg: 64, text: "text-2xl", badge: "text-sm" },
    xl: { box: "w-24 h-24", svg: 96, text: "text-3xl", badge: "text-base" },
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`} id="ecolens-logo-container">
      <div className={`relative ${current.box} shrink-0 select-none`}>
        {pulse && (
          <div className="absolute inset-0 rounded-2xl bg-red-600/30 blur-md animate-ping pointer-events-none" />
        )}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base rounded octagonal shield */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="24"
            fill="#0F0F12"
            stroke="#27272A"
            strokeWidth="2.5"
          />

          {/* Red Laser Targeting Ring */}
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke="#DC2626"
            strokeWidth="1.75"
            strokeDasharray="4 3"
            className="animate-spin"
            style={{ animationDuration: "14s" }}
          />

          {/* Outer Crosshairs */}
          <line x1="50" y1="6" x2="50" y2="18" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="82" x2="50" y2="94" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="6" y1="50" x2="18" y2="50" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="82" y1="50" x2="94" y2="50" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />

          {/* 4 Multi-Material Detection Quadrants */}
          {/* Top-Right: Plastic (Cyan-Blue) */}
          <circle cx="70" cy="30" r="4.5" fill="#38BDF8" />
          {/* Bottom-Right: Metal (Silver-White) */}
          <circle cx="70" cy="70" r="4.5" fill="#E2E8F0" />
          {/* Bottom-Left: Paper (Amber-Kraft) */}
          <circle cx="30" cy="70" r="4.5" fill="#F59E0B" />
          {/* Top-Left: Glass (Emerald-Green) */}
          <circle cx="30" cy="30" r="4.5" fill="#10B981" />

          {/* Lens Body */}
          <circle cx="50" cy="50" r="26" fill="#18181B" stroke="#3F3F46" strokeWidth="2" />
          <circle cx="50" cy="50" r="20" fill="#0A0A0B" stroke="#DC2626" strokeWidth="1.5" />

          {/* Stylized Continuous Circular Prism / Recycle Triad */}
          <path
            d="M50 36 L58 50 L52 50 L56 58 L46 54 L49 48 L42 48 Z"
            fill="#EF4444"
          />
          {/* Precision Laser Core */}
          <circle cx="50" cy="50" r="4" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="2" fill="#EF4444" />
        </svg>
      </div>

      {showLabel && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className={`font-bold tracking-tight text-white font-['Space_Grotesk'] ${current.text}`}>
              EcoLens<span className="text-red-500 font-extrabold ml-0.5">AI</span>
            </span>
          </div>
          <span className="text-[10px] font-medium tracking-wider uppercase text-zinc-400">
            Circular Scanner
          </span>
        </div>
      )}
    </div>
  );
};
