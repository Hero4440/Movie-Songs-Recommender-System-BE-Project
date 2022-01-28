import React from "react";
import bookimg from "../../images/books.png";
import movieimg from "../../images/movie.png";
import songimg from "../../images/songs.png";

import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardImage,
  CCardText,
  CCardBody,
  CCardTitle,
  CContainer,
  CRow,
  CCol,
} from "@coreui/react";

function Home() {
  const history = useHistory();

  return (
    <div className="home">
      <h1 className="home-heading">Multirater</h1>

      <CContainer>
        <CRow className="align-items-center">
          <CCol>
            <CCard className="home-card" style={{ width: "18rem" }}>
              <CCardImage orientation="top" src={movieimg} />
              <CCardBody>
                <CCardTitle>Movies Recommender</CCardTitle>
                <CCardText>
                  I'm not looking for judgement, just a yes or no. Can you
                  assimilate a giraffe? I'll be with Reuben in my workshop while
                  you guys are having another day in Phil Collin's proverbial
                  paradise. It's not like we can do this every week, we get 3 or
                  4 more of these tops. Shadow Jacker, you haven't come out of
                  your masturbation cave in eons!
                </CCardText>
                <CButton
                  color="primary"
                  className="mov"
                  type="button"
                  onClick={() => history.push("/movies")}
                >
                  Movies
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol>
            <CCard className="home-card" style={{ width: "18rem" }}>
              <CCardImage orientation="top" src={songimg} />
              <CCardBody>
                <CCardTitle>Song Recommender</CCardTitle>
                <CCardText>
                  I'm not looking for judgement, just a yes or no. Can you
                  assimilate a giraffe? I'll be with Reuben in my workshop while
                  you guys are having another day in Phil Collin's proverbial
                  paradise. It's not like we can do this every week, we get 3 or
                  4 more of these tops. Shadow Jacker, you haven't come out of
                  your masturbation cave in eons!
                </CCardText>
                <CButton
                  color="primary"
                  className="mov"
                  type="button"
                  onClick={() => history.push("/songs")}
                >
                  Songs
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol>
            <CCard className="home-card" style={{ width: "18rem" }}>
              <CCardImage orientation="top" src={bookimg} />
              <CCardBody>
                <CCardTitle>Book Recommender</CCardTitle>
                <CCardText>
                  I'm not looking for judgement, just a yes or no. Can you
                  assimilate a giraffe? I'll be with Reuben in my workshop while
                  you guys are having another day in Phil Collin's proverbial
                  paradise. It's not like we can do this every week, we get 3 or
                  4 more of these tops. Shadow Jacker, you haven't come out of
                  your masturbation cave in eons!
                </CCardText>
                <CButton
                  color="primary"
                  className="mov"
                  type="button"
                  onClick={() => history.push("/books")}
                >
                  Books
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default Home;
