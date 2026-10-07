import { useState, type ChangeEvent } from 'react';
import { AlertCircle, MapPin, Search } from 'lucide-react';
import { searchCities } from '../api/cityApi';
import { MIN_SEARCH_QUERY_LENGTH } from '../constants/weather';
import { useWeatherContext } from '../hooks/useWeatherContext';
import type { CityData } from '../types/city';

export function SearchCity() {
  const { addCity, theme } = useWeatherContext();

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CityData[]>([]);
  const [hasError, setHasError] = useState(false);

  const isDark = theme === 'dark';

  const handleSearchChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const nextQuery = event.target.value;

    setQuery(nextQuery);

    const trimmedQuery = nextQuery.trim();

    if (trimmedQuery.length < MIN_SEARCH_QUERY_LENGTH) {
      setSearchResults([]);
      setHasError(false);
      return;
    }

    try {
      const cities = await searchCities(trimmedQuery);

      if (cities.length === 0) {
        setHasError(true);
        setSearchResults([]);
        return;
      }

      setHasError(false);
      setSearchResults(cities);
    } catch {
      setHasError(true);
      setSearchResults([]);
    }
  };

  const handleSelectCity = (city: CityData) => {
    addCity(city);

    setQuery('');
    setSearchResults([]);
    setHasError(false);
  };

  return (
    <div className="relative">
      <div
        className={
          isDark
            ? 'flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 shadow-lg shadow-slate-950/30 ring-1 ring-slate-800'
            : 'flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200'
        }
      >
        <Search
          className={
            isDark
              ? 'h-5 w-5 text-slate-400'
              : 'h-5 w-5 text-slate-500'
          }
        />

        <input
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for a city"
          type="text"
          className={
            isDark
              ? 'w-full bg-transparent text-base text-slate-100 placeholder:text-slate-400 focus:outline-none'
              : 'w-full bg-transparent text-base text-slate-900 placeholder:text-slate-500 focus:outline-none'
          }
        />
      </div>

      {hasError ? (
        <div
          className={
            isDark
              ? 'mt-3 flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200'
              : 'mt-3 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700'
          }
        >
          <AlertCircle className="h-4 w-4" />
          Country not found.
        </div>
      ) : (
        searchResults.length > 0 && (
          <div
            className={
              isDark
                ? 'mt-3 flex flex-col gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 p-2'
                : 'mt-3 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2'
            }
          >
            {searchResults.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => handleSelectCity(city)}
                className={
                  isDark
                    ? 'flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-200 transition hover:bg-slate-800'
                    : 'flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-700 transition hover:bg-slate-100'
                }
              >
                <MapPin className="h-4 w-4 text-sky-400" />
                {city.name}, {city.country}
              </button>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default SearchCity;