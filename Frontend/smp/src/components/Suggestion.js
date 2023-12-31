import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "./services/ApiService";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
const Suggestion = () => {
  const api = new ApiService();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const handelTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handelAddSuggestion = (e) => {
    e.preventDefault();
    const suggestion = {
      title: title,
      description: description,
      status: "pending",
    };

    api
      .addSuggestion(suggestion)
      .then((response) => {
        toast.success("Suggestion added successfully",{
          position:'top-center',
          theme:'colored',
          autoClose:2000
        });
        console.log("suggestion added", response.data);
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
        console.error("Error adding the suggestion :", error);
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
            <h2 className="text-center m-4">Add Suggestion</h2>
            <form onSubmit={handelAddSuggestion}>
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
                  onChange={handelTitleChange}
                  required
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
export default Suggestion;