import React from "react";
import Stockviewpage from "./components/Stockviewpage";

function App() {
  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          height: "80px",
          backgroundColor: "blue",
          color: "white",
          textAlign: "center",
          fontSize: "24px",
          paddingTop: "10px",
        }}
      >
        finanacial-tracker-app
      </div>
      <Stockviewpage />
    </div>
  );
}

export default App;
