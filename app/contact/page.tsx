import type { Metadata } from 'next'
import { Suspense } from 'react'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Parchar India | Let\'s Build Something Timeless',
  description: 'Get in touch with Parchar India. Start your next campaign, discuss your brand identity, or request a quote for our marketing services.',
  alternates: { canonical: 'https://parchar-india.netlify.app/contact' },
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-vintage-cream">
        <div className="text-center">
          <div className="font-cinzel font-black text-vintage-maroon text-2xl uppercase mb-2">Loading...</div>
          <div className="w-12 h-[3px] bg-vintage-amber mx-auto" />
        </div>
      </div>
    }>
      <ContactPageClient />
    </Suspense>
  )
}
