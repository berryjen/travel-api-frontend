import { useEffect, useState } from "react";
import "./App.css";
import NewVisit from "./components/new-visit";
import ViewVisit from "./components/view-visit";
import LoginPage from "./components/login-page";
import LogoutButton from "./components/logout-button";
import SignupPage from "./components/singup-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const loadSessionUser = async () => {
      try {
        const response = await fetch('/api/authentication/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          setUserName(null);
          return;
        }

        const json = await response.json();
        setUserName(json?.user?.name ?? null);
      } catch (error) {
        console.error('Failed to restore session user:', error);
        setUserName(null);
      }
    };

    loadSessionUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage setUserName={setUserName} />} />
        <Route path='/login' element={<LoginPage setUserName={setUserName} />} />
        <Route path='/signup' element={<SignupPage setUserName={setUserName} />} />
        <Route path='/new-visit' element={<NewVisit userName={userName} setUserName={setUserName} />} />
        <Route path='/view-visit' element={<ViewVisit userName={userName} />} />
        <Route path='/logout' element={<LogoutButton setUserName={setUserName} />} />
      </Routes>
    </Router>
  );
}

export default App;
