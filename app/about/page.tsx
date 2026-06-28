import type { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About Parchar India — The Legend of the Parcharak',
  description: 'Learn about Parchar India — Bhagalpur\'s premier marketing agency. Our story, philosophy, and the Parcharak vision that drives us.',
  alternates: { canonical: 'https://parchar-india.netlify.app/about' },
}

export default function AboutPage() {
  return <AboutPageClient />
}
