import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FileText, ArrowRight, Sparkles, Terminal } from 'lucide-react'
import './Hero.css'

const TECH_ORBIT = [
    {
        label: 'PyTorch', ring: 1, angle: 0,
        svg: <svg viewBox="0 0 24 24" fill="#EE4C2C" xmlns="http://www.w3.org/2000/svg"><path d="M12.7 0a9.6 9.6 0 0 0-7.2 3.3L7.7 5.5a6.7 6.7 0 0 1 5-2.3c3.7 0 6.7 3 6.7 6.7 0 3.7-3 6.7-6.7 6.7-3.7 0-6.7-3-6.7-6.7 0-.7.1-1.4.3-2L3.8 6.5A9.6 9.6 0 0 0 3 9.9C3 15.2 7.3 19.5 12.7 19.5c5.3 0 9.7-4.3 9.7-9.6C22.4 4.5 18 0 12.7 0zm1.7 4.7l-1.4 1.4 1.8 1.8-1.8 1.8 1.4 1.4 3.2-3.2-3.2-3.2z"/></svg>
    },
    {
        label: 'LangChain', ring: 1, angle: 72,
        svg: <svg viewBox="0 0 24 24" fill="#00A67E" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l-8-4v8l8 4 8-4v-8l-8 4z"/></svg>
    },
    {
        label: 'Transformers', ring: 1, angle: 144,
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="5" height="5" rx="1" fill="#FFD21E" /><rect x="16" y="3" width="5" height="5" rx="1" fill="#FFD21E" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" fill="#FF9D00" /><rect x="3" y="16" width="5" height="5" rx="1" fill="#FFD21E" /><rect x="16" y="16" width="5" height="5" rx="1" fill="#FFD21E" /><line x1="5.5" y1="8" x2="12" y2="9.5" stroke="#FF9D00" strokeWidth="1.2" /><line x1="18.5" y1="8" x2="12" y2="9.5" stroke="#FF9D00" strokeWidth="1.2" /></svg>
    },
    {
        label: 'SHAP (XAI)', ring: 1, angle: 216,
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="10" width="9" height="4" rx="1" fill="#00F2FF" opacity="0.9" /><rect x="4" y="6" width="7" height="4" rx="1" fill="#00F2FF" opacity="0.7" /><rect x="2" y="14" width="11" height="4" rx="1" fill="#7000FF" opacity="0.8" /><text x="14" y="17" fontFamily="monospace" fontSize="8" fill="#00F2FF">ϕ</text></svg>
    },
    {
        label: 'TensorFlow', ring: 1, angle: 288,
        svg: <svg viewBox="0 0 24 24" fill="#FF6F00" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L1.5 6v6l4.5 2.625V9L12 6l6 3.47V21l-6 3.47-4.5-2.59V15L1.5 12.375V18L12 24l10.5-6V6z" /></svg>
    },
    {
        label: 'FastAPI', ring: 2, angle: 0,
        svg: <svg viewBox="0 0 24 24" fill="#009688" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#009688"/><path d="M12 4l-4 7h3v5l4-7h-3V4z" fill="#ffffff"/></svg>
    },
    {
        label: 'Kafka', ring: 2, angle: 60,
        svg: <svg viewBox="0 0 24 24" fill="#231F20" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="#00F2FF" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="3" fill="#00F2FF"/><circle cx="12" cy="5" r="2" fill="#fff"/><circle cx="18" cy="16" r="2" fill="#fff"/><circle cx="6" cy="16" r="2" fill="#fff"/></svg>
    },
    {
        label: 'React.js', ring: 2, angle: 120,
        svg: <svg viewBox="0 0 24 24" fill="#61DAFB" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.139" /><path d="M12 6.5c3.542 0 6.876.763 9.16 2.025 2.285 1.262 3.84 3.054 3.84 4.975s-1.555 3.713-3.84 4.975C18.876 19.737 15.542 20.5 12 20.5c-3.542 0-6.876-.763-9.16-2.025C.555 17.213-1 15.421-1 13.5s1.555-3.713 3.84-4.975C5.124 7.263 8.458 6.5 12 6.5z" fill="none" stroke="#61DAFB" strokeWidth="1.2" /></svg>
    },
    {
        label: 'OpenCV', ring: 2, angle: 180,
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="4" r="3" fill="#5C9E47" /><circle cx="4.3" cy="17.5" r="3" fill="#E44D2E" /><circle cx="19.7" cy="17.5" r="3" fill="#3A8DC5" /><path d="M12 7c-3.5 0-6 2.5-5.5 5.5l1.5-.5c0-2.5 1.7-3.8 4-4z" fill="#5C9E47" /></svg>
    },
    {
        label: 'PostgreSQL', ring: 2, angle: 240,
        svg: <svg viewBox="0 0 24 24" fill="#336791" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5v-3h2v-2h-2V9h3V7H9v9.5c0 1.38 1.12 2.5 2.5 2.5s1.5-.5 1.5-1.5z"/></svg>
    },
    {
        label: 'Docker', ring: 2, angle: 300,
        svg: <svg viewBox="0 0 24 24" fill="#2496ED" xmlns="http://www.w3.org/2000/svg"><path d="M13.98 11.08h2.09v-2.09h-2.09v2.09zm-2.61 0h2.09v-2.09h-2.09v2.09zm-2.62 0h2.09v-2.09h-2.09v2.09zm-2.61 0h2.09v-2.09H6.14v2.09zm7.84-2.61h2.09V6.38h-2.09v2.09zm-2.61 0h2.09V6.38h-2.09v2.09zm-2.62 0h2.09V6.38h-2.09v2.09zm10.74 3.65c-.29-.18-.94-.28-1.53-.16-.14-.73-.55-1.39-1.2-1.88l-.48-.36-.33.5c-.32.48-.48 1.05-.48 1.63v.27H1.54C.69 12.08 0 12.77 0 13.62c0 3.75 3.04 6.79 6.79 6.79 4.67 0 8.64-3.1 9.77-7.46.77.16 1.76.13 2.45-.48.54-.48.86-1.12.99-1.78l-1.01.43z"/></svg>
    },
]

