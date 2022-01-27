import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    fetch("/movies_votes").then((response) =>
      response.json().then((data) => {
        setMovies(data.slice(0, 10));
      })
    );
  }, []);
  console.log(modalData);
  return (
    <div>
      <CListGroup>
        <CContainer>
          <CRow>
            {movies.map((movie) => {
              return (
                <CCol key={movie}>
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
                        Rate Movies 👇
                      </CFormLabel>

                      <CBadge color="warning"> 0->10 </CBadge>

                      <CFormRange
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
