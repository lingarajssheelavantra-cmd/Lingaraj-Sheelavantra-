import React from 'react';
import { X, Bell, TrendingUp, CloudRain, Bug, Calendar, Check, AlertTriangle } from 'lucide-react';
import { FarmingAlert, Language } from '../types/farming';

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  alerts: FarmingAlert[];
  onDismissAlert?: (id: string) => void;
}

export const AlertsModal: React.FC<AlertsModalProps> = ({
  isOpen,
  onClose,
  language,
  alerts,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: FarmingAlert['type']) => {
    switch (type) {
      case 'weather':
        return <CloudRain className="w-5 h-5 text-blue-600" />;
      case 'market':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'pest':
        return <Bug className="w-5 h-5 text-rose-600" />;
      case 'advisory':
      default:
        return <Calendar className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-100 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-700 rounded-lg">
              <Bell className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {language === 'kn' ? 'ರೈತರ ಎಚ್ಚರಿಕೆ ಮತ್ತು ಸೂಚನೆಗಳು' : 'Farmer Alerts & Notifications'}
              </h3>
              <p className="text-xs text-emerald-200">
                {language === 'kn' ? 'ಹವಾಮಾನ, ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಕೀಟ ಎಚ್ಚರಿಕೆ' : 'Weather, Mandi price movements & seasonal advisories'}
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

        {/* Alerts Feed */}
        <div className="p-4 overflow-y-auto space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center py-10 text-stone-400">
              <Check className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
              <p className="font-semibold text-sm">
                {language === 'kn' ? 'ಯಾವುದೇ ಹೊಸ ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ' : 'No new active alerts'}
              </p>
              <p className="text-xs text-stone-400 mt-0.5">
                All systems normal for your farm location.
              </p>
            </div>
          ) : (
            alerts.map((item) => {
              const title = language === 'kn' ? item.kannadaTitle : item.title;
              const msg = language === 'kn' ? item.kannadaMessage : item.message;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border text-xs leading-relaxed transition ${
                    item.severity === 'urgent'
                      ? 'bg-rose-50 border-rose-200 text-rose-950'
                      : item.severity === 'warning'
                      ? 'bg-amber-50 border-amber-200 text-amber-950'
                      : 'bg-stone-50 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center flex-shrink-0">
                        {getIcon(item.type)}
                      </div>
                      <span className="font-bold text-sm text-stone-900">{title}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 whitespace-nowrap">
                      {item.date}
                    </span>
                  </div>

                  <p className="mt-1 pl-9 text-stone-700">{msg}</p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-center text-xs text-stone-500">
          {language === 'kn'
            ? 'ಮಾಹಿತಿಯನ್ನು ನೈಜ ಸಮಯದಲ್ಲಿ ನವೀಕರಿಸಲಾಗುತ್ತದೆ'
            : 'Advisories calibrated with Agricultural Dept and APMC mandis'}
        </div>

      </div>
    </div>
  );
};
