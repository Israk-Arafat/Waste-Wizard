import React from 'react';
import './rule.css';

function Rules() {
  return (
    <div className="Rules">
      <nav className="navbar">
        <div className="hamburger-menu">
          <div className="dropdown">
            <button className="hamburger">☰</button>
            <div className="dropdown-content">
              <a href="/">Home</a>
              <a href="/rules">Rules</a>
            </div>
          </div>
        </div>
        <div className="navbar-brand">
          <a href="/" className="brand-link">WasteWizard</a>
        </div>
      </nav>
      <div className="content">
        <h1>Rules Page</h1>
        {/* Add your rules content here */}
      </div>
    </div>
  );
}

export default Rules;
