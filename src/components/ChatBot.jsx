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
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        setIsTyping(true);
        
        // Add user message to chat only on first attempt
        if (attempt === 1) {
          const userMessage = { type: 'user', content: prompt };
          setMessages(prev => [...prev, userMessage]);
        }

        console.log(`Attempt ${attempt}/${maxRetries}: Initializing chat with Gemini...`, { apiKey: API_KEY });
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
        
        const currentLang = i18n.language;
        const context = `You are Arif, a friendly and knowledgeable AI assistant who specializes in AI technologies and solutions. 
        Important guidelines:
        1. Current user's language is ${currentLang} - detect and respond in the same language as their input
        2. Keep responses conversational, warm, and engaging - like chatting with a friend
        3. Use natural language and occasional emojis to convey emotion
        4. Show empathy and understanding in your responses
        5. If you don't know something, be honest about it
        6. Keep responses concise but informative
        7. For booking calls, direct users to: https://osmankadir.youcanbook.me/`;
        
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
        break; // Success, exit retry loop
      } catch (error) {
        console.error(`Attempt ${attempt}/${maxRetries} failed:`, {
          error: error,
          message: error.message,
          stack: error.stack,
          status: error.status,
          details: error.details
        });
        
        // If this is a 503 error and we haven't exhausted retries, wait and try again
        if (error.message?.includes('503') && attempt < maxRetries) {
          console.log(`Retrying in ${retryDelay}ms...`);
          await sleep(retryDelay);
          continue;
        }

        // If we've exhausted retries or it's a different error, show error message
        if (attempt === maxRetries || !error.message?.includes('503')) {
          let errorMessage = { 
            type: 'error',
            content: error.message?.includes('503') 
              ? "The AI service is currently busy. Please try again in a moment."
              : `Error: ${error.message}. Please try again or contact support if the issue persists.`
          };
          setMessages(prev => [...prev, errorMessage]);
        }
      }
    }
    setIsTyping(false);
    setInputValue('');
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
