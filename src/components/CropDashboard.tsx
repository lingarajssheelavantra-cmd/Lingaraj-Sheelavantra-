import React, { useState } from 'react';
import {
  Clock,
  Layers,
  Droplets,
  Calendar,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Info,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { Crop, Language } from '../types/farming';
import { TRANSLATIONS } from '../data/translations';

interface CropDashboardProps {
  crop: Crop;
  language: Language;
  onOpenCropModal: () => void;
}

export const CropDashboard: React.FC<CropDashboardProps> = ({
  crop,
  language,
  onOpenCropModal,
}) => {
  const t = TRANSLATIONS[language].cropDashboard;
  const [activeTimelineStage, setActiveTimelineStage] = useState<number>(1);
  const [showFertilizerDetails, setShowFertilizerDetails] = useState(false);

  const getCropDisplayName = () => {
    if (language === 'kn') return crop.kannadaName;
    if (language === 'hi') return crop.hindiName;
    return crop.name;
  };

  const minWeeks = Math.round(crop.growingPeriodDays.min / 7);
  const maxWeeks = Math.round(crop.growingPeriodDays.max / 7);

  return (
    <div className="space-y-4">
      {/* Crop Banner Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-emerald-600/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-15 text-8xl pointer-events-none select-none">
          {crop.icon}
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/30">
              {crop.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/40 text-emerald-200 border border-emerald-400/30">
                  {crop.category}
                </span>
                <span className="text-xs text-emerald-200 italic hidden sm:inline">
                  {crop.scientificName}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black mt-0.5 tracking-tight">
                {getCropDisplayName()}
              </h2>
            </div>
          </div>

          <button
            onClick={onOpenCropModal}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm shadow-md transition active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{TRANSLATIONS[language].changeCrop}</span>
          </button>
        </div>
      </div>

      {/* Grid of Key Agronomic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        
        {/* Card 1: ⏱ Growing Period */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 hover:border-emerald-300 transition">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base leading-tight">
                {t.growingPeriod}
              </h3>
              <p className="text-xs text-stone-500">
                {crop.growingPeriodDays.min} - {crop.growingPeriodDays.max} days ({minWeeks} - {maxWeeks} weeks)
              </p>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 mb-2.5">
            <div className="text-xs font-bold text-amber-900 mb-0.5">
              {language === 'kn' ? 'ತಳಿಗಳು ಮತ್ತು ಅವಧಿ:' : 'Varieties & Duration:'}
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              {crop.growingPeriodDays.varieties}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
            <span>{language === 'kn' ? 'ಕಟಾವಿಗೆ ನಿರೀಕ್ಷಿತ ಸಮಯ' : 'Expected Harvest'}</span>
            <span className="font-bold text-emerald-800">
              ~{Math.round((crop.growingPeriodDays.min + crop.growingPeriodDays.max) / 2)} days
            </span>
          </div>
        </div>

        {/* Card 2: 🌍 Suitable Soil */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 hover:border-emerald-300 transition">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base leading-tight">
                {t.suitableSoil}
              </h3>
              <p className="text-xs text-stone-500">{crop.suitableSoil.type}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-100">
              <span className="font-semibold text-stone-600">{t.soilPh}:</span>
              <span className="font-bold text-stone-900 px-2 py-0.5 bg-white rounded-md border border-stone-200">
                {crop.suitableSoil.phRange}
              </span>
            </div>

            <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
              <span className="font-semibold text-stone-600 block mb-0.5">{t.drainage}:</span>
              <span className="text-stone-700 leading-normal">{crop.suitableSoil.drainage}</span>
            </div>
          </div>
        </div>

        {/* Card 3: 💧 Water Requirement */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 hover:border-emerald-300 transition">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base leading-tight">
                  {t.waterRequirement}
                </h3>
                <p className="text-xs text-stone-500">
                  {crop.waterRequirement.generalFrequency}
                </p>
              </div>
            </div>

            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                crop.waterRequirement.level === 'High'
                  ? 'bg-blue-100 text-blue-800'
                  : crop.waterRequirement.level === 'Medium'
                  ? 'bg-teal-100 text-teal-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {crop.waterRequirement.level} {language === 'kn' ? 'ನೀರು' : 'Water'}
            </span>
          </div>

          <div className="text-xs text-stone-700 space-y-2">
            <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100">
              <span className="font-bold text-blue-900 block mb-1">
                {language === 'kn' ? 'ನಿರ್ಣಾಯಕ ನೀರಾವರಿ ಹಂತಗಳು:' : 'Critical Irrigation Stages:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {crop.waterRequirement.criticalStages.map((stage, i) => (
                  <span
                    key={i}
                    className="bg-white px-2 py-0.5 rounded-md border border-blue-200 text-stone-800 font-medium"
                  >
                    • {stage}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-2 bg-stone-50 rounded-xl text-stone-600 border border-stone-100 flex items-start gap-1.5">
              <span className="text-emerald-700 font-bold">💡</span>
              <span>{crop.waterRequirement.waterSavingTip}</span>
            </div>
          </div>
        </div>

        {/* Card 4: 🌾 Sowing Information */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 hover:border-emerald-300 transition">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base leading-tight">
                {t.sowingInfo}
              </h3>
              <p className="text-xs text-stone-500">{crop.sowingInfo.bestMonths}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-stone-500 block mb-0.5">{t.seedRate}</span>
              <span className="font-bold text-stone-900">{crop.sowingInfo.seedRatePerAcre}</span>
            </div>
            <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-stone-500 block mb-0.5">{t.spacing}</span>
              <span className="font-bold text-stone-900">{crop.sowingInfo.spacing}</span>
            </div>
          </div>

          <div className="mt-2 p-2.5 bg-stone-50 rounded-xl border border-stone-100 text-xs">
            <span className="text-stone-500 block mb-1">{t.season}:</span>
            <div className="flex flex-wrap gap-1.5">
              {crop.sowingInfo.season.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-white border border-stone-200 font-semibold text-emerald-900"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Card 5: 🌿 Fertilizer Information with Strict Disclaimer */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base leading-tight">
                {t.fertilizerInfo}
              </h3>
              <p className="text-xs text-stone-500">
                Recommended NPK Ratio: {crop.fertilizerInfo.npkRatio}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowFertilizerDetails(!showFertilizerDetails)}
            className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 transition"
          >
            <span>{showFertilizerDetails ? 'Hide Stages' : 'View Stages'}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showFertilizerDetails ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <p className="text-xs text-stone-700 leading-relaxed mb-3">
          {crop.fertilizerInfo.guideline}
        </p>

        {/* Expandable Stages */}
        {showFertilizerDetails && (
          <div className="space-y-2.5 my-3 pt-2 border-t border-stone-100">
            {crop.fertilizerInfo.stages.map((stg, i) => (
              <div key={i} className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
                <div className="flex items-center justify-between font-bold text-emerald-900 mb-1">
                  <span>{stg.stage}</span>
                  <span className="text-[11px] font-semibold text-stone-500 bg-white px-2 py-0.5 rounded border">
                    {stg.nutrient}
                  </span>
                </div>
                <p className="text-stone-700 mb-1">{stg.recommendation}</p>
                <div className="text-[11px] text-emerald-800 bg-emerald-100/50 p-1.5 rounded-lg">
                  🌱 <span className="font-semibold">Organic Alternative:</span> {stg.organicAlternative}
                </div>
              </div>
            ))}
            <div className="text-xs text-stone-600 bg-lime-50/60 p-2.5 rounded-xl border border-lime-200/60">
              <span className="font-bold text-lime-900">FYM / Organic Manure:</span>{' '}
              {crop.fertilizerInfo.fymRecommendation}
            </div>
          </div>
        )}

        {/* PROMINENT DISCLAIMER NOTICE AS REQUIRED */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl flex items-start gap-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">
              {language === 'kn' ? 'ಗಮನಿಸಿ (ಕಡ್ಡಾಯ ಸಲಹೆ):' : 'Important Advisory Notice:'}
            </span>
            <p className="leading-relaxed">
              {crop.fertilizerInfo.disclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* Card 6: 📈 Interactive Visual Crop Growth Timeline */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-stone-900 text-base sm:text-lg flex items-center gap-2">
              <span>🌾</span>
              <span>{t.timelineTitle}</span>
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'kn'
                ? 'ಪ್ರತಿ ಬೆಳವಣಿಗೆಯ ಹಂತ ಮತ್ತು ರೈತರು ಅನುಸರಿಸಬೇಕಾದ ಜಾಗರೂಕತೆ'
                : 'Click each stage to see key farming actions and care tips'}
            </p>
          </div>
        </div>

        {/* Horizontal Timeline Steps Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {crop.timeline.map((stage) => {
            const isActive = activeTimelineStage === stage.stageNumber;
            const stageName =
              language === 'kn'
                ? stage.kannadaName
                : language === 'hi'
                ? stage.hindiName
                : stage.name;

            return (
              <button
                key={stage.stageNumber}
                onClick={() => setActiveTimelineStage(stage.stageNumber)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-md scale-102 ring-2 ring-emerald-500/30'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black ${
                    isActive ? 'bg-amber-400 text-emerald-950' : 'bg-stone-300 text-stone-700'
                  }`}
                >
                  {stage.stageNumber}
                </span>
                <span className="truncate max-w-[130px]">{stageName}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        {(() => {
          const currentStage =
            crop.timeline.find((s) => s.stageNumber === activeTimelineStage) ||
            crop.timeline[0];
          const stageName =
            language === 'kn'
              ? currentStage.kannadaName
              : language === 'hi'
              ? currentStage.hindiName
              : currentStage.name;

          return (
            <div className="mt-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                    {currentStage.stageNumber}
                  </span>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                    {stageName}
                  </h4>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-white text-emerald-800 rounded-full border border-emerald-200">
                  ⏱ {currentStage.durationDays}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-3">
                {currentStage.description}
              </p>

              <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-start gap-2 text-xs text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-900">
                    {language === 'kn' ? 'ರೈತರ ಎಚ್ಚರಿಕೆ & ಸಲಹೆ:' : 'Farmer Care Tip:'}{' '}
                  </span>
                  <span>{currentStage.careTips}</span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
