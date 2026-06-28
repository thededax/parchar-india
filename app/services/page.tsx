import type { Metadata } from 'next'
import ServicesPageClient from './ServicesPageClient'

export const metadata: Metadata = {
  title: 'Services — Parchar India | Marketing Agency Bihar',
  description: 'Explore Parchar India\'s full range of services: Social Media Management, Brand Identity, Content Creation, Digital Advertising, Website Design and Marketing Strategy.',
  alternates: { canonical: 'https://parchar-india.netlify.app/services' },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
