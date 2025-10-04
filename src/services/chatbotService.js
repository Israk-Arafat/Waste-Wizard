import { GoogleGenerativeAI } from '@google/generative-ai';

class ChatbotService {
  constructor() {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key not found in environment variables');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async askQuestion(question) {
    try {
      const prompt = `You are a helpful recycling and waste management expert. Answer questions about recycling, trash disposal, composting, environmental laws, and waste reduction. 

User question: ${question}

Please provide a clear, helpful answer about recycling, waste management, or environmental practices. If the question is not related to waste/recycling, politely redirect the conversation back to waste management topics.

Keep your response concise but informative (2-3 paragraphs maximum).`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        success: true,
        answer: text.trim(),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Chatbot service error:', error);
      
      let errorMessage = 'Sorry, I encountered an error while processing your question.';
      
      if (error.message?.includes('API key')) {
        errorMessage = 'API configuration error. Please check your setup.';
      } else if (error.message?.includes('quota')) {
        errorMessage = 'API quota exceeded. Please try again later.';
      } else if (error.message?.includes('network') || error.name === 'NetworkError') {
        errorMessage = 'Network error. Please check your connection and try again.';
      }

      return {
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Get suggested questions for users
  getSuggestedQuestions() {
    return [
      "What items can I recycle?",
      "How do I properly dispose of electronics?",
      "What's the difference between recycling and composting?",
      "Are pizza boxes recyclable?",
      "How can I reduce waste at home?",
      "What recycling laws should I know about?",
      "Can I recycle plastic bags?",
      "How do I dispose of batteries safely?"
    ];
  }

  // Validate if question is waste-related
  isWasteRelatedQuestion(question) {
    const wasteKeywords = [
      'recycle', 'recycling', 'trash', 'garbage', 'waste', 'compost', 'composting',
      'disposal', 'landfill', 'environment', 'plastic', 'paper', 'glass', 'metal',
      'battery', 'electronic', 'hazardous', 'organic', 'biodegradable', 'sustainable',
      'green', 'eco', 'pollution', 'reduce', 'reuse', 'renewable'
    ];
    
    const lowerQuestion = question.toLowerCase();
    return wasteKeywords.some(keyword => lowerQuestion.includes(keyword));
  }
}

export default new ChatbotService();