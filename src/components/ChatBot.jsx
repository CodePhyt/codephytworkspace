import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import '../styles/ChatBot.css';

// Initialize Gemini AI
const API_KEY = 'AIzaSyC5jk1jpR7DAcGzRajk8qYTIDxg-uBLwF8';
const genAI = new GoogleGenerativeAI(API_KEY);

const ChatBot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChat = useCallback(async (prompt) => {
    const currentLang = i18n.language;
    
    try {
      setIsTyping(true);
      
      // Add user message to chat
      const userMessage = { type: 'user', content: prompt };
      setMessages(prev => [...prev, userMessage]);

      console.log('Initializing chat with Gemini...', { apiKey: API_KEY });
      // Generate response using Gemini
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        generationConfig: {
          maxOutputTokens: 250,
          temperature: 0.8,
          topP: 0.8,
          topK: 40,
        }
      });
      
      console.log('Model initialized successfully');
      
      const context = `You are Arif, a friendly and knowledgeable AI assistant who specializes in AI technologies and solutions. 
      Important guidelines:
      1. Current user's language is ${currentLang} - detect and respond in the same language as their input
      2. Keep responses conversational, warm, and engaging - like chatting with a friend
      3. Use natural language and occasional emojis to convey emotion
      4. Show empathy and understanding in your responses
      5. If you don't know something, be honest about it
      6. Keep responses concise but informative`;
      
      console.log('Starting chat with context...');
      const chat = model.startChat({
        history: messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'model',
          parts: msg.content,
        }))
      });

      console.log('Sending message to Gemini...');
      const result = await chat.sendMessage(context + "\n\nUser: " + prompt);
      console.log('Received response from Gemini:', result);
      const response = await result.response.text();

      // Add AI response to chat
      const aiMessage = { type: 'bot', content: response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Detailed error in chat:', {
        error: error,
        message: error.message,
        stack: error.stack,
        status: error.status,
        details: error.details
      });
      
      let errorMessage = { 
        type: 'error',
        content: `Error: ${error.message}. Please try again or contact support if the issue persists.`
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setInputValue('');
    }
  }, [i18n.language, messages, setIsTyping, setMessages, setInputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleChat(inputValue.trim());
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleChat('Hello');
    }
  }, [isOpen, handleChat, messages.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      <button 
        className={`chat-toggle-button ${isOpen ? 'open' : ''}`} 
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="chat-header">
              <FaRobot className="chat-icon" />
              <div className="chat-title">
                {t('chat.title')}
              </div>
              <button 
                className="close-button"
                onClick={toggleChat}
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>

            <div className="messages-container" ref={chatContainerRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.type}`}
                >
                  {message.type === 'bot' && <FaRobot className="bot-icon" />}
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message bot">
                  <FaRobot className="bot-icon" />
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="chat-input-form">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t('chat.placeholder')}
                className="chat-input"
              />
              <button 
                type="submit" 
                className="send-button"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </form>
            <div className="chat-footer">
              <small>{t('chat.poweredBy')}</small>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
