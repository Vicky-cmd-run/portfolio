import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Projects.css'

const PROJECTS = [
    {
        id: 'blackbox',
        emoji: '🔓',
        title: 'Unlocking the Black Box',
        subtitle: 'Explainable RUL Prediction',
        tags: [{ label: 'Explainable AI', cls: 'ai' }, { label: 'Deep Learning', cls: 'ml' }],
        desc: 'A hybrid CNN-Transformer-BiLSTM model for Remaining Useful Life (RUL) prediction of aircraft engines using the NASA C-MAPSS dataset. Integrated SHAP and Integrated Gradients for full interpretability.',
        tech: ['Python', 'TensorFlow', 'Transformers', 'BiLSTM', 'SHAP'],
        metrics: [
            { label: 'R² Score', value: '0.848', pct: 84.8, color: '--neon' },
            { label: 'Health State Acc.', value: '95%', pct: 95, color: '--neon' },
        ],
        chips: ['RMSE: 14.60', 'MAE: 12.09'],
        glowClass: 'glow-blue',
        extra: 'shap',
    },
    {
        id: 'exprai',
        emoji: '😶',
        title: 'ExprAI',
        subtitle: 'Face Emotion Recognition',
        tags: [{ label: 'Computer Vision', cls: 'cv' }, { label: 'DenseNet', cls: 'ml' }],
        desc: 'Trained a DenseNet-based face emotion recognition model on the CK+ dataset. Implemented confidence-based predictions for recognizing subtle emotions like contempt and fear.',
        tech: ['Python', 'TensorFlow', 'Keras', 'DenseNet', 'OpenCV'],
        ring: { value: 94.82, label: 'Test Accuracy', details: [['Training', '98.88%'], ['Baseline Beat', '+7-10%'], ['Dataset', 'CK+']] },
        glowClass: 'glow-purple',
        extra: 'scan',
    },
    {
        id: 'mythra',
        emoji: '📖',
        title: 'Mythra',
        subtitle: 'Smart Cultural Storyteller',
        tags: [{ label: 'Generative AI', cls: 'gen' }, { label: 'Full-Stack', cls: 'web' }],
        desc: 'A web-based multi-modal AI interface where single-line text prompts translate into 10-14 scene illustrated stories. Orchestrates LLM, diffusion models, and Neural TTS.',
        tech: ['LLM', 'Diffusion Models', 'Neural TTS', 'React'],
        glowClass: 'glow-pink',
        extra: 'story',
    },
    {
        id: 'datasculpt',
        emoji: '📊',
        title: 'DataSculpt Analytics',
        subtitle: 'Streamlit Application',
        tags: [{ label: 'Data Analytics', cls: 'data' }, { label: 'Streamlit', cls: 'web' }],
        desc: 'A Streamlit app analyzing 20+ user activity logs, delivering insights into average daily time spent on social platforms. Visualized complex engagement trends with interactive charts.',
        tech: ['Python', 'Streamlit', 'Pandas'],
        glowClass: 'glow-green',
        extra: 'bar',
    },
]

function SHAPViz() {
    const bars = [
        { label: 'Sensor 11', pct: 92 },
        { label: 'Sensor 14', pct: 78 },
        { label: 'Sensor 9', pct: 65 },
        { label: 'Sensor 7', pct: 51 },
    ]
    return (
        <div className="shap-viz">
            <div className="shap-title">SHAP Feature Importance</div>
            {bars.map(b => (
                <div key={b.label} className="shap-row">
                    <span>{b.label}</span>
                    <div className="shap-track">
                        <motion.div
                            className="shap-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${b.pct}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                        />
                    </div>
                    <span className="shap-val">{(b.pct / 100).toFixed(2)}</span>
                </div>
            ))}
        </div>
    )
}

function ScanOverlay() {
    return (
        <div className="scan-container">
            <div className="scan-grid">
                {[
                    [20, 30], [20, 70], [45, 50], [65, 35], [65, 65], [80, 50]
                ].map(([t, l], i) => (
                    <div key={i} className="scan-dot" style={{ top: `${t}%`, left: `${l}%` }} />
                ))}
            </div>
            <motion.div
                className="scan-line"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <div className="scan-reveal">
                <span>DenseNet201</span><span>OpenCV</span><span>Keras</span>
            </div>
        </div>
    )
}

