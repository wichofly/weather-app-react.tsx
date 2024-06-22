import { useEffect, useState } from 'react';
import './WeatherApp.css';

import sunny from '../assets/sunny.png';
import cloudy from '../assets/cloudy.png';
import rainy from '../assets/rainy.png';
import snowy from '../assets/snowy.png';
import hazy from '../assets/hazy.png';
import misty from '../assets/misty.png';
import loadingGif from '../assets/loading.gif';

interface Prop {
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

const WeatherApp = () => {
  const [data, setData] = useState<Prop | null>(null);
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const api_key = 'b46d2bff9c7d8d90bbd5bcbb7e286719';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=Metric&appid=${api_key}`;
      const response = await fetch(baseURL);
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

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
    if (searchData.cod !== '200') {
      // Handle the case when the location is not found
      setData({ notFound: true });
    } else {
      setData(searchData);
      setLocation('');
    }
    setLoading(false);
  };

  // Use Enter to see location
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      apiUrl();
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const weatherImages: { [key: string]: string } = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: hazy,
    Mist: misty,
  };

  const weatherImage =
    data && data.weather
      ? weatherImages[data.weather[0].main]
      : 'How is the weather?';

  const bgImages = {
    Clear: 'linear-gradient(to right, #FFDAB9, #FF9C00)',
    Clouds: 'linear-gradient(to right, #D3E9FF, #FFFFFF )',
    Rain: 'linear-gradient(to right, #a18cd1, #fbc2eb)',
    Snow: 'linear-gradient(to right, #83a4d4, #b6fbff)',
    Haze: 'linear-gradient(to right, #3E5151, #DECBA4)',
    Mist: 'linear-gradient(to right, #E0EAF6, #CAD5E2)',
  };

  const bgImage =
    data && data.weather
      ? bgImages[data.weather[0].main as keyof typeof bgImages]
      : 'linear-gradient(to right, #FFDAB9, #FF9C00)';

  return (
    <div className="container" style={{ background: bgImage }}>
      <div
        className="weather-app"
        style={{
          background:
            bgImage && bgImage.replace
              ? bgImage.replace('to right', 'to top')
              : 'linear-gradient(to right, #FFDAB9, #FF9C00)',
        }}
      >
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

        {loading ? (
          <img className="loader" src={loadingGif} alt="loading" />
        ) : data?.notFound ? (
          <div className="not-found">Not Found 🤦‍♂️</div>
        ) : null}
        {data && !data.notFound && (
          <div className="weather">
            <img src={weatherImage} alt="type of weather" />
            <div className="weather-type">
              {data.weather ? data.weather[0].main : 'Weather'}
            </div>
            <div className="temp">
              {data.main ? `${Math.floor(data.main.temp)}` : '0'}°C
            </div>
          </div>
        )}

        <div className="weather-date">
          <p>{getCurrentDate()}</p>
        </div>

        <div className="weather-data">
          <div className="humidity">
            {data && data.main ? (
              <>
                <div className="data-name">Humidity</div>
                <i>💧</i>
                <div className="data">{data.main.humidity}%</div>
              </>
            ) : (
              <div className="data-name">No humidity data available</div>
            )}
          </div>

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
