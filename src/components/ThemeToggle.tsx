import { MoonStar, SunMedium } from 'lucide-react';
import { useWeatherContext } from '../hooks/useWeatherContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useWeatherContext();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={
        isDark
          ? 'inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-sky-500 hover:text-sky-300'
          : 'inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:text-sky-600'
      }
    >
      {isDark ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
      {isDark ? 'Night mode' : 'Day mode'}
    </button>
  );
}
