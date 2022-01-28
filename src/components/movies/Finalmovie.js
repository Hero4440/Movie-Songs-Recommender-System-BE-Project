import React,{useEffect} from "react";

function Finalmovie() {
  useEffect(() => {
    fetch("/movies_votes").then((response) =>
      response.json().then((data) => {
        console.log(data);
      })
    );
  }, []);
  return <div>Final</div>;
}

export default Finalmovie;
