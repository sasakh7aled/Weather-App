import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

export function useWeatherContext() {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }

  return context;
}
