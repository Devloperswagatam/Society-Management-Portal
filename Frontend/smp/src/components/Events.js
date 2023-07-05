import React, { useState, useEffect } from 'react';
import ApiService from './services/ApiService';

const Events = () => {
  const api = new ApiService();
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    ename: '',
    place: '',
    budget: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  useEffect(() => {
    // Fetch events when the component mounts
    getEvents();
  }, []);

  const getEvents = () => {
    api
      .getEvents()
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.log('Error fetching events:', error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US');
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

  const addEvent = (e) => {
    e.preventDefault();
    api
      .addEvent(newEvent)
      .then((response) => {
        console.log('Event added successfully:', response.data);
        setNewEvent({
          ename: '',
          place: '',
          budget: '',
          startTime: '',
          endTime: '',
          description: '',
        });
        getEvents(); // Refresh events after adding a new event
        toggleForm(); // Hide the form after adding the event
      })
      .catch((error) => {
        console.log('Error adding event:', error);
      });
  };

  return (
    <div>
      <h2>Events Page</h2>
      <button onClick={toggleForm}>Create Event</button>

      {showForm ? (
        <form onSubmit={addEvent}>
          <input
            type="text"
            name="ename"
            placeholder="Event Name"
            value={newEvent.ename}
            onChange={handleChange}
          />
          <select
            name="place"
            value={newEvent.place}
            onChange={handleChange}
          >
            <option value="">Select Place</option>
            <option value="hall">Hall</option>
            <option value="ground">Ground</option>
          </select>
          <input
            type="text"
            name="budget"
            placeholder="Budget"
            value={newEvent.budget}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            name="startTime"
            placeholder="Start Time"
            value={newEvent.startTime}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            name="endTime"
            placeholder="End Time"
            value={newEvent.endTime}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newEvent.description}
            onChange={handleChange}
          />
          <button type="submit">Add Event</button>
        </form>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.eid}>
                <td>{event.ename}</td>
                <td>{formatDate(event.startTime)}</td>
                <td>{formatDate(event.endTime)}</td>
                <td>{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Events;
