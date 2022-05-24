import React, { useEffect, useState, useRef } from "react";
import backv from "../../images/backvid1.mp4";
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
  CFormCheck,
  CFormSelect,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
function Moviehome() {
  const history = useHistory();
  const [movies, setMovies] = useState([]);
  const [visibleXL, setVisibleXL] = useState(false);
  // modal
  const [modalData, setModalData] = useState([]);
  const [filter, setFilter] = useState({
    Drama: false,
    Thriller: false,
    Comedy: false,
    Action: false,
    Crime: false,
  });
  // Use Ref
  const myRef = useRef([]);
  const rateData = [];
  useEffect(() => {
    fetch("/movies_votes").then((response) =>
      response.json().then((data) => {
        const newData = data.slice(0, 12);
        for (let i = 0, len = newData.length; i < len; i++) {
          // regex
          newData[i][2] = newData[i][2].replace(/['"]+/g, "");
          newData[i][2] = newData[i][2].slice(1, -1);
          newData[i][6] = newData[i][6].replace(/['"]+/g, "");
          newData[i][6] = newData[i][6].slice(1, -1);
          newData[i][5] = newData[i][5].replace(/['"]+/g, "");
          newData[i][5] = newData[i][5].slice(1, -1);
        }
        // console.log(newData);
        setMovies(newData);
      })
    );
  }, []);
  // console.log(modalData);'
  async function setFilterState(genre, genrevalue) {
    return await setFilter((prevstate) => ({
      ...prevstate,
      [genre]: genrevalue,
    }));
  }
  useEffect(() => {
    console.log(filter);
    fetch("/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filter }),
    });
  }, [filter]);
  async function handlemulFilter(e) {
    const genre = e.target.id;
    const genrevalue = e.target.checked;
    setTimeout(() => {
      return setFilterState(genre, genrevalue);
    }, 1000);
  }
  function handleChange(e, movieId) {
    for (let i = 0, len = myRef.current.length; i < len; i++) {
      if (movieId === myRef.current[i]["movieId"]) {
        myRef.current[i]["Rating"] = parseInt(e.target.value);
      }
    }
  }

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
      <h2 className="movie-heading">Please Rate Your Favorite Movies !!!</h2>

      <CListGroup>
        <div className="filter">
          {/* <CContainer > */}
          <CFormCheck
            inline
            id="Drama"
            onChange={(e) => handlemulFilter(e)}
            label="Drama"
          />
          <CFormCheck
            inline
            onChange={(e) => handlemulFilter(e)}
            id="Thriller"
            label="Thriller"
          />
          <CFormCheck
            inline
            onChange={(e) => handlemulFilter(e)}
            id="Comedy"
            label="Comedy"
          />
          <CFormCheck
            inline
            onChange={(e) => handlemulFilter(e)}
            id="Action"
            label="Action"
          />
          <CFormCheck
            inline
            onChange={(e) => handlemulFilter(e)}
            id="Crime"
            label="Crime"
          />
          {/* <option value="0">Please Select a genre to Filter </option>
              <option value="Drama">Drama</option>
              <option value="Thriller">Thriller</option>
              <option value="Comedy">Comedy</option>
              <option value="Action">Action</option>
              <option value="Crime">Crime</option>
              <option value="Adventure">Adventure</option>
              <option value="Romance">Romance</option>
              <option value="ScienceFiction">ScienceFiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Family">Family</option>
              <option value="History">History</option>
              <option value="War">War</option>
              <option value="Animation">Animation</option>
              <option value="Family">Family</option>
              <option value="History">History</option>
              <option value="War">War</option>
              <option value="Animation">Animation</option> */}
          {/* </CFormSelect> */}
        </div>
        {/* </CContainer> */}
        <CContainer>
          <CRow>
            {movies.map((movie) => {
              rateData.push({ movieId: movie[0], Rating: 0 });
              myRef.current = rateData;
              const movieId = movie[0];
              // console.log(movieId);
              return (
                <CCol key={movieId}>
                  <CCard className="movie_card">
                    <CCardImage
                      className="movie-cover-img"
                      orientation="top"
                      src={movie[15]}
                    />

                    <CCardBody className="cards-body">
                      <CCardTitle className="cards-title">
                        {movie[1]}
                      </CCardTitle>
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
                      <CFormRange
                        onChange={(e) => handleChange(e, movieId)}
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
      <CToaster ref={toaster} push={toast} placement="top-end" />
      {/* end modal */}
    </div>
  );
}

export default Moviehome;
