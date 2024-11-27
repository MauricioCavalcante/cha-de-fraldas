import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import GlobalStyles from './styles/GlobalStyles';


function App() {
  return (
    <>
    <GlobalStyles />
    <Router >
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
