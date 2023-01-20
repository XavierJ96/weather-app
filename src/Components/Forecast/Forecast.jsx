import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion"
import { TbTemperatureCelsius } from "react-icons/tb";

const WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

function Forecast({ data }) {
    // Reorders it so that the day specified by the variable dayInWeek becomes the first element of the array
    const dayInWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length)
        .concat(WEEK_DAYS.slice(0, dayInWeek))

    return (
        <div>
            <label className="title">Daily</label>
            {/* Accordion used to show and expand for more data */}
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div>
                                    <img alt="weather" src={`icons/${item.weather[0].icon}.png`} />
                                    <label htmlFor="">{forecastDays[index]}</label>
                                    <label htmlFor="">{Math.round(item.main.temp)}<TbTemperatureCelsius /></label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>

                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default Forecast