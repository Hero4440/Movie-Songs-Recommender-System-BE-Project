import React, { useEffect, useState, useRef } from "react";
import movieimg from "../../images/movie.png";
import {
  CListGroup,
  CButton,
  CFormRange,
  CFormLabel,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardImage,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CBadge,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
function Moviehome() {
  const history = useHistory();
  const [movies, setMovies] = useState([]);
  const [visibleXL, setVisibleXL] = useState(false);
  // modal
  const [modalData, setModalData] = useState([]);
  // Use Ref
  const myRef = useRef([]);
  const rateData = [];
  useEffect(() => {
    fetch("/movies_votes").then((response) =>
      response.json().then((data) => {
        setMovies(data.slice(0, 12));
      })
    );
  }, []);
  console.log(modalData);

  function handleChange(e, movieId) {
    // console.log(e.target.value);
    // console.log(myRef.current[0]);
    // console.log(movieId);
    // console.log(myRef.current[0]["movieId"]);
    for (let i = 0, len = myRef.current.length; i < len; i++) {
      if (movieId === myRef.current[i]["movieId"]) {
        myRef.current[i]["Rating"] = parseInt(e.target.value);
        // console.log(myRef.current[i]["Rating"]);
      }
    }
    // console.log(myRef.current);
  }

  return (
    <div className="movie-home">
      <CListGroup>
        <CContainer>
          <CRow>
            {movies.map((movie) => {
              rateData.push({ movieId: movie[0], Rating: 0 });
              myRef.current = rateData;
              // console.log(myRef);
              const movieId = movie[0];
              // console.log(movieId);
              return (
                <CCol key={movieId}>
                  <CCard className="movie_card">
                    <CCardImage
                      onClick={() => {
                        setVisibleXL(!visibleXL);
                        setModalData(movie);
                      }}
                      className="movie-cover-img"
                      orientation="top"
                      src={movie[15]}
                    />
                    <CCardBody>
                      <CCardTitle
                        onClick={() => {
                          setVisibleXL(!visibleXL);
                          setModalData(movie);
                        }}
                      >
                        {movie[1]}
                      </CCardTitle>
                      <CCardText>
                        <CButton
                          onClick={() => {
                            setVisibleXL(!visibleXL);
                            setModalData(movie);
                          }}
                          className="rate_current"
                          color="secondary"
                        >
                          Current Rating{" "}
                          <CBadge color="danger"> {movie[13]}</CBadge>
                        </CButton>
                      </CCardText>

                      {/* <CButton
                        onClick={() => {
                          setVisibleXL(!visibleXL);
                          setModalData(movie);
                        }}
                        >
                        Details
                      </CButton> */}

                      <CBadge color="info"> 0 to 5 </CBadge>
                      <CFormRange
                        onChange={(e) => handleChange(e, movieId)}
                        min="0"
                        max="5"
                        defaultValue="0"
                        id="customRange2"
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              );
            })}
          </CRow>
          {/* </CCard> */}
        </CContainer>
      </CListGroup>
      <div className="float-button">
        <CButton
          color="primary"
          onClick={async () => {
            // change later
            const rated = myRef.current;
            console.log(rated);
            const response = await fetch("/recommendmovie", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(rated),
            });
            if (response.ok) {
              console.log("response worked");
              history.push("/recommend_movie");
            } else {
              console.log("error");
            }
          }}
        >
          submit
        </CButton>
        <CButton color="primary" onClick={() => history.push("/")}>
          Back
        </CButton>
      </div>
      {/* modal */}
      <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
        <CModalHeader>
          <CModalTitle>{modalData[1]}</CModalTitle>
        </CModalHeader>
        <CModalBody>{modalData[2]}</CModalBody>
      </CModal>
      {/* end modal */}
    </div>
  );
}

export default Moviehome;
