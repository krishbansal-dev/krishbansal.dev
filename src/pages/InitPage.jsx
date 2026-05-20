import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TerminalPrompt from '../components/TerminalPrompt'
import usePageMeta from '../hooks/usePageMeta'

const ASCII_ART = ` _  __      _     _       _                           _   
| |/ /     (_)   | |     | |                         | |  
| ' /_ __ _ _ ___| |__   | |__   __ _ _ __  ___   __ _  | |  
|  <| '__| | / __| '_ \\  | '_ \\ / _\` | '_ \\/ __| / _\` | | |  
| . \\ |  | | \\__ \\ | | | | |_) | (_| | | | \\__ \\ (_| | | |  
|_|\\_\\_|  |_|_|___/_| |_| |_.__/ \\__,_|_| |_|___/\\__,_|_|  
`

const bootLines = [
  'KERNEL LOADED...',
  'BARE METAL RESOURCES: ALLOCATED...',
  'INITIALIZING SYSTEM...',
]

const infoLines = [
  '> INITIALIZING USER PROFILE...',
  '> SPECIALIZATION: INFRASTRUCTURE & BARE METAL',
  '> AWAITING COMMAND',
]

const menuOptions = [
  { key: '1', cmd: 'cd ~/about', label: 'Explore bio & system status', path: '/about' },
  { key: '2', cmd: 'cd ~/deployments', label: 'Browse projects & deployments', path: '/deployments' },
  { key: '3', cmd: 'cd ~/network', label: 'Get in touch & social links', path: '/network' },
]

export default function InitPage() {
  usePageMeta(
    'Krish Bansal — Infrastructure Engineer & Full-Stack Developer | krishbansal.dev',
    'Krish Bansal is a student and infrastructure engineer specializing in bare-metal servers, full-stack development, automation, and AI.'
  )
  const navigate = useNavigate()
  const [bootComplete, setBootComplete] = useState(false)
  const [visibleBoot, setVisibleBoot] = useState([])
  const [showStatus, setShowStatus] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showAscii, setShowAscii] = useState(false)
  const [visibleInfo, setVisibleInfo] = useState([])
  
  const [isNavigating, setIsNavigating] = useState(false)
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    // Stagger boot lines
    bootLines.forEach((_, i) => {
      setTimeout(() => {
        setVisibleBoot((prev) => [...prev, i])
        if (i === bootLines.length - 1) {
          setTimeout(() => {
            setShowStatus(true)
            setTimeout(() => {
              setShowPrompt(true)
              setTimeout(() => {
                setShowAscii(true)
                // Stagger info lines inside the box
                infoLines.forEach((_, j) => {
                  setTimeout(() => {
                    setVisibleInfo((prev) => [...prev, j])
                  }, 400 + j * 300)
                })
              }, 300)
            }, 200)
          }, 300)
        }
      }, i * 350)
    })
  }, [])

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
        }, 300)
      }
    }, 45)
  }

  return (
    <main className="page-content page-enter" id="page-init">
      {/* Boot Sequence */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
        {bootLines.map((line, i) => (
          <p
            key={i}
            style={{
              opacity: visibleBoot.includes(i) ? 1 : 0,
              transform: visibleBoot.includes(i) ? 'translateY(0)' : 'translateY(4px)',
              transition: 'all 0.3s ease',
            }}
          >
            {line}
          </p>
        ))}
        {showStatus && (
          <p
            className="text-primary"
            style={{
              opacity: 1,
              animation: 'fadeIn 0.3s ease forwards',
              fontWeight: 700,
            }}
          >
            SYSTEM STATUS: ONLINE...
          </p>
        )}
      </div>

      {/* Terminal Prompt */}
      {showPrompt && (
        <div style={{ marginTop: '2rem', animation: 'fadeIn 0.3s ease forwards' }}>
          <TerminalPrompt command="./run_intro.sh" />
        </div>
      )}

      {/* ASCII Art Block */}
      {showAscii && (
        <div
          className="ascii-container glitch-hover"
          style={{ marginTop: '1rem', animation: 'fadeIn 0.4s ease forwards' }}
          id="ascii-identity"
        >
          <pre className="ascii-art">{ASCII_ART}</pre>

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
            {infoLines.map((line, i) => {
              if (i === infoLines.length - 1) {
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <p
                      style={{
                        opacity: visibleInfo.includes(i) ? 1 : 0,
                        transform: visibleInfo.includes(i) ? 'translateY(0)' : 'translateY(4px)',
                        transition: 'all 0.4s ease',
                      }}
                    >
                      {isNavigating ? (
                        <>
                          {`> AWAITING COMMAND: `}
                          <span className="text-primary" style={{ fontWeight: 'bold' }}>{typedText}</span>
                          <span className="blinking-cursor" />
                        </>
                      ) : (
                        <>
                          {line}
                          <span className="blinking-cursor" />
                        </>
                      )}
                    </p>

                    {/* Interactive Selection Menu */}
                    {visibleInfo.includes(i) && !isNavigating && (
                      <div
                        style={{
                          marginTop: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                          animation: 'fadeIn 0.5s ease forwards',
                        }}
                      >
                        <p style={{ color: 'var(--color-text-dim)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                          SELECT A PATHWAY OR CLICK A COMMAND:
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

              return (
                <p
                  key={i}
                  style={{
                    opacity: visibleInfo.includes(i) ? 1 : 0,
                    transform: visibleInfo.includes(i) ? 'translateY(0)' : 'translateY(4px)',
                    transition: 'all 0.4s ease',
                  }}
                >
                  {line}
                </p>
              )
            })}
          </div>
        </div>
      )}
    </main>
  )
}
