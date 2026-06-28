'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { splitTextIntoChars } from '@/lib/splitText'
import { BRAND } from '@/constants/content'
import { useMagneticHover } from '@/hooks/useMagneticHover'
import { ArrowDown, Phone } from 'lucide-react'
import StampBadge from '@/components/ui/StampBadge'

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const bgLayerRef  = useRef<HTMLDivElement>(null)
  const badgeRef    = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const hindiRef    = useRef<HTMLParagraphElement>(null)
  const bodyRef     = useRef<HTMLDivElement>(null)
  const ctasRef     = useRef<HTMLDivElement>(null)
  const mascotRef   = useRef<HTMLDivElement>(null)
  const cta1Ref     = useMagneticHover(0.35) as React.RefObject<HTMLAnchorElement>

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headline = headlineRef.current
      if (!headline) return

      // SplitText reveal for headline characters
      const headlineSpans = headline.querySelectorAll('.hero-line-text')
      const allChars: HTMLSpanElement[] = []

      headlineSpans.forEach((span) => {
        const result = splitTextIntoChars(span as HTMLElement)
        allChars.push(...result.chars)
      })

      // Character reveal animation — on page load
      gsap.fromTo(allChars, {
        y: 120,
        opacity: 0,
        rotateX: -90,
      }, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.5,
      })

      // Sequential mount animation for other elements
      const tl = gsap.timeline({ defaults: { ease: 'parchar.reveal' } })

      tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.2)
        .fromTo(hindiRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.8)
        .fromTo(bodyRef.current,  { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 2.0)
        .fromTo(ctasRef.current,  { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, 2.3)
        .fromTo(mascotRef.current, { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.0 }, 2.5)

      // Parallax depth layers on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          const p = self.progress
          // Layer 1: Background moves slowest (20% speed)
          gsap.set(bgLayerRef.current, { y: p * 60 })
          // Layer 2: Mascot at 50% speed with subtle rotation
          gsap.set(mascotRef.current, { y: p * -100, rotate: p * 3 })
          // Layer 3: Headline moves up faster
          gsap.set(headlineRef.current, { y: p * -160, opacity: 1 - (p * 0.7) })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-32 pb-20 px-5 md:px-8 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background layer — parallax */}
      <div ref={bgLayerRef} className="absolute inset-0 bg-halftone" />

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

        {/* Main Headline — SplitText character reveal */}
        <h1
          ref={headlineRef}
          className="font-cinzel font-black uppercase mb-10 leading-none flex flex-col gap-3"
          style={{ fontSize: 'clamp(3rem,8vw,5rem)', perspective: '800px' }}
        >
          <span className="block overflow-hidden py-1">
            <span
              className="hero-line-text ml-4 bg-vintage-maroon text-vintage-cream inline-block px-3 py-1 rotate-[-1deg] origin-left"
            >
              TIMELESS
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span
              className="hero-line-text text-vintage-amber brutalist-border-thin inline-block px-3 py-1 bg-vintage-cream rotate-1 origin-left"
            >
              MESSAGES.
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span
              className="hero-line-text ml-10 bg-vintage-charcoal text-vintage-cream inline-block px-3 py-1 rotate-[-0.5deg] origin-left"
              style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}
            >
              LASTING IMPACT.
            </span>
          </span>
        </h1>

        {/* Hindi tagline — fades in with 0.8s delay */}
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

      {/* Mascot Visual — parallax layer */}
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

          {/* Mascot image — using next/image */}
          <Image
            src="/mascot.png"
            alt="Parcharak — the Parchar India mascot, a vintage Indian town crier with megaphone"
            width={256}
            height={256}
            priority
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
