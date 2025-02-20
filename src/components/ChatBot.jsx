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
  { id: 'mistral', name: 'Mistral', description: 'Fast & Efficient', enabled: true },
  { id: 'gemini', name: 'Gemini', description: 'Google AI', enabled: true },
  { id: 'groq', name: 'Mixtral', description: 'Via Groq (Fast)', enabled: true },
  { id: 'cohere', name: 'Command', description: 'Efficient & Reliable', enabled: true },
  { id: 'openRouter', name: 'Claude 2.1', description: 'Most Capable (Higher Cost)', enabled: true }
];

const LANGUAGE_PROMPTS = {
  tr: `Sen Arif'sin, AI teknolojileri ve çözümleri konusunda uzmanlaşmış, arkadaş canlısı ve bilgili bir AI asistanısın.
       Önemli yönergeler:
       1. Kullanıcının diline uygun şekilde Türkçe yanıt ver
       2. Sohbeti doğal ve samimi tut - bir arkadaşla konuşur gibi
       3. Doğal bir dil kullan ve duyguları ifade etmek için ara sıra emoji kullan
       4. Yanıtlarında empati ve anlayış göster
       5. Bir şeyi bilmiyorsan, dürüstçe söyle
       6. Yanıtları kısa ve öz tut ama bilgilendirici ol
       7. Görüşme randevusu için kullanıcıyı şu adrese yönlendir: https://osmankadir.youcanbook.me/`,
  en: `You are Arif, a friendly and knowledgeable AI assistant who specializes in AI technologies and solutions.
       Important guidelines:
       1. Respond in English
       2. Keep responses conversational and warm - like chatting with a friend
       3. Use natural language and occasional emojis to convey emotion
       4. Show empathy and understanding in your responses
       5. If you don't know something, be honest about it
       6. Keep responses concise but informative
       7. For booking calls, direct users to: https://osmankadir.youcanbook.me/`,
  // Add more languages as needed
};

const DEFAULT_LANGUAGE = 'en';

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

  const getProviderFunction = (provider) => {
    switch (provider) {
      case 'mistral': return handleMistralChat;
      case 'gemini': return geminiChat;
      case 'groq': return handleGroqChat;
      case 'cohere': return handleCohereChat;
      case 'openRouter': return handleOpenRouterChat;
      default: return handleMistralChat;
    }
  };

  const handleChatMessage = useCallback(async (prompt) => {
    const maxRetries = 3;
    const retryDelay = 1000;
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    let providerIndex = API_PROVIDERS.findIndex(p => p.id === currentProvider);
    let attemptsPerProvider = 0;

    while (attemptsPerProvider < maxRetries) {
      try {
        setIsTyping(true);
        
        if (attemptsPerProvider === 0) {
          const userMessage = { type: 'user', content: prompt };
          setMessages(prev => [...prev, userMessage]);
        }

        const provider = API_PROVIDERS[providerIndex];
        if (!provider.enabled) {
          throw new Error('Provider is currently disabled');
        }

        console.log(`Attempt ${attemptsPerProvider + 1}/${maxRetries} with ${provider.id}...`);
        
        const currentLang = i18n.language.split('-')[0].toLowerCase();
        const context = LANGUAGE_PROMPTS[currentLang] || LANGUAGE_PROMPTS[DEFAULT_LANGUAGE];

        const chatFunction = getProviderFunction(provider.id);
        const result = await chatFunction(context + "\n\nUser: " + prompt, messages);
        
        if (result.status === 'success') {
          const aiMessage = { type: 'bot', content: result.response };
          setMessages(prev => [...prev, aiMessage]);
          break;
        }

        throw new Error(result.error || 'Unknown error');
      } catch (error) {
        console.error(`Error with ${API_PROVIDERS[providerIndex].id}:`, error);
        
        if (error.message?.includes('503') && attemptsPerProvider < maxRetries - 1) {
          console.log(`Retrying ${API_PROVIDERS[providerIndex].id} in ${retryDelay}ms...`);
          await sleep(retryDelay);
          attemptsPerProvider++;
        } else {
          // Find next enabled provider
          let nextIndex = providerIndex;
          do {
            nextIndex = (nextIndex + 1) % API_PROVIDERS.length;
          } while (!API_PROVIDERS[nextIndex].enabled && nextIndex !== providerIndex);

          if (nextIndex === providerIndex) {
            let errorMessage = { 
              type: 'error',
              content: t('chatbot.errorMessage')
            };
            setMessages(prev => [...prev, errorMessage]);
            break;
          }

          providerIndex = nextIndex;
          setCurrentProvider(API_PROVIDERS[nextIndex].id);
          attemptsPerProvider = 0;
        }
      }
    }

    setIsTyping(false);
    setInputValue('');
  }, [currentProvider, i18n.language, messages, t]);

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
              <div className="title-container">
                <span>{t('chatbot.title')}</span>
                <span className="active-model">
                  {API_PROVIDERS.find(p => p.id === currentProvider)?.name}
                </span>
              </div>
            </div>
            <div className="chatbot-controls">
              <button 
                className="provider-selector-button"
                onClick={() => setShowProviderSelector(!showProviderSelector)}
                title={t('chatbot.selectProvider')}
              >
                <FaCog />
              </button>
              <button 
                className="close-button" 
                onClick={() => setIsOpen(false)}
                title={t('chatbot.close')}
              >
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
                    className={`provider-option ${currentProvider === provider.id ? 'active' : ''} ${!provider.enabled ? 'disabled' : ''}`}
                    onClick={() => {
                      if (provider.enabled) {
                        setCurrentProvider(provider.id);
                        setShowProviderSelector(false);
                      }
                    }}
                    disabled={!provider.enabled}
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
