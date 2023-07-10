import React, { useEffect, useState } from "react";
import ApiService from "./services/ApiService";
import Card from "react-bootstrap/Card";
import Navbar from "./Navbar";
import "../components/componentCSS/Bulletin.css"

const Bulletin = () => {
  const api = new ApiService();
  const [bulletin, setBulletin] = useState([]);

  useEffect(() => {
    getBulletins();
  }, []);

  const getBulletins = () => {
    api
      .getBulletins()
      .then((response) => {
        console.log(response.data);
        setBulletin(response.data);
      })
      .catch((error) => {
        console.log(`Error fetching bulletin`, error);
      });
  };

  return (
    <>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />

      {/* <div className=""> */}
      <div className="bulletin">
        {bulletin.map((bulletin) => (
          <Card
            key={bulletin.id}
            style={{
              width: "40rem",
              margin: "0 auto",
              marginTop: "20vh",
              padding: "2rem",
            }}
          >
            <Card.Body>
              <Card.Title style={{ textAlign: "center", fontSize: "4rem" }}>
                Bulletin Board
              </Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
                style={{ fontSize: "2rem" }}
              >
                {bulletin.name}
              </Card.Subtitle>
              <Card.Text style={{ fontSize: "1.5rem" }}>
                {bulletin.description}
              </Card.Text>
              <Card.Link href="#" style={{ fontSize: "1.2rem" }}>
                Card Link
              </Card.Link>
            </Card.Body>
          </Card>
        ))}
      </div>
      {/* </div> */}
    </>
  );
};

export default Bulletin;
