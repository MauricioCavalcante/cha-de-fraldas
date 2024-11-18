import React from 'react';
import { Link } from 'react-router-dom';



function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar-bg sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Chá de Fraldas
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rsvp">
                Confirmar Presença
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">
                Galeria
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
