import { WEATHER_API_URL } from '../constants/weather';
import type { WeatherDataApiResponse } from '../types/weather';

/**
 * Fetches current weather for given latitude and longitude.
 */
export async function fetchWeatherData(
  latitude: number,
  longitude: number,
): Promise<WeatherDataApiResponse> {
  const url = `${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }

  return response.json();
}
