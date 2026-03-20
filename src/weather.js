// Open-Meteo free weather API — no key needed
// Kerry center coordinates (Killarney area)
const KERRY_LAT = 52.0599;
const KERRY_LON = -9.5061;

// WMO Weather interpretation codes → emoji + label
const WMO_CODES = {
  0: { emoji: '☀️', label: 'Clear sky' },
  1: { emoji: '🌤️', label: 'Mainly clear' },
  2: { emoji: '⛅', label: 'Partly cloudy' },
  3: { emoji: '☁️', label: 'Overcast' },
  45: { emoji: '🌫️', label: 'Fog' },
  48: { emoji: '🌫️', label: 'Rime fog' },
  51: { emoji: '🌦️', label: 'Light drizzle' },
  53: { emoji: '🌦️', label: 'Moderate drizzle' },
  55: { emoji: '🌧️', label: 'Dense drizzle' },
  56: { emoji: '🌧️', label: 'Freezing drizzle' },
  57: { emoji: '🌧️', label: 'Heavy freezing drizzle' },
  61: { emoji: '🌧️', label: 'Slight rain' },
  63: { emoji: '🌧️', label: 'Moderate rain' },
  65: { emoji: '🌧️', label: 'Heavy rain' },
  66: { emoji: '🌧️', label: 'Freezing rain' },
  67: { emoji: '🌧️', label: 'Heavy freezing rain' },
  71: { emoji: '🌨️', label: 'Slight snow' },
  73: { emoji: '🌨️', label: 'Moderate snow' },
  75: { emoji: '🌨️', label: 'Heavy snow' },
  77: { emoji: '🌨️', label: 'Snow grains' },
  80: { emoji: '🌦️', label: 'Slight showers' },
  81: { emoji: '🌧️', label: 'Moderate showers' },
  82: { emoji: '⛈️', label: 'Violent showers' },
  85: { emoji: '🌨️', label: 'Slight snow showers' },
  86: { emoji: '🌨️', label: 'Heavy snow showers' },
  95: { emoji: '⛈️', label: 'Thunderstorm' },
  96: { emoji: '⛈️', label: 'Thunderstorm + hail' },
  99: { emoji: '⛈️', label: 'Thunderstorm + heavy hail' },
};

export const getWeatherInfo = (code) => {
  return WMO_CODES[code] || { emoji: '❓', label: 'Unknown' };
};

let weatherCache = null;

export const fetchWeatherForecast = async () => {
  if (weatherCache) return weatherCache;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${KERRY_LAT}&longitude=${KERRY_LON}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=Europe/Dublin&forecast_days=16`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather API error');
    const data = await res.json();

    // Transform into a lookup map: { "2026-03-20": { ... }, ... }
    const result = {};
    const days = data.daily.time;
    for (let i = 0; i < days.length; i++) {
      result[days[i]] = {
        weatherCode: data.daily.weather_code[i],
        tempMax: data.daily.temperature_2m_max[i],
        tempMin: data.daily.temperature_2m_min[i],
        precipitation: data.daily.precipitation_sum[i],
        windMax: data.daily.wind_speed_10m_max[i],
      };
    }

    weatherCache = result;
    return result;
  } catch (err) {
    console.warn('Could not fetch weather:', err);
    return {};
  }
};
