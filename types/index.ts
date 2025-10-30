export type userLocation = {
  city: string;
  region: string;
  country_name: string;
  continent_code?: string;
  continent_name?: string;
  country_code?: string;
  geoname_id?: number;
  ip?: string;
  is_eu?: string;
  lat?: number;
  localtime?: string;
  localtime_epoch?: number;
  lon?: number;
  type?: string;
  tz_id?: string;
};

export type CityInputState = {
  city: string;
  setCity: (name: string) => void;
};

export type defaultUnitType = {
  temp: string;
  wind: string;
  preci: string;
  setTemp: (value: string) => void;
  setWind: (value: string) => void;
  setPreci: (value: string) => void;
};

type weatherConditionType = {
  text: string;
  icon: string;
};

export type weatherCurrent = {
  condition: weatherConditionType;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  last_updated: string;
  precip_in: number;
  precip_mm: number;
  temp_c: number;
  temp_f: number;
  wind_kph: number;
  wind_mph: number;
};

export type weatherLocation = {
  country: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
};

export type forecastHourType = {
  condition: weatherConditionType;
  feelslike_c: number;
  feelslike_f: number;
  temp_c: number;
  temp_f: number;
  time: string;
};

export type forecastHourly = {
  date: string;
  day: {
    avghumidity: number;
    avgtemp_c: number;
    avgtemp_f: number;
    condition: weatherConditionType;
    maxtemp_c: number;
    maxtemp_f: number;
    maxwind_kph: number;
    maxwind_mph: number;
    mintemp_c: number;
    mintemp_f: number;
    totalprecip_in: number;
    totalprecip_mm: number;
  };
  hour: forecastHourType[];
};

export type forecastDayType = {
  forecastday: forecastHourly[];
};

export type forecastType = {
  current: weatherCurrent | undefined;
  location: weatherLocation | undefined;
  forecast: forecastDayType;
  hour: forecastHourType[];
};

export type currentWeatherType = {
  current: weatherCurrent | undefined;
  location: weatherLocation | undefined;
  forecast: forecastDayType | undefined;

  setWeather: ({
    current,
    location,
    forecast,
  }: {
    current: weatherCurrent;
    location: weatherLocation;
    forecast: forecastDayType;
  }) => void;
  fetchWeather?: (city: string) => void;
};

export type citiesListType = {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
};
