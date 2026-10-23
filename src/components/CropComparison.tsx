import React, { useState } from 'react';
import { CROPS_DATA } from '../data/cropsData';
import { Crop, Language } from '../types/farming';
import { TRANSLATIONS } from '../data/translations';
import { ArrowLeftRight, Check, Droplets, Clock, Layers, Calendar, Bug, TrendingUp } from 'lucide-react';

interface CropComparisonProps {
  initialCropId: string;
  language: Language;
}

export const CropComparison: React.FC<CropComparisonProps> = ({
  initialCropId,
  language,
}) => {
  const t = TRANSLATIONS[language].comparison;

  const [crop1Id, setCrop1Id] = useState<string>(initialCropId || 'ragi');
  const [crop2Id, setCrop2Id] = useState<string>(
    initialCropId === 'maize' ? 'ragi' : 'maize'
  );

  const crop1 = CROPS_DATA.find((c) => c.id === crop1Id) || CROPS_DATA[0];
  const crop2 = CROPS_DATA.find((c) => c.id === crop2Id) || CROPS_DATA[1];

  const getCropName = (c: Crop) => {
    if (language === 'kn') return c.kannadaName;
    if (language === 'hi') return c.hindiName;
    return c.name;
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-emerald-700" />
          <span>{t.title}</span>
        </h2>
        <p className="text-xs text-stone-500">
          {language === 'kn'
            ? 'ಎರಡು ಬೆಳೆಗಳ ನಡುವೆ ಅವಧಿ, ನೀರಿನ ಅಗತ್ಯತೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ದರವನ್ನು ಹೋಲಿಸಿ'
            : 'Compare growing period, water demand, soil, and economics side-by-side'}
        </p>
      </div>

      {/* Selectors for 2 crops */}
      <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
        <div>
          <label className="text-[11px] font-bold text-stone-500 block mb-1">
            {t.selectCrop1}
          </label>
          <select
            value={crop1Id}
            onChange={(e) => setCrop1Id(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-bold text-stone-900 focus:ring-2 focus:ring-emerald-500"
          >
            {CROPS_DATA.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {getCropName(c)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-bold text-stone-500 block mb-1">
            {t.selectCrop2}
          </label>
          <select
            value={crop2Id}
            onChange={(e) => setCrop2Id(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-bold text-stone-900 focus:ring-2 focus:ring-emerald-500"
          >
            {CROPS_DATA.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {getCropName(c)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 text-stone-600 bg-stone-50">
              <th className="p-3 font-bold w-1/3 text-stone-500">Feature</th>
              <th className="p-3 font-bold text-emerald-900 w-1/3">
                <span className="text-base mr-1">{crop1.icon}</span> {getCropName(crop1)}
              </th>
              <th className="p-3 font-bold text-emerald-900 w-1/3">
                <span className="text-base mr-1">{crop2.icon}</span> {getCropName(crop2)}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-stone-800">
            {/* Growing Period */}
            <tr>
              <td className="p-3 font-semibold text-stone-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.growingPeriod}</span>
              </td>
              <td className="p-3 font-bold text-emerald-900">
                {crop1.growingPeriodDays.min} - {crop1.growingPeriodDays.max} days
              </td>
              <td className="p-3 font-bold text-emerald-900">
                {crop2.growingPeriodDays.min} - {crop2.growingPeriodDays.max} days
              </td>
            </tr>

            {/* Water Requirement */}
            <tr>
              <td className="p-3 font-semibold text-stone-600 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.waterRequirement}</span>
              </td>
              <td className="p-3">
                <span
                  className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                    crop1.waterRequirement.level === 'Low'
                      ? 'bg-emerald-100 text-emerald-800'
                      : crop1.waterRequirement.level === 'Medium'
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {crop1.waterRequirement.level} Water
                </span>
                <span className="block text-[11px] text-stone-500 mt-1">
                  {crop1.waterRequirement.generalFrequency}
                </span>
              </td>
              <td className="p-3">
                <span
                  className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                    crop2.waterRequirement.level === 'Low'
                      ? 'bg-emerald-100 text-emerald-800'
                      : crop2.waterRequirement.level === 'Medium'
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {crop2.waterRequirement.level} Water
                </span>
                <span className="block text-[11px] text-stone-500 mt-1">
                  {crop2.waterRequirement.generalFrequency}
                </span>
              </td>
            </tr>

            {/* Suitable Soil */}
            <tr>
              <td className="p-3 font-semibold text-stone-600 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.suitableSoil}</span>
              </td>
              <td className="p-3 text-stone-700">
                <div>{crop1.suitableSoil.type}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">
                  pH: {crop1.suitableSoil.phRange}
                </div>
              </td>
              <td className="p-3 text-stone-700">
                <div>{crop2.suitableSoil.type}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">
                  pH: {crop2.suitableSoil.phRange}
                </div>
              </td>
            </tr>

            {/* Sowing Season */}
            <tr>
              <td className="p-3 font-semibold text-stone-600 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-orange-600" />
                <span>{t.sowingSeason}</span>
              </td>
              <td className="p-3 text-stone-700">
                <div className="font-semibold">{crop1.sowingInfo.bestMonths}</div>
                <div className="text-[11px] text-stone-500">
                  Rate: {crop1.sowingInfo.seedRatePerAcre}
                </div>
              </td>
              <td className="p-3 text-stone-700">
                <div className="font-semibold">{crop2.sowingInfo.bestMonths}</div>
                <div className="text-[11px] text-stone-500">
                  Rate: {crop2.sowingInfo.seedRatePerAcre}
                </div>
              </td>
            </tr>

            {/* Typical Market Price */}
            <tr>
              <td className="p-3 font-semibold text-stone-600 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.marketPrice}</span>
              </td>
              <td className="p-3 font-bold text-emerald-950">
                ₹{crop1.economics.typicalPricePerQtl.toLocaleString('en-IN')} / qtl
              </td>
              <td className="p-3 font-bold text-emerald-950">
                ₹{crop2.economics.typicalPricePerQtl.toLocaleString('en-IN')} / qtl
              </td>
            </tr>

            {/* Major Pests */}
            <tr>
              <td className="p-3 font-semibold text-stone-600 flex items-center gap-1.5">
                <Bug className="w-3.5 h-3.5 text-rose-600" />
                <span>{t.majorPests}</span>
              </td>
              <td className="p-3 text-stone-700">
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  {crop1.pestsAndDiseases.slice(0, 2).map((p, i) => (
                    <li key={i}>{language === 'kn' ? p.kannadaName : p.name}</li>
                  ))}
                </ul>
              </td>
              <td className="p-3 text-stone-700">
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  {crop2.pestsAndDiseases.slice(0, 2).map((p, i) => (
                    <li key={i}>{language === 'kn' ? p.kannadaName : p.name}</li>
                  ))}
                </ul>
              </td>
            </tr>

            {/* Typical Yield / Acre */}
            <tr>
              <td className="p-3 font-semibold text-stone-600">Expected Yield / Acre</td>
              <td className="p-3 font-bold text-stone-800">
                {crop1.economics.expectedYieldMinQtl} - {crop1.economics.expectedYieldMaxQtl} qtl
              </td>
              <td className="p-3 font-bold text-stone-800">
                {crop2.economics.expectedYieldMinQtl} - {crop2.economics.expectedYieldMaxQtl} qtl
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Advisory Insight */}
      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
        💡 <strong>Farmer Tip:</strong>{' '}
        {crop1.waterRequirement.level === 'Low' && crop2.waterRequirement.level === 'High' ? (
          <span>
            If water or borewell supply is limited, <strong>{getCropName(crop1)}</strong> is much safer than {getCropName(crop2)}.
          </span>
        ) : (
          <span>
            Choose crop varieties according to your monsoon onset date and soil drainage capacity.
          </span>
        )}
      </div>
    </div>
  );
};
