import React from 'react';
import './Navigation.css';

const Navigation = ({ isMenuOpen, toggleMenu }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <a href="/">
          <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="WasteWizard Logo" className="navbar-logo" />
        </a>
      </div>
      <div className="navbar-brand">
        <a href="/" className="brand-link">WasteWizard</a>
      </div>
      <div className="hamburger-menu">
        <div className="dropdown">
          <button className="hamburger" onClick={toggleMenu}>☰</button>
          <div className={`dropdown-content ${isMenuOpen ? 'show-dropdown' : ''}`}>
            <a href="/">Home</a>
            <a href="/rules">Rules</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;