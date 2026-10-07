import { createContext } from 'react';
import type { CityData } from '../types/city';
import type { ThemeMode } from '../types/weather';

export type WeatherContextType = {
  cities: CityData[];
  addCity: (city: CityData) => void;
  deleteCity: (id: number) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
};

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);
