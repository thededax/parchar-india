'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { STATS } from '@/constants/content'
import SectionLabel from '@/components/ui/SectionLabel'
import CounterAnimation from '@/components/animations/CounterAnimation'

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = sectionRef.current?.querySelectorAll('.stat-underline')
      if (!lines) return
      gsap.fromTo(
        lines,
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-5 md:px-8 bg-vintage-cream border-t-8 border-b-8 border-vintage-maroon"
      id="stats"
      aria-label="Company statistics"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel className="mb-16">By The Numbers</SectionLabel>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="font-cinzel font-black text-vintage-maroon leading-none mb-3"
                style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)' }}>
                <CounterAnimation
                  target={stat.value}
                  suffix={stat.suffix}
                  className="text-vintage-maroon"
                />
              </div>
              <div className="stat-underline h-[3px] bg-vintage-amber mx-auto mb-3" style={{ width: '60%', transform: 'scaleX(0)' }} />
              <h3 className="font-cinzel font-black text-base text-vintage-maroon uppercase tracking-wide mb-1">
                {stat.label}
              </h3>
              <p className="font-lato text-vintage-charcoal/60 text-xs tracking-widest uppercase">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
