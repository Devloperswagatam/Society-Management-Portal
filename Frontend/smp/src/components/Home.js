import React, { useState, useEffect } from "react";
import ApiService from "./services/ApiService";
import Navbar from "./Navbar";

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
    </>
  );
};

export default Home;