function StoryLoader() {
    const [progress, setProgress] = useState(0)
    const [stage, setStage] = useState(0)
    const stages = ['Narrative', 'Prompts', 'Images', 'Audio']

    useEffect(() => {
        const id = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { setProgress(0); setStage(0); return 0; }
                const np = p + 0.5
                setStage(Math.floor((np / 100) * 4))
                return np
            })
        }, 150)
        return () => clearInterval(id)
    }, [])

    return (
        <div className="story-loader">
            <div className="story-prompt glass">
                <span>✏️</span> "A warrior journeys through ancient temples..."
            </div>
            <div className="story-arrow">↓ Generating</div>
            <div className="story-track">
                <motion.div className="story-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="story-stages">
                {stages.map((s, i) => (
                    <span key={s} className={`sstage ${i <= stage ? 'active' : ''}`}>{s}</span>
                ))}
            </div>
            <div className="story-time">⏱ ~30-40s generation time</div>
        </div>
    )
}

function BarChart() {
    const bars = [60, 80, 45, 90, 70, 40, 55]
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return (
        <div className="bar-chart">
            {bars.map((h, i) => (
                <div key={i} className="bar-col">
                    <motion.div
                        className="bar-fill"
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                    <span>{days[i]}</span>
                </div>
            ))}
        </div>
    )
}

function RingChart({ pct, label, details }) {
    const circ = 314
    const dash = circ - (circ * pct) / 100
    return (
        <div className="ring-wrap">
            <div className="ring-svg-wrap">
                <svg viewBox="0 0 120 120" className="ring-svg">
                    <defs>
                        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00F2FF" />
                            <stop offset="100%" stopColor="#7000FF" />
                        </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="50" className="ring-bg" />
                    <motion.circle
                        cx="60" cy="60" r="50"
                        className="ring-fill"
                        style={{ stroke: 'url(#ringGrad)' }}
                        initial={{ strokeDashoffset: circ }}
                        animate={{ strokeDashoffset: dash }}
                        transition={{ duration: 1.5 }}
                    />
                </svg>
                <div className="ring-center">
                    <span className="ring-val">{pct}%</span>
                    <span className="ring-lbl">{label}</span>
                </div>
            </div>
            <div className="ring-details">
                {details.map(([k, v]) => (
                    <div key={k} className="ring-detail-item">
                        <span>{k}</span><strong>{v}</strong>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ProjectCard({ project, index }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            ref={ref}
            className={`proj-card glass-neon ${hovered ? 'hovered' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={`card-glow ${project.glowClass}`} />
            <div className="proj-header">
                <div className="proj-tags">
                    {project.tags.map(t => (
                        <span key={t.label} className={`proj-tag ${t.cls}`}>{t.label}</span>
                    ))}
                </div>
                <div className="proj-live">
                    <span className="status-dot" /> Live
                </div>
            </div>
            <h3 className="proj-title">{project.emoji} {project.title}</h3>
            <p className="proj-subtitle">{project.subtitle}</p>

            {/* EXTRA VISUALS */}
            <AnimatePresence>
                {project.extra === 'shap' && <SHAPViz />}
                {project.extra === 'scan' && hovered && <ScanOverlay />}
                {project.extra === 'scan' && project.ring && (
                    <RingChart pct={project.ring.value} label={project.ring.label} details={project.ring.details} />
                )}
                {project.extra === 'story' && <StoryLoader />}
                {project.extra === 'bar' && <BarChart />}
            </AnimatePresence>

            {/* Metric bars */}
            {project.metrics && (
                <div className="proj-metrics">
                    {project.metrics.map(m => (
                        <div key={m.label} className="metric-row-item">
                            <div className="metric-meta">
                                <span>{m.label}</span>
                                <span className="text-neon">{m.value}</span>
                            </div>
                            <div className="metric-bar">
                                <motion.div
                                    className="metric-fill"
                                    style={{ background: 'linear-gradient(90deg, var(--neon), var(--purple))' }}
                                    initial={{ width: 0 }}
                                    animate={inView ? { width: `${m.pct}%` } : {}}
                                    transition={{ duration: 1, delay: 0.3 }}
                                />
                            </div>
                        </div>
                    ))}
                    {project.chips && (
                        <div className="metric-chips">
                            {project.chips.map(c => <span key={c} className="mchip">{c}</span>)}
                        </div>
                    )}
                </div>
            )}

            <p className="proj-desc">{project.desc}</p>
            <div className="proj-tech">
                {project.tech.map(t => <span key={t}>{t}</span>)}
            </div>
            <div className="proj-actions">
                <motion.a
                    href="https://github.com/vicky-cmd-run"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost proj-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    View Code →
                </motion.a>
            </div>
        </motion.div>
    )
}

export default function Projects() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    return (
        <section id="projects">
            <div className="container">
                <motion.div
                    ref={ref}
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">// projects.load()</span>
                    <h2 className="section-title">Project Showcases</h2>
                    <p className="section-desc">Interactive demos of my key AI/ML and full-stack projects</p>
                </motion.div>
                <div className="projects-grid">
                    {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
                </div>
            </div>
        </section>
    )
}
