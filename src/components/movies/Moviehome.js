import React, { useEffect, useState } from "react";
import { CListGroup, CListGroupItem, CButton } from "@coreui/react";
import { useHistory } from "react-router-dom";
function Moviehome() {
  const history = useHistory();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("/movies_votes").then((response) =>
      response.json().then((data) => {
        setMovies(data.slice(0, 10));
      })
    );
  }, []);
  console.log(movies);
  return (
    <div>
      {movies.length}

      <CListGroup>
        {movies.map((movie) => {
          return (
            <CListGroupItem key={movie}>
              <h1>{movie[1]}</h1>
              <h2>Movie Id - {movie[0]}</h2>
              <h3>Movie rating{movie[13]}</h3>
              <h5>movie description {movie[4]}</h5>
            </CListGroupItem>
          );
        })}
      </CListGroup>
      <CButton
        color="primary"
        onClick={async () => {
          // change later
          const rated = { hello: 9 };
          const response = await fetch("/recommendmovie", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(rated),
          });
          if (response.ok) {
            console.log("response worked");
          }
        }}
      >
        submit
      </CButton>
      <CButton color="primary" onClick={() => history.push("/")}>
        Back
      </CButton>
    </div>
  );
}

export default Moviehome;
