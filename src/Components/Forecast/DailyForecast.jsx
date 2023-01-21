import { TbTemperatureCelsius } from "react-icons/tb";
import { useState, useEffect } from "react";

const WEEK_DAYS_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function DailyForecast({ dailyData }) {
    const [errorHandle, setErrorHandle] = useState(null);

    // Filter the data to only get the items starting from the current time

    // If data fails

    useEffect(() => {
        if (!dailyData) {
            setErrorHandle("No Data available");
        } else {
            setErrorHandle(null);
        }
    }, [dailyData]);



    return (
        <div className="w-full font-[rubik] py-4 px-8 text-white bg-[#162635]/80 space-y-4 rounded-xl">
            { errorHandle && <div className="text-red-600">{errorHandle}</div> }
            <label className="text-2xl">Daily forecast</label> 
            {/* Iterate through the data to get 5 items */}
             <section className="flex justify-evenly">
                {dailyData.list.slice(1, 6).map((item, index) => {
                    const date = new Date(item.dt * 1000);
                    const dayInWeek = date.getDay();
                    console.log(date)
                    return (
                      <div key={index} className="flex flex-col items-center">
                          <label htmlFor="">{WEEK_DAYS_ABBR[dayInWeek]}</label>
                          <img alt="weather" src={`icons/${item.weather[0].icon}.png`} className="w-10"/>
                          <label className="flex items-center">{Math.round(item.temp.day)}<TbTemperatureCelsius /></label>
                      </div>
                    )
                })}
            </section>
        </div>
    )
}

export default DailyForecast