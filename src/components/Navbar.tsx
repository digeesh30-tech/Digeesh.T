import React from "react";
import { Home, Camera, BarChart3, User } from "lucide-react";

export type NavTab = "home" | "scan" | "impact" | "profile";

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pendingPassportCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  pendingPassportCount = 0,
}) => {
  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#09090B]/95 backdrop-blur-xl border-t border-zinc-800/80 px-4 py-2 sm:py-3 transition-all duration-300"
    >
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* Home Tab */}
        <button
          id="nav-tab-home"
          type="button"
          onClick={() => onSelectTab("home")}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 ${
            activeTab === "home"
              ? "text-white scale-105"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <div className="relative">
            <Home className={`w-5 h-5 ${activeTab === "home" ? "text-red-500" : ""}`} />
            {activeTab === "home" && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
            )}
          </div>
          <span className={`text-[11px] font-medium ${activeTab === "home" ? "text-white font-semibold" : ""}`}>
            Home
          </span>
        </button>

        {/* Scan Tab - The visually strongest button */}
        <div className="relative -top-5">
          <button
            id="nav-tab-scan-hero"
            type="button"
            onClick={() => onSelectTab("scan")}
            aria-label="Scan Waste"
            className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl transition-all duration-300 transform active:scale-95 ${
              activeTab === "scan"
                ? "bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 text-white shadow-[0_0_24px_rgba(239,68,68,0.65)] ring-4 ring-red-500/30 scale-105"
                : "bg-gradient-to-tr from-zinc-900 to-zinc-800 text-white border-2 border-red-500/80 hover:border-red-400 shadow-[0_0_18px_rgba(239,68,68,0.35)]"
            }`}
          >
            {/* Animated outer laser glow ring */}
            <span className="absolute -inset-1 rounded-2xl bg-red-500/20 blur-sm pointer-events-none group-hover:bg-red-500/40 transition-all duration-300" />

            {/* Corner Crosshairs */}
            <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t-2 border-l-2 border-white/80" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t-2 border-r-2 border-white/80" />
            <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b-2 border-l-2 border-white/80" />
            <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b-2 border-r-2 border-white/80" />

            <div className="relative flex flex-col items-center">
              <Camera className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2] animate-pulse" />
              <span className="text-[9px] font-bold tracking-wider uppercase mt-0.5 text-white drop-shadow">
                Scan
              </span>
            </div>
          </button>
        </div>

        {/* Impact Tab */}
        <button
          id="nav-tab-impact"
          type="button"
          onClick={() => onSelectTab("impact")}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 ${
            activeTab === "impact"
              ? "text-white scale-105"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <div className="relative">
            <BarChart3 className={`w-5 h-5 ${activeTab === "impact" ? "text-red-500" : ""}`} />
            {activeTab === "impact" && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
            )}
          </div>
          <span className={`text-[11px] font-medium ${activeTab === "impact" ? "text-white font-semibold" : ""}`}>
            Impact
          </span>
        </button>

        {/* Profile Tab */}
        <button
          id="nav-tab-profile"
          type="button"
          onClick={() => onSelectTab("profile")}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 ${
            activeTab === "profile"
              ? "text-white scale-105"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <div className="relative">
            <User className={`w-5 h-5 ${activeTab === "profile" ? "text-red-500" : ""}`} />
            {pendingPassportCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1 py-0.2 min-w-4 h-4 bg-red-600 text-[9px] font-bold text-white rounded-full flex items-center justify-center">
                {pendingPassportCount}
              </span>
            )}
            {activeTab === "profile" && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
            )}
          </div>
          <span className={`text-[11px] font-medium ${activeTab === "profile" ? "text-white font-semibold" : ""}`}>
            Profile
          </span>
        </button>
      </div>
    </nav>
  );
};
