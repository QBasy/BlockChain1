import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './Index';
import StartVoting from './StartVoting';
import Voting from './Voting';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Index} />
        <Route path="/startvoting" component={StartVoting} />
        <Route path="/voting" component={Voting} />
      </Routes>
    </Router>
  );
}

export default App;
