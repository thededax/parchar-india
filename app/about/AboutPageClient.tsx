'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { splitTextIntoChars, splitTextIntoWords } from '@/lib/splitText'
import SectionLabel from '@/components/ui/SectionLabel'
import StampBadge from '@/components/ui/StampBadge'
import OrnamentalDivider from '@/components/ui/OrnamentalDivider'
import { PROCESS_STEPS, BRAND } from '@/constants/content'

const TRUST_BADGES = [
  { icon: '🏆', label: "Bihar's Premier Agency" },
  { icon: '📍', label: 'Based in Bhagalpur' },
  { icon: '⚡', label: 'Est. 2024' },
  { icon: '🌐', label: 'Serving All India' },
]

export default function AboutPageClient() {
  const heroRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineLineRef = useRef<SVGLineElement>(null)
  const missionRef = useRef<HTMLParagraphElement>(null)
  const visionRef = useRef<HTMLParagraphElement>(null)

  // Hero headline clip-path reveal
  useEffect(() => {
    if (!heroRef.current) return
    gsap.from(heroRef.current, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.4,
      ease: 'power4.inOut',
      delay: 0.3,
    })
  }, [])

  // Animated timeline
  useEffect(() => {
    const timeline = timelineRef.current
    const line = timelineLineRef.current
    if (!timeline || !line) return

    const ctx = gsap.context(() => {
      // Draw the line
      const lineLength = line.getTotalLength()
      gsap.set(line, { strokeDasharray: lineLength, strokeDashoffset: lineLength })

      gsap.to(line, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: 1,
        },
      })

      // Step nodes pop in
      const nodes = gsap.utils.toArray<HTMLElement>('.timeline-node')
      nodes.forEach((node, i) => {
        gsap.fromTo(node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: node,
              start: 'top 75%',
              once: true,
            },
            delay: i * 0.1,
          }
        )
      })

      // Step content fades up
      const contents = gsap.utils.toArray<HTMLElement>('.timeline-content')
      contents.forEach((content, i) => {
        gsap.fromTo(content,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'parchar.reveal',
            scrollTrigger: {
              trigger: content,
              start: 'top 80%',
              once: true,
            },
            delay: i * 0.1,
          }
        )
      })
    }, timeline)

    return () => ctx.revert()
  }, [])

  // Word-by-word reveal for Mission & Vision
  useEffect(() => {
    const setupWordReveal = (el: HTMLElement | null) => {
      if (!el) return
      const result = splitTextIntoWords(el)
      result.words.forEach(word => {
        word.style.opacity = '0.15'
        word.classList.add('word-reveal-dim')
      })

      gsap.to(result.words, {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: true,
        },
      })
    }

    setupWordReveal(missionRef.current)
    setupWordReveal(visionRef.current)
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] bg-vintage-maroon overflow-hidden flex items-end pt-32" aria-label="About hero">
        <div className="absolute inset-0 bg-halftone-maroon opacity-20" />
        <div className="absolute right-6 top-20 opacity-10 select-none pointer-events-none" aria-hidden>
          <StampBadge size={200} animate={false} />
        </div>
        <div className="relative z-10 px-5 md:px-8 pb-20 max-w-5xl">
          <SectionLabel className="mb-8 opacity-50">Our Story</SectionLabel>
          <h1
            ref={heroRef}
            className="font-cinzel font-black text-vintage-cream uppercase leading-none mb-6 about-headline"
            style={{ fontSize: 'clamp(3rem,8vw,6rem)', clipPath: 'inset(0 0% 0 0)' }}
          >
            THE LEGEND<br />
            <span className="text-vintage-amber">OF THE</span><br />
            PARCHARAK
          </h1>
          <p className="font-cormorant italic text-vintage-cream/70 text-2xl max-w-xl">
            Before algorithms, there was the voice. Before feeds, the town square.
          </p>
        </div>
      </section>

      {/* Genesis story */}
      <section className="py-24 px-5 md:px-8 bg-vintage-cream border-b-8 border-vintage-maroon" aria-label="Brand story">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel className="mb-6">[ THE GENESIS ]</SectionLabel>
            <h2 className="font-cinzel font-black text-vintage-maroon text-h2 uppercase leading-none mb-6">
              Born in<br /><span className="text-vintage-amber">Bhagalpur</span>
            </h2>
            <div className="font-lato text-vintage-charcoal/80 text-lg leading-relaxed space-y-4">
              <p>
                Parchar India was founded in 2024 with a single conviction: that Indian businesses deserve world-class marketing that truly understands their culture, their customers, and their community.
              </p>
              <p>
                The name &quot;Parchar&quot; — meaning &quot;proclamation&quot; or &quot;spreading the word&quot; — is not an accident. It is our philosophy. We are the modern-day town criers (Parcharaks), carrying your brand&apos;s message to every corner of the digital landscape.
              </p>
              <p>
                Based in Bhagalpur, Bihar&apos;s silk city, we blend the strategic precision of global marketing with the cultural intelligence of a local partner.
              </p>
            </div>
          </div>

          {/* Mascot visual */}
          <div className="relative h-80 flex items-center justify-center">
            <div className="absolute inset-0 bg-vintage-amber brutalist-border rotate-6 w-3/4 h-3/4 m-auto" />
            <div className="absolute inset-0 bg-vintage-maroon brutalist-border -rotate-3 w-3/4 h-3/4 m-auto" />
            <div className="absolute inset-0 bg-vintage-cream brutalist-border rotate-2 w-3/4 h-3/4 m-auto bg-halftone" />
            <Image
              src="/mascot.png"
              alt="Parcharak mascot — the Parchar India town crier"
              width={192}
              height={192}
              className="relative z-10 w-48 h-48 object-contain ink-bleed animate-breathe"
            />
            <div className="absolute -bottom-4 -right-4 z-20">
              <StampBadge size={72} />
            </div>
          </div>
        </div>
      </section>

      {/* Founder / Team Section */}
      <section className="py-24 px-5 md:px-8 bg-vintage-cream border-b-8 border-vintage-maroon" aria-label="Our team">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel className="mb-6">Our Team</SectionLabel>
          <h2 className="font-cinzel font-black text-vintage-maroon text-h2 uppercase leading-none mb-12">
            The People<br /><span className="text-vintage-amber">Behind Parchar</span>
          </h2>

          {/* Founder Card */}
          <div className="inline-block brutalist-border p-8 bg-vintage-cream brutalist-shadow text-center max-w-sm mx-auto">
            {/* Avatar placeholder */}
            <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-vintage-maroon brutalist-border flex items-center justify-center">
              <span className="font-cinzel font-black text-vintage-amber text-3xl">P</span>
            </div>
            <h3 className="font-cinzel font-black text-vintage-maroon text-xl uppercase mb-1">Founder</h3>
            <p className="font-lato font-bold text-vintage-amber text-sm uppercase tracking-widest mb-4">Founder & Creative Director</p>
            <OrnamentalDivider className="mb-4" />
            <p className="font-lato text-vintage-charcoal/70 text-sm leading-relaxed">
              Driven by the vision of transforming how Bihar&apos;s businesses communicate with the world. Blending cultural insight with modern marketing strategy.
            </p>
            <p className="font-lato text-vintage-charcoal/40 text-xs mt-4 italic">
              ⚠️ Photo coming soon — replace with actual founder image
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision — Word-by-word scroll reveal */}
      <section className="py-24 px-5 md:px-8 bg-halftone" aria-label="Mission and Vision">
        <div className="max-w-5xl mx-auto">
          <SectionLabel className="mb-16">Mission & Vision</SectionLabel>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="brutalist-border p-8 bg-vintage-maroon text-vintage-cream brutalist-shadow">
              <h2 className="font-cinzel font-black text-2xl uppercase mb-4 text-vintage-amber">Our Mission</h2>
              <OrnamentalDivider className="mb-6 opacity-30" />
              <p ref={missionRef} className="font-lato text-vintage-cream/80 text-lg leading-relaxed">
                To empower Indian businesses with marketing strategies that are rooted in cultural truth and powered by digital precision — so every brand we touch becomes unforgettable.
              </p>
            </div>
            <div className="brutalist-border p-8 bg-vintage-amber text-vintage-maroon brutalist-shadow-maroon rotate-1">
              <h2 className="font-cinzel font-black text-2xl uppercase mb-4">Our Vision</h2>
              <OrnamentalDivider className="mb-6 opacity-30" />
              <p ref={visionRef} className="font-lato text-vintage-maroon/80 text-lg leading-relaxed">
                To become India&apos;s most trusted regional marketing agency — the name that every business owner in Bihar recommends when someone asks, &quot;Who tells the best brand stories?&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline — Animated SVG */}
      <section className="py-24 px-5 md:px-8 bg-vintage-forest text-vintage-cream" aria-label="Our process">
        <div className="max-w-5xl mx-auto">
          <SectionLabel className="mb-16 opacity-50">How We Work</SectionLabel>
          <h2 className="font-cinzel font-black text-h2 text-vintage-cream uppercase mb-16">
            Our Process
          </h2>

          {/* Desktop: Horizontal Timeline */}
          <div ref={timelineRef} className="hidden md:block relative">
            {/* SVG Timeline Line */}
            <svg className="absolute top-8 left-0 w-full h-2 overflow-visible" aria-hidden>
              <line
                ref={timelineLineRef}
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="#D9942B"
                strokeWidth="3"
              />
            </svg>

            <div className="flex justify-between relative">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.number} className="flex-1 relative px-3">
                  {/* Node circle */}
                  <div
                    className="timeline-node w-12 h-12 bg-vintage-amber brutalist-border flex items-center justify-center mx-auto mb-6 relative z-10"
                    style={{ opacity: 0 }}
                  >
                    <span className="font-cinzel font-black text-vintage-maroon text-sm">{step.number}</span>
                  </div>

                  {/* Content */}
                  <div className="timeline-content text-center" style={{ opacity: 0 }}>
                    <h3 className="font-cinzel font-black text-vintage-cream uppercase text-lg mb-2">{step.title}</h3>
                    <p className="font-lato text-vintage-cream/60 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden relative pl-8">
            <div className="absolute left-4 top-0 bottom-0 w-[3px] bg-vintage-amber/30" />
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.number} className="relative pb-10 last:pb-0">
                <div className="absolute left-[-20px] top-0 w-10 h-10 bg-vintage-amber brutalist-border flex items-center justify-center z-10">
                  <span className="font-cinzel font-black text-vintage-maroon text-xs">{step.number}</span>
                </div>
                <div className="pl-6 pt-1">
                  <h3 className="font-cinzel font-black text-vintage-cream uppercase text-lg mb-2">{step.title}</h3>
                  <p className="font-lato text-vintage-cream/60 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-5 md:px-8 bg-vintage-cream border-t-8 border-b-8 border-vintage-maroon" aria-label="Trust signals">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map((badge, i) => (
              <div
                key={i}
                className="brutalist-border p-6 text-center group hover:-translate-y-1 hover:shadow-brutalist transition-all duration-300 bg-vintage-cream relative overflow-hidden"
              >
                <div className="gold-border-draw" />
                <div className="text-4xl mb-3">{badge.icon}</div>
                <p className="font-cinzel font-black text-vintage-maroon text-sm uppercase">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 md:px-8 bg-vintage-cream text-center">
        <h2 className="font-cinzel font-black text-h2 text-vintage-maroon uppercase mb-6">
          Ready to Write<br /><span className="text-vintage-amber">Your Story?</span>
        </h2>
        <Link href="/contact" className="inline-block bg-vintage-maroon text-vintage-cream font-lato font-black uppercase tracking-widest px-10 py-4 brutalist-border brutalist-shadow active-press hover:bg-vintage-amber hover:text-vintage-maroon transition-colors">
          Get In Touch
        </Link>
      </section>
    </>
  )
}
