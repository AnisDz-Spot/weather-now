"use client";

import { useWeatherStore } from "@/store/weatherStore";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { lookUpCity } from "@/lib/api";
import Image from "next/image";
import { citiesListType } from "@/types";

const SearchBar = () => {
  const [cityInput, setCityInput] = useState("");
  const [citiesList, setCitiesList] = useState<citiesListType[] | null>();
  const [selectedCityName, setSelectedCityName] = useState("");
  const [debouncedValue] = useDebounce(cityInput, 1000);
  const cityInputField = useRef<HTMLInputElement | null>(null);
  const setCity = useWeatherStore((state) => state.setCity);

  const fetchWeatherByCity = useWeatherStore(
    (state) => state.fetchWeatherByCity
  );

  const handleChange = (text: string) => {
    if (!text) {
      setCity("");
      setCityInput("");
      setCitiesList(null);
    }
    setCityInput(text);
    if (text !== selectedCityName) {
      setSelectedCityName("");
    }
  };

  useEffect(() => {
    if (debouncedValue && debouncedValue !== selectedCityName) {
      const getCityList = async () => {
        const list = await lookUpCity(debouncedValue);
        if (cityInput === debouncedValue) {
          setCitiesList(list);
        }
      };
      getCityList();
    } else if (debouncedValue === selectedCityName) {
      setCitiesList(null);
    } else if (!debouncedValue) {
      setCitiesList(null);
    }
  }, [debouncedValue, selectedCityName, cityInput]);

  const handleBtnClick = () => {
    if (cityInput) {
      fetchWeatherByCity(cityInput);
      setSelectedCityName(cityInput);
      setCitiesList(null);
    }
  };

  const handleSelectCity = (city: string) => {
    setCityInput(city);
    fetchWeatherByCity(city);
    setSelectedCityName(city);
    setCitiesList(null);
    cityInputField.current?.blur();
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <div className="group w-100 h-10 relative bg-input-bg rounded-md px-4 flex items-center gap-4 duration-300 border-3 border-transparent focus-within:border-3 focus-within:border-blue-800">
        <Image src="/icon-search.svg" alt="Search" width={24} height={24} />
        <input
          ref={cityInputField}
          type="search"
          value={cityInput}
          onChange={(e) => handleChange(e.target.value)}
          name="search-input"
          id="search-input"
          className="bg-transparent outline-none border-none ring-0 w-full"
          placeholder="Search for a city..."
        />
        {citiesList && citiesList?.length > 0 && (
          <div
            className="absolute bottom-0 -left-[2.4px] transform translate-y-[105%] z-50
                w-full max-h-60 overflow-y-auto rounded-lg bg-white p-2
                shadow-xl border border-gray-200"
          >
            <ul className="list-none m-0 p-0 flex flex-col gap-y-1">
              {citiesList.map((item, i) => (
                <li
                  key={i}
                  className="px-3 py-2 rounded-md cursor-pointer transition-colors
                      duration-150 ease-in-out hover:bg-gray-100"
                  role="option"
                  aria-selected="false"
                  onClick={() => handleSelectCity(item.name)}
                >
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span className="text-sm text-gray-500">
                    , {item.country}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        className="bg-blue-500 h-10 px-4 rounded-md cursor-pointer hover:bg-blue-800 duration-300"
        onClick={handleBtnClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
