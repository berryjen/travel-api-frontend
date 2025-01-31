import { useState } from "react";
import "./App.css";
import NewVisit from "./components/new-visit";
import ViewVisit from "./components/view-visit";
import LoginPage from "./components/login-page";

function App() {
  const [userName, setUserName] = useState(null);
  return (
    <div>
      {userName === null ? (
      <LoginPage userName={userName} setUserName={setUserName} /> 
      ) : (
        
          <><NewVisit userName={userName} country="" /><ViewVisit userName={userName} country="Canada" /></>
        
      )}
    </div>
  );
}

export default App;
