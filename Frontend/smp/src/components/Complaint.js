import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const ComplaintForm = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const complaintData = {
      title,
      description,
      status,
    };
    const formData = new FormData();
    formData.append("file", file);
    formData.append("complaintData", JSON.stringify(complaintData));

    try {
      const response = await axios.post(
        "http://localhost:8080/api/complaints",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
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
            <h2 className="text-center m-4">Add Complaint</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title :
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
                  Description :
                </label>
                <textarea
                  className="form-control"
                  placeholder="Enter the Event Description"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Status" className="form-label">
                  Status :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Status"
                  name="status"
                  value={status}
                  onChange={handleStatusChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="File" className="form-label">
                  Add Image :
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
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

export default ComplaintForm;
