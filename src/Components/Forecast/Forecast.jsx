import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion"
import { TbTemperatureCelsius } from "react-icons/tb";

const WEEK_DAYS = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
];

function Forecast({ data }) {
    // Reorders it so that the day specified by the variable dayInWeek becomes the first element of the array
    const dayInWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length)
        .concat(WEEK_DAYS.slice(0, dayInWeek))

    return (
        <div className="w-full font-[rubik] py-4 px-8 text-white bg-[#162635]/80 space-y-4">
            <label className="text-2xl">Daily</label> 
            {/* Iterate through the data to get 5 items */}
             <section className="flex justify-evenly">
                {data.list.splice(0, 5).map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <label htmlFor="">{forecastDays[index]}</label>
                        <img alt="weather" src={`icons/${item.weather[0].icon}.png`} className="w-10"/>
                        <label className="flex items-center">{Math.round(item.main.temp)}<TbTemperatureCelsius /></label>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default Forecast