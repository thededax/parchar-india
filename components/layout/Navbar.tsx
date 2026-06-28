'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, BRAND } from '@/constants/content'

export default function Navbar() {
  const navRef    = useRef<HTMLElement>(null)
  const pathname  = usePathname()
  const [open, setOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 100,
      onEnter:     () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    })
    return () => trigger.kill()
  }, [])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* NAV BAR */}
      <nav
        ref={navRef}
        className={`fixed top-3 left-3 right-3 z-50 flex justify-between items-center px-4 h-16 transition-all duration-500 brutalist-border ${
          scrolled
            ? 'bg-vintage-cream/96 backdrop-blur-md'
            : 'bg-vintage-cream'
        } brutalist-shadow`}
      >
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none" aria-label="Parchar India Home">
          <span className="font-cinzel text-xl font-black uppercase tracking-tighter text-vintage-maroon">PARCHAR</span>
          <span className="font-lato text-vintage-amber font-black text-base ml-3">INDIA</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-lato font-black text-xs uppercase tracking-[0.2em] transition-colors ${
                pathname === link.href
                  ? 'text-vintage-amber border-b-2 border-vintage-amber pb-0.5'
                  : 'text-vintage-maroon hover:text-vintage-amber'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-vintage-maroon text-vintage-cream font-lato font-black text-xs uppercase tracking-widest px-4 py-2.5 brutalist-border-thin hover:bg-vintage-amber hover:text-vintage-maroon transition-colors"
          >
            Start Campaign
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          className="md:hidden brutalist-border-thin p-2 bg-vintage-amber text-vintage-maroon"
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor">
            <rect width="22" height="2.5" rx="1" />
            <rect y="6.5" width="16" height="2.5" rx="1" />
            <rect y="13" width="22" height="2.5" rx="1" />
          </svg>
        </button>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-vintage-cream/90 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-[85%] bg-vintage-cream bg-halftone brutalist-border brutalist-shadow-maroon flex flex-col p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-12 border-b-8 border-vintage-maroon pb-4 bg-vintage-maroon text-vintage-cream p-4 -mx-6 -mt-6 px-6 pt-6">
                <div className="font-cinzel text-4xl font-black leading-none">
                  P.I.
                  <br />
                  <span className="text-vintage-amber font-lato text-2xl">2024</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="brutalist-border-thin bg-vintage-amber text-vintage-maroon p-2"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-8 bg-vintage-cream p-4 brutalist-border">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-4xl font-cinzel font-black hover:ml-4 transition-all uppercase flex items-baseline gap-3"
                    >
                      <span className="text-vintage-amber text-xl">{link.number}.</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="mt-auto">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block bg-vintage-maroon text-vintage-cream font-lato font-black text-center uppercase tracking-widest py-4 brutalist-border"
                >
                  Start Your Campaign
                </Link>
                <p className="text-center font-lato text-vintage-charcoal text-sm mt-4 opacity-60">
                  {BRAND.phone}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
