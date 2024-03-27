function NewVisit({ userName }) {
  return (
    <div>
      <h1>Hi {userName}, you have travelled to the following places:</h1>
      <ul></ul>
      <p>
        <strong> Keep Exploring! </strong>
      </p>
      <form action="/" method="post" className="form">
        <div className="form">
          <label htmlFor="countryName">
            Enter country:
            <input type="text" id="country" name="country" />
          </label>
          <label htmlFor="arrivalTime">
            Enter arrival time:
            <input
              type="datetime-local"
              id="arrivalTime"
              name="arrivalTime"
              required
            />
          </label>
          <label htmlFor="departureTime">
            Enter departure time:
            <input
              type="datetime-local"
              id="departureTime"
              name="departureTime"
              required
            />
          </label>
          <button>Save</button>
        </div>
      </form>
    </div>
  );
}
export default NewVisit;
