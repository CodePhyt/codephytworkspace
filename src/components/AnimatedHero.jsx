import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaCalendar, FaRegMoneyBillAlt } from 'react-icons/fa';
import '../styles/AnimatedHero.css';

const AnimatedHero = () => {
  const { t } = useTranslation();

  return (
    <div className="hero-container relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="hero-content text-center text-white z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            CodePhyt
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="https://osmankadir.youcanbook.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCalendar className="text-xl mr-2" />
              <span>{t('hero.bookMeeting')}</span>
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/pricing"
                className="hero-button secondary-button"
              >
                <FaRegMoneyBillAlt className="text-xl mr-2" />
                <span>{t('hero.viewPricing')}</span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 flex justify-center space-x-6"
          >
            <a href="https://github.com/codephyt" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <FaGithub className="text-2xl" />
            </a>
            <a href="https://linkedin.com/in/osmankadir" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="https://twitter.com/codephyt" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <FaTwitter className="text-2xl" />
            </a>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-black opacity-30"></div>
    </div>
  );
};

export default AnimatedHero;
