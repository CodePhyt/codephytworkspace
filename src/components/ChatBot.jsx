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
  tr: `Sen Arif'sin - arkadaş canlısı bir AI asistanısın 😊
      Önemli:
      1. Kısa ve net yanıtlar ver (1-2 cümle)
      2. Doğal ve samimi konuş
      3. Emojileri uygun yerlerde kullan
      4. Detaylar için soru sor
      5. Teknik detayları basitleştir
      6. Görüşme için: osmankadir.youcanbook.me`,
  en: `You're Arif - a friendly AI assistant 😊
      Important:
      1. Keep responses short and clear (1-2 sentences)
      2. Be conversational and warm
      3. Use emojis appropriately
      4. Ask questions for details
      5. Simplify technical details
      6. For meetings: osmankadir.youcanbook.me`
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

        const currentLang = i18n.language.split('-')[0].toLowerCase();
        const context = LANGUAGE_PROMPTS[currentLang] || LANGUAGE_PROMPTS[DEFAULT_LANGUAGE];
        
        // Add conversation history context
        let conversationContext = messages.slice(-4).map(msg => 
          `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
        ).join('\n');

        const chatFunction = getProviderFunction(provider.id);
        const result = await chatFunction(
          context + "\n\nPrevious messages:\n" + conversationContext + "\n\nUser: " + prompt,
          messages.slice(-4) // Only pass last 4 messages for context
        );

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
