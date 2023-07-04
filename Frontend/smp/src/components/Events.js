import React, { useState } from 'react';
import ApiService from './services/ApiService';

const Events = () => {
  const api = new ApiService();

  const [ename, setEventName] = useState('');
  const [place, setPlace] = useState('');
  const [budget, setBudget] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCreateEvent = (event) => {
    event.preventDefault();

    const newEvent = {
      ename,
      place,
      budget,
      startTime,
      endTime,
      description,
    };

    api.addEvent(newEvent)
      .then((response) => {
        console.log('Event created successfully:', response.data);
        // Perform any additional actions after event creation
      })
      .catch((error) => {
        console.error('Error creating event:', error);
        // Handle any errors that occur during event creation
      });

    // Reset the input fields after event creation
    setEventName('');
    setPlace('');
    setBudget('');
    setStartTime('');
    setEndTime('');
    setDescription('');
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleCreateEvent}>
        <div>
          <label>Event Name:</label>
          <input type="text" value={ename} onChange={handleEventNameChange} required />
        </div>
        <div>
          <label>Place:</label>
          <input type="text" value={place} onChange={handlePlaceChange} required />
        </div>
        <div>
          <label>Budget:</label>
          <input type="number" value={budget} onChange={handleBudgetChange} required />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="datetime-local" value={startTime} onChange={handleStartTimeChange} required />
        </div>
        <div>
          <label>End Time:</label>
          <input type="datetime-local" value={endTime} onChange={handleEndTimeChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} required />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default Events;
