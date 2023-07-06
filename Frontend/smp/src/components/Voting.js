import React, { useEffect, useState } from "react";
import ApiService from "./services/ApiService";

const Voting = () => {
  const apiService = new ApiService();
  const [votingEvents, setVotingEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVotingEvents();
  }, []);

  const getVotingEvents = () => {
    apiService
      .getVotingEvents()
      .then((response) => {
        const currentDate = new Date();
        console.log(currentDate);
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
      .catch((error) => setError(error.response.data.message));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US");
  };

  const handleNominate = async (votingId) => {
    try {
      const candidates = await apiService.getCandidatesByVotingId(votingId)
      .then((response)=>{
        
      })
      console.log(candidates);
      const numberOfCandidates = 5; // Set the maximum number of candidates here
  
      if (candidates.length < numberOfCandidates) {
        // Allow nomination
        await apiService.addCandidate(votingId); // Replace with the actual method to add a candidate
        console.log("Candidate added successfully");
        // Update the UI accordingly
      } else {
        // Show a message or disable the nominate button
        console.log("Maximum number of candidates reached");
      }
    } catch (error) {
      console.log("Error handling nomination:", error);
      // Handle the error
    }
  };

  return (
    <div>
      <h1>Voting Page</h1>
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
                  onClick={() => handleNominate(event.votingId)}
                  disabled={event.count === event.numberofcandidates}
                >
                  Nominate
                </button>
                <button>Vote</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Voting;
