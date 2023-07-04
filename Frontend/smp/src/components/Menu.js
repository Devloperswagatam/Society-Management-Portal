import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Events from "./Events";
import Voting from "./Voting";
import Bulletin from "./Bulletin";
import Complaint from "./Complaint";
import Suggestion from "./Suggestion";
import Account from "./Account";
import Login from "./Login";
import Logout from "./Logout";

const Menu = () => {
  // let isLoggedIn = sessionStorage.getItem("login");
  // console.log(isLoggedIn);

  return (
    // <div>
    //   <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    //     <a className="navbar-brand" href="/">
    //       Society Portal
    //     </a>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-toggle="collapse"
    //       data-target="#navbarSupportedContent"
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>

    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav mr-auto">
    //         <li className="nav-item active">
    //           <a className="nav-link" href="#">
    //             Home{" "}
    //           </a>
    //         </li>
    //         {isLoggedIn === "true" && (
    //           <>
    //             <li className="nav-item">
    //               <a className="nav-link" href="/events">
    //                 Events
    //               </a>
    //             </li>
    //             <li className="nav-item">
    //               <a className="nav-link" href="/voting">
    //                 Voting
    //               </a>
    //             </li>
    //             <li className="nav-item">
    //               <a className="nav-link" href="/bulletin">
    //                 Bulletin
    //               </a>
    //             </li>
    //             <li className="nav-item">
    //               <a className="nav-link" href="/complaint">
    //                 Complaint
    //               </a>
    //             </li>
    //             <li className="nav-item">
    //               <a className="nav-link" href="/suggestion">
    //                 Suggestion
    //               </a>
    //             </li>
    //             <li className="nav-item">
    //               <a className="nav-link" href="/account">
    //                 Accounts
    //               </a>
    //             </li>
    //           </>
    //         )}
    //         {isLoggedIn == "true" && (
    //           <li className="nav-item">
    //             <a className="nav-link" href="logout">
    //               Logout
    //             </a>
    //           </li>
    //         )}
    //       </ul>
    //     </div>
    //   </nav>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/bulletin" element={<Bulletin />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/suggestion" element={<Suggestion />} />
          <Route path="/account" element={<Account />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    // </div>
  );
};

export default Menu;
