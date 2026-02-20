import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

// Page Loader
function Loader({ onDone }) {
  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="loader-content">
        <motion.div
          className="loader-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="loader-logo"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span style={{ color: '#7c3aed' }}>&lt;</span>PK<span style={{ color: '#7c3aed' }}>/&gt;</span>
        </motion.div>
        <motion.p
          className="loader-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Building Portfolio...
        </motion.p>
      </div>
    </motion.div>
  );
}

// Section wrapper with scroll reveal
function SectionReveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main>
            <Hero />
            <SectionReveal><About /></SectionReveal>
            <SectionReveal><Skills /></SectionReveal>
            <SectionReveal><Projects /></SectionReveal>
            <SectionReveal><Education /></SectionReveal>
            <SectionReveal><Achievements /></SectionReveal>
            <SectionReveal><Contact /></SectionReveal>
          </main>
          <Footer />
        </motion.div>
      )}

      <style>{`
        .page-loader {
          position: fixed;
          inset: 0;
          background: #050816;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .loader-ring {
          width: 70px;
          height: 70px;
          border: 3px solid rgba(124,58,237,0.2);
          border-top-color: #7c3aed;
          border-radius: 50%;
          position: absolute;
        }
        .loader-logo {
          font-family: 'Fira Code', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: #f1f5f9;
          position: relative;
        }
        .loader-text {
          font-size: 13px;
          color: #475569;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 52px;
          font-family: 'Fira Code', monospace;
          position: absolute;
        }
      `}</style>
    </>
  );
}
