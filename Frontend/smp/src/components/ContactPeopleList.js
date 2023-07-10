import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const PeopleList = () => {
  const [contactedPerson, setContactedPerson] = useState(null);

  const peopleData = [
    { id: 1, name: "Rajesh Kumar", position: "Plumber", phone: "123-456-7890" },
    {
      id: 2,
      name: "Sneha Patel",
      position: "Electrician",
      phone: "987-654-3210",
    },
    {
      id: 3,
      name: "Amit Singh",
      position: "Carpenter",
      phone: "456-789-0123",
    },
    { id: 4, name: "Priya Sharma", position: "Roofer", phone: "789-012-3456" },
    {
      id: 5,
      name: "Deepak Verma",
      position: "HVAC Technician",
      phone: "321-654-0987",
    },
    {
      id: 6,
      name: "Sonia Reddy",
      position: "Landscaper",
      phone: "012-345-6789",
    },
    {
      id: 7,
      name: "Vijay Gupta",
      position: "Pest Control Technician",
      phone: "654-098-3210",
    },
    {
      id: 8,
      name: "Anita Rao",
      position: "Waste Management Specialist",
      phone: "890-123-4567",
    },
    {
      id: 9,
      name: "Sanjay Joshi",
      position: "Plasterer",
      phone: "567-890-1234",
    },
    {
      id: 10,
      name: "Neha Khanna",
      position: "Locksmith",
      phone: "234-567-8901",
    },
  ];

  const handleContact = (personId) => {
    const contactedPerson = peopleData.find((person) => person.id === personId);
    setContactedPerson(contactedPerson);
  };

  return (
    <>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      <div className="container">
      <Link className="btn btn-outline-success" to="/complaintHandler">
              Back to Complaint
            </Link>
        <h1 className="mt-4">People Connected with Society-Related Issues</h1>
        <table className="table table-bordered mt-4 shadow">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Phone Number</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {peopleData.map((person) => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.position}</td>
                <td>{person.phone}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleContact(person.id)}
                  >
                    Contact
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {contactedPerson && (
          <div className="mt-4">
            <h2>Contacted:</h2>
            <p><strong>Name:</strong> {contactedPerson.name}</p>
            <p><strong>Position:</strong> {contactedPerson.position}</p>
            <p><strong>Phone:</strong> {contactedPerson.phone}</p>
            <p><strong>Message:</strong> Contacted</p>
            <Link className="btn btn-outline-primary" to="/complaintHandler">
              Back to Complaint
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default PeopleList;
