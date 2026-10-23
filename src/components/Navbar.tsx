import React from 'react';
import { MapPin, Globe, Bell, Sprout } from 'lucide-react';
import { Language, LocationState } from '../types/farming';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  location: LocationState;
  onOpenLocationModal: () => void;
  onOpenAlertsModal: () => void;
  unreadAlertsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  location,
  onOpenLocationModal,
  onOpenAlertsModal,
  unreadAlertsCount,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <header className="sticky top-0 z-40 bg-emerald-800 text-white shadow-md border-b border-emerald-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo & App Name */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-inner flex-shrink-0 text-2xl border border-emerald-400/40">
              🌾
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold leading-tight truncate tracking-tight">
                {t.appName}
              </h1>
              <p className="text-xs text-emerald-200 hidden sm:block truncate">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Right Action Controls: Location, Language, Notifications */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Location Button */}
            <button
              onClick={onOpenLocationModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 active:scale-95 transition text-xs sm:text-sm font-medium border border-emerald-600/60 max-w-[140px] sm:max-w-[200px]"
              title={t.changeLocation}
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
              <span className="truncate">{location.district || location.state}</span>
            </button>

            {/* Language Selector Dropdown / Pills */}
            <div className="relative flex items-center bg-emerald-900/80 rounded-lg p-0.5 border border-emerald-700/60">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-xs rounded-md font-semibold transition ${
                  currentLanguage === 'en'
                    ? 'bg-amber-400 text-emerald-950 shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('kn')}
                className={`px-2 py-1 text-xs rounded-md font-semibold transition ${
                  currentLanguage === 'kn'
                    ? 'bg-amber-400 text-emerald-950 shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                ಕನ್ನಡ
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-1 text-xs rounded-md font-semibold transition ${
                  currentLanguage === 'hi'
                    ? 'bg-amber-400 text-emerald-950 shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Alerts Notification Bell */}
            <button
              onClick={onOpenAlertsModal}
              className="relative p-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition active:scale-95 flex items-center justify-center border border-emerald-600"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-emerald-100" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 text-emerald-950 text-[10px] font-black rounded-full flex items-center justify-center border-2 border-emerald-800">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
