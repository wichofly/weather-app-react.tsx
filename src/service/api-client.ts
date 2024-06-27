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

/**
 * It can't set location directly in the "axios.create" because it needs to be passed dynamically. Instead, create a function that makes the request with the necessary parameters.
 * 
 * "return response.data" : This line of code instructs the function to return the  data  property from the  response  object. When this function is called, it will provide the  data  part of the response object as the return value. 
 */
