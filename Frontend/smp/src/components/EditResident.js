import React, { useEffect, useState } from "react";
import ApiService from "./services/ApiService";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "./componentCSS/EditResident.css";
import { toast } from "react-toastify";
const EditResidentForm = () => {
  const api = new ApiService();

  const [resident, setResident] = useState({
    rid: "",
    name: "",
    phoneNumber: "",
    email: "",
    wingNo: "",
    flatNo: "",
    floorNo: "",
    memberCount: "",
    role: "",
  });
  useEffect(() => {
    loadResident();
  }, []);
  const handleChange = (e) => {
    setResident({ ...resident, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .updateResident(resident)
      .then(() => {
        toast.success("Resident Updated successfully", {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
        console.log("Resident updated successfully!");
      })
      .catch((error) => {
        toast.error("Something is wrong", {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
        console.error("Error updating resident:", error);
      });
  };

  const loadResident = () => {
    api
      .getLoggedResident()
      .then((result) => {
        console.log("Resident fetched:", result.data);
        setResident(result.data);
      })
      .catch((error) => {
        console.error("Error fetching resident:", error);
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
            <h2 className="text-center m-4">Edit Resident</h2>
            <form onSubmit={handleSubmit} className="grid-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={resident.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={resident.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={resident.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="wingNo">Wing Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="wingNo"
                  name="wingNo"
                  value={resident.wingNo}
                  onChange={handleChange}
                  disabled // Add the disabled attribute
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="floorNo">Floor Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="floorNo"
                  name="floorNo"
                  value={resident.floorNo}
                  onChange={handleChange}
                  disabled // Add the disabled attribute
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="flatNo">Flat Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="flatNo"
                  name="flatNo"
                  value={resident.flatNo}
                  onChange={handleChange}
                  disabled // Add the disabled attribute
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="memberCount">Member Count:</label>
                <input
                  type="number"
                  className="form-control"
                  id="memberCount"
                  name="memberCount"
                  value={resident.memberCount}
                  onChange={handleChange}
                  disabled // Add the disabled attribute
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role:</label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  name="role"
                  value={resident.role}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <Link className="btn btn-danger mx-2" to="/Profile">
                Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditResidentForm;
