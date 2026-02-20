import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import './Footer.css';
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Achievements', 'Contact'];

export default function Footer() {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="footer">
            <div className="footer-glow" />
            <div className="container">
                <div className="footer-top">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="logo-bracket">&lt;</span>
                            <span className="logo-name">PK</span>
                            <span className="logo-bracket"> /&gt;</span>
                        </div>
                        <p className="footer-tagline">
                            Building experiences that matter — one line of code at a time.
                        </p>
                        <div className="footer-socials">
                            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-social-btn">
                                <FiGithub />
                            </a>
                            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-btn">
                                <FiLinkedin />
                            </a>
                            <a href={`mailto:${personalInfo.email}`} className="footer-social-btn">
                                <FiMail />
                            </a>
                        </div>
                    </div>

                    {/* Nav */}
                    <div className="footer-nav">
                        <h4 className="footer-nav-title">Navigation</h4>
                        <ul>
                            {navLinks.map(link => (
                                <li key={link}>
                                    <a href={`#${link.toLowerCase()}`} className="footer-nav-link">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-contact">
                        <h4 className="footer-nav-title">Contact</h4>
                        <div className="footer-contact-list">
                            <p className="footer-contact-item">📧 {personalInfo.email}</p>
                            <p className="footer-contact-item">📞 {personalInfo.phone}</p>
                            <p className="footer-contact-item">📍 {personalInfo.location}</p>
                        </div>
                        <div className="footer-avail">
                            <span className="avail-pulse" />
                            <span>Open to opportunities</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copy">
                        © 2025 Praveen K. Made with <FiHeart className="heart-icon" /> using React & Spring Boot
                    </p>
                    <button className="scroll-top-btn" onClick={scrollTop} aria-label="Scroll to top">
                        <FiArrowUp size={16} />
                    </button>
                </div>
            </div>
        </footer>
    );
}
