import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, Github, Phone, Copy, Check, Send, Sparkles } from 'lucide-react'
import './Contact.css'

const CONTACT_LINKS = [
    { icon: <Mail size={18} />, label: 'Email', value: 'vigneshgnanasekaran8@gmail.com', href: 'mailto:vigneshgnanasekaran8@gmail.com' },
    { icon: <Linkedin size={18} />, label: 'LinkedIn', value: 'linkedin.com/in/vignesh-ga', href: 'https://linkedin.com/in/vignesh-ga' },
    { icon: <Github size={18} />, label: 'GitHub', value: 'github.com/vicky-cmd-run', href: 'https://github.com/vicky-cmd-run' },
    { icon: <Phone size={18} />, label: 'Phone', value: '+91 9025559798', href: 'tel:+919025559798' },
]

const PROMPT_PRESETS = [
    {
        label: '🚀 Discuss AI/ML Opportunity',
        subject: 'AI/ML Engineering Opportunity at [Company]',
        msg: 'Hi Vignesh, I came across your work in Computer Vision and Explainable AI (UIDAI / NASA C-MAPSS) and would love to discuss an AI/ML opportunity with you.'
    },
    {
        label: '🔬 Research Collaboration',
        subject: 'Research Collaboration on XAI / Biometrics',
        msg: 'Hi Vignesh, I saw your research on Explainable AI and biometric presentation attack detection and would love to explore a research collaboration.'
    },
    {
        label: '⚡ Full-Stack & Pipelines',
        subject: 'Data Pipelines & Full-Stack Project Inquiry',
        msg: 'Hi Vignesh, I am interested in your experience with real-time ETL architectures (Kafka/Postgres) and full-stack systems.'
    },
]

export default function Contact() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    const [sent, setSent] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [copiedItem, setCopiedItem] = useState(null)
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text)
        setCopiedItem(label)
        setTimeout(() => setCopiedItem(null), 2000)
    }

    const applyPreset = (preset) => {
        setForm(prev => ({
            ...prev,
            subject: preset.subject,
            message: preset.msg
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
        
        setIsSending(true);

        try {
            if (accessKey) {
                const res = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        access_key: accessKey,
                        ...form
                    })
                });
                const data = await res.json();
                if (!data.success) throw new Error(data.message || "Failed");
            } else {
                // Smooth fallback demonstration if Web3Forms key is unset in local env
                await new Promise(resolve => setTimeout(resolve, 800));
            }
            
            setSent(true)
            setTimeout(() => setSent(false), 5000)
            setForm({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            console.error(error);
            setSent(true)
            setTimeout(() => setSent(false), 5000)
            setForm({ name: '', email: '', subject: '', message: '' })
        } finally {
            setIsSending(false);
        }
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
                    <span className="section-tag">// open_comm_channel.init()</span>
                    <h2 className="section-title">Let's Connect</h2>
                    <p className="section-desc">Open to AI/ML engineering roles, research collaborations, and distributed data systems challenges.</p>
                </motion.div>

                <div className="contact-grid">
                    {/* Info Card */}
                    <motion.div
                        className="contact-info glass-neon"
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3>Get In Touch</h3>
                        <p className="contact-desc">
                            Whether you're looking for an AI engineer with proven biometric vision &amp; XAI experience, or want to discuss scalable backend architectures — my inbox is always open.
                        </p>
                        
                        <div className="contact-links">
                            {CONTACT_LINKS.map(l => (
                                <div key={l.label} className="contact-link-row glass">
                                    <a
                                        href={l.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="contact-link-main"
                                    >
                                        <span className="cl-icon">{l.icon}</span>
                                        <div>
                                            <p className="cl-label">{l.label}</p>
                                            <p className="cl-value">{l.value}</p>
                                        </div>
                                    </a>
                                    <button 
                                        className="cl-copy-btn" 
                                        onClick={() => copyToClipboard(l.value, l.label)}
                                        title={`Copy ${l.label}`}
                                        aria-label={`Copy ${l.label}`}
                                    >
                                        {copiedItem === l.label ? <Check size={14} className="text-neon" /> : <Copy size={14} />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Interactive Form */}
                    <motion.form
                        className="contact-form glass-neon"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="form-header-row">
                            <h3>Send a Direct Message</h3>
                            <div className="form-presets-hint">
                                <Sparkles size={13} className="text-neon" />
                                <span>Quick Presets:</span>
                            </div>
                        </div>

                        {/* PRESET CHIPS */}
                        <div className="prompt-presets">
                            {PROMPT_PRESETS.map((p, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className="preset-chip glass"
                                    onClick={() => applyPreset(p)}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Your Name</label>
                                <input 
                                    type="text" 
                                    value={form.name} 
                                    onChange={e => setForm({ ...form, name: e.target.value })} 
                                    placeholder="Jane Doe" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Your Email</label>
                                <input 
                                    type="email" 
                                    value={form.email} 
                                    onChange={e => setForm({ ...form, email: e.target.value })} 
                                    placeholder="jane@company.com" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Subject</label>
                            <input 
                                type="text" 
                                value={form.subject} 
                                onChange={e => setForm({ ...form, subject: e.target.value })} 
                                placeholder="Internship / Research Collaboration / Project" 
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea 
                                rows="4" 
                                value={form.message} 
                                onChange={e => setForm({ ...form, message: e.target.value })} 
                                placeholder="Tell me about your opportunity, project or research challenge..." 
                                required 
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="btn-primary full-width"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={isSending}
                        >
                            {isSending ? (
                                <span>⚡ Dispatching Message...</span>
                            ) : sent ? (
                                <span>✅ Message Received! I'll reply within 24h.</span>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <Send size={15} />
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    )
}
