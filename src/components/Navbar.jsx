import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Sparkles } from 'lucide-react'
import VGALogo from './VGALogo'
import './Navbar.css'

const links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'blog', label: 'Research Logs' },
    { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection, onOpenResume }) {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
    }

    return (
        <>
            <motion.nav
                className={`navbar ${scrolled ? 'scrolled' : ''}`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="nav-container">
                    <button className="nav-logo" onClick={() => scrollTo('hero')} aria-label="Go to top">
                        <VGALogo className="nav-logo-svg" />
                    </button>

                    <ul className="nav-links">
                        {links.map(l => (
                            <li key={l.id}>
                                <button
                                    className={`nav-link ${activeSection === l.id ? 'active' : ''}`}
                                    onClick={() => scrollTo(l.id)}
                                >
                                    {l.label}
                                    {activeSection === l.id && (
                                        <motion.div className="nav-underline" layoutId="underline" />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="nav-actions">
                        <motion.button
                            className="btn-ghost nav-resume-btn"
                            onClick={onOpenResume}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="View ATS-Optimized Resume & PDF Exporter"
                        >
                            <FileText size={15} className="text-neon" />
                            <span>Resume</span>
                            <span className="nav-resume-badge">ATS</span>
                        </motion.button>

                        <motion.button
                            className="btn-primary nav-cta"
                            onClick={() => scrollTo('contact')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Let's Talk</span>
                        </motion.button>
                    </div>

                    <button 
                        className={`hamburger ${menuOpen ? 'open' : ''}`} 
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle Navigation Menu"
                    >
                        <span /><span /><span />
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
                        transition={{ duration: 0.2 }}
                    >
                        {links.map(l => (
                            <button key={l.id} className="mobile-link" onClick={() => scrollTo(l.id)}>
                                {l.label}
                            </button>
                        ))}
                        <div className="mobile-actions">
                            <button 
                                className="btn-ghost" 
                                style={{ width: '100%', justifyContent: 'center' }}
                                onClick={() => { setMenuOpen(false); onOpenResume(); }}
                            >
                                <FileText size={16} className="text-neon" />
                                <span>View Resume (ATS &amp; PDF)</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
