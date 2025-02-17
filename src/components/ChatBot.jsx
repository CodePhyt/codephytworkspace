import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import '../styles/ChatBot.css';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI('AIzaSyBKIv-Ye6do9AeDJwyulqelbSl0ISGuDTw');

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

  const handleChat = async (prompt) => {
    const currentLang = i18n.language;
    
    try {
      setIsTyping(true);
      
      // Add user message to chat
      const userMessage = { type: 'user', content: prompt };
      setMessages(prev => [...prev, userMessage]);

      console.log('Initializing chat with Gemini...');
      // Generate response using Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const context = `You are Arif, a friendly and knowledgeable AI assistant who specializes in AI technologies and solutions. 
      Important guidelines:
      1. Current user's language is ${currentLang} - detect and respond in the same language as their input
      2. Keep responses conversational, warm, and engaging - like chatting with a friend
      3. Use natural language and occasional emojis to convey emotion
      4. Show empathy and understanding in your responses
      5. If you don't know something, be honest about it
      6. Keep responses concise but informative
      
      Language guidelines:
      - For German (de): Use formal "Sie" form, be professional yet friendly
      - For Russian (ru): Use formal "вы" form, be professional but friendly
      - For Turkish (tr): Use casual but respectful tone
      - For English (en): Use conversational, friendly tone
      
      Our key services include:
      - AI Blog & Article Writing using GPT-4, Claude, Gemini
      - AI Document Generation
      - AI Podcast Production
      - AI Video Creation
      - Voice Synthesis
      - 3D Modeling
      - Custom AI Solutions

      Current conversation context: ${messages.map(m => `${m.type}: ${m.content}`).join('\n')}`;

      console.log('Starting chat with context...');
      const chat = model.startChat({
        history: messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          parts: msg.content,
        })),
        generationConfig: {
          maxOutputTokens: 250,
          temperature: 0.8,
          topP: 0.8,
          topK: 40,
        },
      });

      console.log('Sending message to Gemini...');
      const result = await chat.sendMessage(context + "\n\nUser: " + prompt);
      console.log('Received response from Gemini');
      const response = result.response.text();

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
        content: ''
      };

      // Check for specific error types
      if (error.message?.includes('API key')) {
        errorMessage.content = "API key error. Please check the configuration.";
      } else if (error.message?.includes('PERMISSION_DENIED')) {
        errorMessage.content = "API access denied. Please verify API key permissions.";
      } else if (error.message?.includes('quota')) {
        errorMessage.content = "API quota exceeded. Please try again later.";
      } else if (error.message?.includes('network')) {
        errorMessage.content = "Network error. Please check your internet connection.";
      } else {
        errorMessage.content = currentLang === 'tr' 
          ? "Üzgünüm, şu anda bağlantı kurmakta sorun yaşıyorum. Lütfen biraz sonra tekrar deneyin."
          : currentLang === 'ru'
          ? "Извините, у меня возникли проблемы с подключением. Пожалуйста, попробуйте позже."
          : currentLang === 'de'
          ? "Entschuldigung, ich habe momentan Verbindungsprobleme. Bitte versuchen Sie es später noch einmal."
          : "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
      }
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setInputValue('');
    }
  };

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
