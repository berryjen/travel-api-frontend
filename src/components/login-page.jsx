import { useState } from "react";

const LoginPage = ({ setUserName }) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');


  const getToken = async () => {
    // need to configure the backend authorization to allow request to this endpt without authentication (done)
    const url = `http://localhost:3000/api/tokens/${inputName}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log("token received",json);
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
    getToken()
  };

  return (
    <div className="login-container">
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
      <div>
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
            placeholder="Type your passowrd here"
          />
        </label>
      </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
