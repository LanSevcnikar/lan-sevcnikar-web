import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const context = canvas.getContext('2d')
    const points = []
    let frame
    const resize = () => {
      const rect = canvas.getBoundingClientRect(); const ratio = window.devicePixelRatio || 1
      canvas.width = rect.width * ratio; canvas.height = rect.height * ratio; context.scale(ratio, ratio)
      points.length = 0
      for (let i = 0; i < Math.min(100, Math.floor(rect.width * rect.height / 11500)); i++) points.push({ x: Math.random() * rect.width, y: Math.random() * rect.height, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 })
    }
    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect(); context.clearRect(0, 0, width, height)
      for (const point of points) { point.x = (point.x + point.vx + width) % width; point.y = (point.y + point.vy + height) % height }
      for (let i = 0; i < points.length; i++) for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x, dy = points[i].y - points[j].y, distance = Math.hypot(dx, dy)
        if (distance < 145) { context.strokeStyle = `rgba(255,101,37,${.18 * (1 - distance / 145)})`; context.lineWidth = 1; context.beginPath(); context.moveTo(points[i].x, points[i].y); context.lineTo(points[j].x, points[j].y); context.stroke() }
      }
      context.fillStyle = 'rgba(231,233,238,.52)'; for (const point of points) { context.beginPath(); context.arc(point.x, point.y, 1.5, 0, Math.PI * 2); context.fill() }
      frame = requestAnimationFrame(draw)
    }
    resize(); draw(); window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas className="hero-canvas" ref={ref} aria-hidden="true" />
}
