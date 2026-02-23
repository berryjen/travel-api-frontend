import { useState } from "react";
import LogoutButton from "./logout-button";
import CountriesAutocomplete from "./countries-autocompletion";
// import awesomplete from "awesomplete";

export default function NewVisit({ userName, setUserName }) {
  console.log('new visit user name', userName, setUserName);
  const [formData, setFormData] = useState({
    country_id: "",
    arrival_time: "",
    departure_time: "",
  });
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const showMessage = (text, type) => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/visits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorText = errorData?.message || `Request failed with status ${response.status}`;
        showMessage(errorText, "error");
        throw new Error(errorText);
      }
      const json = await response.json();

      console.log(json);

      showMessage(json.message || "Visit created successfully!", "success");
      setFormData({
        country_id: "",
        arrival_time: "",
        departure_time: "",
      });
    }
    catch (error) {
      console.error(error);
      if (!statusMessage || statusMessage.type !== "error") {
        showMessage("Something went wrong. Please try again.", "error");
      }
    }
  };
  return (
    <>
      <h1>Hi {userName}, you have travelled to the following places:</h1>
      <ul></ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="country">
          Enter country:{" "}
          <CountriesAutocomplete onChange={handleChange} />
        </label>
        <label htmlFor="arrivalTime">
          Enter arrival time:
          <input
            type="datetime-local"
            id="arrivalTime"
            name="arrival_time"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="departureTime">
          Enter departure time:
          <input
            type="datetime-local"
            id="departureTime"
            name="departure_time"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <button type="submit" >Submit</button>
      </form>
      <LogoutButton setUserName={setUserName} />
    </>
  );
}
