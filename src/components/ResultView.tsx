import React, { useState, useEffect } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Info,
  ExternalLink,
  ShieldCheck,
  Zap,
  Leaf,
  RotateCcw,
} from "lucide-react";
import { WasteScanResult, WastePassport } from "../types";
import { PassportCard } from "./PassportCard";

interface ResultViewProps {
  result: WasteScanResult;
  onSavePassport: (result: WasteScanResult) => void;
  onScanAnother: () => void;
  onViewPassports: () => void;
  savedPassports: WastePassport[];
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onSavePassport,
  onScanAnother,
  onViewPassports,
  savedPassports,
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [showMixedDetails, setShowMixedDetails] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [animatedRecyclePercent, setAnimatedRecyclePercent] = useState(0);
  const [animatedEcoPoints, setAnimatedEcoPoints] = useState(0);

  const existingPassport = savedPassports.find((p) => p.id === result.id);

  // Smooth number count-up animation for percentage and eco score
  useEffect(() => {
    let startPercent = 0;
    const targetPercent = result.recyclabilityPercentage;
    const percentTimer = setInterval(() => {
      startPercent += Math.ceil((targetPercent - startPercent) / 6);
      if (startPercent >= targetPercent) {
        setAnimatedRecyclePercent(targetPercent);
        clearInterval(percentTimer);
      } else {
        setAnimatedRecyclePercent(startPercent);
      }
    }, 35);

    let startEco = 0;
    const targetEco = result.ecoScorePoints;
    const ecoTimer = setInterval(() => {
      startEco += 1;
      if (startEco >= targetEco) {
        setAnimatedEcoPoints(targetEco);
        clearInterval(ecoTimer);
      } else {
        setAnimatedEcoPoints(startEco);
      }
    }, 30);

    return () => {
      clearInterval(percentTimer);
      clearInterval(ecoTimer);
    };
  }, [result]);

  const handleSaveClick = () => {
    if (!isSaved && !existingPassport) {
      onSavePassport(result);
      setIsSaved(true);
    }
  };

  const categoryBadgeColor = (cat: string) => {
    switch (cat) {
      case "plastic":
        return "bg-sky-500/15 text-sky-400 border-sky-500/30";
      case "metal":
        return "bg-zinc-200/15 text-zinc-300 border-zinc-500/30";
      case "paper":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "glass":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "mixed":
      default:
        return "bg-rose-500/15 text-rose-300 border-rose-500/30";
    }
  };

