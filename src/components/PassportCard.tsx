import React from "react";
import { CheckCircle2, Circle, QrCode, Sparkles, ArrowRight, Clock, ShieldCheck, MapPin } from "lucide-react";
import confetti from "canvas-confetti";
import { WastePassport } from "../types";

interface PassportCardProps {
  passport: WastePassport;
  onUpdateStatus?: (id: string, newStatus: "sorted" | "recycled") => void;
  compact?: boolean;
}

export const PassportCard: React.FC<PassportCardProps> = ({
  passport,
  onUpdateStatus,
  compact = false,
}) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "plastic":
        return { border: "border-sky-500/40", badge: "bg-sky-500/15 text-sky-300 border-sky-500/30", dot: "bg-sky-400" };
      case "metal":
        return { border: "border-zinc-400/40", badge: "bg-zinc-500/15 text-zinc-200 border-zinc-500/30", dot: "bg-zinc-200" };
      case "paper":
        return { border: "border-amber-500/40", badge: "bg-amber-500/15 text-amber-300 border-amber-500/30", dot: "bg-amber-400" };
      case "glass":
        return { border: "border-emerald-500/40", badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", dot: "bg-emerald-400" };
      case "mixed":
      default:
        return { border: "border-rose-500/40", badge: "bg-rose-500/15 text-rose-300 border-rose-500/30", dot: "bg-rose-400" };
    }
  };

  const theme = getCategoryColor(passport.category);

  const handleRecycleClick = () => {
    if (passport.status !== "recycled" && onUpdateStatus) {
      // Trigger celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#EF4444", "#10B981", "#FFFFFF"],
      });
      onUpdateStatus(passport.id, "recycled");
    }
  };

  const handleSortClick = () => {
    if (passport.status === "identified" && onUpdateStatus) {
      onUpdateStatus(passport.id, "sorted");
    }
  };

  const isRecycled = passport.status === "recycled";
  const isSorted = passport.status === "sorted" || isRecycled;

  if (compact) {
    return (
      <div
        id={`passport-compact-${passport.id}`}
        className={`relative overflow-hidden rounded-2xl bg-[#121215] border ${theme.border} p-4 transition-all duration-300 hover:border-red-500/60`}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
              <span>♻️ PASSPORT</span>
              <span className="font-mono text-[10px] text-zinc-400">#{passport.passportNumber}</span>
            </div>
            <h4 className="font-bold text-white text-base leading-snug">{passport.itemName}</h4>
            <p className="text-xs text-zinc-400 mt-0.5">{passport.materialSubtype}</p>
          </div>

          <div className="text-right">
            <span className="text-lg font-bold text-red-400">₹{passport.pricePerKgRupees.toFixed(2)}</span>
            <span className="text-[10px] text-zinc-400 block">/kg spot</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/80 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="font-semibold text-emerald-400">{passport.recyclabilityPercentage}% Recyclable</span>
            <span>•</span>
            <span className="text-zinc-400">+{passport.ecoScorePoints} pts</span>
          </div>

          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isRecycled
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : isSorted
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "bg-red-500/15 text-red-300 border border-red-500/30"
            }`}
          >
            {passport.status}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`passport-card-${passport.id}`}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#141418] via-[#0E0E12] to-[#0A0A0D] border-2 border-zinc-700/60 p-5 shadow-2xl transition-all duration-300 hover:border-red-500/60"
    >
      {/* Decorative Security Watermark Background */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-36 h-36 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Perforated ticket stamp aesthetic notches */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#080809] rounded-full border-r border-zinc-700" />
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#080809] rounded-full border-l border-zinc-700" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3.5 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold tracking-widest uppercase text-white font-['Space_Grotesk']">
                AI WASTE PASSPORT
              </span>
              <span className="text-xs">♻️</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">ID: {passport.passportNumber}</span>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${theme.badge} capitalize`}>
          {passport.category}
        </span>
      </div>

      {/* Item Title & Technical Spec */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white tracking-tight">{passport.itemName}</h3>
        <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${theme.dot}`} />
          {passport.materialSubtype}
        </p>
      </div>

      {/* 2 Core Figures (Recyclability + Market Value in Rupees) */}
      <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 block">
            Recyclability
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-['Space_Grotesk']">
              {passport.recyclabilityPercentage}%
            </span>
          </div>
        </div>

        <div className="border-l border-zinc-800 pl-3">
          <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 block">
            Market Value
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              ₹{passport.pricePerKgRupees.toFixed(2)}
            </span>
            <span className="text-xs text-zinc-400 font-normal">/kg</span>
          </div>
        </div>
      </div>

      {/* Passport 3-State Progress Pipeline */}
      <div className="border-t border-b border-zinc-800/80 py-3.5 my-4 space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">Identified & Catalogued</span>
          </div>
          <span className="text-[10px] text-zinc-400 font-mono">
            {new Date(passport.identifiedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isSorted ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <Circle className="w-4 h-4 text-zinc-600" />
            )}
            <span className={isSorted ? "font-semibold text-white" : "text-zinc-400"}>
              Cleaned & Sorted
            </span>
          </div>
          {!isSorted && onUpdateStatus ? (
            <button
              type="button"
              onClick={handleSortClick}
              className="text-[11px] px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded border border-zinc-700 transition"
            >
              Mark Sorted
            </button>
          ) : (
            <span className="text-[10px] text-zinc-400 font-mono">Verified</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isRecycled ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <Circle className="w-4 h-4 text-zinc-600" />
            )}
            <span className={isRecycled ? "font-semibold text-emerald-400" : "text-zinc-400"}>
              Officially Recycled
            </span>
          </div>
          {isRecycled ? (
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
              +{passport.ecoScorePoints} EcoScore added
            </span>
          ) : (
            <span className="text-[10px] text-zinc-400">Pending Drop-off</span>
          )}
        </div>
      </div>

      {/* Recycler Dropoff Point info */}
      {passport.localRecycler && (
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-4 px-1">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="truncate">{passport.localRecycler.name}</span>
          </div>
          <span className="text-zinc-400 shrink-0 font-mono">{passport.localRecycler.distanceKm} km</span>
        </div>
      )}

      {/* Gamified Action: Mark Recycled button */}
      {!isRecycled && onUpdateStatus && (
        <button
          type="button"
          id={`btn-mark-recycled-${passport.id}`}
          onClick={handleRecycleClick}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 active:scale-[0.98] transition duration-200"
        >
          <span>♻️ MARK RECYCLED</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

      {isRecycled && (
        <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Contributed to your Community Eco Score!</span>
        </div>
      )}
    </div>
  );
};
