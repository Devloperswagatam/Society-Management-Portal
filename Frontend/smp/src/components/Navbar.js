import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "./services/ApiService";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [name,setName] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const apiService = new ApiService();
      try {
        const response = await apiService.getLoggedResident();
        const resident = response.data;
        console.log(response.data);
        setIsLoggedIn(true);
        setRole(resident.role);
        setName(resident.name);
      } catch (error) {
        setIsLoggedIn(false);
        setRole("");
        setName("");
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
                <li>
                  <DropdownButton
                    id="dropdown-basic-button"
                    variant="success"
                    title={`Hi ${name}`}
                  >
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item href="/complaint">Complaint</Dropdown.Item>
                    <Dropdown.Item href="/suggestion">Suggestion</Dropdown.Item>
                    <Dropdown.Item href="/account">Account</Dropdown.Item>
                    <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                  </DropdownButton>
                </li>
                {role === "committee" && (
                  <li>
                    <DropdownButton
                      id="dropdown-basic-button"
                      variant="success"
                      title="Committee"
                    >
                      <Dropdown.Item href="/complaintHandler">
                        Complaint
                      </Dropdown.Item>
                      <Dropdown.Item href="/suggestionHandler">
                        Suggestion
                      </Dropdown.Item>
                      <Dropdown.Item href="/accountHandler">
                        Account
                      </Dropdown.Item>
                      <Dropdown.Item href="/votingHandler">
                        Voting
                      </Dropdown.Item>
                    </DropdownButton>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
