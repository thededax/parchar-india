'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { WHY_US } from '@/constants/content'
import SectionLabel from '@/components/ui/SectionLabel'
import StampBadge from '@/components/ui/StampBadge'

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const pin     = pinRef.current
      if (!section || !pin) return

      const items = gsap.utils.toArray<HTMLElement>('.why-item')
      const totalItems = items.length

      // Pin the section for totalItems * 100vh of scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalItems * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress
          const activeIndex = Math.min(
            Math.floor(progress * totalItems),
            totalItems - 1
          )

          items.forEach((item, i) => {
            if (i <= activeIndex) {
              gsap.to(item, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
              })
            } else {
              gsap.to(item, {
                opacity: 0.15,
                x: 40,
                scale: 0.97,
                duration: 0.4,
                ease: 'power2.out',
              })
            }
          })

          // Animate the counter display
          const counterEl = section.querySelector('.active-counter')
          if (counterEl) {
            counterEl.textContent = String(activeIndex + 1).padStart(2, '0')
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t-8 border-b-8 border-vintage-maroon why-section"
      id="why-us"
      aria-label="Why choose Parchar India"
    >
      <div ref={pinRef} className="flex flex-col md:flex-row min-h-screen">
        {/* Left — Maroon panel */}
        <div className="md:w-1/2 bg-vintage-maroon px-8 py-20 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-halftone-maroon opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <SectionLabel className="mb-8 opacity-60">
              The Difference
            </SectionLabel>
            <h2 className="font-cinzel font-black text-vintage-cream uppercase leading-none mb-8"
              style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
              WHY<br />
              <span className="text-vintage-amber">PARCHAR</span><br />
              INDIA?
            </h2>
            <p className="font-cormorant italic text-vintage-cream/80 text-xl mb-10">
              "We don't just post content. We craft cultural conversations that move Indian consumers to action."
            </p>

            {/* Active counter */}
            <div className="flex items-center gap-6">
              <div className="flex items-baseline gap-2">
                <span className="active-counter font-cinzel font-black text-vintage-amber text-6xl">01</span>
                <span className="font-lato font-black text-vintage-cream/40 text-2xl">/ {String(WHY_US.length).padStart(2, '0')}</span>
              </div>
              <StampBadge size={72} text="Parchar India • Bihar's Best •" />
            </div>
          </div>
        </div>

        {/* Right — Cream panel with pinned items */}
        <div className="md:w-1/2 bg-vintage-cream px-8 py-20 flex flex-col justify-center">
          <ul className="flex flex-col gap-8">
            {WHY_US.map((item, i) => (
              <li
                key={i}
                className="why-item flex gap-5 relative pl-6 transition-all duration-400"
                style={{ opacity: 0.15, transform: 'translateX(40px)' }}
              >
                {/* Left gold indicator bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-vintage-amber rounded-full" />

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-cinzel font-black text-vintage-amber text-sm">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-cinzel font-black text-vintage-maroon text-lg uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-lato text-vintage-charcoal/70 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
