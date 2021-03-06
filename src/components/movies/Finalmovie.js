import React, { useEffect, useState, useRef } from "react";
import backv from "../../images/backvid1.mp4";
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
        const newData = data.slice(0, 12);
        for (let i = 0, len = newData.length; i < len; i++) {
          // regex
          newData[i][2] = newData[i][2].replace(/['"]+/g, "");
          newData[i][2] = newData[i][2].slice(1, -1);
          newData[i][6] = newData[i][6].replace(/['"]+/g, "");
          newData[i][6] = newData[i][6].slice(1, -1);
          newData[i][4] = newData[i][4].replace(/['"]+/g, "");
          newData[i][4] = newData[i][4].slice(1, -1);
          newData[i][5] = newData[i][5].replace(/['"]+/g, "");
          newData[i][5] = newData[i][5].slice(1, -1);
        }
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
              rateData.push({ movieId: movie[0], Rating: 0 });
              myRef.current = rateData;
              const movieId = movie[0];
              // console.log(movieId);
              return (
                <CCol key={movieId}>
                  <CCard className="final_card">
                    <CCardImage
                      className="movie-cover-img"
                      orientation="top"
                      src={movie[15]}
                    />

                    <CCardBody className="cards-body">
                      <CCardTitle className="cards-title">{movie[1]}</CCardTitle>
                      <div className="button-card-div">
                        <div className="rate_current">
                          Current Rating{" "}
                          <CBadge color="danger"> {movie[13]}</CBadge>
                        </div>

                        <CButton
                          color="dark"
                          onClick={() => {
                            setVisibleXL(!visibleXL);
                            setModalData(movie);
                          }}
                        >
                          Details
                        </CButton>
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
            Back to Home Page
          </CButton>
        </CButtonGroup>
      </div>
      {/* modal */}
      <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
        <CModalHeader>
          <CModalTitle>{modalData[1]}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="modal-flex">
            <div className="modal-flex-left">
              <img src={modalData[15]} className="modal-img" alt="" />
            </div>
            <div className="modal-flex-right">
              <CBadge color="primary">{modalData[2]}</CBadge>
              <span> </span>
              <CBadge color="danger">{modalData[7]}</CBadge>
              <CAlert color="primary">
                <h5>Cast</h5> {modalData[6]}
              </CAlert>
              <CAlert color="info">
                <strong>Director: </strong>
                {modalData[5]}
              </CAlert>
              <CCallout color="dark">{modalData[4]}</CCallout>
            </div>
          </div>
          <br />
        </CModalBody>
      </CModal>

      {/* end modal */}
    </div>
  );
}

export default Finalmovie;
