import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaRobot, FaPen, FaMicrophone, FaVideo, FaHashtag, FaVolumeUp, 
         FaBook, FaGamepad, FaCube, FaLaptopCode, FaFileAlt, FaSearch } from 'react-icons/fa';
import '../styles/ServiceGrid.css';

const ServiceCard = ({ icon: Icon, title, description, tools, category, delay }) => {
  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)'
      }}
    >
      <div className="service-icon">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <motion.span
            key={tool}
            className="tool-tag"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.1 * index }}
          >
            {tool}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const ServiceGrid = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: t('services.categories.all') },
    { id: 'content', name: t('services.categories.content') },
    { id: 'audio', name: t('services.categories.audio') },
    { id: 'visual', name: t('services.categories.visual') },
    { id: 'development', name: t('services.categories.development') }
  ];

  const services = [
    {
      icon: FaRobot,
      title: t('services.items.docs.title'),
      description: t('services.items.docs.description'),
      tools: ['GPT-4', 'LangChain', 'Claude'],
      category: 'content'
    },
    {
      icon: FaPen,
      title: t('services.items.blog.title'),
      description: t('services.items.blog.description'),
      tools: ['GPT-4', 'SEO Tools', 'Content Analysis'],
      category: 'content'
    },
    {
      icon: FaMicrophone,
      title: t('services.items.podcast.title'),
      description: t('services.items.podcast.description'),
      tools: ['ElevenLabs', 'Whisper', 'Audio Processing'],
      category: 'audio'
    },
    {
      icon: FaVideo,
      title: t('services.items.video.title'),
      description: t('services.items.video.description'),
      tools: ['Runway', 'D-ID', 'Synthesia'],
      category: 'visual'
    },
    {
      icon: FaHashtag,
      title: t('services.items.social.title'),
      description: t('services.items.social.description'),
      tools: ['Midjourney', 'GPT-4', 'Canva'],
      category: 'content'
    },
    {
      icon: FaVolumeUp,
      title: t('services.items.voice.title'),
      description: t('services.items.voice.description'),
      tools: ['ElevenLabs', 'RVC', 'Voice AI'],
      category: 'audio'
    },
    {
      icon: FaBook,
      title: t('services.items.story.title'),
      description: t('services.items.story.description'),
      tools: ['GPT-4', 'Claude', 'Novel AI'],
      category: 'content'
    },
    {
      icon: FaGamepad,
      title: t('services.items.game.title'),
      description: t('services.items.game.description'),
      tools: ['Unity', 'ML-Agents', 'PyTorch'],
      category: 'development'
    },
    {
      icon: FaCube,
      title: t('services.items.modeling.title'),
      description: t('services.items.modeling.description'),
      tools: ['Point-E', 'Blender', 'Three.js'],
      category: 'visual'
    },
    {
      icon: FaLaptopCode,
      title: t('services.items.product.title'),
      description: t('services.items.product.description'),
      tools: ['React', 'Python', 'TensorFlow'],
      category: 'development'
    },
    {
      icon: FaFileAlt,
      title: t('services.items.cv.title'),
      description: t('services.items.cv.description'),
      tools: ['GPT-4', 'ATS Tools', 'Design AI'],
      category: 'content'
    },
    {
      icon: FaSearch,
      title: t('services.items.research.title'),
      description: t('services.items.research.description'),
      tools: ['GPT-4', 'Claude', 'Research Tools'],
      category: 'development'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <section className="services-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {t('services.title')}
      </motion.h2>

      <motion.div 
        className="category-filters"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      <div className="services-grid">
        {filteredServices.map((service, index) => (
          <ServiceCard
            key={service.title}
            {...service}
            delay={0.1 * (index % 3)}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceGrid;
