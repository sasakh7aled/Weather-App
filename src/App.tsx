import Header from './components/Header';
import SearchCity from './components/SearchCity';
import WeatherCard from './components/WeatherCard';
import { WeatherProvider } from './context/WeatherProvider';
import { useWeatherContext } from './hooks/useWeatherContext';

function WeatherDashboard() {
  const { cities, theme } = useWeatherContext();
  const isDark = theme === 'dark';

  return (
    <div
      className={
        isDark
          ? 'min-h-screen bg-slate-950 text-slate-50'
          : 'min-h-screen bg-slate-100 text-slate-900'
      }
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5">
        <Header />
        <SearchCity />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cities.map((city) => (
            <WeatherCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <WeatherProvider>
      <WeatherDashboard />
    </WeatherProvider>
  );
}
