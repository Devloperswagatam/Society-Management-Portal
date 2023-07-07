import React from "react";
import Navbar from "./Navbar";

const Register = () => {
  return (
    <h2>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      Register Page
    </h2>
  );
};

export default Register;
