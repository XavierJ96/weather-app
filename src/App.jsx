import React, { useState, useEffect } from "react";
import Search from "./Components/Search/Search"
import CurrentWather from "./Components/Current-Weather/Current-weather"
import { WEATHER_API_URL, API_KEY } from "./api";
import './App.css'

export default function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  // Get data using the Lon and Lat received by City to display
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    
    // returns a single promise
    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (res) => {
      const weatherResponse =  await res[0].json();
      const forecastResponse =  await res[1].json();
      // store data received
      setCurrentWeather({city: searchData.label , ...weatherResponse});
      setForecastWeather({city: searchData.label , ...forecastResponse});
    })

    // If the above fails
    .catch((error) => console.log(error))

  }

  console.log(currentWeather)
  console.log(forecastWeather)
  
  return (
    <div className="overflow-y-scroll w-full h-screen py-20">
      <div className="w-full max-w-[550px] mx-auto px-2 py-2 space-y-12" >
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWather data={currentWeather} />}
      </div>
    </div>
  );
}

