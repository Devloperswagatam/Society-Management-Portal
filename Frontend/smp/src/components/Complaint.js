import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "./services/ApiService";
import Navbar from "./Navbar";

const Complaint = () => {
  const api = new ApiService();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddComplaint = () => {
    const complaint = {
      title: title,
      description: description,
      status: "pending",
    };

    api
      .addComplaint(complaint)
      .then((response) => {
        console.log("Complaint added", response.data);
        setTitle("");
        setDescription("");
        setStatus("");
      })
      .catch((error) => {
        console.error("Error adding the complaint:", error);
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
            <h2 className="text-center m-4">Add Complaint</h2>
            <form onSubmit={handleAddComplaint}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the Title"
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Description" className="form-label">
                  Description:
                </label>
                <textarea
                  className="form-control"
                  placeholder="Enter the Event Description"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/home">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Complaint;