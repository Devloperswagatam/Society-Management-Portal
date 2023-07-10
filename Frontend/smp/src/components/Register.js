import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import ApiService from "./services/ApiService";
import { toast } from "react-toastify";

const Register = () => {
  const api = new ApiService();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wingNo, setWingNo] = useState("");
  const [flatNo,setFlatNo] = useState("");
  const [floorNo,setFloorNo] = useState("");
  const [memberCount,setMemberCount] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleWingNo = (e) => {
    setWingNo(e.target.value);
  };

  const handleFloorNO = (e) => {
    setFloorNo(e.target.value);
  };

  const handleFlatNo = (e) => {
    setFlatNo(e.target.value);
  };

  const handleMemberCount = (e) => {
    setMemberCount(e.target.value);
  };

  const handleAddResident = () => {
    const resident = {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      wingNo: wingNo,
      floorNo:floorNo,
      flatNo:flatNo,
      memberCount:memberCount
    };

    api
      .addResident(resident)
      .then((response) => {
        toast.success("Registration successfull",{
          position:'top-center',
          theme:'colored'
        });
        // Clear the input fields
        setName("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
        setWingNo("");
        setFloorNo("");
        setFlatNo("");
        setMemberCount("");
      })
      .catch((error) => {
        toast.error(error.response.data.message,{
          position:"top-center",
          theme:'colored'
        });
        // Handle the error if adding the voting event fails
        // console.error("Error adding voting event:", error);
      });
  };

  return (
    <>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h4 className="text-center m-4">Voting Page</h4>
            <form>
              <div className="mb-3">
                <label htmlFor="postName" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="candidate" className="form-label">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Description" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Your email"
                  value={email}
                  onChange={handleEmail}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Status" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePassword}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Status" className="form-label">
                  Wing No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter wing no"
                  value={wingNo}
                  onChange={handleWingNo}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Status" className="form-label">
                  Floor No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter floor no"
                  value={floorNo}
                  onChange={handleFloorNO}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Status" className="form-label">
                  Flat No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter flat no"
                  value={flatNo}
                  onChange={handleFlatNo}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Status" className="form-label">
                  Member Count:
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter member count"
                  value={memberCount}
                  onChange={handleMemberCount}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={handleAddResident}
              >
                Submit
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
