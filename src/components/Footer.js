import React from 'react';
import './css/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer" aria-label="Site footer">
      <div className="footer-inline">
        <div className="footer-branding">
          <h2>WasteWizard</h2>
        </div>

        <nav className="footer-links" aria-label="Helpful site links">
          
          <a className="footer-link" href="mailto:wastewizardapp@gmail.com">
            Contact
          </a>
        </nav>

        <div className="footer-updates">
          <p>Have recycling tips or feedback?</p>
        </div>

        <span className="footer-meta">
          &copy; {currentYear} WasteWizard. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
