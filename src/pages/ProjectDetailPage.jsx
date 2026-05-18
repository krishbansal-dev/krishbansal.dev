import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TerminalPrompt from '../components/TerminalPrompt'

const projectData = {
  peerdrop: {
    name: 'PeerDrop',
    status: 'ACTIVE',
    link: 'https://peerdrop.krishbansal.dev',
    tags: ['WebRTC', 'Node.js', 'React', 'P2P'],
    summary: 'Serverless peer-to-peer file sharing powered by WebRTC.',
    sections: [
      {
        command: 'cat README.md',
        content:
          'PeerDrop is a browser-based, serverless file-sharing service that uses WebRTC to establish direct peer-to-peer connections between users. No files ever touch a server — everything transfers directly from sender to receiver through encrypted data channels.',
      },
      {
        command: 'cat ARCHITECTURE.md',
        content:
          'The system uses a lightweight signaling server (Node.js + Socket.IO) solely for initial peer discovery and SDP/ICE exchange. Once the WebRTC handshake completes, all data flows directly between browsers over SCTP data channels. The signaling server never sees file contents.',
      },
      {
        command: 'cat FEATURES.md',
        content:
          '• Multi-connection parallel chunk transfer for maximum throughput\n• Automatic chunking and reassembly of large files\n• Real-time transfer progress with speed metrics\n• No file size limits — constrained only by browser memory\n• Zero server storage — fully serverless architecture\n• Works across NATs via TURN fallback\n• Room-based sharing with unique session codes',
      },
      {
        command: 'cat STACK.md',
        content:
          'Frontend: React + Vite\nBackend: Node.js signaling server\nProtocol: WebRTC (RTCPeerConnection + RTCDataChannel)\nTransport: SCTP over DTLS\nDeployment: Docker + Nginx reverse proxy',
      },
    ],
  },
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const [show, setShow] = useState(false)
  const project = projectData[slug]

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  if (!project) {
    return (
      <main className="page-content page-enter" id="page-project-404">
        <TerminalPrompt command={`cat ~/deployments/${slug}`} />
        <div className="surface-card" style={{ marginTop: '1rem' }}>
          <p style={{ color: 'var(--color-accent)' }}>
            ERROR: Project not found. No such file or directory.
          </p>
        </div>
        <Link
          to="/deployments"
          style={{
            marginTop: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-primary)',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          ← cd ~/deployments
        </Link>
      </main>
    )
  }

  return (
    <main
      className="page-content page-enter"
      id="page-project-detail"
      style={{ opacity: show ? 1 : 0, transition: 'opacity 0.4s ease' }}
    >
      {/* Back link */}
      <Link
        to="/deployments"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--color-text-dim)',
          fontSize: '0.8rem',
          fontWeight: 600,
          transition: 'color 0.15s ease',
          marginBottom: '0.5rem',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-dim)')}
      >
        ← cd ~/deployments
      </Link>

      {/* Project header */}
      <TerminalPrompt command={`cat ~/deployments/${slug}/`} />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            color: 'var(--color-primary)',
            fontWeight: 700,
            fontSize: '1.25rem',
          }}
        >
          {project.name}
        </span>
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'var(--color-primary)',
            border: '1px solid var(--color-primary-dim)',
            padding: '0.15rem 0.5rem',
          }}
        >
          {project.status}
        </span>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', marginTop: '0.25rem' }}>
        {project.summary}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
        {project.tags.map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>

      {/* Visit button */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        id="project-visit-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginTop: '1.25rem',
          padding: '0.75rem 1.5rem',
          background: 'var(--color-primary)',
          color: 'var(--color-bg)',
          fontWeight: 700,
          fontSize: '0.85rem',
          fontFamily: 'var(--font-mono)',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#2de00f'
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 4px 20px var(--color-primary-dim)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--color-primary)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>open_in_new</span>
        VISIT {project.name.toUpperCase()} →
      </a>

      {/* Documentation sections */}
      <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
        {project.sections.map((section, i) => (
          <div key={i}>
            <TerminalPrompt command={section.command} />
            <div className="surface-card" style={{ marginTop: '0.5rem' }}>
              <pre
                style={{
                  fontSize: '0.8rem',
                  lineHeight: '1.7',
                  color: 'var(--color-text)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {section.content}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Trailing prompt */}
      <div style={{ marginTop: '2rem' }}>
        <div className="terminal-prompt">
          <span className="prompt-user">user</span>
          <span className="prompt-at"> @</span>
          <span className="prompt-host">krishbansal</span>
          <span className="prompt-colon"> : </span>
          <span className="prompt-path">~/deployments/{slug}$</span>
          <span className="blinking-cursor" />
        </div>
      </div>
    </main>
  )
}
