import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "./services/ApiService";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
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

  const handleAddComplaint = (e) => {
    e.preventDefault();
    const complaint = {
      title: title,
      description: description,
      status: "pending",
    };

    api
      .addComplaint(complaint)
      .then((response) => {
        toast.success("Complaint added successfully",{
          position:'top-center',
          theme:'colored',
          autoClose:2000
        });
        console.log("Complaint added", response.data);
        setTitle("");
        setDescription("");
        setStatus("");
      })
      .catch((error) => {
        toast.error("Something is wrong",{
          position:'top-center',
          theme:'colored',
          autoClose:2000
        });
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
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{backgroundColor:'#f5f6fa'}}>
            <div className="d-flex justify-content-end">
            </div>
            <h2 className="text-center m-4">Add Complaint</h2>
            <form onSubmit={handleAddComplaint}>
              <div className="mb-3" >
                <label htmlFor="title" className="form-label-sel"  >
                  Title:
                </label>
                <select
              id="title"
              className="form-control"
             required
              value={title}
              onChange={handleTitleChange}
            >
              <option value="">Select the Complaint</option>
              <option>Plumber</option>
              <option>Electricity</option>
              <option >Roofer</option>
              <option >Hvac Technical issues</option>
              <option >Landscaper</option>
              <option >Pest Control</option>
              <option >Waste Management</option>
              <option >Plastere</option>
              <option >Locksmith</option>
              <option >Parking</option>
              <option >Others</option>
            </select>
              </div>
              <div className="mb-3">
                <label htmlFor="Description" className="form-label">
                  Description:
                </label>
                <textarea
                  className="form-control"
                  placeholder="Enter the Complaint Description"
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