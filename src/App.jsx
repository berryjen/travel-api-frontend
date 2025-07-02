import { useState } from "react";
import "./App.css";
import NewVisit from "./components/new-visit";
import ViewVisit from "./components/view-visit";
// import LoginPage from "./components/login-page";
import LogoutButton from "./components/logout-button";
import SignupPage from "./components/singup-page";

function App() {
  const [userName, setUserName] = useState(null);

  return (
    <div className="app-container">
      {!userName ? (
        // <LoginPage setUserName={setUserName} />
        <SignupPage setUserName={setUserName} />
      ) : (
        <div className="main-content">
          <NewVisit userName={userName} />
          <ViewVisit userName={userName} />
          <LogoutButton setUserName={setUserName} />
        </div>
      )}
    </div>
  );
}

export default App;
