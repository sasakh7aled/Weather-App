import { useWeatherContext } from '../hooks/useWeatherContext';

export function LiveBadge() {
  const { theme } = useWeatherContext();
  const isDark = theme === 'dark';

  return (
    <div
      className={
        isDark
          ? 'ml-2 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-2 text-sm font-semibold text-emerald-300'
          : 'ml-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700'
      }
    >
      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      Live
    </div>
  );
}
