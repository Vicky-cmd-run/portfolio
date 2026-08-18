import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Terminal, Cpu, CheckCircle2, Play, Flame } from 'lucide-react'
import './Blog.css'

const POSTS = {
    biometric: {
        tab: '🖐️ UIDAI Biometrics',
        filename: 'contactless_biometrics_u2net.py',
        title: 'Engineering Contactless Biometrics for UIDAI SITAA Challenge',
        meta: '📅 2026 · Computer Vision, Anti-Spoofing, PyTorch',
        content: [
            { type: 'h4', text: 'The Core Challenge' },
            { type: 'p', text: 'Contactless fingerprinting introduces severe variability in ambient illumination, background clutter, and 2D presentation attack vulnerability compared to traditional flatbed capacitive scanners.' },
            {
                type: 'code', lang: 'Python', file: 'vision_pipeline.py', code: `<span class="kw">class</span> <span class="cn">BiometricPipeline</span>:
    <span class="kw">def</span> __init__(self):
        self.yolo = YOLO(<span class="str">"yolov8n-hand.pt"</span>)
        self.u2net = <span class="cn">U2NET</span>(in_ch=3, out_ch=1) <span class="cm"># Finger segmentation</span>
        self.liveness_net = <span class="cn">LivenessCNN</span>()  <span class="cm"># 3D Presentation Attack</span>
        
    <span class="kw">def</span> extract_minutiae(self, frame):
        bbox = self.yolo(frame)
        segmented_finger = self.u2net(frame[bbox])
        enhanced = ZeroDCE.enhance(segmented_finger) <span class="cm"># Illumination</span>
        <span class="kw">return</span> MinutiaeExtractor.compute_eer(enhanced)` },
            { type: 'h4', text: 'Key Innovations & Results' },
            { type: 'ul', items: [
                'Combined YOLO for region proposal with U²-Net to achieve an IoU of 0.92 on finger boundary delineation.',
                'Utilized Zero-DCE and CLAHE normalization to ensure robust ridge contrast under harsh direct sunlight and extreme low-light environments.',
                'Implemented 3D spatial landmark tracking via MediaPipe + CNN classifiers to prevent presentation spoof attacks, qualifying for Stage 2 of the national UIDAI challenge.'
            ]},
        ],
        metrics: { label: 'Biometric Metrics', items: [['IoU Segmentation', '0.92', 92], ['Liveness Accuracy', '97.4%', 97.4], ['EER Baseline', '0.012', null]] },
    },
    blackbox: {
        tab: '🔓 NASA C-MAPSS (XAI)',
        filename: 'turbofan_rul_xai.py',
        title: 'Explainable AI: NASA C-MAPSS Turbofan Degradation',
        meta: '📅 2025 · Explainable AI, Predictive Maintenance',
        content: [
            { type: 'h4', text: 'Problem Formulation' },
            { type: 'p', text: 'Predicting Remaining Useful Life (RUL) on complex multivariate turbofan telemetry across 21 noisy sensors while providing human-interpretable explanations of physical degradation.' },
            {
                type: 'code', lang: 'Python', file: 'hybrid_xai_model.py', code: `<span class="kw">class</span> <span class="cn">HybridRULModel</span>(nn.Module):
    <span class="kw">def</span> __init__(self):
        self.cnn = <span class="cn">CNNEncoder</span>(filters=[64, 128, 256])
        self.transformer = <span class="cn">TransformerBlock</span>(d_model=256, heads=8)
        self.bilstm = nn.BiLSTM(256, 128, bidirectional=<span class="kw">True</span>)
        
    <span class="kw">def</span> forward(self, x):
        spatial = self.cnn(x)
        temporal_ctx = self.transformer(spatial)
        <span class="kw">return</span> self.bilstm(temporal_ctx)` },
            { type: 'h4', text: 'Explainability & Insights' },
            { type: 'ul', items: [
                'SHAP attributions identified Sensor 11 (NF corrected fan speed) and Sensor 14 as primary drivers of sudden degradation.',
                'Integrated Gradients revealed that the model places 65% of its decision weight on the final 30 run-to-failure cycles.',
                'Achieved R² = 0.848 and RMSE of 14.60, outperforming conventional LSTM baselines.'
            ]},
        ],
        metrics: { label: 'Model Performance', items: [['R² Score', '0.848', 84.8], ['Health State Acc.', '95%', 95], ['RMSE', '14.60', null], ['MAE', '12.09', null]] },
    },
    mythra: {
        tab: '📖 Multimodal GenAI',
        filename: 'multimodal_orchestration.py',
        title: 'MYTHRA: Asynchronous Multimodal Story Generation',
        meta: '📅 2025 · Generative AI, Latency Optimization',
        content: [
            { type: 'h4', text: 'Architecture & Visual Consistency' },
            { type: 'p', text: 'Orchestrated a 3-stage generative pipeline: LLMs for narrative scene breakdowns &rarr; FLUX.1 diffusion for scene rendering &rarr; Sarvam AI Neural TTS for regional voice synthesis.' },
            {
                type: 'code', lang: 'Python', file: 'async_pipeline.py', code: `<span class="kw">async def</span> generate_story(prompt: str):
    narrative_json = <span class="kw">await</span> llm.generate_structured_scenes(prompt)
    <span class="cm"># Concurrent diffusion generation with fixed style embeddings</span>
    image_tasks = [
        flux_diffusion.generate(scene.prompt, style_token=FIXED_STYLE)
        <span class="kw">for</span> scene <span class="kw">in</span> narrative_json.scenes
    ]
    images = <span class="kw">await</span> asyncio.gather(*image_tasks)
    audio = <span class="kw">await</span> sarvam_tts.synthesize(narrative_json.full_script)
    <span class="kw">return</span> Storyboard(images, audio) <span class="cm"># Total: &lt; 40s</span>` },
            { type: 'h4', text: 'Key Takeaways' },
            { type: 'ul', items: [
                'Fixed style token embeddings solved character and scene visual divergence across 10-14 sequential story panels.',
                'Async concurrent API scheduling reduced end-to-end generation latency from 110s down to <40s.',
            ]},
        ],
        metrics: { label: 'Generation Telemetry', items: [['Scene Count', '10-14', null], ['Generation Latency', '<40s', null], ['AI Endpoints', '3 Services', null]] },
    },
    yellowsense: {
        tab: '⚡ Distributed ETL',
        filename: 'realtime_kafka_pipeline.py',
        title: 'Yellowsense: Near Real-Time Kafka & Celery Ingestion',
        meta: '📅 2026 · Data Engineering, Distributed Systems',
        content: [
            { type: 'h4', text: 'High-Volume Financial Stream' },
            { type: 'p', text: 'Ingesting, cleaning, and synchronizing multi-source banking APIs into normalized PostgreSQL analytical databases to power 6 XGBoost scoring models in real-time.' },
            {
                type: 'code', lang: 'Python', file: 'kafka_consumer.py', code: `@app.task(bind=<span class="kw">True</span>, max_retries=3)
<span class="kw">def</span> process_banking_stream(self, payload):
    clean_data = FinancialTransformer.normalize(payload)
    cached = redis_client.get(clean_data.account_id)
    <span class="kw">if not</span> cached:
        postgres_db.upsert_transaction(clean_data)
        redis_client.setex(clean_data.account_id, 3600, clean_data.hash)
    <span class="kw">return</span> xgboost_model.predict_churn_risk(clean_data)` },
            { type: 'h4', text: 'Production Outcomes' },
            { type: 'ul', items: [
                'Sub-second analytical queries achieved via Redis LRU cache buffering.',
                'Automated document OCR + LangChain pipeline cut manual KYC audit turnaround time by 70%.',
            ]},
        ],
        metrics: { label: 'Data Stats', items: [['KYC Automation', '70%', 70], ['Supervised ML Models', '6 Deployed', null], ['Pipeline Latency', '<1.2s', null]] },
    },
}

