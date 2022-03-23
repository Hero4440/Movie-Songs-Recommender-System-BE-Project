import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Moviehome from "./components/movies/Moviehome.js";
import Songhome from "./components/songs/Songs.js";
import Bookshome from "./components/books/Books.js";
import Home from "./components/home/Home.js";
import Finalmovie from "./components/movies/Finalmovie.js";
import Finalbook from "./components/books/Finalbook.js";

import "./App.css";
import Signup from "./Signup.js";
import Login from "./Login.js"
import PrivateRoute from "./PrivateRoute.js";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./AuthContext.js";
import ForgotPassword from "./ForgotPassword.js";
import UpdateProfile from "./UpdateProfile.js";
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
      <AuthProvider>
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <PrivateRoute exact path="/" element={<Home />}>
              <Home /> 
            </PrivateRoute>

           
            <Route path="/signup" component={Signup}>
              
              <Container
              className="d-flex align-items-center justify-content-center"
              style={{minHeight:"100vh"}}
              >
                <div className="W=100" style={{maxWidth:"400px"}}>
              <Signup /> 
              </div>
              </Container>
             
              </Route>
          

            
            <Route path="/login" component={Login}>
              
              <Container
              className="d-flex align-items-center justify-content-center"
              style={{minHeight:"100vh"}}
              >
                <div className="W=100" style={{maxWidth:"400px"}}>
              <Login /> 
              </div>
              </Container>
              </Route>

              <Route path="/forgot-password" component={ForgotPassword}></Route>
            
              <PrivateRoute path="/update-profile" component={UpdateProfile}></PrivateRoute>
            
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

            <Route exact path="/recommend_book" element={<Finalbook />}>
              <Finalbook />
            </Route>

          </Switch>
        </React.Suspense>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
