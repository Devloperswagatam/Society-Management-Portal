import React, { useState, useEffect } from "react";
import ApiService from "./services/ApiService";
import { Table, Form, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BsFillClipboardCheckFill, BsPencilSquare } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import CustomCalendar from "./CustomCalendar";
import { formatDateTimeToUTC, formatDateTimeToIndianTime } from "./Utils";

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
    wantorganizer: false,
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
          const currentDate = new Date(); // Current date in UTC timezone
          filteredEvents = filteredEvents.filter(
            (event) => new Date(event.endTime) < currentDate
          );
        } else if (filter === "future") {
          const currentDate = new Date(); // Current date in UTC timezone
          filteredEvents = filteredEvents.filter(
            (event) => new Date(event.startTime) >= currentDate
          );
        }

        // Convert UTC start and end times to Indian Standard Time (IST) for display
        filteredEvents = filteredEvents.map((event) => ({
          ...event,
          startTime: formatDateTimeToIndianTime(event.startTime),
          endTime: formatDateTimeToIndianTime(event.endTime),
        }));

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
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    return `${hours} ${ampm}`;
  };

  const formatDay = (dateString) => {
    const day = new Date(dateString);
    return day.toLocaleDateString("en-US", { day: "numeric", month: "long" });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Helper function to calculate event duration in hours
  const calculateDurationInHours = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationInMilliseconds = endTime - startTime;
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
    return durationInHours;
  };

  // Updated handleChange function to recalculate the budget
  const handleChange = (name, value) => {
    if (name === "place" || name === "startTime" || name === "endTime") {
      // If the place or event duration changes, calculate the new budget
      const durationInHours = calculateDurationInHours(
        name === "startTime" ? value : newEvent.startTime,
        name === "endTime" ? value : newEvent.endTime
      );
      let budget = 0;
      if (name === "place") {
        // Set budget based on the selected place
        budget =
          value === "hall" ? durationInHours * 1000 : durationInHours * 2000;
      } else {
        // Set budget based on the current place value (already selected)
        const currentPlace = newEvent.place;
        budget =
          currentPlace === "hall"
            ? durationInHours * 1000
            : durationInHours * 2000;
      }
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
        budget: budget.toFixed(2), // Keep budget with 2 decimal places
      }));
    } else {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
      }));
    }
  };

  const cancelEditing = () => {
    setEditingEventId("");
  };

  const startEditing = (event) => {
    setNewEvent(event);
    setEditingEventId(event.eid);
  };

  const saveChanges = async () => {
    const eventData = {
      ...newEvent,
      startTime: formatDateTimeToUTC(newEvent.startTime), // Convert to UTC before saving
      endTime: formatDateTimeToUTC(newEvent.endTime), // Convert to UTC before saving
      // wantorganizer: newEvent.wantorganizer,
    };

    await api
      .updateEvent(eventData)
      .then(() => {
        toast.success("Event Updated", {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
        });
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.eid === eventData.eid ? eventData : event
          )
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
          autoClose: 1000,
        });
      });
  };

  const addEvent = (e) => {
    e.preventDefault();

    const eventData = {
      ...newEvent,
      startTime: formatDateTimeToUTC(newEvent.startTime), // Convert to UTC before saving
      endTime: formatDateTimeToUTC(newEvent.endTime), // Convert to UTC before saving
      wantorganizer: newEvent.wantorganizer,
    };

    api
      .addEvent(eventData)
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
          wantorganizer: false,
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
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.startTime);
      return eventDate.getDate() === filteredDate.getDate();
    });
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

  const toggleOrganizer = () => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      wantorganizer: !prevEvent.wantorganizer,
    }));
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
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{backgroundColor:'#f5f6fa'}}>
              <h2 className="text-center m-4">Create Event</h2>
              <Form onSubmit={addEvent}>
                <div
                  className="mb-3"
                  style={{ marginLeft: "-25rem", marginTop: "-3rem" }}
                >
                  <div>
                    Want Organizer ?&nbsp;&nbsp;
                    <Button
                      name="wantorganizer"
                      value={newEvent.wantorganizer.toString()}
                      variant={newEvent.wantorganizer ? "success" : "danger"}
                      onClick={toggleOrganizer}
                      style={{ marginRight: "1rem" }}
                    >
                      {newEvent.wantorganizer ? "Yes" : "No"}
                    </Button>
                  </div>
                </div>
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
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="Place">Place:</label>
                  <select
                    className="form-control"
                    name="place"
                    value={newEvent.place}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    required
                  >
                    <option value="">Select Place</option>
                    <option value="hall">Hall (1000₹/hour, including GSt)</option>
                    <option value="ground">Ground (2000₹/hour, including GSt)</option>
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
                    pattern="[0-9]{10}"
                    placeholder="Calculated budget will show here"
                    value={newEvent.budget}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    required
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="StartDateTime" className="form-label">
                    Start Date and Time:
                  </label>
                  <CustomCalendar
                    selected={newEvent.startTime}
                    onChange={(date) => handleChange("startTime", date)} // Pass selected and onChange props
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="EndDateTime">End Date and Time:</label>
                  <CustomCalendar
                    selected={newEvent.endTime}
                    onChange={(date) => handleChange("endTime", date)} // Pass selected and onChange props
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Description">Description:</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter the Event Description"
                    name="description"
                    value={newEvent.description}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    required
                  />
                </div>
                <button
                  className="btn btn-outline-primary"
                  type="submit"
                  style={{ marginRight: "1rem" }}
                >
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
              {/* <Form.Group controlId="searchDate">
                <Form.Control
                  type="date"
                  value={searchDate}
                  onChange={handleSearchDateChange}
                />
              </Form.Group> */}
              <Button onClick={handleSearch} className="mr-2">
                Apply
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setSearchDate("");
                  getEvents();
                }}
              >
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
                <th>Organizer</th>
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
                        style={{ width: "5rem" }}
                        type="text"
                        name="ename"
                        value={newEvent.ename}
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                    ) : (
                      event.ename
                    )}
                  </td>
                  <td>
                    {editingEventId === event.eid ? (
                      <CustomCalendar
                        selected={newEvent.startTime}
                        onChange={(date) => handleChange("startTime", date)} // Pass selected and onChange props
                      />
                    ) : (
                      formatDate(event.startTime)
                    )}
                  </td>
                  <td>
                    {editingEventId === event.eid ? (
                      <CustomCalendar
                        selected={newEvent.endTime}
                        onChange={(date) => handleChange("endTime", date)} // Pass selected and onChange props
                      />
                    ) : (
                      formatDate(event.endTime)
                    )}
                  </td>
                  <td>{formatDay(event.startTime)}</td>
                  <td>
                    {editingEventId === event.eid ? (
                      <input
                        style={{ width: "5rem" }}
                        type="text"
                        name="place"
                        value={newEvent.place}
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
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
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                    ) : (
                      event.description
                    )}
                  </td>
                  <td>{event.status}</td>
                  <td>
                    {editingEventId === event.eid ? (
                      <Form.Select
                        name="wantorganizer"
                        value={newEvent.wantorganizer.toString()}
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                    ) : event.wantorganizer ? (
                      "Yes"
                    ) : (
                      "No"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      style={{ margin: "0 5px 0 0" }}
                      disabled={
                        !event.wantorganizer || event.status === "closed"
                      }
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
                        style={{
                          fontSize: "25px",
                          color: "blue",
                          cursor: "pointer",
                        }}
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
