import React, { useEffect, useState } from "react";
import ApiService from "./services/ApiService";
import { Button, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

const Organizer = () => {
  const apiService = new ApiService();
  const { eventId } = useParams();
  const [organizerTeam, setOrganizers] = useState([]);

  useEffect(() => {
    getOrganizers();
  }, []);

  const getOrganizers = () => {
    apiService
      .getOrganizersByEventId(eventId)
      .then((response) => {
        toast.info("Organizer Info", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000
        });
        setOrganizers(response.data);
      })
      .catch((error) => {
        toast.error("Error while fetching!!",{
          position:'top-center',
          theme:'colored',
          autoClose: 1000
        });
        console.log("Error fetching organizers:", error);
      });
  };

  const handleRemoveOrganizer = async () => {
    try {
      const response = await apiService
        .removeOrganizer(eventId)
        .then((response) => {
          toast.success(response.data, {
            position: "top-center",
            theme: "colored",
            autoClose: 1000
          });
          // console.log(response.data);
          // Refresh the organizer list
          getOrganizers();
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: "top-center",
            theme: "colored",
            autoClose: 1000
          });
        });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        theme: "colored",
        autoClose: 1000
      });
      // console.error(response.data);
    }
  };

  return (
    <>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      <div>
        <h2>Organizers for Event {eventId}</h2>
        {organizerTeam.length > 0 ? (
          <Table className="table">
            <thead className="table-dark">
              <tr>
                <th>Organizer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {organizerTeam.map((organizer) => (
                <tr key={organizer.rid}>
                  <td>{organizer.name}</td>
                  <td>{organizer.email}</td>
                  <td>{organizer.phoneNumber}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={handleRemoveOrganizer}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No organizers found for this event.</p>
        )}
        <Link className="btn btn-danger" to="/events">
          Back
        </Link>
      </div>
    </>
  );
};

export default Organizer;
