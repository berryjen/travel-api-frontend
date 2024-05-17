import { useState } from "react";
export default function NewVisit({ userName }) {
  const [inputValue, setInputValue] = useState("");
  const [countryValue, setCountryValue] = useState("");

  const handleChange = (event) => {
    setCountryValue(event.target.value);
  };

  return (
    <>
      <h1>Hi {userName}, you have travelled to the following places:</h1>
      <ul></ul>
      <form>
        <label>
          Input Value:
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <p>Input Value: {inputValue}</p>
        <label htmlFor="country">
          Enter country:{" "}
          <input type="text" id="country" name="country_id" required />{" "}
        </label>
        <label htmlFor="arrivalTime">
          Enter arrival time:
          <input
            type="datetime-local"
            id="arrivalTime"
            name="arrival_time"
            required
          />
        </label>
        <label htmlFor="departureTime">
          Enter departure time:
          <input
            type="datetime-local"
            id="departureTime"
            name="departure_time"
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
// export default function NewVisit({ userName }) {
//   const NewVisit [userName, setUserName] = useState({});
//   const handleChnage = (event) => {

//   }
//     return (
//       <div>
//         <h1>Hi {userName}, you have travelled to the following places:</h1>
//         <ul></ul>
//       <p>
// +        <strong>Keep Exploring! </strong>
// -        <strong> Keep Exploring! </strong>
//       </p>
// +
//         <div className="form">
//           <label htmlFor="countryName">
//             Enter country:
//             <input type="text" id="country" name="country_id" required />
//           </label>
//           <label htmlFor="arrivalTime">
//             Enter arrival time:
//             <input
//               type="datetime-local"
//               id="arrivalTime"
//               name="arrival_time"
//               required
//             />
//           </label>
//           <label htmlFor="departureTime">
//             Enter departure time:
//             <input
//               type="datetime-local"
//               id="departureTime"
//               name="departure_time"
//               required
//             />
//           </label>
//           <input type="submit">Save</input>
//         </div>
//       </form>
//     </div>
//  );
// }
