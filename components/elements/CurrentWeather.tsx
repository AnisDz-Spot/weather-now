"use client";

import { useDefaultUnits, useWeatherStore } from "@/store/weatherStore";
import Image from "next/image";

const CurrentWeather = () => {
  const current = useWeatherStore((state) => state.current);
  const location = useWeatherStore((state) => state.location);

  const temp = useDefaultUnits((state) => state.temp);
  const wind = useDefaultUnits((state) => state.wind);
  const preci = useDefaultUnits((state) => state.preci);

  if (!current || !location) {
    return null;
  }

  return (
    <div className="flex flex-col md:col-span-12 lg:col-span-8 md:row-span-7 gap-4">
      <div className="relative w-full h-9/12 flex flex-col justify-center md:flex-row md:justify-between items-center px-4 py-5 md:px-10 rounded-2xl">
        <Image
          src="/bg-today-large.svg"
          fill
          priority={true}
          alt="Background Today Weather"
          className="rounded-2xl opacity-80 w-auto h-auto object-cover"
        />
        <div className="py-5 md:py-0 z-10">
          <h3 className="text-xl mb-2 md:mb-0 font-semibold">
            {`${location.name}, ${location.region} | ${location.country}`}
          </h3>
          <p className="text-sm text-center md:text-left md:text-base text-neutral-300">
            {location.localtime}
          </p>
        </div>
        <div className="flex md:justify-end items-center gap-4 z-10">
          {current.condition?.icon && (
            <Image
              src={current.condition.icon.replace("//", "https://")}
              alt={current.condition.text || "Weather icon"}
              width={70}
              height={70}
              className="w-[70px] h-auto"
            />
          )}
          <h5 className="relative text-7xl md:text-6xl">
            {temp === "celcius"
              ? Math.round(current.feelslike_c)
              : current.feelslike_f}
            °
          </h5>
        </div>
      </div>
      <div className="h-3/12 grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex flex-col items-between bg-input-bg p-4 gap-4 rounded-md">
          <p className="text-neutral-300 text-sm">Feels Like</p>
          <h6 className="text-2xl">
            {temp === "celcius"
              ? `${current?.feelslike_c}°`
              : `${current?.feelslike_f}°`}
          </h6>
        </div>
        <div className="flex flex-col items-between bg-input-bg p-4 gap-4 rounded-md">
          <p className="text-neutral-300 text-sm">Humidity</p>
          <h6 className="text-2xl">
            {current ? `${current?.humidity} %` : "N/A"}
          </h6>
        </div>
        <div className="flex flex-col items-between bg-input-bg p-4 gap-4 rounded-md">
          <p className="text-neutral-300 text-sm">Wind</p>
          <h6 className="text-2xl">
            {wind === "km/h" && current
              ? `${current?.wind_kph} km/h`
              : `${current?.wind_kph} mph`}
          </h6>
        </div>
        <div className="flex flex-col items-between bg-input-bg p-4 gap-4 rounded-md">
          <p className="text-neutral-300 text-sm">Precipitation</p>
          <h6 className="text-2xl">
            {preci === "mm" && current
              ? `${current?.precip_mm} mm`
              : `${current?.precip_in} inch`}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
