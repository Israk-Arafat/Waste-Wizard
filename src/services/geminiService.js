import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    // You'll need to set your API key as an environment variable
    // Create a .env file in your project root with: REACT_APP_GEMINI_API_KEY=your_api_key_here
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    
    if (!this.apiKey) {
      console.error('Gemini API key not found. Please set REACT_APP_GEMINI_API_KEY in your .env file');
      return;
    }
    
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async analyzeWasteItem(imageFile) {
    try {
      if (!this.model) {
        throw new Error('Gemini API not initialized. Please check your API key.');
      }

      // Validate file type
      const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!supportedTypes.includes(imageFile.type)) {
        throw new Error(`Unsupported image format: ${imageFile.type}. Please use JPEG, PNG, WebP, or GIF.`);
      }

      // Convert image to base64
      const imageData = await this.fileToGenerativePart(imageFile);
      
      const prompt = `Analyze this image and determine if the item should be disposed of as:
      - RECYCLE
      - BOTTLE DEPOSIT
      - TRASH  
      - COMPOST


      Respond with ONLY the category (RECYCLE, TRASH, or COMPOST) followed by a single short sentence explaining why.
      
      Format your response exactly like this:
      CATEGORY: [RECYCLE/TRASH/COMPOST/BOTTLE DEPOSIT]
      REASON: [One short sentence explaining why]
      
      Be decisive and give only one category.`;

      const result = await this.model.generateContent([prompt, imageData]);
      const response = await result.response;
      const text = response.text();
      
      return this.parseResponse(text);
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw new Error('Failed to analyze image. Please try again.');
    }
  }

  async fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    
    return {
      inlineData: {
        data: await base64EncodedDataPromise,
        mimeType: file.type
      }
    };
  }

  parseResponse(text) {
    try {
      const lines = text.trim().split('\n');
      let category = '';
      let reason = '';
      
      for (const line of lines) {
        if (line.startsWith('CATEGORY:')) {
          category = line.replace('CATEGORY:', '').trim();
        } else if (line.startsWith('REASON:')) {
          reason = line.replace('REASON:', '').trim();
        }
      }
      
      // Fallback parsing if format is different
      if (!category || !reason) {
        const upperText = text.toUpperCase();
        if (upperText.includes('RECYCLE')) {
          category = 'RECYCLE';
        } else if (upperText.includes('COMPOST')) {
          category = 'COMPOST';
        } else if (upperText.includes('BOTTLE DEPOSIT')) {
          category = 'BOTTLE DEPOSIT';
        } else {
          category = 'TRASH';
        }
        
        reason = reason || text.split('\n').find(line => 
          !line.toUpperCase().includes('CATEGORY') && line.trim().length > 0
        ) || 'Classification based on image analysis';
      }
      
      return {
        category: category.toUpperCase(),
        reason: reason
      };
    } catch (error) {
      console.error('Error parsing response:', error);
      return {
        category: 'TRASH',
        reason: 'Unable to determine proper disposal method'
      };
    }
  }
}

const geminiService = new GeminiService();
export default geminiService;