function SimLog({ postId }) {
    const [lines, setLines] = useState([])
    const [running, setRunning] = useState(false)

    const LOGS = {
        biometric: [
            'Loading YOLOv8 hand detector weights...',
            'Evaluating U²-Net segmentation mask (IoU: 0.92)...',
            'Applying Zero-DCE illumination enhancement...',
            'Computing 3D spatial liveness on 21 landmarks...',
            'Calculating Minutiae EER: 0.012 ✓',
            'UIDAI SITAA Stage 2 Validation: PASS ✓'
        ],
        blackbox: [
            'Initializing CNN-Transformer-BiLSTM model...',
            'Loading NASA C-MAPSS 21-sensor test suite...',
            'Calculating SHAP attribution values for Sensor 11...',
            'Running Integrated Gradients temporal attribution...',
            'R² Score: 0.848 | RMSE: 14.60 ✓',
            'Model interpretability report generated ✓'
        ],
        mythra: [
            'Prompt received: "Ancient temple in cyberpunk neon rain"',
            'LLM parsed structured JSON (14 scenes)...',
            'Dispatching asynchronous FLUX.1 diffusion workers...',
            'Sarvam AI Regional Neural TTS synthesized...',
            'Storyboard rendered in 34.2s ✓'
        ],
        yellowsense: [
            'Connecting to Kafka banking broker stream...',
            'Ingesting multi-source financial payload...',
            'Celery worker executing OCR extraction...',
            'Redis cache hit: latency 42ms...',
            'PostgreSQL normalized upsert complete ✓',
            'XGBoost scoring executed in 12ms ✓'
        ],
    }

    const runSim = () => {
        if (running) return
        setLines([])
        setRunning(true)
        const msgs = LOGS[postId] || []
        msgs.forEach((msg, i) => {
            setTimeout(() => {
                setLines(prev => [...prev, msg])
                if (i === msgs.length - 1) setRunning(false)
            }, i * 350)
        })
    }

    return (
        <div className="sim-section">
            <button className="run-sim-btn" onClick={runSim} disabled={running}>
                {running ? '⏳ Executing Pipeline...' : '▶ Execute Live Pipeline Simulation'}
            </button>
            {lines.length > 0 && (
                <div className="sim-log">
                    {lines.map((l, i) => (
                        <motion.div key={i} className="sim-line" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                            <span className="sim-prompt">$</span> {l}
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}

function MetricsSidebar({ metrics }) {
    if (!metrics) return null
    return (
        <div className="blog-sidebar glass-neon">
            <div className="sidebar-title">{metrics.label}</div>
            {metrics.items.map(([k, v, pct]) => (
                <div key={k} className="sidebar-metric">
                    <div className="sm-header">
                        <span>{k}</span>
                        <strong className="text-neon">{v}</strong>
                    </div>
                    {pct !== null && (
                        <div className="metric-bar">
                            <motion.div
                                className="metric-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(pct, 100)}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default function Blog() {
    const [active, setActive] = useState('biometric')
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    const post = POSTS[active]

    return (
        <section id="blog">
            <div className="container">
                <motion.div
                    ref={ref}
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">// engineering_logs.py --verbose</span>
                    <h2 className="section-title">Research &amp; Engineering Logs</h2>
                    <p className="section-desc">Deep-dive technical post-mortems on biometric vision, explainable AI, multimodal architectures, and distributed data systems.</p>
                </motion.div>

                <div className="blog-tabs">
                    {Object.entries(POSTS).map(([id, p]) => (
                        <button
                            key={id}
                            className={`blog-tab ${active === id ? 'active' : ''}`}
                            onClick={() => setActive(id)}
                        >
                            {p.tab}
                        </button>
                    ))}
                </div>

                <div className="blog-layout">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            className="blog-post glass-neon"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="post-ide-header">
                                <div className="ide-dots"><span /><span /><span /></div>
                                <span className="ide-filename">{post.filename}</span>
                            </div>
                            <div className="post-body">
                                <h3>{post.title}</h3>
                                <p className="post-meta">{post.meta}</p>
                                {post.content.map((block, i) => {
                                    if (block.type === 'h4') return <h4 key={i}>{block.text}</h4>
                                    if (block.type === 'p') return <p key={i}>{block.text}</p>
                                    if (block.type === 'ul') return (
                                        <ul key={i} className="post-list">
                                            {block.items.map((item, j) => <li key={j}>{item}</li>)}
                                        </ul>
                                    )
                                    if (block.type === 'code') return (
                                        <div key={i} className="code-block">
                                            <div className="code-header">
                                                <span className="lang-tag">{block.lang}</span>
                                                <span>{block.file}</span>
                                            </div>
                                            <pre><code dangerouslySetInnerHTML={{ __html: block.code }} /></pre>
                                        </div>
                                    )
                                    return null
                                })}
                                <SimLog postId={active} />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <MetricsSidebar metrics={post.metrics} />
                </div>
            </div>
        </section>
    )
}