  return (
    <div id="scan-result-screen" className="max-w-xl mx-auto px-4 pb-28 pt-3 space-y-5 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Status */}
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <button
          type="button"
          onClick={onScanAnother}
          className="flex items-center gap-1 hover:text-white transition py-1"
        >
          <RotateCcw className="w-3.5 h-3.5 text-red-500" />
          <span>New Scan</span>
        </button>

        <div className="flex items-center gap-1.5 bg-zinc-900/90 px-2.5 py-1 rounded-full border border-zinc-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-zinc-300 text-[11px]">
            {result.confidence}% Match Confidence
          </span>
        </div>
      </div>

      {/* MAJOR CARD: The primary focal centerpiece */}
      <div
        id="major-detection-card"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#18181D] via-[#121215] to-[#0D0D10] border-2 border-red-500/40 p-6 shadow-2xl shadow-red-950/20"
      >
        {/* Subtle Ambient Laser Gradient */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Thumbnail Preview if available */}
        {result.imageUrl && (
          <div className="mb-4 relative w-full h-40 rounded-2xl overflow-hidden bg-black/60 border border-zinc-800 flex items-center justify-center">
            <img
              src={result.imageUrl}
              alt={result.itemName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D10] via-transparent to-transparent" />
            <span className="absolute bottom-2 left-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-zinc-700">
              Scanned Target
            </span>
          </div>
        )}

        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryBadgeColor(
              result.category
            )} uppercase tracking-wider`}
          >
            {result.category} Waste
          </span>

          {result.isMixedWaste ? (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1">
              <Layers className="w-3 h-3 text-red-400" />
              Mixed Composite
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Mono-Material
            </span>
          )}
        </div>

        {/* Big Item Title & Subtype */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
          {result.itemName}
        </h1>
        <p className="text-sm text-zinc-400 mt-1 font-medium">
          {result.materialSubtype}
        </p>

        {/* Large Numbers Display (Recyclability % and Market Value in Rupees) */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-zinc-800">
          <div className="bg-zinc-900/80 rounded-2xl p-4 border border-zinc-800/90">
            <span className="text-xs uppercase font-medium tracking-wider text-zinc-400 block mb-1">
              Recyclability
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-['Space_Grotesk'] tracking-tight">
                {animatedRecyclePercent}%
              </span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${animatedRecyclePercent}%` }}
              />
            </div>
          </div>

          <div className="bg-zinc-900/80 rounded-2xl p-4 border border-zinc-800/90">
            <span className="text-xs uppercase font-medium tracking-wider text-zinc-400 block mb-1">
              Scrap Market Value
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
                ₹{result.pricePerKgRupees.toFixed(2)}
              </span>
              <span className="text-xs text-zinc-400">/kg</span>
            </div>
            <span className="text-[11px] text-zinc-400 block mt-2">
              ~₹{result.estimatedItemValueRupees.toFixed(2)} this item
            </span>
          </div>
        </div>

        {/* "Why this result?" Collapsible Section */}
        <div className="mt-5 pt-4 border-t border-zinc-800/80">
          <button
            type="button"
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full flex items-center justify-between text-left py-2 px-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 text-xs font-semibold text-zinc-300 hover:text-white transition duration-150"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-red-500" />
              <span>Why this result?</span>
            </div>
            {showExplanation ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>

          {showExplanation && (
            <div className="mt-3 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/90 text-xs text-zinc-300 leading-relaxed animate-in fade-in duration-200">
              <p>{result.whyExplanation}</p>
              <div className="mt-2.5 pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Eco Impact Rating</span>
                <span className="text-emerald-400 font-semibold font-mono">
                  +{animatedEcoPoints} EcoScore • {result.co2SavedGrams}g CO2e saved
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SUPPORTING SECTION 1: Mixed Waste Detection (If applicable) */}
      {result.isMixedWaste && result.mixedComponents && (
        <div
          id="mixed-waste-section"
          className="rounded-2xl bg-[#121215] border border-red-500/30 p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Mixed Multi-Material Layers</h3>
                <span className="text-[11px] text-zinc-400">
                  {result.mixedComponents.length} bonded layers detected
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowMixedDetails(!showMixedDetails)}
              className="text-xs text-red-400 font-medium hover:text-red-300"
            >
              {showMixedDetails ? "Less" : "Details"}
            </button>
          </div>

          <div className="space-y-2">
            {result.mixedComponents.map((comp, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">{comp.layer}</span>
                  <span className="font-mono text-zinc-300 font-bold">{comp.percentage}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span>{comp.material}</span>
                  <span
                    className={
                      comp.separable
                        ? "text-emerald-400 font-medium"
                        : "text-amber-400 font-medium"
                    }
                  >
                    {comp.separable ? "Separable" : "Bonded Matrix"}
                  </span>
                </div>
                {showMixedDetails && (
                  <p className="text-[11px] text-zinc-400 mt-1 pt-1 border-t border-zinc-800/60">
                    💡 {comp.sortingTip}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUPPORTING SECTION 2: Sorting Tips & Daily Consumption Reduction */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Quick Sorting Steps */}
        <div className="rounded-2xl bg-[#121215] border border-zinc-800 p-4">
          <div className="flex items-center gap-2 mb-2.5 text-xs font-bold uppercase tracking-wider text-zinc-300">
            <Zap className="w-4 h-4 text-red-500" />
            <span>Preparation Steps</span>
          </div>
          <ul className="space-y-2 text-xs text-zinc-300">
            {result.sortingSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Daily Reduction Tip */}
        <div className="rounded-2xl bg-[#121215] border border-zinc-800 p-4">
          <div className="flex items-center gap-2 mb-2.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Leaf className="w-4 h-4 text-emerald-500" />
            <span>Daily Reduction Tip</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {result.reductionDailyTip}
          </p>
          <div className="mt-3 text-[11px] text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Saves ~14kg of landfill waste per year</span>
          </div>
        </div>
      </div>

      {/* SUPPORTING SECTION 3: Local Recycler Near Me */}
      {result.localRecycler && (
        <div
          id="local-recycler-card"
          className="rounded-2xl bg-[#121215] border border-zinc-800 p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Local Recycler Near Me</span>
                  <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded font-mono">
                    {result.localRecycler.distanceKm} km
                  </span>
                </h3>
                <span className="text-[11px] text-zinc-400">{result.localRecycler.badge}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-white">★ {result.localRecycler.rating}</div>
              <span className="text-[10px] text-zinc-400">({result.localRecycler.reviewsCount})</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/80 text-xs space-y-1.5">
            <div className="font-semibold text-white">{result.localRecycler.name}</div>
            <p className="text-zinc-400 text-[11px]">{result.localRecycler.address}</p>
            <div className="text-[11px] text-emerald-400 font-medium">
              Rate Offer: {result.localRecycler.currentRateSummary}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={`tel:${result.localRecycler.phone}`}
              className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>Call Facility</span>
            </a>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                result.localRecycler.name + " " + result.localRecycler.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      )}

      {/* BOTTOM ACTION: Save Result & Issue AI Waste Passport */}
      <div className="pt-2 space-y-3">
        {existingPassport || isSaved ? (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                </div>
                <div>
                  <span className="font-bold text-sm text-white">AI Waste Passport Issued!</span>
                  <p className="text-xs text-zinc-400">Added to your Waste Wallet & Impact Log</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onViewPassports}
                className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition shadow"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={onScanAnother}
              className="w-full py-3.5 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm border border-zinc-700 transition"
            >
              Scan Another Item
            </button>
          </div>
        ) : (
          <button
            type="button"
            id="btn-save-waste-passport"
            onClick={handleSaveClick}
            className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-red-600/30 active:scale-[0.98] transition-all duration-200"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Save Result & Issue Waste Passport ♻️</span>
          </button>
        )}
      </div>
    </div>
  );
};
