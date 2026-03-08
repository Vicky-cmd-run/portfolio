import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VGALogo from './VGALogo'
import './Navbar.css'

const links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'blog', label: 'Training Logs' },
    { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection }) {
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
                    <button className="nav-logo" onClick={() => scrollTo('hero')}>
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

                    <motion.button
                        className="btn-primary nav-cta"
                        onClick={() => scrollTo('contact')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Hire Me
                    </motion.button>

                    <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
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
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
