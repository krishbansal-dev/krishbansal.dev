import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TerminalPrompt from '../components/TerminalPrompt'
import InteractiveTerminalMenu from '../components/InteractiveTerminalMenu'
import usePageMeta from '../hooks/usePageMeta'

const projects = [
  {
    name: 'PeerDrop',
    desc: 'WebRTC-powered, serverless P2P file-sharing. Multi-connection parallel chunk transfer for near-theoretical bandwidth saturation.',
    tags: ['WebRTC', 'Node.js', 'React', 'P2P'],
    status: 'ACTIVE',
    link: 'https://peerdrop.krishbansal.dev',
  },
]

export default function DeploymentsPage() {
  usePageMeta(
    'Projects & Deployments by Krish Bansal | krishbansal.dev',
    'Explore projects built by Krish Bansal — including PeerDrop (WebRTC P2P file sharing) and other infrastructure and full-stack deployments.'
  )
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <main
      className="page-content page-enter"
      id="page-deployments"
      style={{ opacity: show ? 1 : 0, transition: 'opacity 0.4s ease' }}
    >
      <TerminalPrompt command="ls -la ~/deployments/" />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--color-text-dim)',
          marginTop: '0.25rem',
        }}
      >
        <span className="text-primary">total</span> {projects.length} — showing all active deployments
      </div>

      <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
        {projects.map((project) => (
          <Link to={`/deployments/${project.name.toLowerCase().replace(/\s+/g, '')}`} className="project-card" key={project.name} id={`project-${project.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <div className="project-card-header">
              <span className="project-card-title">{project.name}</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: project.status === 'ACTIVE' || project.status === 'RUNNING' || project.status === 'DEPLOYED'
                    ? 'var(--color-primary)'
                    : 'var(--color-yellow)',
                  border: '1px solid',
                  borderColor: project.status === 'ACTIVE' || project.status === 'RUNNING' || project.status === 'DEPLOYED'
                    ? 'var(--color-primary-dim)'
                    : 'var(--color-yellow)',
                  padding: '0.15rem 0.4rem',
                }}
              >
                {project.status}
              </span>
            </div>
            <p className="project-card-desc">{project.desc}</p>
            <div className="project-card-tags">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <InteractiveTerminalMenu path="~/deployments" />
    </main>
  )
}
