import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import './Hero.css'

const TECH_ORBIT = [
    {
        label: 'TensorFlow', ring: 1, angle: 0,
        svg: <svg viewBox="0 0 24 24" fill="#FF6F00" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L1.5 6v6l4.5 2.625V9L12 6l6 3.47V21l-6 3.47-4.5-2.59V15L1.5 12.375V18L12 24l10.5-6V6z" /></svg>
    },
    {
        label: 'React.js', ring: 1, angle: 72,
        svg: <svg viewBox="0 0 24 24" fill="#61DAFB" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.139" /><path d="M12 6.5c3.542 0 6.876.763 9.16 2.025 2.285 1.262 3.84 3.054 3.84 4.975s-1.555 3.713-3.84 4.975C18.876 19.737 15.542 20.5 12 20.5c-3.542 0-6.876-.763-9.16-2.025C.555 17.213-1 15.421-1 13.5s1.555-3.713 3.84-4.975C5.124 7.263 8.458 6.5 12 6.5z" fill="none" stroke="#61DAFB" strokeWidth="1.2" /><path d="M8.5 12C8.5 8.458 9.263 5.124 10.525 2.84 11.787.555 13.579-1 15.5-1s3.713 1.555 4.975 3.84C21.737 5.124 22.5 8.458 22.5 12c0 3.542-.763 6.876-2.025 9.16C19.213 23.445 17.421 25 15.5 25s-3.713-1.555-4.975-3.84C9.263 18.876 8.5 15.542 8.5 12z" fill="none" stroke="#61DAFB" strokeWidth="1.2" /><path d="M15.5 12c0 3.542-.763 6.876-2.025 9.16C12.213 23.445 10.421 25 8.5 25s-3.713-1.555-4.975-3.84C2.263 18.876 1.5 15.542 1.5 12c0-3.542.763-6.876 2.025-9.16C4.787.555 6.579-1 8.5-1s3.713 1.555 4.975 3.84C15.737 5.124 16.5 8.458 16.5 12z" fill="none" stroke="#61DAFB" strokeWidth="1.2" /></svg>
    },
    {
        label: 'Python', ring: 1, angle: 144,
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.8 0 6.2 2.67 6.2 2.67l.01 2.77h5.9v.83H3.9S0 5.8 0 12.07c0 6.27 3.46 6.05 3.46 6.05h2.07v-2.91s-.11-3.46 3.41-3.46h5.87s3.3.05 3.3-3.19V3.26S18.62 0 12 0zm-3.27 1.88a1.07 1.07 0 1 1 0 2.14 1.07 1.07 0 0 1 0-2.14z" fill="#3776AB" /><path d="M12 24c6.2 0 5.8-2.67 5.8-2.67l-.01-2.77H11.9v-.83h8.21S24 18.2 24 11.93c0-6.27-3.46-6.05-3.46-6.05h-2.07v2.91s.11 3.46-3.41 3.46H9.19s-3.3-.05-3.3 3.19v5.3S5.38 24 12 24zm3.27-1.88a1.07 1.07 0 1 1 0-2.14 1.07 1.07 0 0 1 0 2.14z" fill="#FFD43B" /></svg>
    },
    {
        label: 'GCP', ring: 1, angle: 216,
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 6.5L8.5 10H6a6 6 0 000 12h12a6 6 0 001.5-11.8L18 10h-2.5L12 6.5z" fill="#4285F4" /><path d="M18 10h-2.5l-1-1.5h-5L8 10H6a6 6 0 000 12h12a6 6 0 001.5-11.8L18 10z" fill="none" /><circle cx="9" cy="16" r="1.5" fill="white" /><circle cx="12" cy="16" r="1.5" fill="white" /><circle cx="15" cy="16" r="1.5" fill="white" /></svg>
    },
    {
        label: 'SHAP', ring: 1, angle: 288,
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="10" width="9" height="4" rx="1" fill="#00F2FF" opacity="0.9" /><rect x="4" y="6" width="7" height="4" rx="1" fill="#00F2FF" opacity="0.7" /><rect x="2" y="14" width="11" height="4" rx="1" fill="#7000FF" opacity="0.8" /><text x="14" y="17" fontFamily="monospace" fontSize="8" fill="#00F2FF">ϕ</text></svg>
    },
    {
        label: 'OpenCV', ring: 2, angle: 36,
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="4" r="3" fill="#5C9E47" /><circle cx="4.3" cy="17.5" r="3" fill="#E44D2E" /><circle cx="19.7" cy="17.5" r="3" fill="#3A8DC5" /><path d="M12 7c-3.5 0-6 2.5-5.5 5.5l1.5-.5c0-2.5 1.7-3.8 4-4z" fill="#5C9E47" /><path d="M6.5 14.5c-1 2.5.5 5 3 5.5l.5-1.5c-1.5-.5-2.5-2-2-4z" fill="#E44D2E" /><path d="M17.5 14.5c1 2.5-.5 5-3 5.5l-.5-1.5c1.5-.5 2.5-2 2-4z" fill="#3A8DC5" /></svg>
    },
    {
        label: 'Keras', ring: 2, angle: 108,
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 2h16v20H4z" fill="#D00000" opacity="0.15" rx="2" /><path d="M7 4v7l5-3.5L17 4H7z" fill="#D00000" /><path d="M7 20v-7l5 3.5 5 3.5H7z" fill="#D00000" /><path d="M12 10.5l5-3.5v7l-5-3.5z" fill="#FF6767" /></svg>
    },
    {
        label: 'Transformers', ring: 2, angle: 180,
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="5" height="5" rx="1" fill="#FFD21E" /><rect x="16" y="3" width="5" height="5" rx="1" fill="#FFD21E" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" fill="#FF9D00" /><rect x="3" y="16" width="5" height="5" rx="1" fill="#FFD21E" /><rect x="16" y="16" width="5" height="5" rx="1" fill="#FFD21E" /><line x1="5.5" y1="8" x2="12" y2="9.5" stroke="#FF9D00" strokeWidth="1.2" /><line x1="18.5" y1="8" x2="12" y2="9.5" stroke="#FF9D00" strokeWidth="1.2" /><line x1="5.5" y1="16" x2="12" y2="14.5" stroke="#FF9D00" strokeWidth="1.2" /><line x1="18.5" y1="16" x2="12" y2="14.5" stroke="#FF9D00" strokeWidth="1.2" /></svg>
    },
    {
        label: 'Streamlit', ring: 2, angle: 252,
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 7.5L12 3 3 7.5l4.5 2.25L12 12l4.5-2.25L21 7.5z" fill="#FF4B4B" /><path d="M3 7.5v9l9 4.5V12L3 7.5z" fill="#FF4B4B" opacity="0.6" /><path d="M21 7.5v9l-9 4.5V12l9-4.5z" fill="#FF4B4B" opacity="0.8" /></svg>
    },
    {
        label: 'BiLSTM', ring: 2, angle: 324,
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="9" width="5" height="6" rx="1" fill="#00F2FF" opacity="0.9" /><rect x="9.5" y="9" width="5" height="6" rx="1" fill="#7000FF" opacity="0.9" /><rect x="18" y="9" width="5" height="6" rx="1" fill="#00F2FF" opacity="0.9" /><path d="M6 12h3.5" stroke="#00F2FF" strokeWidth="1.2" markerEnd="url(#a)" /><path d="M14.5 12H18" stroke="#00F2FF" strokeWidth="1.2" /><path d="M18 10.5l-8-3" stroke="#7000FF" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 1" /><path d="M6 10.5l8-3" stroke="#7000FF" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 1" /></svg>
    },
]

