import React from 'react';
import WasteAnalyzer from '../components/WasteAnalyzer';
import ErrorBoundary from '../components/ErrorBoundary';
import './css/home.css';

function App() {
  return (
    <ErrorBoundary>
      <WasteAnalyzer />
    </ErrorBoundary>
  );
}

export default App;
