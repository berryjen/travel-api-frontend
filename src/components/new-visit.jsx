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
  const [resetKey, setResetKey] = useState(0);
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
    let handled = false;
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
        handled = true;
        throw new Error(errorText);
      }
      const json = await response.json();
      showMessage(json.message || "Visit created successfully!", "success");
      setFormData({
        country_id: "",
        arrival_time: "",
        departure_time: "",
      });
      setResetKey((prev) => prev + 1);
    }
    catch (error) {
      console.error(error);
      if (!handled) {
        showMessage("Something went wrong. Please try again.", "error");
      }
    }
  };
  return (
    <>
      <h1>Hi {userName}, you have travelled to the following places:</h1>
      <ul></ul>
      {statusMessage && (
        <div
          role="alert"
          style={{
            padding: "12px 16px",
            marginBottom: "16px",
            borderRadius: "6px",
            fontWeight: "bold",
            color: statusMessage.type === "success" ? "#155724" : "#721c24",
            backgroundColor: statusMessage.type === "success" ? "#d4edda" : "#f8d7da",
            border: `1px solid ${statusMessage.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
          }}
        >
          {statusMessage.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="country">
          Enter country:{" "}
          <CountriesAutocomplete key={resetKey} onChange={handleChange} />
        </label>
        <label htmlFor="arrivalTime">
          Enter arrival time:
          <input
            type="datetime-local"
            id="arrivalTime"
            name="arrival_time"
            required
            value={formData.arrival_time}
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
            value={formData.departure_time}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
      <LogoutButton setUserName={setUserName} />
    </>
  );
}
