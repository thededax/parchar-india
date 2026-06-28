'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { PORTFOLIO_ITEMS } from '@/constants/content'
import SectionLabel from '@/components/ui/SectionLabel'

const CARD_COLORS = ['#7A1E1E', '#D9942B', '#1F3D2E', '#282B2B', '#7A1E1E']

export default function PortfolioTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const track   = trackRef.current
      if (!section || !track) return

      // HORIZONTAL SCROLL — the signature "wow" moment
      const cards = gsap.utils.toArray<HTMLElement>('.portfolio-card')

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 64) + 'px',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      // Scale active card as it reaches center
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.85 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              containerAnimation: tween,
              trigger: card,
              start: 'center right',
              end: 'center center',
              scrub: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-vintage-cream overflow-hidden"
      id="portfolio"
      aria-label="Portfolio teaser"
    >
      {/* Section header — visible before pin */}
      <div className="px-5 md:px-8 pt-24 pb-8">
        <SectionLabel className="mb-6">Our Work</SectionLabel>
        <div className="flex items-end justify-between">
          <h2 className="font-cinzel font-black text-h2 text-vintage-maroon uppercase leading-none">
            Selected<br />
            <span className="text-vintage-amber">Portfolio</span>
          </h2>
          <Link href="/portfolio" className="font-lato font-black text-xs uppercase tracking-widest text-vintage-maroon border-b-2 border-vintage-amber pb-1 hover:text-vintage-amber transition-colors">
            View All Work →
          </Link>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div className="flex gap-6 px-5 md:px-8 pb-24" ref={trackRef} style={{ width: 'max-content' }}>
        {PORTFOLIO_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className="portfolio-card relative flex-shrink-0 w-[75vw] md:w-[50vw] lg:w-[38vw] h-[60vh] md:h-[70vh] overflow-hidden brutalist-border group cursor-pointer"
            data-cursor-portfolio
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-halftone-maroon transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundColor: CARD_COLORS[i % CARD_COLORS.length], opacity: 0.9 }}
            />

            {/* Portfolio overlay */}
            <div className="portfolio-overlay absolute inset-0 bg-vintage-maroon/80 flex flex-col justify-end p-6 z-10">
              <span className="font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-amber mb-2">
                {item.category}
              </span>
              <h3 className="font-cinzel font-black text-vintage-cream text-2xl uppercase mb-2">
                {item.title}
              </h3>
              <p className="font-lato text-vintage-cream/80 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="inline-flex items-center gap-2 bg-vintage-amber text-vintage-charcoal font-lato font-black text-xs uppercase tracking-widest px-4 py-2 self-start">
                {item.result} →
              </div>
            </div>

            {/* Card number watermark */}
            <div className="absolute top-6 left-6 font-cinzel font-black text-6xl opacity-10 text-vintage-cream select-none pointer-events-none">
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Bottom info (visible by default) */}
            <div className="absolute bottom-6 left-6 right-6 z-20 group-hover:opacity-0 transition-opacity">
              <span className="font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-amber">
                {item.category}
              </span>
              <h3 className="font-cinzel font-black text-vintage-cream text-xl uppercase mt-1">
                {item.title}
              </h3>
            </div>

            {/* Tags */}
            <div className="absolute top-6 right-6 flex flex-wrap gap-1.5 justify-end">
              {item.tags.map(tag => (
                <span key={tag} className="font-lato font-black text-[9px] uppercase tracking-widest bg-vintage-amber text-vintage-charcoal px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
