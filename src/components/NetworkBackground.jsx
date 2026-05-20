import { useEffect, useRef } from 'react'

const LABELS = ['SYS_OK', 'ETH0', 'SRV_A', 'SRV_B', 'PING', 'ACK', '[200]', '>_', 'NAT', 'IP:10.0.1.4', 'PORT:80', 'DB_OK', 'TX_ERR:0', 'RX_BPS:142k']

export default function NetworkBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let particles = []
    const mouse = { x: null, y: null, radius: 180 }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      const area = canvas.width * canvas.height
      // Scale number of particles based on screen resolution
      const particleCount = Math.min(65, Math.floor(area / 25000))
      particles = []

      for (let i = 0; i < particleCount; i++) {
        // Mix neon green and high-tech cyber cyan
        const isCyan = Math.random() < 0.35
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.55 + 0.35,
          color: isCyan ? '190, 100%, 50%' : '120, 100%, 50%',
          label: Math.random() < 0.22 ? LABELS[Math.floor(Math.random() * LABELS.length)] : null,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
          pingRingActive: Math.random() < 0.25, // 25% of nodes have radar pings
          pingRingRadius: 0,
          pingRingTimer: Math.random() * 200,
        })
      }
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top
      
      // Spawn a dynamic shockwave burst of micro packets
      const burstCount = 12
      for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 2.0 + 0.6
        particles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 1.2 + 0.8,
          alpha: 0.9,
          decay: Math.random() * 0.02 + 0.012,
          color: Math.random() < 0.5 ? '190, 100%, 50%' : '120, 100%, 50%',
          label: null,
          isBurst: true,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.05,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw subtle background grid pattern
      const gridSize = 100
      ctx.strokeStyle = 'rgba(57, 255, 20, 0.012)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Filter decayed burst particles
      particles = particles.filter((p) => {
        if (p.isBurst) {
          p.alpha -= p.decay
          return p.alpha > 0
        }
        return true
      })

      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.14 * Math.min(p1.alpha, p2.alpha)
            ctx.strokeStyle = `hsla(120, 100%, 50%, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Draw interactive mouse connections and calculate subtle drag pull
      if (mouse.x !== null && mouse.y !== null) {
        particles.forEach((p) => {
          const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y)
          if (dist < mouse.radius) {
            const connectionAlpha = (1 - dist / mouse.radius) * 0.28 * p.alpha
            ctx.strokeStyle = `hsla(190, 100%, 50%, ${connectionAlpha})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()

            // Faint gravity attraction to cursor for non-burst packets
            if (!p.isBurst) {
              const force = (mouse.radius - dist) / mouse.radius * 0.04
              p.vx += (mouse.x - p.x) / dist * force
              p.vy += (mouse.y - p.y) / dist * force
              
              // Apply physical terminal friction speed limit
              const speed = Math.hypot(p.vx, p.vy)
              const maxSpeed = 1.2
              if (speed > maxSpeed) {
                p.vx = (p.vx / speed) * maxSpeed
                p.vy = (p.vy / speed) * maxSpeed
              }
            }
          }
        })
      }

      // Update and draw particles
      particles.forEach((p) => {
        // Move particle
        p.x += p.vx
        p.y += p.vy

        // Bound collision
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Keep inside bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x))
        p.y = Math.max(0, Math.min(canvas.height, p.y))

        // Pulse logic
        p.pulsePhase += p.pulseSpeed
        const pulse = Math.sin(p.pulsePhase) * 0.15 + 0.85
        const currentAlpha = p.alpha * pulse

        // Draw Radar Radar sweep ring for labeled system hubs
        if (p.pingRingActive && !p.isBurst) {
          p.pingRingTimer++
          if (p.pingRingTimer > 280) { // radar sweep trigger
            p.pingRingRadius = 1
            p.pingRingTimer = 0
          }
          if (p.pingRingRadius > 0) {
            p.pingRingRadius += 0.45
            const ringAlpha = (1 - p.pingRingRadius / 50) * 0.22 * currentAlpha
            if (ringAlpha > 0) {
              ctx.strokeStyle = `hsla(${p.color}, ${ringAlpha})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.arc(p.x, p.y, p.pingRingRadius, 0, Math.PI * 2)
              ctx.stroke()
            } else {
              p.pingRingRadius = 0
            }
          }
        }

        // Draw node based on infrastructure role
        if (p.label) {
          // Draw high-fidelity technical system hub box
          ctx.fillStyle = `hsla(${p.color}, ${currentAlpha})`
          ctx.fillRect(p.x - 2, p.y - 2, 4, 4)

          // Box node glow
          ctx.fillStyle = `hsla(${p.color}, ${currentAlpha * 0.22})`
          ctx.fillRect(p.x - 4, p.y - 4, 8, 8)
          
          // Bracket outlines [ ]
          ctx.strokeStyle = `hsla(${p.color}, ${currentAlpha * 0.35})`
          ctx.lineWidth = 0.5
          // Left Bracket
          ctx.beginPath()
          ctx.moveTo(p.x - 6, p.y - 6)
          ctx.lineTo(p.x - 9, p.y - 6)
          ctx.lineTo(p.x - 9, p.y + 6)
          ctx.lineTo(p.x - 6, p.y + 6)
          ctx.stroke()
          // Right Bracket
          ctx.beginPath()
          ctx.moveTo(p.x + 6, p.y - 6)
          ctx.lineTo(p.x + 9, p.y - 6)
          ctx.lineTo(p.x + 9, p.y + 6)
          ctx.lineTo(p.x + 6, p.y + 6)
          ctx.stroke()
        } else {
          // Standard circular packet node
          ctx.fillStyle = `hsla(${p.color}, ${currentAlpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2)
          ctx.fill()

          // Pulse node glow
          ctx.fillStyle = `hsla(${p.color}, ${currentAlpha * 0.15})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 3 * pulse, 0, Math.PI * 2)
          ctx.fill()
        }

        // Micro technical text overlay
        if (p.label) {
          ctx.fillStyle = `hsla(${p.color}, ${currentAlpha * 0.6})`
          ctx.font = '8px "JetBrains Mono", monospace'
          ctx.fillText(p.label, p.x + 12, p.y + 3)
        }
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    // Bind event listeners
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('click', handleCanvasClick)
    
    resizeCanvas()
    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('click', handleCanvasClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="network-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Render safely behind the text and page elements
        pointerEvents: 'none',
        opacity: 0.55, // Beautiful, visible yet elegant opacity
      }}
    />
  )
}
