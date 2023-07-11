import React, { useState } from "react";
import ApiService from "../services/ApiService";
import Navbar from "../Navbar";
import { toast } from "react-toastify";

const BulletinHandler = () => {
  const api = new ApiService();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handelNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handelAddBulletin = (e) => {
    e.preventDefault();
    const bulletin = {
      name: name,
      description: description,
    };
    api
      .addBulletin(bulletin)
      .then((response) => {
        toast.success("Bulletin added successfully",{
          position:'top-center',
          theme:'colored',
          autoClose:2000
        });
        console.log("bulletin added", response.data);
        setName("");
        setDescription("");
      })
      .catch((error) => {
        toast.error("Something is wrong",{
          position:'top-center',
          theme:'colored',
          autoClose:2000
        });
        console.error("Error adding the bulletin :", error);
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
            <h2 className="text-center m-4">Add Bulletin</h2>
            <form onSubmit={handelAddBulletin}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Title :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the Title"
                  name="name"
                  value={name}
                  onChange={handelNameChange}
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
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>

              {/* <Link className="btn btn-outline-danger mx-2" to="/home">
                Cancel
              </Link> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default BulletinHandler;
