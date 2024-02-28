// StartVoting.js
import React, { useState } from 'react';
import './style.css';

const StartVoting = () => {
  const [electionName, setElectionName] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [notification, setNotification] = useState('');

  const handleStartElection = async (event) => {
    event.preventDefault();
    // Implement logic to start a new election here
    console.log('New election started:', electionName, startDateTime, endDateTime);
    // Show notification
    setNotification('Vote event initiated successfully!');
    // Clear form fields
    setElectionName('');
    setStartDateTime('');
    setEndDateTime('');
  };

  return (
    <div className="container">
      <header>
        <h1>Start a Voting Event</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/voting">Vote Now</a></li>
            <li><a href="/startvoting">Start Voting Event</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <form id="startVotingForm" onSubmit={handleStartElection}>
          <label htmlFor="electionName">Election Name:</label>
          <input type="text" id="electionName" name="electionName" value={electionName} onChange={(e) => setElectionName(e.target.value)} required />
          <label htmlFor="startDateTime">Start Date and Time:</label>
          <input type="datetime-local" id="startDateTime" name="startDateTime" value={startDateTime} onChange={(e) => setStartDateTime(e.target.value)} required />
          <label htmlFor="endDateTime">End Date and Time:</label>
          <input type="datetime-local" id="endDateTime" name="endDateTime" value={endDateTime} onChange={(e) => setEndDateTime(e.target.value)} required />
          <button type="submit">Initiate Voting Event</button>
          {notification && <div className="notification">{notification}</div>}
        </form>
      </main>
      <footer>
        <p>Initiating secure voting events with GovVoteChain.</p>
      </footer>
    </div>
  );
}

export default StartVoting;
