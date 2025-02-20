import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { handleChat as geminiChat } from '../utils/gemini';
import { handleGroqChat } from '../utils/groq';
import { handleOpenRouterChat } from '../utils/openRouter';
import { handleMistralChat } from '../utils/mistral';
import { handleCohereChat } from '../utils/cohere';
import '../styles/ChatBot.css';

// Define API providers in order of preference
const API_PROVIDERS = ['openRouter', 'groq', 'mistral', 'cohere', 'gemini'];

const ChatBot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentProvider, setCurrentProvider] = useState(API_PROVIDERS[0]);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const tryNextProvider = (currentIndex) => {
    const nextIndex = (currentIndex + 1) % API_PROVIDERS.length;
    setCurrentProvider(API_PROVIDERS[nextIndex]);
    return nextIndex;
  };

  const getProviderFunction = (provider) => {
    switch (provider) {
      case 'gemini': return geminiChat;
      case 'openRouter': return handleOpenRouterChat;
      case 'groq': return handleGroqChat;
      case 'mistral': return handleMistralChat;
      case 'cohere': return handleCohereChat;
      default: return handleOpenRouterChat;
    }
  };

  const handleChatMessage = useCallback(async (prompt) => {
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    let providerIndex = API_PROVIDERS.indexOf(currentProvider);
    let attemptsPerProvider = 0;

    while (attemptsPerProvider < maxRetries) {
      try {
        setIsTyping(true);
        
        // Add user message to chat only on first attempt
        if (attemptsPerProvider === 0 && providerIndex === API_PROVIDERS.indexOf(currentProvider)) {
          const userMessage = { type: 'user', content: prompt };
          setMessages(prev => [...prev, userMessage]);
        }

        const provider = API_PROVIDERS[providerIndex];
        console.log(`Attempt ${attemptsPerProvider + 1}/${maxRetries} with ${provider}...`);
        
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

        const chatFunction = getProviderFunction(provider);
        const result = await chatFunction(context + "\n\nUser: " + prompt, messages);
        
        if (result.status === 'success') {
          const aiMessage = { type: 'bot', content: result.response };
          setMessages(prev => [...prev, aiMessage]);
          return; // Success, exit the function
        }

        throw new Error(result.error || 'Unknown error');
      } catch (error) {
        console.error(`Error with ${API_PROVIDERS[providerIndex]}:`, error);
        
        if (error.message?.includes('503') && attemptsPerProvider < maxRetries - 1) {
          console.log(`Retrying ${API_PROVIDERS[providerIndex]} in ${retryDelay}ms...`);
          await sleep(retryDelay);
          attemptsPerProvider++;
        } else {
          // Try next provider
          providerIndex = tryNextProvider(providerIndex);
          attemptsPerProvider = 0;
          
          if (providerIndex === API_PROVIDERS.indexOf(currentProvider)) {
            // We've tried all providers
            let errorMessage = { 
              type: 'error',
              content: "I apologize, but I'm having trouble connecting to the AI services. Please try again in a moment. If you need immediate assistance, you can book a call with me at https://osmankadir.youcanbook.me/"
            };
            setMessages(prev => [...prev, errorMessage]);
            break;
          }
        }
      }
    }

    setIsTyping(false);
    setInputValue('');
  }, [currentProvider, i18n.language, messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleChatMessage(inputValue.trim());
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleChatMessage('Hello');
    }
  }, [isOpen, handleChatMessage, messages.length]);

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
