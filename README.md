# Weather Dashboard

A weather dashboard web application built with React, TypeScript, Vite, and Tailwind CSS. It allows users to search for cities, add them to a dashboard, and view live weather conditions powered by the Open-Meteo API.

## Features

- Search cities worldwide with autocomplete suggestions (minimum 3 characters).
- View up to 5 matching cities with name and country.
- Add and remove cities from the dashboard.
- Display current temperature, weather conditions, and wind speed for each added city.
- Render dynamic weather icons based on WMO weather codes.
- Automatic periodic timestamp refresh every 6 seconds to trigger weather updates.
- Light and dark theme toggle.
- Error message display when a searched city is not found.

## Tech Stack

- **React 19**: UI library with functional components and hooks.
- **TypeScript**: Static type checking with strict type definitions.
- **Vite 8**: Build tool and development server.
- **Tailwind CSS v4**: Utility-first CSS styling.
- **Lucide React**: Weather and interface icons.
- **Open-Meteo API**: Public APIs for geocoding and weather forecasts (no API key required).
- **ESLint**: Linting and code style enforcement.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

Clone or download the repository, then install dependencies:

```bash
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

Open the URL shown in your terminal (typically `http://localhost:5173`) in your browser.

### Production Build

Type-check and build the production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
├── api/                  # Open-Meteo API request functions
│   ├── cityApi.ts        # City geocoding search API call
│   └── weatherApi.ts     # Current weather forecast API call
├── components/           # UI components
│   ├── Header.tsx        # Top navigation header and branding
│   ├── LiveBadge.tsx     # Animated "Live" status badge
│   ├── SearchCity.tsx    # City search bar with search suggestions and error handling
│   ├── ThemeToggle.tsx   # Light / dark mode toggle button
│   ├── WeatherCard.tsx   # Individual city weather card
│   └── WeatherIcon.tsx   # Dynamic Lucide icon renderer for weather codes
├── constants/            # Centralized constants
│   └── weather.ts        # Refresh interval, search limits, API URLs, default units
├── context/              # Global React Context
│   ├── WeatherContext.ts # React Context definition
│   └── WeatherProvider.tsx # Provider holding cities and theme state
├── hooks/                # Custom React hooks
│   ├── useCitySearch.ts  # Manages search query, results, and error state
│   ├── useWeatherContext.ts # Hook to consume WeatherContext
│   └── useWeatherData.ts # Fetches weather forecast for given coordinates
├── types/                # TypeScript type definitions
│   ├── city.ts           # Types for city data and geocoding responses
│   └── weather.ts        # Types for weather forecast data and theme
├── utils/                # Pure utility helper functions
│   ├── weatherCode.ts    # Maps WMO weather codes to text descriptions
│   └── weatherIcon.ts    # Maps WMO weather codes to Lucide icon components
├── App.tsx               # Main layout and Provider root component
├── index.css             # Tailwind CSS imports and base styles
└── main.tsx              # Application entry point rendering to DOM
```

## How It Works

- **State Management (`WeatherProvider` & `WeatherContext`)**: Global state is kept directly in `WeatherProvider`. It manages the list of added `cities`, `addCity` and `deleteCity` handlers, and `theme` mode with `toggleTheme`. The custom hook `useWeatherContext` provides clean access to this context.
- **Theme Toggle**: `WeatherProvider` manages `'light'` or `'dark'` state and synchronizes the `.dark` class and `colorScheme` style on `document.documentElement`.
- **City Timestamps**: An effect inside `WeatherProvider` runs every 6 seconds to update the `updatedAt` property on each city, triggering a refresh of weather data.
- **City Search (`SearchCity` & `useCitySearch`)**: `useCitySearch` manages input query, search API requests, results, and error status. In `SearchCity`, selecting a city directly calls `addCity` from `useWeatherContext` and clears the search.
- **Weather Fetching (`useWeatherData`)**: Each `WeatherCard` passes its city coordinates and `updatedAt` date to `useWeatherData`. The hook triggers `fetchWeatherData` in `weatherApi.ts` on initial mount and whenever `updatedAt` changes.
- **Weather Code Mapping**: The API returns numeric WMO weather codes. `weatherCodeToDescription` provides human-readable condition text, and `weatherCodeToIcon` maps codes to matching Lucide icons.

## Scripts

- `npm run dev`: Starts the Vite local development server with Hot Module Replacement.
- `npm run build`: Runs TypeScript compiler check (`tsc -b`) and builds production assets into `dist/`.
- `npm run lint`: Runs ESLint across all TypeScript and TSX files to check for linting errors.
- `npm run preview`: Starts a local server to preview the production build output.

## Notes

- **No API Keys Required**: Open-Meteo APIs are free and public; no API keys or `.env` configuration are needed.
- **Internet Connection Required**: The app fetches geocoding and forecast data live from Open-Meteo endpoints.
- **In-Memory State**: City and theme data are stored in React component memory; refreshing the page resets the dashboard.
- **Search Query Requirement**: City search queries must be at least 3 characters long before an API request is made.
- **Refresh Frequency**: The auto-refresh interval is set to 6 seconds (`REFRESH_INTERVAL_MS = 6000`) in `src/constants/weather.ts`.
