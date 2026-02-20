import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { achievements, certifications, softSkills, languages } from '../data/portfolioData';
import { personalInfo } from '../data/portfolioData';
import './Achievements.css';
import {
    FiUpload, FiCamera, FiX, FiExternalLink,
    FiZap, FiCode, FiMessageCircle, FiUsers,
    FiClock, FiSearch, FiGlobe, FiPieChart,
    FiAward, FiFileText, FiSmartphone, FiTarget
} from 'react-icons/fi';
import { FaTrophy, FaJava } from 'react-icons/fa';
import { SiLeetcode, SiFlutter, SiDart } from 'react-icons/si';
import { HiOutlineLightBulb, HiOutlineAcademicCap } from 'react-icons/hi';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
    }),
};

// Helper component functions so icons inherit correct color
function AchIcon({ id, color }) {
    if (id === 'university-rank') return <FaTrophy size={22} color={color} />;
    if (id === 'hackathon') return <FiZap size={22} color={color} />;
    if (id === 'leetcode') return <SiLeetcode size={20} color={color} />;
    return null;
}
function CertIcon({ idx, color }) {
    if (idx === 0) return <FiCode size={30} color={color} />;
    if (idx === 1) return <FaJava size={30} color={color} />;
    if (idx === 2) return <SiFlutter size={30} color={color} />;
    if (idx === 3) return <SiDart size={30} color={color} />;
    return <FiFileText size={30} color={color} />;
}
function SoftSkillIconC({ idx }) {
    const p = { size: 18, color: '#a78bfa' };
    if (idx === 0) return <FiMessageCircle {...p} />;
    if (idx === 1) return <FiUsers {...p} />;
    if (idx === 2) return <HiOutlineLightBulb {...p} />;
    if (idx === 3) return <FiClock {...p} />;
    if (idx === 4) return <FiSearch {...p} />;
    return null;
}

// ── Award Photo Upload ──
function AwardPhotoSlot({ achievementId }) {
    const [photo, setPhoto] = useState(() => localStorage.getItem(`award_photo_${achievementId}`) || null);
    const [hovering, setHovering] = useState(false);
    const fileRef = useRef();

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setPhoto(ev.target.result);
            localStorage.setItem(`award_photo_${achievementId}`, ev.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        setPhoto(null);
        localStorage.removeItem(`award_photo_${achievementId}`);
    };

    return (
        <div className="award-photo-slot">
            <input ref={fileRef} type="file" accept="image/*"
                style={{ display: 'none' }} onChange={handleUpload} />

            {photo ? (
                <div
                    className="award-photo-preview"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    onClick={() => fileRef.current.click()}
                >
                    <img src={photo} alt="Award" className="award-img" />
                    {hovering && (
                        <div className="award-photo-overlay">
                            <FiCamera size={20} />
                            <span>Change Photo</span>
                        </div>
                    )}
                    <button className="award-remove-btn" onClick={handleRemove} title="Remove">
                        <FiX size={12} />
                    </button>
                </div>
            ) : (
                <motion.div className="award-upload-empty"
                    onClick={() => fileRef.current.click()}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <div className="award-upload-icon"><FiUpload size={22} /></div>
                    <p className="award-upload-title">Add Award Photo</p>
                    <p className="award-upload-sub">Click to upload your rank certificate or award photo</p>
                </motion.div>
            )}
        </div>
    );
}

