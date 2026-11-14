import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '../data/portfolioData';
import './About.css';
import { FiArrowRight, FiMapPin, FiMail, FiCode, FiAward } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import profileImg from '../assets/Profile.png';

export default function About() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1, y: 0,
            transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
        }),
    };

    const infoCards = [
        { icon: <FiMapPin />, label: 'Location', value: 'Chennai, Tamil Nadu', color: '#ec4899', href: null },
        { icon: <FiCode />, label: 'Focus', value: 'Flutter & Java Developer', color: '#7c3aed', href: null },
        { icon: <FiAward />, label: 'CGPA', value: '8.87 / 10  |  3rd Rank', color: '#f59e0b', href: null },
        { icon: <SiLeetcode size={16} />, label: 'LeetCode', value: '260+ Problems Solved', color: '#ffa116', href: personalInfo.leetcode },
    ];

    return (
        <section id="about" className="section about-section" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <div className="section-tag">// My Story</div>
                    <h2 className="section-title">About Me</h2>
                    <div className="divider" />
                </motion.div>

                <div className="about-layout">
                    {/* ── Profile Card (Left) ── */}
                    <motion.div
                        className="profile-card-wrap"
                        initial={{ opacity: 0, x: -50, scale: 0.95 }}
                        animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        <div className="profile-card glass-card">
                            {/* Image section */}
                            <div className="profile-img-section">
                                <div className="profile-img-ring">
                                    <img src={profileImg} alt="Praveen K" className="profile-img" />
                                </div>
                            </div>

                            {/* Name & Title */}
                            <div className="profile-name-block">
                                <h3 className="profile-fullname">{personalInfo.name}</h3>
                                <p className="profile-role-tag">
                                    <span className="role-dot" />
                                    Flutter & Java Developer
                                </p>
                            </div>

                            {/* Quick Stats */}
                            <div className="profile-quick-stats">
                                {[
                                    { v: '8.87', l: 'CGPA' },
                                    { v: '260+', l: 'LeetCode' },
                                    { v: '3rd', l: 'Univ. Rank' },
                                ].map((s) => (
                                    <div key={s.l} className="quick-stat">
                                        <span className="quick-stat-val gradient-text">{s.v}</span>
                                        <span className="quick-stat-label">{s.l}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Status */}
                            <div className="profile-status">
                                <span className="status-pulse" />
                                <span>Open to Internships &amp; Projects</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Content (Right) ── */}
                    <div className="about-content">
                        {/* Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="about-greeting">
                                Hello! I'm <span className="gradient-text">Praveen K</span> 👋
                            </h3>
                        </motion.div>

                        <motion.p
                            className="about-text"
                            initial={{ opacity: 0, y: 18 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            I'm a passionate <span className="hl">Information Technology undergraduate</span> at Panimalar Engineering College with a strong academic record of <span className="hl">8.87 CGPA</span> and a <span className="hl">University 3rd Rank</span> holder. My journey in tech is driven by curiosity and a love for solving complex problems.
                        </motion.p>

                        <motion.p
                            className="about-text"
                            initial={{ opacity: 0, y: 18 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            I specialize in <span className="hl">Flutter &amp; Dart</span> for mobile development and have a solid foundation in <span className="hl">Java and OOP principles</span>. I've competed in hackathons, earned university recognition, and solved <span className="hl">260+ DSA problems</span> on LeetCode.
                        </motion.p>

                        <motion.p
                            className="about-text"
                            initial={{ opacity: 0, y: 18 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            I'm currently seeking opportunities to contribute meaningfully to innovative products while growing as an engineer in a collaborative, high-impact environment.
                        </motion.p>

                        {/* Info Cards Grid */}
                        <div className="info-cards-grid">
                            {infoCards.map((card, i) => (
                                <motion.a
                                    key={card.label}
                                    href={card.href || '#'}
                                    target={card.href ? '_blank' : undefined}
                                    rel={card.href ? 'noopener noreferrer' : undefined}
                                    className={`info-card glass-card${card.href ? ' info-card-link' : ''}`}
                                    style={{ textDecoration: 'none' }}
                                    variants={cardVariants}
                                    custom={i * 0.1 + 0.4}
                                    initial="hidden"
                                    animate={inView ? 'visible' : 'hidden'}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    onClick={card.href ? undefined : (e) => e.preventDefault()}
                                >
                                    <div className="info-card-icon" style={{ color: card.color, background: `${card.color}15`, borderColor: `${card.color}30` }}>
                                        {card.icon}
                                    </div>
                                    <div className="info-card-text">
                                        <span className="info-card-label">{card.label}</span>
                                        <span className="info-card-value">{card.value}</span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* CTAs */}
                        <motion.div
                            className="about-actions"
                            initial={{ opacity: 0, y: 18 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <a href="#projects" className="btn-primary">
                                <span>View Projects</span>
                                <FiArrowRight size={15} />
                            </a>
                            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline">
                                <span>Connect on LinkedIn</span>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
