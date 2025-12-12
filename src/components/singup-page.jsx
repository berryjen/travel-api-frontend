import { useState } from "react";
import { Link } from "react-router";

const SignupPage = ({ setUserName }) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState(null);

  const registerUser = async () => {
    // where userName, email & password are passed to the backend
    // have to call backend /api/authentication/register 
    // specify it's POST that is used in fetch
    // pass in the JSON object with the specific data
    const url = `http://localhost:3000/api/authentication/register`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inputName,
          userEmail: inputEmail,
          userPassword: inputPassword
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || `Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log("user created", json);
      setUserName(inputName);
    } catch (error) {
      console.error(error.message);
      throw error;
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await registerUser();
    } catch (error) {
      setError();
    }
  };



  return (
    <div className="name-container">
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label htmlFor="userName">
          Enter your name:
          <input
            type="text"
            id="userName"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Type your name here"
            required
          />
        </label>
        <div className="email-container">
          <label htmlFor="userEmail">
            Enter your email:
            <input
              type="email"
              id="userEmail"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder="Type your email here"
              required
            />
          </label>
        </div>

        <div>
          <label htmlFor="userPassword">
            Enter your password:
            <input
              type="password"
              id="userPassword"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="Type your password here"
            />
          </label>
        </div>
        <button type="submit">Signup</button>
      </form>
      <Link to="/login">
        <button type="button">Back to Login</button>
      </Link>
    </div>


  );
};

export default SignupPage;
