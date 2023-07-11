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
    <>
    <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />

    <div className="profile">
      <div className="profile-container">
        <div className="profile-image-container">
          <img src={profileImage} alt="Profile" className="profile-image" />
        </div>

        <div className="resident-info">
          <div className="resident-info-row">
            <div className="resident-info-column">
              {/* <h2 className="resident-info-heading">Name</h2> */}
              <p className="resident-info-text"><h3>Name:</h3> {resident.name}</p>
            </div>
            <div className="resident-info-column">
              {/* <h2 className="resident-info-heading">Email</h2> */}
              <p className="resident-info-text"><h3>Email:</h3> {resident.email}</p>
            </div>
            <div className="resident-info-column">
              {/* <h2 className="resident-info-heading">Phone Number</h2> */}
              <p className="resident-info-text"><h3>Phone Number:</h3> {resident.phoneNumber}</p>
            </div>
            
            <div className="resident-info-column">
              {/* <h2 className="resident-info-heading">Flat No</h2> */}
              <p className="resident-info-text"><h3>Flat No:</h3> {resident.flatNo}</p>
            </div>
          </div>
        </div>

        <div className="button-container">
          <Link className="btn btn-big mx-2" to="/EditResident" style={{width:'5rem',backgroundColor:'#2d98da',color:'#dcdde1', fontWeight:'700'}}>
            Edit
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
