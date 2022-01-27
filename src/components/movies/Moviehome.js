import React, { useEffect, useState } from "react";
import movieimg from '../../images/movie.png'
import {
  CListGroup,
  CListGroupItem,
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
  
} 
from "@coreui/react";
import { useHistory } from "react-router-dom";
function Moviehome() {
  const history = useHistory();
  const [movies, setMovies] = useState([]);
  const [visibleXL, setVisibleXL] = useState(false)
// modal
const [modalData, setModalData] = useState([]);





  useEffect(() => {
    fetch("/movies_votes").then((response) =>
      response.json().then((data) => {
        setMovies(data.slice(0, 10));
      })
    );
  }, []);
  console.log(movies);
  return (
    <div>
      <CListGroup>
      <CContainer>
      <CRow>
        {movies.map((movie) => {
          

          return (
            <CCol key={movie}>
             
            <CCard className="movie_card" >
            <CCardImage orientation="top" src={movieimg} />
  <CCardBody>
    <CCardTitle>{movie[1]}</CCardTitle>
    <CCardText>
    Movie Id - {movie[0]}Movie rating{movie[13]}
    </CCardText>
    
{/* modal */}
  <CButton onClick={() => {setVisibleXL(!visibleXL);setModalData(movie);}}> Details</CButton>
     <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
      <CModalHeader>
        <CModalTitle>hello</CModalTitle>
      </CModalHeader>
      <CModalBody>...</CModalBody>
    </CModal>
{/* end modal */}
  <br/>
    <CFormLabel htmlFor="customRange2">Rate Movie</CFormLabel>
              <CFormRange min="0" max="10" defaultValue="5" id="customRange2" />
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
    </div>
  );
}

export default Moviehome;
