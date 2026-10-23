import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Building2,
  Calendar,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Crop, Language, LocationState, MarketPriceRecord } from '../types/farming';
import { SAMPLE_MARKET_PRICES } from '../data/cropsData';
import { TRANSLATIONS } from '../data/translations';

interface MarketPriceSectionProps {
  crop: Crop;
  location: LocationState;
  language: Language;
  onOpenLocationModal: () => void;
  onNavigateToTab: (tab: 'crops' | 'askAi') => void;
}

export const MarketPriceSection: React.FC<MarketPriceSectionProps> = ({
  crop,
  location,
  language,
  onOpenLocationModal,
  onNavigateToTab,
}) => {
  const t = TRANSLATIONS[language].marketSection;

  // Toggle for testing live API unavailable simulation vs reference data
  const [isSimulatingOffline, setIsSimulatingOffline] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Find price record for this crop
  const priceRecord: MarketPriceRecord | undefined = SAMPLE_MARKET_PRICES.find(
    (p) => p.cropId === crop.id
  ) || {
    cropId: crop.id,
    cropName: crop.name,
    kannadaCropName: crop.kannadaName,
    hindiCropName: crop.hindiName,
    mandiName: `${location.mandi || location.district + ' APMC'}`,
    district: location.district,
    state: location.state,
    pricePerQuintal: {
      min: crop.economics.typicalPricePerQtl * 0.85,
      max: crop.economics.typicalPricePerQtl * 1.15,
      modal: crop.economics.typicalPricePerQtl,
    },
    pricePerKg: {
      min: +(crop.economics.typicalPricePerQtl * 0.85 / 100).toFixed(1),
      max: +(crop.economics.typicalPricePerQtl * 1.15 / 100).toFixed(1),
      modal: +(crop.economics.typicalPricePerQtl / 100).toFixed(1),
    },
    arrivalTons: 180,
    trend: 'stable',
    lastUpdated: 'Today, 10:30 AM',
    isLive: false,
    dataSource: `Demo data – ${location.district} APMC benchmark record (Not live market API)`,
    notice: 'Market trading steady. Rates collected during primary morning auction.',
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setIsSimulatingOffline(false);
    }, 600);
  };

  const getCropTitle = () => {
    if (language === 'kn') return crop.kannadaName;
    if (language === 'hi') return crop.hindiName;
    return crop.name;
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <span>{t.title}</span>
          </h2>
          <p className="text-xs text-stone-500">{t.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Change Mandi button */}
          <button
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.selectAnotherMandi}</span>
          </button>

          {/* Test Offline Mode Simulation Toggle */}
          <button
            onClick={() => setIsSimulatingOffline(!isSimulatingOffline)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition ${
              isSimulatingOffline
                ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
            }`}
            title="Toggle to simulate live data unavailability"
          >
            {isSimulatingOffline ? 'Mode: Offline Sim' : 'Simulate Error'}
          </button>
        </div>
      </div>

      {/* Offline / Unavailable State if triggered */}
      {isSimulatingOffline ? (
        <div className="bg-amber-50 rounded-2xl p-6 border-2 border-dashed border-amber-300 text-center space-y-4 animate-fadeIn">
          <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>

          <div>
            <h3 className="font-bold text-amber-950 text-base sm:text-lg">
              {language === 'kn'
                ? 'ನೈಜ ಮಾರುಕಟ್ಟೆ ದರ ಪ್ರಸ್ತುತ ಲಭ್ಯವಿಲ್ಲ'
                : 'Data temporarily unavailable'}
            </h3>
            <p className="text-xs sm:text-sm text-amber-800 mt-1 max-w-md mx-auto">
              {t.liveUnavailable}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{t.retry}</span>
            </button>

            <button
              onClick={onOpenLocationModal}
              className="px-4 py-2 bg-white text-stone-700 border border-stone-300 rounded-xl text-xs font-bold hover:bg-stone-50 transition"
            >
              {t.selectAnotherMandi}
            </button>

            <button
              onClick={() => onNavigateToTab('crops')}
              className="px-4 py-2 bg-amber-200/80 text-amber-950 rounded-xl text-xs font-bold hover:bg-amber-300 transition"
            >
              {language === 'kn' ? 'ಸಾಮಾನ್ಯ ಬೆಳೆ ಮಾಹಿತಿಗೆ ಮುಂದುವರಿಯಿರಿ' : 'Continue with General Crop Info'}
            </button>
          </div>
        </div>
      ) : (
        /* Active Market Price Card */
        <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden">
          
          {/* Card Top Banner */}
          <div className="bg-emerald-800 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">{crop.icon}</span>
              <div>
                <div className="text-xs text-emerald-200 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>
                    {location.mandi || priceRecord.mandiName} • {location.district} ({location.state})
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black mt-0.5 tracking-tight">
                  {getCropTitle()}
                </h3>
              </div>
            </div>

            {/* Trend Badge */}
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                  priceRecord.trend === 'up'
                    ? 'bg-emerald-500 text-white'
                    : priceRecord.trend === 'down'
                    ? 'bg-rose-500 text-white'
                    : 'bg-emerald-700 text-emerald-100'
                }`}
              >
                {priceRecord.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                {priceRecord.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                {priceRecord.trend === 'stable' && <Minus className="w-4 h-4" />}
                <span>
                  {priceRecord.trend === 'up'
                    ? language === 'kn'
                      ? 'ದರ ಏರಿಕೆ ಮುಖ'
                      : 'Upward Trend'
                    : priceRecord.trend === 'down'
                    ? language === 'kn'
                      ? 'ದರ ಇಳಿಕೆ ಮುಖ'
                      : 'Downward Trend'
                    : language === 'kn'
                    ? 'ಸ್ಥಿರ ಧಾರಣೆ'
                    : 'Stable Trend'}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Blocks: Quintal vs Kg */}
          <div className="p-4 sm:p-6 space-y-5">
            
            {/* Primary Quintal Price Block */}
            <div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>{t.perQuintal}</span>
                <span className="text-emerald-700 font-semibold lowercase">
                  1 {language === 'kn' ? 'ಕ್ವಿಂಟಾಲ್' : 'quintal'} = 100 kg
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {/* Min Price */}
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center">
                  <span className="text-[11px] text-stone-500 block font-medium">
                    {t.minPrice}
                  </span>
                  <span className="text-base sm:text-xl font-bold text-stone-800">
                    ₹{priceRecord.pricePerQuintal.min.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Modal / Typical Price (Hero) */}
                <div className="p-3 sm:p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-500 text-center shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-emerald-600 text-[9px] font-bold text-white px-2 py-0.5 rounded-bl-lg">
                    {language === 'kn' ? 'ಮಾದರಿ' : 'Modal'}
                  </div>
                  <span className="text-xs text-emerald-800 block font-bold">
                    {t.modalPrice}
                  </span>
                  <span className="text-xl sm:text-3xl font-black text-emerald-950">
                    ₹{priceRecord.pricePerQuintal.modal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-700 block mt-0.5 font-medium">
                    / 100 kg
                  </span>
                </div>

                {/* Max Price */}
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center">
                  <span className="text-[11px] text-stone-500 block font-medium">
                    {t.maxPrice}
                  </span>
                  <span className="text-base sm:text-xl font-bold text-stone-800">
                    ₹{priceRecord.pricePerQuintal.max.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary Per Kg Breakdown for Small Retail/Local Sales */}
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="text-xs font-bold text-stone-700 mb-2 flex items-center justify-between">
                <span>{t.perKg} (Retail / Local Trader Conversion)</span>
                <span className="font-mono text-emerald-800 font-bold text-sm">
                  ₹{priceRecord.pricePerKg.modal} / kg
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-stone-600">
                <div>
                  <span className="text-[10px] text-stone-400 block">Min:</span>
                  <span className="font-semibold text-stone-800">₹{priceRecord.pricePerKg.min}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-600 font-bold block">Typical:</span>
                  <span className="font-bold text-emerald-900">₹{priceRecord.pricePerKg.modal}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Max:</span>
                  <span className="font-semibold text-stone-800">₹{priceRecord.pricePerKg.max}</span>
                </div>
              </div>
            </div>

            {/* Market Arrivals & Trade Notice */}
            {priceRecord.notice && (
              <div className="text-xs text-stone-700 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 flex items-start gap-2">
                <span className="text-emerald-700 font-bold text-sm">📢</span>
                <div>
                  <span className="font-bold text-emerald-900">
                    {language === 'kn' ? 'ಮಾರುಕಟ್ಟೆ ವರದಿ:' : 'Market Intelligence:'}{' '}
                  </span>
                  <span>{priceRecord.notice}</span>
                </div>
              </div>
            )}

            {/* Last Updated Timestamp & Clear Demo Data Disclosure */}
            <div className="pt-3 border-t border-stone-100 space-y-2">
              <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>
                    {t.lastUpdated}:{' '}
                    <strong className="text-stone-700">{priceRecord.lastUpdated}</strong>
                  </span>
                </div>
                <span className="text-[11px] text-stone-400">
                  Ready for official Agmarknet / APMC API integration
                </span>
              </div>

              {/* Explicit Demo Data Warning */}
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>{t.demoWarning}</strong> {language === 'kn' ? 'ನೈಜ ವ್ಯಾಪಾರಕ್ಕೆ ಮುನ್ನ ಸ್ಥಳೀಯ ಮಂಡಿಯಲ್ಲಿ ದರ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.' : 'Always verify today’s open auction prices at your local APMC yard before transporting produce.'}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Nearby Karnataka Mandis Quick Reference */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm">
        <h4 className="font-bold text-stone-900 text-sm sm:text-base mb-2.5 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-emerald-700" />
          <span>
            {language === 'kn' ? 'ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ಮಾರುಕಟ್ಟೆಗಳು' : 'Nearby Major Karnataka Mandis'}
          </span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/60 flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-800 block">Kolar APMC</span>
              <span className="text-[11px] text-stone-500">Tomato & Mango Hub</span>
            </div>
            <span className="font-bold text-emerald-800 bg-white px-2 py-1 rounded-lg border">
              High Volume
            </span>
          </div>
          <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/60 flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-800 block">Byadgi APMC</span>
              <span className="text-[11px] text-stone-500">Famous Red Chilli Yard</span>
            </div>
            <span className="font-bold text-emerald-800 bg-white px-2 py-1 rounded-lg border">
              State Benchmark
            </span>
          </div>
          <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/60 flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-800 block">Hubballi APMC</span>
              <span className="text-[11px] text-stone-500">Onion, Pulses & Grain</span>
            </div>
            <span className="font-bold text-emerald-800 bg-white px-2 py-1 rounded-lg border">
              North Karnataka Hub
            </span>
          </div>
          <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/60 flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-800 block">Raichur APMC</span>
              <span className="text-[11px] text-stone-500">Paddy & Cotton Hub</span>
            </div>
            <span className="font-bold text-emerald-800 bg-white px-2 py-1 rounded-lg border">
              High Arrival
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
