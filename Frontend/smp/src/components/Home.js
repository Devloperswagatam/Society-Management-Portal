import React, { useState, useEffect, useContext } from "react";
import ApiService from "./services/ApiService";
import Navbar from "./Navbar";
import { Card } from "react-bootstrap";
import "./componentCSS/Home.css";

const Home = () => {
  // console.log(`Total maount is ${props.totalAmount}`);
  // const totalAmount = useContext(AccountContext);

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

  // const checkPendingAmount = async () => {
  //   const response = await apiService.getPendingAmount();
  //   const totalAmount = response.data;
  //   setTotalAmount(totalAmount);
  // };

  // checkLoginStatus();
  useEffect(() => {
    checkLoginStatus();
    // checkPendingAmount();
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
              {totalAmount}
            </Card.Subtitle>
            <Card.Text style={{ fontSize: "1.5rem" }}>{}</Card.Text>
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
            <Card.Text style={{ fontSize: "1.5rem" }}>{}</Card.Text>
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
            <Card.Text style={{ fontSize: "1.5rem" }}>{}</Card.Text>
            <Card.Link href="/voting" style={{ fontSize: "1.2rem" }}>
              View
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Home;
