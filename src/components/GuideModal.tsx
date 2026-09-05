import React, { useState } from "react";
import { X, BookOpen, Check, AlertTriangle, Layers, DollarSign, Sparkles } from "lucide-react";
import { MATERIAL_GUIDE_ITEMS } from "../data/mockData";
import { WasteCategory } from "../types";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<WasteCategory | "all">("all");

  if (!isOpen) return null;

  const filteredItems =
    selectedCategory === "all"
      ? MATERIAL_GUIDE_ITEMS
      : MATERIAL_GUIDE_ITEMS.filter((item) => item.category === selectedCategory);

  const categories: { id: WasteCategory | "all"; label: string; icon: string }[] = [
    { id: "all", label: "All Materials", icon: "🌐" },
    { id: "plastic", label: "Plastic", icon: "🧴" },
    { id: "metal", label: "Metal", icon: "🥫" },
    { id: "paper", label: "Paper", icon: "📦" },
    { id: "glass", label: "Glass", icon: "🫙" },
    { id: "mixed", label: "Mixed", icon: "🧃" },
  ];

  return (
    <div
      id="material-guide-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-3xl bg-[#111115] border border-zinc-800 shadow-2xl overflow-hidden text-white">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                Material Detection Guide
              </h3>
              <p className="text-xs text-zinc-400">
                Resin codes, current scrap rates & circular segregation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="p-3 border-b border-zinc-800/80 overflow-x-auto flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                selectedCategory === cat.id
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Guide Content List */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-red-400 bg-red-500/15 px-2 py-0.5 rounded">
                      {item.resinCode || item.category.toUpperCase()}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">
                      {item.recyclabilityRate}% Recyclable
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{item.name}</h4>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-white font-mono block">
                    {item.typicalMarketRateRupees}
                  </span>
                  <span className="text-[10px] text-zinc-400">Scrap yard spot</span>
                </div>
              </div>

              {/* Examples */}
              <div className="text-xs text-zinc-300">
                <span className="text-zinc-400 font-medium">Common items: </span>
                <span>{item.commonExamples.join(", ")}</span>
              </div>

              {/* Dos & Don'ts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-zinc-800">
                <div className="space-y-1">
                  <span className="font-bold text-emerald-400 text-[11px] flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Best Practice (DO)</span>
                  </span>
                  <ul className="space-y-1 text-zinc-300 text-[11px]">
                    {item.doList.map((d, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-red-400 text-[11px] flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Contaminants (DON'T)</span>
                  </span>
                  <ul className="space-y-1 text-zinc-300 text-[11px]">
                    {item.dontList.map((d, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Industrial Circular Path */}
              <div className="p-2.5 rounded-xl bg-black/50 border border-zinc-800 text-[11px] text-zinc-400">
                <span className="font-semibold text-zinc-200">🔄 Circular Fate: </span>
                <span>{item.sortingGuide}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
