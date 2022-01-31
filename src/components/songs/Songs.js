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

function Songs() {
  const history = useHistory();
  const [songs, setSongs] = useState([]);
  const [visibleXL, setVisibleXL] = useState(false);
  // modal
  const [modalData, setModalData] = useState([]);
  // Use Ref
  const myRef = useRef([]);
  const rateData = [];
  useEffect(() => {             
    /*To do change url */
    
    fetch("/movies_votes").then((response) =>
      response.json().then((data) => {
        setSongs(data.slice(0, 10));
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
            {songs.map((song) => {
              rateData.push({ movieId: song[0], Rating: 0 });
              myRef.current = rateData;
              // console.log(myRef);
              const movieId = song[0];
              // console.log(movieId);
              return (
                <CCol key={movieId}>
                  <CCard className="movie_card">
                    <CCardImage orientation="top" src={movieimg} />
                    <CCardBody>
                      <CCardTitle>{song[1]}</CCardTitle>
                      <CCardText>
                        <CButton className="rate_current" shape="rounded-pill" color="secondary">
                          Current Rating{" "}
                          <CBadge color="danger"> { song[13]}</CBadge>
                        </CButton>
                      </CCardText>

                      <CButton
                        onClick={() => {
                          setVisibleXL(!visibleXL);
                          setModalData( song);
                        }}
                      >
                        Details
                      </CButton>
                      <br />
                      <CFormLabel htmlFor="customRange2">
                        Rate Movies
                      </CFormLabel>
                      <CBadge color="warning"> 0-5 </CBadge>
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
            /*To do change */ 
            
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

export default Songs;
