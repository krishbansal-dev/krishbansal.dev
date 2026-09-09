import { useEffect, useState } from 'react'
import TerminalPrompt from '../components/TerminalPrompt'
import InteractiveTerminalMenu from '../components/InteractiveTerminalMenu'
import usePageMeta from '../hooks/usePageMeta'

const academics = [
  {
    institution: 'Amity University, Mohali',
    location: 'Mohali, Punjab, India',
    period: '2026 — Present',
    program: 'B.Tech in Computer Science & Engineering (Artificial Intelligence & Machine Learning)',
    details: 'Currently pursuing an undergraduate degree specialising in artificial intelligence and machine learning, covering data structures, algorithms, neural networks, and applied AI systems.',
    status: 'IN PROGRESS',
    icon: 'school',
  },
  {
    institution: 'Sri Chaitanya Institute',
    location: 'Chandigarh / Panchkula, India',
    period: '2024 — 2026',
    program: 'Higher Secondary School (Class XI — XII)',
    details: 'Non-Medical stream (Physics, Chemistry, Mathematics). Developed analytical foundation, advanced science, and mathematics aptitude.',
    status: 'COMPLETED',
    icon: 'history_edu',
  },
  {
    institution: 'D C Model Sr Sec School',
    location: 'Sector 19, Panchkula, Haryana, India',
    period: '2013 — 2024',
    program: 'Primary & Secondary Education (Class I — X)',
    details: 'Foundation years. Developed early interest in logic, mathematics, computer science, and basic science.',
    status: 'COMPLETED',
    icon: 'local_library',
  },
]

const certifications = [
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM',
    date: '2024',
    url: 'https://www.credly.com/badges/064f4e33-ed5b-4e06-990c-1b60108eded7/linked_in_profile',
    credentialId: '064f4e33-ed5b-4e06-990c-1b60108eded7',
    desc: 'Validated core concepts of artificial intelligence, including machine learning models, deep learning networks, natural language processing, and generative AI systems.',
    status: 'VERIFIED',
    icon: 'psychology',
  },
  {
    title: 'Google AI Essentials',
    issuer: 'Google',
    date: '2024',
    url: 'https://coursera.org/share/76a9e1aef17ebefa9b286fd486e3047a',
    credentialId: '76a9e1aef17ebefa9b286fd486e30',
    desc: 'Acquired hands-on experience in generative AI tools, prompt engineering techniques, and practical applications of AI to automate workflows and optimize productivity.',
    status: 'VERIFIED',
    icon: 'smart_toy',
  },
]

export default function CredentialsPage() {
  usePageMeta(
    'Krish Bansal | Academics & Certifications',
    'Explore the education history and professional credentials of Krish Bansal. Features academic milestones from Amity University, Mohali and Sri Chaitanya Institute, plus certifications from IBM and Google.'
  )
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <main
      className="page-content page-enter"
      id="page-credentials"
      style={{ opacity: show ? 1 : 0, transition: 'opacity 0.4s ease' }}
    >
      <div className="two-col">
        {/* LEFT COLUMN: Academics & Education */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <TerminalPrompt command="cat ~/credentials/academics.json" />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--color-text-dim)',
                marginTop: '0.25rem',
                marginBottom: '1rem',
              }}
            >
              <span className="text-primary">records</span> {academics.length} — listing academic timeline
            </div>

            <div
              className="stagger-children"
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              id="academics-timeline"
            >
              {academics.map((edu, idx) => (
                <div
                  className="project-card"
                  key={edu.institution}
                  style={{ position: 'relative' }}
                >
                  <div className="project-card-header">
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{ fontSize: '1.25rem' }}
                      >
                        {edu.icon}
                      </span>
                      <span className="project-card-title" style={{ fontSize: '0.9rem' }}>
                        {edu.institution}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color:
                          edu.status === 'COMPLETED'
                            ? 'var(--color-primary)'
                            : 'var(--color-yellow)',
                        border: '1px solid',
                        borderColor:
                          edu.status === 'COMPLETED'
                            ? 'var(--color-primary-dim)'
                            : 'var(--color-yellow)',
                        padding: '0.15rem 0.4rem',
                      }}
                    >
                      {edu.status}
                    </span>
                  </div>
                  <div style={{ paddingLeft: '2rem' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-text)' }}>
                      {edu.program}
                    </p>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-text-dim)',
                        marginTop: '0.25rem',
                      }}
                    >
                      {edu.period} | {edu.location}
                    </p>
                    <p
                      className="project-card-desc"
                      style={{ marginTop: '0.5rem', fontSize: '0.78rem' }}
                    >
                      {edu.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Certifications */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <TerminalPrompt command="cat ~/credentials/certifications.json" />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--color-text-dim)',
                marginTop: '0.25rem',
                marginBottom: '1rem',
              }}
            >
              <span className="text-primary">badges</span> {certifications.length} — listing active credentials
            </div>

            <div
              className="stagger-children"
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              id="certifications-list"
            >
              {certifications.map((cert) => (
                <a
                  href={cert.url}
                  className="project-card"
                  key={cert.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  <div className="project-card-header">
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{ fontSize: '1.25rem' }}
                      >
                        {cert.icon}
                      </span>
                      <span className="project-card-title" style={{ fontSize: '0.9rem' }}>
                        {cert.title}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        border: '1px solid var(--color-primary-dim)',
                        padding: '0.15rem 0.4rem',
                      }}
                    >
                      {cert.status}
                    </span>
                  </div>
                  <div style={{ paddingLeft: '2rem' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-text)' }}>
                      Issued by: {cert.issuer}
                    </p>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-text-dim)',
                        marginTop: '0.25rem',
                      }}
                    >
                      Date Issued: {cert.date} | ID: {cert.credentialId.slice(0, 12)}...
                    </p>
                    <p
                      className="project-card-desc"
                      style={{ marginTop: '0.5rem', fontSize: '0.78rem' }}
                    >
                      {cert.desc}
                    </p>
                    <div
                      className="text-primary"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        marginTop: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      <span>Verify Credential</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>
                        arrow_outward
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            <InteractiveTerminalMenu path="~/credentials" />
          </div>
        </section>
      </div>
    </main>
  )
}
