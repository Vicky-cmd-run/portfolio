import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Globe, ArrowUp } from 'lucide-react'
import VGALogo from './VGALogo'
import './Footer.css'

export default function Footer({ onOpenResume }) {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <button className="footer-logo" onClick={() => scrollTo('hero')} aria-label="Go to top">
                        <VGALogo className="footer-logo-svg" />
                    </button>
                    <p className="footer-tagline">Architecting Explainable AI, Computer Vision &amp; Distributed Data Intelligence.</p>
                    
                    <div className="footer-links">
                        <a href="https://github.com/vicky-cmd-run" target="_blank" rel="noreferrer" className="footer-link">
                            <Github size={14} /> GitHub
                        </a>
                        <a href="https://linkedin.com/in/vignesh-ga" target="_blank" rel="noreferrer" className="footer-link">
                            <Linkedin size={14} /> LinkedIn
                        </a>
                        <a href="mailto:vigneshgnanasekaran8@gmail.com" className="footer-link">
                            <Mail size={14} /> Email
                        </a>
                        <a href="https://vigneshga.vercel.app" target="_blank" rel="noreferrer" className="footer-link">
                            <Globe size={14} /> Live Web
                        </a>
                        <button onClick={onOpenResume} className="footer-link-btn text-neon">
                            ● ATS Resume Dossier
                        </button>
                    </div>

                    <div className="footer-divider" />
                    
                    <div className="footer-bottom-row">
                        <p className="footer-copy">© 2026 Vignesh G A · UIDAI SITAA Stage 2 Finalist</p>
                        <button className="scroll-top-btn" onClick={() => scrollTo('hero')} aria-label="Scroll to top">
                            <ArrowUp size={14} /> Back to top
                        </button>
                    </div>
                </div>
            </div>
            <div className="footer-glow" />
        </footer>
    )
}
