import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Blog.css'

const POSTS = {
    blackbox: {
        tab: '🔓 Unlocking the Black Box',
        filename: 'unlocking_the_black_box.py',
        title: 'Post-Mortem: Unlocking the Black Box',
        meta: '📅 2025 · Explainable AI, Predictive Maintenance',
        content: [
            { type: 'h4', text: 'Problem Statement' },
            { type: 'p', text: 'Traditional black-box models offered high accuracy but zero transparency. The challenge: build a model that could predict RUL of aircraft engines and explain why it made those predictions — critical in safety applications.' },
            {
                type: 'code', lang: 'Python', file: 'model_architecture.py', code: `<span class="kw">class</span> <span class="cn">HybridRULModel</span>(nn.Module):
    <span class="kw">def</span> __init__(self):
        self.cnn = <span class="cn">CNNEncoder</span>(filters=[64, 128, 256])
        self.transformer = <span class="cn">TransformerBlock</span>(d_model=256, heads=8)
        self.bilstm = nn.BiLSTM(256, 128, bidirectional=<span class="kw">True</span>)
    <span class="kw">def</span> forward(self, x, explain=<span class="kw">False</span>):
        features = self.cnn(x)
        context = self.transformer(features) <span class="cm"># Temporal attention</span>
        <span class="kw">return</span> self.bilstm(context)` },
            { type: 'h4', text: 'Key Insights' },
            { type: 'ul', items: ['SHAP revealed Sensor 11 (NF corrected fan speed) as most influential, aligning with domain knowledge.', 'Integrated Gradients showed the model prioritizes the last 30 cycles most heavily.', 'Hybrid architecture outperformed standalone CNN and LSTM baselines by 15-20% in RMSE.'] },
        ],
        metrics: { label: 'Model Performance', items: [['R² Score', '0.848', 84.8], ['Health State Acc.', '95%', 95], ['RMSE', '14.60', null], ['MAE', '12.09', null]] },
    },
    exprai: {
        tab: '😶 ExprAI',
        filename: 'exprai_postmortem.py',
        title: 'Post-Mortem: ExprAI — Face Emotion Recognition',
        meta: '📅 2025 · Computer Vision, Transfer Learning',
        content: [
            { type: 'h4', text: 'Why DenseNet?' },
            { type: 'p', text: 'After experimenting with VGG16, ResNet50, and EfficientNet, DenseNet201 emerged as the winner due to its dense connections that reuse feature maps — critical for capturing subtle micro-expressions.' },
            {
                type: 'code', lang: 'Python', file: 'training_config.py', code: `config = {
    <span class="str">"model"</span>: <span class="str">"DenseNet201"</span>,
    <span class="str">"base_lr"</span>: 1e-4,
    <span class="str">"fine_tune_lr"</span>: 1e-5,
    <span class="str">"dataset"</span>: <span class="str">"CK+"</span>, <span class="cm"># 8 emotion classes</span>
    <span class="str">"epochs"</span>: 50,
    <span class="str">"confidence_threshold"</span>: 0.7
}` },
            { type: 'h4', text: 'Results' },
            { type: 'p', text: 'Confidence-based probability predictions for low-confidence outputs (contempt, fear) boosted accuracy on those classes by 12%, achieving 94.82% overall test accuracy.' },
        ],
        metrics: { label: 'Accuracy Metrics', items: [['Test Accuracy', '94.82%', 94.82], ['Training Accuracy', '98.88%', 98.88], ['Baseline Improvement', '+7-10%', null]] },
    },
    mythra: {
        tab: '📖 Mythra',
        filename: 'mythra_architecture.md',
        title: 'Post-Mortem: Mythra — Smart Cultural Storyteller',
        meta: '📅 2025 · Generative AI, Multi-modal',
        content: [
            { type: 'h4', text: 'System Architecture' },
            { type: 'p', text: 'Mythra orchestrates 4 AI components in a pipeline: LLM for narrative, diffusion model for scene images, a prompt synthesizer, and Neural TTS for audio — all async-coordinated.' },
            {
                type: 'code', lang: 'Python', file: 'mythra_pipeline.py', code: `<span class="kw">async def</span> generate_story(prompt: str):
    narrative = <span class="kw">await</span> llm.generate(prompt, scenes=14)
    scene_prompts = <span class="kw">await</span> synthesizer.expand(narrative)
    images = <span class="kw">await</span> asyncio.gather(
        *[diffusion.generate(p, style_token=FIXED_STYLE)
          <span class="kw">for</span> p <span class="kw">in</span> scene_prompts]
    )
    <span class="kw">return</span> Story(narrative, images, <span class="kw">await</span> tts.generate(narrative))
    <span class="cm"># Total: ~30-40 seconds</span>` },
            { type: 'h4', text: 'Style Consistency' },
            { type: 'p', text: 'Fixed style tokens — learned embeddings embedded into every diffusion call — ensured visual cohesion across all 10-14 generated scenes, the hardest unsolved challenge in multi-scene generation.' },
        ],
        metrics: { label: 'Generation Stats', items: [['Scene Count', '10-14', null], ['Generation Time', '30-40s', null], ['AI Components', '4+', null]] },
    },
    datasculpt: {
        tab: '📊 DataSculpt',
        filename: 'datasculpt_analysis.py',
        title: 'Post-Mortem: DataSculpt Analytics App',
        meta: '📅 2025 · Data Analytics, Streamlit',
        content: [
            { type: 'h4', text: 'Motivation' },
            { type: 'p', text: 'Social media addiction is measurable behavior. DataSculpt was built to quantify it — analyzing 20+ user activity logs to surface hidden patterns in daily digital consumption.' },
            {
                type: 'code', lang: 'Python', file: 'data_pipeline.py', code: `<span class="kw">import</span> streamlit <span class="kw">as</span> st
<span class="kw">import</span> pandas <span class="kw">as</span> pd
df = pd.read_csv(<span class="str">"user_logs.csv"</span>, parse_dates=[<span class="str">"timestamp"</span>])
daily_usage = df.groupby([<span class="str">"user_id"</span>, <span class="str">"date"</span>])[<span class="str">"duration"</span>].sum()
peak_hours = df.groupby(<span class="str">"hour"</span>)[<span class="str">"duration"</span>].mean()
st.metric(<span class="str">"Avg Daily Usage"</span>, f<span class="str">"{daily_usage.mean():.1f} hrs"</span>)` },
        ],
        metrics: { label: 'Data Stats', items: [['User Logs Analyzed', '20+', null], ['Engagement Trend Accuracy', 'High', null]] },
    },
}

