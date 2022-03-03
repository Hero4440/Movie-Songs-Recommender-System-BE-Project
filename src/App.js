import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Moviehome from "./components/movies/Moviehome.js";
import Songhome from "./components/songs/Songs.js";
import Bookshome from "./components/books/Books.js";
import Home from "./components/home/Home.js";
import Finalmovie from "./components/movies/Finalmovie.js";
import Finalbook from "./components/books/Finalbook.js";

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
  // let history = useHistory();
  // const handleClick = () => {
  //   history.push("./pages/MyComponent");
  // };
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
            <Route exact path="/recommend_movie" element={<Finalmovie />}>
              <Finalmovie />
            </Route>
            <Route exact path="/songs" element={<Songhome />}>
              <Songhome />
            </Route>
            <Route exact path="/books" element={<Bookshome />}>
              <Bookshome />
            </Route>
            <Route exact path="/recommend_book" element={<Finalmovie />}>
              <Finalmovie />
            </Route>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
