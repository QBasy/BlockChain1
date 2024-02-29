import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Index from './index';
import StartVoting from './startvoting';
import Voting from './voting';

const App = () => {
  {
    return (
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/startvoting" element={<StartVoting />} />
          <Route path="/voting" element={<Voting />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
