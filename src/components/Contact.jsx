import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Contact.css'

const EmailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
    </svg>
)
const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
)
const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
)
const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.8 19.8 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
)

const CONTACT_LINKS = [
    { icon: <EmailIcon />, label: 'Email', value: 'vigneshgnanasekaran8@gmail.com', href: 'mailto:vigneshgnanasekaran8@gmail.com' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', value: 'linkedin.com/in/vignesh-ga', href: 'https://linkedin.com/in/vignesh-ga' },
    { icon: <GitHubIcon />, label: 'GitHub', value: 'github.com/vicky-cmd-run', href: 'https://github.com/vicky-cmd-run' },
    { icon: <PhoneIcon />, label: 'Phone', value: '+91 9025559798', href: 'tel:+919025559798' },
]

export default function Contact() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    const [sent, setSent] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        setSent(true)
        setTimeout(() => setSent(false), 4000)
        setForm({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <section id="contact">
            <div className="container">
                <motion.div
                    ref={ref}
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">// contact.init()</span>
                    <h2 className="section-title">Let's Connect</h2>
                    <p className="section-desc">Open to internships, collaborations, and AI/ML projects</p>
                </motion.div>

                <div className="contact-grid">
                    {/* Info */}
                    <motion.div
                        className="contact-info glass-neon"
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3>Get In Touch</h3>
                        <p className="contact-desc">Whether you have an exciting AI project, research collaboration, or just want to talk about explainable AI — my inbox is always open.</p>
                        <div className="contact-links">
                            {CONTACT_LINKS.map(l => (
                                <motion.a
                                    key={l.label}
                                    href={l.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="contact-link glass"
                                    whileHover={{ scale: 1.02, x: 4 }}
                                >
                                    <span className="cl-icon">{l.icon}</span>
                                    <div>
                                        <p className="cl-label">{l.label}</p>
                                        <p className="cl-value">{l.value}</p>
                                    </div>
                                    <span className="cl-arrow">→</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        className="contact-form glass-neon"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3>Send a Message</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Internship / Collaboration / Research" />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project or opportunity..." required />
                        </div>
                        <motion.button
                            type="submit"
                            className="btn-primary full-width"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <span>{sent ? '✅ Message Sent!' : 'Send Message'}</span>
                            {!sent && <span>→</span>}
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    )
}
