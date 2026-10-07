// Interval to update updatedAt timestamps for cities (in milliseconds)
export const REFRESH_INTERVAL_MS = 6000;

// Search configuration
export const MIN_SEARCH_QUERY_LENGTH = 3;
export const MAX_SEARCH_RESULTS = 5;

// API endpoints
export const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
export const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

// Fallback measurement units
export const DEFAULT_TEMPERATURE_UNIT = '°C';
export const DEFAULT_WIND_UNIT = 'km/h';
