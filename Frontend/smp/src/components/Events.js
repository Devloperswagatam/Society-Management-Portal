import React, { useState, useEffect } from 'react';
import ApiService from './services/ApiService';
import { Link } from "react-router-dom";

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
         <div className="container">
         <div className="row">
           <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
             <h2 className="text-center m-4">Create Event</h2>
             <form onSubmit={addEvent}>
               <div className="mb-3">
                 <label htmlFor="eventName" className="form-label">
                   Event Name:
                 </label>
                 <input
                   type="text"
                   className="form-control"
                   placeholder="Enter the Event Name"
                   name="eventName"
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
                   value={newEvent.description}
                   onChange={handleChange}
                   required
                 />
               </div>
               <button className="btn btn-outline-primary" type="submit">
                 Create Event
               </button>
               <Link className="btn btn-outline-danger mx-2" to="/home">
                 Cancel
               </Link>
             </form>
           </div>
         </div>
       </div>
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
