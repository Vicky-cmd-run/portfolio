import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
    Sparkles, ShieldCheck, Eye, Activity, BookOpen, Layers, 
    CheckCircle, Play, Sliders, Cpu, ArrowUpRight, Github 
} from 'lucide-react'
import './Projects.css'

const PROJECTS = [
    {
        id: 'biometric',
        emoji: '🖐️',
        title: 'Contactless Biometric AI Suite',
        subtitle: 'UIDAI SITAA AI Innovation Cohort (Stage 2 Qualifier)',
        role: 'Team Lead',
        tags: [{ label: 'National Finalist', cls: 'gen' }, { label: 'Computer Vision', cls: 'cv' }, { label: 'PyTorch', cls: 'ai' }],
        desc: 'Contactless fingerprint quality assessment, 3D presentation attack liveness detection, and biometric verification pipeline combining YOLO for hand detection, U²-Net for finger segmentation, and Zero-DCE/CLAHE illumination enhancement.',
        tech: ['Python', 'PyTorch', 'YOLO', 'OpenCV', 'U²-Net', 'MediaPipe', 'Zero-DCE'],
        metrics: [
            { label: 'Liveness Detection Acc.', value: '97.4%', pct: 97.4 },
            { label: 'Segmentation IoU', value: '0.92', pct: 92 },
        ],
        chips: ['UIDAI SITAA Stage 2', 'EER Evaluated', 'Zero-DCE Enhancement'],
        glowClass: 'glow-blue',
        extra: 'biometric',
    },
    {
        id: 'blackbox',
        emoji: '🔓',
        title: 'Unlocking the Black Box',
        subtitle: 'Explainable RUL Prediction (NASA C-MAPSS)',
        role: 'Lead Researcher',
        tags: [{ label: 'Explainable AI (XAI)', cls: 'ai' }, { label: 'Deep Learning', cls: 'ml' }, { label: 'Time-Series', cls: 'data' }],
        desc: 'A hybrid CNN–Transformer–BiLSTM model for Remaining Useful Life (RUL) prediction of aircraft turbofan engines using the NASA C-MAPSS dataset. Integrated SHAP and Integrated Gradients for sensor-level and temporal feature attributions.',
        tech: ['Python', 'TensorFlow', 'Transformers', 'BiLSTM', 'SHAP', 'Integrated Gradients'],
        metrics: [
            { label: 'R² Regression Score', value: '0.848', pct: 84.8 },
            { label: 'Health State Acc.', value: '95%', pct: 95 },
        ],
        chips: ['RMSE: 14.60', 'MAE: 12.09', '21 Sensor Channels'],
        glowClass: 'glow-blue',
        extra: 'shap',
    },
    {
        id: 'mythra',
        emoji: '📖',
        title: 'MYTHRA: Multimodal Storyteller',
        subtitle: 'Autonomous Multimodal Generative Pipeline',
        role: 'System Architect',
        tags: [{ label: 'Generative AI', cls: 'gen' }, { label: 'LangChain', cls: 'ai' }, { label: 'FLUX.1', cls: 'ml' }],
        desc: 'A multimodal generation engine coordinating LLMs for narrative structuring, FLUX.1 diffusion for scene imagery, and Sarvam AI neural TTS for regional voiceover synthesis under strict JSON output schemas.',
        tech: ['Python', 'LangChain', 'FLUX.1', 'Sarvam AI TTS', 'Streamlit', 'React'],
        metrics: [
            { label: 'Generation Latency', value: '<40s', pct: 88 },
            { label: 'Visual Consistency', value: '100% Fixed Tokens', pct: 100 },
        ],
        chips: ['10-14 Storyboard Scenes', 'Regional Neural Audio', 'Async Pipelines'],
        glowClass: 'glow-pink',
        extra: 'story',
    },
    {
        id: 'exprai',
        emoji: '😶',
        title: 'ExprAI: Micro-Expression Vision',
        subtitle: 'DenseNet-201 Facial Emotion Recognition',
        role: 'Lead Developer',
        tags: [{ label: 'Computer Vision', cls: 'cv' }, { label: 'DenseNet-201', cls: 'ml' }],
        desc: 'Trained a DenseNet-201 convolutional network on the CK+ benchmark with OpenCV spatial alignment and adaptive histogram equalization. Confidence-weighted predictions improve recognition of subtle micro-expressions.',
        tech: ['Python', 'TensorFlow', 'Keras', 'DenseNet-201', 'OpenCV', 'scikit-learn'],
        ring: { value: 94.82, label: 'Test Accuracy', details: [['Training Acc', '98.88%'], ['Baseline Delta', '+7-10%'], ['Dataset', 'CK+ (7 classes)']] },
        glowClass: 'glow-purple',
        extra: 'scan',
    },
    {
        id: 'nexus',
        emoji: '⚡',
        title: 'NEXUS: Financial Reconciliation',
        subtitle: 'Automated Multi-Source Ledger Audit Platform',
        role: 'Full-Stack Developer',
        tags: [{ label: 'FastAPI', cls: 'web' }, { label: 'PostgreSQL', cls: 'data' }, { label: 'Redis LRU', cls: 'ai' }],
        desc: 'Engineered automated invoice matching algorithms processing 500+ line-item records with 95% accuracy, reducing manual audit turnaround by 80%. Built FastAPI REST services with Redis LRU caching for sub-second queries.',
        tech: ['FastAPI', 'React.js', 'PostgreSQL', 'Docker', 'Redis', 'REST APIs'],
        metrics: [
            { label: 'Turnaround Reduction', value: '80%', pct: 80 },
            { label: 'Rule Matching Accuracy', value: '95%', pct: 95 },
        ],
        chips: ['500+ Records', 'Redis LRU Caching', 'Sub-second Latency'],
        glowClass: 'glow-green',
        extra: 'nexus',
    },
]

