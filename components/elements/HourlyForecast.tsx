"use client";

import { useEffect, useState } from "react";
import { useDefaultUnits, useWeatherStore } from "@/store/weatherStore";
import { forecastHourly } from "@/types";
import { daysNaming } from "@/variables";
import Image from "next/image";

const HourlyForecast = () => {
  const [choosenDay, setChoosenDay] = useState<forecastHourly[]>();

  const forecast = useWeatherStore((state) => state.forecast);
  const temp = useDefaultUnits((state) => state.temp);

  const handleDayClick = (d: string) => {
    const day = daysNaming.indexOf(d);

    const selectedDay = forecast?.forecastday.filter((item) => {
      const d = new Date(item.date).getDay();
      return d === day;
    });

    setChoosenDay(selectedDay);
    console.log(selectedDay);
  };

  useEffect(() => {
    const defaultDay = forecast?.forecastday;

    if (defaultDay) {
      setChoosenDay(defaultDay);
    }
  }, [forecast]);

  return (
    <div className="col-span-4 col-start-9 row-start-1 row-span-12 bg-input-bg rounded-2xl py-6 md:py-3 px-5">
      <div className="flex justify-between items-center mb-4">
        <h5>Hourly forecast</h5>
        <div className="relative z-10 flex gap-3 bg-gray-600 cursor-pointer rounded-md hover:bg-blue-bg duration-300">
          <select
            className="outline-none border-0 w-full px-3 py-2 rounded-md"
            onChange={(e) => handleDayClick(e.target.value)}
          >
            {forecast?.forecastday.map((item, i) => {
              const day = new Date(item.date).getDay();
              const dayName = daysNaming[day];
              return (
                <option key={dayName} className="text-sm text-black">
                  {dayName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="h-[400px] grid gap-3 overflow-y-scroll">
        {choosenDay &&
          choosenDay?.[0]?.hour.map((item, i) => {
            const hoursTime = new Date(item.time).getHours();
            return (
              <div
                className="flex justify-between items-center bg-gray-600 rounded-md p-2"
                key={i}
              >
                <div className="w-full flex items-center gap-2">
                  <Image
                    src={item.condition.icon.replace("//", "https://")}
                    width={36}
                    height={36}
                    alt={item.condition.text}
                    className="w-16 md:w-9 h-auto"
                  />
                  <p className="text-lg md:text-sm">
                    {hoursTime < 12 ? `${hoursTime} AM` : `${hoursTime} PM`}
                  </p>
                </div>
                <p className="text-lg md:text-sm mr-4">
                  {temp === "celcius"
                    ? `${Math.round(item.temp_c)}°`
                    : `${Math.round(item.temp_f)}°`}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HourlyForecast;
