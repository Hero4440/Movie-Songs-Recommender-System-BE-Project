import React, { useEffect, useState, useRef } from "react";
import movieimg from "../../images/movie.png";
import {
  CListGroup,
  CButton,
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

function Finalmovie() {
  const history = useHistory();
  const [movies, setMovies] = useState([]);
  const [visibleXL, setVisibleXL] = useState(false);
  // modal
  const [modalData, setModalData] = useState([]);
  // Use Ref
  const myRef = useRef([]);
  const rateData = [];
  useEffect(() => {
    fetch("/movie_result").then((response) =>
      response.json().then((data) => {
        setMovies(data.slice(0, 10));
        console.log(data);
      })
    );
  }, []);
  // console.log(myRef.current);

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
                    <CCardImage orientation="top" src={movieimg} />
                    <CCardBody>
                      <CCardTitle>{movie[1]}</CCardTitle>
                      <CCardText>
                        <CButton shape="rounded-pill" color="secondary">
                          Rating <CBadge color="danger"> {movie[13]}</CBadge>
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
                        Recommended Movie
                      </CFormLabel>
                    </CCardBody>
                  </CCard>
                </CCol>
              );
            })}
          </CRow>
          {/* </CCard> */}
        </CContainer>
      </CListGroup>

      <CButton color="primary" onClick={() => history.push("/")}>
        Back to Home Page
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

export default Finalmovie;
