import { useState } from "react";
import "./App.css";
import NewVisit from "./components/new-visit";
import ViewVisit from "./components/view-visit";

function App() {
  return (
    <div>
      <NewVisit userName="user1" country="Canada" />

      <ViewVisit userName="user2" country="Canada" />
    </div>
  );
}

export default App;
