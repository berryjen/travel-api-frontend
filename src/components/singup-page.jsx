import { useState } from "react";

const SignupPage = ({ setUserName }) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

const registerUser = async () => {
    // where userName, email & password are passed to the backend
    // have to call backend /api/authentication/register 
    // specify it's POST that is used in fetch
    // pass in the JSON object with the specific data
    const url = `http://localhost:3000/api/authentication/register/`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log("user created",json);
      if (json.bearer_token) {
        console.log(json.userName);
        setUserName(inputName);
      }
    } catch (error) {
      console.error(error.message);
    }
  
}

  const handleSubmit = (e) => {
    e.preventDefault();
    // getToken()
    registerUser()
  };

  return (
    <div className="name-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">
          Enter your name:
          <input
            type="text"
            id="userName"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Type your name here"
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
    </div>
    

  );
};

export default SignupPage;
