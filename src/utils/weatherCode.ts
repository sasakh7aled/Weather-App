/**
 * Maps Open-Meteo WMO weather code to a readable English description.
 */
export function weatherCodeToDescription(weatherCode: number): string {
  switch (weatherCode) {
    case 0:
      return 'Clear sky';
    case 1:
      return 'Mainly clear';
    case 2:
      return 'Partly cloudy';
    case 3:
      return 'Overcast';
    case 45:
      return 'Fog';
    case 48:
      return 'Depositing rime fog';
    case 51:
      return 'Drizzle: Light';
    case 53:
      return 'Drizzle: Moderate';
    case 55:
      return 'Drizzle: Dense intensity';
    case 56:
      return 'Freezing Drizzle: Light';
    case 57:
      return 'Freezing Drizzle: Dense intensity';
    case 61:
      return 'Rain: Slight';
    case 63:
      return 'Rain: Moderate';
    case 65:
      return 'Rain: Heavy intensity';
    case 66:
      return 'Freezing Rain: Light';
    case 67:
      return 'Freezing Rain: Heavy intensity';
    case 71:
      return 'Snow fall: Slight';
    case 73:
      return 'Snow fall: Moderate';
    case 75:
      return 'Snow fall: Heavy intensity';
    case 77:
      return 'Snow grains';
    case 80:
      return 'Rain showers: Slight';
    case 81:
      return 'Rain showers: Moderate';
    case 82:
      return 'Rain showers: Violent';
    case 85:
      return 'Snow showers: Slight';
    case 86:
      return 'Snow showers: Heavy';
    case 95:
      return 'Thunderstorm: Slight or moderate';
    case 96:
      return 'Thunderstorm with slight hail';
    case 99:
      return 'Thunderstorm with heavy hail';
    default:
      return 'Unknown weather code';
  }
}
