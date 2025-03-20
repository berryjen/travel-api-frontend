import { useState } from "react";

const LoginPage = ({ setUserName }) => {
  const [inputName, setInputName] = useState('');

  const getToken = async () => {
    // need to configure the backend authorization to allow request to this endpt without authentication
    const url = `http://localhost:3000/api/tokens?user_name=${inputName}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