function SimLog({ postId }) {
    const [lines, setLines] = useState([])
    const [running, setRunning] = useState(false)

    const LOGS = {
        blackbox: ['Initializing CNN encoder...', 'Loading NASA C-MAPSS dataset...', 'Training epoch 1/50: loss=0.842', 'Training epoch 25/50: loss=0.312', 'Running SHAP analysis on test set...', 'R² Score: 0.848 ✓', 'RMSE: 14.60 ✓', 'Simulation complete.'],
        exprai: ['Loading DenseNet201 weights...', 'Applying transfer learning...', 'Epoch 50/50: val_acc=0.9482', 'Running confidence calibration...', 'Test Accuracy: 94.82% ✓', 'Simulation complete.'],
        mythra: ['Connecting to LLM API...', 'Generating narrative (14 scenes)...', 'Synthesizing scene prompts...', 'Generating images (async)...', 'Synthesizing TTS audio...', 'Story generated in 34.2s ✓', 'Simulation complete.'],
        datasculpt: ['Loading user_logs.csv...', 'Processing 20+ activity logs...', 'Computing daily aggregates...', 'Rendering Streamlit dashboard...', 'Analysis complete ✓'],
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
                {running ? '⏳ Running...' : '▶ Run Simulation'}
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
    const [active, setActive] = useState('blackbox')
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
                    <span className="section-tag">// training_logs.py --verbose</span>
                    <h2 className="section-title">Training Logs</h2>
                    <p className="section-desc">Deep-dive post-mortems: metrics, insights, and lessons learned</p>
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
