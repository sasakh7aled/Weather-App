import { CloudSun } from 'lucide-react';
import { useWeatherContext } from '../hooks/useWeatherContext';
import { LiveBadge } from './LiveBadge';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const { theme } = useWeatherContext();
  const isDark = theme === 'dark';

  return (
    <header
      className={
        isDark
          ? 'flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/30 backdrop-blur-sm'
          : 'flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/50'
      }
    >
      <div className="flex items-center gap-3">
        <div
          className={
            isDark
              ? 'flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/15 text-sky-300'
              : 'flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600'
          }
        >
          <CloudSun className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Weather Dashboard</h1>
          <p className={isDark ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>
            Powered by Open-Meteo API
          </p>
        </div>
      </div>

      <ThemeToggle />
      <LiveBadge />
    </header>
  );
}

export default Header;