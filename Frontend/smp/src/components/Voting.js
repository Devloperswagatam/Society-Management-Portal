import React, { useState } from 'react';
import ApiService from './services/ApiService';

const Voting = () => {
  const api = new ApiService();
  const [postName, setPostName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handlePostNameChange = (e) => {
    setPostName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleAddVotingEvent = () => {
    const votingEvent = {
      postname: postName,
      description: description,
      startTime: startTime,
      endTime: endTime,
    };

    api.addVotingEvent(votingEvent)
      .then(response => {
        // Handle the response after adding the voting event
        console.log('Voting event added successfully:', response.data);
        // Clear the input fields
        setPostName('');
        setDescription('');
        setStartTime('');
        setEndTime('');
      })
      .catch(error => {
        // Handle the error if adding the voting event fails
        console.error('Error adding voting event:', error);
      });
  };

  return (
    <div>
      <h2>Voting Page</h2>
      <div>
        <label>Post Name:</label>
        <input type="text" value={postName} onChange={handlePostNameChange} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={handleDescriptionChange} />
      </div>
      <div>
        <label>Start Time:</label>
        <input type="datetime-local" value={startTime} onChange={handleStartTimeChange} />
      </div>
      <div>
        <label>End Time:</label>
        <input type="datetime-local" value={endTime} onChange={handleEndTimeChange} />
      </div>
      <button onClick={handleAddVotingEvent}>Add Voting Event</button>
    </div>
  );
};

export default Voting;
