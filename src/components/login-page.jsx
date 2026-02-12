import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUserName }) => {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const login = async () => {
    const url = `/api/authentication/login`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: inputName,
          userEmail: inputEmail,
          userPassword: inputPassword,
        })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log('login JSON', json);
      if (json.user.name) {
        console.log(json.user.name);
        setUserName(json.user.name);
        navigate('/new-visit');
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login()
  };

  const handleSignUpClick = () => {
    navigate('/signup')
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
        <button type="button" onClick={handleSignUpClick}>Sign Up</button>
      </form>
    </div>
  );
};

export default LoginPage;
