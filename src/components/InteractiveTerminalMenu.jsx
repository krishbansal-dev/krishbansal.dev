import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const ALL_PATHWAYS = [
  { id: 'home', cmd: 'cd ~/', label: 'Return to system boot / home', path: '/' },
  { id: 'about', cmd: 'cd ~/about', label: 'Explore bio & system status', path: '/about' },
  { id: 'credentials', cmd: 'cd ~/credentials', label: 'View academics & certifications', path: '/credentials' },
  { id: 'deployments', cmd: 'cd ~/deployments', label: 'Browse projects & deployments', path: '/deployments' },
  { id: 'network', cmd: 'cd ~/network', label: 'Get in touch & social links', path: '/network' },
]

export default function InteractiveTerminalMenu({ path }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isNavigating, setIsNavigating] = useState(false)
  const [typedText, setTypedText] = useState('')

  // Determine current active section from location path
  const currentPath = location.pathname

  // Filter out the active page to present the other 4 non-opened sections
  const filteredPathways = ALL_PATHWAYS.filter((p) => {
    if (p.path === '/' && currentPath === '/') return false
    if (p.path !== '/' && currentPath.startsWith(p.path)) return false
    return true
  })

  // Map remaining 3 options to sequential CLI keys: '1', '2', '3'
  const menuOptions = filteredPathways.map((opt, index) => ({
    ...opt,
    key: String(index + 1),
  }))

  const handleOptionClick = (option) => {
    if (isNavigating) return
    setIsNavigating(true)

    let currentText = ''
    const commandToType = option.cmd
    let charIndex = 0

    const interval = setInterval(() => {
      if (charIndex < commandToType.length) {
        currentText += commandToType[charIndex]
        setTypedText(currentText)
        charIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          navigate(option.path)
          setIsNavigating(false) // Reset navigation state for new page mount
        }, 250)
      }
    }, 35)
  }

  // Keyboard shortcut listener for numeric CLI inputs [1, 2, 3]
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isNavigating) return
      // Match key 1, 2, or 3
      const option = menuOptions.find((opt) => opt.key === e.key)
      if (option) {
        e.preventDefault()
        handleOptionClick(option)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isNavigating, menuOptions])

  return (
    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {/* Interactive terminal prompt */}
      <div className="terminal-prompt" style={{ fontSize: '0.875rem', fontWeight: 700 }}>
        <span className="prompt-user">user</span>
        <span className="prompt-at">@</span>
        <span className="prompt-host">krishbansal</span>
        <span className="prompt-colon">:</span>
        <span className="prompt-path">{path}</span>
        {isNavigating ? (
          <>
            <span className="prompt-cmd text-primary" style={{ fontWeight: 'bold', marginLeft: '0.5rem' }}>
              {typedText}
            </span>
            <span className="blinking-cursor" />
          </>
        ) : (
          <>
            <span className="blinking-cursor" />
          </>
        )}
      </div>

      {/* Dynamic clickable selection menu */}
      {!isNavigating && (
        <div
          style={{
            marginTop: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            animation: 'fadeIn 0.5s ease forwards',
          }}
        >
          <p style={{ color: 'var(--color-text-dim)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
            SELECT A PATHWAY OR CLICK A COMMAND (OR PRESS {menuOptions.map((o) => o.key).join(', ')}):
          </p>
          {menuOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => handleOptionClick(opt)}
              className="cli-menu-btn"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                textAlign: 'left',
                padding: '0.4rem 0.6rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                borderLeft: '2px solid transparent',
                whiteSpace: 'nowrap',
                flexWrap: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)'
                e.currentTarget.style.background = 'rgba(57, 255, 20, 0.05)'
                e.currentTarget.style.borderLeftColor = 'var(--color-primary)'
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text)'
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.borderLeftColor = 'transparent'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              <span className="text-primary" style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
                [{opt.key}]
              </span>
              <span style={{ fontWeight: 'bold', marginRight: '1rem' }}>{opt.cmd}</span>
              <span style={{ color: 'var(--color-text-dim)', fontSize: '0.8rem' }}>
                --&gt; {opt.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
