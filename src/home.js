import React from 'react';
import Navigation from './components/Navigation';
import WasteAnalyzer from './components/WasteAnalyzer';
import ErrorBoundary from './components/ErrorBoundary';
import './home.css';
import { useState, useRef } from 'react';

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
