import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
} from 'lucide-react';

export function getWeatherCondition(code: number) {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  if (code === 0) return { label: 'Clear sky', icon: Sun };
  if (code === 1 || code === 2 || code === 3) return { label: 'Mainly clear, partly cloudy, and overcast', icon: Cloud };
  if (code === 45 || code === 48) return { label: 'Fog and depositing rime fog', icon: CloudFog };
  if (code === 51 || code === 53 || code === 55) return { label: 'Drizzle: Light, moderate, and dense intensity', icon: CloudDrizzle };
  if (code === 56 || code === 57) return { label: 'Freezing Drizzle: Light and dense intensity', icon: CloudDrizzle };
  if (code === 61 || code === 63 || code === 65) return { label: 'Rain: Slight, moderate and heavy intensity', icon: CloudRain };
  if (code === 66 || code === 67) return { label: 'Freezing Rain: Light and heavy intensity', icon: CloudRain };
  if (code === 71 || code === 73 || code === 75) return { label: 'Snow fall: Slight, moderate, and heavy intensity', icon: CloudSnow };
  if (code === 77) return { label: 'Snow grains', icon: CloudSnow };
  if (code === 80 || code === 81 || code === 82) return { label: 'Rain showers: Slight, moderate, and violent', icon: CloudRain };
  if (code === 85 || code === 86) return { label: 'Snow showers slight and heavy', icon: CloudSnow };
  if (code === 95) return { label: 'Thunderstorm: Slight or moderate', icon: CloudLightning };
  if (code === 96 || code === 99) return { label: 'Thunderstorm with slight and heavy hail', icon: CloudLightning };
  return { label: 'Unknown', icon: Cloud };
}

export function getRecommendation(code: number, temp: number): string {
  if (code === 0) {
    if (temp > 30) return "Stay hydrated — high heat expected. Great day for the beach!";
    if (temp > 20) return "Great day for a walk outside! Wear sunscreen.";
    if (temp < 5) return "It's cold out! Bundle up if you're heading outside.";
    return "Beautiful clear weather today. Enjoy!";
  }
  
  if (code >= 1 && code <= 3) {
    if (temp > 25) return "Warm and cloudy, perfect for outdoor activities.";
    if (temp < 10) return "Chilly and cloudy. A light jacket is a good idea.";
    return "Pleasant weather with some clouds. Good for a walk.";
  }

  if (code >= 51 && code <= 67) {
    return "It's raining or drizzling. Carry an umbrella or wear a raincoat.";
  }

  if (code >= 80 && code <= 82) {
    return "Rain showers expected. Don't forget your umbrella!";
  }

  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return "Snow is expected. Wear warm winter clothes and drive safely.";
  }

  if (code >= 95 && code <= 99) {
    return "Thunderstorms expected. Better stay indoors if possible!";
  }

  if (code === 45 || code === 48) {
    return "Foggy conditions. Drive carefully if you are commuting.";
  }

  return "Weather is unpredictable today, be prepared!";
}
