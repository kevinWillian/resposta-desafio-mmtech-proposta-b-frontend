import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

//css
import 'bootstrap/dist/css/bootstrap.min.css';

// Páginas
import Travels from './pages/Travels';
import Itinerarys from './pages/Itinerarys';
import AddTravel from './pages/AddTravel';
import AddItinerary from './pages/AddItinerary';
import EditItenerary from './pages/EditItinerary'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Travels />} />
        <Route path="/addTravel" element={<AddTravel />} />
        <Route path="/addItinerary/:_id" element={<AddItinerary />} />
        <Route path="/Itinerarys/:_id" element={<Itinerarys />} />
        <Route path="/EditItinerarys/:_id" element={<EditItenerary />} />
      </Routes>
    </Router>
  );
}

export default App;