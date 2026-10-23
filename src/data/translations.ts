export interface AppTranslations {
  appName: string;
  tagline: string;
  welcomeFarmer: string;
  selectLocation: string;
  selectLanguage: string;
  currentDate: string;
  weatherSummary: string;
  selectCropButton: string;
  changeLocation: string;
  changeCrop: string;
  quickAccess: {
    cropInfo: string;
    marketPrices: string;
    pestHelp: string;
    irrigation: string;
    farmingGuide: string;
    askAi: string;
    profitCalc: string;
    compare: string;
  };
  cropDashboard: {
    title: string;
    growingPeriod: string;
    suitableSoil: string;
    waterRequirement: string;
    sowingInfo: string;
    fertilizerInfo: string;
    timelineTitle: string;
    fertilizerDisclaimer: string;
    soilPh: string;
    drainage: string;
    seedRate: string;
    spacing: string;
    season: string;
  };
  marketSection: {
    title: string;
    subtitle: string;
    perQuintal: string;
    perKg: string;
    minPrice: string;
    maxPrice: string;
    modalPrice: string;
    lastUpdated: string;
    mandiName: string;
    district: string;
    demoWarning: string;
    liveUnavailable: string;
    retry: string;
    selectAnotherMandi: string;
    priceTrend: string;
  };
  pestSection: {
    title: string;
    subtitle: string;
    uploadPhotoTitle: string;
    uploadPhotoDesc: string;
    symptoms: string;
    prevention: string;
    ipmControl: string;
    safeControl: string;
    safetyWarning: string;
    expertAdvice: string;
    pesticidePrecaution: string;
    aiDiagnosticTitle: string;
  };
  weatherSection: {
    title: string;
    temp: string;
    rainProb: string;
    humidity: string;
    wind: string;
    alertsTitle: string;
    source: string;
  };
  aiAssistant: {
    title: string;
    subtitle: string;
    askPlaceholder: string;
    askButton: string;
    thinking: string;
    quickQuestions: string;
    voiceListen: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    landArea: string;
    acres: string;
    seedCost: string;
    fertilizerCost: string;
    pesticideCost: string;
    labourCost: string;
    irrigationCost: string;
    otherCost: string;
    expectedYield: string;
    sellingPrice: string;
    totalCost: string;
    expectedRevenue: string;
    estimatedProfit: string;
    estimateNote: string;
  };
  comparison: {
    title: string;
    selectCrop1: string;
    selectCrop2: string;
    growingPeriod: string;
    waterRequirement: string;
    suitableSoil: string;
    sowingSeason: string;
    marketPrice: string;
    majorPests: string;
  };
  bottomNav: {
    home: string;
    crops: string;
    market: string;
    pests: string;
    askAi: string;
    calculator: string;
  };
}

