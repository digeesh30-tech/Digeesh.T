import React, { useState } from "react";
import {
  Wallet,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  TreePine,
  CreditCard,
  QrCode,
  RotateCcw,
  Check,
  Download,
  FileArchive,
} from "lucide-react";
import confetti from "canvas-confetti";
import { WastePassport, UserProfile } from "../types";
import { PassportCard } from "./PassportCard";
import { User, Smartphone, Settings } from "lucide-react";

interface ProfileViewProps {
  passports: WastePassport[];
  userEcoScore: number;
  walletBalanceRupees: number;
  profile: UserProfile;
  onOpenEditDetails: () => void;
  onUpdatePassportStatus: (id: string, newStatus: "sorted" | "recycled") => void;
  onRedeemReward: (amount: number, reason: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  passports,
  userEcoScore,
  walletBalanceRupees,
  profile,
  onOpenEditDetails,
  onUpdatePassportStatus,
  onRedeemReward,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "identified" | "sorted" | "recycled">("all");
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [upiId, setUpiId] = useState(profile.upiId || "digeesht6@okaxis");
  const [redeemSuccessMsg, setRedeemSuccessMsg] = useState<string | null>(null);

  // keep upiId in sync with profile
  React.useEffect(() => {
    if (profile.upiId) {
      setUpiId(profile.upiId);
    }
  }, [profile.upiId]);

  const filteredPassports =
    selectedFilter === "all"
      ? passports
      : passports.filter((p) => p.status === selectedFilter);

  const recycledCount = passports.filter((p) => p.status === "recycled").length;

  const handleRedeemUpi = () => {
    if (walletBalanceRupees <= 0) {
      alert("No balance to withdraw yet. Recycle items to earn rupees!");
      return;
    }
    const amount = walletBalanceRupees;
    onRedeemReward(amount, `Instant UPI Transfer to ${upiId}`);
    setRedeemSuccessMsg(`₹${amount.toFixed(2)} sent via UPI to ${upiId}!`);
    setTimeout(() => {
      setRedeemSuccessMsg(null);
      setShowRedeemModal(false);
    }, 2000);
  };

  const handlePlantTree = () => {
    if (walletBalanceRupees < 10) {
      alert("Minimum ₹10 required in Waste Wallet to sponsor community saplings.");
      return;
    }
    onRedeemReward(10, "1 Native Neem Sapling planted in East Bangalore");
    confetti({ particleCount: 60, spread: 80, colors: ["#10B981", "#EF4444"] });
    setRedeemSuccessMsg("Thank you! 1 Native Tree planted in your local ward.");
    setTimeout(() => {
      setRedeemSuccessMsg(null);
      setShowRedeemModal(false);
    }, 2500);
  };

  return (
    <div id="profile-view-container" className="max-w-md mx-auto px-4 pb-28 pt-3 space-y-5 animate-in fade-in duration-200">
      {/* User Identity Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-b from-[#18181D] to-[#101014] border border-zinc-800 flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-600 flex items-center justify-center text-white font-extrabold text-2xl border-2 border-red-500/80 shadow-md shadow-red-600/30">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-zinc-900">
            Lvl {profile.level || 7}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white leading-tight truncate">
              {profile.name}
            </h3>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30 shrink-0 ml-2">
              Rank #3
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5 truncate">
            {profile.city} • <span className="text-zinc-500">{profile.email}</span>
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="font-semibold text-emerald-400">{userEcoScore} pts</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-300">{recycledCount} Recycled</span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenEditDetails}
              className="px-3 py-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-zinc-700 transition active:scale-95"
            >
              <Settings className="w-3.5 h-3.5 text-red-400" />
              <span>Edit Details</span>
            </button>
            <span className="text-[11px] text-zinc-500 font-mono">
              UPI: {profile.upiId}
            </span>
          </div>
        </div>
      </div>

      {/* WASTE WALLET CARD */}
      <div
        id="waste-wallet-card"
        className="p-5 rounded-3xl bg-gradient-to-br from-red-950/40 via-[#141418] to-[#0D0D10] border-2 border-red-500/50 shadow-xl shadow-red-950/30 space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-300">
            <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                EcoLens Waste Wallet
              </span>
              <span className="text-[10px] text-zinc-400">Scrap earnings & instant rewards</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowRedeemModal(true)}
            className="py-1.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-md shadow-red-600/30"
          >
            Redeem / Payout
          </button>
        </div>

        <div className="pt-2 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
            ₹{walletBalanceRupees.toFixed(2)}
          </span>
          <span className="text-xs text-emerald-400 font-medium">Available Balance</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80 text-xs">
          <div className="text-zinc-400">
            <span className="text-[10px] block">Lifetime Value</span>
            <span className="font-semibold text-white">₹{(walletBalanceRupees + 142.5).toFixed(2)}</span>
          </div>
          <div className="text-right text-zinc-400">
            <span className="text-[10px] block">Payout Mode</span>
            <span className="font-semibold text-white truncate max-w-[130px] inline-block">
              UPI Direct
            </span>
          </div>
        </div>
      </div>

      {/* AI WASTE PASSPORT ARCHIVE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-500" />
            <h3 className="text-base font-bold text-white">My Waste Passports</h3>
          </div>
          <span className="text-xs font-mono text-zinc-400">({passports.length} issued)</span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800 text-xs">
          {(["all", "identified", "sorted", "recycled"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedFilter(status)}
              className={`flex-1 py-1 px-2 rounded-lg font-medium capitalize transition ${
                selectedFilter === status
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* List of Passports */}
        {filteredPassports.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#121215] border border-zinc-800 text-center space-y-2">
            <p className="text-sm text-zinc-400">No passports in this filter.</p>
            <p className="text-xs text-zinc-400">Scan waste items to issue official digital passports.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPassports.map((passport) => (
              <PassportCard
                key={passport.id}
                passport={passport}
                onUpdateStatus={onUpdatePassportStatus}
              />
            ))}
          </div>
        )}
      </div>

      {/* INSTALL APP ON MOBILE OR DESKTOP */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/30 via-zinc-900 to-zinc-900 border border-red-500/30 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Smartphone className="w-4 h-4 text-red-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Install App on Your Phone
            </h4>
          </div>
          <span className="text-[10px] bg-red-500/20 text-red-300 font-semibold px-2 py-0.5 rounded-full border border-red-500/30">
            PWA Ready
          </span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Add EcoLens directly to your mobile home screen to scan packaging with your camera anytime without needing an app store download.
        </p>
        <button
          type="button"
          onClick={onOpenEditDetails}
          className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-zinc-700 transition active:scale-[0.98]"
        >
          <Smartphone className="w-3.5 h-3.5 text-red-400" />
          <span>Install App / Edit My Details</span>
        </button>
      </div>

      {/* DEVELOPER & SOURCE CODE EXPORT */}
      <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3">
        <div className="flex items-center gap-2 text-zinc-300">
          <FileArchive className="w-4 h-4 text-red-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            Source Code Export
          </h4>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Download the complete production-ready source code bundle including Vite, Express server, React UI components, and README instructions.
        </p>
        <a
          href="/api/download-zip"
          download="ecolens-ai-source.zip"
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/20 transition active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          <span>Download Complete Source (.ZIP)</span>
        </a>
      </div>

      {/* REDEEM / WITHDRAW MODAL */}
      {showRedeemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-[#141418] border border-zinc-800 p-5 space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h4 className="font-bold text-base">Redeem Waste Wallet</h4>
              <button
                type="button"
                onClick={() => setShowRedeemModal(false)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Close
              </button>
            </div>

            {redeemSuccessMsg ? (
              <div className="py-6 text-center space-y-2 text-emerald-400">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-sm font-bold">{redeemSuccessMsg}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-[11px] text-zinc-400 block">Available to Transfer</span>
                  <span className="text-2xl font-extrabold text-white">
                    ₹{walletBalanceRupees.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Your UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-zinc-950 border border-zinc-700 text-xs font-mono text-white focus:outline-none focus:border-red-500"
                    placeholder="username@bank"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleRedeemUpi}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Withdraw ₹{walletBalanceRupees.toFixed(2)} to UPI</span>
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-zinc-800"></div>
                  <span className="flex-shrink mx-2 text-[10px] text-zinc-400 uppercase">
                    or Donate for Impact
                  </span>
                  <div className="flex-grow border-t border-zinc-800"></div>
                </div>

                <button
                  type="button"
                  onClick={handlePlantTree}
                  className="w-full py-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/40 font-bold text-xs text-emerald-300 flex items-center justify-center gap-2"
                >
                  <TreePine className="w-4 h-4 text-emerald-400" />
                  <span>Plant 1 Native Tree (₹10.00)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
