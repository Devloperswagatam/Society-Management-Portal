import React, { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import ApiService from "./services/ApiService";
import Navbar from "./Navbar";
import { Card } from "react-bootstrap";
import "./componentCSS/Home.css";
const Home = () => {



  // const totalAmount = useContext(AccountContext);

  const apiService = new ApiService();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const checkLoginStatus = async () => {
    // const apiService = new ApiService();
    try {
      const response = await apiService.getLoggedResident();
      const resident = response.data;
      // console.log(response.data);
      setIsLoggedIn(true);
      setRole(resident.role);
      setName(resident.name);
      sessionStorage.setItem("rid",resident.rid);
      sessionStorage.setItem("role", resident.role);
      sessionStorage.setItem("name", resident.name);
      sessionStorage.setItem("isLoggedIn", true);
    } catch (error) {
      setIsLoggedIn(false);
      setRole("");
      setName("");
    }
  };


  // checkLoginStatus();
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <>
      <Navbar role={role} isLoggedIn={isLoggedIn} name={name} />
      <h1>Society Portal</h1>
      <div className="cardContainer">
      <Card
            key={sessionStorage.getItem("rid")}
            style={{
              width: "40rem",
              marginBottom: "20vh",
              padding: "1rem",
            }}
          >
            <Card.Body>
              <Card.Title style={{ textAlign: "center", fontSize: "4rem" }}>
                Monthly Duo
              </Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
                style={{ fontSize: "2rem" }}
              >
                {props.totalamount}
              </Card.Subtitle>
              <Card.Text style={{ fontSize: "1.5rem" }}>
                {}
              </Card.Text>
              <Card.Link href="/account" style={{ fontSize: "1.2rem" }}>
                View
              </Card.Link>
            </Card.Body>
          </Card>
          <Card
            key={sessionStorage.getItem("rid")}
            style={{
              width: "40rem",
              marginBottom: "20vh",
              padding: "1rem",
            }}
          >
            <Card.Body>
              <Card.Title style={{ textAlign: "center", fontSize: "4rem" }}>
                Events
              </Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
                style={{ fontSize: "2rem" }}
              >
                {}
              </Card.Subtitle>
              <Card.Text style={{ fontSize: "1.5rem" }}>
                {}
              </Card.Text>
              <Card.Link href="/events" style={{ fontSize: "1.2rem" }}>
                View
              </Card.Link>
            </Card.Body>
          </Card>
          <Card
            key={sessionStorage.getItem("rid")}
            style={{
              width: "40rem",
              marginBottom: "20vh",
              padding: "1rem",
            }}
          >
            <Card.Body>
              <Card.Title style={{ textAlign: "center", fontSize: "4rem" }}>
                Voting Event
              </Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
                style={{ fontSize: "2rem" }}
              >
                {}
              </Card.Subtitle>
              <Card.Text style={{ fontSize: "1.5rem" }}>
                {}
              </Card.Text>
              <Card.Link href="/voting" style={{ fontSize: "1.2rem" }}>
                View
              </Card.Link>
            </Card.Body>
          </Card>
      </div>
      
      <Carousel>
      <Carousel.Item>
      {/* <img src={secondSlide} alt="home" className="second-slide" /> */}
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      {/* <img src={thirdSlide} alt="home" className="third-slide" /> */}

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      {/* <img src={fourthSlide} alt="home" className="fourth-image" /> */}

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
     
    </>
  );
};

export default Home;
