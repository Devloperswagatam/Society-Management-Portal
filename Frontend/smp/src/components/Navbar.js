import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "./services/ApiService";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const apiService = new ApiService();
      try {
        const response = await apiService.getLoggedResident();
        const resident = response.data;
        console.log(response.data);
        setIsLoggedIn(true);
        setRole(resident.role);
      } catch (error) {
        setIsLoggedIn(false);
        setRole("");
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Society Portal
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/events">
                    Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/voting">
                    Voting
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/bulletin">
                    Bulletin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/complaint">
                    Complaint
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/suggestion">
                    Suggestion
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/account">
                    Accounts
                  </Link>
                </li>
                {role === "committee" && (
                  <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Committee
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link class="dropdown-item" to="/profile">Profile</Link>
                    <Link class="dropdown-item" to="/accounthandler">Account Handler</Link>
                    <Link class="dropdown-item" to="/votinghandler">Voting Handler</Link>
                  </div>
                </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
