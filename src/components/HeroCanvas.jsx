import { useEffect, useRef } from 'react'

const LINK_DISTANCE = 145

export default function HeroCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const context = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const points = []
    let frame

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect()
      context.clearRect(0, 0, width, height)

      if (!reduceMotion) {
        for (const point of points) {
          point.x = (point.x + point.vx + width) % width
          point.y = (point.y + point.vy + height) % height
        }
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const distance = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y)
          if (distance >= LINK_DISTANCE) continue
          context.strokeStyle = `rgba(255,101,37,${0.18 * (1 - distance / LINK_DISTANCE)})`
          context.lineWidth = 1
          context.beginPath()
          context.moveTo(points[i].x, points[i].y)
          context.lineTo(points[j].x, points[j].y)
          context.stroke()
        }
      }

      context.fillStyle = 'rgba(231,233,238,.52)'
      for (const point of points) {
        context.beginPath()
        context.arc(point.x, point.y, 1.5, 0, Math.PI * 2)
        context.fill()
      }

      if (!reduceMotion) frame = requestAnimationFrame(draw)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = window.devicePixelRatio || 1
      canvas.width = rect.width * ratio
      canvas.height = rect.height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      points.length = 0
      const count = Math.min(100, Math.floor((rect.width * rect.height) / 11500))
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
        })
      }
      if (reduceMotion) draw() // static frame: nothing else will repaint after a resize
    }

    resize()
    if (!reduceMotion) draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas className="hero-canvas" ref={ref} aria-hidden="true" />
}
