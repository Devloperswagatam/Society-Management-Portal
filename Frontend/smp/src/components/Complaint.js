import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "./services/ApiService";
const Complaint = () => {
  const api = new ApiService();
  
  const[image, setImage]=useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const handelTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleFile=(complaint)=>{
    const image = complaint.target.files[0];
    setImage(image);
  };
  const handelStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handelAddComplaint = () => {
    const complaint = {
      title: title,
      description: description,
      status: status,
    };
    api
      .addComplaint(complaint)
      .then((response) => {
        console.log("complaint added", response.data);
        setTitle("");
        setDescription("");
        setStatus("");
      })
      .catch((error) => {
        console.error("Error adding the complaint :", error);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Complaint</h2>
          <form onSubmit={handelAddComplaint}>
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
            <div className="mb-3">
              <label htmlFor="File" className="form-label">
                Add Image :
              </label>
              <input
                type="file"
                className="form-control"
                value={image}
                onChange={handleFile}
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
  );
};
export default Complaint;
