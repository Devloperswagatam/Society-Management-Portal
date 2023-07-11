import React, { useState } from "react";
import ApiService from "../services/ApiService";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

function VotingHandler() {
  const api = new ApiService();
  let nevigate = useNavigate();
  const [postName, setPostName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numberofcandidates, setNumberofcandidates] = useState("");

  const handlePostNameChange = (e) => {
    setPostName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleCandidateNumber = (e) => {
    setNumberofcandidates(e.target.value);
  };

  const handleAddVotingEvent = (e) => {
    e.preventDefault();
    const votingEvent = {
      postname: postName,
      numberofcandidates: numberofcandidates,
      description: description,
      startTime: startTime,
      endTime: endTime,
    };

    api
      .addVotingEvent(votingEvent)
      .then((response) => {
        toast.success("Voting event created successfully", {
          position: "top-center",
          theme: "colored",
          autoClose: 2000
        });
        // Clear the input fields
        setPostName("");
        setDescription("");
        setStartTime("");
        setEndTime("");
        setNumberofcandidates("");
        // setTimeout(() => {
        // }, 3000);
        nevigate("/voting");
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          theme: "colored",
        });
        // Handle the error if adding the voting event fails
        // console.error("Error adding voting event:", error);
      });
  };

  return (
    <>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      <div className="container" >
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{backgroundColor:'#f5f6fa'}}>
            <h4 className="text-center m-4">Voting Page</h4>
            <Form onSubmit={handleAddVotingEvent} >
              <div className="mb-3">
                <label htmlFor="postName" className="form-label">
                  Post Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the Title"
                  value={postName}
                  onChange={handlePostNameChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="candidate" className="form-label">
                  Number of Candidates:
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter the number of candidates"
                  value={numberofcandidates}
                  onChange={handleCandidateNumber}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Description" className="form-label">
                  Description:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Status" className="form-label">
                  Start Time:
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  placeholder="Enter start date"
                  value={startTime}
                  onChange={handleStartTimeChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Status" className="form-label">
                  End Time:
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  placeholder="Enter Your End Date"
                  value={endTime}
                  onChange={handleEndTimeChange}
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Add Voting Event
              </button>
              {/* <Link className="btn btn-outline-danger mx-2">
                Cancel
              </Link> */}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default VotingHandler;
