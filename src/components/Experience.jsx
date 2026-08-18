import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Database, Layout, ArrowUpRight, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react'
import './Experience.css'

const experiences = [
    {
        id: 'yellowsense',
        role: 'Data & ML Analyst Intern',
        company: 'Yellowsense',
        period: 'May 2026 – Aug 2026',
        type: 'Internship',
        summary: 'Fintech analytics provider delivering predictive decision intelligence and automated KYC pipelines for financial institutions.',
        tech: ['Python', 'XGBoost', 'scikit-learn', 'Kafka', 'Celery', 'Redis', 'PostgreSQL', 'LangChain', 'OCR'],
        achievements: [
            {
                label: 'Predictive Analytics & Modeling',
                metric: '6 Models',
                text: 'Developed 6 supervised machine learning models (lead scoring, churn risk, and account health) using scikit-learn and XGBoost, enabling data-driven client segmentation and automated risk scoring.',
                bar: 85,
            },
            {
                label: 'ETL Pipeline Architecture',
                metric: 'Real-Time',
                text: 'Designed near real-time data ingestion pipelines leveraging Kafka, Celery, and Redis to ingest, clean, and synchronize multi-source banking APIs into normalized PostgreSQL analytical databases.',
                bar: 92,
            },
            {
                label: 'Workflow Automation',
                metric: '70% Faster',
                text: 'Built an automated document extraction pipeline using OCR and LLM APIs (LangChain), reducing manual KYC review turnaround time by 70%.',
                bar: 70,
            },
        ],
        pipelineNodes: ['Multi-Source APIs', 'Kafka Stream', 'Celery Workers', 'PostgreSQL', 'XGBoost Scoring'],
    },
    {
        id: 'taizo',
        role: 'Frontend Software Engineer Intern',
        company: 'Taizo.in',
        period: 'May 2025 – Jun 2025',
        type: 'Internship',
        summary: 'B2B manufacturing recruitment platform connecting enterprise employers with verified industrial talent.',
        tech: ['React.js', 'Material UI', 'JavaScript', 'RESTful APIs', 'JWT Auth', 'Performance Optimization'],
        achievements: [
            {
                label: 'Web Performance Optimization',
                metric: '+30% Speed',
                text: 'Built and deployed 5+ production modules using React.js, optimizing UI render cycles and improving web responsiveness by 30% across devices.',
                bar: 30,
            },
            {
                label: 'Interactive Dashboards',
                metric: '+25 Pts',
                text: 'Developed 4 interactive recruitment dashboards featuring real-time data filtering and drill-down visualization, increasing platform engagement by 25 points.',
                bar: 65,
            },
            {
                label: 'Form Validation & Security',
                metric: 'Enterprise',
                text: 'Integrated client-side validations and role-based access checks for enterprise candidate registration workflows.',
                bar: null,
            },
        ],
        pipelineNodes: ['React Components', 'Virtual DOM Diff', 'Material UI', 'Secure JWT Flow'],
    },
]

export default function Experience() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    const [activeTab, setActiveTab] = useState('yellowsense')

    return (
        <section id="experience">
            <div className="container">
                <motion.div
                    ref={ref}
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">// career_trajectory.log</span>
                    <h2 className="section-title">Work Experience</h2>
                    <p className="section-desc">Production engineering in predictive machine learning, high-throughput ETL pipelines, and scalable enterprise frontends.</p>
                </motion.div>

                <div className="exp-tab-nav">
                    {experiences.map(e => (
                        <button
                            key={e.id}
                            className={`exp-nav-btn ${activeTab === e.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(e.id)}
                        >
                            <div className="exp-btn-dot" />
                            <div className="exp-btn-text">
                                <span className="exp-btn-company">{e.company}</span>
                                <span className="exp-btn-role">{e.role}</span>
                            </div>
                            <span className="exp-btn-date">{e.period}</span>
                        </button>
                    ))}
                </div>

                <div className="exp-showcase">
                    {experiences.filter(e => e.id === activeTab).map(exp => (
                        <motion.div
                            key={exp.id}
                            className="exp-card glass-neon"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="exp-header">
                                <div>
                                    <div className="exp-subhead">
                                        <span className="exp-company-tag">{exp.company}</span>
                                        <span className="exp-type-badge">{exp.type}</span>
                                    </div>
                                    <h3 className="exp-title">{exp.role}</h3>
                                </div>
                                <div className="exp-date-pill">{exp.period}</div>
                            </div>

                            <p className="exp-desc">{exp.summary}</p>

                            {/* PIPELINE VISUALIZER */}
                            <div className="exp-pipeline-wrap glass">
                                <div className="pipe-header">
                                    <Layers size={14} className="text-neon" />
                                    <span>System Architecture Flow</span>
                                </div>
                                <div className="pipe-flow">
                                    {exp.pipelineNodes.map((node, i) => (
                                        <div key={node} className="pipe-node-group">
                                            <div className="pipe-node">
                                                <span>{node}</span>
                                            </div>
                                            {i < exp.pipelineNodes.length - 1 && <span className="pipe-arrow">&rarr;</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ACHIEVEMENTS */}
                            <div className="exp-achievements-list">
                                {exp.achievements.map((ach, i) => (
                                    <div key={i} className="exp-ach-item glass">
                                        <div className="ach-top">
                                            <span className="ach-label">{ach.label}</span>
                                            <span className="ach-badge text-neon">{ach.metric}</span>
                                        </div>
                                        <p className="ach-text">{ach.text}</p>
                                        {ach.bar && (
                                            <div className="metric-bar" style={{ marginTop: '8px' }}>
                                                <motion.div
                                                    className="metric-fill"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${ach.bar}%` }}
                                                    transition={{ duration: 0.8, delay: i * 0.15 }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* TECH PILLS */}
                            <div className="exp-tech-footer">
                                <span className="exp-tech-label">Tech Stack:</span>
                                <div className="exp-tech-tags">
                                    {exp.tech.map(t => (
                                        <span key={t} className="skill-tag neon">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
