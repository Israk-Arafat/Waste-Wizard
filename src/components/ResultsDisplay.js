import React from 'react';
import './css/ResultsDisplay.css';

const ResultsDisplay = ({ result, onNewAnalysis }) => {
  if (!result) return null;

  const getResultIcon = (category) => {
    switch (category) {
      case 'RECYCLE':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
            <path d="M8 12l2 2 4-4"/>
          </svg>
        );
      case 'COMPOST':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        );
      case 'E-WASTE':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="14" rx="2" ry="2" />
            <path d="M7 20h10" />
            <path d="M9 16v4" />
            <path d="M15 16v4" />
            <path d="M9 9h6" />
            <path d="M12 9v3" />
          </svg>
        );
      case 'BOTTLE DEPOSIT':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6a3 3 0 0 1 6 0v2a2 2 0 0 1-.59 1.41l-.82.82a2 2 0 0 0-.59 1.41V20a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2v-8.36a2 2 0 0 0-.59-1.41l-.82-.82A2 2 0 0 1 9 8V6z" />
            <path d="M9 6h6" />
            <path d="M10 2h4" />
          </svg>
        );
      case 'TRASH':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getResultColor = (category) => {
    switch (category) {
      case 'RECYCLE':
        return '#4CAF50'; // Green
      case 'COMPOST':
        return '#FF9800'; // Orange
      case 'E-WASTE':
        return '#0ea5e9'; // Teal-blue
      case 'BOTTLE DEPOSIT':
        return '#f59e0b'; // Amber
      case 'TRASH':
        return '#f44336'; // Red
      default:
        return '#757575'; // Gray
    }
  };

  return (
    <div className="results-container">
      <div 
        className="result-card"
        style={{ borderColor: getResultColor(result.category) }}
      >
        <div 
          className="result-icon"
          style={{ color: getResultColor(result.category) }}
        >
          {getResultIcon(result.category)}
        </div>
        
        <h2 
          className="result-category"
          style={{ color: getResultColor(result.category) }}
        >
          {result.category}
        </h2>
        
        <p className="result-reason">
          {result.reason}
        </p>

        {result.category === 'E-WASTE' && (
          <div className="result-note">
            <h4>UMaine eWaste Recycling</h4>
            <p>
              UM IT handles campus eWaste. Call <a href="tel:18006964357">1-800-696-4357</a> or email <a href="mailto:help@maine.edu">help@maine.edu</a> to schedule GiveITGetIT collection.
            </p>
          </div>
        )}
        
        <button 
          className="new-analysis-button"
          onClick={onNewAnalysis}
        >
          Analyze Another Item
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;