/* 1. BIOMETRIC SCANNER SIMULATOR */
function BiometricViz() {
    const [scanned, setScanned] = useState(false)

    return (
        <div className="biometric-viz glass">
            <div className="bio-header">
                <span className="bio-tag">● Live U²-Net &amp; MediaPipe Pipeline</span>
                <span className="bio-res text-neon">{scanned ? 'VERIFIED REAL (0.012 EER)' : 'Awaiting Gesture'}</span>
            </div>
            <div className="bio-screen" onClick={() => setScanned(!scanned)}>
                <div className="bio-hand-mesh">
                    {[
                        [25, 30], [20, 48], [22, 66], [32, 80], [55, 20], [60, 50], [75, 48], [88, 50]
                    ].map(([t, l], i) => (
                        <motion.div 
                            key={i} 
                            className="bio-landmark"
                            style={{ top: `${t}%`, left: `${l}%` }}
                            animate={{ scale: scanned ? [1, 1.4, 1] : 1 }}
                            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                        />
                    ))}
                    <div className="bio-bbox" />
                    <div className="bio-u2net-mask" />
                </div>
                <div className="bio-overlay-text">
                    {scanned ? '✓ Liveness Score: 98.4% | Hand BBox: Confirmed' : 'Click to trigger 3D liveness scan'}
                </div>
            </div>
            <div className="bio-metrics-footer">
                <span>Hand: YOLOv8</span>
                <span>Segment: U²-Net</span>
                <span>Liveness: 3D MediaPipe</span>
            </div>
        </div>
    )
}

/* 2. SHAP VISUALIZER */
function SHAPViz() {
    const [selectedSensor, setSelectedSensor] = useState(null)
    const bars = [
        { label: 'Sensor 11 (NF Corrected Speed)', pct: 94, impact: '+0.42 RUL' },
        { label: 'Sensor 14 (Core Speed)', pct: 81, impact: '+0.33 RUL' },
        { label: 'Sensor 9 (Total Temp)', pct: 67, impact: '-0.25 RUL' },
        { label: 'Sensor 4 (Burner Pressure)', pct: 54, impact: '-0.19 RUL' },
    ]
    return (
        <div className="shap-viz glass">
            <div className="shap-title-bar">
                <span>SHAP Feature Attribution (NASA C-MAPSS)</span>
                <span className="shap-hint">Click sensor to inspect</span>
            </div>
            {bars.map(b => (
                <div 
                    key={b.label} 
                    className={`shap-row ${selectedSensor === b.label ? 'active' : ''}`}
                    onClick={() => setSelectedSensor(selectedSensor === b.label ? null : b.label)}
                >
                    <span className="shap-name">{b.label}</span>
                    <div className="shap-track">
                        <motion.div
                            className="shap-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${b.pct}%` }}
                            transition={{ duration: 1, delay: 0.1 }}
                        />
                    </div>
                    <span className="shap-val text-neon">{(b.pct / 100).toFixed(2)}</span>
                </div>
            ))}
            {selectedSensor && (
                <div className="shap-drilldown">
                    Attribution Breakdown: <strong>{selectedSensor}</strong> accounts for critical temporal gradient dynamics in the last 30 engine degradation cycles.
                </div>
            )}
        </div>
    )
}

