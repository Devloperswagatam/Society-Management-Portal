import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const ComplaintHandler = () => {
  const api = new ApiService();
  const [complaints, setComplaints] = useState([]);

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
          <Link className="btn btn-outline-success" to="/ContactPeopleList">
            Contact
          </Link>
        </div>
        <div className="py-4">
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
              {complaints.map((complaint) => (
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
                        disabled={complaint.viewed}
                      >
                        {complaint.viewed ? "Viewed" : "Mark as Viewed"}
                      </button>
                    ) : (
                      "Viewed"
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
