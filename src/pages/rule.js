import React from 'react';
import './css/rule.css';
import rulesPoster from '../assets/rule.png';

function Rules() {
  return (
    <div className="Rules">
      <div className="rules-container">
        <h1>UMaine Recycling Guidelines</h1>
        <div className="rules-flex-container">
          <div className="rules-grid">
            <div className="rule-card system-card">
              <h2>Zero-Sort Recycling System</h2>
              <p>The University of Maine uses the Casella Zero-Sort recycling system.</p>
              <p>✓ Blue Bin = Zero Sort Recycling</p>
              <p>✓ Grey Bin = Trash</p>
            </div>
            <div className="rule-card">
              <h2>Plastics</h2>
              <p>✓ Plastics #1-7 (check bottom for number)</p>
              <p>✗ No plastic film</p>
              <p>✗ No Styrofoam</p>
              <p>✗ No plastic utensils</p>
            </div>
            <div className="rule-card">
              <h2>Glass & Metal</h2>
              <p>✓ Glass bottles & jars (food/beverage only)</p>
              <p>✓ Empty aerosol cans</p>
              <p>✓ Clean aluminum cans, foil & pie plates</p>
              <p>✓ Metal cans (labels okay)</p>
            </div>
            <div className="rule-card">
              <h2>Paper Products</h2>
              <p>✓ Paperboard (cereal, shoe boxes)</p>
              <p>✓ Corrugated cardboard</p>
              <p>✓ Clean envelopes & opened mail</p>
              <p>✓ Magazines & soft-cover books</p>
              <p>✓ Clean and dry newspaper</p>
              <p>✓ White & colored paper</p>
            </div>
          </div>
          <div className="rules-poster">
            <img src={rulesPoster} alt="UMaine Recycling Rules Poster" className="rules-poster-image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rules;
