import React, {useState} from "react";
import {Card, Button, Alert} from 'react-bootstrap'
import { useAuth } from "../../AuthContext";
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
import { Link } from "react-router-dom";


function Home() {
  const [error, setError] = useState("")
  const {currentUser, logout} = useAuth()
  const history=  useHistory()

  async function handleLogout(){
    setError('')

    try{
      await logout()
      history.push('/login')

    }catch{
      setError('Failed to log out')

    }

  }
 

  return (
    <div className="home">
      <h1 className="home-heading">Multirater</h1>

      <CContainer>
        <CRow className="align-items-center">
          <CCol>
            <CCard className="home-card" style={{ width: "18rem" }}>
              <CCardImage orientation="top" src={movieimg} />
              <CCardBody className="home-body">
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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* <strong>Email:</strong> {currentUser.email} */}
         <Link to={"/update-profile"} className="btn btn-primary w-100 mt-3"></Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Log Out</Button>

      </div>
    </div>
  );
}

export default Home;
