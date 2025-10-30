"use client";

import { useDefaultUnits } from "@/store/weatherStore";
import Image from "next/image";
import { useEffect, useState } from "react";

const Units = () => {
  const [enableUMenu, setEnableUMenu] = useState(false);
  const { temp, wind, preci, setTemp, setWind, setPreci } = useDefaultUnits();

  const handleUnitChange = (unit: string) => {
    switch (unit) {
      case "celcius":
        setTemp(unit);
        break;
      case "fahrenheit":
        setTemp(unit);
        break;
      case "km/h":
        setWind(unit);
        break;
      case "mph":
        setWind(unit);
        break;
      case "mm":
        setPreci(unit);
        break;
      case "inch":
        setPreci(unit);
        break;
      default:
        setTemp("celsius");
        setWind("kilometers");
        setPreci("milimeters");
        break;
    }
  };

  const handleEnableUMenu = () => {
    setEnableUMenu(!enableUMenu);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      if (element?.id === "units-menu") return;
      setEnableUMenu(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        id="units-menu"
        onClick={handleEnableUMenu}
        className="flex items-center text-sm gap-2 bg-neutral-700 px-4 py-2 rounded-lg cursor-pointer select-none hover:bg-blue-800 duration-300"
      >
        <Image
          src="/icon-units.svg"
          alt="Units Settings"
          width={16}
          height={16}
          className="w-auto h-auto"
        />
        Units
        <Image
          src="/icon-dropdown.svg"
          alt="Units Settings"
          width={12}
          height={12}
          className={`w-auto h-auto duration-200 ${
            enableUMenu ? " transform rotate-180" : ""
          }`}
        />
      </button>
      {enableUMenu && (
        <div className="absolute bottom-0 right-0 w-[200px] z-[99999] h-auto transform translate-y-[105%] bg-gray-600 p-4 rounded-md border border-white">
          <h5 className="font-semibold">Switch to Imperial</h5>
          <div className="mt-3">
            <h6 className="text-gray-400 px-1 mb-1">Temperature</h6>
            <div
              className={`relative flex items-center p-2 text-sm rounded-md hover:bg-gray-700 duration-200 cursor-pointer ${
                temp === "celcius" ? "bg-gray-700" : "transparent"
              }`}
              onClick={() => handleUnitChange("celcius")}
            >
              Celsius (°C)
              {temp === "celcius" && (
                <Image
                  src="/icon-checkmark.svg"
                  alt="Check-mark icon"
                  width={12}
                  height={12}
                  className="absolute right-2 w-auto h-auto"
                />
              )}
            </div>
            <div
              className={`relative flex items-center p-2 text-sm rounded-md hover:bg-gray-700 duration-200 cursor-pointer ${
                temp === "fahrenheit" ? "bg-gray-700" : "transparent"
              }`}
              onClick={() => handleUnitChange("fahrenheit")}
            >
              Fahrenheit (°F)
              {temp === "fahrenheit" && (
                <Image
                  src="/icon-checkmark.svg"
                  alt="Check-mark icon"
                  width={12}
                  height={12}
                  className="absolute right-2"
                />
              )}
            </div>
          </div>
          <div className="bg-gray-500  w-full h-[0.5px] my-3" />
          <div className="mt-3">
            <h6 className="text-gray-400 px-1 mb-1">Wind Speed</h6>
            <div
              className={`relative flex items-center p-2 text-sm rounded-md hover:bg-gray-700 duration-200 cursor-pointer ${
                wind === "km/h" ? "bg-gray-700" : "transparent"
              }`}
              onClick={() => handleUnitChange("km/h")}
            >
              km/h
              {wind === "km/h" && (
                <Image
                  src="/icon-checkmark.svg"
                  alt="Check-mark icon"
                  width={12}
                  height={12}
                  className="absolute right-2"
                />
              )}
            </div>
            <div
              className={`relative flex items-center p-2 text-sm rounded-md hover:bg-gray-700 duration-200 cursor-pointer ${
                wind === "mph" ? "bg-gray-700" : "transparent"
              }`}
              onClick={() => handleUnitChange("mph")}
            >
              mph
              {wind === "mph" && (
                <Image
                  src="/icon-checkmark.svg"
                  alt="Check-mark icon"
                  width={12}
                  height={12}
                  className="absolute right-2"
                />
              )}
            </div>
          </div>
          <div className="bg-gray-500  w-full h-[0.5px] my-3" />
          <div className="mt-3">
            <h6 className="text-gray-400 px-1 mb-1">Precipitation</h6>
            <div
              className={`relative flex items-center p-2 text-sm rounded-md hover:bg-gray-700 duration-200 cursor-pointer ${
                preci === "mm" ? "bg-gray-700" : "transparent"
              }`}
              onClick={() => handleUnitChange("mm")}
            >
              mm
              {preci === "mm" && (
                <Image
                  src="/icon-checkmark.svg"
                  alt="Check-mark icon"
                  width={12}
                  height={12}
                  className="absolute right-2"
                />
              )}
            </div>
            <div
              className={`relative flex items-center p-2 text-sm rounded-md hover:bg-gray-700 duration-200 cursor-pointer ${
                preci === "inch" ? "bg-gray-700" : "transparent"
              }`}
              onClick={() => handleUnitChange("inch")}
            >
              Inch
              {preci === "inch" && (
                <Image
                  src="/icon-checkmark.svg"
                  alt="Check-mark icon"
                  width={12}
                  height={12}
                  className="absolute right-2"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Units;
