import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes, FaCog } from 'react-icons/fa';
import { handleChat as geminiChat } from '../utils/gemini';
import { handleGroqChat } from '../utils/groq';
import { handleOpenRouterChat } from '../utils/openRouter';
import { handleMistralChat } from '../utils/mistral';
import { handleCohereChat } from '../utils/cohere';
import '../styles/ChatBot.css';

const API_PROVIDERS = [
  { id: 'openRouter', name: 'Claude 3', description: 'Anthropic Claude 3 (via OpenRouter)' },
  { id: 'groq', name: 'Mixtral', description: 'Mixtral 8x7B (via Groq)' },
  { id: 'mistral', name: 'Mistral', description: 'Mistral Large' },
  { id: 'cohere', name: 'Command', description: 'Cohere Command' },
  { id: 'gemini', name: 'Gemini', description: 'Google Gemini Pro' }
];

const ChatBot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentProvider, setCurrentProvider] = useState(API_PROVIDERS[0].id);
  const [showProviderSelector, setShowProviderSelector] = useState(false);
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
    setCurrentProvider(API_PROVIDERS[nextIndex].id);
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

    let providerIndex = API_PROVIDERS.findIndex(provider => provider.id === currentProvider);
    let attemptsPerProvider = 0;
    let results = [];

    while (attemptsPerProvider < maxRetries) {
      try {
        setIsTyping(true);
        
        // Add user message to chat only on first attempt
        if (attemptsPerProvider === 0 && providerIndex === API_PROVIDERS.findIndex(provider => provider.id === currentProvider)) {
          const userMessage = { type: 'user', content: prompt };
          setMessages(prev => [...prev, userMessage]);
        }

        const provider = API_PROVIDERS[providerIndex].id;
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
          results.push(result.response);
        } else {
          throw new Error(result.error || 'Unknown error');
        }
      } catch (error) {
        console.error(`Error with ${API_PROVIDERS[providerIndex].id}:`, error);
        
        if (error.message?.includes('503') && attemptsPerProvider < maxRetries - 1) {
          console.log(`Retrying ${API_PROVIDERS[providerIndex].id} in ${retryDelay}ms...`);
          await sleep(retryDelay);
          attemptsPerProvider++;
        } else {
          // Try next provider
          providerIndex = tryNextProvider(providerIndex);
          attemptsPerProvider = 0;
          
          if (providerIndex === API_PROVIDERS.findIndex(provider => provider.id === currentProvider)) {
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

    if (results.length > 0) {
      const aiMessage = { type: 'bot', content: results.join('\n') };
      setMessages(prev => [...prev, aiMessage]);
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="chatbot-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="chatbot-header">
            <div className="chatbot-title">
              <FaRobot className="chatbot-icon" />
              <span>{t('chatbot.title')}</span>
            </div>
            <div className="chatbot-controls">
              <button 
                className="provider-selector-button"
                onClick={() => setShowProviderSelector(!showProviderSelector)}
              >
                <FaCog />
              </button>
              <button className="close-button" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>
          </div>

          {showProviderSelector && (
            <div className="provider-selector">
              <h3>{t('chatbot.selectProvider')}</h3>
              <div className="provider-list">
                {API_PROVIDERS.map((provider) => (
                  <button
                    key={provider.id}
                    className={`provider-option ${currentProvider === provider.id ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentProvider(provider.id);
                      setShowProviderSelector(false);
                    }}
                  >
                    <strong>{provider.name}</strong>
                    <span>{provider.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="chat-messages" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={`message ${message.type}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message.type === 'bot' && <FaRobot className="bot-icon" />}
                <div className="message-content">{message.content}</div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                className="message bot typing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaRobot className="bot-icon" />
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chat-input-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('chatbot.placeholder')}
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
            <small>{t('chatbot.poweredBy')}</small>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;
