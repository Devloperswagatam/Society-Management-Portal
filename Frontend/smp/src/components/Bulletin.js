import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "./services/ApiService";
import Card from "react-bootstrap/Card";
import Navbar from "./Navbar";
import { BsTrash, BsPencil } from "react-icons/bs";
import "../components/componentCSS/Bulletin.css";
import { toast } from "react-toastify";

const Bulletin = () => {
  const api = new ApiService();
  const [bulletin, setBulletin] = useState([]);
  const role = sessionStorage.getItem("role");

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

  const handleDeleteBulletin = (id) => {
    api
      .deleteBulletin(id)
      .then(() => {
        toast.success("Bulletin deleted successfully", {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
        console.log(`Bulletin deleted successfully with id: ${id}`);
       
        getBulletins();
      })
      .catch((error) => {
        console.error(`Error deleting bulletin with id ${id}:`, error);
      });
  };

  return (
    <>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />

      <div className="bulletin">
        {bulletin.map((bulletin) => (
          <Card
            key={bulletin.id}
            className="bulletin-card"
            style={{
              width: "40rem",
              margin: "0 auto",
              marginTop: "20vh",
              padding: "2rem",
              position: "relative",
            }}
          >
            {role === "committee" && (
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  display: "flex",
                  alignItems: "center",
                  // gap:"0.5rem"
                }}
              >
                <BsTrash
                  size={20}
                  style={{ cursor: "pointer", marginRight: "10px" ,color:"red"}}
                  onClick={() => handleDeleteBulletin(bulletin.id)}
                />
                <Link to={`/EditBulletin/${bulletin.id}`}>
                  <BsPencil size={20} style={{ cursor: "pointer" }} />
                </Link>
              </div>
            )}

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
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Bulletin;
