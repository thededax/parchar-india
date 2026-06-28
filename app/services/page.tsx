import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import OrnamentalDivider from '@/components/ui/OrnamentalDivider'
import FadeSlideUp from '@/components/animations/FadeSlideUp'
import StaggerReveal from '@/components/animations/StaggerReveal'
import { SERVICES, PRICING_PLANS } from '@/constants/content'
import { Check, Megaphone, Camera, PenTool, Target, Monitor, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services — Parchar India | Marketing Agency Bihar',
  description: 'Explore Parchar India\'s full range of services: Social Media Management, Brand Identity, Content Creation, Digital Advertising, Website Design and Marketing Strategy.',
  alternates: { canonical: 'https://parcharindia.com/services' },
}

const ICONS = [Megaphone, Camera, PenTool, Target, Monitor, BarChart3]

export default function ServicesPage() {
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
          <h1 className="font-cinzel font-black text-vintage-cream uppercase leading-none mb-6"
            style={{ fontSize: 'clamp(3rem,8vw,5.5rem)' }}>
            Services That<br /><span className="text-vintage-amber">Move Markets</span>
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
              className={`flex flex-col md:flex-row items-stretch border-b-8 border-vintage-maroon ${!isEven ? 'md:flex-row-reverse' : ''}`}
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
                <FadeSlideUp>
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
                  <Link href="/contact" className="self-start bg-vintage-maroon text-vintage-cream font-lato font-black text-xs uppercase tracking-widest px-6 py-3 brutalist-border hover:bg-vintage-amber hover:text-vintage-maroon transition-colors">
                    Enquire About This Service →
                  </Link>
                </FadeSlideUp>
              </div>
            </div>
          )
        })}
      </section>

      {/* Pricing */}
      <section className="py-24 px-5 md:px-8 bg-halftone" id="pricing" aria-label="Pricing plans">
        <div className="max-w-6xl mx-auto">
          <SectionLabel className="mb-6">Pricing</SectionLabel>
          <h2 className="font-cinzel font-black text-h2 text-vintage-maroon uppercase mb-16 leading-none">
            Transparent<br /><span className="text-vintage-amber">Pricing</span>
          </h2>

          <StaggerReveal className="grid md:grid-cols-3 gap-6">
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
                  <span className={`font-cinzel font-black text-4xl ${plan.popular ? 'text-vintage-amber' : 'text-vintage-maroon'}`}>{plan.price}</span>
                  <span className={`font-lato text-sm ml-2 ${plan.popular ? 'text-vintage-cream/50' : 'text-vintage-charcoal/50'}`}>{plan.period}</span>
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
                  href="/contact"
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
          </StaggerReveal>

          <p className="text-center font-lato text-vintage-charcoal/50 text-sm mt-10">
            All plans include a free 30-minute brand consultation. Custom packages available for enterprise clients.
          </p>
        </div>
      </section>
    </>
  )
}
