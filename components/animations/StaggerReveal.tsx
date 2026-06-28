'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface StaggerRevealProps {
  children: React.ReactNode
  stagger?: number
  delay?: number
  y?: number
  className?: string
}

export default function StaggerReveal({
  children,
  stagger = 0.1,
  delay = 0,
  y = 30,
  className = '',
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const ctx = gsap.context(() => {
      const childrenList = Array.from(container.children)
      gsap.fromTo(
        childrenList,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          stagger,
          ease: 'parchar.reveal',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [stagger, delay, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
