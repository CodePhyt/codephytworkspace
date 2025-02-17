import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../styles/Skills.css';

const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      name: t('skills.categories.ai'),
      skills: ['TensorFlow', 'PyTorch', 'LangChain', 'OpenAI', 'Hugging Face', 'Computer Vision', 'NLP', 'MLOps']
    },
    {
      name: t('skills.categories.frontend'),
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'WebGL', 'Three.js']
    },
    {
      name: t('skills.categories.backend'),
      skills: ['Node.js', 'Python', 'FastAPI', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis']
    },
    {
      name: t('skills.categories.devops'),
      skills: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'CI/CD', 'Terraform', 'Monitoring']
    },
    {
      name: t('skills.categories.creative'),
      skills: ['Stable Diffusion', 'Midjourney', 'Blender', 'Adobe Creative Suite', 'Motion Design']
    }
  ];

  return (
    <section className="skills-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {t('skills.title')}
      </motion.h2>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.name}
            className="skill-category"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h3>{category.name}</h3>
            <div className="skills-list">
              {category.skills.map((skill) => (
                <motion.span
                  key={skill}
                  className="skill-badge"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
