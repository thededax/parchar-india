'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      // Dot follows instantly
      gsap.set(dot, { x: mouseX, y: mouseY })
      // Ring follows with spring lag
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.5, ease: 'power3.out' })
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const portfolioEl = target.closest('[data-cursor-portfolio]')
      if (portfolioEl) {
        gsap.to(ring, { scale: 3.5, backgroundColor: '#7A1E1E', borderColor: '#7A1E1E', duration: 0.4 })
        gsap.to(dot,  { scale: 0,   duration: 0.2 })
        return
      }

      const interactiveEl = target.closest('a, button, [data-cursor]')
      if (interactiveEl) {
        gsap.to(ring, { scale: 2.5, borderColor: '#D9942B', duration: 0.3 })
        gsap.to(dot,  { scale: 0,   duration: 0.2 })
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const portfolioEl = target.closest('[data-cursor-portfolio]')
      const interactiveEl = target.closest('a, button, [data-cursor]')

      if (portfolioEl || interactiveEl) {
        gsap.to(ring, { scale: 1, backgroundColor: 'transparent', borderColor: '#7A1E1E', duration: 0.3 })
        gsap.to(dot,  { scale: 1,   duration: 0.2 })
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <>
      {/* Dot — instant follower */}
      <div
        ref={dotRef}
        className="custom-cursor w-2 h-2 bg-vintage-maroon"
        style={{ top: 0, left: 0 }}
      />
      {/* Ring — spring follower */}
      <div
        ref={ringRef}
        className="custom-cursor w-10 h-10 border-2 border-vintage-maroon z-[9998]"
        style={{ top: 0, left: 0, backgroundColor: 'transparent', transition: 'background-color 0.3s, border-color 0.3s' }}
      />
    </>
  )
}
