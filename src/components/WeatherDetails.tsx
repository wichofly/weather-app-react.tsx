import sunny from '../assets/sunny.png';
import cloudy from '../assets/cloudy.png';
import rainy from '../assets/rainy.png';
import snowy from '../assets/snowy.png';
import hazy from '../assets/hazy.png';
import misty from '../assets/misty.png';

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

interface Prop {
  data: WeatherData | null;
  getCurrentDate: () => string;
}

const weatherImages: { [key: string]: string } = {
  Clear: sunny,
  Clouds: cloudy,
  Rain: rainy,
  Snow: snowy,
  Haze: hazy,
  Mist: misty,
};

const WeatherDetails = ({ data, getCurrentDate }: Prop) => {
  const weatherImage =
    data && data.weather
      ? weatherImages[data.weather[0].main]
      : 'How is the weather?';

  return (
    <div className="weather">
      <img src={weatherImage} alt="type of weather" />
      <div className="weather-type">
        {data?.weather ? data.weather[0].main : 'Weather'}
      </div>
      <div className="temp">
        {data?.main ? `${Math.floor(data.main.temp)}` : '0'}°C
      </div>
      <div className="weather-date">
        <p>{getCurrentDate()}</p>
      </div>
      <div className="weather-data">
        <div className="humidity">
          {data?.main ? (
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
          {data?.wind ? (
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
  );
};

export default WeatherDetails;
