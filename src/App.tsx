import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav, TabType } from './components/BottomNav';
import { LocationModal } from './components/LocationModal';
import { CropSelectionModal } from './components/CropSelectionModal';
import { CropDashboard } from './components/CropDashboard';
import { MarketPriceSection } from './components/MarketPriceSection';
import { PestManagementSection } from './components/PestManagementSection';
import { WeatherCard } from './components/WeatherCard';
import { AIChatSection } from './components/AIChatSection';
import { CropComparison } from './components/CropComparison';
import { ProfitCalculator } from './components/ProfitCalculator';
import { AlertsModal } from './components/AlertsModal';

import { CROPS_DATA } from './data/cropsData';
import { LocationState, Language, Crop, FarmingAlert } from './types/farming';
import { TRANSLATIONS } from './data/translations';
import {
  Sprout,
  TrendingUp,
  Bug,
  Droplets,
  Calendar,
  MessageSquare,
  Calculator,
  ArrowLeftRight,
  MapPin,
  ChevronRight,
  Sun,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export default function App() {
  // User Language State
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const t = TRANSLATIONS[currentLanguage];

  // User Farm Location State (Default: Mandya, Karnataka)
  const [location, setLocation] = useState<LocationState>({
    state: 'Karnataka',
    district: 'Mandya',
    taluk: 'Mandya',
    mandi: 'Mandya APMC',
    lat: 12.5229,
    lon: 76.8976,
  });

  // Selected Crop State (Default: Ragi / Tomato)
  const [selectedCrop, setSelectedCrop] = useState<Crop>(CROPS_DATA[1]); // Ragi as classic Karnataka staple

  // Active Tab: 'home' | 'crops' | 'market' | 'pests' | 'askAi' | 'calculator' | 'compare'
  const [currentTab, setCurrentTab] = useState<TabType>('home');

  // Modals
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);

  // Farming Alerts & Bulletins
  const [alerts, setAlerts] = useState<FarmingAlert[]>([
    {
      id: '1',
      type: 'market',
      title: 'Tomato Market Movement',
      message: 'Tomato price at Kolar APMC has risen to ₹1,650/qtl due to strong demand from neighbouring states.',
      kannadaTitle: 'ಟೊಮೆಟೊ ಮಾರುಕಟ್ಟೆ ದರ ಏರಿಕೆ',
      kannadaMessage: 'ಕೋಲಾರ ಎಪಿಎಂಸಿಯಲ್ಲಿ ಟೊಮೆಟೊ ದರ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹1,650 ಕ್ಕೆ ಏರಿಕೆಯಾಗಿದೆ.',
      date: 'Today, 09:30 AM',
      severity: 'warning',
    },
    {
      id: '2',
      type: 'weather',
      title: 'Scattered Showers Expected',
      message: 'Light to moderate rain expected over Mandya & Mysuru basin over next 48 hours. Consider delaying irrigation.',
      kannadaTitle: 'ಮಳೆಯ ಮುನ್ಸೂಚನೆ',
      kannadaMessage: 'ಮುಂದಿನ 48 ಗಂಟೆಗಳಲ್ಲಿ ಸಾಧಾರಣ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆ ಇದೆ. ನೀರಾವರಿ ಹಾಗೂ ಗೊಬ್ಬರ ಕೊಡುವುದನ್ನು ಮುಂದೂಡಿ.',
      date: 'Today, 07:00 AM',
      severity: 'info',
    },
    {
      id: '3',
      type: 'pest',
      title: 'Maize Fall Armyworm Warning',
      message: 'Early whorl damage reported in parts of Hassan & Mandya. Inspect crop whorls and apply neem oil early.',
      kannadaTitle: 'ಮೆಕ್ಕೆಜೋಳ ಲದ್ದಿ ಹುಳು ಎಚ್ಚರಿಕೆ',
      kannadaMessage: 'ಮೆಕ್ಕೆಜೋಳ ಸುಳಿಯಲ್ಲಿ ಲದ್ದಿ ಹುಳು ಬಾಧೆ ಕಂಡುಬಂದಿದೆ. ಮುಂಜಾಗ್ರತೆಯಾಗಿ ಸುಳಿಗೆ ಮರಳು-ಬೂದಿ ಅಥವಾ ಬೇವಿನ ಕಷಾಯ ಹಾಕಿ.',
      date: 'Yesterday',
      severity: 'urgent',
    },
  ]);

  const getCropDisplayName = (crop: Crop) => {
    if (currentLanguage === 'kn') return crop.kannadaName;
    if (currentLanguage === 'hi') return crop.hindiName;
    return crop.name;
  };

  const formattedDate = new Date().toLocaleDateString(
    currentLanguage === 'kn' ? 'kn-IN' : currentLanguage === 'hi' ? 'hi-IN' : 'en-IN',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 pb-20 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Top Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        location={location}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenAlertsModal={() => setIsAlertsModalOpen(true)}
        unreadAlertsCount={alerts.length}
      />

      {/* Main Content Viewport */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-4 space-y-4">
        
        {/* ===================== TAB 1: HOME VIEW ===================== */}
        {currentTab === 'home' && (
          <div className="space-y-4 animate-fadeIn">
            
            {/* Welcome Farmer Greeting & Location Card */}
            <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-emerald-600/50 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-9xl opacity-10 pointer-events-none select-none">
                🌾
              </div>

              <div className="relative z-10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-200">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    <span>{formattedDate}</span>
                  </div>

                  <button
                    onClick={() => setIsLocationModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 hover:bg-emerald-600/60 border border-emerald-400/40 text-amber-300 font-bold transition"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{location.taluk ? `${location.taluk}, ` : ''}{location.district}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    {t.welcomeFarmer}
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl leading-relaxed">
                    {currentLanguage === 'kn'
                      ? 'ನಿಮ್ಮ ಬೆಳೆ, ಇಂದಿನ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ ದರ, ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಮತ್ತು ರೋಗ ಪರಿಹಾರ ಒಂದೇ ಸೂರಿನಡಿ.'
                      : currentLanguage === 'hi'
                      ? 'फसल की संपूर्ण जानकारी, ताजा मंडी भाव, मौसम सलाह और कीट सुरक्षा का सरल समाधान।'
                      : 'Essential crop cultivation guides, APMC mandi prices, live weather alerts, and AI diagnosis for your farm.'}
                  </p>
                </div>

                {/* Big Prominent "Select Your Crop" Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsCropModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-98 text-emerald-950 font-black text-base shadow-lg flex items-center justify-center gap-3 transition"
                  >
                    <span className="text-xl">🌱</span>
                    <span>{t.selectCropButton}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-900/15 text-emerald-950">
                      {getCropDisplayName(selectedCrop)}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Access Action Buttons Grid */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {currentLanguage === 'kn' ? 'ತ್ವರಿತ ಸೇವೆಗಳು' : 'Quick Access Services'}
                </span>
                <span className="text-xs text-emerald-700 font-semibold">
                  {selectedCrop.icon} {getCropDisplayName(selectedCrop)}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {/* 1. Crop Info */}
                <button
                  onClick={() => setCurrentTab('crops')}
                  className="p-3.5 bg-white rounded-2xl border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition shadow-xs flex flex-col justify-between min-h-[95px] active:scale-95 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                    🌱
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 text-xs sm:text-sm block leading-tight">
                      {t.quickAccess.cropInfo}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Soil, Water & Sowing
                    </span>
                  </div>
                </button>

                {/* 2. Market Prices */}
                <button
                  onClick={() => setCurrentTab('market')}
                  className="p-3.5 bg-white rounded-2xl border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition shadow-xs flex flex-col justify-between min-h-[95px] active:scale-95 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                    💰
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 text-xs sm:text-sm block leading-tight">
                      {t.quickAccess.marketPrices}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      APMC Mandi Rates
                    </span>
                  </div>
                </button>

                {/* 3. Pest & Disease Help */}
                <button
                  onClick={() => setCurrentTab('pests')}
                  className="p-3.5 bg-white rounded-2xl border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition shadow-xs flex flex-col justify-between min-h-[95px] active:scale-95 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                    🐛
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 text-xs sm:text-sm block leading-tight">
                      {t.quickAccess.pestHelp}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Photo Diagnosis & IPM
                    </span>
                  </div>
                </button>

                {/* 4. Irrigation & Timeline */}
                <button
                  onClick={() => setCurrentTab('crops')}
                  className="p-3.5 bg-white rounded-2xl border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition shadow-xs flex flex-col justify-between min-h-[95px] active:scale-95 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                    💧
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 text-xs sm:text-sm block leading-tight">
                      {t.quickAccess.irrigation}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Water Management
                    </span>
                  </div>
                </button>

                {/* 5. Stage Timeline */}
                <button
                  onClick={() => setCurrentTab('crops')}
                  className="p-3.5 bg-white rounded-2xl border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition shadow-xs flex flex-col justify-between min-h-[95px] active:scale-95 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                    🌾
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 text-xs sm:text-sm block leading-tight">
                      {t.quickAccess.farmingGuide}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Visual Stage Timeline
                    </span>
                  </div>
                </button>

                {/* 6. Ask AI Assistant */}
                <button
                  onClick={() => setCurrentTab('askAi')}
                  className="p-3.5 bg-white rounded-2xl border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition shadow-xs flex flex-col justify-between min-h-[95px] active:scale-95 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                    🤖
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 text-xs sm:text-sm block leading-tight">
                      {t.quickAccess.askAi}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Voice / Chat Support
                    </span>
                  </div>
                </button>

                {/* 7. Profit Calculator */}
                <button
                  onClick={() => setCurrentTab('calculator')}
                  className="p-3.5 bg-white rounded-2xl border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition shadow-xs flex flex-col justify-between min-h-[95px] active:scale-95 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                    🧮
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 text-xs sm:text-sm block leading-tight">
                      {t.quickAccess.profitCalc}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Cost & Yield Estimate
                    </span>
                  </div>
                </button>

                {/* 8. Compare Crops */}
                <button
                  onClick={() => setCurrentTab('compare')}
                  className="p-3.5 bg-white rounded-2xl border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition shadow-xs flex flex-col justify-between min-h-[95px] active:scale-95 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-stone-200 text-stone-800 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                    ⚖️
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 text-xs sm:text-sm block leading-tight">
                      {t.quickAccess.compare}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Side-by-Side Review
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Farm Weather Advisory Section */}
            <WeatherCard location={location} language={currentLanguage} />

            {/* Highlighted Crop Dashboard Summary Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{selectedCrop.icon}</span>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">
                      {getCropDisplayName(selectedCrop)}
                    </h3>
                    <span className="text-xs text-stone-500">
                      {selectedCrop.growingPeriodDays.min} - {selectedCrop.growingPeriodDays.max} days ({selectedCrop.category})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentTab('crops')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 transition"
                >
                  <span>{currentLanguage === 'kn' ? 'ಸಂಪೂರ್ಣ ಮಾಹಿತಿ' : 'Full Guide'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] text-stone-400 block font-medium">Water Need</span>
                  <span className="font-bold text-stone-800">{selectedCrop.waterRequirement.level}</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] text-stone-400 block font-medium">Best Sowing</span>
                  <span className="font-bold text-stone-800 truncate block">{selectedCrop.sowingInfo.bestMonths}</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] text-stone-400 block font-medium">Seed Rate</span>
                  <span className="font-bold text-stone-800 truncate block">{selectedCrop.sowingInfo.seedRatePerAcre}</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] text-stone-400 block font-medium">Mandi Benchmark</span>
                  <span className="font-bold text-emerald-800">₹{selectedCrop.economics.typicalPricePerQtl}/qtl</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 2: CROP DASHBOARD ===================== */}
        {currentTab === 'crops' && (
          <div className="space-y-4 animate-fadeIn">
            <CropDashboard
              crop={selectedCrop}
              language={currentLanguage}
              onOpenCropModal={() => setIsCropModalOpen(true)}
            />
          </div>
        )}

        {/* ===================== TAB 3: MARKET PRICES ===================== */}
        {currentTab === 'market' && (
          <div className="space-y-4 animate-fadeIn">
            <MarketPriceSection
              crop={selectedCrop}
              location={location}
              language={currentLanguage}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              onNavigateToTab={(tab) => setCurrentTab(tab)}
            />
          </div>
        )}

        {/* ===================== TAB 4: PESTS & DISEASES ===================== */}
        {currentTab === 'pests' && (
          <div className="space-y-4 animate-fadeIn">
            <PestManagementSection crop={selectedCrop} language={currentLanguage} />
          </div>
        )}

        {/* ===================== TAB 5: ASK AI ASSISTANT ===================== */}
        {currentTab === 'askAi' && (
          <div className="space-y-4 animate-fadeIn">
            <AIChatSection
              crop={selectedCrop}
              location={location}
              language={currentLanguage}
            />
          </div>
        )}

        {/* ===================== TAB 6: FARM PROFIT CALCULATOR ===================== */}
        {currentTab === 'calculator' && (
          <div className="space-y-4 animate-fadeIn">
            <ProfitCalculator
              selectedCrop={selectedCrop}
              language={currentLanguage}
            />
          </div>
        )}

        {/* ===================== TAB 7: CROP COMPARISON ===================== */}
        {currentTab === 'compare' && (
          <div className="space-y-4 animate-fadeIn">
            <CropComparison
              initialCropId={selectedCrop.id}
              language={currentLanguage}
            />
          </div>
        )}

      </main>

      {/* Fixed Touch-Friendly Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={currentLanguage}
      />

      {/* Location Selection Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={location}
        onSelectLocation={(newLoc) => setLocation(newLoc)}
        language={currentLanguage}
      />

      {/* Crop Selection Modal */}
      <CropSelectionModal
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
        selectedCropId={selectedCrop.id}
        onSelectCrop={(crop) => setSelectedCrop(crop)}
        language={currentLanguage}
      />

      {/* Alerts & Notifications Modal */}
      <AlertsModal
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
        language={currentLanguage}
        alerts={alerts}
      />

    </div>
  );
}
