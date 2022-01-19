import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Moviehome from "./components/movies/Moviehome.js";
import Songhome from "./components/songs/Songs.js"
import "./App.css";
const loading = (
  <div class="ui segment">
    <p></p>
    <div class="ui active dimmer">
      <div class="ui loader"></div>
    </div>
  </div>
);
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
  return (
    <div className="App">
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/movies" element={<Moviehome />}>
              <Moviehome />
            </Route>
            <Route exact path="/songs" element={<Songhome />}>
              <Songhome />
            </Route>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
