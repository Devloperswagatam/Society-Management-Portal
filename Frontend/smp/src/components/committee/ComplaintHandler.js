import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const ComplaintHandler = () => {
  const api = new ApiService();
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("all"); // Default filter value

  useEffect(() => {
    getComplaints();
  }, []);

  const getComplaints = () => {
    api
      .getComplaints()
      .then((response) => {
        console.log(response.data);
        setComplaints(response.data);
      })
      .catch((error) => {
        console.log("Error fetching complaints", error);
      });
  };

  const updateComplaintStatus = (cid) => {
    api
      .updateComplaint(cid)
      .then((response) => {
        console.log("Complaint marked as viewed", response.data);
        getComplaints();
      })
      .catch((error) => {
        console.log("Error marking complaint as viewed:", error);
      });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filterComplaints = (complaints) => {
    switch (filter) {
      case "pending":
        return complaints.filter((complaint) => complaint.status === "pending");
      case "resolved":
        return complaints.filter((complaint) => complaint.status === "resolved");
      default:
        return complaints;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  return (
    <>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      <div className="container">
        <div className="d-flex justify-content-end mb-3">
        </div>
        <Link className="btn btn-success" to="/ContactPeopleList" >
            Contact
          </Link>
        <div className="py-4">
          <div className="mb-3">
            <label htmlFor="filter" className="mr-2">
              Filter:
            </label>
            <select
              id="filter"
              className="form-control-inline"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All Complaints</option>
              <option value="pending">Pending Complaints</option>
              <option value="resolved">Resolved Complaints</option>
            </select>
          </div>
          <table className="table mt-4 shadow">
            <thead className="table-dark">
              <tr>
                <th scope="col">CId</th>
                <th scope="col">RId</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterComplaints(complaints).map((complaint) => (
                <tr key={complaint.cid}>
                  <th scope="row">{complaint.cid}</th>
                  <td>{complaint.resident.rid}</td>
                  <td>{complaint.title}</td>
                  <td>{complaint.description}</td>
                  <td>{formatDate(complaint.date)}</td>
                  <td>{complaint.status}</td>
                  <td>
                    {!complaint.viewed ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => updateComplaintStatus(complaint.cid)}
                        disabled={complaint.resolved}
                      >
                        {complaint.viewed ? "Resolved" : "Mark as Resolved"}
                      </button>
                    ) : (
                      "Resolved"
                    )}
                  </td>
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
