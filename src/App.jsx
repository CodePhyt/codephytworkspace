import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import PricingPage from './components/PricingPage';
import Contact from './components/Contact';
import AnimatedHero from './components/AnimatedHero';
import ChatBot from './components/ChatBot';
import Skills from './components/Skills';
import ServiceGrid from './components/ServiceGrid';
import LanguageSwitcher from './components/LanguageSwitcher';
import ToolsShowcase from './components/ToolsShowcase';
import Projects from './components/Projects';
import './i18n';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <div className="app">
                <LanguageSwitcher />
                <AnimatedHero />
                <Skills />
                <ToolsShowcase />
                <ServiceGrid />
                <Projects />
                <ChatBot />
              </div>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
