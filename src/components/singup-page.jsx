import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = ({ setUserName }) => {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const registerUser = async () => {
    const url = `/api/authentication/register`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: inputName,
        userEmail: inputEmail,
        userPassword: inputPassword,
      }),
    });

    if (!response.ok) {
      let errorMessage = `Response status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // Response body wasn't valid JSON (e.g. proxy error / empty body)
      }
      throw new Error(errorMessage);
    }

    const json = await response.json();
    if (json.user && json.user.name) {
      setUserName(json.user.name);
    }
  }

  // Log the user in after registration to establish a session cookie
  const loginUser = async () => {
    const url = `/api/authentication/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: inputName,
        userEmail: inputEmail,
        userPassword: inputPassword,
      }),
    });

    if (!response.ok) {
      let errorMessage = `Login after signup failed: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // non-JSON response
      }
      throw new Error(errorMessage);
    }

    const json = await response.json();
    if (json.user && json.user.name) {
      setUserName(json.user.name);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await registerUser();
      // await loginUser();
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/new-visit');
      }, 2000);
    } catch (error) {
      setError(error.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="name-container">
      {showSuccess && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <p style={popupTextStyle}>✅ You have successfully signed up!</p>
            <p style={popupSubTextStyle}>Redirecting you now...</p>
          </div>
        </div>
      )}

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
        <button type="submit" disabled={showSuccess}>Signup</button>
      </form>
      <Link to="/login">
        <button type="button">Back to Login</button>
      </Link>
    </div>
  );
};


const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const popupStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '2rem 2.5rem',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  animation: 'fadeIn 0.3s ease',
};

const popupTextStyle = {
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#1a1a1a',
  margin: '0 0 0.5rem',
};

const popupSubTextStyle = {
  fontSize: '0.95rem',
  color: '#666',
  margin: 0,
};

export default SignupPage;

