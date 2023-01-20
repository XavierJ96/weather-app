import {TbTemperatureCelsius} from 'react-icons/tb'



export default function CurrentWeather({data}) {

     //  Date
    // Extract the timestamp from the API response
    const timestamp = data.dt;
    // Convert timestamp to a JavaScript Date object
    const date = new Date(timestamp * 1000);
    // Format the date and time as desired
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const time = date.toLocaleTimeString('en-US', options);
    const optionsName = { weekday: 'long' };
    const dayName = date.toLocaleDateString('en-US', optionsName);

    console.log(new Date(data.dt*1000+(date.timezone*1000)))

    // Wind speed converter
    let windSpeed = Math.round(data.wind.speed * 3.6);

    // Round temperature
    let celcius = Math.round(data.main.temp);
    let celciusFeel = Math.round(data.main.feels_like);

    // Capatalize each word
    const str = data.weather[0].description
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const description = arr.join(" ");

    return (
        <div className='bg-[#162635]/80 rounded-xl py-6 px-8 space-y-4 text-white font-[rubik]'>
            <div className='flex flex-col items-center'>
                <span className='text-3xl'>{data.city}</span>
                <span className='text-lg'>{dayName}, {time}</span>
            </div>
            <div className='flex justify-center items-center gap-x-6 font-[Nunito]'>
                <img src={`icons/${data.weather[0].icon}.png`} alt="Weather Icon" className=''/>
                <span className='flex items-center text-7xl'>{celcius}<TbTemperatureCelsius/></span>
            </div>
            <div  className='w-full flex justify-center'>
                <span className='text-lg'>{description}</span>
            </div>
            <div className='space-y-3 w-full max-w-[400px] mx-auto'>
                <div className='space-y-3'>
                    <div className='flex justify-between gap-x-6 border-b-2 border-white/20'>
                        <span>Wind</span>
                        <span className='text-end'>{windSpeed}km/h </span>
                    </div>
                    <div className='flex justify-between gap-x-6 border-b-2 border-white/20'>
                        <span>Feels Like</span>
                        <span className='flex items-center'>{celciusFeel}<TbTemperatureCelsius/></span>
                    </div>
                </div>
                <div className='space-y-3'>
                    <div className='flex justify-between gap-x-6 border-b-2 border-white/20'>
                        <span>Humidity</span>
                        <span className='text-end'>{data.main.humidity}%</span>
                    </div>
                    <div className='flex justify-between gap-x-6 border-b-2 border-white/20'>
                        <span>Pressure</span>
                        <span className='text-end'>{data.main.pressure} hPa</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
