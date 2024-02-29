// Voting.js
import React, { useState } from 'react';
import './css/style.css';
import ReactDOM from "react-dom/client";
import App from "../App";

const Voting = () => {
  const [voterID, setVoterID] = useState('');
  const [voteOption, setVoteOption] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmitVote = (event) => {
    event.preventDefault();
    // Submit vote to the blockchain
    console.log('Vote submitted:', voterID, voteOption);
    // Show notification
    setNotification('Vote submitted successfully!');
    // Clear form fields
    setVoterID('');
    setVoteOption('');
    // Trigger confetti animation or any other UI effect
  };

  return (
    <div className="container">
      <header>
        <h1>GovVoteChain Voting Page</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/BlockChain1/src/reactFrontend/votechain/src/voting">Vote Now</a></li>
            <li><a href="/BlockChain1/src/reactFrontend/votechain/src/startvoting">Start Voting Event</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <form id="voteForm" onSubmit={handleSubmitVote}>
          <label htmlFor="voterID">Voter ID:</label>
          <input type="text" id="voterID" name="voterID" value={voterID} onChange={(e) => setVoterID(e.target.value)} required />
          <label htmlFor="voteOption">Select your candidate:</label>
          <select id="voteOption" name="voteOption" value={voteOption} onChange={(e) => setVoteOption(e.target.value)} required>
            <option value="">Select an option</option>
            <option value="candidate1">Jane Doe - Candidate 1</option>
            <option value="candidate2">John Smith - Candidate 2</option>
            <option value="candidate3">Alex Johnson - Candidate 3</option>
            <option value="candidate4">Samantha Lee - Candidate 4</option>
          </select>
          <button type="submit">Submit Vote</button>
          {notification && <div className="notification">{notification}</div>}
        </form>
      </main>
      <footer>
        <p>Secure and transparent voting with blockchain technology.</p>
      </footer>
    </div>
  );
}

export default Voting;
