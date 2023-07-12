import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import ApiService from "./services/ApiService";
import Navbar from "./Navbar";
import { Card } from "react-bootstrap";
import "./componentCSS/Home.css";
import firstphoto from "../images/photo1.jpg";
import secondphoto from "../images/photo2.jpg";
import thirdphoto from "../images/photo3.jpg";

const Home = () => {
  const apiService = new ApiService();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const checkLoginStatus = async () => {
    // const apiService = new ApiService();
    try {
      const response = await apiService.getLoggedResident();
      const resident = response.data;
      // console.log(response.data);
      setIsLoggedIn(true);
      setRole(resident.role);
      setName(resident.name);
      sessionStorage.setItem("rid", resident.rid);
      sessionStorage.setItem("role", resident.role);
      sessionStorage.setItem("name", resident.name);
      sessionStorage.setItem("isLoggedIn", true);
    } catch (error) {
      setIsLoggedIn(false);
      setRole("");
      setName("");
    }
  };

  const checkPendingAmount = async () => {
    const response = await apiService.getPendingAmount();
    const totalAmount = response.data;
      setTotalAmount(totalAmount);
  };

  // checkLoginStatus();
  useEffect(() => {
    checkLoginStatus();
    checkPendingAmount();
  }, []);

  return (
    <>
      <Navbar role={role} isLoggedIn={isLoggedIn} name={name} />

      <Carousel>
      <Carousel.Item>
      <img src={firstphoto} alt="home" className="second-slide" />
        <Carousel.Caption>
          <h3 style={{fontWeight:'700'}}>Society Building</h3>
          <p style={{fontWeight:'700'}}>A voluntary organization where any one can become a part and live as one family</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={secondphoto} alt="home" className="third-slide" />

        <Carousel.Caption>
          <h3 style={{fontWeight:'700'}}>Garden Area</h3>
          <p style={{fontWeight:'700'}}>Well-Manintained, with variety of flowers and plants to give you a soothing environment</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={thirdphoto} alt="home" className="fourth-image" />

        <Carousel.Caption>
          <h3 style={{fontWeight:'700'}}>Pool Area</h3>
          <p style={{fontWeight:'700'}}>
            A day will be not so hot during summer with the pool area at your residency.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

      <h1
        style={{ fontWeight: "700", paddingTop: "1rem", fontStyle: "italic" }}
      >
        KEWAT RESIDENCY
      </h1>
      <div className="cardContainer">
        <Card
          key={sessionStorage.getItem("rid")}
          style={{
            color:'#2f3640',
            width: "40rem",
            marginBottom: "20vh",
            padding: "1rem",
            borderRadius:'3em',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            backgroundColor:'#CAD3C8'
          }}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontSize: "3rem" }}>
              Monthly Due
            </Card.Title>
            <Card.Subtitle
              className="mb-2 text-muted"
              style={{ fontSize: "2rem" }}
            >
              {totalAmount}₹
            </Card.Subtitle>
            <Card.Text style={{ fontSize: "1.2rem" }}>
              PLEASE&nbsp;&nbsp;
              <Card.Link href="/account" style={{ fontSize: "1.2rem" }}>
                PAY
              </Card.Link>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          // key={sessionStorage.getItem("rid")}
          style={{
            color:'#2f3640',
            width: "40rem",
            marginBottom: "20vh",
            padding: "1rem",
            borderRadius:'3em',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            backgroundColor:'#CAD3C8'
          }}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontSize: "3rem" }}>
              Upcoming
            </Card.Title>
            {/* <Card.Subtitle
              className="mb-2 text-muted"
              style={{ fontSize: "2rem" }}
            >
              {}
            </Card.Subtitle> */}
            <Card.Text style={{ fontSize: "1.5rem" }}>Events</Card.Text>
            <Card.Link href="/events" style={{ fontSize: "1.2rem" }}>
              View
            </Card.Link>
          </Card.Body>
        </Card>
        <Card
          // key={sessionStorage.getItem("rid")}
          style={{
            color:'#2f3640',
            width: "40rem",
            marginBottom: "20vh",
            padding: "1rem",
            borderRadius:'3em',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            backgroundColor:'#CAD3C8'
          }}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontSize: "3rem" }}>
              Have any
            </Card.Title>
            {/* <Card.Subtitle
              className="mb-2 text-muted"
              style={{ fontSize: "2rem" }}
            >
              {}
            </Card.Subtitle> */}
            <Card.Text style={{ fontSize: "1.5rem" }}>complaints</Card.Text>
            <Card.Link href="/complaint" style={{ fontSize: "1.2rem" }}>
              Give
            </Card.Link>
          </Card.Body>
        </Card>
        <Card
          style={{
            color:'#2f3640',
            width: "40rem",
            marginBottom: "20vh",
            padding: "1rem",
            borderRadius:'3em',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            backgroundColor:'#CAD3C8'
          }}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontSize: "3rem" }}>
              New here
            </Card.Title>
            <Card.Text style={{ fontSize: "1.5rem" }}>View committee members</Card.Text>
            <Card.Link href="/committee" style={{ fontSize: "1.2rem" }}>
              View
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Home;
