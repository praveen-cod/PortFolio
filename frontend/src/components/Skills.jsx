import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/portfolioData';
import './Skills.css';
import {
    SiFlutter, SiDart, SiPython, SiMysql, SiMongodb,
    SiGit, SiGithub, SiAndroidstudio, SiReact,
    SiEclipseide
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import { FiCode, FiSmartphone, FiGlobe, FiDatabase, FiTool } from 'react-icons/fi';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
    }),
};

function SkillBar({ skill, inView, delay = 0 }) {
    return (
        <div className="skill-bar-wrapper">
            <div className="skill-bar-header">
                <span className="skill-bar-name">{skill.name}</span>
                <span className="skill-bar-percent" style={{ color: skill.color }}>{skill.level}%</span>
            </div>
            <div className="skill-bar-track">
                <motion.div
                    className="skill-bar-fill"
                    style={{ background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: delay, ease: [0.4, 0, 0.2, 1] }}
                />
            </div>
        </div>
    );
}

// Category icons — all react-icons, no emojis
const categories = [
    { key: 'languages', label: 'Languages', Icon: FiCode, desc: 'Core programming languages' },
    { key: 'mobile', label: 'Mobile', Icon: FiSmartphone, desc: 'Mobile app development' },
    { key: 'web', label: 'Web', Icon: FiGlobe, desc: 'Web frameworks & libraries' },
    { key: 'databases', label: 'Databases', Icon: FiDatabase, desc: 'Database management' },
    { key: 'tools', label: 'Dev Tools', Icon: FiTool, desc: 'Tools & environments' },
];

// Real brand icons with official colors — no IntelliJ, no FastAPI
const techIcons = [
    { name: 'Java', color: '#f89820', Icon: FaJava },
    { name: 'Flutter', color: '#54c5f8', Icon: SiFlutter },
    { name: 'Dart', color: '#0175c2', Icon: SiDart },
    { name: 'Python', color: '#3776ab', Icon: SiPython },
    { name: 'React.js', color: '#61dafb', Icon: SiReact },
    { name: 'MySQL', color: '#4479a1', Icon: SiMysql },
    { name: 'MongoDB', color: '#47a248', Icon: SiMongodb },
    { name: 'Git', color: '#f05032', Icon: SiGit },
    { name: 'GitHub', color: '#e0e0e0', Icon: SiGithub },
    { name: 'VS Code', color: '#007acc', Icon: VscCode },
    { name: 'Eclipse', color: '#7c5cbf', Icon: SiEclipseide },
    { name: 'Android Studio', color: '#3ddc84', Icon: SiAndroidstudio },
];

export default function Skills() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="skills" className="section skills-section" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    <div className="section-tag">// Technical Arsenal</div>
                    <h2 className="section-title">Skills &amp; Technologies</h2>
                    <div className="divider" />
                    <p className="section-subtitle">Technologies and tools I work with to bring ideas to life</p>
                </motion.div>

                {/* Real Brand Icon Grid */}
                <motion.div
                    className="tech-grid"
                    variants={fadeUp}
                    custom={1}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {techIcons.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            className="tech-icon-card"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                            whileHover={{ scale: 1.12, y: -6 }}
                        >
                            <div className="tech-icon-svg" style={{ color: tech.color }}>
                                <tech.Icon size={36} />
                            </div>
                            <span className="tech-icon-name" style={{ color: tech.color }}>{tech.name}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Skill Bars */}
                <div className="skill-categories">
                    {categories.map((cat, ci) => (
                        <motion.div
                            key={cat.key}
                            className="glass-card skill-cat-card"
                            variants={fadeUp}
                            custom={ci * 0.15 + 0.3}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                        >
                            <div className="skill-cat-header">
                                <span className="skill-cat-icon-wrap">
                                    <cat.Icon size={20} />
                                </span>
                                <div>
                                    <h3 className="skill-cat-label">{cat.label}</h3>
                                    <p className="skill-cat-desc">{cat.desc}</p>
                                </div>
                            </div>
                            <div className="skill-bars">
                                {skills[cat.key].map((skill, si) => (
                                    <SkillBar key={skill.name} skill={skill} inView={inView} delay={si * 0.15 + ci * 0.1} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
