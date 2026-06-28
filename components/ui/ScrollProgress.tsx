'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    }, bar)

    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-vintage-amber origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

