import { useEffect, useRef } from 'react'

export default function NeuralCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animId
        let mouse = { x: null, y: null }

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })
        window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null })

        const NODE_COUNT = 80
        const MAX_DIST = 160
        const nodes = Array.from({ length: NODE_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 2 + 1,
        }))

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Mouse interaction
            nodes.forEach(n => {
                if (mouse.x !== null) {
                    const dx = mouse.x - n.x
                    const dy = mouse.y - n.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 200) {
                        n.vx += dx * 0.00008
                        n.vy += dy * 0.00008
                    }
                }
                n.x += n.vx
                n.y += n.vy
                n.vx *= 0.99
                n.vy *= 0.99
                if (n.x < 0 || n.x > canvas.width) n.vx *= -1
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1
            })

            // Draw edges
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x
                    const dy = nodes[i].y - nodes[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < MAX_DIST) {
                        const alpha = (1 - dist / MAX_DIST) * 0.25
                        const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
                        grad.addColorStop(0, `rgba(0,242,255,${alpha})`)
                        grad.addColorStop(1, `rgba(112,0,255,${alpha})`)
                        ctx.beginPath()
                        ctx.moveTo(nodes[i].x, nodes[i].y)
                        ctx.lineTo(nodes[j].x, nodes[j].y)
                        ctx.strokeStyle = grad
                        ctx.lineWidth = 0.8
                        ctx.stroke()
                    }
                }
            }

            // Draw nodes
            nodes.forEach(n => {
                ctx.beginPath()
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(0,242,255,0.6)'
                ctx.shadowColor = '#00F2FF'
                ctx.shadowBlur = 8
                ctx.fill()
                ctx.shadowBlur = 0
            })

            animId = requestAnimationFrame(draw)
        }
        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed', top: 0, left: 0,
                width: '100%', height: '100%',
                zIndex: 0, pointerEvents: 'none',
                opacity: 0.45,
            }}
        />
    )
}
