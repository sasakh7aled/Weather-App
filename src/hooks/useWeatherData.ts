import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../api/weatherApi';
import type { WeatherDataApiResponse } from '../types/weather';

export function useWeatherData(latitude: number, longitude: number, updatedAt?: Date) {
  const [weatherData, setWeatherData] = useState<WeatherDataApiResponse | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadWeatherData() {
      try {
        const data = await fetchWeatherData(latitude, longitude);
        if (!isCancelled) {
          setWeatherData(data);
        }
      } catch (error) {
        console.error('Failed to load weather data:', error);
      }
    }

    loadWeatherData();

    return () => {
      isCancelled = true;
    };
  }, [latitude, longitude, updatedAt]);

  return weatherData;
}