export default function Achievements() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="achievements" className="section ach-section" ref={ref}>
            <div className="container">
                <motion.div className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <div className="section-tag">// Highlights</div>
                    <h2 className="section-title">Achievements &amp; Certifications</h2>
                    <div className="divider" />
                    <p className="section-subtitle">Recognition and credentials earned through dedication</p>
                </motion.div>

                <div className="ach-grid-main">
                    {/* ── Achievements ── */}
                    <div className="ach-col">
                        <motion.h3 className="ach-col-title"
                            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
                            <FiAward size={18} color="#f59e0b" /> Achievements
                        </motion.h3>
                        <div className="ach-list">
                            {achievements.map((ach, i) => (
                                <motion.div
                                    key={ach.id}
                                    className={`ach-card glass-card${ach.hasAwardPhoto ? ' ach-card-award' : ''}`}
                                    variants={fadeUp} custom={i * 0.12}
                                    initial="hidden" animate={inView ? 'visible' : 'hidden'}
                                    whileHover={{ x: 4 }}
                                >
                                    <div className="ach-card-top">
                                        <div className="ach-icon" style={{ background: `${ach.color}15`, borderColor: ach.color }}>
                                            <AchIcon id={ach.id} color={ach.color} />
                                        </div>
                                        <div className="ach-text">
                                            <h4 style={{ color: ach.color }}>{ach.title}</h4>
                                            <p>{ach.description}</p>
                                        </div>
                                    </div>

                                    {ach.id === 'leetcode' && (
                                        <a href={personalInfo.leetcode} target="_blank" rel="noopener noreferrer" className="leetcode-badge">
                                            <SiLeetcode size={14} color="#ffa116" />
                                            <span>View LeetCode Profile</span>
                                            <FiExternalLink size={12} />
                                        </a>
                                    )}

                                    {ach.hasAwardPhoto && <AwardPhotoSlot achievementId={ach.id} />}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ── Certifications ── */}
                    <div className="ach-col">
                        <motion.h3 className="ach-col-title"
                            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.25 }}>
                            <FiFileText size={18} color="#06b6d4" /> Certifications
                        </motion.h3>
                        <div className="cert-grid">
                            {certifications.map((cert, i) => (
                                <motion.div key={cert.title} className="cert-card glass-card"
                                    variants={fadeUp} custom={i * 0.1 + 0.2}
                                    initial="hidden" animate={inView ? 'visible' : 'hidden'}
                                    whileHover={{ scale: 1.04, y: -4 }}
                                >
                                    <div className="cert-icon-wrap">
                                        <CertIcon idx={i} color={cert.color} />
                                    </div>
                                    <h4 className="cert-title">{cert.title}</h4>
                                    <span className="cert-issuer" style={{ color: cert.color, background: `${cert.color}15`, borderColor: `${cert.color}40` }}>
                                        {cert.issuer}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Soft Skills & Languages ── */}
                <div className="ach-bottom">
                    <div className="ach-col">
                        <motion.h3 className="ach-col-title"
                            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
                            <HiOutlineLightBulb size={18} color="#a78bfa" /> Soft Skills
                        </motion.h3>
                        <div className="soft-skills-grid">
                            {softSkills.map((skill, i) => (
                                <motion.div key={skill.name} className="soft-skill-card glass-card"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: i * 0.08 + 0.4 }}
                                    whileHover={{ scale: 1.03, y: -3 }}
                                >
                                    <span className="soft-skill-icon">
                                        <SoftSkillIconC idx={i} />
                                    </span>
                                    <span className="soft-skill-name">{skill.name}</span>
                                    <div className="soft-skill-bar-track">
                                        <motion.div className="soft-skill-bar-fill"
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                                            transition={{ duration: 1, delay: i * 0.08 + 0.5 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="ach-col">
                        <motion.h3 className="ach-col-title"
                            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}>
                            <FiGlobe size={18} color="#06b6d4" /> Languages Known
                        </motion.h3>
                        <div className="lang-col">
                            {languages.map((lang, i) => (
                                <motion.div key={lang.name} className="lang-card glass-card"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: i * 0.12 + 0.4 }}
                                >
                                    <div className="lang-header">
                                        <span className="lang-name">{lang.name}</span>
                                        <span className="lang-level" style={{ color: lang.color }}>{lang.level}</span>
                                    </div>
                                    <div className="skill-bar-track" style={{ height: '8px', marginTop: '10px' }}>
                                        <motion.div className="skill-bar-fill"
                                            style={{ background: `linear-gradient(90deg, ${lang.color}99, ${lang.color})` }}
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: `${lang.percent}%` } : { width: 0 }}
                                            transition={{ duration: 1.2, delay: i * 0.12 + 0.5 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
