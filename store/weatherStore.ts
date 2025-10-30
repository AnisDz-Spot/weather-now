// store/weatherStore.ts (REFACTORED)
import { create } from "zustand";
import { getWeather, getDefaultUserLocation } from "@/lib/api";
import {
  weatherCurrent,
  weatherLocation,
  forecastDayType,
  userLocation,
  defaultUnitType,
} from "@/types";

// 1. Define the state shape
export type WeatherState = {
  current?: weatherCurrent;
  location?: weatherLocation;
  forecast?: forecastDayType;
  city: string;
  status: "idle" | "loading" | "success" | "error";
};

// 2. Define the actions
export type WeatherActions = {
  fetchWeatherByCity: (city: string) => Promise<void>;
  initializeWeather: () => Promise<void>;
  setCity: (city: string) => void; // Keep this for the search bar
};

// 3. Create the store
export const useWeatherStore = create<WeatherState & WeatherActions>(
  (set, get) => ({
    // --- Initial State ---
    current: undefined,
    location: undefined,
    forecast: undefined,
    city: "London", // Default city
    status: "idle",

    // --- Actions ---
    setCity: (name) => set({ city: name }),

    fetchWeatherByCity: async (city: string) => {
      // 4. Set loading state
      set({ status: "loading", city: city });
      try {
        // 5. Make ONE API call for forecast (which includes current)
        const data = await getWeather(city, "forecast", 5);

        if (data.error) {
          throw new Error(data.error.message);
        }

        // 6. Set the entire state from the single response
        set({
          current: data.current,
          location: data.location,
          forecast: data.forecast,
          city: data.location.name,
          status: "success",
        });
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        set({ status: "error" });
      }
    },

    initializeWeather: async () => {
      // 7. Action to get weather on initial load
      if (get().status !== "idle") return; // Only run once

      set({ status: "loading" });
      try {
        const userLocation: userLocation = await getDefaultUserLocation();
        // 8. After getting location, call the main fetch action
        await get().fetchWeatherByCity(userLocation.city);
      } catch (error) {
        console.error("Failed to get initial location:", error);
        // Fallback to default city if location fails
        await get().fetchWeatherByCity(get().city);
      }
    },
  })
);

export const useDefaultUnits = create<defaultUnitType>((set) => ({
  temp: "celcius",
  wind: "km/h",
  preci: "mm",
  setTemp: (value) => set({ temp: value }),
  setWind: (value) => set({ wind: value }),
  setPreci: (value) => set({ preci: value }),
}));
