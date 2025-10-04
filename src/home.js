import React from 'react';
import Navigation from './components/Navigation';
import WasteAnalyzer from './components/WasteAnalyzer';
import ErrorBoundary from './components/ErrorBoundary';
import './home.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="content">
        <ErrorBoundary>
          <WasteAnalyzer />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
