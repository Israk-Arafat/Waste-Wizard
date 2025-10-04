# Waste Wizard

A simple React app that uses Google's Gemini AI to classify waste items as Recycle, Trash, or Compost based on photos.

## Features

- 📸 Take photos using device camera
- 📱 Upload images from device
- 🤖 AI-powered waste classification using Google Gemini
- ♻️ Clear categorization: Recycle, Trash, or Compost
- 💡 Simple one-line explanations for classifications
- 📱 Responsive design for all devices

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key

### 3. Configure Environment

1. create a .env file


2. Edit `.env` and add you Gemini api key:

```
REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Run the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

## How to Use

1. **Take a Photo**: Use the "Take Photo" button to capture an image with your camera
2. **Upload Photo**: Use the "Upload Photo" button to select an image from your device
3. **Get Results**: The AI will analyze the image and provide:
   - Classification (RECYCLE, TRASH, or COMPOST)
   - A brief explanation of why
4. **Analyze More**: Click "Analyze Another Item" to classify more items

## Component Structure

The app is built with modular components:

- `services/geminiService.js` - Handles AI image analysis
- `components/Navigation.js` - App navigation bar
- `components/ImageCapture.js` - Image capture and upload functionality
- `components/ResultsDisplay.js` - Shows classification results
- `components/WasteAnalyzer.js` - Main analyzer component
- `components/ErrorBoundary.js` - Error handling

## Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)

## Browser Compatibility

- Chrome (recommended for camera access)
- Firefox
- Safari
- Edge

Note: Camera access requires HTTPS in production environments.

## Troubleshooting

### "Gemini API key not found" Error

- Make sure you've created a `.env` file in the project root
- Verify the API key is correctly set in the `.env` file
- Restart the development server after adding the API key

### Camera Not Working

- Ensure you're using HTTPS (required for camera access)
- Check browser permissions for camera access
- Try using the "Upload Photo" option instead

### Analysis Failed

- Check your internet connection
- Verify your Gemini API key is valid and has quota remaining
- Try with a different, clearer image

## Available Scripts

### `npm start`

Runs the app in development mode at http://localhost:3000

### `npm test`

Launches the test runner in interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
