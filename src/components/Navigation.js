import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Navigation.css';
import logo from '../assets/Logo_artist-Israk.png';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  const closeMenu = (e) => {
    if (!e.target.closest('.hamburger-menu')) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <Link to="/" onClick={handleMenuLinkClick}>
          <img src={logo} alt="WasteWizard Logo" className="navbar-logo" />
        </Link>
      </div>
      <div className="navbar-brand">
        <Link to="/" className="brand-link" onClick={handleMenuLinkClick}>
          WasteWizard
        </Link>
      </div>
      <div className="hamburger-menu">
        <div className="dropdown">
          <button className="hamburger" onClick={toggleMenu}>☰</button>
          <div className={`dropdown-content ${isMenuOpen ? 'show-dropdown' : ''}`}>
            <Link to="/" onClick={handleMenuLinkClick}>Home</Link>
            <Link to="/rules" onClick={handleMenuLinkClick}>Rules</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;