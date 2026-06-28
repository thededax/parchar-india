import type { Metadata } from 'next'
import PortfolioPageClient from './PortfolioPageClient'

export const metadata: Metadata = {
  title: 'Portfolio — Parchar India | Brand Stories We\'ve Told',
  description: 'Explore Parchar India\'s portfolio of brand identity, social media, digital advertising, and content creation projects across Bihar and India.',
  alternates: { canonical: 'https://parchar-india.netlify.app/portfolio' },
}

export default function PortfolioPage() {
  return <PortfolioPageClient />
}
