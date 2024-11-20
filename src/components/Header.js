import React from 'react';
import { Link } from 'react-router-dom';



function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar-bg sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Chá de Fraldas
        </Link>
      </div>
    </nav>
  );
}

export default Header;
