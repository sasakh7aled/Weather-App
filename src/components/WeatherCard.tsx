import { Clock3, MapPin, Trash2, Wind } from 'lucide-react';
import { DEFAULT_TEMPERATURE_UNIT, DEFAULT_WIND_UNIT } from '../constants/weather';
import { useWeatherContext } from '../hooks/useWeatherContext';
import { useWeatherData } from '../hooks/useWeatherData';
import type { CityData } from '../types/city';
import { weatherCodeToDescription } from '../utils/weatherCode';
import { WeatherIcon } from './WeatherIcon';

type WeatherCardProps = {
  city: CityData;
};

export function WeatherCard({ city }: WeatherCardProps) {
  const { deleteCity, theme } = useWeatherContext();
  const weatherData = useWeatherData(city.latitude, city.longitude, city.updatedAt);
  const isDark = theme === 'dark';

  const weatherCode = weatherData?.current_weather?.weathercode ?? 0;
  const currentTemperature = Math.round(weatherData?.current_weather?.temperature ?? 0);
  const temperatureUnit =
    weatherData?.current_weather_units?.temperature ?? DEFAULT_TEMPERATURE_UNIT;
  const windSpeed = Math.round(weatherData?.current_weather?.windspeed ?? 0);
  const windUnit = weatherData?.current_weather_units?.windspeed ?? DEFAULT_WIND_UNIT;
  const lastUpdatedText = city.updatedAt
    ? city.updatedAt.toLocaleTimeString()
    : new Date().toLocaleTimeString();

  return (
    <article
      className={
        isDark
          ? 'rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/30'
          : 'rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/50'
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className={isDark ? 'h-4 w-4 text-sky-400' : 'h-4 w-4 text-sky-600'} />
          <h2 className="text-lg font-semibold">
            {city.name}, {city.country}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => deleteCity(city.id)}
          className={
            isDark
              ? 'rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-200 transition hover:border-rose-500 hover:text-rose-300'
              : 'rounded-lg border border-slate-200 bg-slate-100 p-2 text-slate-700 transition hover:border-rose-300 hover:text-rose-600'
          }
          aria-label={`Delete ${city.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <WeatherIcon
            weatherCode={weatherCode}
            className={isDark ? 'h-11 w-11 text-sky-400' : 'h-11 w-11 text-sky-600'}
          />
          <div>
            <p className="text-3xl font-bold">
              {currentTemperature} {temperatureUnit}
            </p>
            <p className={isDark ? 'text-sm text-slate-300' : 'text-sm text-slate-600'}>
              {weatherCodeToDescription(weatherCode)}
            </p>
          </div>
        </div>
      </div>

      <div
        className={
          isDark
            ? 'mt-4 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 p-2 text-sm text-slate-200'
            : 'mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 text-sm text-slate-700'
        }
      >
        <Wind className="h-4 w-4 text-cyan-400" />
        Wind Speed: {windSpeed} {windUnit}
      </div>

      <p
        className={
          isDark
            ? 'mt-3 flex items-center gap-2 text-xs text-slate-400'
            : 'mt-3 flex items-center gap-2 text-xs text-slate-500'
        }
      >
        <Clock3 className="h-3.5 w-3.5" />
        Last Updated: {lastUpdatedText}
      </p>
    </article>
  );
}

export default WeatherCard;