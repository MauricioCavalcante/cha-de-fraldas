import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import Header from './components/Header';
import RSVP from './pages/RSVP';
import Gallery from './pages/Gallery';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <Router>
      <Header />
      <GlobalStyles />
      <Routes>
        <Route path="/cha-de-fraldas" element={<Home />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
