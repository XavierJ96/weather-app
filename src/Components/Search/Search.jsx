import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {url, geoOptions} from "../../api"

export default function Search ({onSearchChange}) {
    const [search, setSearch] = useState(null)

    // Update the component's state with the current input value
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData)
    }

    // load options for user input
    const loadOptions = (inputValues) => {
        return fetch(`${url}?dateTime&namePrefix=${inputValues}`, geoOptions)
        .then(res => res.json())
        .then((res) => {
            return {
                options: res.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}` ,
                        label: `${city.name}, ${city.countryCode}`,
                    };
                }), 
            };
        })
        .catch(err => console.error('error:' + err));
    }

    return (
        <AsyncPaginate
            placeholder = "Search for City"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            className="rounded-full"
        />
    )
}

