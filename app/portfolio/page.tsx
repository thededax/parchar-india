import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import FadeSlideUp from '@/components/animations/FadeSlideUp'
import StaggerReveal from '@/components/animations/StaggerReveal'
import { PORTFOLIO_ITEMS } from '@/constants/content'

export const metadata: Metadata = {
  title: 'Portfolio — Parchar India | Brand Stories We\'ve Told',
  description: 'Explore Parchar India\'s portfolio of brand identity, social media, digital advertising, and content creation projects across Bihar and India.',
  alternates: { canonical: 'https://parcharindia.com/portfolio' },
}

const CARD_COLORS = ['#7A1E1E','#D9942B','#1F3D2E','#282B2B','#7A1E1E']

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-vintage-charcoal pt-32 pb-20 px-5 md:px-8" aria-label="Portfolio hero">
        <div className="absolute inset-0 bg-halftone-maroon opacity-10" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionLabel className="mb-8 opacity-40">Our Work</SectionLabel>
          <h1 className="font-cinzel font-black text-vintage-cream uppercase leading-none mb-6"
            style={{ fontSize: 'clamp(3rem,8vw,5.5rem)' }}>
            Brands<br /><span className="text-vintage-amber">We've Built</span>
          </h1>
          <p className="font-cormorant italic text-vintage-cream/60 text-xl max-w-xl">
            Five case studies. Real results. Real businesses. Real Bihar.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 px-5 md:px-8 bg-vintage-cream" aria-label="Portfolio grid">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <FadeSlideUp key={item.id} delay={i * 0.08}>
                <div
                  className="portfolio-card group relative overflow-hidden brutalist-border cursor-pointer"
                  data-cursor-portfolio
                  style={{ height: i === 0 || i === 3 ? '420px' : '340px' }}
                  aria-label={`Portfolio: ${item.title}`}
                >
                  {/* Background */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundColor: CARD_COLORS[i] }}
                  >
                    <div className="absolute inset-0 bg-halftone opacity-20" />
                  </div>

                  {/* Large number watermark */}
                  <div className="absolute top-4 left-4 font-cinzel font-black text-8xl opacity-10 text-white select-none pointer-events-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Tags */}
                  <div className="absolute top-4 right-4 flex flex-wrap gap-1 justify-end">
                    {item.tags.map(tag => (
                      <span key={tag} className="font-lato font-black text-[9px] uppercase tracking-widest bg-vintage-amber text-vintage-charcoal px-2 py-0.5">{tag}</span>
                    ))}
                  </div>

                  {/* Hover overlay */}
                  <div className="portfolio-overlay absolute inset-0 bg-vintage-maroon/90 p-6 flex flex-col justify-end">
                    <span className="font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-amber mb-2">{item.category}</span>
                    <h3 className="font-cinzel font-black text-vintage-cream text-xl uppercase mb-2">{item.title}</h3>
                    <p className="font-lato text-vintage-cream/70 text-sm mb-4">{item.description}</p>
                    <div className="bg-vintage-amber text-vintage-charcoal font-lato font-black text-xs uppercase tracking-widest px-4 py-2 self-start">
                      Result: {item.result}
                    </div>
                  </div>

                  {/* Default info */}
                  <div className="absolute bottom-4 left-4 right-4 group-hover:opacity-0 transition-opacity">
                    <span className="font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-amber block mb-1">{item.category}</span>
                    <h3 className="font-cinzel font-black text-white text-xl uppercase">{item.title}</h3>
                  </div>
                </div>
              </FadeSlideUp>
            ))}
          </div>
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
    </>
  )
}
