
import React, { useState } from "react";
import "./WeatherApp.css";
import axios from "axios";


// const axios = require("axios");




// jest.mock("axios");

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "82ce898e23044695847181648250703";
  const API_URL = "https://api.weatherapi.com/v1/current.json";

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setWeather(null);
    try {
      const response = await axios.get(API_URL, {
        params: {
          key: API_KEY,
          q: city,
        },
      });
      setWeather(response.data);
    } catch (error) {
      alert("Failed to fetch weather data");
    }
    setLoading(false);
  };
// 1 className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4"
//2 flex space-x-2 mb-4
  return (
     <div > 
      <div className=" search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="p-2 border rounded-md"
        />
        <button
          onClick={fetchWeather}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading data...</p>}
      {/* 1 grid grid-cols-2 gap-4 p-4 bg-white shadow-lg rounded-md */}
      {/*2 p-4 border rounded-md */}
      {weather && (
        <div className="weather-cards">
          <div className="weather-card ">
            <h2 className="text-lg font-bold">Temperature</h2>
            <p>{weather.current.temp_c}°C</p>
          </div>
          <div className="weather-card ">
            <h2 className="text-lg font-bold">Humidity</h2>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className="weather-card ">
            <h2 className="text-lg font-bold">Condition</h2>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="weather-card ">
            <h2 className="text-lg font-bold">Wind Speed</h2>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
