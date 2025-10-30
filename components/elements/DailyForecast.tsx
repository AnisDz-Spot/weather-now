// elements/DailyForecast.tsx (REFACTORED)
"use client";

import { useWeatherStore, useDefaultUnits } from "@/store/weatherStore";
import Image from "next/image";
import { daysNaming } from "@/variables";

const DailyForecast = () => {
  const forecast = useWeatherStore((state) => state.forecast);
  const temp = useDefaultUnits((state) => state.temp);

  return (
    <div className="flex flex-col justify-end col-span-8 row-span-5">
      <p className="my-5 md:mb-4 text-2xl">DailyForecast</p>
      <div className={`grid grid-cols-3 md:grid-cols-7 gap-4`}>
        {forecast?.forecastday.map((item, i) => {
          const day = new Date(item.date).getDay();
          return (
            <div
              key={i}
              className="flex flex-col items-center py-3 rounded-md justify-between bg-input-bg"
            >
              <p className="md:text-sm">{daysNaming[day]}</p>
              <Image
                src={forecast.forecastday[i].day.condition.icon.replace(
                  "//",
                  "https://"
                )}
                alt={forecast.forecastday[i].day.condition.text}
                width={32}
                height={32}
                className="w-20 md:w-8 h-auto my-2"
              />
              <p className="text-lg md:text-sm flex justify-between items-center gap-4">
                <span>
                  {temp === "celcius" && forecast.forecastday[i].day
                    ? Math.round(forecast.forecastday[i].day.maxtemp_c)
                    : Math.round(forecast.forecastday[i].day.maxtemp_f)}{" "}
                  °
                </span>
                <span>
                  {temp === "celcius" && forecast.forecastday[i].day
                    ? Math.round(forecast.forecastday[i].day.mintemp_c)
                    : Math.round(forecast.forecastday[i].day.mintemp_f)}
                  °
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
