import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion"
import { TbTemperatureCelsius } from "react-icons/tb";


function Forecast({hourData }) {
    const [error, setError] = useState(null);

       // Filter the data to only get the items starting from the current time
       const currentTime = new Date();
       const nextItems = hourData.list.filter(item => {
         const itemTime = new Date(item.dt_txt);
         return itemTime >= currentTime;
       });

    //    If data fails 
       if (!nextItems || !nextItems.length) {
        setError("No Data available");
        }

       return (
        <div className="w-full font-[rubik] py-4 px-8 text-white bg-[#162635]/80 space-y-4 rounded-xl">
            { error && <div className="text-red-600">{error}</div> }
            <label className="text-2xl">Hourly forecast</label> 
            {/* Iterate through the data to get 5 items */}
             <section className="flex justify-evenly">
                {nextItems.slice(0, 5).map((item, index) => {
                    const time = new Date(item.dt_txt);
                    return (
                      <div key={index} className="flex flex-col items-center">
                          <label htmlFor="">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</label>
                          <img alt="weather" src={`icons/${item.weather[0].icon}.png`} className="w-10"/>
                          <label className="flex items-center">{Math.round(item.main.temp)}<TbTemperatureCelsius /></label>
                      </div>
                    )
                })}
            </section>
        </div>
    )
}

export default Forecast