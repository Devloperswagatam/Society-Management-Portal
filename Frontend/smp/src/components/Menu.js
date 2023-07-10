import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Events from "./Events";
import Voting from "./Voting";
import Bulletin from "./Bulletin";
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";
import Account from "./Account";
import Suggestion from "./Suggestion";
import Complaint from "./Complaint";
import ComplaintHandler from "./committee/ComplaintHandler";
import SuggestionHandler from "./committee/SuggestionHandler";
import VotingHandler from "./committee/VotingHandler";
import BulletinHandler from "./committee/BulletinHandler";
import AccountHandler from "./committee/AccountHandler";
import PeopleList from "./ContactPeopleList";
import EditResidentForm from "./EditResident";
const Menu = () => {
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      console.log("Hello from Ksh");
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Login />} />
      </Routes>

      {/* <Navbar /> */}

      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/bulletin" element={<Bulletin />} />
        <Route path="/account" element={<Account />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/suggestion" element={<Suggestion />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/complaintHandler" element={<ComplaintHandler />} />
        <Route path="/suggestionHandler" element={<SuggestionHandler />} />
        <Route path="/votingHandler" element={<VotingHandler />} />
        <Route path="/bulletinHandler" element={<BulletinHandler />} />
        <Route path="/accountHandler" element={<AccountHandler />} />
        <Route path="/ContactPeopleList" element={<PeopleList />} />
        <Route path="/EditResident" element={<EditResidentForm />} />
      </Routes>
    </Router>
  );
};

export default Menu;
