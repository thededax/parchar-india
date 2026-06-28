'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface SectionLabelProps {
  children: string
  className?: string
  animate?: boolean
}

export default function SectionLabel({ children, className = '', animate = true }: SectionLabelProps) {
  const leftRef  = useRef<HTMLSpanElement>(null)
  const rightRef = useRef<HTMLSpanElement>(null)
  const textRef  = useRef<HTMLSpanElement>(null)
  const wrapRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate) return
    const wrap  = wrapRef.current
    const left  = leftRef.current
    const right = rightRef.current
    const text  = textRef.current
    if (!wrap || !left || !right || !text) return

    const ctx = gsap.context(() => {
      gsap.set([left, right], { scaleX: 0 })
      gsap.set(text, { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap, start: 'top 88%', once: true },
      })
      tl.to(left,  { scaleX: 1, transformOrigin: 'right', duration: 0.6, ease: 'power3.out' })
        .to(right, { scaleX: 1, transformOrigin: 'left',  duration: 0.6, ease: 'power3.out' }, '<')
        .to(text,  { opacity: 1, duration: 0.4 }, '-=0.2')
    }, wrap)

    return () => ctx.revert()
  }, [animate])

  return (
    <div ref={wrapRef} className={`flex items-center gap-3 ${className}`}>
      <span ref={leftRef}  className="flex-1 h-[2px] bg-vintage-amber block" />
      <span
        ref={textRef}
        className="font-lato font-black text-[11px] uppercase tracking-[0.35em] text-vintage-amber whitespace-nowrap"
      >
        {children}
      </span>
      <span ref={rightRef} className="flex-1 h-[2px] bg-vintage-amber block" />
    </div>
  )
}
