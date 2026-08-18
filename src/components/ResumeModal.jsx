import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, Download, Copy, Check, Sparkles, X, 
  ExternalLink, GraduationCap, Briefcase, Award, Cpu, Code2 
} from 'lucide-react'
import './ResumeModal.css'

export default function ResumeModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('ats') // 'ats' | 'interactive' | 'latex'
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handlePrint = () => {
    window.open('/resume.html', '_blank')
  }

  const copyLaTeX = () => {
    const latexCode = `% Vignesh G A - AI/ML Engineer Resume
\\documentclass[letterpaper,10pt]{article}
\\usepackage{latexsym,fullpage,titlesec,enumitem,hyperref}
% Complete Overleaf ready code is available in resume.tex in the project root.`
    navigator.clipboard.writeText(latexCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <AnimatePresence>
      <div className="resume-modal-overlay" onClick={onClose}>
        <motion.div 
          className="resume-modal-container glass-neon"
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          {/* TOP BAR */}
          <div className="resume-modal-header">
            <div className="rm-header-left">
              <div className="rm-badge">
                <Sparkles size={14} className="text-neon" />
                <span>Verified ATS &amp; AI Engineer Dossier</span>
              </div>
              <h2 className="rm-title">Vignesh G A — Resume &amp; Technical Dossier</h2>
            </div>
            
            <div className="rm-header-actions">
              <button className="rm-btn-action btn-ghost" onClick={handlePrint} title="Open printable 1-page PDF">
                <Download size={15} />
                <span>Print / Save PDF</span>
              </button>
              <button className="rm-close-btn" onClick={onClose} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* VIEW TOGGLE BAR */}
          <div className="rm-nav-tabs">
            <button 
              className={`rm-tab ${activeTab === 'ats' ? 'active' : ''}`}
              onClick={() => setActiveTab('ats')}
            >
              <FileText size={15} />
              <span>Standard Resume (ATS 1-Page)</span>
            </button>
            <button 
              className={`rm-tab ${activeTab === 'interactive' ? 'active' : ''}`}
              onClick={() => setActiveTab('interactive')}
            >
              <Cpu size={15} />
              <span>Interactive AI Metrics</span>
            </button>
            <button 
              className={`rm-tab ${activeTab === 'latex' ? 'active' : ''}`}
              onClick={() => setActiveTab('latex')}
            >
              <Code2 size={15} />
              <span>LaTeX / Overleaf Source</span>
            </button>
          </div>

          {/* MODAL CONTENT */}
          <div className="rm-body custom-scroll">
            
            {/* ATS STANDARD VIEW */}
            {activeTab === 'ats' && (
              <div className="ats-view-paper">
                <div className="ats-paper-header">
                  <h1>VIGNESH G A</h1>
                  <p className="ats-contact">
                    Amaravati, AP • <a href="mailto:vigneshgnanasekaran8@gmail.com">vigneshgnanasekaran8@gmail.com</a> • +91 9025559798 • <a href="https://linkedin.com/in/vignesh-ga" target="_blank" rel="noreferrer">linkedin.com/in/vignesh-ga</a> • <a href="https://github.com/vicky-cmd-run" target="_blank" rel="noreferrer">github.com/vicky-cmd-run</a> • <a href="https://vigneshga.vercel.app" target="_blank" rel="noreferrer">vigneshga.vercel.app</a>
                  </p>
                </div>

                {/* EDUCATION */}
                <div className="ats-section">
                  <div className="ats-sec-title">EDUCATION</div>
                  <div className="ats-row">
                    <div>
                      <strong>B.Tech in Computer Science &amp; Engineering</strong> | VIT-AP University, Amaravati
                    </div>
                    <div className="ats-date">2023 – 2027 | <strong>CGPA: 8.81</strong></div>
                  </div>
                  <div className="ats-row" style={{ marginTop: '4px' }}>
                    <div>
                      <strong>Minor in Artificial Intelligence</strong> | IIT Ropar × Masai
                    </div>
                    <div className="ats-date">2025 – 2026 | AI &amp; Analytics</div>
                  </div>
                </div>

                {/* SKILLS */}
                <div className="ats-section">
                  <div className="ats-sec-title">TECHNICAL SKILLS &amp; COMPETENCIES</div>
                  <p className="ats-skill-line"><strong>Programming Languages:</strong> Python, SQL, C++, JavaScript</p>
                  <p className="ats-skill-line"><strong>Machine Learning &amp; Deep Learning:</strong> PyTorch, TensorFlow, scikit-learn, XGBoost, OpenCV, Time-Series Modeling, Transformers, SHAP (XAI), Pandas, NumPy, YOLO, U²-Net, MediaPipe</p>
                  <p className="ats-skill-line"><strong>Data Engineering &amp; Web:</strong> FastAPI, React.js, PostgreSQL, Redis, Kafka, Celery, RESTful API Design, Docker, Linux, Git, LangChain, Streamlit</p>
                  <p className="ats-skill-line"><strong>Core Foundations:</strong> Data Structures &amp; Algorithms, DBMS, Operating Systems, OOP</p>
                </div>

                {/* EXPERIENCE */}
                <div className="ats-section">
                  <div className="ats-sec-title">INTERNSHIPS &amp; PROFESSIONAL EXPERIENCE</div>
                  
                  <div className="ats-item">
                    <div className="ats-row">
                      <div><strong>Data &amp; ML Analyst Intern</strong> | Yellowsense</div>
                      <div className="ats-date">May 2026 – Aug 2026</div>
                    </div>
                    <div className="ats-italic">Fintech analytics provider delivering predictive intelligence and automated KYC pipelines</div>
                    <ul className="ats-bullets">
                      <li><strong>Predictive Analytics &amp; Modeling:</strong> Developed 6 supervised machine learning models (lead scoring, churn risk, account health) using scikit-learn and XGBoost for data-driven client segmentation.</li>
                      <li><strong>ETL Pipeline Architecture:</strong> Designed near real-time data pipelines leveraging Kafka, Celery, and Redis to ingest, clean, and synchronize multi-source banking APIs into PostgreSQL.</li>
                      <li><strong>Workflow Automation:</strong> Built an automated document extraction pipeline using OCR and LLM APIs (LangChain), cutting manual KYC review turnaround time by <strong>70%</strong>.</li>
                    </ul>
                  </div>

                  <div className="ats-item">
                    <div className="ats-row">
                      <div><strong>Frontend Software Engineer Intern</strong> | Taizo.in</div>
                      <div className="ats-date">May 2025 – Jun 2025</div>
                    </div>
                    <div className="ats-italic">B2B manufacturing recruitment platform connecting enterprise employers with verified talent</div>
                    <ul className="ats-bullets">
                      <li><strong>Web Performance Optimization:</strong> Built and deployed 5+ production modules using React.js, optimizing UI render cycles and improving web responsiveness by <strong>30%</strong>.</li>
                      <li><strong>Analytics Dashboards:</strong> Developed 4 interactive recruitment dashboards with real-time data filtering and drill-down visualization, increasing platform engagement by <strong>25%</strong>.</li>
                      <li><strong>Form Validation &amp; Security:</strong> Integrated client-side validations and role-based access checks for enterprise candidate registration workflows.</li>
                    </ul>
                  </div>
                </div>

                {/* PROJECTS */}
                <div className="ats-section">
                  <div className="ats-sec-title">ACADEMIC &amp; TECHNICAL PROJECTS</div>

                  <div className="ats-item">
                    <div className="ats-row">
                      <div><strong>Contactless Biometric AI Suite</strong> | <em>Python, PyTorch, YOLO, OpenCV, U²-Net, MediaPipe</em></div>
                      <div className="ats-date"><strong>National Qualifier</strong></div>
                    </div>
                    <div className="ats-italic">Team Lead | Contactless fingerprint quality assessment, anti-spoofing, and biometric verification</div>
                    <ul className="ats-bullets">
                      <li><strong>Vision Pipeline:</strong> Built a computer vision pipeline combining YOLO for hand detection, U²-Net for finger segmentation, and Zero-DCE/CLAHE illumination enhancement.</li>
                      <li><strong>Liveness &amp; Verification:</strong> Implemented presentation attack detection using PyTorch CNNs and MediaPipe 3D gesture tracking; extracted minutiae maps to evaluate Equal Error Rate (EER).</li>
                      <li><strong>National Recognition:</strong> Qualified for Stage 2 of the national <strong>UIDAI SITAA AI biometric innovation cohort</strong>.</li>
                    </ul>
                  </div>

                  <div className="ats-item">
                    <div className="ats-row">
                      <div><strong>Explainable Predictive Maintenance (NASA C-MAPSS)</strong> | <em>Python, TensorFlow, Transformers, SHAP</em></div>
                      <div className="ats-date">Lead Researcher</div>
                    </div>
                    <ul className="ats-bullets">
                      <li><strong>Deep Architecture:</strong> Formulated degradation trends across 21 noisy sensor channels; trained a joint CNN–Transformer–BiLSTM model achieving <strong>RMSE of 14.60</strong> and <strong>R² = 0.848</strong>.</li>
                      <li><strong>Model Explainability (XAI):</strong> Applied SHAP and Integrated Gradients to calculate sensor-level feature attributions, identifying key degradation indicators with 95% health-state classification accuracy.</li>
                    </ul>
                  </div>

                  <div className="ats-item">
                    <div className="ats-row">
                      <div><strong>MYTHRA – Multimodal Storytelling Platform</strong> | <em>Python, LangChain, FLUX.1, Sarvam AI, Streamlit</em></div>
                      <div className="ats-date">System Architect</div>
                    </div>
                    <ul className="ats-bullets">
                      <li><strong>Multimodal Orchestration:</strong> Connected LLMs for narrative structuring, FLUX.1 diffusion for scene generation, and Sarvam AI neural TTS for regional voiceover synthesis.</li>
                      <li><strong>Reliability &amp; Latency:</strong> Enforced structured JSON output schemas to guarantee visual consistency; streamlined asynchronous requests to keep total generation under <strong>40s</strong>.</li>
                    </ul>
                  </div>

                  <div className="ats-item">
                    <div className="ats-row">
                      <div><strong>ExprAI – DenseNet Facial Expression Recognition</strong> | <em>Python, TensorFlow, Keras, OpenCV, scikit-learn</em></div>
                      <div className="ats-date">Lead Developer</div>
                    </div>
                    <ul className="ats-bullets">
                      <li>Implemented a DenseNet-201 CNN with OpenCV spatial alignment and CLAHE, reaching <strong>94.82% test accuracy</strong> on CK+ dataset and outperforming standard CNNs by 7-10%.</li>
                    </ul>
                  </div>

                  <div className="ats-item">
                    <div className="ats-row">
                      <div><strong>NEXUS – Financial Reconciliation Platform</strong> | <em>FastAPI, React.js, PostgreSQL, Docker, Redis</em></div>
                      <div className="ats-date">Full-Stack Developer</div>
                    </div>
                    <ul className="ats-bullets">
                      <li>Engineered automated ledger reconciliation processing 500+ line items with 95% accuracy, reducing manual audit turnaround by <strong>80%</strong> with Redis LRU caching.</li>
                    </ul>
                  </div>
                </div>

                {/* HONORS & CERTIFICATIONS */}
                <div className="ats-section">
                  <div className="ats-sec-title">ACHIEVEMENTS, HONORS &amp; CERTIFICATIONS</div>
                  <p className="ats-skill-line">• <strong>UIDAI SITAA National Biometric Challenge:</strong> Qualified for Stage 2 in the national biometric challenge organized by UIDAI.</p>
                  <p className="ats-skill-line">• <strong>Student Project Mentor:</strong> Supervised junior undergraduate teams on AI/ML course projects, guiding data pipelines &amp; debugging.</p>
                  <p className="ats-skill-line">• <strong>NPTEL Elite Certification:</strong> Awarded Elite status in Deep Learning certification.</p>
                  <p className="ats-skill-line">• <strong>Google Cloud Computing Foundations:</strong> Certified by Google Cloud Platform.</p>
                </div>
              </div>
            )}

            {/* INTERACTIVE AI TELEMETRY VIEW */}
            {activeTab === 'interactive' && (
              <div className="rm-interactive-grid">
                <div className="rm-metric-card glass">
                  <div className="rm-metric-header">
                    <Award className="text-neon" size={18} />
                    <span>Key Highlights</span>
                  </div>
                  <div className="rm-telemetry-stats">
                    <div className="tstat">
                      <div className="tval text-neon">Stage 2</div>
                      <div className="tlbl">UIDAI SITAA National Qualifier</div>
                    </div>
                    <div className="tstat">
                      <div className="tval text-purple">8.81</div>
                      <div className="tlbl">B.Tech CGPA (VIT-AP)</div>
                    </div>
                    <div className="tstat">
                      <div className="tval text-neon">94.82%</div>
                      <div className="tlbl">DenseNet Test Accuracy</div>
                    </div>
                    <div className="tstat">
                      <div className="tval" style={{ color: '#00ff94' }}>70%</div>
                      <div className="tlbl">KYC Automation (Yellowsense)</div>
                    </div>
                  </div>
                </div>

                <div className="rm-metric-card glass">
                  <div className="rm-metric-header">
                    <Cpu className="text-neon" size={18} />
                    <span>Domain Skill Matrix</span>
                  </div>
                  <div className="skill-meters">
                    {[
                      { name: 'Computer Vision & Biometrics (PyTorch, YOLO, U²-Net)', val: 95 },
                      { name: 'Explainable AI & Time-Series (SHAP, BiLSTM, C-MAPSS)', val: 92 },
                      { name: 'Data Engineering & Pipelines (Kafka, Celery, Redis)', val: 88 },
                      { name: 'Generative AI & LLMs (LangChain, FLUX.1, TTS)', val: 90 },
                      { name: 'Full-Stack Architecture (FastAPI, React.js, PostgreSQL)', val: 89 },
                    ].map(s => (
                      <div key={s.name} className="smeter-row">
                        <div className="smeter-meta">
                          <span>{s.name}</span>
                          <span className="text-neon">{s.val}%</span>
                        </div>
                        <div className="metric-bar">
                          <div className="metric-fill" style={{ width: `${s.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* LATEX SOURCE CODE VIEW */}
            {activeTab === 'latex' && (
              <div className="rm-latex-view">
                <div className="rm-latex-bar">
                  <span>LaTeX Source (Compatible with Overleaf / TeX Live)</span>
                  <button className="btn-ghost" onClick={copyLaTeX} style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                    {copied ? <><Check size={14} className="text-neon" /> Copied!</> : <><Copy size={14} /> Copy Source</>}
                  </button>
                </div>
                <pre className="rm-latex-code">
{`%-------------------------
% Resume in LaTeX
% Author : Vignesh G A
% Target : AI/ML Engineer | Data & ML Analyst
%------------------------

\\documentclass[letterpaper,10pt]{article}
\\usepackage{latexsym,fullpage,titlesec,marvosym,enumitem,hyperref,fancyhdr}
\\usepackage[english]{babel}

\\begin{document}
\\begin{center}
    {\\Huge \\scshape Vignesh G A} \\\\ \\vspace{2pt}
    \\small Amaravati, AP $|$ +91 9025559798 $|$ \\href{mailto:vigneshgnanasekaran8@gmail.com}{vigneshgnanasekaran8@gmail.com} $|$ 
    \\href{https://linkedin.com/in/vignesh-ga}{linkedin.com/in/vignesh-ga} $|$ 
    \\href{https://github.com/vicky-cmd-run}{github.com/vicky-cmd-run}
\\end{center}

\\section{Education}
\\textbf{VIT-AP University} \\hfill 2023 -- 2027 \\\\
Bachelor of Technology in Computer Science \\hfill CGPA: 8.81 \\\\
\\textbf{IIT Ropar $\\times$ Masai} \\hfill 2025 -- 2026 \\\\
Minor in Artificial Intelligence \\hfill AI \\& Analytics

\\section{Technical Skills}
\\textbf{Languages}: Python, SQL, C++, JavaScript \\\\
\\textbf{AI/ML}: PyTorch, TensorFlow, scikit-learn, XGBoost, OpenCV, Transformers, SHAP, YOLO, U$^2$-Net \\\\
\\textbf{Data \\& Web}: FastAPI, React.js, PostgreSQL, Redis, Kafka, Celery, Docker, Git

\\section{Experience}
\\textbf{Yellowsense} -- Data \\& ML Analyst Intern \\hfill May 2026 -- Aug 2026 \\\\
$\\bullet$ Built 6 supervised ML models with scikit-learn/XGBoost for churn and lead scoring. \\\\
$\\bullet$ Engineered real-time ETL pipelines with Kafka, Celery, and Redis into PostgreSQL. \\\\
$\\bullet$ Automated document extraction using OCR and LangChain LLMs, cutting review time by 70\\%.

\\textbf{Taizo.in} -- Frontend Software Engineer Intern \\hfill May 2025 -- Jun 2025 \\\\
$\\bullet$ Developed 5+ React.js modules, boosting page responsiveness by 30\\%. \\\\
$\\bullet$ Built 4 interactive analytics dashboards, elevating engagement by 25\\%.

\\section{Selected Projects}
\\textbf{Contactless Biometric AI Suite} (UIDAI SITAA Stage 2 Qualifier) \\\\
$\\bullet$ Built vision pipeline with YOLO hand detection, U$^2$-Net segmentation, and MediaPipe liveness. \\\\
\\textbf{Explainable Predictive Maintenance (NASA C-MAPSS)} \\\\
$\\bullet$ Joint CNN--Transformer--BiLSTM architecture achieving $R^2 = 0.848$ and RMSE of 14.60 with SHAP. \\\\
\\textbf{MYTHRA -- Multimodal Storytelling Platform} \\\\
$\\bullet$ Async multimodal pipeline connecting LLM, FLUX.1 diffusion, and Sarvam AI TTS ($<40$s latency).

\\end{document}`}
                </pre>
              </div>
            )}

          </div>

          {/* FOOTER ACTIONS */}
          <div className="resume-modal-footer">
            <div className="rm-footer-meta">
              <span>Verified Data • Target: AI/ML Engineering &amp; Data Intelligence Roles</span>
            </div>
            <div className="rm-footer-btns">
              <button className="btn-primary" onClick={handlePrint}>
                <Download size={16} />
                <span>Open Printable PDF</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
