import { useEffect, useState } from 'react'
import TerminalPrompt from '../components/TerminalPrompt'
import InteractiveTerminalMenu from '../components/InteractiveTerminalMenu'
import usePageMeta from '../hooks/usePageMeta'

const ASCII_ART = `  _  __     _     _       _                           _ 
 | |/ /_ __(_)___| |__   | |__   __ _ _ __  ___  __ _| |
 | ' /| '__| / __| '_ \\  | '_ \\ / _\` | '_ \\/ __|/ _\` | |
 | . \\| |  | \\__ \\ | | | | |_) | (_| | | | \\__ \\ (_| | |
 |_|\\_\\_|  |_|___/_| |_| |_.__/ \\__,_|_| |_|___/\\__,_|_|
`

const bootLines = [
  'KERNEL LOADED...',
  'COMPUTE RESOURCES: ALLOCATED...',
  'INITIALIZING SYSTEM...',
]

const infoLines = [
  '> INITIALIZING USER PROFILE...',
  '> SPECIALIZATION: INFRASTRUCTURE, FULL STACK & AUTOMATIONS',
  '> AWAITING COMMAND',
]

export default function InitPage() {
  usePageMeta(
    'Krish Bansal | Infrastructure Engineer & Full-Stack Developer',
    'Krish Bansal is a student and infrastructure engineer specializing in bare-metal servers, full-stack development, automation, and AI.'
  )
  const [bootComplete, setBootComplete] = useState(false)
  const [visibleBoot, setVisibleBoot] = useState([])
  const [showStatus, setShowStatus] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showAscii, setShowAscii] = useState(false)
  const [visibleInfo, setVisibleInfo] = useState([])
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const dotSequence = ['.', '..', '...']
    let idx = 0
    const interval = setInterval(() => {
      idx = (idx + 1) % dotSequence.length
      setDots(dotSequence[idx])
    }, 500)
    return () => clearInterval(interval)
  }, [])

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
      <h1 className="sr-only">Krish Bansal</h1>
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
            SYSTEM INITIALIZED...
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
                {line === '> AWAITING COMMAND' ? `> AWAITING COMMAND ${dots}` : line}
              </p>
            ))}

            {/* Reusable Interactive Selection Menu at the boot termination */}
            {visibleInfo.includes(infoLines.length - 1) && (
              <InteractiveTerminalMenu path="~" />
            )}
          </div>
        </div>
      )}
    </main>
  )
}

