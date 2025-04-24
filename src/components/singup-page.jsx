import { useState } from "react";

const SignupPage = ({ setUserName }) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

const registerUser = async () => {
    // where userName, email & password are passed to the backend
    // have to call backend /api/authentication/register 
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
