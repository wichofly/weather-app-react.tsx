export interface WeatherData {
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
