const baseURL = `https://api.weatherapi.com/v1/`;
const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

/* Filtering by country is must */
export const lookUpCity = async (city: string) => {
  const data = await fetch(`${baseURL}search.json?key=${key}&q=${city}`);
  return data.json();
};

/* Get Current Weather */
export const getWeather = async (
  city: string,
  type: string = "current",
  days: number = 0
) => {
  const data = await fetch(
    `${baseURL}${type}.json?key=${key}&q=${city}&days=${days}`
  );
  return data.json();
};

/* Get User Loaction */
export const getDefaultUserLocation = async () => {
  const data = await fetch(`${baseURL}ip.json?key=${key}&q=auto:ip`);
  return data.json();
};
