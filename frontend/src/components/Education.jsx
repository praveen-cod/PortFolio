import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { education, internships } from '../data/portfolioData';
import './Education.css';
import {
    FiBook, FiBookOpen, FiAward, FiBriefcase, FiCalendar,
    FiStar, FiCheckCircle, FiTarget
} from 'react-icons/fi';
import { MdSchool } from 'react-icons/md';
import { HiAcademicCap } from 'react-icons/hi';

// Icon component so color prop is passed correctly
function EduIcon({ idx, color }) {
    if (idx === 0) return <HiAcademicCap size={22} color={color} />;
    if (idx === 1) return <FiBook size={20} color={color} />;
    if (idx === 2) return <FiBookOpen size={20} color={color} />;
    return <FiBook size={20} color={color} />;
}

const fadeUp = {
    hidden: { opacity: 0, x: -40 },
    visible: (i = 0) => ({
        opacity: 1, x: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] },
    }),
};

const stats = [
    { Icon: FiTarget, value: '8.87', label: 'Current CGPA', color: '#7c3aed' },
    { Icon: FiCalendar, value: '2027', label: 'Graduation Year', color: '#06b6d4' },
    { Icon: FiCheckCircle, value: '4+', label: 'Certifications', color: '#f59e0b' },
    { Icon: FiAward, value: '3rd', label: 'University Rank', color: '#10b981' },
];

export default function Education() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="education" className="section education-section" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="section-tag">// My Journey</div>
                    <h2 className="section-title">Education &amp; Experience</h2>
                    <div className="divider" />
                    <p className="section-subtitle">My academic background and professional experience</p>
                </motion.div>

                <div className="edu-columns">
                    {/* ── Education Timeline ── */}
                    <div className="edu-col">
                        <motion.h3
                            className="edu-col-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <MdSchool size={20} color="#7c3aed" /> Education
                        </motion.h3>
                        <div className="timeline">
                            {education.map((edu, i) => (
                                <motion.div
                                    key={edu.degree}
                                    className="timeline-item"
                                    variants={fadeUp}
                                    custom={i * 0.15 + 0.2}
                                    initial="hidden"
                                    animate={inView ? 'visible' : 'hidden'}
                                >
                                    <div className="timeline-icon-wrap">
                                        <div className="timeline-icon" style={{ background: `${edu.color}22`, borderColor: edu.color, color: edu.color }}>
                                            <EduIcon idx={i} color={edu.color} />
                                        </div>
                                        {i < education.length - 1 && (
                                            <div className="timeline-line" style={{ background: `linear-gradient(to bottom, ${edu.color}, ${education[i + 1].color})` }} />
                                        )}
                                    </div>
                                    <div className="timeline-content glass-card" style={{ borderLeftColor: edu.color }}>
                                        <span className="timeline-year">{edu.year}</span>
                                        <h4 className="timeline-title">{edu.degree}</h4>
                                        <p className="timeline-institution">{edu.institution}</p>
                                        <div className="timeline-score" style={{ color: edu.color, background: `${edu.color}15`, borderColor: `${edu.color}40` }}>
                                            {edu.score}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ── Experience ── */}
                    <div className="edu-col">
                        <motion.h3
                            className="edu-col-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <FiBriefcase size={18} color="#059669" /> Experience
                        </motion.h3>

                        {internships.map((intern, i) => (
                            <motion.div
                                key={intern.company}
                                className="intern-card glass-card"
                                variants={fadeUp}
                                custom={i * 0.15 + 0.3}
                                initial="hidden"
                                animate={inView ? 'visible' : 'hidden'}
                            >
                                <div className="intern-header">
                                    <div className="intern-icon" style={{ background: `${intern.color}20`, borderColor: intern.color, color: intern.color }}>
                                        <FiBriefcase size={22} />
                                    </div>
                                    <div>
                                        <h4 className="intern-company">{intern.company}</h4>
                                        <p className="intern-role">{intern.role}</p>
                                    </div>
                                    <div className="intern-duration" style={{ color: intern.color, background: `${intern.color}15`, borderColor: `${intern.color}40` }}>
                                        {intern.duration}
                                    </div>
                                </div>
                                <p className="intern-description">{intern.description}</p>
                                <div className="intern-skills">
                                    {intern.skills.map(s => (
                                        <span key={s} className="tech-tag">{s}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}

                        {/* Stats Grid */}
                        <div className="edu-stats-grid">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    className="edu-stat-card glass-card"
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.1 + 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <span className="edu-stat-icon" style={{ color: stat.color }}>
                                        <stat.Icon size={22} />
                                    </span>
                                    <span className="edu-stat-value" style={{ color: stat.color }}>{stat.value}</span>
                                    <span className="edu-stat-label">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
