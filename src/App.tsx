import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { WeatherChart } from './components/WeatherChart';
import { GeocodingResponse, WeatherResponse } from './types';
import { Cloud, Loader2 } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [locationName, setLocationName] = useState<string>('');

  const searchCity = async (city: string) => {
    setIsLoading(true);
    setError(null);
    setWeather(null);
    
    try {
      // 1. Geocoding API Call
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      if (!geoRes.ok) throw new Error('Failed to fetch location data');
      
      const geoData: GeocodingResponse = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found. Please try a different name.');
      }
      
      const location = geoData.results[0];
      setLocationName(`${location.name}${location.admin1 ? `, ${location.admin1}` : ''}, ${location.country}`);
      
      // 2. Weather API Call
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      if (!weatherRes.ok) throw new Error('Failed to fetch weather data');
      
      const weatherData: WeatherResponse = await weatherRes.json();
      setWeather(weatherData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-100 pb-12 relative overflow-x-hidden bg-gradient-to-br from-[#1e293b] to-[#0f172a]">
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none"></div>

      <header className="relative z-10 py-6 px-4 mb-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl text-sky-400">
              <Cloud className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              Weather<span className="text-sky-400">Intelligence</span>
            </h1>
          </div>
          <div className="w-full md:flex-1 md:max-w-md md:mx-8">
            <SearchBar onSearch={searchCity} isLoading={isLoading} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 relative z-10">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-sky-400">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="text-slate-400 font-medium text-sm uppercase tracking-widest">Fetching latest weather data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 text-red-400 p-6 rounded-2xl border border-red-500/20 flex flex-col items-center justify-center max-w-3xl mx-auto py-12 gap-3 backdrop-blur-md">
            <div className="text-4xl opacity-80">🌤️</div>
            <p className="font-medium text-lg text-slate-200">{error}</p>
            <p className="text-red-400/80 text-sm">Please check the spelling and try again.</p>
          </div>
        )}

        {!isLoading && !error && !weather && (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500">
            <Cloud className="w-24 h-24 mb-6 opacity-20" />
            <p className="text-sm font-medium uppercase tracking-widest">Search for a city to see the weather</p>
          </div>
        )}

        {weather && !isLoading && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CurrentWeather weather={weather} locationName={locationName} />
            <Forecast weather={weather} />
            <WeatherChart weather={weather} />
          </div>
        )}
      </main>
    </div>
  );
}
