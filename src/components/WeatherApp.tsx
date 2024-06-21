import { useState } from 'react';
import './WeatherApp.css';

import sunny from '../assets/sunny.png';
import cloudy from '../assets/cloudy.png';
import rainy from '../assets/rainy.png';
import snowy from '../assets/snowy.png';

interface Prop {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

const WeatherApp = () => {
  const [data, setData] = useState<Prop | null>(null);
  const [location, setLocation] = useState('');

  const api_key = 'b46d2bff9c7d8d90bbd5bcbb7e286719';

  // const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setLocation(event.target.value);
  // };

  const apiUrl = async () => {
    // Check if location is empty or contains only whitespace
    if (!location.trim()) return;

    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
    const response = await fetch(baseURL);
    const searchData = await response.json();
    console.log(searchData);
    setData(searchData);
    setLocation('');
  };

  // Use Enter to see location
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      apiUrl();
    }
  };

  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{(data && data.name) || 'Location'}</div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter city name"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <i onClick={apiUrl}>🔍</i>
          </div>
        </div>

        <div className="weather">
          <img src={sunny} alt="sunny" />
          <div className="weather-type">
            {data && data.weather ? data.weather[0].main : 'Weather'}
          </div>
          <div className="temp">
            {data && data.main ? `${Math.floor(data.main.temp)}` : '0'}°C
          </div>
        </div>

        <div className="weather-date">
          <p>Fri, 21 Jun</p>
        </div>

        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i>💧</i>
            <div className="data">
              {data && data.main ? data.main.humidity : '0'}%
            </div>
          </div>

          {/* Another way to do it */}
          <div className="wind">
            {data && data.wind ? (
              <>
                <div className="data-name">Wind</div>
                <i>💨</i>
                <div className="data">{data.wind.speed} km/h</div>
              </>
            ) : (
              <div className="data-name">No wind data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
