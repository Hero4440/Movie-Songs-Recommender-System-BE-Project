import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);
  return <div className="App">Hello</div>;
}

export default App;
