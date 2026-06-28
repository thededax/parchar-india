'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { NAV_LINKS, BRAND } from '@/constants/content'
import OrnamentalDivider from '@/components/ui/OrnamentalDivider'
import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const cols = footer.querySelectorAll('.footer-col')
    const anim = gsap.fromTo(
      cols,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: footer, start: 'top 90%', once: true },
      }
    )

    return () => {
      anim.kill()
      if (anim.scrollTrigger) anim.scrollTrigger.kill()
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative bg-vintage-forest text-vintage-cream border-t-[3px] border-vintage-amber overflow-hidden"
    >
      {/* Halftone overlay */}
      <div className="absolute inset-0 bg-halftone-maroon opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand col */}
          <div className="footer-col lg:col-span-1">
            <div className="font-cinzel text-3xl font-black leading-none mb-1 text-vintage-cream">
              PARCHAR
            </div>
            <div className="font-lato font-black text-vintage-amber text-lg ml-3 mb-4">INDIA</div>
            <p className="font-lato text-vintage-cream/70 text-sm leading-relaxed mb-6">
              Timeless Messages. Lasting Impact.<br />
              <span className="font-cormorant italic text-vintage-amber text-base">
                आपका संदेश, हमारी आवाज़
              </span>
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/parcharindia' },
                { icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/parcharindia' },
                { icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/company/parcharindia' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border-2 border-vintage-cream/30 flex items-center justify-center hover:border-vintage-amber hover:text-vintage-amber transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="font-lato font-black text-[11px] uppercase tracking-[0.3em] text-vintage-amber mb-6">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-lato text-vintage-cream/70 hover:text-vintage-amber transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-vintage-amber text-xs">◆</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h3 className="font-lato font-black text-[11px] uppercase tracking-[0.3em] text-vintage-amber mb-6">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {['Social Media', 'Content Creation', 'Brand Identity', 'Digital Ads', 'Web Design', 'Strategy'].map(s => (
                <li key={s}>
                  <Link href="/services" className="font-lato text-vintage-cream/70 hover:text-vintage-amber transition-colors text-sm flex items-center gap-2">
                    <span className="text-vintage-amber text-xs">◆</span>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h3 className="font-lato font-black text-[11px] uppercase tracking-[0.3em] text-vintage-amber mb-6">
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-vintage-amber mt-0.5 flex-shrink-0" />
                <span className="font-lato text-vintage-cream/70 text-sm">Bhagalpur, Bihar, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-vintage-amber flex-shrink-0" />
                <a href={`tel:${BRAND.phone}`} aria-label="Call Parchar India" className="font-lato text-vintage-cream/70 hover:text-vintage-amber text-sm transition-colors">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-vintage-amber flex-shrink-0" />
                <a href={`mailto:${BRAND.email}`} aria-label="Email Parchar India" className="font-lato text-vintage-cream/70 hover:text-vintage-amber text-sm transition-colors">
                  {BRAND.email}
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 block bg-vintage-amber text-vintage-charcoal font-lato font-black text-xs uppercase tracking-widest py-3 px-4 text-center brutalist-border hover:bg-vintage-cream transition-colors"
            >
              Start a Campaign
            </Link>
          </div>
        </div>

        <OrnamentalDivider className="mb-8 opacity-40" />

        {/* Bottom strip */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-lato text-vintage-cream/40 text-xs">
            © {new Date().getFullYear()} Parchar India. All rights reserved.
          </p>
          <p className="font-cinzel text-vintage-amber/60 text-[10px] uppercase tracking-[0.3em]">
            Bhagalpur · Bihar · India · ESTD. 2024
          </p>
          <p className="font-lato text-vintage-cream/40 text-xs">
            Crafted with ◆ for Indian brands
          </p>
        </div>
      </div>
    </footer>
  )
}
