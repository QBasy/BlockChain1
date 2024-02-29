import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './components/index';
import StartVoting from './components/startvoting';
import Voting from './components/voting';

import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById('root'));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/startvoting" element={<StartVoting />}/>
        <Route path="/voting" element={<Voting />}/>
      </Routes>
    </BrowserRouter>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;

