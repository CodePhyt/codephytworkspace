import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaTwitter, FaCalendar } from 'react-icons/fa';
import '../styles/AnimatedHero.css';

const AnimatedHero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          CodePhyt
        </motion.h1>

        <motion.div
          className="booking-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a 
            href="https://osmankadir.youcanbook.me/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="book-meeting"
          >
            <FaCalendar />
            <span>{t('hero.bookMeeting')}</span>
          </a>
        </motion.div>

        <motion.div
          className="social-links"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="https://github.com/codephyt"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/osmankadir"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/codephyt"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaTwitter />
          </a>
        </motion.div>

        <motion.div
          className="roles"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p>{t('hero.roles.architect')}</p>
          <p>{t('hero.roles.integrator')}</p>
          <p>{t('hero.roles.technologist')}</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AnimatedHero;
