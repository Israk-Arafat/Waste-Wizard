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

      <section className="features" aria-labelledby="features-heading">
        <h2 id="features-heading">Why people trust WasteWizard</h2>
        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3l2.09 4.24L19 8.27l-3.46 3.38.82 4.79L12 14.77 7.64 16.44l.82-4.79L5 8.27l4.91-.73L12 3z" />
              </svg>
            </div>
            <h3>Quick and easy</h3>
            <p>Snap or upload any item and get a recycling answer in seconds—no manuals, no guesswork.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
            </div>
            <h3>Accurate classifications</h3>
            <p>Our AI is tuned for everyday materials, so you can sort plastics, paper, metal, and e-waste with confidence.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v7a8 8 0 0 1-16 0V4z" />
                <path d="M12 11v5" />
                <path d="M9 14h6" />
              </svg>
            </div>
            <h3>Actionable guidance</h3>
            <p>Receive simple disposal instructions and eco-friendly tips tailored to your local recycling habits.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3a7 7 0 0 1 7 7c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 7-7z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3>Privacy protected</h3>
            <p>Images stay on your device—analysis happens in-browser so nothing sensitive ever leaves your control.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16" />
                <path d="M10 11h10" />
                <path d="M4 15h16" />
                <path d="M4 11h2" />
                <path d="M4 19h16" />
              </svg>
            </div>
            <h3>Works everywhere</h3>
            <p>Use it on desktop or mobile—with just a browser, WasteWizard adapts to any camera or image source.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 7a5 5 0 0 1 5 5v1h1a3 3 0 1 1 0 6H6a3 3 0 1 1 0-6h1v-1a5 5 0 0 1 5-5z" />
                <path d="M9 18v1a3 3 0 0 0 6 0v-1" />
              </svg>
            </div>
            <h3>Free forever</h3>
            <p>No subscriptions or surprise costs—WasteWizard is a community-first tool for better recycling.</p>
          </article>
        </div>
      </section>
    </>
  );
}

export default App;
