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
        setMovies(data.slice(0, 10));
      })
    );
  }, []);
  console.log(modalData);

  function handleChange(e, movieId) {
    console.log(e.target.value);
    console.log(myRef.current);
    console.log(movieId);
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
              console.log(movieId);
              return (
                <CCol key={movieId}>
                  <CCard className="movie_card">
                    <CCardImage orientation="top" src={movieimg} />
                    <CCardBody>
                      <CCardTitle>{movie[1]}</CCardTitle>
                      <CCardText>
                        <CButton shape="rounded-pill" color="secondary">
                          Current Rating{" "}
                          <CBadge color="danger"> {movie[13]}</CBadge>
                        </CButton>
                      </CCardText>

                      <CButton
                        onClick={() => {
                          setVisibleXL(!visibleXL);
                          setModalData(movie);
                        }}
                      >
                        Details
                      </CButton>
                      <br />
                      <CFormLabel htmlFor="customRange2">
                        Rate Movies
                      </CFormLabel>
                      <CBadge color="warning"> 0->10 </CBadge>
                      <CFormRange
                        onChange={(e) => handleChange(e, movieId)}
                        min="0"
                        max="10"
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