export const TRANSLATIONS: Record<'en' | 'kn' | 'hi', AppTranslations> = {
  en: {
    appName: 'Smart Farmer Assistant',
    tagline: 'Simple, direct farming guidance for Indian farmers',
    welcomeFarmer: 'Welcome, Farmer Friend!',
    selectLocation: 'Select Your Location',
    selectLanguage: 'Language',
    currentDate: 'Today',
    weatherSummary: 'Current Weather Advisory',
    selectCropButton: 'Select Your Crop 🌱',
    changeLocation: 'Change Location',
    changeCrop: 'Change Crop',
    quickAccess: {
      cropInfo: 'Crop Guide',
      marketPrices: 'Market Rates',
      pestHelp: 'Pest & Disease Help',
      irrigation: 'Water & Irrigation',
      farmingGuide: 'Stage Timeline',
      askAi: 'Ask AI Farmer Assistant',
      profitCalc: 'Profit Calculator',
      compare: 'Compare Crops',
    },
    cropDashboard: {
      title: 'Crop Information Dashboard',
      growingPeriod: 'Growing Period & Duration',
      suitableSoil: 'Suitable Soil & Land',
      waterRequirement: 'Water & Irrigation Requirements',
      sowingInfo: 'Sowing & Seed Information',
      fertilizerInfo: 'Fertilizer & Nutrition Guide',
      timelineTitle: 'Crop Growth Timeline',
      fertilizerDisclaimer: 'Fertilizer recommendations are general guidelines only. Soil testing is strongly advised. Confirm exact quantities with your local Raitha Samparka Kendra (RSK) or Agricultural Officer.',
      soilPh: 'Soil pH Range',
      drainage: 'Drainage Need',
      seedRate: 'Recommended Seed Rate',
      spacing: 'Spacing (Row x Plant)',
      season: 'Suitable Seasons',
    },
    marketSection: {
      title: "Today's APMC Market Prices",
      subtitle: 'Benchmark Mandi rates for your crop and district',
      perQuintal: 'Per Quintal (100 kg)',
      perKg: 'Per Kilogram (1 kg)',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      modalPrice: 'Typical / Modal Price',
      lastUpdated: 'Last Updated',
      mandiName: 'Market / Mandi',
      district: 'District',
      demoWarning: 'Demo data – not live market information. Reference rates from APMC market records.',
      liveUnavailable: 'Live market price is currently unavailable. Please check the selected market/source for the latest price.',
      retry: 'Retry Fetch',
      selectAnotherMandi: 'Select Another Mandi',
      priceTrend: '7-Day Price Movement',
    },
    pestSection: {
      title: 'Pest & Disease Management',
      subtitle: 'Identify symptoms, cultural prevention, and eco-friendly control',
      uploadPhotoTitle: 'Upload Photo for AI Crop Diagnosis',
      uploadPhotoDesc: 'Take a clear picture of leaf, stem, fruit, or pest damage',
      symptoms: 'Common Symptoms to Look For',
      prevention: 'Cultural & Preventive Methods',
      ipmControl: 'Integrated Pest Management (IPM)',
      safeControl: 'Eco-Friendly / Biological Control',
      safetyWarning: 'Always follow the product label and local agricultural department recommendations. Use protective equipment and follow the required waiting period before harvest.',
      expertAdvice: 'When to Consult an Agricultural Expert',
      pesticidePrecaution: 'Safety Precautions & Waiting Period (PHI)',
      aiDiagnosticTitle: 'AI Crop Diagnostic Result',
    },
    weatherSection: {
      title: 'Farm Weather Advisory',
      temp: 'Temperature',
      rainProb: 'Rain Probability',
      humidity: 'Relative Humidity',
      wind: 'Wind Speed',
      alertsTitle: 'Farming Weather Alerts',
      source: 'Data Source',
    },
    aiAssistant: {
      title: 'Ask Your Farming Question',
      subtitle: 'Instant advice in your language: English, Kannada, or Hindi',
      askPlaceholder: 'Ask anything: "Yellow spots on tomato leaves?", "Seed rate for ragi?", etc.',
      askButton: 'Ask Question',
      thinking: 'Consulting agricultural advisory...',
      quickQuestions: 'Common Farmer Questions:',
      voiceListen: 'Listen',
    },
    calculator: {
      title: 'Farm Profit Calculator',
      subtitle: 'Estimate total cultivation cost, expected yield, revenue & profit',
      landArea: 'Land Area (in Acres)',
      acres: 'Acres',
      seedCost: 'Seed / Planting Material Cost (₹)',
      fertilizerCost: 'Fertilizer & Manure Cost (₹)',
      pesticideCost: 'Pest Control & Plant Protection Cost (₹)',
      labourCost: 'Labour Cost (Sowing, Weeding, Harvesting) (₹)',
      irrigationCost: 'Irrigation & Electricity / Diesel Cost (₹)',
      otherCost: 'Tractor Rental, Transport & Misc (₹)',
      expectedYield: 'Expected Total Yield (Quintals)',
      sellingPrice: 'Expected Selling Price per Quintal (₹)',
      totalCost: 'Total Cost of Cultivation',
      expectedRevenue: 'Expected Gross Revenue',
      estimatedProfit: 'Estimated Net Profit / (Loss)',
      estimateNote: 'This is an estimate. Actual yield, harvest costs, and market prices may vary due to rainfall, temperature, and mandi arrivals.',
    },
    comparison: {
      title: 'Crop Comparison Tool',
      selectCrop1: 'First Crop',
      selectCrop2: 'Second Crop',
      growingPeriod: 'Growing Period',
      waterRequirement: 'Water Requirement',
      suitableSoil: 'Suitable Soil',
      sowingSeason: 'Sowing Season',
      marketPrice: 'Typical Market Price',
      majorPests: 'Major Pests & Diseases',
    },
    bottomNav: {
      home: 'Home',
      crops: 'Crops',
      market: 'Market',
      pests: 'Pests',
      askAi: 'Ask AI',
      calculator: 'Profit Calc',
    },
  },
  kn: {
    appName: 'ಸ್ಮಾರ್ಟ್ ರೈತ ಸಹಾಯಕ',
    tagline: 'ಭಾರತೀಯ ರೈತರಿಗೆ ಸರಳ, ಉಪಯುಕ್ತ ಕೃಷಿ ಮಾಹಿತಿ ಮಾರ್ಗದರ್ಶಿ',
    welcomeFarmer: 'ನಮಸ್ಕಾರ, ರೈತ ಮಿತ್ರರೇ!',
    selectLocation: 'ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    selectLanguage: 'ಭಾಷೆ',
    currentDate: 'ಇಂದು',
    weatherSummary: 'ಹವಾಮಾನ ಸಲಹೆ',
    selectCropButton: 'ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ 🌱',
    changeLocation: 'ಸ್ಥಳ ಬದಲಾಯಿಸಿ',
    changeCrop: 'ಬೆಳೆ ಬದಲಾಯಿಸಿ',
    quickAccess: {
      cropInfo: 'ಬೆಳೆ ಮಾಹಿತಿ',
      marketPrices: 'ಮಾರುಕಟ್ಟೆ ದರ',
      pestHelp: 'ಕೀಟ & ರೋಗ ಪರಿಹಾರ',
      irrigation: 'ನೀರಾವರಿ ಮಾಹಿತಿ',
      farmingGuide: 'ಬೆಳವಣಿಗೆ ಹಂತಗಳು',
      askAi: 'ಎಐ ಕೃಷಿ ಸಹಾಯಕ',
      profitCalc: 'ಆದಾಯ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      compare: 'ಬೆಳೆಗಳ ಹೋಲಿಕೆ',
    },
    cropDashboard: {
      title: 'ಬೆಳೆ ಮಾಹಿತಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      growingPeriod: 'ಬೆಳೆಯುವ ಅವಧಿ (ದಿನಗಳು/ವಾರಗಳು)',
      suitableSoil: 'ಸೂಕ್ತ ಮಣ್ಣು ಮತ್ತು ಭೂಮಿ',
      waterRequirement: 'ನೀರಿನ ಮತ್ತು ನೀರಾವರಿ ಅಗತ್ಯತೆ',
      sowingInfo: 'ಬಿತ್ತನೆ & ಬೀಜದ ಮಾಹಿತಿ',
      fertilizerInfo: 'ರಸಗೊಬ್ಬರ ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ಮಾಹಿತಿ',
      timelineTitle: 'ಬೆಳೆ ಬೆಳವಣಿಗೆಯ ಹಂತಗಳು (ಟೈಮ್‌ಲೈನ್)',
      fertilizerDisclaimer: 'ಗೊಬ್ಬರದ ಪ್ರಮಾಣಗಳು ಸಾಮಾನ್ಯ ಮಾರ್ಗದರ್ಶನ ಮಾತ್ರ. ಮಣ್ಣು ಪರೀಕ್ಷೆ ಅತ್ಯಗತ್ಯ. ನಿಮ್ಮ ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ (RSK) ಅಥವಾ ಕೃಷಿ ಅಧಿಕಾರಿಯ ಸಲಹೆ ಪಡೆಯಿರಿ.',
      soilPh: 'ಮಣ್ಣಿನ ಪಿ.ಹೆಚ್ (pH) ಪ್ರಮಾಣ',
      drainage: 'ಬಸಿದು ಹೋಗುವ ವ್ಯವಸ್ಥೆ',
      seedRate: 'ಶಿಫಾರಸು ಮಾಡಿದ ಬೀಜದ ಪ್ರಮಾಣ',
      spacing: 'ಸಾಲು ಮತ್ತು ಗಿಡಗಳ ಅಂತರ',
      season: 'ಸೂಕ್ತ ಬಿತ್ತನೆ ಕಾಲ',
    },
    marketSection: {
      title: 'ಇಂದಿನ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ ದರಗಳು',
      subtitle: 'ನಿಮ್ಮ ಬೆಳೆ ಮತ್ತು ಜಿಲ್ಲೆಯ ಮಾರುಕಟ್ಟೆ ಧಾರಣೆ',
      perQuintal: 'ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ (100 ಕೆ.ಜಿ)',
      perKg: 'ಪ್ರತಿ ಕಿಲೋಗ್ರಾಂಗೆ (1 ಕೆ.ಜಿ)',
      minPrice: 'ಕನಿಷ್ಠ ದರ',
      maxPrice: 'ಗರಿಷ್ಠ ದರ',
      modalPrice: 'ಮಾದರಿ / ಸಾಮಾನ್ಯ ದರ',
      lastUpdated: 'ಕೊನೆಯ ನವೀಕರಣ',
      mandiName: 'ಮಾರುಕಟ್ಟೆ / ಎಪಿಎಂಸಿ ಮಂಡಿ',
      district: 'ಜಿಲ್ಲೆ',
      demoWarning: 'ಮಾದರಿ ಮಾಹಿತಿ (Demo Data) – ನೈಜ ಮಾರುಕಟ್ಟೆ ದತ್ತಾಂಶವಲ್ಲ. ಎಪಿಎಂಸಿ ಉಲ್ಲೇಖ ದರ.',
      liveUnavailable: 'ನೈಜ ಮಾರುಕಟ್ಟೆ ದರ ಪ್ರಸ್ತುತ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಸಂಬಂಧಿತ ಎಪಿಎಂಸಿ ಮಂಡಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
      retry: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
      selectAnotherMandi: 'ಬೇರೆ ಮಂಡಿ ಆಯ್ಕೆಮಾಡಿ',
      priceTrend: '7 ದಿನಗಳ ಬೆಲೆ ಬದಲಾವಣೆ',
    },
    pestSection: {
      title: 'ಕೀಟ ಮತ್ತು ರೋಗ ನಿರ್ವಹಣೆ',
      subtitle: 'ರೋಗ ಲಕ್ಷಣಗಳು, ತಡೆಗಟ್ಟುವಿಕೆ ಮತ್ತು ಪರಿಸರ ಸ್ನೇಹಿ ನಿಯಂತ್ರಣ',
      uploadPhotoTitle: 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ರೋಗ ಪತ್ತೆ ಹಚ್ಚಿ',
      uploadPhotoDesc: 'ಎಲೆ, ಕಾಂಡ, ಕಾಯಿ ಅಥವಾ ಕೀಟದ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆಯಿರಿ',
      symptoms: 'ಗಮನಿಸಬೇಕಾದ ರೋಗ ಲಕ್ಷಣಗಳು',
      prevention: 'ಮುನ್ನೆಚ್ಚರಿಕೆ & ಬೆಳೆ ಪದ್ಧತಿಗಳು',
      ipmControl: 'ಸಮಗ್ರ ಕೀಟ ನಿರ್ವಹಣೆ (IPM)',
      safeControl: 'ಜೈವಿಕ ಮತ್ತು ಸಾವಯವ ಪರಿಹಾರ',
      safetyWarning: 'ಯಾವಾಗಲೂ ಉತ್ಪನ್ನದ ಲೇಬಲ್ ಮತ್ತು ಕೃಷಿ ಇಲಾಖೆಯ ಶಿಫಾರಸುಗಳನ್ನು ಪಾಲಿಸಿ. ಕಟಾವಿಗೆ ಮೊದಲು ಕಾಯುವ ಅವಧಿ (PHI) ಪಾಲಿಸಿ.',
      expertAdvice: 'ಕೃಷಿ ತಜ್ಞರನ್ನು ಯಾವಾಗ ಸಂಪರ್ಕಿಸಬೇಕು',
      pesticidePrecaution: 'ಸುರಕ್ಷತಾ ಮುನ್ನೆಚ್ಚರಿಕೆ & ಕಟಾವು ಅಂತರ',
      aiDiagnosticTitle: 'ಎಐ ಬೆಳೆ ರೋಗ ತಪಾಸಣೆ ಫಲಿತಾಂಶ',
    },
    weatherSection: {
      title: 'ಕೃಷಿ ಹವಾಮಾನ ಸಲಹೆ',
      temp: 'ತಾಪಮಾನ',
      rainProb: 'ಮಳೆ ಸಂಭವನೀಯತೆ',
      humidity: 'ತೇವಾಂಶ (ಆರ್ದ್ರತೆ)',
      wind: 'ಗಾಳಿಯ ವೇಗ',
      alertsTitle: 'ರೈತರಿಗೆ ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು',
      source: 'ಮಾಹಿತಿ ಮೂಲ',
    },
    aiAssistant: {
      title: 'ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆ ಕೇಳಿ',
      subtitle: 'ಕನ್ನಡದಲ್ಲಿ ತಕ್ಷಣ ಸರಳ ಕೃಷಿ ಉತ್ತರ ಪಡೆಯಿರಿ',
      askPlaceholder: 'ಉದಾ: "ಟೊಮೆಟೊ ಎಲೆ ಹಳದಿಯಾಗುತ್ತಿವೆ, ಏನು ಮಾಡಬೇಕು?", "ರಾಗಿ ಬಿತ್ತನೆ ಯಾವಾಗ?"',
      askButton: 'ಪ್ರಶ್ನೆ ಕೇಳಿ',
      thinking: 'ಉತ್ತರ ಸಿದ್ಧವಾಗುತ್ತಿದೆ...',
      quickQuestions: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು:',
      voiceListen: 'ಆಲಿಸಿ',
    },
    calculator: {
      title: 'ಕೃಷಿ ಆದಾಯ ಮತ್ತು ವೆಚ್ಚ ಲೆಕ್ಕಾಚಾರ',
      subtitle: 'ಬೆಳೆ ವೆಚ್ಚ, ಇಳುವರಿ, ಆದಾಯ ಮತ್ತು ಲಾಭದ ಅಂದಾಜು',
      landArea: 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಎಕರೆಗಳಲ್ಲಿ)',
      acres: 'ಎಕರೆ',
      seedCost: 'ಬೀಜದ ವೆಚ್ಚ (₹)',
      fertilizerCost: 'ರಸಗೊಬ್ಬರ & ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ವೆಚ್ಚ (₹)',
      pesticideCost: 'ಕೀಟನಾಶಕ & ಔಷಧ ವೆಚ್ಚ (₹)',
      labourCost: 'ಕೂಲಿ ವೆಚ್ಚ (ನಾಟಿ, ಕಳೆ, ಕಟಾವು) (₹)',
      irrigationCost: 'ನೀರಾವರಿ, ಡೀಸೆಲ್ & ವಿದ್ಯುತ್ ವೆಚ್ಚ (₹)',
      otherCost: 'ಟ್ರ್ಯಾಕ್ಟರ್ ಬಾಡಿಗೆ & ಸಾರಿಗೆ ವೆಚ್ಚ (₹)',
      expectedYield: 'ನಿರೀಕ್ಷಿತ ಒಟ್ಟು ಇಳುವರಿ (ಕ್ವಿಂಟಾಲ್)',
      sellingPrice: 'ನಿರೀಕ್ಷಿತ ಮಾರಾಟ ದರ (ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹)',
      totalCost: 'ಒಟ್ಟು ಬೇಸಾಯ ವೆಚ್ಚ',
      expectedRevenue: 'ನಿರೀಕ್ಷಿತ ಒಟ್ಟು ಆದಾಯ',
      estimatedProfit: 'ಅಂದಾಜು ನಿವ್ವಳ ಲಾಭ / (ನಷ್ಟ)',
      estimateNote: 'ಇದು ಕೇವಲ ಅಂದಾಜು ಮಾತ್ರ. ನೈಜ ಇಳುವರಿ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ದರ ಹವಾಮಾನ ಹಾಗೂ ಮಾರುಕಟ್ಟೆಯ ಆಗಮನದ ಮೇಲೆ ಬದಲಾಗಬಹುದು.',
    },
    comparison: {
      title: 'ಬೆಳೆಗಳ ತುಲನಾತ್ಮಕ ಹೋಲಿಕೆ',
      selectCrop1: 'ಮೊದಲ ಬೆಳೆ',
      selectCrop2: 'ಎರಡನೇ ಬೆಳೆ',
      growingPeriod: 'ಬೆಳೆಯುವ ಅವಧಿ',
      waterRequirement: 'ನೀರಿನ ಅಗತ್ಯತೆ',
      suitableSoil: 'ಸೂಕ್ತ ಮಣ್ಣು',
      sowingSeason: 'ಬಿತ್ತನೆ ಕಾಲ',
      marketPrice: 'ಮಾರುಕಟ್ಟೆ ದರ ವ್ಯಾಪ್ತಿ',
      majorPests: 'ಪ್ರಮುಖ ಕೀಟ & ರೋಗಗಳು',
    },
    bottomNav: {
      home: 'ಮುಖಪುಟ',
      crops: 'ಬೆಳೆಗಳು',
      market: 'ಮಾರುಕಟ್ಟೆ',
      pests: 'ಕೀಟ & ರೋಗ',
      askAi: 'ಎಐ ಪ್ರಶ್ನೆ',
      calculator: 'ಆದಾಯ ಲೆಕ್ಕ',
    },
  },
  hi: {
    appName: 'स्मार्ट किसान सहायक',
    tagline: 'भारतीय किसानों के लिए सरल, उपयोगी और सटीक कृषि गाइड',
    welcomeFarmer: 'नमस्ते, किसान भाई!',
    selectLocation: 'अपना स्थान चुनें',
    selectLanguage: 'भाषा',
    currentDate: 'आज की तारीख',
    weatherSummary: 'मौसम व कृषि सलाह',
    selectCropButton: 'अपनी फसल चुनें 🌱',
    changeLocation: 'स्थान बदलें',
    changeCrop: 'फसल बदलें',
    quickAccess: {
      cropInfo: 'फसल जानकारी',
      marketPrices: 'मंडी भाव',
      pestHelp: 'कीट एवं रोग सुरक्षा',
      irrigation: 'सिंचाई प्रबंधन',
      farmingGuide: 'फसल विकास चक्र',
      askAi: 'एआई किसान सहायक',
      profitCalc: 'मुनाफा कैलकुलेटर',
      compare: 'फसलों की तुलना',
    },
    cropDashboard: {
      title: 'फसल जानकारी डैशबोर्ड',
      growingPeriod: 'फसल अवधि (दिन व सप्ताह)',
      suitableSoil: 'उपयुक्त मिट्टी व खेत',
      waterRequirement: 'पानी एवं सिंचाई आवश्यकता',
      sowingInfo: 'बुवाई व बीज की जानकारी',
      fertilizerInfo: 'उर्वरक एवं पोषण प्रबंधन',
      timelineTitle: 'फसल वृद्धि समय-रेखा (टाइमलाइन)',
      fertilizerDisclaimer: 'उर्वरक की मात्रा केवल सामान्य मार्गदर्शन हेतु है। मिट्टी की जांच (सॉइल टेस्ट) अवश्य कराएं और नजदीकी कृषि विज्ञान केंद्र (KVK) की सलाह लें।',
      soilPh: 'मिट्टी का पीएच (pH) मान',
      drainage: 'जल निकासी',
      seedRate: 'बीज दर (प्रति एकड़)',
      spacing: 'कतार व पौधे की दूरी',
      season: 'उपयुक्त मौसम',
    },
    marketSection: {
      title: 'आज के मंडी भाव (APMC)',
      subtitle: 'आपकी फसल और जिले के ताजा मंडी भाव',
      perQuintal: 'प्रति क्विंटल (100 किग्रा)',
      perKg: 'प्रति किलोग्राम (1 किग्रा)',
      minPrice: 'न्यूनतम भाव',
      maxPrice: 'अधिकतम भाव',
      modalPrice: 'औसत / मॉडल भाव',
      lastUpdated: 'अंतिम अपडेट',
      mandiName: 'मंडी का नाम',
      district: 'जिला',
      demoWarning: 'डेमो डेटा – वास्तविक लाइव मंडी डेटा नहीं है। संदर्भ हेतु मंडी रिकॉर्ड।',
      liveUnavailable: 'लाइव मंडी भाव वर्तमान में अनुपलब्ध है। कृपया संबंधित मंडी से पुष्टि करें।',
      retry: 'पुनः प्रयास करें',
      selectAnotherMandi: 'अन्य मंडी चुनें',
      priceTrend: '7 दिवसीय भाव रुझान',
    },
    pestSection: {
      title: 'कीट एवं रोग प्रबंधन',
      subtitle: 'लक्षण, जैविक रोकथाम व पर्यावरण-अनुकूल नियंत्रण',
      uploadPhotoTitle: 'फोटो अपलोड कर रोग पहचानें',
      uploadPhotoDesc: 'पत्ती, फल, तना या कीट की साफ तस्वीर लें',
      symptoms: 'पहचानने योग्य प्रमुख लक्षण',
      prevention: 'सावधानियां एवं कृषि क्रियाएं',
      ipmControl: 'समेकित कीट प्रबंधन (IPM)',
      safeControl: 'सुरक्षित जैविक / प्राकृतिक उपचार',
      safetyWarning: 'कीटनाशक के लेबल और कृषि विभाग की सिफारिशों का कड़ाई से पालन करें। कटाई से पहले प्रतीक्षा अवधि (PHI) का ध्यान रखें।',
      expertAdvice: 'कृषि विशेषज्ञ से कब संपर्क करें',
      pesticidePrecaution: 'सुरक्षा सावधानियां व कटाई अंतराल',
      aiDiagnosticTitle: 'एआई फसल निदान परिणाम',
    },
    weatherSection: {
      title: 'कृषि मौसम सलाह',
      temp: 'तापमान',
      rainProb: 'बारिश की संभावना',
      humidity: 'नमी (आर्द्रता)',
      wind: 'हवा की गति',
      alertsTitle: 'किसानों के लिए मौसम चेतावनी',
      source: 'डेटा स्रोत',
    },
    aiAssistant: {
      title: 'अपना कृषि प्रश्न पूछें',
      subtitle: 'सरल भाषा में तुरंत समाधान पाएं',
      askPlaceholder: 'उदाहरण: "टमाटर के पत्ते पीले क्यों हो रहे हैं?", "मक्का की बुवाई कब करें?"',
      askButton: 'पूछें',
      thinking: 'कृषि विशेषज्ञ सलाह तैयार हो रही है...',
      quickQuestions: 'अक्सर पूछे जाने वाले सवाल:',
      voiceListen: 'सुनें',
    },
    calculator: {
      title: 'खेत मुनाफा और लागत कैलकुलेटर',
      subtitle: 'खेती की कुल लागत, पैदावार, आय और शुद्ध मुनाफे का सटीक अनुमान',
      landArea: 'जमीन का रकबा (एकड़ में)',
      acres: 'एकड़',
      seedCost: 'बीज का खर्च (₹)',
      fertilizerCost: 'उर्वरक व खाद का खर्च (₹)',
      pesticideCost: 'दवा व कीटनाशक का खर्च (₹)',
      labourCost: 'मजदूरी का खर्च (बुवाई, निराई, कटाई) (₹)',
      irrigationCost: 'सिंचाई व बिजली / डीजल का खर्च (₹)',
      otherCost: 'ट्रैक्टर जुताई, परिवहन व अन्य (₹)',
      expectedYield: 'अनुमानित कुल पैदावार (क्विंटल)',
      sellingPrice: 'अनुमानित बिक्री भाव प्रति क्विंटल (₹)',
      totalCost: 'खेती की कुल लागत',
      expectedRevenue: 'अनुमानित कुल आमदनी',
      estimatedProfit: 'अनुमानित शुद्ध मुनाफा / (घाटा)',
      estimateNote: 'यह केवल एक अनुमान है। वास्तविक उपज और भाव मौसम व मंडी आवक पर निर्भर करते हैं।',
    },
    comparison: {
      title: 'दो फसलों की तुलना',
      selectCrop1: 'पहली फसल',
      selectCrop2: 'दूसरी फसल',
      growingPeriod: 'फसल अवधि',
      waterRequirement: 'पानी की आवश्यकता',
      suitableSoil: 'उपयुक्त मिट्टी',
      sowingSeason: 'बुवाई का मौसम',
      marketPrice: 'औसत मंडी भाव',
      majorPests: 'प्रमुख कीट व रोग',
    },
    bottomNav: {
      home: 'होम',
      crops: 'फसलें',
      market: 'मंडी भाव',
      pests: 'कीट-रोग',
      askAi: 'एआई सवाल',
      calculator: 'मुनाफा',
    },
  },
};
