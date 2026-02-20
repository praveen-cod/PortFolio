import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import './Hero.css';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiArrowDown, FiZap, FiCpu } from 'react-icons/fi';
import { SiLeetcode, SiFlutter } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const roles = personalInfo.roles;

export default function Hero() {
    const [roleIndex, setRoleIndex] = React.useState(0);
    const [displayText, setDisplayText] = React.useState('');
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [charIndex, setCharIndex] = React.useState(0);
    const [profileImg, setProfileImg] = React.useState(null);

    // Load profile image from localStorage (shared with About section)
    React.useEffect(() => {
        const saved = localStorage.getItem('profile_image');
        if (saved) setProfileImg(saved);
        const onStorage = () => {
            const updated = localStorage.getItem('profile_image');
            setProfileImg(updated || null);
        };
        window.addEventListener('storage', onStorage);
        // Poll every 2s in case About uploads it in same tab
        const interval = setInterval(onStorage, 2000);
        return () => { window.removeEventListener('storage', onStorage); clearInterval(interval); };
    }, []);

    // Typing animation
    React.useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout;
        if (!isDeleting && charIndex <= currentRole.length) {
            timeout = setTimeout(() => { setDisplayText(currentRole.slice(0, charIndex)); setCharIndex(c => c + 1); }, 80);
        } else if (!isDeleting && charIndex > currentRole.length) {
            timeout = setTimeout(() => setIsDeleting(true), 1800);
        } else if (isDeleting && charIndex > 0) {
            timeout = setTimeout(() => { setDisplayText(currentRole.slice(0, charIndex - 1)); setCharIndex(c => c - 1); }, 45);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setRoleIndex(r => (r + 1) % roles.length);
        }
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, roleIndex]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
    };

    return (
        <section id="home" className="hero-section">
            {/* Animated Background */}
            <div className="hero-bg">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                <div className="grid-lines" />
            </div>

            <div className="container">
                <div className="hero-inner">
                    {/* ── Content ── */}
                    <motion.div
                        className="hero-content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants} className="hero-badge">
                            <span className="badge-dot" />
                            <span>Available for Opportunities</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="hero-name">
                            Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
                        </motion.h1>

                        <motion.div variants={itemVariants} className="hero-role-wrapper">
                            <span className="hero-role-prefix">I'm a </span>
                            <span className="hero-role-text">
                                {displayText}<span className="cursor">|</span>
                            </span>
                        </motion.div>

                        <motion.p variants={itemVariants} className="hero-description">
                            {personalInfo.objective}
                        </motion.p>

                        <motion.div variants={itemVariants} className="hero-actions">
                            <a href="#projects" className="btn-primary">
                                <span>View My Work</span>
                                <span>🚀</span>
                            </a>
                            <a href="#contact" className="btn-outline">
                                <span>Get In Touch</span>
                            </a>
                        </motion.div>

                        <motion.div variants={itemVariants} className="hero-socials">
                            {[
                                { href: personalInfo.github, icon: <FiGithub size={17} />, label: 'GitHub' },
                                { href: personalInfo.linkedin, icon: <FiLinkedin size={17} />, label: 'LinkedIn' },
                                { href: personalInfo.leetcode, icon: <SiLeetcode size={17} color="#ffa116" />, label: 'LeetCode' },
                                { href: `mailto:${personalInfo.email}`, icon: <FiMail size={17} />, label: 'Email' },
                                { href: `tel:${personalInfo.phone}`, icon: <FiPhone size={17} />, label: 'Phone' },
                            ].map(s => (
                                <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined}
                                    rel="noopener noreferrer" className="social-btn" aria-label={s.label}>
                                    {s.icon}
                                </a>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="hero-stats">
                            {[
                                { value: '8.87', suffix: '/10', label: 'CGPA' },
                                { value: '260+', suffix: '', label: 'LeetCode' },
                                { value: '3rd', suffix: '', label: 'Univ. Rank' },
                                { value: '2+', suffix: '', label: 'Projects' },
                            ].map(s => (
                                <div className="hero-stat" key={s.label}>
                                    <span className="stat-value gradient-text">{s.value}{s.suffix}</span>
                                    <span className="stat-label">{s.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── Avatar ── */}
                    <motion.div
                        className="hero-avatar-wrap"
                        initial={{ opacity: 0, scale: 0.8, x: 60 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="avatar-ring-outer">
                            <div className="avatar-ring-inner">
                                <div className="avatar-circle">
                                    {profileImg ? (
                                        <img src={profileImg} alt="Praveen K" className="avatar-photo" />
                                    ) : (
                                        <span className="avatar-initials">PK</span>
                                    )}
                                    <div className="avatar-glow" />
                                </div>
                            </div>
                            {[
                                { Icon: FaJava, color: '#f89820' },
                                { Icon: SiFlutter, color: '#54c5f8' },
                                { Icon: FiZap, color: '#f59e0b' },
                                { Icon: FiCpu, color: '#a78bfa' },
                            ].map(({ Icon, color }, i) => (
                                <div key={i} className={`orbit-icon orbit-icon-${i + 1}`} style={{ color }}>
                                    <Icon size={22} />
                                </div>
                            ))}
                        </div>

                        {/* Float Cards */}
                        <motion.div className="float-card float-card-left"
                            animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                            <span>🏆</span>
                            <div><p className="float-card-title">University 3rd Rank</p><p className="float-card-sub">2nd Semester</p></div>
                        </motion.div>

                        <motion.div className="float-card float-card-right"
                            animate={{ y: [0, 10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                            <span>💻</span>
                            <div><p className="float-card-title">LeetCode</p><p className="float-card-sub">260+ Solved</p></div>
                        </motion.div>

                        <motion.div className="float-card float-card-bottom"
                            animate={{ y: [0, -8, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                            <span>⚡</span>
                            <div><p className="float-card-title">Hackathon</p><p className="float-card-sub">Finalist</p></div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.a href="#about" className="scroll-indicator"
                animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <FiArrowDown size={17} />
            </motion.a>
        </section>
    );
}
