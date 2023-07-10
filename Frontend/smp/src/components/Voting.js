import React, { useEffect, useState } from "react";
import ApiService from "./services/ApiService";
import Result from "./Result";
import { Table, Form, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

const Voting = () => {
  const apiService = new ApiService();
  const [votingEvents, setVotingEvents] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [filter, setFilter] = useState("future");
  const [searchDate, setSearchDate] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    getVotingEvents();
    getCandidates();
  }, []);

  const getVotingEvents = () => {
    apiService
      .getVotingEvents()
      .then((response) => {
        let filteredEvents = response.data;

        if (filter === "past") {
          const currentDate = new Date();
          filteredEvents = filteredEvents.filter(
            (event) => new Date(event.endTime).getDate() < currentDate.getDate()
          );
        } else if (filter === "future") {
          const currentDate = new Date();
          filteredEvents = filteredEvents.filter(
            (event) =>
              new Date(event.startTime).getDate() >= currentDate.getDate()
          );
        }

        setVotingEvents(filteredEvents);
      })
      .catch((error) =>
        toast.error(error.response.data, {
          position: "top-center",
          theme: "colored",
        })
      );
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
            toast.success(response.data, {
              position: "top-center",
              theme: "colored",
              autoClose: 1000,
            });
          })
          .catch((error) => {
            toast.error(error.response.data, {
              position: "top-center",
              theme: "colored",
              autoClose: 1000,
            });
            console.error("Error adding voting event:", error);
          });

        // Update the UI accordingly
      } else {
        toast.warn("Maximum number of candidates reached", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-center",
        theme: "colored",
        autoClose: 1000,
      });
      console.log("Error handling nomination:", error);
    }
  };

  const getCandidates = () => {
    // Fetch candidates from the server
    apiService
      .getAllCandidates()
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.log("Error fetching candidates:", error);
      });
  };

  const isNominated = (votingId) => {
    candidates.some(
      (candidate) =>
        candidate.rid === sessionStorage.getItem("rid") &&
        candidate.votingEvent.votingId === votingId
    );
  };
  // console.log(candidates);
  // console.log(isNominated(4));

  const handleWithdrawNomination = async (votingId) => {
    const response = await apiService
      .withdrawCandidate(votingId)
      .then((response) => {
        toast.success(response.data, {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
        });
      });
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
        toast.warn("No candidates available for voting", {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Error handling vote", {
        position: "top-center",
        theme: "colored",
      });
      console.log("Error handling vote:", error);
    }
  };

  const handleVoteSubmit = async (votingId, rid) => {
    try {
      const response = await apiService
        .addVote(votingId, rid)
        .then((response) => {
          toast.success(response.data, {
            position: "top-center",
            theme: "colored",
          });
          console.log("Vote added successfully");
          // Update the UI accordingly
          setShowForm(false);
          setSelectedCandidates([]);
        })
        .catch((error) => {
          toast.error(error.response.data, {
            position: "top-center",
            theme: "colored",
          });
        });

      // Show a success message or perform any other necessary action
    } catch (error) {
      toast.error("Error submitting vote", {
        position: "top-center",
        theme: "colored",
      });
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
      toast.error("Something is wrong !!", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchDate.trim() === "") {
      getVotingEvents();
    } else {
      searchEventsByDate(searchDate);
    }
  };

  const searchEventsByDate = (dateString) => {
    const filteredDate = new Date(dateString);
    const filteredEvents = events.filter(
      (event) =>
        new Date(event.startTime).toLocaleDateString() ===
        filteredDate.toLocaleDateString()
    );
    setEvents(filteredEvents);
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
        <>
          <div style={{ width: "30rem", margin: "0 0 1rem 1rem" }}>
            <Form
              className="mt-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 0.5fr 0.5fr",
                gap: "0.5rem",
              }}
            >
              <Form.Group controlId="filter">
                {/* <Form.Label>Filter:</Form.Label> */}
                <Form.Control
                  as="select"
                  value={filter}
                  onChange={handleFilterChange}
                >
                  <option value="future">Future Events</option>
                  <option value="past">Past Events</option>
                  <option value="all">All Events</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="searchDate">
                {/* <Form.Label>Search by Date:</Form.Label> */}
                <Form.Control
                  type="date"
                  value={searchDate}
                  onChange={handleSearchDateChange}
                />
              </Form.Group>
              <Button onClick={getVotingEvents} className="mr-2">
                Apply
              </Button>
              <Button variant="secondary" onClick={() => setSearchDate("")}>
                Clear
              </Button>
            </Form>
          </div>

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
                    {isNominated(event.votingId) ? (
                      <Button
                        className="btn btn-danger"
                        style={{ margin: "0 5px 0 0" }}
                        onClick={() => handleWithdrawNomination(event.votingId)}
                        disabled={event.status === "closed"}
                      >
                        Withdraw
                      </Button>
                    ) : (
                      <Button
                        style={{ margin: "0 5px 0 0" }}
                        onClick={() =>
                          handleNominate(
                            event.votingId,
                            event.numberofcandidates
                          )
                        }
                        disabled={event.status === "closed"}
                      >
                        Nominate
                      </Button>
                    )}
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
        </>
      ) : (
        <div>
          {/* <h2>Vote Form</h2> */}
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
