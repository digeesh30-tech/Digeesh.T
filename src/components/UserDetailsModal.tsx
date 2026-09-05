import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  CheckCircle2,
  Smartphone,
  Share2,
  ArrowDownToLine,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { UserProfile } from "../types";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone || "");
  const [city, setCity] = useState(profile.city || "Bangalore, India");
  const [upiId, setUpiId] = useState(profile.upiId || "");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone || "");
    setCity(profile.city || "Bangalore, India");
    setUpiId(profile.upiId || "");
  }, [profile]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name: name.trim() || "Eco Recycler",
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim() || "India",
      upiId: upiId.trim() || "user@upi",
    };

    onSaveProfile(updated);
    confetti({ particleCount: 50, spread: 60, colors: ["#EF4444", "#10B981"] });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        "To install on your phone:\n\n• Android (Chrome): Tap browser menu (⋮) > 'Install App' or 'Add to Home screen'\n• iPhone (Safari): Tap Share button (⎋) > 'Add to Home Screen'"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="user-details-modal-box"
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-[#121215] border border-zinc-800 p-5 sm:p-6 shadow-2xl shadow-red-950/40 text-left"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                EcoLens Member Profile
              </span>
            </div>
            <h3 className="text-lg font-bold text-white leading-tight mt-0.5">
              Enter Your Details
            </h3>
            <p className="text-xs text-zinc-400">
              Personalize your Waste Passports & Instant UPI scrap earnings
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-red-400" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Digeesh T"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 focus:border-red-500 focus:outline-none text-white text-sm placeholder-zinc-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-red-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. digeesht6@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 focus:border-red-500 focus:outline-none text-white text-sm placeholder-zinc-500 transition"
            />
          </div>

          {/* Mobile / WhatsApp */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>Mobile / WhatsApp Number</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 focus:border-red-500 focus:outline-none text-white text-sm placeholder-zinc-500 transition"
            />
            <span className="text-[10px] text-zinc-500 mt-1 block">
              Used for verified local recycler drop-off receipts & pickup notifications
            </span>
          </div>

          {/* City / Ward */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>City / Local Ward</span>
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Bangalore East, Indiranagar"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 focus:border-red-500 focus:outline-none text-white text-sm placeholder-zinc-500 transition"
            />
          </div>

          {/* UPI ID for Recycling Cashouts */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-red-400" />
              <span>UPI ID (Instant Scrap Cashouts)</span>
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. digeesht6@okaxis or phone@upi"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 focus:border-red-500 focus:outline-none text-white text-sm placeholder-zinc-500 font-mono transition"
            />
            <span className="text-[10px] text-emerald-400/90 mt-1 block">
              Recycling rewards & scrap sell values are transferred directly here.
            </span>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-md shadow-red-600/30 flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Details Saved Successfully!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Save Details & Start Using</span>
              </>
            )}
          </button>
        </form>

        {/* PWA / Install directly without zip section */}
        <div className="mt-5 pt-4 border-t border-zinc-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-300">
              <Smartphone className="w-4 h-4 text-red-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Install On Your Phone / PC
              </span>
            </div>
            {isInstalled && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-semibold">
                Installed
              </span>
            )}
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed">
            No zip files or app store downloads needed. Add directly to your Home Screen to open full-screen anytime like a native mobile app.
          </p>

          <button
            type="button"
            onClick={handleInstallClick}
            className="w-full py-2.5 px-3 rounded-xl bg-zinc-850 hover:bg-zinc-800 border border-zinc-700/70 text-zinc-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-[0.98]"
          >
            <ArrowDownToLine className="w-3.5 h-3.5 text-red-400" />
            <span>Install App / Add to Home Screen</span>
          </button>

          <div className="bg-zinc-900/90 rounded-xl p-2.5 border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
            <p className="font-semibold text-zinc-300">Quick Guide:</p>
            <p>• <span className="text-white font-medium">Android:</span> Tap Chrome menu (⋮) → <span className="text-red-400 font-medium">Install App</span></p>
            <p>• <span className="text-white font-medium">iPhone:</span> Tap Safari Share (⎋) → <span className="text-red-400 font-medium">Add to Home Screen</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
