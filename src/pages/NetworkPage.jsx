import { useEffect, useState } from 'react'
import TerminalPrompt from '../components/TerminalPrompt'
import usePageMeta from '../hooks/usePageMeta'

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/krishbansal-dev',
    icon: 'code',
    desc: 'github.com/krishbansal-dev',
    type: 'link',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/krishbansal-dev/',
    icon: 'person',
    desc: 'linkedin.com/in/krishbansal-dev',
    type: 'link',
  },
  {
    label: 'Email',
    href: 'mailto:contact@krishbansal.dev',
    icon: 'mail',
    desc: 'contact@krishbansal.dev',
    type: 'email',
    copyValue: 'contact@krishbansal.dev',
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/krish4b',
    icon: 'alternate_email',
    desc: 'x.com/krish4b',
    type: 'link',
  },
  {
    label: 'Discord',
    href: 'https://discordapp.com/users/715624445544235019',
    icon: 'forum',
    desc: 'discordapp.com/users/715624445544235019',
    type: 'link',
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/N0JRtpSDDl/',
    icon: 'trophy',
    desc: 'leetcode.com/u/N0JRtpSDDl',
    type: 'link',
  },
]

export default function NetworkPage() {
  usePageMeta(
    'Connect with Krish Bansal — GitHub, LinkedIn, Email | krishbansal.dev',
    'Get in touch with Krish Bansal via GitHub, LinkedIn, or email. Open to collaboration on infrastructure, full-stack, and WebRTC projects.'
  )
  const [show, setShow] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleEmailClick = async (e, copyValue) => {
    // Don't prevent default — let mailto: try to open mail client
    // Also copy to clipboard as fallback
    try {
      await navigator.clipboard.writeText(copyValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = copyValue
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <main
      className="page-content page-enter"
      id="page-network"
      style={{ opacity: show ? 1 : 0, transition: 'opacity 0.4s ease' }}
    >
      <TerminalPrompt command="cat ~/network/connections.conf" />

      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--color-text-dim)',
          marginTop: '0.5rem',
          lineHeight: '1.6',
        }}
      >
        # Establishing connection... Run any of the following to connect.
      </p>

      <div
        className="stagger-children"
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem' }}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="network-link"
            target={link.type === 'link' ? '_blank' : '_self'}
            rel="noopener noreferrer"
            id={`network-${link.label.toLowerCase()}`}
            onClick={link.type === 'email' ? (e) => handleEmailClick(e, link.copyValue) : undefined}
            style={{ cursor: 'pointer' }}
          >
            <span className="material-symbols-outlined link-icon">{link.icon}</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{link.label}</span>
              <span style={{
                fontSize: '0.75rem',
                color: link.type === 'email' && copied ? 'var(--color-primary)' : 'var(--color-text-dim)',
                transition: 'color 0.2s ease',
              }}>
                {link.type === 'email' && copied ? '✓ Copied to clipboard!' : link.desc}
              </span>
            </div>
            <span className="material-symbols-outlined link-arrow">
              {link.type === 'email' ? (copied ? 'check' : 'content_copy') : 'arrow_forward'}
            </span>
          </a>
        ))}
      </div>

      <div
        className="surface-card"
        style={{ marginTop: '2rem', textAlign: 'center', padding: '2rem' }}
        id="connection-status"
      >
        <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
          CONNECTION STATUS
        </p>
        <p className="text-primary" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
          ● ONLINE — READY TO CONNECT
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', marginTop: '0.5rem' }}>
          Response time: &lt; 24h | Preferred: Email
        </p>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <div className="terminal-prompt">
          <span className="prompt-user">user</span>
          <span className="prompt-at"> @</span>
          <span className="prompt-host">krishbansal</span>
          <span className="prompt-colon"> : </span>
          <span className="prompt-path">~/network$</span>
          <span className="blinking-cursor" />
        </div>
      </div>
    </main>
  )
}
