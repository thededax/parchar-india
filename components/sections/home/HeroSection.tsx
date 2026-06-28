'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { BRAND } from '@/constants/content'
import { useMagneticHover } from '@/hooks/useMagneticHover'
import { ArrowDown, Phone } from 'lucide-react'
import StampBadge from '@/components/ui/StampBadge'

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const badgeRef    = useRef<HTMLDivElement>(null)
  const line1Ref    = useRef<HTMLSpanElement>(null)
  const line2Ref    = useRef<HTMLSpanElement>(null)
  const line3Ref    = useRef<HTMLSpanElement>(null)
  const hindiRef    = useRef<HTMLParagraphElement>(null)
  const bodyRef     = useRef<HTMLDivElement>(null)
  const ctasRef     = useRef<HTMLDivElement>(null)
  const mascotRef   = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const cta1Ref     = useMagneticHover(0.35) as React.RefObject<HTMLAnchorElement>

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'parchar.reveal' } })

      // Sequential mount animation
      tl.fromTo(badgeRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.2)
        .fromTo(line1Ref.current,   { y: '110%', opacity: 0, rotateX: -20 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8 }, 0.5)
        .fromTo(line2Ref.current,   { y: '110%', opacity: 0, rotateX: -20 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8 }, 0.62)
        .fromTo(line3Ref.current,   { y: '110%', opacity: 0, rotateX: -20 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8 }, 0.74)
        .fromTo(hindiRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.0)
        .fromTo(bodyRef.current,    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.2)
        .fromTo(ctasRef.current,    { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, 1.5)
        .fromTo(mascotRef.current,  { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.0 }, 1.7)

      // Scroll parallax — headline up faster than mascot (depth)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(headlineRef.current, { y: p * -120 })
          gsap.set(mascotRef.current,   { y: p * -180 })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-32 pb-20 px-5 md:px-8 overflow-hidden bg-halftone"
      aria-label="Hero section"
    >
      {/* Watermark */}
      <div
        className="absolute right-0 top-0 vertical-text font-cinzel font-black opacity-10 select-none overflow-hidden text-vintage-amber pointer-events-none"
        style={{ fontSize: 'clamp(5rem,12vw,9rem)', lineHeight: 1 }}
        aria-hidden
      >
        HERITAGE
      </div>

      <div className="relative z-10 max-w-2xl">
        {/* ESTD Badge */}
        <div ref={badgeRef} className="inline-block brutalist-border px-3 py-2 mb-10 font-lato text-xs font-black bg-vintage-maroon text-vintage-cream -rotate-2 uppercase tracking-widest" style={{ opacity: 0 }}>
          [ ESTD. 2024 ]
        </div>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="font-cinzel font-black uppercase mb-10 leading-none flex flex-col gap-3"
          style={{ fontSize: 'clamp(3rem,8vw,5rem)', perspective: '800px' }}
        >
          <span className="block overflow-hidden py-1">
            <span
              ref={line1Ref}
              className="ml-4 bg-vintage-maroon text-vintage-cream inline-block px-3 py-1 rotate-[-1deg] origin-left"
              style={{ opacity: 0 }}
            >
              TIMELESS
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span
              ref={line2Ref}
              className="text-vintage-amber brutalist-border-thin inline-block px-3 py-1 bg-vintage-cream rotate-1 origin-left"
              style={{ opacity: 0 }}
            >
              MESSAGES.
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span
              ref={line3Ref}
              className="ml-10 bg-vintage-charcoal text-vintage-cream inline-block px-3 py-1 rotate-[-0.5deg] origin-left"
              style={{ opacity: 0, fontSize: 'clamp(2rem,5vw,3.5rem)' }}
            >
              LASTING IMPACT.
            </span>
          </span>
        </h1>

        {/* Hindi tagline */}
        <p
          ref={hindiRef}
          className="font-cormorant italic text-vintage-amber text-2xl md:text-3xl mb-8"
          style={{ opacity: 0 }}
        >
          "{BRAND.taglineHindi}"
        </p>

        {/* Body copy */}
        <div
          ref={bodyRef}
          className="ml-auto w-[95%] md:w-[88%] brutalist-border p-5 bg-vintage-cream mb-12 -rotate-1 brutalist-shadow relative"
          style={{ opacity: 0 }}
        >
          <p className="font-lato font-bold text-lg uppercase leading-snug text-vintage-charcoal">
            <span className="text-vintage-maroon font-cinzel text-xl block mb-2">Before algorithms, there was the voice.</span>
            We are Bhagalpur's premier marketing agency — blending the undeniable weight of heritage storytelling with the piercing reach of digital media.
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctasRef} className="flex flex-col sm:flex-row gap-4 mb-16" style={{ opacity: 0 }}>
          <Link
            ref={cta1Ref}
            href="/contact"
            className="bg-vintage-maroon text-vintage-cream font-lato font-black py-4 px-8 brutalist-border brutalist-shadow uppercase tracking-widest text-sm rotate-1 active-press inline-flex items-center justify-center gap-3 hover:bg-vintage-amber hover:text-vintage-maroon transition-colors"
          >
            <Phone size={16} />
            Start Your Campaign
          </Link>
          <Link
            href="/services"
            className="border-4 border-vintage-maroon text-vintage-maroon font-lato font-black py-4 px-8 uppercase tracking-widest text-sm -rotate-1 active-press inline-flex items-center justify-center hover:bg-vintage-maroon hover:text-vintage-cream transition-colors"
          >
            View Our Services
          </Link>
        </div>
      </div>

      {/* Mascot Visual */}
      <div
        ref={mascotRef}
        className="relative w-full max-w-sm mx-auto md:absolute md:right-8 md:top-28 md:mx-0 mt-8 md:mt-0"
        style={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
      >
        {/* Layered offset panels */}
        <div className="relative h-80 md:h-[420px] flex items-center justify-center">
          <div className="absolute inset-0 bg-vintage-amber brutalist-border rotate-6 w-3/4 h-3/4 m-auto" />
          <div className="absolute inset-0 bg-vintage-maroon brutalist-border -rotate-3 w-3/4 h-3/4 m-auto" />
          <div className="absolute inset-0 bg-vintage-cream brutalist-border rotate-2 w-3/4 h-3/4 m-auto bg-halftone" />

          {/* Mascot image */}
          <img
            src="/mascot.png"
            alt="Parcharak — the Parchar India mascot, a vintage Indian town crier with megaphone"
            className="relative z-10 w-52 h-52 md:w-64 md:h-64 object-contain ink-bleed animate-breathe"
          />

          {/* Rotating stamp */}
          <div className="absolute -bottom-4 -right-4 z-20">
            <StampBadge size={80} />
          </div>
        </div>
      </div>

      {/* Scroll arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-lato text-[10px] uppercase tracking-widest text-vintage-maroon">Scroll</span>
        <ArrowDown size={16} className="text-vintage-maroon animate-bounce-down" />
      </div>
    </section>
  )
}
