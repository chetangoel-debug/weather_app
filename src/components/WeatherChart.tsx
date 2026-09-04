import { WeatherResponse } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface WeatherChartProps {
  weather: WeatherResponse;
}

export function WeatherChart({ weather }: WeatherChartProps) {
  const daily = weather.daily;
  const days = daily.time.slice(0, 5);
  
  const data = days.map((dateStr, index) => {
    const date = new Date(dateStr);
    const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
    return {
      day: dayName,
      max: Math.round(daily.temperature_2m_max[index]),
      min: Math.round(daily.temperature_2m_min[index]),
    };
  });

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Temperature Trend</h3>
        <div className="flex gap-4 text-xs font-medium text-slate-300">
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-400"></span> High</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-500"></span> Low</span>
        </div>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff" strokeOpacity={0.1} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', color: '#f1f5f9' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Area 
              type="monotone" 
              dataKey="max" 
              name="High (°C)"
              stroke="#38bdf8" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorMax)" 
            />
            <Area 
              type="monotone" 
              dataKey="min" 
              name="Low (°C)"
              stroke="#64748b" 
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="none" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
