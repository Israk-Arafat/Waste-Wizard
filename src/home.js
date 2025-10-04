import React, { useState } from 'react';
import './home.css';

function App() {
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

  React.useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  return (
    <div className="App">
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
      <div className="content">
        <div className="image-options-container">
          <div className="image-option-card">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            <h2>Take Photo</h2>
            <p>Use your camera to capture an image</p>
            <label className="image-button">
              <input type="file" accept="image/*" capture="environment" />
              Open Camera
            </label>
          </div>

          <div className="image-option-card">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
            </div>
            <h2>Upload Photo</h2>
            <p>Choose an image from your device</p>
            <label className="image-button">
              <input type="file" accept="image/*" />
              Select Image
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
