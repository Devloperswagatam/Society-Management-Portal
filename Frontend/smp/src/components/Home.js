import React, { useState, useEffect } from 'react';
import ApiService from './services/ApiService';

const Home = () => {
  const api = new ApiService();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events when the component mounts
    getEvents();
  }, []);

  const getEvents = () => {
    api.getEvents()
      .then(response => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch(error => {
        console.log('Error fetching events:', error);
      });
  };

  return (
    <div>
      <h2>Home Page</h2>
      <h3>Events:</h3>
      <ul>
        {events.map(event => (
          <li key={event.eid}>{event.ename}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
