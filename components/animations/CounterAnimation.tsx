'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface CounterAnimationProps {
  target: number
  suffix?: string
  duration?: number
  className?: string
}

export default function CounterAnimation({
  target,
  suffix = '',
  duration = 2.5,
  className = '',
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const obj = { value: 0 }

      gsap.to(obj, {
        value: target,
        duration,
        ease: 'power2.out',
        roundProps: 'value',
        onUpdate: () => {
          el.textContent = obj.value + suffix
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [target, suffix, duration])

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}
