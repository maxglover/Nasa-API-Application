import APOD from './components/apod';
import VIEW from './components/view';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<APOD />} />
        <Route path="/view" element={<VIEW />} />
    </Routes>
</Router>
  );
}

export default App;
