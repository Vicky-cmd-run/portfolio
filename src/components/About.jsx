import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
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
        'Programming': ['Python', 'Java', 'C++', 'JavaScript', 'R'],
        'AI/ML & Data': { tags: ['TensorFlow', 'Keras', 'OpenCV', 'SHAP', 'Transformers'], cls: 'neon' },
        'Web Dev': { tags: ['React.js', 'Material UI', 'HTML/CSS'], cls: 'purple' },
        'Tools & Cloud': ['GCP', 'Git', 'VS Code', 'Streamlit'],
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
                    <span className="section-tag">// who_I_am.py</span>
                    <h2 className="section-title">About Me</h2>
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
                            <p className="profile-role text-neon">AI/ML Developer &amp; Frontend Engineer</p>
                            <div className="profile-links">
                                {[
                                    {
                                        href: 'mailto:vigneshgnanasekaran8@gmail.com', text: 'vigneshgnanasekaran8@gmail.com',
                                        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
                                    },
                                    {
                                        href: 'tel:+919025559798', text: '+91 9025559798',
                                        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.8 19.8 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                                    },
                                    {
                                        href: 'https://linkedin.com/in/vignesh-ga', text: 'linkedin.com/in/vignesh-ga',
                                        icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" /></svg>
                                    },
                                    {
                                        href: 'https://github.com/vicky-cmd-run', text: 'github.com/vicky-cmd-run',
                                        icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                    },
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
                        <div className="card-label">Education</div>
                        {[
                            {
                                uni: 'VIT-AP University', degree: 'B.Tech in CSE', meta: 'Exp. 2027 | Amaravati, AP', gpa: '8.91',
                                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                            },
                            {
                                uni: 'IIT Ropar × MASAI', degree: 'Minor in AI', meta: 'Exp. 2026 | Remote', gpa: '7.30',
                                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
                            },
                        ].map((e, i) => (
                            <div key={i} className="edu-item">
                                <div className="edu-icon">{e.icon}</div>
                                <div className="edu-text">
                                    <h4>{e.uni}</h4>
                                    <p>{e.degree}</p>
                                    <div className="edu-chips">
                                        <span className="edu-chip">{e.meta}</span>
                                        <span className="edu-chip gpa">CGPA: {e.gpa}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </AnimCard>

                    {/* Certifications */}
                    <AnimCard className="cert-card glass-neon" variant={fadeUp} delay={0.3}>
                        <div className="card-label">Certifications</div>
                        {[
                            {
                                name: 'Google Cloud Computing Foundations', issuer: 'Google Cloud Platform', badge: 'Certified',
                                icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 6.5L8.5 10H6a6 6 0 000 12h12a6 6 0 001.5-11.8L18 10h-2.5L12 6.5z" fill="#4285F4" /><circle cx="9" cy="16" r="1.5" fill="white" /><circle cx="12" cy="16" r="1.5" fill="white" /><circle cx="15" cy="16" r="1.5" fill="white" /></svg>
                            },
                            {
                                name: 'NPTEL Certified', issuer: 'National Programme on Technology Enhanced Learning', badge: 'Elite',
                                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg>
                            },
                        ].map((c, i) => (
                            <div key={i} className="cert-item">
                                <span className="cert-icon">{c.icon}</span>
                                <div>
                                    <p className="cert-name">{c.name}</p>
                                    <p className="cert-issuer">{c.issuer}</p>
                                </div>
                                <span className={`cert-badge ${c.badge === 'Elite' ? 'elite' : ''}`}>{c.badge}</span>
                            </div>
                        ))}
                    </AnimCard>

                    {/* Skills */}
                    <AnimCard className="skills-card glass-neon" variant={fadeUp} delay={0.4}>
                        <div className="card-label">Technical Arsenal</div>
                        <div className="skills-grid">
                            {Object.entries(skills).map(([cat, data]) => {
                                const tags = Array.isArray(data) ? data : data.tags
                                const cls = Array.isArray(data) ? '' : data.cls
                                return (
                                    <div key={cat} className="skill-cat">
                                        <h5>{cat}</h5>
                                        <div className="skill-tags-wrap">
                                            {tags.map(t => <span key={t} className={`skill-tag ${cls}`}>{t}</span>)}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </AnimCard>
                </div>
            </div>
        </section>
    )
}
