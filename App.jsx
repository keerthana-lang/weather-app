import { useState } from "react";
import { cities } from "./data/cityList";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [recent, setRecent] = useState([]);

  const API_KEY = "2f9ae1e0d40276c5f482eb62345b465e";

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
        setError("");
        setRecent((prev) =>
          [data.name, ...prev.filter((item) => item !== data.name)].slice(0, 5)
        );
      } else {
        setWeather(null);
        setError(data.message || "City not found.");
      }
    } catch {
      setWeather(null);
      setError("Failed to fetch weather data. Check your internet.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  const weatherBackgrounds = {
    Clear: "from-yellow-200 to-yellow-400",
    Clouds: "from-gray-300 to-gray-500",
    Rain: "from-blue-400 to-gray-600",
    Snow: "from-white to-blue-100",
    Thunderstorm: "from-gray-700 to-black",
    Drizzle: "from-blue-200 to-blue-400",
    Mist: "from-gray-200 to-gray-400",
    Haze: "from-indigo-200 to-indigo-400",
  };

  const backgroundClass = weather
    ? `bg-gradient-to-br ${
        weatherBackgrounds[weather.weather[0].main] || "from-blue-100 to-blue-300"
      }`
    : "bg-gradient-to-br from-blue-100 to-blue-300";

  return (
    <div className={`min-h-screen ${backgroundClass} flex items-center justify-center px-4`}>
      <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Weather App</h1>

        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none"
        />

        {/* 🔍 Suggestions Dropdown */}
        {city && (
          <ul className="bg-white border mt-1 rounded shadow text-left max-h-40 overflow-y-auto">
            {cities
              .filter(
                (c) =>
                  c.toLowerCase().startsWith(city.toLowerCase()) &&
                  c.toLowerCase() !== city.toLowerCase()
              )
              .map((suggestion) => (
                <li
                  key={suggestion}
                  className="px-4 py-1 hover:bg-gray-200 cursor-pointer"
                  onClick={() => setCity(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
          </ul>
        )}

        <button
          onClick={getWeather}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700 transition"
        >
          Get Weather
        </button>

        {/* ❌ Error */}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        {/* 🌦 Weather Result */}
        {weather && (
          <div className="mt-6 text-gray-800">
            <h2 className="text-2xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather-icon"
              className="mx-auto"
            />

            <p className="text-lg">{weather.weather[0].main}</p>
            <p className="text-4xl font-bold text-blue-700">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-sm mt-2">
              Feels like: {Math.round(weather.main.feels_like)}°C
            </p>
            <p className="text-sm">Humidity: {weather.main.humidity}%</p>
          </div>
        )}

        {/* 🕓 Recent Searches */}
        {recent.length > 0 && (
          <div className="mt-6 text-left">
            <h3 className="font-medium text-gray-700">Recent Searches:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {recent.map((item) => (
                <button
                  key={item}
                  onClick={() => setCity(item)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
