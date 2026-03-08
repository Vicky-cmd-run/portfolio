import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Experience.css'

const RocketIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l6-6-3-3-6 6z" />
        <path d="M12 15l-3-3 8.5-8.5a2.12 2.12 0 013 3L12 15z" />
        <path d="M20 7l-1-1M12 20v-2M17 17h-2M7 7L5 5" />
    </svg>
)
const ChartIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
)
const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
)

const achievements = [
    {
        icon: <RocketIcon />,
        metric: '30%',
        text: 'Engineered 5+ web application modules using React.js and Material UI, improving page responsiveness by 30% and boosting user retention across devices.',
        showBar: true,
    },
    {
        icon: <ChartIcon />,
        metric: '+25pts',
        text: 'Orchestrated the construction of 4 interactive dashboards featuring real-time data visualization and intuitive drill-down capabilities, enhancing user engagement by 25 points.',
        showBar: false,
    },
    {
        icon: <ShieldIcon />,
        metric: null,
        text: 'Implemented secure authentication features with form validation to ensure data integrity and optimize the user experience.',
        showBar: false,
    },
]

export default function Experience() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
                    <span className="section-tag">// experience.json</span>
                    <h2 className="section-title">Work Experience</h2>
                </motion.div>

                <div className="timeline">
                    <div className="tl-line" />
                    <motion.div
                        className="tl-item"
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="tl-dot">
                            <motion.div
                                className="tl-dot-inner"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        </div>
                        <div className="tl-card glass-neon">
                            <div className="tl-header">
                                <div>
                                    <h3 className="tl-company">Taizo.in</h3>
                                    <p className="tl-role">Frontend Development Intern</p>
                                </div>
                                <div className="tl-meta">
                                    <span className="tl-badge">Remote</span>
                                    <span className="tl-date">May 2025 – Jun 2025</span>
                                </div>
                            </div>

                            <div className="tl-achievements">
                                {achievements.map((a, i) => (
                                    <motion.div
                                        key={i}
                                        className="ach-item"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.3 + i * 0.15 }}
                                    >
                                        <div className="ach-icon">{a.icon}</div>
                                        <div className="ach-content">
                                            {a.metric && <span className="ach-metric">{a.metric}</span>}
                                            <p>{a.text}</p>
                                            {a.showBar && (
                                                <div className="ach-bar-wrap">
                                                    <div className="ach-bar-track">
                                                        <motion.div
                                                            className="ach-bar-fill"
                                                            initial={{ width: 0 }}
                                                            animate={inView ? { width: '30%' } : {}}
                                                            transition={{ duration: 1.2, delay: 0.6 }}
                                                        />
                                                    </div>
                                                    <span className="ach-bar-label">30% Improvement</span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="tl-tech">
                                {['React.js', 'Material UI', 'Data Visualization', 'Authentication'].map(t => (
                                    <span key={t} className="skill-tag">{t}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
