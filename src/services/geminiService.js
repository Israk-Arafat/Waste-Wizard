import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    
    if (!this.apiKey) {
      console.error('Gemini API key not found. Please set REACT_APP_GEMINI_API_KEY in your .env file');
      return;
    }
    
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async analyzeWasteItem(imageFile, options = {}) {
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
        } else if (upperText.includes('E-WASTE') || upperText.includes('EWASTE')) {
          category = 'E-WASTE';
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

  createPrompt(useUMaineRules) {
    const basePrompt = `Analyze this image and determine the single best disposal option for the item. Choose one of the following categories:
- RECYCLE
- TRASH  
- COMPOST
- BOTTLE DEPOSIT${useUMaineRules ? '\n- E-WASTE' : ''}

Respond with ONLY the category followed by one concise sentence that cites the key reason.

Use this exact format:
CATEGORY: [RECYCLE/TRASH/COMPOST/BOTTLE DEPOSIT${useUMaineRules ? '/E-WASTE' : ''}]
REASON: [One short sentence explaining why]

Do not add extra lines or bullet points.`;

    if (!useUMaineRules) {
      return `${basePrompt}\n\nIf you are unsure, choose the safest disposal method based on common U.S. recycling practices.`;
    }

    const umaineGuidelines = `When UMaine mode is active, you MUST follow the University of Maine (Orono campus) recycling rules:
- Recyclable plastics must be rigid #1-7 only. Reject plastic film, Styrofoam, or plastic utensils as TRASH.
- Empty and rinse all food or beverage containers before recycling.
- Glass: only bottles and jars with food/beverage residue removed.
- Metals: aluminum cans/foil/pie plates (clean), steel/tin cans, and empty aerosol cans are recyclable.
- Paperboard, corrugated cardboard (tape/staples OK), envelopes, opened mail, newspapers, magazines, and clean white/colored paper are all recyclable. No paper towels or tissues.
- Bottle deposits apply to redeemable beverage containers eligible under Maine's return system.
- If the item is electronic equipment, computer parts, AV gear, or similar e-waste, classify it as E-WASTE and direct users to contact UM IT at 1-800-696-4357 or help@maine.edu for GiveITGetIT recycling.
- If the item is wearable clothing or textiles, recommend donation options such as the Black Bear Exchange (https://umaine.edu/volunteer/BBE/) or the Orono Thrift Store (https://www.facebook.com/oronothrift/). Mention any restrictions (no children's clothing, housewares, or bedding at Black Bear Exchange).
- Compost only applies to organic material suitable for UMaine compost streams.
- When none of the above apply, choose TRASH.

Reference UMaine explicitly in your reason when it influences the guidance.`;

    return `${basePrompt}\n\n${umaineGuidelines}`;
  }
}

const geminiService = new GeminiService();
export default geminiService;