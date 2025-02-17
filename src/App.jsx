import React from 'react';
import AnimatedHero from './components/AnimatedHero';
import Skills from './components/Skills';
import ServiceGrid from './components/ServiceGrid';
import ChatBot from './components/ChatBot';
import LanguageSwitcher from './components/LanguageSwitcher';
import ToolsShowcase from './components/ToolsShowcase';
import './i18n';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <LanguageSwitcher />
      <AnimatedHero />
      <Skills />
      <ToolsShowcase />
      <ServiceGrid />
      <ChatBot />
    </div>
  );
}

export default App;
