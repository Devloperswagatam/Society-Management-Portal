import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const EditBulletin = () => {
  const api = new ApiService();
  const [bulletin, setBulletin] = useState({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    loadBulletin();
  }, []);

  const handleChange = (e) => {
    setBulletin({ ...bulletin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .updateBulletin()
      .then(() => {
        toast.success("Bulletin updated successfully", {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
        console.log("Bulletin updated successfully!");
      })
      .catch((error) => {
        toast.error("Something went wrong", {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
        console.error("Error updating bulletin:", error);
      });
  };

  const loadBulletin = () => {
    api
      .getBulletin() // Replace `id` with the correct parameter for getting the bulletin by ID
      .then((response) => {
        console.log(response.data);
        setBulletin(response.data);
      })
      .catch((error) => {
        console.log("Error fetching bulletin", error);
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
            <h2 className="text-center m-4">Edit Bulletin</h2>
            <form onSubmit={handleSubmit} className="grid-form">
              <div className="form-group">
                <label htmlFor="id">ID:</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  name="id"
                  value={bulletin.id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={bulletin.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={bulletin.description}
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

export default EditBulletin;
