'use client'
import { TESTIMONIALS } from '@/constants/content'
import SectionLabel from '@/components/ui/SectionLabel'
import { Star } from 'lucide-react'

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex-shrink-0 w-[400px] md:w-[500px] mx-4 brutalist-border p-6 bg-vintage-cream relative group hover:-translate-y-1 transition-transform duration-300">
      <div className="gold-border-draw" />
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={14} className="text-vintage-amber fill-vintage-amber" />
        ))}
      </div>

      <blockquote>
        <p className="font-cormorant italic text-vintage-charcoal text-lg md:text-xl leading-relaxed mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <footer className="flex items-center gap-3">
          <div className="w-10 h-10 bg-vintage-maroon brutalist-border-thin flex items-center justify-center font-cinzel font-black text-vintage-amber text-sm">
            {testimonial.author.charAt(0)}
          </div>
          <cite className="not-italic">
            <span className="font-cinzel font-black text-vintage-maroon text-sm block">{testimonial.author}</span>
            <span className="font-lato text-vintage-charcoal/60 text-xs tracking-wider uppercase">{testimonial.role}</span>
          </cite>
        </footer>
      </blockquote>
    </div>
  )
}

export default function TestimonialsSection() {
  // Duplicate testimonials to create seamless loop
  const doubledTestimonials = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section
      className="py-24 bg-vintage-maroon relative overflow-hidden"
      id="testimonials"
      aria-label="Client testimonials"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-halftone-maroon opacity-20 pointer-events-none" />

      <div className="relative z-10">
        <div className="px-5 md:px-8 mb-12">
          <SectionLabel className="mb-6 opacity-50">What Clients Say</SectionLabel>
          <h2 className="font-cinzel font-black text-vintage-cream text-h2 uppercase leading-none">
            Words That<br /><span className="text-vintage-amber">Matter Most</span>
          </h2>
        </div>

        {/* Marquee Row 1 — scrolling left */}
        <div className="marquee-track mb-6">
          <div className="marquee-left flex" style={{ width: 'max-content' }}>
            {doubledTestimonials.map((t, i) => (
              <TestimonialCard key={`row1-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Marquee Row 2 — scrolling right */}
        <div className="marquee-track">
          <div className="marquee-right flex" style={{ width: 'max-content' }}>
            {[...doubledTestimonials].reverse().map((t, i) => (
              <TestimonialCard key={`row2-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        <p className="text-center font-lato text-vintage-cream/40 text-xs uppercase tracking-widest mt-10 px-5">
          Hover to pause · Real testimonials from our clients
        </p>
      </div>
    </section>
  )
}
