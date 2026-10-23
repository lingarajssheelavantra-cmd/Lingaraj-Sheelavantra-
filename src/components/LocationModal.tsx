import React, { useState } from 'react';
import { X, MapPin, Check, Building2 } from 'lucide-react';
import { INDIAN_LOCATIONS, DistrictData } from '../data/karnatakaLocations';
import { LocationState, Language } from '../types/farming';
import { TRANSLATIONS } from '../data/translations';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: LocationState;
  onSelectLocation: (location: LocationState) => void;
  language: Language;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const [selectedStateName, setSelectedStateName] = useState<string>(currentLocation.state || 'Karnataka');
  const currentStateObj = INDIAN_LOCATIONS.find((s) => s.state === selectedStateName) || INDIAN_LOCATIONS[0];

  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData>(
    currentStateObj.districts.find((d) => d.district === currentLocation.district) || currentStateObj.districts[0]
  );

  const [selectedTaluk, setSelectedTaluk] = useState<string>(
    currentLocation.taluk || selectedDistrict.taluks[0] || ''
  );

  const [selectedMandi, setSelectedMandi] = useState<string>(
    currentLocation.mandi || selectedDistrict.mandis[0] || ''
  );

  if (!isOpen) return null;

  const handleStateChange = (stateName: string) => {
    setSelectedStateName(stateName);
    const stateObj = INDIAN_LOCATIONS.find((s) => s.state === stateName) || INDIAN_LOCATIONS[0];
    const firstDistrict = stateObj.districts[0];
    setSelectedDistrict(firstDistrict);
    setSelectedTaluk(firstDistrict.taluks[0] || '');
    setSelectedMandi(firstDistrict.mandis[0] || '');
  };

  const handleDistrictChange = (districtName: string) => {
    const dist = currentStateObj.districts.find((d) => d.district === districtName) || currentStateObj.districts[0];
    setSelectedDistrict(dist);
    setSelectedTaluk(dist.taluks[0] || '');
    setSelectedMandi(dist.mandis[0] || '');
  };

  const handleSave = () => {
    onSelectLocation({
      state: selectedStateName,
      district: selectedDistrict.district,
      taluk: selectedTaluk,
      mandi: selectedMandi,
      lat: selectedDistrict.lat,
      lon: selectedDistrict.lon,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-700 rounded-lg">
              <MapPin className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">{t.selectLocation}</h3>
              <p className="text-xs text-emerald-200">
                {language === 'kn' ? 'ನಿಖರ ಮಾರುಕಟ್ಟೆ ಹಾಗೂ ಹವಾಮಾನಕ್ಕಾಗಿ' : 'For localized market prices & weather advisories'}
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

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-stone-800">
          
          {/* State Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
              1. {language === 'kn' ? 'ರಾಜ್ಯ' : 'State'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {INDIAN_LOCATIONS.map((st) => (
                <button
                  key={st.state}
                  type="button"
                  onClick={() => handleStateChange(st.state)}
                  className={`py-2 px-3 rounded-xl border text-sm font-semibold transition text-left flex items-center justify-between ${
                    selectedStateName === st.state
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                      : 'border-stone-200 hover:border-emerald-300 text-stone-700 bg-stone-50/50'
                  }`}
                >
                  <span>{st.state}</span>
                  {selectedStateName === st.state && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* District Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
              2. {language === 'kn' ? 'ಜಿಲ್ಲೆ (District)' : 'District'}
            </label>
            <select
              value={selectedDistrict.district}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-300 bg-white text-base font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm"
            >
              {currentStateObj.districts.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district} {language === 'kn' ? `(${d.kannadaDistrict})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Taluk Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
              3. {language === 'kn' ? 'ತಾಲೂಕು (Taluk)' : 'Taluk'}
            </label>
            <select
              value={selectedTaluk}
              onChange={(e) => setSelectedTaluk(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-300 bg-white text-base font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm"
            >
              {selectedDistrict.taluks.map((taluk) => (
                <option key={taluk} value={taluk}>
                  {taluk}
                </option>
              ))}
            </select>
          </div>

          {/* Mandi Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-700" />
              4. {language === 'kn' ? 'ಹತ್ತಿರದ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ (APMC Mandi)' : 'Nearest APMC Mandi / Market'}
            </label>
            <select
              value={selectedMandi}
              onChange={(e) => setSelectedMandi(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-300 bg-white text-base font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm"
            >
              {selectedDistrict.mandis.map((mandi) => (
                <option key={mandi} value={mandi}>
                  {mandi}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-stone-600 font-semibold hover:bg-stone-200 transition text-sm"
          >
            {language === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold transition text-sm shadow-md"
          >
            {language === 'kn' ? 'ಸ್ಥಳ ಖಚಿತಪಡಿಸಿ' : 'Confirm Location'}
          </button>
        </div>

      </div>
    </div>
  );
};
