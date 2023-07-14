import React, { useState, useEffect } from "react";
import ApiService from "./services/ApiService";
import { Table, Form, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BsFillClipboardCheckFill, BsPencilSquare } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

const Events = () => {
  const api = new ApiService();
  let navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    ename: "",
    place: "",
    budget: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  const [filter, setFilter] = useState("future");
  const [searchDate, setSearchDate] = useState("");
  const [editingEventId, setEditingEventId] = useState("");

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    api
      .getEvents()
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

        setEvents(filteredEvents);
      })
      .catch((error) => {
        toast.error("Error fetching events", {
          position: "top-center",
          theme: "colored",
        });
        console.log("Error fetching events:", error);
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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const cancelEditing = () => {
    setEditingEventId("");
  };

  const startEditing = (event) => {
    setNewEvent(event);
    setEditingEventId(event.eid);
  };

  const saveChanges = async () => {
    await api
      .updateEvent(newEvent)
      .then(() => {
        toast.success("Event Updated", {
          position: "top-center",
          theme: "colored",
          autoClose:1000
        });
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.eid === newEvent.eid ? newEvent : event
          )
        );
        setNewEvent({
          ename: "",
          place: "",
          budget: "",
          startTime: "",
          endTime: "",
          description: "",
        });
        setEditingEventId("");
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          theme: "colored",
          autoClose:1000
        });
      });
  };

  const addEvent = (e) => {
    e.preventDefault();
    api
      .addEvent(newEvent)
      .then((response) => {
        toast.success("Event created successfully", {
          position: "top-center",
          theme: "colored",
        });
        setNewEvent({
          ename: "",
          place: "",
          budget: "",
          startTime: "",
          endTime: "",
          description: "",
        });
        getEvents();
        toggleForm();
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  const handleViewOrganizers = (eventId) => {
    navigate(`/organizer/${eventId}`);
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
      getEvents();
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

  const handleInterest = async (event) => {
    const organizers = event.organizerTeam;
    const maxNumberOfOrganizers = 5;

    if (organizers.length < maxNumberOfOrganizers) {
      await api
        .addOrganizer(event.eid)
        .then((response) => {
          toast.success(response.data, {
            position: "top-center",
            theme: "colored",
          });
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: "top-center",
            theme: "colored",
          });
        });
    } else {
      toast.error("Organizer team is full!", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <Navbar
        role={sessionStorage.getItem("role")}
        isLoggedIn={sessionStorage.getItem("isLoggedIn")}
        name={sessionStorage.getItem("name")}
      />
      <h2>Events Page</h2>
      <Button onClick={toggleForm} style={{ margin: "0 0 1rem 80rem" }}>
        Create Event
      </Button>

      {showForm ? (
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
              <h2 className="text-center m-4">Create Event</h2>
              <Form onSubmit={addEvent}>
                <div className="mb-3">
                  <label htmlFor="eventName" className="form-label">
                    Event Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the Event Name"
                    pattern="[A-Za-z\s]+"
                    name="ename"
                    value={newEvent.ename}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="Place">Place:</label>
                  <select
                    className="form-control"
                    name="place"
                    value={newEvent.place}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Place</option>
                    <option value="hall">Hall</option>
                    <option value="ground">Ground</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="Budget" className="form-label">
                    Budget:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="budget"
                    placeholder="Enter the Event Budget"
                    value={newEvent.budget}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="StartTime" className="form-label">
                    Start Time:
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    placeholder="Enter the Start Time"
                    name="startTime"
                    value={newEvent.startTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="EndTime">End Time:</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    placeholder="Enter the Event End Time"
                    name="endTime"
                    value={newEvent.endTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Description">Description:</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter the Event Description"
                    name="description"
                    value={newEvent.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="btn btn-outline-primary" type="submit">
                  Create Event
                </button>
                <button className="btn btn-outline-danger" onClick={toggleForm}>
                  Cancel
                </button>
              </Form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={{ width: "30rem", margin: "-4.5rem 0 1rem 1rem" }}>
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
              <Button onClick={getEvents} className="mr-2">
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
                <th>Event Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Day</th>
                <th>Location</th>
                <th>Description</th>
                <th>Status</th>
                <th>Organizers</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.eid}>
                  <td>
                    {editingEventId === event.eid ? (
                      <input
                      style={{width:'5rem'}}
                        type="text"
                        name="ename"
                        value={newEvent.ename}
                        onChange={handleChange}
                      />
                    ) : (
                      event.ename
                    )}
                  </td>
                  <td>
                    {editingEventId === event.eid ? (
                      <input
                      style={{width:'5rem'}}
                        type="datetime-local"
                        name="startTime"
                        value={newEvent.startTime}
                        onChange={handleChange}
                      />
                    ) : (
                      formatDate(event.startTime)
                    )}
                  </td>
                  <td>
                    {editingEventId === event.eid ? (
                      <input
                      style={{width:'5rem'}}
                        type="datetime-local"
                        name="endTime"
                        value={newEvent.endTime}
                        onChange={handleChange}
                      />
                    ) : (
                      formatDate(event.endTime)
                    )}
                  </td>
                  <td>{formatDay(event.startTime)}</td>
                  <td>
                    {editingEventId === event.eid ? (
                      <input
                      style={{width:'5rem'}}
                        type="text"
                        name="place"
                        value={newEvent.place}
                        onChange={handleChange}
                      />
                    ) : (
                      event.place
                    )}
                  </td>
                  <td>
                    {editingEventId === event.eid ? (
                      <input
                      // style={{width:'5rem'}}
                        type="text"
                        name="description"
                        value={newEvent.description}
                        onChange={handleChange}
                      />
                    ) : (
                      event.description
                    )}
                  </td>
                  <td>{event.status}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      style={{ margin: "0 5px 0 0" }}
                      disabled={event.status === "closed"}
                      onClick={() => handleInterest(event)}
                    >
                      Interested
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleViewOrganizers(event.eid)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    {editingEventId === event.eid ? (
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
                      <BsPencilSquare
                        style={{ fontSize: "20px", color: "blue", cursor:'pointer' }}
                        onClick={() => startEditing(event)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Organizer eventId={selectedEventId} /> */}
        </>
      )}
    </div>
  );
};

export default Events;
