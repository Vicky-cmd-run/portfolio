import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
    GraduationCap, Award, Users, ShieldCheck, Mail, Phone, 
    Linkedin, Github, Globe, Sparkles, CheckCircle2 
} from 'lucide-react'
import './About.css'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}
const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}
const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

function AnimCard({ children, className, variant = fadeUp, delay = 0 }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
    return (
        <motion.div
            ref={ref}
            className={className}
            variants={variant}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    )
}

export default function About() {
    const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 })

    const skills = {
        'Programming Languages': { 
            tags: ['Python', 'SQL', 'C++', 'JavaScript', 'C', 'R'], 
            cls: 'neon' 
        },
        'Machine Learning & Deep Learning': { 
            tags: ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'OpenCV', 'Time-Series Modeling', 'Transformers', 'SHAP (XAI)', 'YOLO', 'U²-Net', 'MediaPipe'], 
            cls: 'purple' 
        },
        'Data Engineering & Web': { 
            tags: ['FastAPI', 'React.js', 'PostgreSQL', 'Redis', 'Kafka', 'Celery', 'REST APIs', 'Docker', 'Linux', 'Git', 'LangChain', 'Streamlit'], 
            cls: 'neon' 
        },
        'CS Core Foundations': { 
            tags: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'OOP', 'Computer Networks'], 
            cls: 'data' 
        },
    }

    return (
        <section id="about">
            <div className="container">
                <motion.div
                    ref={headerRef}
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">// identity_matrix.init()</span>
                    <h2 className="section-title">About Me</h2>
                    <p className="section-desc">AI Engineer bridging the gap between cutting-edge deep learning research and high-performance production systems.</p>
                </motion.div>

                <div className="about-grid">
                    {/* Profile Card */}
                    <AnimCard className="about-profile-card glass-neon" variant={fadeLeft} delay={0.1}>
                        <div className="profile-avatar">
                            <div className="avatar-glow" />
                            <div className="avatar-letters">VGA</div>
                        </div>
                        <div className="profile-info">
                            <h3>Vignesh G A</h3>
                            <p className="profile-role text-neon">AI/ML Engineer &amp; Full-Stack Developer</p>
                            <p className="profile-bio">
                                Undergraduate researcher and software engineer passionate about computer vision, explainable AI, and scalable distributed ETL pipelines.
                            </p>
                            
                            <div className="profile-links">
                                {[
                                    { href: 'mailto:vigneshgnanasekaran8@gmail.com', text: 'vigneshgnanasekaran8@gmail.com', icon: <Mail size={15} /> },
                                    { href: 'tel:+919025559798', text: '+91 9025559798', icon: <Phone size={15} /> },
                                    { href: 'https://linkedin.com/in/vignesh-ga', text: 'linkedin.com/in/vignesh-ga', icon: <Linkedin size={15} /> },
                                    { href: 'https://github.com/vicky-cmd-run', text: 'github.com/vicky-cmd-run', icon: <Github size={15} /> },
                                    { href: 'https://vigneshga.vercel.app', text: 'vigneshga.vercel.app', icon: <Globe size={15} /> },
                                ].map(({ icon, text, href }) => (
                                    <a key={href} href={href} target="_blank" rel="noreferrer" className="profile-chip glass">
                                        <span className="chip-icon">{icon}</span> {text}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </AnimCard>

                    {/* Education */}
                    <AnimCard className="edu-card glass-neon" variant={fadeRight} delay={0.2}>
                        <div className="card-label">
                            <GraduationCap size={16} className="text-neon" />
                            <span>Education &amp; Academics</span>
                        </div>
                        
                        <div className="edu-item">
                            <div className="edu-icon"><GraduationCap size={20} /></div>
                            <div className="edu-text">
                                <h4>VIT-AP University, Amaravati</h4>
                                <p>B.Tech in Computer Science and Engineering</p>
                                <div className="edu-chips">
                                    <span className="edu-chip">2023 – 2027 | Amaravati, AP</span>
                                    <span className="edu-chip gpa">CGPA: 8.81</span>
                                </div>
                            </div>
                        </div>

                        <div className="edu-item">
                            <div className="edu-icon"><Sparkles size={20} /></div>
                            <div className="edu-text">
                                <h4>IIT Ropar × Masai</h4>
                                <p>Minor in Artificial Intelligence</p>
                                <div className="edu-chips">
                                    <span className="edu-chip">2025 – 2026 | Remote</span>
                                    <span className="edu-chip gpa">Specialized AI &amp; Analytics</span>
                                </div>
                            </div>
                        </div>

                        <div className="edu-sub-grid">
                            <div className="edu-mini-badge glass">
                                <span className="emb-label">Class XII (Higher Secondary)</span>
                                <span className="emb-val">8.82 CGPA</span>
                            </div>
                            <div className="edu-mini-badge glass">
                                <span className="emb-label">Class X (Secondary School)</span>
                                <span className="emb-val">97.6%</span>
                            </div>
                        </div>
                    </AnimCard>

                    {/* Leadership & Awards */}
                    <AnimCard className="cert-card glass-neon" variant={fadeUp} delay={0.3}>
                        <div className="card-label">
                            <Award size={16} className="text-neon" />
                            <span>Honors &amp; Leadership</span>
                        </div>
                        
                        <div className="honors-list">
                            <div className="cert-item">
                                <span className="cert-icon"><Award size={20} className="text-neon" /></span>
                                <div>
                                    <p className="cert-name">UIDAI SITAA National Biometric Challenge</p>
                                    <p className="cert-issuer">Qualified for Stage 2 in the national biometric challenge organized by UIDAI</p>
                                </div>
                                <span className="cert-badge elite">National Finalist</span>
                            </div>

                            <div className="cert-item">
                                <span className="cert-icon"><Users size={20} className="text-purple" /></span>
                                <div>
                                    <p className="cert-name">Student Project Mentor (AI/ML)</p>
                                    <p className="cert-issuer">Supervised junior undergraduate teams on data preprocessing, model architectures &amp; debugging</p>
                                </div>
                                <span className="cert-badge">Mentor</span>
                            </div>

                            <div className="cert-item">
                                <span className="cert-icon"><CheckCircle2 size={20} style={{ color: '#00ff94' }} /></span>
                                <div>
                                    <p className="cert-name">NPTEL Elite Certification</p>
                                    <p className="cert-issuer">Deep Learning · National Programme on Technology Enhanced Learning (IITs)</p>
                                </div>
                                <span className="cert-badge elite">Elite</span>
                            </div>

                            <div className="cert-item">
                                <span className="cert-icon"><ShieldCheck size={20} style={{ color: '#4285F4' }} /></span>
                                <div>
                                    <p className="cert-name">Google Cloud Computing Foundations</p>
                                    <p className="cert-issuer">Google Cloud Platform Certified</p>
                                </div>
                                <span className="cert-badge">GCP</span>
                            </div>
                        </div>
                    </AnimCard>

                    {/* Technical Arsenal */}
                    <AnimCard className="skills-card glass-neon" variant={fadeUp} delay={0.4}>
                        <div className="card-label">
                            <Sparkles size={16} className="text-neon" />
                            <span>Technical Arsenal</span>
                        </div>
                        <div className="skills-grid">
                            {Object.entries(skills).map(([cat, data]) => (
                                <div key={cat} className="skill-cat">
                                    <h5>{cat}</h5>
                                    <div className="skill-tags-wrap">
                                        {data.tags.map(t => (
                                            <span key={t} className={`skill-tag ${data.cls}`}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimCard>
                </div>
            </div>
        </section>
    )
}
