'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface FadeSlideUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
  once?: boolean
}

export default function FadeSlideUp({
  children,
  delay = 0,
  duration = 0.8,
  y = 40,
  className = '',
  once = true,
}: FadeSlideUpProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'parchar.reveal',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [delay, duration, y, once])

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
