import { useEffect, useState, type ReactNode } from 'react';
import { REFRESH_INTERVAL_MS } from '../constants/weather';
import type { CityData } from '../types/city';
import type { ThemeMode } from '../types/weather';
import { WeatherContext } from './WeatherContext';

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<CityData[]>([]);
  const [theme, setTheme] = useState<ThemeMode>('dark');

  // Keep HTML root element synchronized with the theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  // Periodically refresh the updatedAt timestamp for all saved cities
  useEffect(() => {
    const timer = setInterval(() => {
      setCities((currentCities) => {
        return currentCities.map((city) => ({
          ...city,
          updatedAt: new Date(),
        }));
      });
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const addCity = (city: CityData) => {
    setCities((currentCities) => [
      ...currentCities,
      {
        ...city,
        updatedAt: city.updatedAt ?? new Date(),
      },
    ]);
  };

  const deleteCity = (id: number) => {
    setCities((currentCities) => {
      return currentCities.filter((city) => city.id !== id);
    });
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      if (currentTheme === 'dark') {
        return 'light';
      }

      return 'dark';
    });
  };

  return (
    <WeatherContext.Provider
      value={{
        cities,
        addCity,
        deleteCity,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
