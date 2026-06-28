'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { splitTextIntoChars } from '@/lib/splitText'
import SectionLabel from '@/components/ui/SectionLabel'
import OrnamentalDivider from '@/components/ui/OrnamentalDivider'
import { SERVICES, PRICING_PLANS } from '@/constants/content'
import { Check, Megaphone, Camera, PenTool, Target, Monitor, BarChart3, ChevronDown, Minus } from 'lucide-react'

const ICONS = [Megaphone, Camera, PenTool, Target, Monitor, BarChart3]

const FAQ_DATA = [
  {
    q: 'Minimum kitne months ka contract hai?',
    a: 'Hamara minimum contract 3 months ka hai. Marketing mein results dikhne mein time lagta hai — 3 months mein hum strategy set karte hain, audience build karte hain, aur measurable results deliver karte hain.',
  },
  {
    q: 'Kya aap outside Bihar bhi kaam karte hain?',
    a: 'Haan, bilkul! Humari team remotely kaam karti hai. Bihar ke bahar bhi — across India — humne clients serve kiye hain. Digital marketing ki koi geographical limit nahi hai.',
  },
  {
    q: 'Results kitne time mein dikhne lagte hain?',
    a: 'Organic social media ke results typically 2-3 months mein visible hote hain. Paid advertising (Google/Meta Ads) mein results 1-2 weeks se shuru ho jaate hain. Brand identity projects 4-6 weeks mein complete hote hain.',
  },
  {
    q: 'Portfolio mein real client work hai ya demo?',
    a: 'Abhi hamare portfolio mein representative work samples hain. Real client case studies jald update honge as we build more partnerships. Results aur testimonials genuine hain.',
  },
  {
    q: 'Custom package kaise milega?',
    a: 'Humse contact karein aur apne specific needs batayein. Hum ek customized proposal banayenge jo aapke budget aur goals ke hisaab se tailored ho. Free 30-minute consultation bhi available hai.',
  },
  {
    q: 'Payment structure kya hai?',
    a: 'Monthly retainer plans ke liye advance payment hoti hai. One-time projects mein 50% advance aur 50% on delivery. UPI, bank transfer, aur all major payment methods accepted hain.',
  },
]

const COMPARISON_DATA = [
  { feature: 'Social Platforms', starter: '2', growth: '4', premium: 'All' },
  { feature: 'Posts/month', starter: '15', growth: '30 + 8 Reels', premium: 'Unlimited' },
  { feature: 'Ad Budget Managed', starter: '—', growth: '₹10K', premium: '₹30K' },
  { feature: 'Dedicated Account Manager', starter: '—', growth: '—', premium: '✓' },
  { feature: 'Photography/Video', starter: '—', growth: 'Basic', premium: '1 Day/Month' },
  { feature: 'Strategy Calls', starter: 'Monthly', growth: 'Weekly', premium: 'On-Demand' },
  { feature: 'Website Maintenance', starter: '—', growth: '—', premium: '✓' },
  { feature: 'Priority Support', starter: '—', growth: '✓', premium: '24/7' },
]

