import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import profileImage from "../logo.png";
import "../UserProfile.css";

const Profile = (props) => {
  console.log("props = ", props);

  return (
    <div>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />

      <div className="profile-container">
        <div className="profile-image-container">
          <img src={profileImage} alt="Profile" className="profile-image" />
        </div>

        <div className="resident-info">
          <div className="resident-info-row">
            <div className="resident-info-column">
              <h2 className="resident-info-heading">Name</h2>
              <p className="resident-info-text">John Doe</p>
            </div>
            <div className="resident-info-column">
              <h2 className="resident-info-heading">Phone Number</h2>
              <p className="resident-info-text">123-456-7890</p>
            </div>
          </div>

          <div className="resident-info-row">
            <div className="resident-info-column">
              <h2 className="resident-info-heading">Email</h2>
              <p className="resident-info-text">john.doe@example.com</p>
            </div>
            <div className="resident-info-column">
              <h2 className="resident-info-heading">Address</h2>
              <p className="resident-info-text">123 Street, City, State</p>
            </div>
          </div>
        </div>

        <div className="button-container">
          <Link className="btn btn-primary mx-2" to="/EditResident">
            Edit
          </Link>
          <button className="back-button">Back</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
