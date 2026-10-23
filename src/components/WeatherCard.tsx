import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  CloudRain,
  Droplets,
  Wind,
  Thermometer,
  AlertTriangle,
  RefreshCw,
  SunMedium,
  CheckCircle,
} from 'lucide-react';
import { LocationState, Language, WeatherData } from '../types/farming';
import { TRANSLATIONS } from '../data/translations';

interface WeatherCardProps {
  location: LocationState;
  language: Language;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ location, language }) => {
  const t = TRANSLATIONS[language].weatherSection;

  const [weather, setWeather] = useState<WeatherData>({
    temp: 28,
    tempMin: 21,
    tempMax: 32,
    humidity: 64,
    windSpeed: 11,
    rainProbability: 25,
    precipitationMm: 0,
    condition: 'Partly Cloudy',
    conditionCode: 2,
    alerts: [],
    lastUpdated: '10:00 AM',
    isLive: false,
    source: 'Regional Agro-meteorological Grid',
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/weather?lat=${location.lat}&lon=${location.lon}`);
      if (!res.ok) throw new Error('Failed to fetch weather');
      const data = await res.json();

      if (data.isLive && data.data) {
        const cur = data.data.current;
        const daily = data.data.daily;

        const alerts: string[] = [];
        const rainProb = daily?.precipitation_probability_max?.[0] || 0;
        const wind = cur?.wind_speed_10m || 0;
        const temp = Math.round(cur?.temperature_2m || 28);
        const humidity = cur?.relative_humidity_2m || 60;

        if (rainProb >= 45 || cur?.precipitation > 0) {
          alerts.push(
            language === 'kn'
              ? 'ಮಳೆ ಸಂಭವನೀಯತೆ ಇದೆ — ಹೆಚ್ಚುವರಿ ನೀರಾವರಿ ಹಾಗೂ ಗೊಬ್ಬರ ಕೊಡುವುದನ್ನು ಮುಂದೂಡಿ.'
              : 'Rain expected — consider delaying irrigation to avoid waterlogging and fertilizer leaching.'
          );
        }

        if (wind > 14) {
          alerts.push(
            language === 'kn'
              ? 'ಬಲವಾದ ಗಾಳಿ ಬೀಸುತ್ತಿದೆ (>14 km/h) — ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ಮಾಡಬೇಡಿ (ಮದ್ದು ಕೊಚ್ಚಿ ಹೋಗುತ್ತದೆ).'
              : 'Strong wind expected — avoid foliar spraying during unsuitable drift conditions.'
          );
        }

        if (temp > 33) {
          alerts.push(
            language === 'kn'
              ? 'ಹೆಚ್ಚಿನ ತಾಪಮಾನ — ಬೆಳೆಗಳಿಗೆ ತೇವಾಂಶದ ಕೊರತೆಯಾಗದಂತೆ ಮುಂಜಾನೆ ಅಥವಾ ಸಂಜೆ ನೀರು ಕೊಡಿ.'
              : 'High temperature — monitor soil moisture and schedule early morning/evening irrigation.'
          );
        }

        if (humidity > 80 && temp > 24) {
          alerts.push(
            language === 'kn'
              ? 'ಹೆಚ್ಚು ಆರ್ದ್ರತೆ — ಶಿಲೀಂಧ್ರ ಮತ್ತು ಎಲೆ ಮಚ್ಚೆ ರೋಗಗಳ ಬಗ್ಗೆ ನಿಗಾ ವಹಿಸಿ.'
              : 'High humidity (>80%) — watch for early signs of fungal leaf spots or blights.'
          );
        }

        setWeather({
          temp,
          tempMin: Math.round(daily?.temperature_2m_min?.[0] || 21),
          tempMax: Math.round(daily?.temperature_2m_max?.[0] || 32),
          humidity,
          windSpeed: Math.round(wind),
          rainProbability: rainProb,
          precipitationMm: cur?.precipitation || 0,
          condition: cur?.precipitation > 0 ? 'Light Rain' : rainProb > 40 ? 'Overcast / Chance of Rain' : 'Partly Sunny',
          conditionCode: cur?.weather_code || 2,
          alerts: alerts.length > 0 ? alerts : [
            language === 'kn'
              ? 'ಹವಾಮಾನವು ಕೃಷಿ ಚಟುವಟಿಕೆಗಳಿಗೆ (ಕಳೆ ಕೀಳುವುದು, ಕಟಾವು) ಅನುಕೂಲಕರವಾಗಿದೆ.'
              : 'Favorable weather for routine field operations (weeding, inter-cultivation).',
          ],
          lastUpdated: data.lastUpdated,
          isLive: true,
          source: data.source,
        });
      }
    } catch (e) {
      console.warn('Weather fetch fallback:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [location.lat, location.lon, language]);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-3.5">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <SunMedium className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-base leading-tight">
              {t.title}
            </h3>
            <p className="text-xs text-stone-500">
              {location.district}, {location.state}
            </p>
          </div>
        </div>

        <button
          onClick={fetchWeather}
          disabled={isLoading}
          className="p-2 rounded-xl text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition"
          title="Refresh Weather"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
        </button>
      </div>

      {/* Main Temperature & Conditions Display */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 rounded-2xl border border-emerald-100/80 flex items-center justify-between">
        <div>
          <div className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            {weather.temp}°C
          </div>
          <div className="text-xs font-semibold text-emerald-900 mt-0.5">
            {weather.condition}
          </div>
          <div className="text-[11px] text-stone-500">
            Min {weather.tempMin}°C • Max {weather.tempMax}°C
          </div>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl border border-stone-200/60">
          {weather.rainProbability > 40 ? '🌧️' : '⛅'}
        </div>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
          <div className="flex items-center justify-center text-blue-600 mb-1">
            <CloudRain className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-stone-500 block">{t.rainProb}</span>
          <span className="font-bold text-stone-900 text-sm">{weather.rainProbability}%</span>
        </div>

        <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
          <div className="flex items-center justify-center text-teal-600 mb-1">
            <Droplets className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-stone-500 block">{t.humidity}</span>
          <span className="font-bold text-stone-900 text-sm">{weather.humidity}%</span>
        </div>

        <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
          <div className="flex items-center justify-center text-amber-600 mb-1">
            <Wind className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-stone-500 block">{t.wind}</span>
          <span className="font-bold text-stone-900 text-sm">{weather.windSpeed} km/h</span>
        </div>
      </div>

      {/* Farming Alerts based on weather */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
          🚜 {t.alertsTitle}:
        </span>
        {weather.alerts.map((alert, i) => (
          <div
            key={i}
            className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2"
          >
            <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <span className="font-medium leading-relaxed">{alert}</span>
          </div>
        ))}
      </div>

      {/* Data Source Notice */}
      <div className="text-[10px] text-stone-400 flex items-center justify-between pt-1 border-t border-stone-100">
        <span>
          {t.source}: {weather.source}
        </span>
        <span>Updated: {weather.lastUpdated}</span>
      </div>

    </div>
  );
};
