import { useEffect, useState } from 'react'
import TerminalPrompt from '../components/TerminalPrompt'

const skills = [
  { name: 'Bare Metal Hosting', icon: 'dns',      bar: '█████████░', branch: '├──' },
  { name: 'Server Management',  icon: 'terminal',  bar: '████████░░', branch: '├──' },
  { name: 'Website Hosting',    icon: 'language',   bar: '███████░░░', branch: '├──' },
  { name: 'Full Stack',         icon: 'code',       bar: '████████░░', branch: '├──' },
  { name: 'AI',                 icon: 'memory',     bar: '█████░░░░░', branch: '├──' },
  { name: 'Automations',        icon: 'settings',   bar: '███████░░░', branch: '└──' },
]

const statusItems = [
  { label: 'CPU_LOAD', value: '[███░░░░░░░] 32%', color: 'green' },
  { label: 'MEM_USAGE', value: '[████████░░] 78%', color: 'red' },
  { label: 'UPTIME', value: '98 Days, 14:22:11', color: '' },
  { label: 'COFFEE', value: '[██████████] 100%', color: 'green' },
]

export default function AboutPage() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <main
      className="page-content page-enter"
      id="page-about"
      style={{ opacity: show ? 1 : 0, transition: 'opacity 0.4s ease' }}
    >
      <div className="two-col">
        {/* LEFT COLUMN: Bio + Status */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Bio */}
          <div>
            <TerminalPrompt command="cat bio.txt" />
            <div className="surface-card" style={{ marginTop: '0.75rem' }} id="bio-card">
              <p style={{ fontSize: '0.85rem', lineHeight: '1.7', marginBottom: '1rem', color: 'var(--color-text)' }}>
                Student, tech enthusiast passionate about tech and digital infra. I specialize in building
                robust, bare-metal server environments, full-stack applications, and automated workflows.
              </p>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.7', color: 'var(--color-text)' }}>
                My philosophy centers on raw performance, reducing abstractions where they aren't needed,
                and understanding systems from the metal up. Whether it's configuring a hypervisor or
                deploying a highly available web service, I value precision and reliability.
              </p>
            </div>
          </div>

          {/* System Status */}
          <div>
            <TerminalPrompt command="system_status --overview" />
            <div className="status-block stagger-children" style={{ marginTop: '0.75rem' }} id="system-status">
              {statusItems.map((item) => (
                <div className="status-row" key={item.label}>
                  <span className="status-label">{item.label}:</span>
                  <span className={`status-value ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Expertise Tree */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TerminalPrompt command="tree ~/expertise" />

          <div style={{ display: 'flex', flexDirection: 'column' }} id="expertise-tree">
            <div className="text-primary" style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              ~/expertise
            </div>

            <div className="stagger-children">
              {skills.map((skill) => (
                <div className="tree-node" key={skill.name}>
                  <div className="tree-node-left">
                    <span className="tree-branch">{skill.branch}</span>
                    <span className="material-symbols-outlined tree-icon">{skill.icon}</span>
                    <span>{skill.name}</span>
                  </div>
                  <span className="tree-bar">[{skill.bar}]</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1rem' }}>
              <div className="terminal-prompt">
                <span className="prompt-user">user</span>
                <span className="prompt-at"> @</span>
                <span className="prompt-host">krishbansal</span>
                <span className="prompt-colon"> : </span>
                <span className="prompt-path">~/expertise$</span>
                <span className="blinking-cursor" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
