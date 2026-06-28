'use client'
import { useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import OrnamentalDivider from '@/components/ui/OrnamentalDivider'
import FadeSlideUp from '@/components/animations/FadeSlideUp'
import { BRAND } from '@/constants/content'
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react'

export default function ContactPageClient() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('sending')
    // Simulate send
    await new Promise(r => setTimeout(r, 1500))
    setFormState('sent')
  }

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
          <h1 className="font-cinzel font-black text-vintage-maroon uppercase leading-none mb-6"
            style={{ fontSize: 'clamp(3rem,7vw,5rem)' }}>
            Let's Start<br /><span className="text-vintage-amber">A Conversation</span>
          </h1>
          <p className="font-cormorant italic text-vintage-charcoal/60 text-xl max-w-xl mx-auto">
            Every great campaign begins with a single conversation. Let's have ours.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-16 px-5 md:px-8 bg-halftone border-t-8 border-vintage-maroon" aria-label="Contact options and form">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Left — info + WhatsApp */}
          <FadeSlideUp>
            <div className="space-y-8">
              <div>
                <h2 className="font-cinzel font-black text-vintage-maroon text-2xl uppercase mb-6">Contact Details</h2>

                <ul className="space-y-5">
                  {[
                    { icon: Phone,   label: 'Phone',   value: BRAND.phone, href: `tel:${BRAND.phone}` },
                    { icon: Mail,    label: 'Email',   value: BRAND.email, href: `mailto:${BRAND.email}` },
                    { icon: MapPin,  label: 'Address', value: 'Bhagalpur, Bihar, India 812001', href: '#' },
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
                  <p className="font-lato text-vintage-cream/70 text-sm mb-5">
                    Get a response within 1 hour during business hours. Chat with us directly.
                  </p>
                  {/* Pulse rings */}
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
          </FadeSlideUp>

          {/* Right — Form */}
          <FadeSlideUp delay={0.15}>
            <div className="brutalist-border p-8 bg-vintage-cream brutalist-shadow">
              <h2 className="font-cinzel font-black text-vintage-maroon text-2xl uppercase mb-8">Send Us a Message</h2>

              {formState === 'sent' ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle size={56} className="text-vintage-amber mb-4" />
                  <h3 className="font-cinzel font-black text-vintage-maroon text-2xl uppercase mb-2">Message Sent!</h3>
                  <p className="font-lato text-vintage-charcoal/70">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { id: 'name',    label: 'Full Name',     type: 'text',  required: true },
                    { id: 'email',   label: 'Email Address', type: 'email', required: true },
                    { id: 'phone',   label: 'Phone Number',  type: 'tel',   required: false },
                  ].map(({ id, label, type, required }) => (
                    <div key={id} className="relative">
                      <label htmlFor={id} className="block font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-maroon mb-2">
                        {label} {required && <span className="text-vintage-amber">*</span>}
                      </label>
                      <input
                        id={id}
                        type={type}
                        required={required}
                        value={form[id as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [id]: e.target.value }))}
                        className="w-full bg-transparent border-b-2 border-vintage-maroon/30 focus:border-vintage-amber py-2 font-lato text-vintage-charcoal outline-none transition-colors placeholder:text-vintage-charcoal/30"
                        placeholder={`Your ${label.toLowerCase()}`}
                      />
                    </div>
                  ))}

                  {/* Service select */}
                  <div>
                    <label htmlFor="service" className="block font-lato font-black text-[10px] uppercase tracking-[0.3em] text-vintage-maroon mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={e => setForm(prev => ({ ...prev, service: e.target.value }))}
                      className="w-full bg-vintage-cream border-b-2 border-vintage-maroon/30 focus:border-vintage-amber py-2 font-lato text-vintage-charcoal outline-none transition-colors"
                    >
                      <option value="">Select a service...</option>
                      {['Social Media Management','Content Creation','Brand Identity','Digital Advertising','Website Design','Marketing Strategy','Custom Package'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
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
                      className="w-full bg-transparent border-b-2 border-vintage-maroon/30 focus:border-vintage-amber py-2 font-lato text-vintage-charcoal outline-none transition-colors resize-none placeholder:text-vintage-charcoal/30"
                      placeholder="Tell us about your brand and what you're looking for..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="w-full bg-vintage-maroon text-vintage-cream font-lato font-black uppercase tracking-widest py-4 brutalist-border active-press hover:bg-vintage-amber hover:text-vintage-maroon transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
                  >
                    <Send size={16} />
                    {formState === 'sending' ? 'Sending...' : 'Send My Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </FadeSlideUp>
        </div>
      </section>
    </>
  )
}
