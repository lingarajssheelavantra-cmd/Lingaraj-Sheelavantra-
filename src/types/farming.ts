export type Language = 'en' | 'kn' | 'hi';

export interface LocationState {
  state: string;
  district: string;
  taluk: string;
  mandi: string;
  lat: number;
  lon: number;
}

export interface GrowthStage {
  stageNumber: number;
  name: string;
  kannadaName: string;
  hindiName: string;
  durationDays: string;
  description: string;
  careTips: string;
}

export interface PestOrDisease {
  id: string;
  type: 'pest' | 'disease';
  name: string;
  kannadaName: string;
  hindiName: string;
  symptoms: string;
  prevention: string;
  ipmMethods: string;
  safeControl: string;
  activeIngredient?: string;
  withholdingPeriod?: string; // PHI (Pre-Harvest Interval)
  whenToConsultExpert: string;
}

export interface FertilizerStage {
  stage: string;
  nutrient: string;
  recommendation: string;
  organicAlternative: string;
}

export interface Crop {
  id: string;
  name: string;
  kannadaName: string;
  hindiName: string;
  scientificName: string;
  category: 'Cereals & Millets' | 'Cash Crops' | 'Pulses & Oilseeds' | 'Vegetables' | 'Spices' | 'Fruits';
  icon: string;
  growingPeriodDays: {
    min: number;
    max: number;
    varieties: string;
  };
  suitableSoil: {
    type: string;
    phRange: string;
    drainage: string;
  };
  waterRequirement: {
    level: 'Low' | 'Medium' | 'High';
    generalFrequency: string;
    criticalStages: string[];
    waterSavingTip: string;
  };
  sowingInfo: {
    season: string[];
    bestMonths: string;
    seedRatePerAcre: string;
    spacing: string;
  };
  fertilizerInfo: {
    npkRatio: string;
    guideline: string;
    stages: FertilizerStage[];
    fymRecommendation: string;
    disclaimer: string;
  };
  timeline: GrowthStage[];
  pestsAndDiseases: PestOrDisease[];
  // Economics & Profit estimation benchmarks
  economics: {
    typicalSeedCost: number;
    typicalFertilizerCost: number;
    typicalPesticideCost: number;
    typicalLabourCost: number;
    typicalIrrigationCost: number;
    typicalOtherCost: number;
    expectedYieldMinQtl: number;
    expectedYieldMaxQtl: number;
    typicalPricePerQtl: number;
  };
}

export interface MarketPriceRecord {
  cropId: string;
  cropName: string;
  kannadaCropName: string;
  hindiCropName: string;
  mandiName: string;
  district: string;
  state: string;
  pricePerQuintal: {
    min: number;
    max: number;
    modal: number;
  };
  pricePerKg: {
    min: number;
    max: number;
    modal: number;
  };
  arrivalTons?: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  isLive: boolean;
  dataSource: string;
  notice?: string;
}

export interface WeatherData {
  temp: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  rainProbability: number;
  precipitationMm: number;
  condition: string;
  conditionCode: number;
  alerts: string[];
  lastUpdated: string;
  isLive: boolean;
  source: string;
}

export interface FarmingAlert {
  id: string;
  type: 'weather' | 'market' | 'pest' | 'advisory';
  title: string;
  message: string;
  kannadaTitle: string;
  kannadaMessage: string;
  date: string;
  severity: 'info' | 'warning' | 'urgent';
}
