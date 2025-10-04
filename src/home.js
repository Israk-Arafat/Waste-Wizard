import React, { useState, useRef } from 'react';
import Navigation from './components/Navigation';
import './home.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  const closeMenu = (e) => {
    if (!e.target.closest('.hamburger-menu')) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

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
      
      // Convert to image data URL
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageDataUrl);
      
      // Close camera after capture
      closeCamera();
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    openCamera();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadCapturedImage = () => {
    
  };

  return (
    <div className="App">
      <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div className="content">
        {isCameraOpen ? (
          <div className="camera-container">
            <video ref={videoRef} autoPlay playsInline className="camera-video" />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div className="camera-controls">
              <button onClick={captureImage} className="capture-button">
                Capture Photo
              </button>
              <button onClick={closeCamera} className="close-camera-button">
                Close Camera
              </button>
            </div>
          </div>
        ) : capturedImage ? (
          <div className="image-result-container">
            <img src={capturedImage} alt="Captured" className="captured-image" />
            <div className="image-controls">
              <button onClick={uploadCapturedImage} className="upload-button">
                Upload Image
              </button>
              <button onClick={retakePhoto} className="retake-button">
                Retake Photo
              </button>
              <button onClick={() => setCapturedImage(null)} className="clear-button">
                Clear Image
              </button>
            </div>
          </div>
        ) : (
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
              <button className="image-button" onClick={openCamera}>
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
              <label className="image-button">
                <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                Select Image
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
