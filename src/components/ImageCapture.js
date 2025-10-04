import React, { useState, useRef } from 'react';
import './ImageCapture.css';

const ImageCapture = ({ onImageCapture, isAnalyzing }) => {
  const [preview, setPreview] = useState(null);
  const [capturedFile, setCapturedFile] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [captureMethod, setCaptureMethod] = useState(null); // 'camera' or 'upload'
  const cameraInputRef = useRef(null);
  const uploadInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        alert('File size too large. Please choose an image smaller than 10MB.');
        event.target.value = ''; // Clear the input
        return;
      }

      // Store the file for later analysis
      setCapturedFile(file);
      setCaptureMethod('upload');

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
    setCapturedFile(null);
    setCaptureMethod(null);
    // Close camera if open
    if (isCameraOpen) {
      closeCamera();
    }
    // Reset file inputs using refs
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
    if (uploadInputRef.current) {
      uploadInputRef.current.value = '';
    }
  };

  const handleAnalyze = () => {
    if (capturedFile && onImageCapture) {
      onImageCapture(capturedFile);
    }
  };

  const handleRetake = () => {
    const previousMethod = captureMethod;

    setPreview(null);
    setCapturedFile(null);

    if (previousMethod === 'camera') {
      if (uploadInputRef.current) {
        uploadInputRef.current.value = '';
      }
      openCamera();
    } else {
      if (isCameraOpen) {
        closeCamera();
      }

      if (cameraInputRef.current) {
        cameraInputRef.current.value = '';
      }

      if (previousMethod === 'upload' && uploadInputRef.current) {
        uploadInputRef.current.value = '';
        if (!isAnalyzing) {
          setTimeout(() => {
            if (uploadInputRef.current) {
              uploadInputRef.current.click();
            }
          }, 0);
        }
      } else if (uploadInputRef.current) {
        uploadInputRef.current.value = '';
      }
    }

    setCaptureMethod(null);
  };

  const handleUploadClick = () => {
    if (uploadInputRef.current && !isAnalyzing) {
      uploadInputRef.current.click();
    }
  };

  // Camera functionality
  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Use back camera if available
        audio: false // We only need video for images
      });
      
      setStream(mediaStream);
      setIsCameraOpen(true);
      
      // Set video stream after state updates
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied or not available. Please check your camera permissions.');
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to blob and create file
      canvas.toBlob((blob) => {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        
        // Store the file for later analysis
        setCapturedFile(file);
        setCaptureMethod('camera');
        
        // Convert to image data URL for preview
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setPreview(imageDataUrl);
        
        // Close camera after capture
        closeCamera();
      }, 'image/jpeg', 0.8);
    }
  };

  const handleCameraButtonClick = () => {
    if (!isAnalyzing) {
      openCamera();
    }
  };

  return (
    <div className="image-capture-container">
      {isCameraOpen ? (
        <div className="camera-container">
          <video ref={videoRef} autoPlay playsInline className="camera-video" />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div className="camera-controls">
            <button 
              onClick={captureImage} 
              className="capture-button"
              disabled={isAnalyzing}
            >
              📷 Capture Photo
            </button>
            <button 
              onClick={closeCamera} 
              className="close-camera-button"
              disabled={isAnalyzing}
            >
              Close Camera
            </button>
          </div>
        </div>
      ) : !preview ? (
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
            <button 
              className="image-button"
              onClick={handleCameraButtonClick}
              disabled={isAnalyzing}
              type="button"
            >
              Open Camera
            </button>
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
            <input 
              ref={uploadInputRef}
              type="file" 
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" 
              onChange={handleImageChange}
              disabled={isAnalyzing}
              style={{ display: 'none' }}
            />
            <button 
              className="image-button"
              onClick={handleUploadClick}
              disabled={isAnalyzing}
              type="button"
            >
              Select Image
            </button>
          </div>
        </div>
      ) : (
        <div className="image-preview-container">
          <div className="image-preview">
            <img src={preview} alt="Selected item" />
          </div>
          <div className="image-actions">
            <button 
              className="analyze-button" 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              🔍 Analyze Image
            </button>
            <button 
              className="retake-button" 
              onClick={handleRetake}
              disabled={isAnalyzing}
            >
              🔄 Retake
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