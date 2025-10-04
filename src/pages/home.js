import React from 'react';
import WasteAnalyzer from '../components/WasteAnalyzer';
import ErrorBoundary from '../components/ErrorBoundary';
import './css/home.css';

function App() {
  return (
    <>
      <ErrorBoundary>
        <WasteAnalyzer />
      </ErrorBoundary>
      <section className="usage-guide" aria-labelledby="usage-guide-heading">
        <h2 id="usage-guide-heading">How to use WasteWizard</h2>
        <ol className="usage-steps">
          <li>Select <strong>Take Photo</strong> or <strong>Upload Photo</strong> to provide an image of your item.</li>
          <li>Wait a moment while the AI classifies the item and explains the best disposal method.</li>
          <li>Review the recommendation, then tap <strong>Analyze Another Item</strong> to keep scanning.</li>
        </ol>
        <p className="usage-tip">Tip: Clear, well-lit photos help the model give more accurate advice.</p>
      </section>
    </>
  );
}

export default App;
