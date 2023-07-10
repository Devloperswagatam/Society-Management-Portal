import React, { useEffect, useState } from "react";
import ApiService from "./services/ApiService";
import Navbar from "./Navbar";

const EditResidentForm = ({residentData}) => {
  const api = new ApiService();
  const [rid, setRid] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [wingNo, setWingNo] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [memberCount, setMemberCount] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
   
  useEffect((resident)=>{
    if(residentData){
      setRid(resident.rid);
      setName(resident.name);
      setPhoneNumber(resident.phoneNumber);
      setEmail(resident.email);
      setFlatNo(resident.flatNo);
      setFloorNo(resident.floorNo);
      setPassword(resident.password);
      setMemberCount(resident.memberCount);
      setRole(resident.role);
    }
  },[residentData])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const resident = {
      rid:rid,
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      wingNo: wingNo,
      floorNo: floorNo,
      flatNo: flatNo,
      memberCount: memberCount,
      password: password,
      role: role,
    };
    
    api
      .updateResident(resident)
      .then((response) => {
        console.log("Resident updated:", response.data);
        // Clear form fields after successful update
        setName("");
        setPhoneNumber("");
        setEmail("");
        setWingNo("");
        setFloorNo("");
        setFlatNo("");
        setMemberCount("");
        setPassword("");
        setRole("");
      })
      .catch((error) => {
        console.error("Error updating resident:", error);
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
      <div className="d-flex justify-content-end">
            </div>
        <h2 className="text-center m-4">Edit Resident</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="wingNo">Wing Number:</label>
            <input
              type="text"
              className="form-control"
              id="wingNo"
              value={wingNo}
              onChange={(e) => setWingNo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="floorNo">Floor Number:</label>
            <input
              type="text"
              className="form-control"
              id="floorNo"
              value={floorNo}
              onChange={(e) => setFloorNo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="flatNo">Flat Number:</label>
            <input
              type="text"
              className="form-control"
              id="flatNo"
              value={flatNo}
              onChange={(e) => setFlatNo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="memberCount">Member Count:</label>
            <input
              type="number"
              className="form-control"
              id="memberCount"
              value={memberCount}
              onChange={(e) => setMemberCount(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              className="form-control"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
      </div>
      </div>
    </>
  );
};

export default EditResidentForm;
