import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data/portfolioData';
import './Projects.css';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';

const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] },
    }),
};

function ProjectCard({ project, index, inView }) {
    const [hovered, setHovered] = React.useState(false);

    return (
        <motion.div
            className="project-card"
            variants={fadeUp}
            custom={index * 0.15}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ y: -8 }}
        >
            {/* Top Gradient Bar */}
            <div className={`project-top-bar bg-gradient-${index}`} />

            {/* Card Header */}
            <div className="project-header">
                <div className="project-icon-wrap">
                    <span className="project-icon">{project.icon}</span>
                    <div className="project-icon-glow" />
                </div>
                <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-link-btn">
                        <FiGithub size={16} />
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-link-btn">
                        <FiExternalLink size={16} />
                    </a>
                </div>
            </div>

            {/* Info */}
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>

            {/* Features */}
            <div className="project-features">
                {project.features.map((f, i) => (
                    <div key={i} className="feature-item">
                        <span className="feature-dot" />
                        <span>{f}</span>
                    </div>
                ))}
            </div>

            {/* Tech Stack */}
            <div className="project-tech-row">
                {project.tech.map((t) => (
                    <span key={t} className="tech-tag">
                        <FiCode size={10} />
                        {t}
                    </span>
                ))}
            </div>

            {/* Hover Overlay */}
            <motion.div
                className="project-hover-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
}

export default function Projects() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="projects" className="section projects-section" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    <div className="section-tag">// My Work</div>
                    <h2 className="section-title">Featured Projects</h2>
                    <div className="divider" />
                    <p className="section-subtitle">Real-world projects built with passion and cutting-edge technologies</p>
                </motion.div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} inView={inView} />
                    ))}
                </div>

                <motion.div
                    className="projects-cta"
                    variants={fadeUp}
                    custom={0.5}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    <a href="https://github.com/praveen-cod" target="_blank" rel="noopener noreferrer" className="btn-outline">
                        <FiGithub size={18} />
                        <span>View all on GitHub</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
