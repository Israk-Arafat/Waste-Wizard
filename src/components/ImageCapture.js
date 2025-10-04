import React, { useState } from 'react';
import './ImageCapture.css';

const ImageCapture = ({ onImageCapture, isAnalyzing }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!supportedTypes.includes(file.type)) {
        alert(`Unsupported image format: ${file.type}\nPlease use JPEG, PNG, WebP, or GIF.`);
        event.target.value = ''; // Clear the input
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Pass file to parent component
      onImageCapture(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
  };

  return (
    <div className="image-capture-container">
      {!preview ? (
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
              <input 
                type="file" 
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" 
                capture="environment" 
                onChange={handleImageChange}
                disabled={isAnalyzing}
              />
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
              <input 
                type="file" 
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" 
                onChange={handleImageChange}
                disabled={isAnalyzing}
              />
              Select Image
            </label>
          </div>
        </div>
      ) : (
        <div className="image-preview-container">
          <div className="image-preview">
            <img src={preview} alt="Selected item" />
          </div>
          <div className="image-actions">
            <button 
              className="clear-button" 
              onClick={clearImage}
              disabled={isAnalyzing}
            >
              Choose Different Image
            </button>
          </div>
          {isAnalyzing && (
            <div className="analyzing-overlay">
              <div className="spinner"></div>
              <p>Analyzing image...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCapture;