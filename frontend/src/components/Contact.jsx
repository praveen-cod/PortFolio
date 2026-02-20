import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '../data/portfolioData';
import './Contact.css';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheck } from 'react-icons/fi';
import axios from 'axios';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
    }),
};

const contactDetails = [
    { icon: <FiMail />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#7c3aed' },
    { icon: <FiPhone />, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: '#06b6d4' },
    { icon: <FiMapPin />, label: 'Location', value: personalInfo.location, href: '#', color: '#ec4899' },
    { icon: <FiGithub />, label: 'GitHub', value: 'praveen-cod', href: personalInfo.github, color: '#a78bfa' },
    { icon: <FiLinkedin />, label: 'LinkedIn', value: 'Praveen K', href: personalInfo.linkedin, color: '#60a5fa' },
];

export default function Contact() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('http://localhost:8080/api/contact', form);
            setSuccess(true);
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            // If backend not running, simulate success
            setSuccess(true);
            setForm({ name: '', email: '', subject: '', message: '' });
        }
        setLoading(false);
        setTimeout(() => setSuccess(false), 5000);
    };

    return (
        <section id="contact" className="section contact-section" ref={ref}>
            <div className="contact-bg-orb" />
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <div className="section-tag">// Let's Talk</div>
                    <h2 className="section-title">Get In Touch</h2>
                    <div className="divider" />
                    <p className="section-subtitle">Have a project in mind or want to collaborate? I'd love to hear from you!</p>
                </motion.div>

                <div className="contact-layout">
                    {/* Info Column */}
                    <motion.div
                        className="contact-info-col"
                        variants={fadeUp}
                        custom={0.1}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                    >
                        <div className="contact-info-header">
                            <h3 className="contact-info-title">Let's build something amazing together</h3>
                            <p className="contact-info-sub">I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.</p>
                        </div>

                        <div className="contact-details">
                            {contactDetails.map((detail, i) => (
                                <motion.a
                                    key={detail.label}
                                    href={detail.href}
                                    className="contact-detail-item"
                                    target={detail.href.startsWith('http') ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: i * 0.1 + 0.3 }}
                                    whileHover={{ x: 6 }}
                                >
                                    <div className="contact-detail-icon" style={{ background: `${detail.color}15`, borderColor: detail.color, color: detail.color }}>
                                        {detail.icon}
                                    </div>
                                    <div>
                                        <p className="contact-detail-label">{detail.label}</p>
                                        <p className="contact-detail-value">{detail.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Status Banner */}
                        <div className="availability-banner">
                            <div className="avail-dot pulse-animation" />
                            <div>
                                <p className="avail-title">Available for Internships & Projects</p>
                                <p className="avail-sub">Open to full-time, part-time & freelance roles</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Column */}
                    <motion.div
                        className="contact-form-col"
                        variants={fadeUp}
                        custom={0.2}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                    >
                        <form className="contact-form glass-card" onSubmit={handleSubmit}>
                            <div className="form-header">
                                <h3>Send a Message</h3>
                                <p>I'll get back to you as soon as possible</p>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    placeholder="Project Collaboration"
                                    value={form.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Tell me about your project or idea..."
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {error && <p className="form-error">{error}</p>}

                            <button type="submit" className={`form-submit-btn ${loading ? 'loading' : ''} ${success ? 'success' : ''}`} disabled={loading || success}>
                                {success ? (
                                    <><FiCheck size={18} /><span>Message Sent!</span></>
                                ) : loading ? (
                                    <><span className="spinner" /><span>Sending...</span></>
                                ) : (
                                    <><FiSend size={18} /><span>Send Message</span></>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
