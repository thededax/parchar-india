'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { WHY_US } from '@/constants/content'
import SectionLabel from '@/components/ui/SectionLabel'
import StampBadge from '@/components/ui/StampBadge'

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const bulletsRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const left    = leftRef.current
      const right   = rightRef.current
      const bullets = bulletsRef.current
      if (!section || !left || !right || !bullets) return

      // Split-screen parallax — panels move at different speeds
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(left,  { y: p * -60 })
          gsap.set(right, { y: p * -40 })
        },
      })

      // Bullets stagger in
      const items = bullets.querySelectorAll('li')
      gsap.fromTo(
        items,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.12,
          scrollTrigger: { trigger: bullets, start: 'top 82%', once: true },
        }
      )

      // Left border scaleY
      const borders = section.querySelectorAll('.bullet-border')
      gsap.fromTo(
        borders,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1, duration: 0.5, stagger: 0.12,
          scrollTrigger: { trigger: bullets, start: 'top 82%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t-8 border-b-8 border-vintage-maroon"
      id="why-us"
      aria-label="Why choose Parchar India"
    >
      <div className="flex flex-col md:flex-row">
        {/* Left — Maroon panel */}
        <div
          ref={leftRef}
          className="md:w-1/2 bg-vintage-maroon px-8 py-20 flex flex-col justify-center relative overflow-hidden"
        >
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

            {/* Rotating stamp */}
            <div className="flex items-center gap-6">
              <StampBadge size={96} text="Parchar India • Bihar's Best •" />
              <div>
                <p className="font-lato font-black text-[11px] uppercase tracking-[0.3em] text-vintage-amber">
                  Est. Bhagalpur
                </p>
                <p className="font-cinzel font-black text-vintage-cream text-2xl">2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Cream panel */}
        <div
          ref={rightRef}
          className="md:w-1/2 bg-vintage-cream px-8 py-20 flex flex-col justify-center"
        >
          <ul ref={bulletsRef} className="flex flex-col gap-8">
            {WHY_US.map((item, i) => (
              <li key={i} className="flex gap-5 relative pl-5 opacity-0">
                <div className="bullet-border absolute left-0 top-0 bottom-0 w-[3px] bg-vintage-amber" style={{ transform: 'scaleY(0)', transformOrigin: 'top' }} />
                <div>
                  <h3 className="font-cinzel font-black text-vintage-maroon text-lg mb-2 uppercase">
                    {item.icon} {item.title}
                  </h3>
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
