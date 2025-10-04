import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './css/Navigation.css';
import logo from '../assets/Logo_artist-Israk.png';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-branding">
        <Link to="/" className="brand-link" onClick={handleMenuLinkClick}>
          <img src={logo} alt="WasteWizard Logo" className="navbar-logo" />
          <span className="brand-name">WasteWizard</span>
        </Link>
        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            onClick={handleMenuLinkClick}
          >
            Home
          </NavLink>
          <NavLink
            to="/rules"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            onClick={handleMenuLinkClick}
          >
            Rules
          </NavLink>
        </div>
      </div>
      <div className="hamburger-menu">
        <div className="dropdown">
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
            aria-controls="mobile-navigation"
          >
            ☰
          </button>
          <div
            id="mobile-navigation"
            className={`dropdown-content ${isMenuOpen ? 'show-dropdown' : ''}`}
            role="menu"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={handleMenuLinkClick}
              role="menuitem"
            >
              Home
            </NavLink>
            <NavLink
              to="/rules"
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={handleMenuLinkClick}
              role="menuitem"
            >
              Rules
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;