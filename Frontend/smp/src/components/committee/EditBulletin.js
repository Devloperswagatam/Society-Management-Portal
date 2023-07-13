import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ApiService from "../services/ApiService";
import Navbar from "../Navbar";
import { toast } from "react-toastify";

const EditBulletin = () => {
  const api = new ApiService();
  const { id } = useParams();
  const [bulletin, setBulletin] = useState({

    name: "",
    description: "",
  });

  useEffect(() => {
    loadBulletin();
  }, []);

  const handleChange = (e) => {
    setBulletin({ ...bulletin, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .updateBulletin(bulletin)
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
    .getBulletinById(id)
      .then((result) => {
        console.log(result.data);
        setBulletin(result.data);
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={bulletin.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={bulletin.description}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <Link className="btn btn-danger mx-2" to="/bulletin">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBulletin;
