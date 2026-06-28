'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { BRAND } from '@/constants/content'
import { useMagneticHover } from '@/hooks/useMagneticHover'
import { Phone, MessageCircle } from 'lucide-react'

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef   = useRef<SVGRectElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const ctaRef     = useMagneticHover(0.4) as React.RefObject<HTMLAnchorElement>

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const content = contentRef.current
      if (!section || !content) return

      // Content reveal
      gsap.fromTo(
        content.querySelectorAll('[data-reveal]'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'parchar.reveal',
          scrollTrigger: { trigger: section, start: 'top 70%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-5 md:px-8 bg-vintage-cream overflow-hidden final-cta-section"
      id="contact-cta"
      aria-label="Contact call to action"
    >
      <div className="absolute inset-0 bg-halftone opacity-40 pointer-events-none" />

      {/* Ornamental SVG Frame */}
      <svg
        className="absolute inset-8 md:inset-16 w-auto h-auto pointer-events-none"
        style={{ left: '5%', right: '5%', top: '5%', bottom: '5%', position: 'absolute' }}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          ref={frameRef}
          x="1" y="1" width="98" height="98"
          stroke="#D9942B" strokeWidth="1"
          strokeDasharray="400"
          strokeDashoffset="400"
          fill="none"
          className="cta-frame-path"
          style={{
            animation: 'drawFrame 2s ease-in-out forwards',
          }}
        />
      </svg>

      <style>{`
        @keyframes drawFrame {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <div ref={contentRef} className="relative z-10 max-w-3xl mx-auto text-center">
        <div data-reveal className="inline-block brutalist-border px-4 py-2 mb-8 bg-vintage-amber -rotate-1">
          <span className="font-lato font-black text-[11px] uppercase tracking-[0.3em] text-vintage-maroon">
            Ready to Begin?
          </span>
        </div>

        <h2
          data-reveal
          className="font-cinzel font-black uppercase leading-none text-vintage-maroon mb-6"
          style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}
        >
          Let's Build<br />
          <span className="text-vintage-amber">Something</span><br />
          Timeless.
        </h2>

        <p
          data-reveal
          className="font-cormorant italic text-vintage-charcoal/70 text-xl md:text-2xl mb-12"
        >
          Your brand deserves a story that lasts. Let's write it together.
        </p>

        <div data-reveal className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            ref={ctaRef}
            href="/contact"
            className="bg-vintage-maroon text-vintage-cream font-lato font-black uppercase tracking-widest px-10 py-4 brutalist-border brutalist-shadow active-press hover:bg-vintage-amber hover:text-vintage-maroon transition-colors inline-flex items-center gap-3 justify-center"
          >
            <Phone size={18} />
            Start Your Campaign
          </Link>

          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Namaste! I\'d like to discuss a project with Parchar India.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-4 border-vintage-maroon text-vintage-maroon font-lato font-black uppercase tracking-widest px-10 py-4 inline-flex items-center gap-3 justify-center hover:bg-vintage-maroon hover:text-vintage-cream transition-colors"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
        </div>

        <p data-reveal className="mt-10 font-lato text-vintage-charcoal/50 text-sm">
          Based in Bhagalpur, Bihar · Serving brands across India · {BRAND.phone}
        </p>
      </div>
    </section>
  )
}
