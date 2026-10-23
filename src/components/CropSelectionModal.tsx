import React, { useState } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { CROPS_DATA } from '../data/cropsData';
import { Crop, Language } from '../types/farming';
import { TRANSLATIONS } from '../data/translations';

interface CropSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCropId: string;
  onSelectCrop: (crop: Crop) => void;
  language: Language;
}

export const CropSelectionModal: React.FC<CropSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedCropId,
  onSelectCrop,
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = [
    'All',
    'Cereals & Millets',
    'Vegetables',
    'Cash Crops',
    'Spices',
    'Fruits',
    'Pulses & Oilseeds',
  ];

  const filteredCrops = CROPS_DATA.filter((crop) => {
    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      crop.name.toLowerCase().includes(q) ||
      crop.kannadaName.toLowerCase().includes(q) ||
      crop.hindiName.toLowerCase().includes(q) ||
      crop.scientificName.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const getCropDisplayName = (crop: Crop) => {
    if (language === 'kn') return crop.kannadaName;
    if (language === 'hi') return crop.hindiName;
    return crop.name;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-emerald-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <div>
              <h3 className="font-bold text-lg">
                {language === 'kn' ? 'ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ' : language === 'hi' ? 'अपनी फसल चुनें' : 'Select Your Crop'}
              </h3>
              <p className="text-xs text-emerald-200">
                {language === 'kn' ? 'ಸಂಪೂರ್ಣ ಮಾಹಿತಿ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ದರಕ್ಕಾಗಿ' : 'For complete crop guide, timeline & market rates'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-700 text-emerald-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input & Category Pills */}
        <div className="p-3 sm:p-4 border-b border-stone-100 bg-stone-50 space-y-2.5">
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                language === 'kn'
                  ? 'ಬೆಳೆ ಹೆಸರು ಹುಡುಕಿ (ಉದಾ: ರಾಗಿ, ಟೊಮೆಟೊ, ಭತ್ತ...)'
                  : language === 'hi'
                  ? 'फसल खोजें (जैसे: धान, मक्का, टमाटर...)'
                  : 'Search crop (e.g. Rice, Tomato, Ragi, Cotton...)'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-300 bg-white text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cat === 'All' ? (language === 'kn' ? 'ಎಲ್ಲಾ ಬೆಳೆಗಳು' : 'All Crops') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Crops Grid */}
        <div className="p-4 overflow-y-auto flex-1">
          {filteredCrops.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <p className="text-lg font-semibold">
                {language === 'kn' ? 'ಯಾವುದೇ ಬೆಳೆ ಕಂಡುಬಂದಿಲ್ಲ' : 'No crops found'}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                {language === 'kn' ? 'ಬೇರೆ ಕಾಗುಣಿತದಲ್ಲಿ ಹುಡುಕಿ ನೋಡಿ' : 'Try searching with another name or select from All Crops'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {filteredCrops.map((crop) => {
                const isSelected = crop.id === selectedCropId;
                return (
                  <button
                    key={crop.id}
                    onClick={() => {
                      onSelectCrop(crop);
                      onClose();
                    }}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all duration-150 active:scale-95 group relative ${
                      isSelected
                        ? 'border-2 border-emerald-600 bg-emerald-50 shadow-md ring-2 ring-emerald-600/20'
                        : 'border-stone-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/40 shadow-sm'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform">
                      {crop.icon}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-stone-900 leading-tight">
                      {getCropDisplayName(crop)}
                    </span>
                    <span className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                      {crop.growingPeriodDays.min}-{crop.growingPeriodDays.max} days
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full mt-1.5 font-medium">
                      {crop.category}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-center text-xs text-stone-500">
          {language === 'kn'
            ? 'ಹೆಚ್ಚಿನ ಬೆಳೆಗಳಿಗೆ AI ಸಹಾಯಕದಲ್ಲಿ ಪ್ರಶ್ನಿಸಿ'
            : 'Looking for other crops? You can also ask our AI Farmer Assistant anytime!'}
        </div>

      </div>
    </div>
  );
};