export default function ServicesPageClient() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const [isAnnual, setIsAnnual] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  const faqRef = useRef<HTMLDivElement>(null)

  // Hero text animation
  useEffect(() => {
    if (!heroTitleRef.current) return
    const result = splitTextIntoChars(heroTitleRef.current)
    gsap.fromTo(result.chars, {
      y: 80,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.02,
      duration: 1,
      ease: 'power4.out',
      delay: 0.3,
    })
  }, [])

  // Service card scroll animations
  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.svc-detail-card')
    cards.forEach((card) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'parchar.reveal',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        }
      )
    })
  }, [])

  // Calculate annual price (20% discount)
  const getPrice = (monthlyPrice: string) => {
    if (!isAnnual) return monthlyPrice
    const num = parseInt(monthlyPrice.replace(/[^\d]/g, ''))
    const annualMonthly = Math.round(num * 0.8)
    return `₹${annualMonthly.toLocaleString('en-IN')}`
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-vintage-maroon pt-32 pb-20 px-5 md:px-8 overflow-hidden" aria-label="Services hero">
        <div className="absolute inset-0 bg-halftone-maroon opacity-25" />
        {/* Floating amber dots */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-vintage-amber animate-float-up opacity-30 pointer-events-none"
            style={{
              left: `${(i * 8.3) % 100}%`,
              top: `${20 + (i * 13) % 60}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
            aria-hidden
          />
        ))}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <SectionLabel className="mb-8 opacity-50">Our Offerings</SectionLabel>
          <h1
            ref={heroTitleRef}
            className="font-cinzel font-black text-vintage-cream uppercase leading-none mb-6"
            style={{ fontSize: 'clamp(3rem,8vw,5.5rem)' }}
          >
            Services That Move Markets
          </h1>
          <p className="font-cormorant italic text-vintage-cream/70 text-xl md:text-2xl max-w-2xl mx-auto">
            Six precision-crafted services. One goal: making your brand impossible to ignore.
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-0 bg-vintage-cream" aria-label="Service details">
        {SERVICES.map((service, i) => {
          const Icon = ICONS[i]
          const isEven = i % 2 === 0
          return (
            <div
              key={service.id}
              className={`svc-detail-card flex flex-col md:flex-row items-stretch border-b-8 border-vintage-maroon ${!isEven ? 'md:flex-row-reverse' : ''}`}
              style={{ opacity: 0 }}
            >
              {/* Visual */}
              <div className={`md:w-2/5 min-h-[280px] flex items-center justify-center p-12 ${isEven ? 'bg-vintage-maroon' : 'bg-vintage-amber'} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-halftone opacity-20" />
                <div className="relative z-10 text-center">
                  <Icon size={64} className={`mx-auto mb-4 ${isEven ? 'text-vintage-amber' : 'text-vintage-maroon'}`} />
                  <div className={`font-cinzel font-black text-7xl opacity-10 select-none ${isEven ? 'text-vintage-cream' : 'text-vintage-maroon'}`}>{service.number}</div>
                </div>
              </div>

              {/* Text */}
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <span className="font-lato font-black text-[10px] uppercase tracking-[0.35em] text-vintage-amber mb-2 block">{service.number} / 06</span>
                <h2 className="font-cinzel font-black text-h3 text-vintage-maroon uppercase leading-none mb-2">{service.title}</h2>
                <p className="font-cormorant italic text-vintage-charcoal/60 text-xl mb-5">{service.subtitle}</p>
                <OrnamentalDivider className="mb-5" />
                <p className="font-lato text-vintage-charcoal/80 text-lg leading-relaxed mb-6">{service.description}</p>
                <ul className="grid grid-cols-2 gap-2 mb-8">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 font-lato text-sm text-vintage-charcoal/70">
                      <span className="text-vintage-amber font-bold">◆</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?service=${service.id}`}
                  className="self-start bg-vintage-maroon text-vintage-cream font-lato font-black text-xs uppercase tracking-widest px-6 py-3 brutalist-border hover:bg-vintage-amber hover:text-vintage-maroon transition-colors"
                >
                  Enquire About This Service →
                </Link>
              </div>
            </div>
          )
        })}
      </section>

      {/* Pricing */}
      <section className="py-24 px-5 md:px-8 bg-halftone" id="pricing" aria-label="Pricing plans">
        <div className="max-w-6xl mx-auto">
          <SectionLabel className="mb-6">Pricing</SectionLabel>
          <h2 className="font-cinzel font-black text-h2 text-vintage-maroon uppercase mb-8 leading-none">
            Transparent<br /><span className="text-vintage-amber">Pricing</span>
          </h2>

          {/* Monthly / Annual Toggle */}
          <div className="flex justify-center mb-12">
            <div className="pricing-toggle">
              <div className={`pricing-toggle-pill ${isAnnual ? 'annual' : ''}`} />
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative z-10 font-lato font-black text-xs uppercase tracking-widest px-6 py-3 transition-colors ${
                  !isAnnual ? 'text-vintage-cream' : 'text-vintage-maroon'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`relative z-10 font-lato font-black text-xs uppercase tracking-widest px-6 py-3 transition-colors ${
                  isAnnual ? 'text-vintage-cream' : 'text-vintage-maroon'
                }`}
              >
                Annual
                <span className="ml-2 text-vintage-amber text-[10px]">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`brutalist-border p-8 flex flex-col transition-all duration-300 hover:-translate-y-3 ${
                  plan.popular
                    ? 'bg-vintage-maroon text-vintage-cream shadow-brutalist -translate-y-2'
                    : 'bg-vintage-cream text-vintage-maroon hover:shadow-brutalist'
                }`}
              >
                {plan.popular && (
                  <div className="bg-vintage-amber text-vintage-maroon font-lato font-black text-[10px] uppercase tracking-widest px-3 py-1 self-start mb-4">
                    ★ Most Popular
                  </div>
                )}
                <h3 className={`font-cinzel font-black text-2xl uppercase mb-1 ${plan.popular ? 'text-vintage-cream' : 'text-vintage-maroon'}`}>{plan.name}</h3>
                <p className={`font-lato text-sm mb-6 ${plan.popular ? 'text-vintage-cream/60' : 'text-vintage-charcoal/60'}`}>{plan.subtitle}</p>
                <div className="mb-6">
                  {isAnnual && (
                    <span className={`font-lato text-sm line-through mr-2 ${plan.popular ? 'text-vintage-cream/40' : 'text-vintage-charcoal/40'}`}>
                      {plan.price}
                    </span>
                  )}
                  <span className={`font-cinzel font-black text-4xl ${plan.popular ? 'text-vintage-amber' : 'text-vintage-maroon'}`}>
                    {getPrice(plan.price)}
                  </span>
                  <span className={`font-lato text-sm ml-2 ${plan.popular ? 'text-vintage-cream/50' : 'text-vintage-charcoal/50'}`}>
                    {plan.period}
                  </span>
                </div>
                <OrnamentalDivider className={`mb-6 ${plan.popular ? 'opacity-20' : ''}`} />
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 font-lato text-sm ${plan.popular ? 'text-vintage-cream/80' : 'text-vintage-charcoal/70'}`}>
                      <Check size={14} className={`mt-0.5 flex-shrink-0 ${plan.popular ? 'text-vintage-amber' : 'text-vintage-maroon'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?service=${plan.id}`}
                  className={`block text-center font-lato font-black text-xs uppercase tracking-widest py-3 px-6 brutalist-border-thin transition-colors ${
                    plan.popular
                      ? 'bg-vintage-amber text-vintage-maroon hover:bg-vintage-cream'
                      : 'bg-vintage-maroon text-vintage-cream hover:bg-vintage-amber hover:text-vintage-maroon'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center font-lato text-vintage-charcoal/50 text-sm mt-10">
            All plans include a free 30-minute brand consultation. Custom packages available for enterprise clients.
          </p>

          {/* Comparison Table Toggle */}
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center gap-2 font-lato font-black text-xs uppercase tracking-widest text-vintage-maroon hover:text-vintage-amber transition-colors"
            >
              <ChevronDown size={16} className={`transition-transform duration-300 ${showComparison ? 'rotate-180' : ''}`} />
              {showComparison ? 'Hide' : 'Show'} Full Comparison
            </button>
          </div>

          {/* Comparison Table */}
          {showComparison && (
            <div className="mt-8 brutalist-border overflow-x-auto bg-vintage-cream">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b-4 border-vintage-maroon">
                    <th className="text-left p-4 font-cinzel font-black text-vintage-maroon uppercase">Feature</th>
                    <th className="text-center p-4 font-cinzel font-black text-vintage-maroon uppercase">Starter</th>
                    <th className="text-center p-4 font-cinzel font-black text-vintage-amber uppercase bg-vintage-maroon text-vintage-amber">Growth</th>
                    <th className="text-center p-4 font-cinzel font-black text-vintage-maroon uppercase">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_DATA.map((row, i) => (
                    <tr key={i} className="border-b-2 border-vintage-maroon/20">
                      <td className="p-4 font-lato font-bold text-sm text-vintage-charcoal">{row.feature}</td>
                      <td className="p-4 text-center font-lato text-sm text-vintage-charcoal/70">
                        {row.starter === '—' ? <Minus size={14} className="mx-auto text-vintage-charcoal/30" /> : row.starter}
                      </td>
                      <td className="p-4 text-center font-lato font-bold text-sm bg-vintage-maroon/5 text-vintage-maroon">
                        {row.growth === '—' ? <Minus size={14} className="mx-auto text-vintage-charcoal/30" /> : row.growth}
                      </td>
                      <td className="p-4 text-center font-lato text-sm text-vintage-charcoal/70">
                        {row.premium === '—' ? <Minus size={14} className="mx-auto text-vintage-charcoal/30" /> : row.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-5 md:px-8 bg-vintage-cream border-t-8 border-vintage-maroon" aria-label="Frequently asked questions">
        <div className="max-w-3xl mx-auto" ref={faqRef}>
          <SectionLabel className="mb-6">FAQ</SectionLabel>
          <h2 className="font-cinzel font-black text-h2 text-vintage-maroon uppercase mb-12 leading-none">
            Common<br /><span className="text-vintage-amber">Questions</span>
          </h2>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, i) => (
              <div
                key={i}
                className={`brutalist-border transition-all duration-300 ${
                  openFAQ === i ? 'bg-vintage-maroon text-vintage-cream' : 'bg-vintage-cream'
                }`}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    {/* Gold left indicator */}
                    <div className={`w-1 h-8 rounded-full transition-colors duration-300 ${
                      openFAQ === i ? 'bg-vintage-amber' : 'bg-vintage-maroon/20'
                    }`} />
                    <span className={`font-cinzel font-black text-base uppercase ${
                      openFAQ === i ? 'text-vintage-cream' : 'text-vintage-maroon'
                    }`}>
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 transition-transform duration-300 ${
                      openFAQ === i ? 'rotate-180 text-vintage-amber' : 'text-vintage-maroon'
                    }`}
                  />
                </button>
                <div className={`faq-answer ${openFAQ === i ? 'open' : ''}`}>
                  <div className="px-5 pb-5 pl-10">
                    <OrnamentalDivider className="mb-4 opacity-30" />
                    <p className={`font-lato text-base leading-relaxed ${
                      openFAQ === i ? 'text-vintage-cream/80' : 'text-vintage-charcoal/70'
                    }`}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
