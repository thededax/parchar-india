import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Parchar India | Let\'s Build Something Timeless',
  description: 'Get in touch with Parchar India. Start your next campaign, discuss your brand identity, or request a quote for our marketing services.',
  alternates: { canonical: 'https://parcharindia.com/contact' },
}

export default function ContactPage() {
  return <ContactPageClient />
}