function OrbitItem({ item, rotation }) {
    const r = item.ring === 1 ? 140 : 210
    const rad = ((item.angle + rotation) * Math.PI) / 180
    const x = Math.cos(rad) * r
    const y = Math.sin(rad) * r
    return (
        <motion.div
            className="orbit-item"
            style={{ transform: `translate(${x}px, ${y}px)` }}
            whileHover={{ scale: 1.2 }}
        >
            <div className="orbit-emoji">{item.svg}</div>
            <span className="orbit-label">{item.label}</span>
        </motion.div>
    )
}

export default function Hero() {
    const [rotation, setRotation] = useState(0)
    const rafRef = useRef()

    useEffect(() => {
        let angle = 0
        const animate = () => {
            angle += 0.08
            setRotation(angle)
            rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafRef.current)
    }, [])

    const stats = [
        { value: '94.82%', label: 'Test Accuracy' },
        { value: 'R²=0.848', label: 'Regression Score' },
        { value: '30%', label: 'Perf. Improvement' },
    ]

    return (
        <section id="hero" className="hero">
            <div className="hero-grid">
                {/* LEFT: Content */}
                <div className="hero-content">
                    <motion.div
                        className="hero-badge glass"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <span className="badge-dot" /> Available for Opportunities
                    </motion.div>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="hero-name">Vignesh G A:</span>
                        <br />
                        Bridging the Gap Between
                        <br />
                        <span className="text-gradient">Neural Networks</span>
                        {' & '}
                        <span style={{ color: '#b47aff' }}>User Interfaces</span>
                    </motion.h1>

                    <motion.p
                        className="hero-sub"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        B.Tech CSE student at <strong>VIT-AP</strong> specializing in{' '}
                        <strong className="text-neon">Explainable AI</strong> and{' '}
                        <strong>Full-Stack development</strong>
                    </motion.p>

                    <motion.div
                        className="typewriter-wrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <span className="tw-prefix">Currently crafting: </span>
                        <TypeAnimation
                            sequence={[
                                'Explainable AI', 2000,
                                'Computer Vision', 2000,
                                'React Architecture', 2000,
                                'Cloud Solutions', 2000,
                                'BiLSTM Models', 2000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="tw-text"
                        />
                        <span className="tw-cursor">|</span>
                    </motion.div>

                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.button
                            className="btn-primary"
                            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Projects <span>→</span>
                        </motion.button>
                        <motion.a
                            href="mailto:vigneshgnanasekaran8@gmail.com"
                            className="btn-ghost"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Me
                        </motion.a>
                    </motion.div>

                    <motion.div
                        className="hero-stats"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        {stats.map((s, i) => (
                            <div key={i} className="hero-stat">
                                <span className="stat-val">{s.value}</span>
                                <span className="stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* RIGHT: Orbit */}
                <motion.div
                    className="orbit-outer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <div className="orbit-scene">
                        <div className="orbit-ring-svg ring-1" />
                        <div className="orbit-ring-svg ring-2" />
                        <div className="orbit-core glass-neon">
                            <span className="core-text">AI/ML</span>
                            <span className="core-sub">Engineer</span>
                        </div>
                        {TECH_ORBIT.map((item, i) => (
                            <OrbitItem key={i} item={item} rotation={rotation} />
                        ))}
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="scroll-hint"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="scroll-line" />
                <span>Scroll to explore</span>
            </motion.div>
        </section>
    )
}
