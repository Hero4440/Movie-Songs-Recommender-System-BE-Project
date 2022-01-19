import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  return (
    <div>
      <button type="button" onClick={() => history.push("/movies")}>
        Movies
      </button>
      <button type="button" onClick={() => history.push("/songs")}>
        Songs
      </button>
      <button type="button" onClick={() => history.push("/books")}>
        Books
      </button>
    </div>
  );
}

export default Home;
