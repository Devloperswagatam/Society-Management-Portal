import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "./services/ApiService";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./componentCSS/Navbar.css";

const Navbar = (props) => {


  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-css">
      <div className="container">
        <Link className="navbar-brand" style={{fontWeight:'700',color:'#dcdde1'}}>
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
            {props.isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/events" >
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
                <li className="dropdown-resident">
                  <DropdownButton
                    // className="btn btn-primary"
                    variant="light-dark"
                    title={`Hi ${props.name}`}
                  >
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item href="/complaint">Complaint</Dropdown.Item>
                    <Dropdown.Item href="/suggestion">Suggestion</Dropdown.Item>
                    <Dropdown.Item href="/account">Account</Dropdown.Item>
                    <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                  </DropdownButton>
                </li>
                {props.role === "committee" && (
                  <li className="dropdown-committee">
                    <DropdownButton
                      // id="dropdown-committee"
                      variant="light-dark"
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
                      <Dropdown.Item href="/bulletinHandler">
                        Bulletin
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
