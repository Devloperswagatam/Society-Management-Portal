import React, { useState } from "react";
import ApiService from "../services/ApiService";
import { Link } from "react-router-dom";

function VotingHandler() {
  const api = new ApiService();
  const [postName, setPostName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numberofcandidates, setNumberofcandidates] = useState();

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
  }

  const handleAddVotingEvent = () => {
    const votingEvent = {
      postname: postName,
      numberofcandidates:numberofcandidates,
      description: description,
      startTime: startTime,
      endTime: endTime,
    };

    api
      .addVotingEvent(votingEvent)
      .then((response) => {
        // Handle the response after adding the voting event
        console.log("Voting event added successfully:", response.data);
        // Clear the input fields
        setPostName("");
        setDescription("");
        setStartTime("");
        setEndTime("");
      })
      .catch((error) => {
        // Handle the error if adding the voting event fails
        console.error("Error adding voting event:", error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h4 className="text-center m-4">Voting Page</h4>
          <form>
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
                placeholder="Enter the Title"
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
            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={handleAddVotingEvent}
            >
              Add Voting Event
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/home">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VotingHandler;
