import { GEOCODING_API_URL, MAX_SEARCH_RESULTS } from '../constants/weather';
import type { CityData, CityDataApiResponse } from '../types/city';

/**
 * Searches for cities by name using Open-Meteo Geocoding API.
 */
export async function searchCities(query: string): Promise<CityData[]> {
  const url = `${GEOCODING_API_URL}?name=${encodeURIComponent(query)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch city results: ${response.statusText}`);
  }

  const data: CityDataApiResponse = await response.json();
  const results = data.results ?? [];

  return results.slice(0, MAX_SEARCH_RESULTS);
}
