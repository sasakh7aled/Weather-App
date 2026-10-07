import { createElement } from 'react';
import { weatherCodeToIcon } from '../utils/weatherIcon';

type WeatherIconProps = {
  weatherCode: number;
  className?: string;
};

export function WeatherIcon({ weatherCode, className }: WeatherIconProps) {
  const IconComponent = weatherCodeToIcon(weatherCode);
  return createElement(IconComponent, { className });
}
