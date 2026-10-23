import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, RefreshCw, AlertCircle, TrendingUp, TrendingDown, Coins } from 'lucide-react';
import { Crop, Language } from '../types/farming';
import { TRANSLATIONS } from '../data/translations';
import { CROPS_DATA } from '../data/cropsData';

interface ProfitCalculatorProps {
  selectedCrop: Crop;
  language: Language;
}

export const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({
  selectedCrop,
  language,
}) => {
  const t = TRANSLATIONS[language].calculator;

  const [cropId, setCropId] = useState<string>(selectedCrop.id);
  const currentCrop = CROPS_DATA.find((c) => c.id === cropId) || selectedCrop;

  const [acres, setAcres] = useState<number>(1);
  const [seedCost, setSeedCost] = useState<number>(currentCrop.economics.typicalSeedCost);
  const [fertilizerCost, setFertilizerCost] = useState<number>(currentCrop.economics.typicalFertilizerCost);
  const [pesticideCost, setPesticideCost] = useState<number>(currentCrop.economics.typicalPesticideCost);
  const [labourCost, setLabourCost] = useState<number>(currentCrop.economics.typicalLabourCost);
  const [irrigationCost, setIrrigationCost] = useState<number>(currentCrop.economics.typicalIrrigationCost);
  const [otherCost, setOtherCost] = useState<number>(currentCrop.economics.typicalOtherCost);
  
  const avgYield = Math.round((currentCrop.economics.expectedYieldMinQtl + currentCrop.economics.expectedYieldMaxQtl) / 2);
  const [expectedYieldQtl, setExpectedYieldQtl] = useState<number>(avgYield);
  const [sellingPricePerQtl, setSellingPricePerQtl] = useState<number>(currentCrop.economics.typicalPricePerQtl);

  // When crop changes, update baseline values
  useEffect(() => {
    setSeedCost(currentCrop.economics.typicalSeedCost * acres);
    setFertilizerCost(currentCrop.economics.typicalFertilizerCost * acres);
    setPesticideCost(currentCrop.economics.typicalPesticideCost * acres);
    setLabourCost(currentCrop.economics.typicalLabourCost * acres);
    setIrrigationCost(currentCrop.economics.typicalIrrigationCost * acres);
    setOtherCost(currentCrop.economics.typicalOtherCost * acres);
    setExpectedYieldQtl(Math.round(((currentCrop.economics.expectedYieldMinQtl + currentCrop.economics.expectedYieldMaxQtl) / 2) * acres));
    setSellingPricePerQtl(currentCrop.economics.typicalPricePerQtl);
  }, [cropId]);

  const handleAcresChange = (newAcres: number) => {
    const val = Math.max(0.25, newAcres);
    const multiplier = val / (acres || 1);
    setAcres(val);
    setSeedCost(Math.round(seedCost * multiplier));
    setFertilizerCost(Math.round(fertilizerCost * multiplier));
    setPesticideCost(Math.round(pesticideCost * multiplier));
    setLabourCost(Math.round(labourCost * multiplier));
    setIrrigationCost(Math.round(irrigationCost * multiplier));
    setOtherCost(Math.round(otherCost * multiplier));
    setExpectedYieldQtl(Math.round(expectedYieldQtl * multiplier));
  };

  const handleResetToBaseline = () => {
    setSeedCost(currentCrop.economics.typicalSeedCost * acres);
    setFertilizerCost(currentCrop.economics.typicalFertilizerCost * acres);
    setPesticideCost(currentCrop.economics.typicalPesticideCost * acres);
    setLabourCost(currentCrop.economics.typicalLabourCost * acres);
    setIrrigationCost(currentCrop.economics.typicalIrrigationCost * acres);
    setOtherCost(currentCrop.economics.typicalOtherCost * acres);
    setExpectedYieldQtl(Math.round(((currentCrop.economics.expectedYieldMinQtl + currentCrop.economics.expectedYieldMaxQtl) / 2) * acres));
    setSellingPricePerQtl(currentCrop.economics.typicalPricePerQtl);
  };

  const totalCost = seedCost + fertilizerCost + pesticideCost + labourCost + irrigationCost + otherCost;
  const expectedRevenue = expectedYieldQtl * sellingPricePerQtl;
  const estimatedProfit = expectedRevenue - totalCost;
  const costPerQuintal = expectedYieldQtl > 0 ? Math.round(totalCost / expectedYieldQtl) : 0;

  const getCropName = (c: Crop) => {
    if (language === 'kn') return c.kannadaName;
    if (language === 'hi') return c.hindiName;
    return c.name;
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-5">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <Coins className="w-5 h-5 text-emerald-700" />
            <span>{t.title}</span>
          </h2>
          <p className="text-xs text-stone-500">{t.subtitle}</p>
        </div>

        <button
          onClick={handleResetToBaseline}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold self-start sm:self-auto transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Select Crop & Land Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
        <div>
          <label className="text-xs font-bold text-stone-600 block mb-1">
            {language === 'kn' ? 'ಬೆಳೆ ಆಯ್ಕೆ' : 'Crop'}
          </label>
          <select
            value={cropId}
            onChange={(e) => setCropId(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-sm font-bold text-stone-900 focus:ring-2 focus:ring-emerald-500"
          >
            {CROPS_DATA.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {getCropName(c)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-stone-600 block mb-1">
            {t.landArea}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0.25"
              step="0.25"
              value={acres}
              onChange={(e) => handleAcresChange(parseFloat(e.target.value) || 1)}
              className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-sm font-bold text-stone-900 focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-xs font-bold text-stone-600 bg-white px-3 py-2.5 rounded-xl border border-stone-300">
              {t.acres}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Breakdown Grid */}
      <div>
        <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
          1. {language === 'kn' ? 'ಬೇಸಾಯದ ವೆಚ್ಚಗಳು (Inputs & Expenses)' : 'Cultivation Expenses'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
          
          <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
            <label className="text-stone-600 block mb-1">{t.seedCost}</label>
            <input
              type="number"
              value={seedCost}
              onChange={(e) => setSeedCost(parseInt(e.target.value, 10) || 0)}
              className="w-full p-2 bg-white rounded-lg border border-stone-300 font-bold text-stone-900"
            />
          </div>

          <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
            <label className="text-stone-600 block mb-1">{t.fertilizerCost}</label>
            <input
              type="number"
              value={fertilizerCost}
              onChange={(e) => setFertilizerCost(parseInt(e.target.value, 10) || 0)}
              className="w-full p-2 bg-white rounded-lg border border-stone-300 font-bold text-stone-900"
            />
          </div>

          <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
            <label className="text-stone-600 block mb-1">{t.pesticideCost}</label>
            <input
              type="number"
              value={pesticideCost}
              onChange={(e) => setPesticideCost(parseInt(e.target.value, 10) || 0)}
              className="w-full p-2 bg-white rounded-lg border border-stone-300 font-bold text-stone-900"
            />
          </div>

          <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
            <label className="text-stone-600 block mb-1">{t.labourCost}</label>
            <input
              type="number"
              value={labourCost}
              onChange={(e) => setLabourCost(parseInt(e.target.value, 10) || 0)}
              className="w-full p-2 bg-white rounded-lg border border-stone-300 font-bold text-stone-900"
            />
          </div>

          <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
            <label className="text-stone-600 block mb-1">{t.irrigationCost}</label>
            <input
              type="number"
              value={irrigationCost}
              onChange={(e) => setIrrigationCost(parseInt(e.target.value, 10) || 0)}
              className="w-full p-2 bg-white rounded-lg border border-stone-300 font-bold text-stone-900"
            />
          </div>

          <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
            <label className="text-stone-600 block mb-1">{t.otherCost}</label>
            <input
              type="number"
              value={otherCost}
              onChange={(e) => setOtherCost(parseInt(e.target.value, 10) || 0)}
              className="w-full p-2 bg-white rounded-lg border border-stone-300 font-bold text-stone-900"
            />
          </div>

        </div>
      </div>

      {/* Yield & Selling Price Block */}
      <div>
        <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
          2. {language === 'kn' ? 'ನಿರೀಕ್ಷಿತ ಇಳುವರಿ ಮತ್ತು ಮಾರಾಟ ದರ' : 'Expected Yield & Selling Price'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
            <label className="text-stone-600 block mb-1 font-semibold">
              {t.expectedYield}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={expectedYieldQtl}
                onChange={(e) => setExpectedYieldQtl(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-white rounded-lg border border-stone-300 font-bold text-stone-900 text-sm"
              />
              <span className="font-bold text-stone-500 whitespace-nowrap">qtl</span>
            </div>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Benchmark: {currentCrop.economics.expectedYieldMinQtl * acres} - {currentCrop.economics.expectedYieldMaxQtl * acres} qtl for {acres} acre(s)
            </span>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
            <label className="text-stone-600 block mb-1 font-semibold">
              {t.sellingPrice}
            </label>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-700">₹</span>
              <input
                type="number"
                value={sellingPricePerQtl}
                onChange={(e) => setSellingPricePerQtl(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-white rounded-lg border border-stone-300 font-bold text-stone-900 text-sm"
              />
              <span className="font-bold text-stone-500 whitespace-nowrap">/ qtl</span>
            </div>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Mandi Benchmark: ~₹{currentCrop.economics.typicalPricePerQtl} / qtl
            </span>
          </div>
        </div>
      </div>

      {/* Results Summary Cards */}
      <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl shadow-lg space-y-4">
        <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
          📊 {language === 'kn' ? 'ಲೆಕ್ಕಾಚಾರದ ಫಲಿತಾಂಶ' : 'Profit & Loss Summary'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Total Cost */}
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-xs text-emerald-200 block">{t.totalCost}</span>
            <span className="text-xl sm:text-2xl font-black text-rose-300">
              ₹{totalCost.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-emerald-300/80 block mt-0.5">
              Break-even: ₹{costPerQuintal} / qtl
            </span>
          </div>

          {/* Expected Revenue */}
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-xs text-emerald-200 block">{t.expectedRevenue}</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-300">
              ₹{expectedRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-emerald-300/80 block mt-0.5">
              {expectedYieldQtl} qtl @ ₹{sellingPricePerQtl}/qtl
            </span>
          </div>

          {/* Estimated Net Profit / Loss */}
          <div
            className={`p-3 rounded-xl backdrop-blur-md border ${
              estimatedProfit >= 0
                ? 'bg-emerald-600/40 border-emerald-400'
                : 'bg-rose-600/40 border-rose-400'
            }`}
          >
            <span className="text-xs text-amber-200 block">{t.estimatedProfit}</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              {estimatedProfit >= 0 ? (
                <TrendingUp className="w-5 h-5 text-emerald-300 flex-shrink-0" />
              ) : (
                <TrendingDown className="w-5 h-5 text-rose-300 flex-shrink-0" />
              )}
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {estimatedProfit >= 0 ? '+' : '-'}₹{Math.abs(estimatedProfit).toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-white/80 block mt-0.5">
              {acres > 0 ? `(~₹${Math.round(estimatedProfit / acres).toLocaleString('en-IN')} / acre)` : ''}
            </span>
          </div>
        </div>

        {/* Clear Disclaimer as requested */}
        <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-xs text-emerald-100 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">{t.estimateNote}</span>
        </div>
      </div>

    </div>
  );
};
