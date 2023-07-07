import React, { useEffect, useState } from "react";
import ApiService from "./services/ApiService";
import Result from "./Result";
import { Table, Form, Button } from "react-bootstrap";
import Navbar from "./Navbar";

const Voting = () => {
  const apiService = new ApiService();
  const [votingEvents, setVotingEvents] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showResults, setShowResults] = useState(false);

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
            eventStartTime.getDate() >= currentDate.getDate() &&
            eventStartTime.getDate() <= nextThreeDays;
          const isSameDayOrBeforeNext =
            eventEndTime.getDate() >= currentDate.getDate() &&
            eventEndTime.getDate() <= nextThreeDays;
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

  const formatDay = (dateString) => {
    const day = new Date(dateString);
    return day.toLocaleDateString("en-US", { day: "numeric", month: "long" });
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
        setShowResults(false);
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
    setShowResults(false);
  };

  const handleShowResults = async (votingId) => {
    try {
      const response = await apiService.getCandidatesByVotingId(votingId);
      const candidates = response.data;
      setSelectedCandidates(candidates);
      setShowForm(false);
      setShowResults(true);
    } catch (error) {
      alert("Something is wrong !!");
    }
  };

  return (
    <div>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      <h1>Voting Page</h1>
      {!showForm ? (
        <Table className="table">
          <thead className="table-dark">
            <tr>
              <th>Post Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Day</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {votingEvents.map((event) => (
              <tr key={event.votingId}>
                <td>{event.postname}</td>
                <td>{formatDate(event.startTime)}</td>
                <td>{formatDate(event.endTime)}</td>
                <td>{formatDay(event.startTime)}</td>
                <td>{event.description}</td>
                <td>{event.status}</td>
                <td>
                  <Button
                    onClick={() =>
                      handleNominate(event.votingId, event.numberofcandidates)
                    }
                    disabled={event.status === "closed"}
                  >
                    Nominate
                  </Button>
                  <Button
                    onClick={() => handleVote(event.votingId)}
                    disabled={event.status === "closed"}
                  >
                    Vote
                  </Button>
                </td>
                <td>
                  <Button onClick={() => handleShowResults(event.votingId)}>
                    Show
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <h2>Vote Form</h2>
          {selectedCandidates.map((candidate) => (
            <div key={candidate.rid}>
              {candidate.resident.name}
              <Button
                onClick={() =>
                  handleVoteSubmit(
                    candidate.votingEvent.votingId,
                    candidate.resident.rid
                  )
                }
              >
                Vote
              </Button>
            </div>
          ))}
          <Button onClick={handleBack}>Back</Button>
        </div>
      )}
      {showResults && <Result candidates={selectedCandidates} />}
    </div>
  );
};

export default Voting;
