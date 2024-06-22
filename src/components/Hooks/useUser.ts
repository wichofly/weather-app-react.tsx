import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../../service/api-client';

interface WeatherData {
  name?: string;
  main?: {
    temp: number;
    humidity: number;
  };
  weather?: {
    main: string;
  }[];
  wind?: {
    speed: number;
  };
  notFound?: boolean;
}

const useUsers = (initialLocation: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>(initialLocation);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = await fetchWeatherData(initialLocation);
        setData({ ...url, notFound: false });
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setData({ notFound: true });
      }
      setLoading(false);
    };
    fetchData();
  }, [initialLocation]);

  const updateWeather = async (newLocation: string) => {
    if (!newLocation.trim()) return;

    setLoading(true);
    try {
      const searchData = await fetchWeatherData(newLocation);
      setData({ ...searchData, notFound: false });
      setLocation('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setData({ notFound: true });
    }
    setLoading(false);
  };

  return {
    data,
    location,
    setLocation,
    loading,
    updateWeather,
  };
};

export default useUsers;
