import React from 'react';
import './Navbar.css';
import { personalInfo } from '../data/portfolioData';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = React.useState(false);
    const [active, setActive] = React.useState('Home');
    const [menuOpen, setMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                className={`navbar ${scrolled ? 'scrolled' : ''}`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="nav-container">
                    <a href="#home" className="nav-logo">
                        <span className="logo-bracket">&lt;</span>
                        <span className="logo-name">PK</span>
                        <span className="logo-bracket"> /&gt;</span>
                    </a>

                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className={`nav-link ${active === link.label ? 'active' : ''}`}
                                    onClick={() => setActive(link.label)}
                                >
                                    {link.label}
                                    <span className="nav-link-underline" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <a href={`mailto:${personalInfo.email}`} className="nav-cta btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 22px', fontSize: '14px' }}>
                        <span>Hire Me</span>
                        <span>✉️</span>
                    </a>

                    <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                className="mobile-link"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => { setActive(link.label); setMenuOpen(false); }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <a href={`mailto:${personalInfo.email}`} className="btn-primary" style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 24px' }}>
                            <span>Hire Me</span><span>✉️</span>
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
