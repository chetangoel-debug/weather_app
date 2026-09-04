import { WeatherResponse } from '../types';
import { getWeatherCondition } from '../utils';

interface ForecastProps {
  weather: WeatherResponse;
}

export function Forecast({ weather }: ForecastProps) {
  const daily = weather.daily;
  // Use up to 5 days, skip the first day if you only want future, but let's just take the first 5
  const days = daily.time.slice(0, 5);

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {days.map((dateStr, index) => {
          const code = daily.weather_code[index];
          const maxTemp = Math.round(daily.temperature_2m_max[index]);
          const minTemp = Math.round(daily.temperature_2m_min[index]);
          const condition = getWeatherCondition(code);
          const Icon = condition.icon;
          
          const date = new Date(dateStr);
          const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
          const isToday = index === 0;

          return (
            <div key={dateStr} className={`rounded-2xl p-4 text-center transition-all ${
              isToday 
                ? 'bg-white/10 backdrop-blur-md border border-sky-500/30 ring-1 ring-sky-500/20 shadow-lg shadow-sky-900/20' 
                : 'bg-white/5 backdrop-blur-sm border border-white/5'
            }`}>
              <p className={`text-xs font-semibold mb-2 uppercase ${isToday ? 'text-sky-400' : 'text-slate-400'}`}>{dayName}</p>
              <div className={`w-10 h-10 mx-auto my-2 ${isToday ? 'text-sky-300' : 'text-slate-300'}`}>
                <Icon className="w-full h-full" strokeWidth={1.5} />
              </div>
              <p className="text-lg font-bold text-slate-100">{maxTemp}°</p>
              <p className="text-[10px] text-slate-500 truncate" title={condition.label}>{condition.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
