import React, { useEffect, useState, useRef } from "react";
import backv from "../../images/backvid1.mp4";
import spotify from "../../images/spotify.png";
import {
  CListGroup,
  CButton,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardImage,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CBadge,
  CAlert,
  CCallout,
  CButtonGroup,
  CCardText,
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
    fetch("/song_result").then((response) =>
      response.json().then((data) => {
        const newData = data.slice(0, 12);
        console.log(newData);
        setMovies(newData);
      })
    );
  }, []);
  // console.log(myRef.current);

  return (
    <div className="movie-home">
      <video className="background-css" loop autoPlay>
        <source src={backv} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <CListGroup>
        <CContainer>
          <CRow>
            {movies.map((movie) => {
              rateData.push({ bookId: movie[0], Rating: 0 });
              myRef.current = rateData;
              const bookId = movie[0];
              // console.log(bookId);
              return (
                <CCol key={bookId}>
                  <CCard className="song_card-recommendation">
                    {/* <CCardImage
                    className="movie-cover-img"
                    orientation="top"
                    src={movie[5]}
                  /> */}

                    <CCardBody className="song_cards-body">
                      <CCardTitle className="cards-title">
                        {movie[1]}
                      </CCardTitle>

                      <CCardText className="artist-name">{movie[2]}</CCardText>

                      <div className="release-year">
                        <CCardText>{movie[4]}</CCardText>
                      </div>

                      <div className="button-card-div song_popularity">
                        <div className="rate_current ">
                          Popularity <CBadge color="danger"> {movie[3]}</CBadge>
                        </div>

                        <a href={movie[18]} target="blank">
                          <img
                            alt="spotify"
                            className="spotify"
                            orientation="top"
                            src={spotify}
                          />
                        </a>
                      </div>
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
        <CButtonGroup role="group" aria-label="Basic mixed styles example">
          <CButton color="danger" onClick={() => history.push("/")}>
            Back to home page
          </CButton>
        </CButtonGroup>
      </div>
    </div>
  );
}

export default Finalmovie;
