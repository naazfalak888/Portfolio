import { useState } from "react";
import "./WeatherApp.css";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // Find the location
      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1&language=en&format=json`
      );

      const locationData = await locationResponse.json();

      if (!locationData.results || locationData.results.length === 0) {
        setError("Location not found. Try another city.");
        setLoading(false);
        return;
      }

      const location = locationData.results[0];

      // Get weather for that location
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`
      );

      const weatherData = await weatherResponse.json();

      setWeather({
        city: location.name,
        country: location.country,
        temperature: weatherData.current.temperature_2m,
        feelsLike: weatherData.current.apparent_temperature,
        humidity: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m,
        code: weatherData.current.weather_code,
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const getWeatherDescription = (code) => {
    if (code === 0) return "Clear sky ☀️";
    if ([1, 2, 3].includes(code)) return "Partly cloudy ⛅";
    if ([45, 48].includes(code)) return "Foggy 🌫️";
    if ([51, 53, 55].includes(code)) return "Drizzle 🌦️";
    if ([61, 63, 65].includes(code)) return "Rainy 🌧️";
    if ([71, 73, 75].includes(code)) return "Snowy ❄️";
    if ([80, 81, 82].includes(code)) return "Rain showers 🌦️";
    if ([95, 96, 99].includes(code)) return "Thunderstorm ⛈️";

    return "Weather unavailable";
  };

  return (
    <div className="weather-page">
      <div className="weather-card">
        <p className="weather-label">WEATHER APP</p>

        <h1>Weather Today</h1>

        <p className="weather-subtitle">
          Check the weather anywhere in the world.
        </p>

        <div className="weather-search">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
          />

          <button onClick={getWeather}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="weather-error">{error}</p>}

        {weather && (
          <div className="weather-result">
            <p className="location">
              {weather.city}, {weather.country}
            </p>

            <div className="temperature">
              {Math.round(weather.temperature)}°C
            </div>

            <p className="description">
              {getWeatherDescription(weather.code)}
            </p>

            <div className="weather-details">
              <div>
                <span>Feels like</span>
                <strong>{Math.round(weather.feelsLike)}°C</strong>
              </div>

              <div>
                <span>Humidity</span>
                <strong>{weather.humidity}%</strong>
              </div>

              <div>
                <span>Wind</span>
                <strong>{weather.wind} km/h</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;