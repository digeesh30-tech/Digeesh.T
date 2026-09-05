export type WasteCategory = 'plastic' | 'metal' | 'paper' | 'glass' | 'mixed' | 'other';

export type PassportStatus = 'identified' | 'sorted' | 'recycled';

export interface MixedComponent {
  layer: string;
  material: string;
  percentage: number;
  separable: boolean;
  sortingTip: string;
}

export interface RecyclerFacility {
  id: string;
  name: string;
  badge: string;
  distanceKm: number;
  address: string;
  phone: string;
  openingHours: string;
  acceptedTypes: WasteCategory[];
  currentRateSummary: string;
  verified: boolean;
  rating: number;
  reviewsCount: number;
}

export interface WasteScanResult {
  id: string;
  scannedAt: string;
  imageUrl?: string;
  itemName: string;
  category: WasteCategory;
  materialSubtype: string;
  recyclabilityPercentage: number;
  pricePerKgRupees: number;
  estimatedItemValueRupees: number;
  isMixedWaste: boolean;
  mixedComponents?: MixedComponent[];
  whyExplanation: string;
  sortingSteps: string[];
  reductionDailyTip: string;
  ecoScorePoints: number;
  co2SavedGrams: number;
  confidence: number;
  localRecycler: RecyclerFacility;
  status: PassportStatus;
}

export interface WastePassport extends WasteScanResult {
  passportNumber: string;
  identifiedAt: string;
  sortedAt?: string;
  recycledAt?: string;
  walletCreditedRupees: number;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  ecoScore: number;
  itemsRecycled: number;
  badge: string;
  trend: 'up' | 'down' | 'same';
  isCurrentUser?: boolean;
}

export interface CommunityImpactMetric {
  metricName: string;
  value: string;
  subValue: string;
  trend: string;
}

export interface MaterialGuideItem {
  id: string;
  category: WasteCategory;
  name: string;
  resinCode?: string;
  recyclabilityRate: number;
  typicalMarketRateRupees: string;
  commonExamples: string[];
  doList: string[];
  dontList: string[];
  sortingGuide: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  upiId: string;
  avatar?: string;
  level: number;
  joinedDate: string;
}
