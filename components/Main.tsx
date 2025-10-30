// components/Main.tsx
"use client"; // Needs to be a client component to use a hook

import { useEffect } from "react";
import { useWeatherStore } from "@/store/weatherStore";
import CurrentWeather from "./elements/CurrentWeather";
import DailyForecast from "./elements/DailyForecast";
import HourlyForecast from "./elements/HourlyForecast";
import LoadingSpinner from "./elements/LoadingSpinner";

const Main = () => {
  // ✅ This is the correct way
  const initializeWeather = useWeatherStore((state) => state.initializeWeather);
  const status = useWeatherStore((state) => state.status);

  useEffect(() => {
    initializeWeather();
  }, [initializeWeather]);

  if (status === "loading" || status === "idle") {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error
  if (status === "error") {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Could not fetch weather data. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-12 md:px-0 lg:px-30 h-9/12 box-border gap-6">
      <CurrentWeather />
      <DailyForecast />
      <HourlyForecast />
    </div>
  );
};

export default Main;
