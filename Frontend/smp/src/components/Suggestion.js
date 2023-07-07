import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "./services/ApiService";
import Navbar from "./Navbar";
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
  const handelStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handelAddSuggestion = () => {
    const suggestion = {
      title: title,
      description: description,
      status: status,
    };

    api
      .addSuggestion(suggestion)
      .then((response) => {
        console.log("suggestion added", response.data);
        setTitle("");
        setDescription("");
        setStatus("");
      })
      .catch((error) => {
        console.error("Error adding the suggestion :", error);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
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
                onChange={handelStatusChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/home">
              Cancel
            </Link>
          </form>
    <>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
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
                  onChange={handelStatusChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={handelAddSuggestion}
              >
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
