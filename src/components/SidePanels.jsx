import { useEffect, useState } from 'react'

const DOT_SEQUENCES = [
  '.',
  '..',
  '...',
  '..',
  '.',
  ' ',
]

export default function SidePanels() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1)
    }, 350)
    return () => clearInterval(interval)
  }, [])

  // Left rail dot states (offset sequentially to flow downward)
  const leftDots = Array.from({ length: 10 }, (_, i) => {
    const seqIndex = (tick - i + DOT_SEQUENCES.length * 2) % DOT_SEQUENCES.length
    return DOT_SEQUENCES[seqIndex]
  })

  // Right rail dot states (offset differently to create dynamic symmetry)
  const rightDots = Array.from({ length: 10 }, (_, i) => {
    const seqIndex = (tick + i) % DOT_SEQUENCES.length
    return DOT_SEQUENCES[seqIndex]
  })

  return (
    <div className="side-panels-container">
      {/* LEFT TYPOGRAPHICAL DOT RAIL */}
      <div className="dot-rail dot-rail-left">
        <div className="dot-rail-bracket dot-rail-top">┌</div>
        <div className="dot-rail-body">
          {leftDots.map((dotsText, idx) => (
            <div key={idx} className="dot-matrix-row">
              <span className="dot-matrix-index">{(idx + 1).toString().padStart(2, '0')}</span>
              <span className="dot-matrix-value">{dotsText}</span>
            </div>
          ))}
        </div>
        <div className="dot-rail-bracket dot-rail-bottom">└</div>
      </div>

      {/* RIGHT TYPOGRAPHICAL DOT RAIL */}
      <div className="dot-rail dot-rail-right">
        <div className="dot-rail-bracket dot-rail-top">┐</div>
        <div className="dot-rail-body">
          {rightDots.map((dotsText, idx) => (
            <div key={idx} className="dot-matrix-row">
              <span className="dot-matrix-value">{dotsText}</span>
              <span className="dot-matrix-index">{(idx + 1).toString().padStart(2, '0')}</span>
            </div>
          ))}
        </div>
        <div className="dot-rail-bracket dot-rail-bottom">┘</div>
      </div>
    </div>
  )
}
