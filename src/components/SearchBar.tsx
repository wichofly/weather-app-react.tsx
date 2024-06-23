interface Prop {
  location: string;
  setLocation: (location: string) => void;
  updateWeather: (location: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar = ({
  location,
  setLocation,
  updateWeather,
  handleKeyDown,
}: Prop) => {
  return (
    <div className="search">
      <div className="search-top">
        <i className="fa-solid fa-location-dot"></i>
        <div className="location">{location || 'Location'}</div>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <i onClick={() => updateWeather(location)}>🔍</i>
      </div>
    </div>
  );
};

export default SearchBar;
