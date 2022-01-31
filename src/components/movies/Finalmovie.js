import React, { useEffect } from "react";

function Finalmovie() {
  useEffect(() => {
    fetch("/movie_result").then((response) =>
      response.json().then((data) => {
        console.log("hello");
        console.log(data);
      })
    );
  }, []);
  return <div>Final</div>;
}

export default Finalmovie;
