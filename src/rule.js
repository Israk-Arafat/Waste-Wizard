import React from 'react';
import './rule.css';

function Rules() {
  return (
    <div className="Rules">
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
            <button className="hamburger">☰</button>
            <div className="dropdown-content">
              <a href="/">Home</a>
              <a href="/rules">Rules</a>
            </div>
          </div>
        </div>
      </nav>
      <div className="content">
        <div className="rules-container">
          <h1>Recycling Guidelines</h1>
          <div className="rules-grid">
            <div className="rule-card">
              <h2>Paper and Cardboard</h2>
              <p>✓ Clean paper and cardboard</p>
              <p>✓ Magazines and newspapers</p>
              <p>✗ Soiled or greasy paper</p>
              <p>✗ Wax-coated containers</p>
            </div>
            <div className="rule-card">
              <h2>Plastics</h2>
              <p>✓ Clean plastic containers</p>
              <p>✓ Bottles and jugs</p>
              <p>✗ Plastic bags</p>
              <p>✗ Styrofoam</p>
            </div>
            <div className="rule-card">
              <h2>Glass</h2>
              <p>✓ Glass bottles and jars</p>
              <p>✓ Clear and colored glass</p>
              <p>✗ Window glass</p>
              <p>✗ Ceramics</p>
            </div>
            <div className="rule-card">
              <h2>Metal</h2>
              <p>✓ Aluminum cans</p>
              <p>✓ Steel and tin cans</p>
              <p>✗ Paint cans</p>
              <p>✗ Aerosol cans</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rules;
