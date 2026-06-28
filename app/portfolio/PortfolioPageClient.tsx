'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { PORTFOLIO_ITEMS } from '@/constants/content'
import SectionLabel from '@/components/ui/SectionLabel'
import { splitTextIntoChars } from '@/lib/splitText'
import { X, ArrowRight } from 'lucide-react'

const CARD_GRADIENTS = [
  'card-kumar-electronics',
  'card-priya-boutique',
  'card-singh-construction',
  'card-bhagalpur-sweets',
  'card-bihar-travel',
]

const CATEGORIES = ['All', 'Brand Identity', 'Social Media', 'Digital Advertising', 'Content Creation', 'Website Design']

export default function PortfolioPageClient() {
  const heroRef = useRef<HTMLHeadingElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [modalItem, setModalItem] = useState<typeof PORTFOLIO_ITEMS[0] | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Hero text animation
  useEffect(() => {
    if (!heroRef.current) return
    const result = splitTextIntoChars(heroRef.current)
    gsap.fromTo(result.chars, {
      clipPath: 'inset(0 100% 0 0)',
    }, {
      clipPath: 'inset(0 0% 0 0)',
      stagger: 0.02,
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.3,
    })
  }, [])

  // Horizontal scroll
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.portfolio-h-card')
      if (cards.length === 0) return

      // Calculate width mathematically to avoid DOM paint race conditions
      const getScrollWidth = () => {
        const isMobile = window.innerWidth <= 768
        const cardWidth = isMobile ? window.innerWidth * 0.90 : window.innerWidth * 0.75
        const gap = 24
        const padding = 96 // px-12 on both sides (48 * 2)
        return cards.length * cardWidth + (cards.length - 1) * gap + padding
      }

      gsap.to(track, {
        x: () => {
          const totalWidth = getScrollWidth()
          return -(totalWidth - window.innerWidth + 100)
        },
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollWidth()}`,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (cards.length - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: 'power1.inOut',
          },
        },
      })
    }, section)

    return () => ctx.revert()
  }, [activeFilter])

  // Modal open/close
  const openModal = (item: typeof PORTFOLIO_ITEMS[0]) => {
    setModalItem(item)
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      if (modalRef.current) {
        gsap.fromTo(modalRef.current,
          { clipPath: 'circle(0% at 50% 50%)' },
          { clipPath: 'circle(150% at 50% 50%)', duration: 0.8, ease: 'power4.out' }
        )
      }
    }, 10)
  }

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 0.5,
        ease: 'power4.in',
        onComplete: () => {
          setModalItem(null)
          document.body.style.overflow = ''
        },
      })
    }
  }

  // Filter items
  const filteredItems = activeFilter === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeFilter)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-vintage-charcoal pt-32 pb-20 px-5 md:px-8 overflow-hidden" aria-label="Portfolio hero">
        <div className="absolute inset-0 bg-halftone-maroon opacity-10" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionLabel className="mb-8 opacity-40">Our Work</SectionLabel>
          <h1
            ref={heroRef}
            className="font-cinzel font-black text-vintage-cream uppercase leading-none mb-6"
            style={{ fontSize: 'clamp(3rem,8vw,5.5rem)' }}
          >
            Brands We&apos;ve Built
          </h1>
          <p className="font-cormorant italic text-vintage-cream/60 text-xl max-w-xl">
            Five case studies. Real results. Real businesses. Real Bihar.
          </p>
        </div>
      </section>

      {/* Growing Portfolio Banner */}
      <div className="bg-vintage-amber border-y-4 border-vintage-maroon py-3 px-5 text-center">
        <p className="font-lato font-black text-vintage-maroon text-xs uppercase tracking-widest">
          ◆ Our portfolio is growing — real client case studies coming soon. These represent the type of work we do. ◆
        </p>
      </div>

      {/* Category Filter */}
      <section className="py-8 px-5 md:px-8 bg-vintage-cream border-b-4 border-vintage-maroon" aria-label="Portfolio filters">
        <div ref={filterRef} className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-lato font-black text-xs uppercase tracking-widest px-5 py-2.5 brutalist-border-thin transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-vintage-maroon text-vintage-cream'
                  : 'bg-vintage-cream text-vintage-maroon hover:bg-vintage-maroon hover:text-vintage-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <section
        ref={sectionRef}
        className="relative bg-vintage-charcoal overflow-hidden min-h-screen flex items-center"
        aria-label="Portfolio showcase"
      >
        <div
          ref={trackRef}
          className="flex gap-6 items-center px-12 py-12"
          style={{ width: 'max-content' }}
        >
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              className={`portfolio-h-card ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} brutalist-border flex flex-col justify-between p-8 md:p-12 cursor-pointer`}
              onClick={() => openModal(item)}
            >
              {/* Grain overlay */}
              <div className="grain-overlay" />

              {/* Mascot watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
                <Image
                  src="/mascot.png"
                  alt=""
                  width={300}
                  height={300}
                  className="opacity-[0.07] w-64 h-64 object-contain"
                  aria-hidden="true"
                />
              </div>

              {/* Top section */}
              <div className="relative z-10">
                {/* Category badge */}
                <span className="font-lato font-black text-[10px] uppercase tracking-[0.3em] bg-vintage-amber text-vintage-charcoal px-3 py-1 inline-block mb-8">
                  {item.category}
                </span>

                {/* Large number */}
                <div className="font-cinzel font-black text-white/10 select-none pointer-events-none leading-none"
                  style={{ fontSize: 'clamp(6rem, 10vw, 12rem)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Center: Title */}
              <div className="relative z-10 flex-1 flex items-center">
                <h3 className="font-cinzel font-black text-white uppercase leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  {item.title}
                </h3>
              </div>

              {/* Bottom: Result */}
              <div className="relative z-10 flex justify-between items-end">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <span key={tag} className="font-lato font-bold text-[9px] uppercase tracking-widest text-white/50 border border-white/20 px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-right">
                  <span className="font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-amber block mb-1">Result</span>
                  <span className="font-cinzel font-black text-white text-xl md:text-2xl">{item.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 md:px-8 bg-vintage-amber border-t-8 border-vintage-maroon text-center" aria-label="Portfolio CTA">
        <h2 className="font-cinzel font-black text-vintage-maroon text-h2 uppercase mb-4">
          Your Brand.<br />Next In Line.
        </h2>
        <p className="font-lato text-vintage-maroon/70 text-lg mb-8">Ready to create a case study of your own?</p>
        <Link
          href="/contact"
          className="inline-block bg-vintage-maroon text-vintage-cream font-lato font-black uppercase tracking-widest px-10 py-4 brutalist-border active-press hover:bg-vintage-charcoal transition-colors"
        >
          Start Your Project
        </Link>
      </section>

      {/* Case Study Modal */}
      {modalItem && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={closeModal}
          onKeyDown={(e) => e.key === 'Escape' && closeModal()}
        >
          <div
            ref={modalRef}
            className="absolute inset-0 bg-vintage-charcoal/98 flex items-center justify-center p-6 md:p-12"
            style={{ clipPath: 'circle(0% at 50% 50%)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-12 h-12 brutalist-border bg-vintage-amber text-vintage-maroon flex items-center justify-center hover:bg-vintage-cream transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="max-w-3xl w-full">
              {/* Category */}
              <span className="font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-amber mb-4 block">
                {modalItem.category}
              </span>

              {/* Title */}
              <h2 className="font-cinzel font-black text-vintage-cream uppercase leading-none mb-6"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                {modalItem.title}
              </h2>

              {/* Result stat */}
              <div className="brutalist-border bg-vintage-maroon p-6 mb-8 inline-block">
                <span className="font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-amber block mb-1">Key Result</span>
                <span className="font-cinzel font-black text-vintage-cream text-3xl">{modalItem.result}</span>
              </div>

              {/* Description */}
              <p className="font-lato text-vintage-cream/80 text-lg leading-relaxed mb-8">
                {modalItem.description}
              </p>

              {/* What was done */}
              <h3 className="font-cinzel font-black text-vintage-amber uppercase mb-4">What We Did</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 font-lato text-vintage-cream/70">
                  <span className="text-vintage-amber mt-1">◆</span>
                  Complete brand strategy & market positioning
                </li>
                <li className="flex items-start gap-3 font-lato text-vintage-cream/70">
                  <span className="text-vintage-amber mt-1">◆</span>
                  Content creation and social media management
                </li>
                <li className="flex items-start gap-3 font-lato text-vintage-cream/70">
                  <span className="text-vintage-amber mt-1">◆</span>
                  Targeted digital advertising campaigns
                </li>
                <li className="flex items-start gap-3 font-lato text-vintage-cream/70">
                  <span className="text-vintage-amber mt-1">◆</span>
                  Performance analytics and optimization
                </li>
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {modalItem.tags.map(tag => (
                  <span key={tag} className="font-lato font-black text-[9px] uppercase tracking-widest bg-vintage-amber text-vintage-charcoal px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/contact?service=${modalItem.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center gap-3 bg-vintage-amber text-vintage-maroon font-lato font-black uppercase tracking-widest px-8 py-4 brutalist-border hover:bg-vintage-cream transition-colors"
                onClick={() => closeModal()}
              >
                Start a similar project
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
