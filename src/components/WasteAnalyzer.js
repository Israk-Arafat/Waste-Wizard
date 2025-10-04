import React, { useState } from 'react';
import ImageCapture from './ImageCapture';
import ResultsDisplay from './ResultsDisplay';
import geminiService from '../services/geminiService';
import './css/WasteAnalyzer.css';

const WasteAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageCapture = async (imageFile) => {
    try {
      setIsAnalyzing(true);
      setError(null);
      setResult(null);

      const analysisResult = await geminiService.analyzeWasteItem(imageFile);
      setResult(analysisResult);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="waste-analyzer">
      <div className="analyzer-header">
        <h1>Waste Classification</h1>
        <p>Take or upload a photo to instantly classify your item</p>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)} className="dismiss-error">
            Dismiss
          </button>
        </div>
      )}

      {!result ? (
        <ImageCapture 
          onImageCapture={handleImageCapture}
          isAnalyzing={isAnalyzing}
        />
      ) : (
        <ResultsDisplay 
          result={result}
          onNewAnalysis={handleNewAnalysis}
        />
      )}
    </div>
  );
};

export default WasteAnalyzer;