/* 3. MULTIMODAL STORYBOARD VISUALIZER */
function StoryLoader() {
    const [progress, setProgress] = useState(0)
    const [stage, setStage] = useState(0)
    const stages = ['LLM Narrative', 'FLUX.1 Prompts', 'Scene Synthesis', 'Sarvam AI TTS']

    useEffect(() => {
        const id = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { setProgress(0); setStage(0); return 0; }
                const np = p + 1.2
                setStage(Math.floor((np / 100) * 4))
                return np
            })
        }, 120)
        return () => clearInterval(id)
    }, [])

    return (
        <div className="story-loader glass">
            <div className="story-prompt glass">
                <span className="text-neon">Prompt &gt;</span> "Ancient temple submerged under cyberpunk neon rain..."
            </div>
            <div className="story-track">
                <motion.div className="story-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="story-stages">
                {stages.map((s, i) => (
                    <span key={s} className={`sstage ${i <= stage ? 'active' : ''}`}>
                        {i < stage ? '✓ ' : i === stage ? '⚡ ' : '○ '}{s}
                    </span>
                ))}
            </div>
            <div className="story-time">⚡ Total Multimodal Synthesis: 34.2s (Asynchronous API Gather)</div>
        </div>
    )
}

/* 4. DENSENET SCAN OVERLAY & RADAR */
function RingChart({ pct, label, details }) {
    const circ = 314
    const dash = circ - (circ * pct) / 100
    return (
        <div className="ring-wrap glass">
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
                        <span>{k}</span><strong className="text-neon">{v}</strong>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* 5. NEXUS RECONCILIATION SIMULATOR */
function NexusViz() {
    return (
        <div className="nexus-viz glass">
            <div className="nexus-header">
                <span>FastAPI + Redis Ledger Stream</span>
                <span className="nexus-status text-neon">● 500+ Items Synced</span>
            </div>
            <div className="nexus-grid">
                <div className="nexus-col">
                    <span className="ncol-title">Invoice Records</span>
                    <div className="ncol-item">INV-9821 • $4,250.00 ✓</div>
                    <div className="ncol-item">INV-9822 • $1,890.50 ✓</div>
                </div>
                <div className="nexus-arrow">&harr;</div>
                <div className="nexus-col">
                    <span className="ncol-title">Banking Ledger</span>
                    <div className="ncol-item">TXN-4012 • $4,250.00 ✓</div>
                    <div className="ncol-item">TXN-4013 • $1,890.50 ✓</div>
                </div>
            </div>
            <div className="nexus-footer">
                <span>Automated Match: <strong>95%</strong></span>
                <span>Audit Latency: <strong>&lt;0.8s (Redis Cache)</strong></span>
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
                <div className="proj-role-badge">
                    <span>{project.role}</span>
                </div>
            </div>

            <h3 className="proj-title">{project.emoji} {project.title}</h3>
            <p className="proj-subtitle">{project.subtitle}</p>

            {/* DYNAMIC INTERACTIVE VISUALIZATIONS */}
            <div className="proj-interactive-wrapper">
                {project.extra === 'biometric' && <BiometricViz />}
                {project.extra === 'shap' && <SHAPViz />}
                {project.extra === 'story' && <StoryLoader />}
                {project.extra === 'scan' && project.ring && (
                    <RingChart pct={project.ring.value} label={project.ring.label} details={project.ring.details} />
                )}
                {project.extra === 'nexus' && <NexusViz />}
            </div>

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
                    <Github size={15} />
                    <span>View Repository &rarr;</span>
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
                    <span className="section-tag">// neural_architectures.load()</span>
                    <h2 className="section-title">Technical Projects</h2>
                    <p className="section-desc">Interactive showcases of national-qualifier biometric vision, explainable deep learning, and multimodal pipelines.</p>
                </motion.div>
                
                <div className="projects-grid">
                    {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
                </div>
            </div>
        </section>
    )
}
