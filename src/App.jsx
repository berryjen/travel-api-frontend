import { useState } from "react";
import "./App.css";
import NewVisit from "./components/new-visit";
import ViewVisit from "./components/view-visit";
import LoginPage from "./components/login-page";
import LogoutButton from "./components/logout-button";
import SignupPage from "./components/singup-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [userName, setUserName] = useState(null);

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

      {/* <div className="app-container"> */}
      {/* {!userName ? (
          <LoginPage setUserName={setUserName} /> ||
          <SignupPage setUserName={setUserName} />
        ) : (
          <div className="main-content">
            <NewVisit userName={userName} />
            <ViewVisit userName={userName} />
            <LogoutButton setUserName={setUserName} />
          </div>
        )} */}
      {/* </div></> */}
    </Router>
  );
}

export default App;
