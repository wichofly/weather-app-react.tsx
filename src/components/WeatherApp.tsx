import useUser from '../Hooks/useUser';
import './WeatherApp.css';
import WeatherDetails from './WeatherDetails';
import SearchBar from './SearchBar';
import Loading from './Loading';
import NotFound from './NotFound';

const WeatherApp = () => {
  const { data, location, setLocation, loading, updateWeather } =
    useUser('Apopa');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateWeather(location);
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
        <SearchBar
          location={location}
          data={data}
          setLocation={setLocation}
          updateWeather={updateWeather}
          handleKeyDown={handleKeyDown}
        />

        {loading ? (
          <Loading />
        ) : data?.notFound ? (
          <NotFound />
        ) : data && !data.notFound ? (
          <WeatherDetails data={data} getCurrentDate={getCurrentDate} />
        ) : null}
      </div>
    </div>
  );
};

export default WeatherApp;
