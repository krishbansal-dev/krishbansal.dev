import { useEffect, useState } from 'react'
import TerminalPrompt from '../components/TerminalPrompt'
import usePageMeta from '../hooks/usePageMeta'

const ASCII_ART = ` _  __      _     _       _                       _   
| |/ /     (_)   | |     | |                     | |  
| ' /_ __ _ _ ___| |__   | |__   __ _ _ __  ___  | |  
|  <| '__| | / __| '_ \\  | '_ \\ / _\` | '_ \\/ __| | |  
| . \\ |  | | \\__ \\ | | | | |_) | (_| | | | \\__ \\ | |  
|_|\\_\\_|  |_|_|___/_| |_| |_.__/ \\__,_|_| |_|___/ |_|  
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

export default function InitPage() {
  usePageMeta(
    'Krish Bansal — Infrastructure Engineer & Full-Stack Developer | krishbansal.dev',
    'Krish Bansal is a student and infrastructure engineer specializing in bare-metal servers, full-stack development, automation, and AI.'
  )
  const [bootComplete, setBootComplete] = useState(false)
  const [visibleBoot, setVisibleBoot] = useState([])
  const [showStatus, setShowStatus] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showAscii, setShowAscii] = useState(false)
  const [visibleInfo, setVisibleInfo] = useState([])

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
            {infoLines.map((line, i) => (
              <p
                key={i}
                style={{
                  opacity: visibleInfo.includes(i) ? 1 : 0,
                  transform: visibleInfo.includes(i) ? 'translateY(0)' : 'translateY(4px)',
                  transition: 'all 0.4s ease',
                }}
              >
                {i === infoLines.length - 1 ? (
                  <>
                    {line}
                    <span className="blinking-cursor" />
                  </>
                ) : (
                  line
                )}
              </p>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
