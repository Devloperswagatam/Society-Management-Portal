import React from "react";
import Navbar from "../Navbar";

function AccountHandler() {
  return (
    <div>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      AccountHandler
    </div>
  );
}

export default AccountHandler;
