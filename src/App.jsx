import React, { useState, useEffect } from "react";
import Search from "./Components/Search/Search"
import CurrentWather from "./Components/Current-Weather/Current-weather"
import { WEATHER_API_URL, FORECAST_API_URL } from "./api";
import './App.css'
import Forecast from "./Components/Forecast/Forecast";
import DailyForecast from "./Components/Forecast/DailyForecast";

export default function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastDaily, setForecastDaily] = useState(null);
  const [forecastHour, setHourForecast] = useState(null);
  
  // Get data using the Lon and Lat received by City to display
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    // Declare API'S
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_REACT_APP_API_KEY}&units=metric`)
    const dailyForecastFetch = fetch(`${FORECAST_API_URL}/forecast/daily?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_REACT_APP_API_KEY}&units=metric`)
    const hourlyForecastFetch = fetch(`${FORECAST_API_URL}/forecast/hourly?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_REACT_APP_API_KEY}&units=metric`)
    // returns a single promise
    Promise.all([currentWeatherFetch, dailyForecastFetch, hourlyForecastFetch])
      .then(async (res) => {
        const weatherResponse = await res[0].json();
        const dailyResponse = await res[1].json();
        const hourlyResponse = await res[2].json();
        // store data received
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastDaily({ city: searchData.label, ...dailyResponse });
        setHourForecast({ city: searchData.label, ...hourlyResponse })
      })

      // If the above fails
      .catch((error) => console.log(error))
  }

  return (
    <div className="overflow-y-scroll w-full h-screen py-20">
      <div className="w-full max-w-[550px] mx-auto px-2 py-2 space-y-12" >
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWather data={currentWeather} />}
        {forecastHour && <Forecast hourData={forecastHour} />}
        {forecastDaily && <DailyForecast dailyData={forecastDaily} />}
      </div>
    </div>
  );
}