function OrbitItem({ item, rotation }) {
    const r = item.ring === 1 ? 140 : 215
    const rad = ((item.angle + rotation) * Math.PI) / 180
    const x = Math.cos(rad) * r
    const y = Math.sin(rad) * r
    return (
        <motion.div
            className="orbit-item"
            style={{ transform: `translate(${x}px, ${y}px)` }}
            whileHover={{ scale: 1.25 }}
        >
            <div className="orbit-emoji">{item.svg}</div>
            <span className="orbit-label">{item.label}</span>
        </motion.div>
    )
}

export default function Hero({ onOpenResume }) {
    const [rotation, setRotation] = useState(0)
    const rafRef = useRef()

    useEffect(() => {
        let angle = 0
        const animate = () => {
            angle += 0.07
            setRotation(angle)
            rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafRef.current)
    }, [])

    const stats = [
        { value: 'Stage 2', label: 'UIDAI SITAA Qualifier' },
        { value: '94.82%', label: 'DenseNet CV Accuracy' },
        { value: 'R²=0.848', label: 'Turbofan RUL Score' },
        { value: '70%', label: 'KYC Review Automation' },
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
                        <span className="badge-dot" /> 
                        <span>National Finalist · UIDAI SITAA AI Cohort</span>
                    </motion.div>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="hero-name">Vignesh G A</span>
                        <br />
                        Architecting
                        <br />
                        <span className="text-gradient">Explainable AI</span>
                        {' & '}
                        <span style={{ color: '#b47aff' }}>Intelligent Systems</span>
                    </motion.h1>

                    <motion.p
                        className="hero-sub"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        B.Tech CSE at <strong>VIT-AP</strong> (8.81 CGPA) &amp; AI Minor at <strong>IIT Ropar × Masai</strong>. 
                        Specializing in <strong>Computer Vision Biometrics</strong>, <strong>Explainable AI (XAI)</strong>, and <strong>High-Throughput Data Pipelines</strong>.
                    </motion.p>

                    <motion.div
                        className="typewriter-wrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Terminal size={16} className="text-neon" />
                        <span className="tw-prefix">sys.active_model: </span>
                        <TypeAnimation
                            sequence={[
                                'Contactless Biometrics (PyTorch/U²-Net)', 2200,
                                'Explainable RUL Prediction (SHAP/BiLSTM)', 2200,
                                'Multimodal Storytelling (FLUX.1/Sarvam)', 2200,
                                'Real-Time ETL (Kafka/Celery/Postgres)', 2200,
                                'DenseNet Facial Vision (94.8% Acc)', 2200,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="tw-text"
                        />
                        <span className="tw-cursor">_</span>
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
                            <span>Explore Projects</span>
                            <ArrowRight size={16} />
                        </motion.button>
                        
                        <motion.button
                            className="btn-ghost"
                            onClick={onOpenResume}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FileText size={16} className="text-neon" />
                            <span>View ATS Resume</span>
                        </motion.button>
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
                            <Sparkles size={20} className="text-neon" style={{ marginBottom: '2px' }} />
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
