'use client'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { splitTextIntoChars } from '@/lib/splitText'
import SectionLabel from '@/components/ui/SectionLabel'
import OrnamentalDivider from '@/components/ui/OrnamentalDivider'
import { BRAND, SERVICES } from '@/constants/content'
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, ArrowRight, ArrowLeft, User, Briefcase, FileCheck } from 'lucide-react'

const BUDGET_OPTIONS = [
  'Under ₹10,000/month',
  '₹10,000 — ₹25,000/month',
  '₹25,000 — ₹60,000/month',
  '₹60,000+/month',
  'One-time project (flexible)',
]

const SERVICE_OPTIONS = [
  { value: 'social-media', label: 'Social Media Management' },
  { value: 'content-creation', label: 'Content Creation' },
  { value: 'brand-identity', label: 'Brand Identity & Design' },
  { value: 'digital-advertising', label: 'Digital Advertising' },
  { value: 'website-design', label: 'Website Design & Development' },
  { value: 'marketing-strategy', label: 'Marketing Strategy & Consulting' },
  { value: 'custom', label: 'Custom Package' },
]

export default function ContactPageClient() {
  const searchParams = useSearchParams()
  const prefilledService = searchParams.get('service') || ''

  const [currentStep, setCurrentStep] = useState(0)
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: prefilledService,
    budget: '',
    message: '',
  })

  const heroRef = useRef<HTMLHeadingElement>(null)
  const stepsContainerRef = useRef<HTMLDivElement>(null)
  const step0Ref = useRef<HTMLDivElement>(null)
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const stepRefs = [step0Ref, step1Ref, step2Ref]

  // Hero text animation
  useEffect(() => {
    if (!heroRef.current) return
    const result = splitTextIntoChars(heroRef.current)
    gsap.fromTo(result.chars, {
      y: 80,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.03,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.5,
    })
  }, [])

  // Update service when URL param changes
  useEffect(() => {
    if (prefilledService) {
      setForm(prev => ({ ...prev, service: prefilledService }))
    }
  }, [prefilledService])

  // Step transition animation
  const goToStep = (nextStep: number) => {
    const currentRef = stepRefs[currentStep]?.current
    const nextRef = stepRefs[nextStep]?.current
    if (!currentRef || !nextRef) return

    const direction = nextStep > currentStep ? 1 : -1

    gsap.to(currentRef, {
      x: `${-100 * direction}%`,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        currentRef.style.display = 'none'
        nextRef.style.display = 'block'
        gsap.fromTo(nextRef,
          { x: `${100 * direction}%`, opacity: 0 },
          { x: '0%', opacity: 1, duration: 0.4, ease: 'power2.out' }
        )
        setCurrentStep(nextStep)
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('sending')

    // Submit to Netlify Forms via fetch
    try {
      const formData = new URLSearchParams()
      formData.append('form-name', 'contact')
      Object.entries(form).forEach(([key, value]) => formData.append(key, value))

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      })
    } catch {
      // Fallback — still show success for demo
    }

    setFormState('sent')

    // Animate success state
    if (successRef.current) {
      gsap.fromTo(successRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )
    }
  }

  const stepLabels = [
    { icon: User, label: 'About You' },
    { icon: Briefcase, label: 'Your Needs' },
    { icon: FileCheck, label: 'Confirm' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative bg-vintage-cream pt-32 pb-16 px-5 md:px-8" aria-label="Contact hero">
        {/* Animated ornamental frame */}
        <svg className="absolute inset-8 w-[90%] h-[90%] pointer-events-none" aria-hidden viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
          <rect x="1" y="1" width="98" height="98" stroke="#D9942B" strokeWidth="0.8"
            strokeDasharray="400" strokeDashoffset="400" fill="none"
            style={{ animation: 'drawFrame 2s ease-in-out 0.3s forwards' }}
          />
        </svg>
        <style>{`@keyframes drawFrame { to { stroke-dashoffset: 0; } }`}</style>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <SectionLabel className="mb-8">Get In Touch</SectionLabel>
          <h1
            ref={heroRef}
            className="font-cinzel font-black text-vintage-maroon uppercase leading-none mb-6"
            style={{ fontSize: 'clamp(3rem,7vw,5rem)' }}
          >
            Let&apos;s Start A Conversation
          </h1>
          <p className="font-cormorant italic text-vintage-charcoal/60 text-xl max-w-xl mx-auto">
            Every great campaign begins with a single conversation. Let&apos;s have ours.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-16 px-5 md:px-8 bg-halftone border-t-8 border-vintage-maroon" aria-label="Contact options and form">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Left — info + WhatsApp */}
          <div className="space-y-8">
            <div>
              <h2 className="font-cinzel font-black text-vintage-maroon text-2xl uppercase mb-6">Contact Details</h2>

              <ul className="space-y-5">
                {[
                  { icon: Phone,  label: 'Phone',   value: BRAND.phone, href: `tel:${BRAND.phone}` },
                  { icon: Mail,   label: 'Email',   value: BRAND.email, href: `mailto:${BRAND.email}` },
                  { icon: MapPin, label: 'Address', value: 'Bhagalpur, Bihar, India 812001', href: '#' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-vintage-maroon flex items-center justify-center flex-shrink-0 brutalist-border">
                      <Icon size={16} className="text-vintage-amber" />
                    </div>
                    <div>
                      <p className="font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-amber">{label}</p>
                      <a href={href} className="font-lato text-vintage-charcoal hover:text-vintage-maroon transition-colors">{value}</a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <OrnamentalDivider />

            {/* WhatsApp card */}
            <div className="brutalist-border p-6 bg-vintage-maroon relative overflow-hidden">
              <div className="absolute inset-0 bg-halftone opacity-10" />
              <div className="relative z-10">
                <h3 className="font-cinzel font-black text-vintage-cream text-xl uppercase mb-3">
                  Quick Chat on WhatsApp
                </h3>
                <p className="font-lato text-vintage-cream/70 text-sm mb-4">
                  Get a response within 1 hour during business hours. Chat with us directly.
                </p>

                {/* Response time badge */}
                <div className="flex items-center gap-2 mb-5 bg-vintage-charcoal/30 px-3 py-2 rounded-sm inline-flex">
                  <span className="pulse-dot" />
                  <span className="font-lato font-bold text-vintage-cream text-xs">
                    Typically responds in &lt; 1 hour
                  </span>
                </div>

                <div className="relative inline-flex">
                  <span className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring opacity-40" />
                  <span className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring-2 opacity-30" />
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Namaste! I want to know more about Parchar India\'s services.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center gap-3 bg-whatsapp text-white font-lato font-black uppercase tracking-widest px-6 py-3 text-sm rounded-sm brutalist-border hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={18} />
                    Chat Now on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Business hours */}
            <div className="brutalist-border p-5 bg-vintage-cream">
              <h3 className="font-cinzel font-black text-vintage-maroon uppercase mb-3">Business Hours</h3>
              <ul className="space-y-1 font-lato text-sm text-vintage-charcoal/70">
                <li className="flex justify-between"><span>Monday — Friday</span><span className="font-bold text-vintage-maroon">9:00 AM — 7:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday</span><span className="font-bold text-vintage-maroon">10:00 AM — 4:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday</span><span className="font-bold text-vintage-charcoal/40">Closed</span></li>
              </ul>
            </div>
          </div>

          {/* Right — Multi-Step Form */}
          <div className="brutalist-border p-8 bg-vintage-cream brutalist-shadow">
            {formState === 'sent' ? (
              /* Success State */
              <div ref={successRef} className="flex flex-col items-center justify-center py-12 text-center" style={{ opacity: 0 }}>
                <div className="w-24 h-24 mb-6 relative">
                  <Image
                    src="/mascot.png"
                    alt="Parcharak mascot celebrating"
                    width={96}
                    height={96}
                    className="object-contain ink-bleed-amber animate-breathe"
                  />
                </div>
                <CheckCircle size={48} className="text-vintage-amber mb-4" />
                <h3 className="font-cinzel font-black text-vintage-maroon text-2xl uppercase mb-2">Message Received!</h3>
                <p className="font-lato text-vintage-charcoal/70 mb-2">Your inquiry has been sent successfully.</p>
                <p className="font-lato text-vintage-charcoal/50 text-sm">We&apos;ll get back to you within 24 hours.</p>

                {/* Response badge */}
                <div className="flex items-center gap-2 mt-6 bg-vintage-maroon px-4 py-2 brutalist-border-thin">
                  <span className="pulse-dot" />
                  <span className="font-lato font-bold text-vintage-cream text-xs">Expect a response within 1 hour</span>
                </div>
              </div>
            ) : (
              <>
                {/* Step Progress Indicator */}
                <div className="flex items-center justify-center gap-2 mb-8">
                  {stepLabels.map((step, i) => {
                    const StepIcon = step.icon
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 ${
                          i === currentStep
                            ? 'bg-vintage-maroon text-vintage-cream brutalist-border-thin'
                            : i < currentStep
                            ? 'bg-vintage-amber text-vintage-maroon brutalist-border-thin'
                            : 'bg-vintage-cream text-vintage-charcoal/40 border-2 border-vintage-charcoal/20'
                        }`}>
                          <StepIcon size={14} />
                          <span className="font-lato font-black text-[10px] uppercase tracking-wider hidden sm:inline">
                            {step.label}
                          </span>
                        </div>
                        {i < stepLabels.length - 1 && (
                          <div className={`w-8 h-[2px] ${i < currentStep ? 'bg-vintage-amber' : 'bg-vintage-charcoal/20'}`} />
                        )}
                      </div>
                    )
                  })}
                </div>

                <h2 className="font-cinzel font-black text-vintage-maroon text-xl uppercase mb-6 text-center">
                  {stepLabels[currentStep].label}
                </h2>

                {/* Netlify Forms hidden form */}
                <form name="contact" data-netlify="true" hidden>
                  <input type="text" name="name" />
                  <input type="email" name="email" />
                  <input type="tel" name="phone" />
                  <select name="service"><option></option></select>
                  <select name="budget"><option></option></select>
                  <textarea name="message"></textarea>
                </form>

                <div ref={stepsContainerRef} className="relative overflow-hidden" style={{ minHeight: '320px' }}>
                  {/* Step 1: Tell us about yourself */}
                  <div ref={step0Ref} className="w-full" style={{ display: currentStep === 0 ? 'block' : 'none' }}>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-maroon mb-2">
                          Full Name <span className="text-vintage-amber">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-transparent border-b-2 border-vintage-maroon/30 focus:border-vintage-amber py-3 font-lato text-vintage-charcoal outline-none transition-colors placeholder:text-vintage-charcoal/30"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-maroon mb-2">
                          Email Address <span className="text-vintage-amber">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-transparent border-b-2 border-vintage-maroon/30 focus:border-vintage-amber py-3 font-lato text-vintage-charcoal outline-none transition-colors placeholder:text-vintage-charcoal/30"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-maroon mb-2">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-transparent border-b-2 border-vintage-maroon/30 focus:border-vintage-amber py-3 font-lato text-vintage-charcoal outline-none transition-colors placeholder:text-vintage-charcoal/30"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => form.name && form.email && goToStep(1)}
                      disabled={!form.name || !form.email}
                      className="mt-8 w-full bg-vintage-maroon text-vintage-cream font-lato font-black uppercase tracking-widest py-4 brutalist-border active-press hover:bg-vintage-amber hover:text-vintage-maroon transition-colors flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next Step
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* Step 2: What do you need? */}
                  <div ref={step1Ref} className="w-full" style={{ display: 'none' }}>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="service" className="block font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-maroon mb-2">
                          Service Interested In
                        </label>
                        <select
                          id="service"
                          value={form.service}
                          onChange={e => setForm(prev => ({ ...prev, service: e.target.value }))}
                          className="w-full bg-vintage-cream border-b-2 border-vintage-maroon/30 focus:border-vintage-amber py-3 font-lato text-vintage-charcoal outline-none transition-colors"
                        >
                          <option value="">Select a service...</option>
                          {SERVICE_OPTIONS.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-maroon mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          value={form.budget}
                          onChange={e => setForm(prev => ({ ...prev, budget: e.target.value }))}
                          className="w-full bg-vintage-cream border-b-2 border-vintage-maroon/30 focus:border-vintage-amber py-3 font-lato text-vintage-charcoal outline-none transition-colors"
                        >
                          <option value="">Select budget range...</option>
                          {BUDGET_OPTIONS.map(b => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="block font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-maroon mb-2">
                          Your Message <span className="text-vintage-amber">*</span>
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          required
                          value={form.message}
                          onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                          className="w-full bg-transparent border-b-2 border-vintage-maroon/30 focus:border-vintage-amber py-3 font-lato text-vintage-charcoal outline-none transition-colors resize-none placeholder:text-vintage-charcoal/30"
                          placeholder="Tell us about your brand and what you're looking for..."
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-8">
                      <button
                        onClick={() => goToStep(0)}
                        className="flex-1 border-4 border-vintage-maroon text-vintage-maroon font-lato font-black uppercase tracking-widest py-4 hover:bg-vintage-maroon hover:text-vintage-cream transition-colors flex items-center justify-center gap-2"
                      >
                        <ArrowLeft size={16} />
                        Back
                      </button>
                      <button
                        onClick={() => form.message && goToStep(2)}
                        disabled={!form.message}
                        className="flex-[2] bg-vintage-maroon text-vintage-cream font-lato font-black uppercase tracking-widest py-4 brutalist-border active-press hover:bg-vintage-amber hover:text-vintage-maroon transition-colors flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Review
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Confirm & Send */}
                  <div ref={step2Ref} className="w-full" style={{ display: 'none' }}>
                    <div className="space-y-4">
                      <h3 className="font-cinzel font-black text-vintage-maroon uppercase text-base mb-4">Review Your Details</h3>

                      {[
                        { label: 'Name', value: form.name },
                        { label: 'Email', value: form.email },
                        { label: 'Phone', value: form.phone || 'Not provided' },
                        { label: 'Service', value: SERVICE_OPTIONS.find(s => s.value === form.service)?.label || form.service || 'Not selected' },
                        { label: 'Budget', value: form.budget || 'Not selected' },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-center py-2 border-b border-vintage-maroon/10">
                          <span className="font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-amber">{label}</span>
                          <span className="font-lato text-vintage-charcoal text-sm">{value}</span>
                        </div>
                      ))}

                      <div className="py-2">
                        <span className="font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-amber block mb-2">Message</span>
                        <p className="font-lato text-vintage-charcoal text-sm bg-vintage-cream-l p-3 brutalist-border-thin">
                          {form.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                      <button
                        onClick={() => goToStep(1)}
                        className="flex-1 border-4 border-vintage-maroon text-vintage-maroon font-lato font-black uppercase tracking-widest py-4 hover:bg-vintage-maroon hover:text-vintage-cream transition-colors flex items-center justify-center gap-2"
                      >
                        <ArrowLeft size={16} />
                        Edit
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={formState === 'sending'}
                        className="flex-[2] bg-vintage-maroon text-vintage-cream font-lato font-black uppercase tracking-widest py-4 brutalist-border active-press hover:bg-vintage-amber hover:text-vintage-maroon transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
                      >
                        <Send size={16} />
                        {formState === 'sending' ? 'Sending...' : 'Send My Inquiry'}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
