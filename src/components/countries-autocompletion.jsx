import { useState, useEffect, useRef } from "react";
import Awesomplete from "awesomplete";
import '../awesomeplete.css';

function CountriesAutocomplete() {
    const [allCountries, setAllCountries] = useState([]);
    const inputRef = useRef(null); // Reference to the input element
    console.log(inputRef);
    const awesompleteRef = useRef(null); // To store the Awesomplete instance

    useEffect(() => {
        fetch('api/countries')
            .then(response => response.json())
            .then(data => {
                setAllCountries(data);
            })
            .catch(err => console.error("Fetch error:", err));
    }, []);

    useEffect(() => {
        if (!inputRef.current || allCountries.length === 0) return;

        if (!awesompleteRef.current) {
            awesompleteRef.current = new Awesomplete(inputRef.current, {
                minChars: 1,
                autoFirst: true,
                data: (item) => ({
                    label: item.name,
                    value: item.name,
                }),
            });
        }

        awesompleteRef.current.list = allCountries;

    }, [allCountries]);

    return (
        <div className="autocomplete-wrapper">
            <label htmlFor="country"></label>
            <input
                ref={inputRef}
                id="country"
                className="awesomplete"
                placeholder="Type a country..."
            />
        </div>
    );
}

export default CountriesAutocomplete;
