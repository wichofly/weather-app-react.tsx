import './WeatherApp.css';

import sunny from '../assets/sunny.png';
import cloudy from '../assets/cloudy.png';
import rainy from '../assets/rainy.png';
import snowy from '../assets/snowy.png';

const WeatherApp = () => {
  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">San Salvador</div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Enter city name" />
            <i>🔍</i>
          </div>
        </div>

        <div className="weather">
          <img src={sunny} alt="sunny" />
          <div className="weather-type">Clear</div>
          <div className="temp">28℃</div>
        </div>

        <div className="weather-date">
          <p>Fri, 21 Jun</p>
        </div>

        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i>💧</i>
            <div className="data">34%</div>
          </div>

          <div className="wind">
            <div className="data-name">Wind</div>
            <i>💨</i>
            <div className="data">12 km/h</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
