import React, { useState, useEffect } from "react";
import { Navbar, NavTab } from "./components/Navbar";
import { HomeView } from "./components/HomeView";
import { ScannerView } from "./components/ScannerView";
import { ResultView } from "./components/ResultView";
import { ImpactView } from "./components/ImpactView";
import { ProfileView } from "./components/ProfileView";
import { GuideModal } from "./components/GuideModal";
import { WasteScanResult, WastePassport, LeaderboardUser } from "./types";
import {
  INITIAL_PASS_PORTS,
  INITIAL_LEADERBOARD,
  LOCAL_RECYCLERS,
} from "./data/mockData";

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [currentScanResult, setCurrentScanResult] = useState<WasteScanResult | null>(null);
  const [isViewingResult, setIsViewingResult] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Persistent user state
  const [passports, setPassports] = useState<WastePassport[]>(() => {
    const saved = localStorage.getItem("ecolens_passports");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved passports", e);
      }
    }
    return INITIAL_PASS_PORTS;
  });

  const [userEcoScore, setUserEcoScore] = useState<number>(() => {
    const saved = localStorage.getItem("ecolens_user_eco_score");
    return saved ? parseInt(saved, 10) : 1420;
  });

  const [walletBalanceRupees, setWalletBalanceRupees] = useState<number>(() => {
    const saved = localStorage.getItem("ecolens_wallet_balance");
    return saved ? parseFloat(saved) : 34.5;
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("ecolens_passports", JSON.stringify(passports));
  }, [passports]);

  useEffect(() => {
    localStorage.setItem("ecolens_user_eco_score", userEcoScore.toString());
  }, [userEcoScore]);

  useEffect(() => {
    localStorage.setItem("ecolens_wallet_balance", walletBalanceRupees.toString());
  }, [walletBalanceRupees]);

  // Handle successful scan from Camera / Upload / Preset
  const handleScanComplete = (result: WasteScanResult) => {
    setCurrentScanResult(result);
    setIsViewingResult(true);
  };

  // Issue AI Waste Passport from scan result
  const handleSavePassport = (result: WasteScanResult) => {
    const newPassport: WastePassport = {
      ...result,
      passportNumber: `EL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      identifiedAt: new Date().toISOString(),
      walletCreditedRupees: 0,
      status: "identified",
    };

    setPassports((prev) => [newPassport, ...prev]);

    // Give introductory score boost for logging
    setUserEcoScore((prev) => {
      const updated = prev + 10;
      // Update in leaderboard
      setLeaderboard((lPrev) =>
        lPrev.map((u) => (u.isCurrentUser ? { ...u, ecoScore: updated } : u))
      );
      return updated;
    });
  };

  // Update status (e.g. "sorted" or "recycled")
  const handleUpdatePassportStatus = (id: string, newStatus: "sorted" | "recycled") => {
    setPassports((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nowIso = new Date().toISOString();
          const updated = {
            ...p,
            status: newStatus,
            sortedAt: newStatus === "sorted" || newStatus === "recycled" ? p.sortedAt || nowIso : undefined,
            recycledAt: newStatus === "recycled" ? nowIso : undefined,
            walletCreditedRupees: newStatus === "recycled" ? p.estimatedItemValueRupees : p.walletCreditedRupees,
          };

          if (newStatus === "recycled" && p.status !== "recycled") {
            // Credit Waste Wallet with Rupee value
            setWalletBalanceRupees((wPrev) => wPrev + p.estimatedItemValueRupees);

            // Credit user Eco Score
            setUserEcoScore((ePrev) => {
              const nextScore = ePrev + p.ecoScorePoints;
              setLeaderboard((lPrev) =>
                lPrev.map((u) =>
                  u.isCurrentUser
                    ? { ...u, ecoScore: nextScore, itemsRecycled: u.itemsRecycled + 1 }
                    : u
                )
              );
              return nextScore;
            });
          }

          return updated;
        }
        return p;
      })
    );
  };

  // Handle reward redemption
  const handleRedeemReward = (amount: number, reason: string) => {
    setWalletBalanceRupees((prev) => Math.max(0, prev - amount));
  };

  // Scan another item
  const handleScanAnother = () => {
    setIsViewingResult(false);
    setCurrentScanResult(null);
    setActiveTab("scan");
  };

  // View passports in profile
  const handleViewPassports = () => {
    setIsViewingResult(false);
    setActiveTab("profile");
  };

  const pendingPassportCount = passports.filter((p) => p.status !== "recycled").length;

  return (
    <div className="min-h-screen bg-[#08080A] text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Subtle Status Glow */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80" />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full max-w-md mx-auto pt-2">
        {/* If viewing active scan result */}
        {isViewingResult && currentScanResult ? (
          <ResultView
            result={currentScanResult}
            onSavePassport={handleSavePassport}
            onScanAnother={handleScanAnother}
            onViewPassports={handleViewPassports}
            savedPassports={passports}
          />
        ) : (
          <>
            {activeTab === "home" && (
              <HomeView
                onStartScan={() => setActiveTab("scan")}
                onOpenGuide={() => setIsGuideOpen(true)}
                onOpenImpact={() => setActiveTab("impact")}
                onOpenProfile={() => setActiveTab("profile")}
                passports={passports}
                userEcoScore={userEcoScore}
                walletBalanceRupees={walletBalanceRupees}
                onUpdatePassportStatus={handleUpdatePassportStatus}
                localRecyclers={LOCAL_RECYCLERS}
              />
            )}

            {activeTab === "scan" && (
              <ScannerView
                onScanComplete={handleScanComplete}
                onOpenGuide={() => setIsGuideOpen(true)}
              />
            )}

            {activeTab === "impact" && (
              <ImpactView
                passports={passports}
                userEcoScore={userEcoScore}
                walletBalanceRupees={walletBalanceRupees}
                leaderboard={leaderboard}
              />
            )}

            {activeTab === "profile" && (
              <ProfileView
                passports={passports}
                userEcoScore={userEcoScore}
                walletBalanceRupees={walletBalanceRupees}
                onUpdatePassportStatus={handleUpdatePassportStatus}
                onRedeemReward={handleRedeemReward}
              />
            )}
          </>
        )}
      </main>

      {/* Material Detection & Segregation Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Bottom 4-Tab Navigation Bar */}
      <Navbar
        activeTab={isViewingResult ? "scan" : activeTab}
        onSelectTab={(tab) => {
          setIsViewingResult(false);
          setActiveTab(tab);
        }}
        pendingPassportCount={pendingPassportCount}
      />
    </div>
  );
}
