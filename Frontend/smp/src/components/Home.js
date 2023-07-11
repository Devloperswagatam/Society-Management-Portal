import React, { useState } from "react";
import ApiService from "./services/ApiService";
import Navbar from "./Navbar";
import "./componentCSS/Home.css";
import Carousel from 'react-bootstrap/Carousel';
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const checkLoginStatus = async () => {
    const apiService = new ApiService();
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

  checkLoginStatus();

  return (
    <>
      <Navbar role={role} isLoggedIn={isLoggedIn} name={name} />
      <h1>Home page</h1>
      
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
