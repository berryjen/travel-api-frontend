import { useEffect, useState } from "react";
import Awesomplete from "awesomplete";

function CountriesAutocomplete() {
    // const [allCountries, setAllCountries] = useState([]);
    // useEffect(() => {
    //     if (allCountries.length > 0) return;
    //     fetch('api/countries/autocomplete')
    //         .then(response => response.json())
    //         .then(data => setAllCountries(data));
    //     const autocompleteInput = document.getElementById('country');

    // new Awesomplete(autocompleteInput, {
    //     list: allCountries,
    //     data: (item) => {
    //         return {
    //             label: item.name,
    //             value: item.id,
    //         };
    //     },
    //     minChars: 1,
    //     autoFirst: true,
    // });
    // }, [allCountries, handleChange]);
    const [country, setCountry] = useState('');
    const base_url = `api/countries/autocomplete`;

    const handleChange = async (event) => {
        const { name, value } = event.target;
        console.log('handle change', name, value);
        setCountry(value);
        const url = `${base_url}?name=${value}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('data', data);
    };
    return (
        < input
            type="text"
            id="country"
            name="country_id"
            required
            value={country}
            onChange={handleChange}
        />
    );
}

export default CountriesAutocomplete;
