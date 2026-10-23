import React from 'react';
import { Home, Sprout, TrendingUp, Bug, MessageSquare, Calculator } from 'lucide-react';
import { Language } from '../types/farming';
import { TRANSLATIONS } from '../data/translations';

export type TabType = 'home' | 'crops' | 'market' | 'pests' | 'askAi' | 'calculator' | 'compare';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  language,
}) => {
  const t = TRANSLATIONS[language].bottomNav;

  const navItems = [
    { id: 'home' as TabType, label: t.home, icon: Home },
    { id: 'crops' as TabType, label: t.crops, icon: Sprout },
    { id: 'market' as TabType, label: t.market, icon: TrendingUp },
    { id: 'pests' as TabType, label: t.pests, icon: Bug },
    { id: 'askAi' as TabType, label: t.askAi, icon: MessageSquare },
    { id: 'calculator' as TabType, label: t.calculator, icon: Calculator },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-safe">
      <div className="max-w-xl mx-auto px-1 flex items-center justify-around py-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-150 min-h-[52px] ${
                isActive
                  ? 'text-emerald-800 font-bold scale-105'
                  : 'text-stone-500 hover:text-emerald-700 font-medium'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-transparent text-stone-500'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[11px] leading-tight mt-0.5 truncate max-w-[62px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
