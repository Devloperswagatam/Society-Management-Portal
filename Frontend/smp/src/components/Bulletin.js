import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "./services/ApiService";
import Card from "react-bootstrap/Card";
import Navbar from "./Navbar";
import Swal from 'sweetalert2';

import {
  BsTrash,
  BsPencilSquare,
} from "react-icons/bs";
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this bulletin!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .deleteBulletin(id)
          .then(() => {
            toast.success('Bulletin deleted successfully', {
              position: 'top-center',
              theme: 'colored',
              autoClose: 2000,
            });
            console.log(`Bulletin deleted successfully with id: ${id}`);
  
            getBulletins();
          })
          .catch((error) => {
            console.error(`Error deleting bulletin with id ${id}:`, error);
          });
      }
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
              Width: "30rem",
              height: "30rem",
              margin: "0 auto",
              marginTop: "20vh",
              padding: "1rem",
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
                  size={25}
                  style={{
                    cursor: "pointer",
                    marginRight: "10px",
                    color: "red",
                  }}
                  onClick={() => handleDeleteBulletin(bulletin.id)}
                />
                <Link to={`/EditBulletin/${bulletin.id}`}>
                  <BsPencilSquare size={25} style={{ cursor: "pointer" }} />
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
              <Card.Text
                className="card-description"
                style={{ fontSize: "1.5rem" }}
              >
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
