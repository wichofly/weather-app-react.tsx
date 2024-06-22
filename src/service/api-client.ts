import axios from 'axios';

const api_key = 'b46d2bff9c7d8d90bbd5bcbb7e286719';

const apiClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

export const fetchWeatherData = async (location: string) => {
  const response = await apiClient.get(`weather`, {
    params: {
      q: location,
      units: 'metric',
      appid: api_key,
    },
  });

  return response.data;
};

// baseURL: `https://api.openweathermap.org/data/2.5/weather?q=Bogota&units=Metric&appid=${api_key}`,