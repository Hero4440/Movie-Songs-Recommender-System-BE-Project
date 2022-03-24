import React, { useEffect, useState, useRef } from "react";
import backv from "../../images/backvid1.mp4";
import { CIcon } from '@coreui/icons-react';
import { cifAU } from '@coreui/icons';
import {
  CListGroup,
  CButton,
  CFormRange,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CToaster,
  CButtonGroup,
  CCardImage,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CBadge,
  CAlert,
  CCallout,
  CToast,
  CToastHeader,
  CToastBody,
  CCardText,
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
    fetch("/songs_popularity").then((response) =>
      response.json().then((data) => {
        const newData = data.slice(0, 12);
       
        console.log(newData);
        setMovies(newData);
      })
    );
  }, []);
  console.log(modalData);

  function handleChange(e, bookId) {
    
    for (let i = 0, len = myRef.current.length; i < len; i++) {
      if (bookId === myRef.current[i]["bookId"]) {
        myRef.current[i]["Rating"] = parseInt(e.target.value);
        // console.log(myRef.current[i]["Rating"]);
      }
    }
    // console.log(myRef.current);
  }
  // function genre(data) {
  //   return data;
  // }

  // toast
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const exampleToast = (
    <CToast title="Warning">
      <CToastHeader close>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#F76E11"></rect>
        </svg>
        <strong className="me-auto">WARNING</strong>
        <small>exception Occured</small>
      </CToastHeader>
      <CToastBody>Please Atleast Rate One Movie!!!</CToastBody>
    </CToast>
  );
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
                  <CCard className="song_card">
                    {/* <CCardImage
                      className="movie-cover-img"
                      orientation="top"
                      src={movie[5]}
                    /> */}

                    <CCardBody className="song_cards-body">
                      <CCardTitle className="cards-title">
                        {movie[1]}
                      </CCardTitle>

                      <CCardText className="artist-name" >
                        {movie[2]}
                      </CCardText>

                      <div className="release-year">
                        <CCardText>
                          {movie[4]}
                        </CCardText>
                      </div>

                      <div className="button-card-div song_popularity">
                        <div className="rate_current ">
                          Popularity{" "}
                          <CBadge color="danger"> {movie[3]}</CBadge>
                        </div>


                      
                        <CButton 
                          color="dark"
                          onClick={() => {
                            setVisibleXL(!visibleXL);
                           
                            // setModalData(movie);
                          }}
                          href={movie[18]} target="_blank"
                        >
                          Spotify
                        </CButton>
                      </div>
                      <CFormRange
                        onChange={(e) => handleChange(e, bookId)}
                        min="0"
                        max="5"
                        defaultValue="0"
                        id="customRange2"
                      />
                      <CBadge color="warning">
                        0 <span> to </span> 5
                      </CBadge>
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
            Back
          </CButton>
          <CButton
            color="success"
            onClick={async () => {
              // change later
              let flag = 0;
              const rated = myRef.current;
              console.log(rated);
              for (let i = 0; i < rated.length; i++) {
                console.log(rated[i].Rating);
                if (rated[i].Rating !== 0) {
                  flag = 1;
                }
              }
              if (flag === 1) {
                const response = await fetch("/recommendsong", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(rated),
                });
                if (response.ok) {
                  console.log("response worked");
                  history.push("/recommend_book");
                } else {
                  console.log("error");
                }
              } else {
                addToast(exampleToast);
                console.log("errrrr");
              }
            }}
          >
            submit
          </CButton>
        </CButtonGroup>
      </div>
      {/* modal */}
      {/* <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
        <CModalHeader>
          <CModalTitle>{modalData[2]}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="modal-flex">
            <div className="modal-flex-left">
              <img src={modalData[5]} className="modal-img" alt="" />
            </div>
            <div className="modal-flex-right">
              <CBadge color="primary">{modalData[3]}</CBadge>
              <span> </span>
              <CBadge color="danger">{modalData[6]}</CBadge>
              <CAlert color="primary">
                <h5>Artist</h5> {modalData[2]}
              </CAlert>
              <CAlert color="info">
                <strong>Release year: </strong>
                {modalData[4]}
              </CAlert>
              
            </div>
          </div>
          <br />
        </CModalBody>
      </CModal>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      end modal */}
    </div>
  );
}

export default Moviehome;
