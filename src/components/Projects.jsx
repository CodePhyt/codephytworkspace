import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaExternalLinkAlt } from 'react-icons/fa';
import '../styles/Projects.css';

const ProjectCard = ({ title, description, link, technologies, imageUrl, delay }) => {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)'
      }}
    >
      <div className="project-image" style={{ backgroundImage: `url(${imageUrl})` }}>
        <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
          <FaExternalLinkAlt />
        </a>
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="tech-stack">
          {technologies.map((tech, index) => (
            <motion.span
              key={tech}
              className="tech-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.1 * index }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: "Sofity",
      description: "A modern web application showcasing innovative features and responsive design",
      link: "https://sofity.netlify.app/",
      technologies: ["React", "JavaScript", "CSS3", "Responsive Design"],
      imageUrl: "/images/sofity-preview.jpg"
    },
    {
      title: "Personal Portfolio",
      description: "A professional portfolio website demonstrating skills and projects",
      link: "https://osmankadir.netlify.app/",
      technologies: ["React", "Three.js", "Framer Motion", "Responsive Design"],
      imageUrl: "/images/portfolio-preview.jpg"
    }
  ];

  return (
    <section className="projects-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {t('projects.title', 'Featured Projects')}
      </motion.h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            {...project}
            delay={index * 0.2}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
