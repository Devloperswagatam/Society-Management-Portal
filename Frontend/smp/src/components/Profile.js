import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import profileImage from "../images/logo.png";
import "../UserProfile.css";
import ApiService from "./services/ApiService";

const Profile = () => {
 const api = new ApiService();
  const [resident, setResident]=useState([]);
  useEffect(()=>{
    getLoggedResident();
  },[])
  const getLoggedResident=()=>{
    api.getLoggedResident()
    .then((response)=>{
      console.log(response.data);
      setResident(response.data);
    })
    .catch((error)=>{
      console.log("Error fetching the details:", error);
    })
  }
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
              <p className="resident-info-text">{resident.name}</p>
            </div>
            <div className="resident-info-column">
              <h2 className="resident-info-heading">Phone Number</h2>
              <p className="resident-info-text">{resident.phoneNumber}</p>
            </div>
          </div>

          <div className="resident-info-row">
            <div className="resident-info-column">
              <h2 className="resident-info-heading">Email</h2>
              <p className="resident-info-text">{resident.email}</p>
            </div>
            <div className="resident-info-column">
              <h2 className="resident-info-heading">Flat No</h2>
              <p className="resident-info-text">{resident.flatNo}</p>
            </div>
          </div>
          {/* <div className="resident-info-row">
            <div className="resident-info-column">
              <h2 className="resident-info-heading">Floor No</h2>
              <p className="resident-info-text">{resident.floorNo}</p>
            </div>
            <div className="resident-info-column">
              <h2 className="resident-info-heading">Wing No</h2>
              <p className="resident-info-text">{resident.wingNo}</p>
            </div>
          </div> */}
          {/* <div className="resident-info-row">
            <div className="resident-info-column">
              <h2 className="resident-info-heading">Member Count</h2>
              <p className="resident-info-text">{resident.memberCount}</p>
            </div>
            <div className="resident-info-column">
              <h2 className="resident-info-heading">Role</h2>
              <p className="resident-info-text">{resident.role}</p>
            </div>
          </div> */}
        </div>

        <div className="button-container">
          <Link className="btn btn-primary mx-2" to="/EditResident">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
