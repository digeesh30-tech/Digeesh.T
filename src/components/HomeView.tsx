import React from "react";
import {
  Camera,
  ArrowRight,
  Sparkles,
  Wallet,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Leaf,
  ChevronRight,
  BookOpen,
  Award,
} from "lucide-react";
import { WastePassport, RecyclerFacility } from "../types";
import { EcoLensLogo } from "./EcoLensLogo";
import { PassportCard } from "./PassportCard";

interface HomeViewProps {
  onStartScan: () => void;
  onOpenGuide: () => void;
  onOpenImpact: () => void;
  onOpenProfile: () => void;
  passports: WastePassport[];
  userEcoScore: number;
  walletBalanceRupees: number;
  onUpdatePassportStatus: (id: string, newStatus: "sorted" | "recycled") => void;
  localRecyclers: RecyclerFacility[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartScan,
  onOpenGuide,
  onOpenImpact,
  onOpenProfile,
  passports,
  userEcoScore,
  walletBalanceRupees,
  onUpdatePassportStatus,
  localRecyclers,
}) => {
  const pendingPassports = passports.filter((p) => p.status !== "recycled");
  const nearestRecycler = localRecyclers[0];

  return (
    <div id="home-view-container" className="max-w-md mx-auto px-4 pb-28 pt-3 space-y-5 animate-in fade-in duration-200">
      {/* Top App Header */}
      <div className="flex items-center justify-between">
        <EcoLensLogo size="md" pulse={false} />

        {/* Waste Wallet Badge */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141418] border border-zinc-800 hover:border-red-500/50 transition active:scale-95 shadow-sm"
        >
          <div className="w-5 h-5 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center">
            <Wallet className="w-3 h-3" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-zinc-400">Wallet:</span>
            <span className="text-xs font-bold text-white font-mono">
              ₹{walletBalanceRupees.toFixed(2)}
            </span>
          </div>
        </button>
      </div>

      {/* Hero Interactive Scanner Banner */}
      <div
        id="hero-scan-banner"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C1215] via-[#121216] to-[#0A0A0C] border-2 border-red-500/50 p-6 shadow-2xl shadow-red-950/30"
      >
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[11px] font-semibold border border-red-500/30">
            <Sparkles className="w-3 h-3" />
            <span>AI Multi-Material Detection</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
            Turn your dry waste into <span className="text-red-500">Rupees & Impact</span>.
          </h2>

          <p className="text-xs text-zinc-300 leading-relaxed max-w-[280px]">
            Scan plastic, metal, paper, glass, and mixed waste to get instant market scrap rates in ₹ and digital Waste Passports.
          </p>

          <div className="pt-2">
            <button
              type="button"
              id="btn-home-start-scan"
              onClick={onStartScan}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-red-600/40 active:scale-[0.98] transition-all duration-200"
            >
              <Camera className="w-5 h-5" />
              <span>START SCANNING NOW</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Dual Metrics (Eco Score & Passports Issued) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Eco Score Card */}
        <button
          type="button"
          onClick={onOpenImpact}
          className="p-4 rounded-2xl bg-[#121215] border border-zinc-800/90 text-left hover:border-red-500/50 transition duration-150 active:scale-95 group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              Eco Score
            </span>
            <span className="text-emerald-400 text-xs font-bold bg-emerald-500/15 px-1.5 py-0.5 rounded">
              Rank #3
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
              {userEcoScore}
            </span>
            <span className="text-xs text-red-500 font-bold">pts</span>
          </div>
          <span className="text-[11px] text-zinc-400 mt-1 block group-hover:text-zinc-300">
            View Leaderboard →
          </span>
        </button>

        {/* Active Passports Card */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="p-4 rounded-2xl bg-[#121215] border border-zinc-800/90 text-left hover:border-red-500/50 transition duration-150 active:scale-95 group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              Waste Passports
            </span>
            <ShieldCheck className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
              {passports.length}
            </span>
            <span className="text-xs text-zinc-400 font-normal">items</span>
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block">
            {pendingPassports.length} pending drop-off
          </span>
        </button>
      </div>

      {/* Featured AI Waste Passport (If any pending) */}
      {pendingPassports.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Pending Waste Passport
              </span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
            <button
              type="button"
              onClick={onOpenProfile}
              className="text-xs text-red-400 hover:text-red-300 font-medium"
            >
              All ({passports.length})
            </button>
          </div>

          <PassportCard
            passport={pendingPassports[0]}
            onUpdateStatus={onUpdatePassportStatus}
          />
        </div>
      )}

      {/* Quick Material Guide Card */}
      <div
        id="material-guide-teaser"
        onClick={onOpenGuide}
        className="cursor-pointer rounded-2xl bg-[#121215] border border-zinc-800/90 p-4 hover:border-red-500/50 transition duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/15 text-red-500 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Material Detection Guide</h4>
              <p className="text-xs text-zinc-400">
                Resin codes, scrap rates in ₹, sorting dos & don'ts
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </div>

        {/* 4 Materials pill preview */}
        <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-zinc-800 text-center text-[10px]">
          <div className="py-1 px-1.5 rounded-lg bg-sky-500/10 text-sky-400 font-medium">
            🧴 Plastic
          </div>
          <div className="py-1 px-1.5 rounded-lg bg-zinc-200/10 text-zinc-300 font-medium">
            🥫 Metal
          </div>
          <div className="py-1 px-1.5 rounded-lg bg-amber-500/10 text-amber-400 font-medium">
            📦 Paper
          </div>
          <div className="py-1 px-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-medium">
            🫙 Glass
          </div>
        </div>
      </div>

      {/* Local Recycler Near Me Spotlight */}
      {nearestRecycler && (
        <div className="rounded-2xl bg-[#121215] border border-zinc-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Nearest Collection Center
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">
              {nearestRecycler.distanceKm} km away
            </span>
          </div>

          <div className="text-sm font-semibold text-white">{nearestRecycler.name}</div>
          <div className="text-xs text-zinc-400 mt-0.5">{nearestRecycler.address}</div>
          <div className="text-[11px] text-emerald-400 mt-2 font-medium">
            💡 Live rate: {nearestRecycler.currentRateSummary}
          </div>
        </div>
      )}

      {/* Daily Consumption Reduction Tip Card */}
      <div className="rounded-2xl bg-[#121215] border border-zinc-800 p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Leaf className="w-4 h-4" />
          <span>Daily Waste Reduction Tip</span>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed">
          "Replacing single-use plastic grocery bags with two sturdy cotton tote bags avoids over 320 non-biodegradable LDPE film bags from choking Bangalore storm drains every year."
        </p>
      </div>
    </div>
  );
};
