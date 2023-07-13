import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Table } from "react-bootstrap";
import ApiService from "./services/ApiService";
import { toast } from "react-toastify";

function Resident() {
  const api = new ApiService();
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    await api
      .getAllResidents()
      .then((response) => {
        const residents = response.data;
        setResidents(residents);
      })
      .catch((error) => {
        toast.error("Error while fetching", {
          position: "top-center",
          theme: "colored",
        });
      });
  };
  return (
    <>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      <h1>Residents</h1>
      <div className="container">
        <Table className="table mt-4 shadow">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              {sessionStorage.getItem("role") === "committee" && (
                <>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Floor No</th>
                  <th>Member Count</th>
                </>
              )}
              <th>Wing No</th>
              <th>Flat No</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident) => (
              <tr key={resident.rid}>
                <td>{resident.name}</td>
                {sessionStorage.getItem("role") === "committee" && (
                  <>
                    <td>{resident.email}</td>
                    <td>{resident.phoneNumber}</td>
                    <td>{resident.floorNo}</td>
                    <td>{resident.memberCount}</td>
                  </>
                )}
                <td>{resident.wingNo}</td>
                <td>{resident.flatNo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Resident;
