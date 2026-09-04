import { WeatherResponse } from '../types';
import { getWeatherCondition, getRecommendation } from '../utils';
import { Wind, Droplets } from 'lucide-react';

interface CurrentWeatherProps {
  weather: WeatherResponse;
  locationName: string;
}

export function CurrentWeather({ weather, locationName }: CurrentWeatherProps) {
  const current = weather.current;
  const condition = getWeatherCondition(current.weather_code);
  const Icon = condition.icon;
  const recommendation = getRecommendation(current.weather_code, current.temperature_2m);

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 sm:p-8 w-full max-w-3xl mx-auto shadow-2xl shadow-black/20">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
        
        <div className="text-center md:text-left">
          <p className="text-lg font-medium text-sky-300">{locationName}</p>
          <p className="text-sm text-slate-400 mb-6">Current Weather</p>
          
          <div className="flex items-center justify-center md:justify-start gap-4">
            <span className="text-8xl font-thin tracking-tighter">
              {Math.round(current.temperature_2m)}°
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xl font-semibold">{condition.label}</span>
              <Icon className="w-8 h-8 text-sky-400 mt-2" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 min-w-[200px] w-full md:w-auto mt-4 md:mt-0">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm border-t border-white/5 pt-4">
              <span className="text-slate-400 flex items-center gap-2">
                <Wind className="w-4 h-4" /> Wind Speed
              </span>
              <span className="font-medium text-slate-100">{current.wind_speed_10m} {weather.current_units.wind_speed_10m}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm border-t border-white/5 pt-4">
              <span className="text-slate-400 flex items-center gap-2">
                <Droplets className="w-4 h-4" /> Humidity
              </span>
              <span className="font-medium text-slate-100">{current.relative_humidity_2m}{weather.current_units.relative_humidity_2m}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6">
        <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-emerald-400">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-tight mb-1">Recommendation</h3>
              <p className="text-sm leading-relaxed text-slate-200">{recommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
