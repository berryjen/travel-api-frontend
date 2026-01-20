import { useEffect, useState } from "react";
import Awesomplete from "awesomplete";

function CountriesAutocomplete({ country, handleChange }) {
    const [allCountries, setAllCountries] = useState([]);
    useEffect(() => {
        if (allCountries.length > 0) return;
        fetch('http://localhost:3000/api/countries')
            .then(response => response.json())
            .then(data => setAllCountries(data));
        const autocompleteInput = document.getElementById('country');
        // const handleChange = (event) => {
        //     const { name, value } = event.target;
        //     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        // };
        new Awesomplete(autocompleteInput, {
            list: allCountries,
            data: (item) => {
                return {
                    label: item.name,
                    value: item.id,
                };
            },
            minChars: 1,
            autoFirst: true,
        });
    }, [allCountries, handleChange]);

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
