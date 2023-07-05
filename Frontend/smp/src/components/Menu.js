import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Events from "./Events";
import Voting from "./Voting";
import Bulletin from "./Bulletin";
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";
import Complaint from "./Complaint";
import Suggestion from "./Suggestion";
const Menu = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/bulletin" element={<Bulletin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/suggestion" element={<Suggestion />} />
        <Route path="/complaint" element={<Complaint />} />
      </Routes>
    </Router>
  );
};

export default Menu;
