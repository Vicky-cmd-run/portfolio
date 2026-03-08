import { motion } from 'framer-motion'
import VGALogo from './VGALogo'
import './Footer.css'

export default function Footer() {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <button className="footer-logo" onClick={() => scrollTo('hero')}>
                        <VGALogo className="footer-logo-svg" />
                    </button>
                    <p className="footer-tagline">Building the future, one neural network at a time.</p>
                    <div className="footer-links">
                        {[
                            ['GitHub', 'https://github.com/vicky-cmd-run'],
                            ['LinkedIn', 'https://linkedin.com/in/vignesh-ga'],
                            ['Email', 'mailto:vigneshgnanasekaran8@gmail.com'],
                        ].map(([label, href]) => (
                            <a key={label} href={href} target="_blank" rel="noreferrer" className="footer-link">{label}</a>
                        ))}
                    </div>
                    <div className="footer-divider" />
                    <p className="footer-copy">© 2025 Vignesh G A · Crafted with ❤️ + ☕</p>
                </div>
            </div>
            <div className="footer-glow" />
        </footer>
    )
}
