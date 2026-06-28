import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import StampBadge from '@/components/ui/StampBadge'
import OrnamentalDivider from '@/components/ui/OrnamentalDivider'
import FadeSlideUp from '@/components/animations/FadeSlideUp'
import StaggerReveal from '@/components/animations/StaggerReveal'
import { PROCESS_STEPS, BRAND } from '@/constants/content'

export const metadata: Metadata = {
  title: 'About Parchar India — The Legend of the Parcharak',
  description: 'Learn about Parchar India — Bhagalpur\'s premier marketing agency. Our story, philosophy, and the Parcharak vision that drives us.',
  alternates: { canonical: 'https://parcharindia.com/about' },
}

export default function AboutPage() {
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
          <h1 className="font-cinzel font-black text-vintage-cream uppercase leading-none mb-6"
            style={{ fontSize: 'clamp(3rem,8vw,6rem)' }}>
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
          <FadeSlideUp>
            <SectionLabel className="mb-6">[ THE GENESIS ]</SectionLabel>
            <h2 className="font-cinzel font-black text-vintage-maroon text-h2 uppercase leading-none mb-6">
              Born in<br /><span className="text-vintage-amber">Bhagalpur</span>
            </h2>
            <div className="font-lato text-vintage-charcoal/80 text-lg leading-relaxed space-y-4">
              <p>
                Parchar India was founded in 2024 with a single conviction: that Indian businesses deserve world-class marketing that truly understands their culture, their customers, and their community.
              </p>
              <p>
                The name "Parchar" — meaning "proclamation" or "spreading the word" — is not an accident. It is our philosophy. We are the modern-day town criers (Parcharaks), carrying your brand's message to every corner of the digital landscape.
              </p>
              <p>
                Based in Bhagalpur, Bihar's silk city, we blend the strategic precision of global marketing with the cultural intelligence of a local partner.
              </p>
            </div>
          </FadeSlideUp>

          {/* Mascot visual */}
          <FadeSlideUp delay={0.2}>
            <div className="relative h-80 flex items-center justify-center">
              <div className="absolute inset-0 bg-vintage-amber brutalist-border rotate-6 w-3/4 h-3/4 m-auto" />
              <div className="absolute inset-0 bg-vintage-maroon brutalist-border -rotate-3 w-3/4 h-3/4 m-auto" />
              <div className="absolute inset-0 bg-vintage-cream brutalist-border rotate-2 w-3/4 h-3/4 m-auto bg-halftone" />
              <img
                src="/mascot.png"
                alt="Parcharak mascot — the Parchar India town crier"
                className="relative z-10 w-48 h-48 object-contain ink-bleed animate-breathe"
              />
              <div className="absolute -bottom-4 -right-4 z-20">
                <StampBadge size={72} />
              </div>
            </div>
          </FadeSlideUp>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-5 md:px-8 bg-halftone" aria-label="Mission and Vision">
        <div className="max-w-5xl mx-auto">
          <SectionLabel className="mb-16">Mission & Vision</SectionLabel>
          <StaggerReveal className="grid md:grid-cols-2 gap-8">
            <div className="brutalist-border p-8 bg-vintage-maroon text-vintage-cream brutalist-shadow">
              <h2 className="font-cinzel font-black text-2xl uppercase mb-4 text-vintage-amber">Our Mission</h2>
              <OrnamentalDivider className="mb-6 opacity-30" />
              <p className="font-lato text-vintage-cream/80 text-lg leading-relaxed">
                To empower Indian businesses with marketing strategies that are rooted in cultural truth and powered by digital precision — so every brand we touch becomes unforgettable.
              </p>
            </div>
            <div className="brutalist-border p-8 bg-vintage-amber text-vintage-maroon brutalist-shadow-maroon rotate-1">
              <h2 className="font-cinzel font-black text-2xl uppercase mb-4">Our Vision</h2>
              <OrnamentalDivider className="mb-6 opacity-30" />
              <p className="font-lato text-vintage-maroon/80 text-lg leading-relaxed">
                To become India's most trusted regional marketing agency — the name that every business owner in Bihar recommends when someone asks, "Who tells the best brand stories?"
              </p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 px-5 md:px-8 bg-vintage-forest text-vintage-cream" aria-label="Our process">
        <div className="max-w-5xl mx-auto">
          <SectionLabel className="mb-16 opacity-50">How We Work</SectionLabel>
          <h2 className="font-cinzel font-black text-h2 text-vintage-cream uppercase mb-16">
            Our Process
          </h2>
          <div className="flex flex-col md:flex-row gap-0 relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-0 md:top-8 top-0 bottom-0 md:bottom-auto w-[2px] md:w-full md:h-[2px] bg-vintage-amber/30" />
            {PROCESS_STEPS.map((step, i) => (
              <FadeSlideUp key={step.number} delay={i * 0.1} className="flex-1 relative pl-12 md:pl-0 md:pt-12 pb-12 md:pb-0 md:pr-6">
                <div className="absolute left-0 md:left-auto md:top-0 top-0 w-8 h-8 md:w-10 md:h-10 bg-vintage-amber flex items-center justify-center brutalist-border">
                  <span className="font-cinzel font-black text-vintage-maroon text-xs">{step.number}</span>
                </div>
                <h3 className="font-cinzel font-black text-vintage-cream uppercase text-xl mb-3 md:mt-6">{step.title}</h3>
                <p className="font-lato text-vintage-cream/60 text-sm leading-relaxed">{step.description}</p>
              </FadeSlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 md:px-8 bg-vintage-cream text-center border-t-8 border-vintage-maroon">
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
