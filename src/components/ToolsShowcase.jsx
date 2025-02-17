import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../styles/ToolsShowcase.css';

const tools = [
  {
    name: 'Augment Code',
    url: 'https://www.augmentcode.com/',
    category: 'development',
    translationKey: 'augmentCode'
  },
  {
    name: 'Copy Coder',
    url: 'https://copycoder.ai/',
    category: 'development',
    translationKey: 'copyCoder'
  },
  {
    name: 'OmniParser',
    url: 'https://github.com/microsoft/OmniParser',
    category: 'data',
    translationKey: 'omniParser'
  },
  {
    name: 'DataButton',
    url: 'https://databutton.com/',
    category: 'data',
    translationKey: 'dataButton'
  },
  {
    name: 'Roo Code',
    url: 'https://github.com/RooVetGit/Roo-Code',
    category: 'development',
    translationKey: 'rooCode'
  },
  {
    name: 'UI-TARS',
    url: 'https://github.com/bytedance/UI-TARS',
    category: 'ui',
    translationKey: 'uiTars'
  },
  {
    name: 'Codeium',
    url: 'https://codeium.com/',
    category: 'development',
    translationKey: 'codeium'
  },
  {
    name: 'FlutterFlow',
    url: 'https://www.flutterflow.io/',
    category: 'development',
    translationKey: 'flutterFlow'
  },
  {
    name: 'Hugging Face',
    url: 'https://huggingface.co/',
    category: 'ai',
    translationKey: 'huggingFace'
  },
  {
    name: 'CrewAI',
    url: 'https://www.crewai.com/',
    category: 'ai',
    translationKey: 'crewAi'
  },
  {
    name: 'Pinokio',
    url: 'https://pinokio.computer/',
    category: 'ai',
    translationKey: 'pinokio'
  },
  {
    name: 'Bee Agent Framework',
    url: 'https://github.com/i-am-bee/bee-agent-framework',
    category: 'ai',
    translationKey: 'beeAgent'
  },
  {
    name: 'Bolt',
    url: 'https://bolt.new/',
    category: 'development',
    translationKey: 'bolt'
  },
  {
    name: 'AnythingLLM',
    url: 'https://anythingllm.com/',
    category: 'ai',
    translationKey: 'anythingLlm'
  },
  {
    name: 'Continue',
    url: 'https://www.continue.dev/',
    category: 'development',
    translationKey: 'continue'
  },
  {
    name: 'PraisonAI',
    url: 'https://github.com/MervinPraison/PraisonAI/',
    category: 'ai',
    translationKey: 'praisonAi'
  },
  {
    name: 'Abacus.AI',
    url: 'https://abacus.ai/app/',
    category: 'ai',
    translationKey: 'abacusAi'
  }
];

const ToolCard = ({ tool, index }) => {
  const { t } = useTranslation();

  return (
    <motion.a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`tool-card ${tool.category}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)'
      }}
      viewport={{ once: true }}
    >
      <div className="tool-icon">
        <motion.div
          className="icon-animation"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {getToolIcon(tool.category)}
        </motion.div>
      </div>
      <h3>{t(`tools.${tool.translationKey}.name`)}</h3>
      <p>{t(`tools.${tool.translationKey}.description`)}</p>
    </motion.a>
  );
};

const getToolIcon = (category) => {
  switch (category) {
    case 'development':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" height="32" width="32">
          <path d="M8 16L2 12l6-4v3h8V8l6 4-6 4v-3H8v3zm14-4l-1.41-1.41L22 9.17l-1.41-1.41L19.17 9l-1.41 1.41L16.34 12l1.41 1.41L19.17 15l1.41-1.41L22 14.83l-1.41-1.41L19.17 12l1.41-1.41z"/>
        </svg>
      );
    case 'data':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" height="32" width="32">
          <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zM6 7.72V9c0 .5 2.13 2 6 2s6-1.5 6-2V7.72c-1.91 1.12-4.62 1.78-6 1.78s-4.09-.66-6-1.78zM6 11.72V13c0 .5 2.13 2 6 2s6-1.5 6-2v-1.28c-1.91 1.12-4.62 1.78-6 1.78s-4.09-.66-6-1.78z"/>
        </svg>
      );
    case 'ui':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" height="32" width="32">
          <path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h16V4H4zm2 2h12v2H6V6zm0 4h12v2H6v-2zm0 4h8v2H6v-2z"/>
        </svg>
      );
    case 'ai':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" height="32" width="32">
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
        </svg>
      );
    default:
      return null;
  }
};

const ToolsShowcase = () => {
  const { t } = useTranslation();

  return (
    <section className="tools-showcase">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {t('tools.title')}
      </motion.h2>
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <ToolCard key={tool.name} tool={tool} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ToolsShowcase;
