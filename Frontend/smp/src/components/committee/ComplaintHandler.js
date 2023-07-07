import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import Navbar from "../Navbar";

const ComplaintHandler = () => {
  const api = new ApiService();
  const [complaint, setComplaint] = useState([]);
  useEffect(() => {
    getComplaints();
  }, []);
  const getComplaints = () => {
    api
      .getComplaints()
      .then((response) => {
        console.log(response.data);
        setComplaint(response.data);
      })
      .catch((error) => {
        console.log(`Error fetching complaints`, error);
      });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };
  return (
<<<<<<< HEAD
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">CId</th>
              <th scope="col">Resident ID</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Image name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaint.map((complaint) => (
              <tr key={complaint.cid}>
                <th scope="row" key={complaint.cid}>
                  {complaint.cid}
                </th>
                <td>{complaint.resident.rid}</td>
                <td>{complaint.title}</td>
                <td>{complaint.description}</td>
                <td>{formatDate(complaint.date)}</td>
                <td>{complaint.image}</td>

                <button className="btn btn-outline-success mx-2">Status</button>
=======
    <>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">CId</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
                <th scope="col">Image name</th>
                <th>Action</th>
>>>>>>> 37404743a592094ea67564a61c2de0e5f1bc4af2
              </tr>
            </thead>
            <tbody>
              {complaint.map((complaint, index) => (
                <tr key={complaint.cid}>
                  <th scope="row" key={complaint.cid}>
                    {complaint.cid + 1}
                  </th>
                  <td>{complaint.title}</td>
                  <td>{complaint.description}</td>
                  <td>{formatDate(complaint.date)}</td>
                  <td>{complaint.image}</td>

                  <button className="btn btn-outline-success mx-2">
                    Status
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default ComplaintHandler;
