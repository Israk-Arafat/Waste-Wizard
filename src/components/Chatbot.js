import React, { useState, useRef, useEffect } from 'react';
import chatbotService from '../services/chatbotService';
import './css/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your recycling and waste management assistant. Ask me anything about recycling, trash disposal, composting, or environmental laws!",
      timestamp: new Date().toISOString()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentMessage.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await chatbotService.askQuestion(userMessage.content);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.success ? response.answer : response.error,
        timestamp: response.timestamp,
        isError: !response.success
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I encountered an unexpected error. Please try again.',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question) => {
    setCurrentMessage(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Hi! I'm your recycling and waste management assistant. Ask me anything about recycling, trash disposal, composting, or environmental laws!",
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const suggestedQuestions = chatbotService.getSuggestedQuestions();

  return (
    <div className={`chatbot-container ${isOpen ? 'chatbot-open' : ''}`}>
      {/* Chatbot Toggle Button */}
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <h3>Recycling Assistant</h3>
              <span className="chatbot-status">Online</span>
            </div>
            <div className="chatbot-header-actions">
              <button 
                className="chatbot-clear"
                onClick={clearChat}
                aria-label="Clear chat"
                title="Clear chat"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3,6 5,6 21,6"></polyline>
                  <path d="M19,6V20A2,2 0 0,1 17,20H7A2,2 0 0,1 5,20V6M8,6V4A2,2 0 0,1 10,4H14A2,2 0 0,1 16,4V6"></path>
                </svg>
              </button>
              <button 
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.type} ${message.isError ? 'error' : ''}`}
              >
                <div className="message-content">
                  {message.content}
                </div>
                <div className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="suggested-questions">
              <p>Try asking:</p>
              <div className="suggestion-buttons">
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    className="suggestion-button"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="chatbot-input-area">
            <div className="chatbot-input-container">
              <textarea
                ref={inputRef}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about recycling, waste disposal, or environmental laws..."
                className="chatbot-input"
                rows="1"
                disabled={isLoading}
              />
              <button 
                className="chatbot-send"
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isLoading}
                aria-label="Send message"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;