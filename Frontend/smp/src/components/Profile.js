import React from "react";
import Navbar from "./Navbar";

const Profile = () => {
  return (
    <div>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      Profile
    </div>
  );
};

export default Profile;
