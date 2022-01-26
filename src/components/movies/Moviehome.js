import React, { useEffect, useState } from "react";
import { CListGroup, CListGroupItem, CButton } from "@coreui/react";

function Moviehome() {
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
              <h5>movie description {movie[4]}</h5>
            </CListGroupItem>
          );
        })}
      </CListGroup>
      <CButton
        color="primary"
        onClick={async () => {
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
    </div>
  );
}

export default Moviehome;
