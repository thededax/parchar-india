'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { SERVICES } from '@/constants/content'
import SectionLabel from '@/components/ui/SectionLabel'
import { Megaphone, Camera, PenTool, Target, Monitor, BarChart3 } from 'lucide-react'

const ICONS = [Megaphone, Camera, PenTool, Target, Monitor, BarChart3]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.service-card')

      // Scroll-reveal with stagger
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 75%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-5 md:px-8 bg-vintage-cream"
      id="services"
      aria-label="Our services"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel className="mb-6">Our Services</SectionLabel>

        <div className="mb-16">
          <h2 className="font-cinzel font-black text-h2 text-vintage-maroon leading-none uppercase mb-4">
            What We Do<br />
            <span className="font-lato font-black text-lg text-vintage-amber bg-vintage-maroon px-2 inline-block mt-2 -rotate-1">
              For Your Brand
            </span>
          </h2>
          <p className="font-lato text-vintage-charcoal/70 text-lg max-w-xl mt-4">
            Six precision-crafted services to build, grow, and amplify your brand across every touchpoint.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i]
            return (
              <div
                key={service.id}
                className={`service-card brutalist-border p-6 cursor-pointer transition-all duration-300 group relative overflow-hidden ${
                  i % 2 === 0
                    ? 'bg-vintage-maroon text-vintage-cream hover:shadow-[12px_12px_0px_0px_#D9942B]'
                    : 'bg-vintage-cream text-vintage-maroon hover:shadow-[12px_12px_0px_0px_#7A1E1E]'
                } hover:-translate-y-2`}
                style={{ opacity: 0 }}
              >
                {/* Animated gold border on hover */}
                <div className="gold-border-draw" />

                <div className="flex items-start justify-between mb-6">
                  <span className={`font-lato font-black text-[11px] uppercase tracking-[0.3em] ${
                    i % 2 === 0 ? 'text-vintage-amber' : 'text-vintage-maroon/50'
                  }`}>
                    {service.number}
                  </span>
                  <Icon
                    size={28}
                    className={`transition-transform group-hover:rotate-12 group-hover:scale-110 duration-300 ${
                      i % 2 === 0 ? 'text-vintage-amber' : 'text-vintage-maroon'
                    }`}
                  />
                </div>

                <h3 className={`font-cinzel font-black text-xl mb-2 ${
                  i % 2 === 0 ? 'text-vintage-cream' : 'text-vintage-maroon'
                }`}>
                  {service.title}
                </h3>
                <p className={`font-cormorant italic text-base mb-4 ${
                  i % 2 === 0 ? 'text-vintage-amber' : 'text-vintage-charcoal/60'
                }`}>
                  {service.subtitle}
                </p>
                <p className={`font-lato text-sm leading-relaxed mb-5 ${
                  i % 2 === 0 ? 'text-vintage-cream/80' : 'text-vintage-charcoal/70'
                }`}>
                  {service.description}
                </p>

                <ul className="flex flex-col gap-1.5 mb-6">
                  {service.features.map(f => (
                    <li key={f} className={`font-lato text-xs flex items-center gap-2 ${
                      i % 2 === 0 ? 'text-vintage-cream/70' : 'text-vintage-maroon/70'
                    }`}>
                      <span className="text-vintage-amber">◆</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/contact?service=${service.id}`}
                  className={`font-lato font-black text-xs uppercase tracking-widest inline-flex items-center gap-2 group-hover:gap-4 transition-all ${
                    i % 2 === 0 ? 'text-vintage-amber' : 'text-vintage-maroon'
                  }`}
                >
                  Learn More →
                </Link>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-block bg-vintage-maroon text-vintage-cream font-lato font-black uppercase tracking-widest px-10 py-4 brutalist-border brutalist-shadow active-press hover:bg-vintage-amber hover:text-vintage-maroon transition-colors"
          >
            View All Services & Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
