import React, { useState, useEffect } from "react";
import { useHistory, BrowserRouter, Route, Switch } from "react-router-dom";
import Moviehome from "./components/movies/Moviehome.js";
import Songhome from "./components/songs/Songs.js";
import Bookshome from "./components/books/Books.js";
import Home from "./components/home/Home.js";
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
  let history = useHistory();
  const handleClick = () => {
    history.push("./pages/MyComponent");
  };
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
            <Route exact path="/" element={<Home />}>
              <Home />
            </Route>
            <Route exact path="/movies" element={<Moviehome />}>
              <Moviehome />
            </Route>
            <Route exact path="/songs" element={<Songhome />}>
              <Songhome />
            </Route>
            <Route exact path="/books" element={<Bookshome />}>
              <Bookshome />
            </Route>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
