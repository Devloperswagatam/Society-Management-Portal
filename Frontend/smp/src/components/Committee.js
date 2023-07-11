import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ApiService from "./services/ApiService";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";

const Committee = () => {
  const api = new ApiService();

  const [committee, setCommittee] = useState([]);

  useEffect(() => {
    fetchCommittee();
  }, []);

  const fetchCommittee = () => {
    api
      .getAllCommittee()
      .then((response) => {
        setCommittee(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  console.log(committee);

  return (
    <>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      <h1>Committe Members</h1>
      <div className="container">
      <Table className="table mt-4 shadow">
        <thead className="table-dark">
          <tr>
            <th>Post Name</th>
            <th>Name</th>
            <th>Flat No</th>
          </tr>
        </thead>
        <tbody>
          {committee.map((committee) => (
            <tr key={committee.rid}>
              <td>{committee.postName}</td>
              <td>{committee.resident.name}</td>
              <td>{committee.resident.flatNo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </>
  );
};

export default Committee;
