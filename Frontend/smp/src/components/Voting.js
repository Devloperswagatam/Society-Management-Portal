import React, { useEffect, useState } from "react";
import ApiService from "./services/ApiService";
import Result from "./Result";
import { Table, Form, Button, Modal } from "react-bootstrap";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { BsPencilSquare, BsFillClipboardCheckFill } from "react-icons/bs";
import { MdCancel, MdEditOff } from "react-icons/md";
import Swal from 'sweetalert2';

const Voting = () => {
  const apiService = new ApiService();
  const [votingEvents, setVotingEvents] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // const [showResults, setShowResults] = useState(false);
  const [filter, setFilter] = useState("future");
  const [searchDate, setSearchDate] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [newEvent, setNewEvent] = useState({
    postname: "",
    startTime: "",
    endTime: "",
    numberofcandidates: "",
    description: "",
  });
  const [showModal,setShowModal] = useState(false);

  useEffect(() => {
    getVotingEvents();
    getCandidates();
    // isNominated();
  }, []);

  const getVotingEvents = () => {
    apiService
      .getVotingEvents()
      .then((response) => {
        let filteredEvents = response.data;

        if (filter === "future") {
          const currentDate = new Date();
          filteredEvents = filteredEvents.filter(
            (event) => new Date(event.endTime) >= currentDate
          );
        } else if (filter === "past") {
          const currentDate = new Date();
          filteredEvents = filteredEvents.filter(
            (event) =>
              new Date(event.startTime) < currentDate
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

  const startEditing = (event) => {
    setEditingEventId(event.votingId);
    setNewEvent({
      votingId: event.votingId,
      postname: event.postname,
      startTime: event.startTime,
      endTime: event.endTime,
      numberofcandidates: event.numberofcandidates,
      description: event.description,
    });
  };

  const cancelEditing = () => {
    setEditingEventId(null);
    setNewEvent({
      votingId: null,
      postname: "",
      startTime: "",
      endTime: "",
      numberofcandidates: "",
      description: "",
    });
  };

  const saveChanges = () => {
    // Call the API to update the event using the updateVotingEvent() method
    apiService
      .updateVotingEvent(newEvent)
      .then((response) => {
        // Update the events list in the state with the updated event
        const updatedEvents = votingEvents.map((event) =>
          event.votingId === newEvent.votingId ? newEvent : event
        );
        setVotingEvents(updatedEvents);
        setEditingEventId(null);
        setNewEvent({
          postname: "",
          startTime: "",
          endTime: "",
          numberofcandidates: "",
          description: "",
        });
        toast.success("Voting event edited", {
          position: "top-center",
          theme: "colored",
          autoClose:1000
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          theme: "colored",
          autoClose:2000
        });
      });
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
            setTimeout(() => {
              window.location.reload();
            }, 1000);
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
    const matchingCandidate = candidates.find((candidate) => {
      return (
        candidate.votingEvent.votingId === votingId &&
        candidate.rid == sessionStorage.getItem("rid")
      );
    });
    return !!matchingCandidate;
  };


  const handleWithdrawNomination = async (votingId) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, withdraw it!',
        cancelButtonText: 'No, cancel!',
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await apiService.withdrawCandidate(votingId);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            toast.success(response.data, {
              position: "top-center",
              theme: "colored",
              autoClose: 1000,
            });
          } catch (error) {
            toast.error(error.response.data.message, {
              position: "top-center",
              theme: "colored",
              autoClose: 1000,
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your nomination is safe :)',
            'error'
          );
        }
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        theme: "colored",
        autoClose: 1000,
      });
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
        // setShowResults(false);
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
    // setShowResults(false);
  };

  const handleShowResults = async (votingId) => {
    try {
      const response = await apiService.getCandidatesByVotingId(votingId);
      const candidates = response.data;
      setSelectedCandidates(candidates);
      setShowForm(false);
      // setShowResults(true);
      openModal();
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
    const filteredEvents = votingEvents.filter(
      (event) =>
        new Date(event.startTime).toLocaleDateString() ===
        filteredDate.toLocaleDateString()
    );
    setVotingEvents(filteredEvents);
  };

  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
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
                gridTemplateColumns: "1fr 0.5fr 0.5fr",
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
              <Button onClick={handleSearch} className="mr-2">
                Apply
              </Button>
              <Button variant="secondary" onClick={() => setSearchDate("")}>
                Clear
              </Button>
            </Form>
          </div>

          <Table className="table mt-4 shadow">
            <thead className="table-dark">
              <tr>
                <th>Post Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Day</th>
                <th>Candidates</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
                <th>Result</th>
                {sessionStorage.getItem("role") === "committee" && (
                  <th>Edit</th>
                )}
              </tr>
            </thead>
            <tbody>
              {votingEvents.map((event) => (
                <tr key={event.votingId}>
                  <td>
                    {editingEventId === event.votingId ? (
                      <input
                        style={{ width: "5rem" }}
                        type="text"
                        name="postname"
                        value={newEvent.postname}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, postname: e.target.value })
                        }
                      />
                    ) : (
                      event.postname
                    )}
                  </td>
                  <td>
                    {editingEventId === event.votingId ? (
                      <input
                        style={{ width: "5rem" }}
                        type="datetime-local"
                        name="startTime"
                        value={newEvent.startTime}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            startTime: e.target.value,
                          })
                        }
                      />
                    ) : (
                      formatDate(event.startTime)
                    )}
                  </td>
                  <td>
                    {editingEventId === event.votingId ? (
                      <input
                        style={{ width: "5rem" }}
                        type="datetime-local"
                        name="endTime"
                        value={newEvent.endTime}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, endTime: e.target.value })
                        }
                      />
                    ) : (
                      formatDate(event.endTime)
                    )}
                  </td>
                  <td>{formatDay(event.startTime)}</td>
                  <td>
                    {editingEventId === event.votingId ? (
                      <input
                        style={{ width: "5rem" }}
                        type="number"
                        name="candidates"
                        value={newEvent.numberofcandidates}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            numberofcandidates: e.target.value,
                          })
                        }
                      />
                    ) : (
                      event.numberofcandidates
                    )}
                  </td>
                  <td>
                    {editingEventId === event.votingId ? (
                      <input
                        // style={{width:'5rem'}}
                        type="text"
                        name="description"
                        value={newEvent.description}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            description: e.target.value,
                          })
                        }
                      />
                    ) : (
                      event.description
                    )}
                  </td>
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
                  {sessionStorage.getItem("role") === "committee" && (
                    <td>
                      {editingEventId === event.votingId ? (
                        <>
                          <BsFillClipboardCheckFill
                            size={25}
                            style={{
                              cursor: "pointer",
                              color: "green",
                              marginRight: "1rem",
                            }}
                            onClick={saveChanges}
                          />
                          <MdCancel
                            size={30}
                            style={{
                              cursor: "pointer",
                              color: "red",
                              marginLeft: "1rem",
                            }}
                            onClick={cancelEditing}
                          />
                        </>
                      ) : (
                        <button className="btn btn-primary">
                        <BsPencilSquare
                          style={{ fontSize: "20px" }}
                          onClick={() => startEditing(event)}
                        />
                        </button>
                      )}
                    </td>
                  )}
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
      {/* {showResults && <Result candidates={selectedCandidates} />} */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Result candidates={selectedCandidates} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Voting;
