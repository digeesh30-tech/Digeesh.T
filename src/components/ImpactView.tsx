import React, { useState } from "react";
import {
  BarChart3,
  Trophy,
  Flame,
  Leaf,
  TrendingUp,
  Award,
  Zap,
  DollarSign,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Users,
} from "lucide-react";
import { WastePassport, LeaderboardUser } from "../types";

interface ImpactViewProps {
  passports: WastePassport[];
  userEcoScore: number;
  walletBalanceRupees: number;
  leaderboard: LeaderboardUser[];
}

export const ImpactView: React.FC<ImpactViewProps> = ({
  passports,
  userEcoScore,
  walletBalanceRupees,
  leaderboard,
}) => {
  const [selectedChartRange, setSelectedChartRange] = useState<"week" | "month" | "year">("week");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

  const recycledPassports = passports.filter((p) => p.status === "recycled");
  const totalCo2SavedKg = ((passports.length * 115) / 1000).toFixed(1);
  const totalKgDiverted = (passports.length * 0.45 + recycledPassports.length * 0.35).toFixed(1);

  // Material breakdown counts
  const categoryStats = {
    plastic: passports.filter((p) => p.category === "plastic").length,
    metal: passports.filter((p) => p.category === "metal").length,
    paper: passports.filter((p) => p.category === "paper").length,
    glass: passports.filter((p) => p.category === "glass").length,
    mixed: passports.filter((p) => p.category === "mixed").length,
  };

  const chartDays = [
    { day: "Mon", kg: 0.8, co2: 240, active: true },
    { day: "Tue", kg: 1.4, co2: 420, active: true },
    { day: "Wed", kg: 0.5, co2: 150, active: true },
    { day: "Thu", kg: 2.1, co2: 630, active: true },
    { day: "Fri", kg: 1.8, co2: 540, active: true },
    { day: "Sat", kg: 3.2, co2: 960, active: true },
    { day: "Sun", kg: 2.5, co2: 750, active: true },
  ];

  const maxKg = Math.max(...chartDays.map((d) => d.kg));

  return (
    <div id="impact-view-container" className="max-w-md mx-auto px-4 pb-28 pt-3 space-y-5 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
            Impact & Community
          </h2>
          <p className="text-xs text-zinc-400">
            Real-time circular metrics and neighborhood ranks
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5" />
          <span>7-Day Streak</span>
        </div>
      </div>

      {/* 4 GOATED METRICS GRID */}
      <div className="grid grid-cols-2 gap-3">
        {/* Metric 1: Eco Score */}
        <div className="p-4 rounded-2xl bg-[#121215] border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
            <span>Eco Score</span>
            <Zap className="w-3.5 h-3.5 text-red-500" />
          </div>
          <div className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
            {userEcoScore}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            +180 pts this week
          </span>
        </div>

        {/* Metric 2: Waste Diverted */}
        <div className="p-4 rounded-2xl bg-[#121215] border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
            <span>Diverted Landfill</span>
            <Layers className="w-3.5 h-3.5 text-red-500" />
          </div>
          <div className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
            {totalKgDiverted} <span className="text-xs text-zinc-400 font-normal">kg</span>
          </div>
          <span className="text-[11px] text-zinc-400 mt-1 block">
            {passports.length} items logged
          </span>
        </div>

        {/* Metric 3: CO2e Prevented */}
        <div className="p-4 rounded-2xl bg-[#121215] border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
            <span>CO2e Prevented</span>
            <Leaf className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-['Space_Grotesk']">
            {totalCo2SavedKg} <span className="text-xs text-zinc-400 font-normal">kg</span>
          </div>
          <span className="text-[11px] text-zinc-400 mt-1 block">
            = ~12 km car travel
          </span>
        </div>

        {/* Metric 4: Waste Wallet Earned */}
        <div className="p-4 rounded-2xl bg-[#121215] border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
            <span>Rupees Value</span>
            <span className="text-red-400 font-bold text-xs">₹</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
            ₹{walletBalanceRupees.toFixed(2)}
          </div>
          <span className="text-[11px] text-zinc-400 mt-1 block">
            Cash or Tree Planting
          </span>
        </div>
      </div>

      {/* INTERACTIVE DATA-DRIVEN CHART: Weekly Diversion Trend */}
      <div className="p-5 rounded-3xl bg-[#121215] border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Daily Waste Recycled (kg)</h3>
            <span className="text-[11px] text-zinc-400">Total 12.3 kg processed this cycle</span>
          </div>

          <div className="flex items-center bg-zinc-900 rounded-lg p-0.5 border border-zinc-800 text-[10px]">
            <button
              type="button"
              onClick={() => setSelectedChartRange("week")}
              className={`px-2 py-1 rounded font-medium ${
                selectedChartRange === "week" ? "bg-red-600 text-white" : "text-zinc-400"
              }`}
            >
              7D
            </button>
            <button
              type="button"
              onClick={() => setSelectedChartRange("month")}
              className={`px-2 py-1 rounded font-medium ${
                selectedChartRange === "month" ? "bg-red-600 text-white" : "text-zinc-400"
              }`}
            >
              30D
            </button>
          </div>
        </div>

        {/* Data Bar Visualizer */}
        <div className="pt-4 flex items-end justify-between gap-2 h-36 border-b border-zinc-800/80 pb-2">
          {chartDays.map((bar, idx) => {
            const heightPercent = Math.round((bar.kg / maxKg) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-mono text-white bg-zinc-800 px-1 py-0.5 rounded border border-zinc-700">
                  {bar.kg}kg
                </div>

                {/* Bar */}
                <div className="w-full max-w-[28px] bg-zinc-800 rounded-t-lg overflow-hidden h-24 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-red-600 to-rose-500 rounded-t-lg group-hover:from-red-500 group-hover:to-rose-400 transition-all duration-300"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                <span className="text-[10px] font-medium text-zinc-400 group-hover:text-white">
                  {bar.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Material Distribution Bars */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-semibold text-zinc-300 block">
            Material Distribution
          </span>
          <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-sky-400 block font-bold">{categoryStats.plastic}</span>
              <span className="text-zinc-400">Plastic</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-300 block font-bold">{categoryStats.metal}</span>
              <span className="text-zinc-400">Metal</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-amber-400 block font-bold">{categoryStats.paper}</span>
              <span className="text-zinc-400">Paper</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-emerald-400 block font-bold">{categoryStats.glass}</span>
              <span className="text-zinc-400">Glass</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-rose-400 block font-bold">{categoryStats.mixed}</span>
              <span className="text-zinc-400">Mixed</span>
            </div>
          </div>
        </div>
      </div>

      {/* COMMUNITY LEADERBOARD */}
      <div className="p-5 rounded-3xl bg-[#121215] border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Neighborhood Leaderboard</h3>
              <span className="text-[11px] text-zinc-400">Bangalore East Ward 112</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-zinc-400">
            <Users className="w-3.5 h-3.5" />
            <span>4,210 recyclers</span>
          </div>
        </div>

        {/* User list */}
        <div className="space-y-2">
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center justify-between p-3 rounded-2xl border transition duration-150 ${
                user.isCurrentUser
                  ? "bg-red-950/30 border-red-500/60 shadow-lg shadow-red-950/20"
                  : "bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                    user.rank === 1
                      ? "bg-amber-400 text-black shadow-md shadow-amber-500/30"
                      : user.rank === 2
                      ? "bg-zinc-300 text-black"
                      : user.rank === 3
                      ? "bg-amber-700 text-white"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {user.rank}
                </div>

                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border border-zinc-700"
                />

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white leading-none">
                      {user.name}
                    </span>
                    {user.isCurrentUser && (
                      <span className="px-1.5 py-0.2 bg-red-600 text-white rounded text-[9px] font-bold">
                        YOU
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">{user.badge}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-extrabold text-white font-['Space_Grotesk'] block">
                  {user.ecoScore}
                </span>
                <span className="text-[10px] text-zinc-400 block">
                  {user.itemsRecycled} items
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
