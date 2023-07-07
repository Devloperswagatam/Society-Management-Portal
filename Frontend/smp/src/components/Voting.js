import React, { useEffect, useState } from "react";
import ApiService from "./services/ApiService";

const Voting = () => {
  const apiService = new ApiService();
  const [votingEvents, setVotingEvents] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getVotingEvents();
  }, []);

  const getVotingEvents = () => {
    apiService
      .getVotingEvents()
      .then((response) => {
        const currentDate = new Date();
        const nextThreeDays = new Date();
        nextThreeDays.setDate(currentDate.getDate() + 3);

        const filteredEvents = response.data.filter((event) => {
          const eventStartTime = new Date(event.startTime);
          const eventEndTime = new Date(event.endTime);
          const isSameDayOrAfterCurrent =
            eventStartTime >= currentDate && eventStartTime <= nextThreeDays;
          const isSameDayOrBeforeNext =
            eventEndTime >= currentDate && eventEndTime <= nextThreeDays;
          return isSameDayOrAfterCurrent || isSameDayOrBeforeNext;
        });

        setVotingEvents(filteredEvents);
      })
      .catch((error) => alert(error.response.data));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US");
  };

  const handleNominate = async (votingId, numberofcandidates) => {
    try {
      const response = await apiService.getCandidatesByVotingId(votingId);
      const candidates = response.data;

      if (candidates.length < numberofcandidates) {
        // Allow nomination
        await apiService
          .addCandidate(votingId)
          .then((response) => {
            alert(response.data);
          })
          .catch((error) => {
            alert(error.response.data);
            console.error("Error adding voting event:", error);
          });

        // Update the UI accordingly
      } else {
        alert("Maximum number of candidates reached");
      }
    } catch (error) {
      alert("Something went wrong!");
      console.log("Error handling nomination:", error);
    }
  };

  const handleVote = async (votingId) => {
    try {
      const response = await apiService.getCandidatesByVotingId(votingId);
      const candidates = response.data;

      if (candidates.length > 0) {
        // setVotingId(votingId);
        setSelectedCandidates(candidates);
        setShowForm(true);
      } else {
        alert("No candidates available for voting");
      }
    } catch (error) {
      console.log("Error handling vote:", error);
    }
  };

  const handleVoteSubmit = async (votingId, rid) => {
    try {
      const response = await apiService
        .addVote(votingId, rid)
        .then((response) => {
          alert(response.data);
          console.log("Vote added successfully");
          // Update the UI accordingly
          setShowForm(false);
          setSelectedCandidates([]);
        })
        .catch((error) => {
          alert(error.response.data);
        });

      // Show a success message or perform any other necessary action
    } catch (error) {
      console.log("Error submitting vote:", error);
      // Handle the error
    }
  };

  const handleBack = () => {
    setShowForm(false);
    setSelectedCandidates([]);
  };

  return (
    <div>
      <h1>Voting Page</h1>
      {!showForm ? (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Post Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {votingEvents.map((event) => (
              <tr key={event.votingId}>
                <td>{event.postname}</td>
                <td>{formatDate(event.startTime)}</td>
                <td>{formatDate(event.endTime)}</td>
                <td>{event.description}</td>
                <td>
                  <button
                    onClick={() =>
                      handleNominate(event.votingId, event.numberofcandidates)
                    }
                  >
                    Nominate
                  </button>
                  <button onClick={() => handleVote(event.votingId)}>
                    Vote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h2>Vote Form</h2>
          {selectedCandidates.map((candidate) => (
            <div key={candidate.rid}>
              {candidate.resident.name}
              <button onClick={() => handleVoteSubmit(candidate.votingEvent.votingId, candidate.resident.rid)}>
                Vote
              </button>
            </div>
          ))}
          <button onClick={handleBack}>Back</button>
        </div>
      )}
    </div>
  );
};

export default Voting;
