'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TESTIMONIALS } from '@/constants/content'
import SectionLabel from '@/components/ui/SectionLabel'
import OrnamentalDivider from '@/components/ui/OrnamentalDivider'
import { Star } from 'lucide-react'

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setActive(prev => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(t)
  }, [paused])

  const t = TESTIMONIALS[active]

  return (
    <section
      className="py-24 px-5 md:px-8 bg-vintage-maroon relative overflow-hidden"
      id="testimonials"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-halftone-maroon opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <SectionLabel className="mb-12 opacity-50">What Clients Say</SectionLabel>

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={20} className="text-vintage-amber fill-vintage-amber" />
          ))}
        </div>

        {/* Testimonial card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, rotateY: 15, x: 60 }}
            animate={{ opacity: 1, rotateY: 0,  x: 0,  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }}
            exit={  { opacity: 0, rotateY: -15, x: -60, transition: { duration: 0.3 } }}
            style={{ perspective: '1000px' }}
          >
            <blockquote className="text-center mb-10">
              <p className="font-cormorant italic text-vintage-cream text-2xl md:text-3xl leading-relaxed mb-8">
                "{t.quote}"
              </p>
              <OrnamentalDivider className="mb-8 opacity-30" />
              <footer>
                <cite className="not-italic">
                  <span className="font-cinzel font-black text-vintage-amber text-lg block">{t.author}</span>
                  <span className="font-lato text-vintage-cream/60 text-sm tracking-widest uppercase">{t.role}</span>
                </cite>
              </footer>
            </blockquote>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View testimonial ${i + 1}`}
              className={`w-3 h-3 border-2 border-vintage-amber transition-all ${i === active ? 'bg-vintage-amber' : 'bg-transparent hover:bg-vintage-amber/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
