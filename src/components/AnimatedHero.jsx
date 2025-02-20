import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaTwitter, FaCalendar, FaRegMoneyBillAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
          <motion.a
            href="https://osmankadir.youcanbook.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="book-meeting-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCalendar />
            <span>{t('hero.bookMeeting')}</span>
          </motion.a>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              <FaRegMoneyBillAlt className="mr-2" />
              {t('hero.viewPricing')}
            </Link>
          </motion.div>
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
