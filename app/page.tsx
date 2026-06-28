import type { Metadata } from 'next'
import HeroSection from '@/components/sections/home/HeroSection'
import TickerSection from '@/components/sections/home/TickerSection'
import ServicesSection from '@/components/sections/home/ServicesSection'
import WhyUsSection from '@/components/sections/home/WhyUsSection'
import PortfolioTeaser from '@/components/sections/home/PortfolioTeaser'
import TestimonialsSection from '@/components/sections/home/TestimonialsSection'
import StatsSection from '@/components/sections/home/StatsSection'
import FinalCTASection from '@/components/sections/home/FinalCTASection'

export const metadata: Metadata = {
  title: 'Parchar India — Timeless Messages. Lasting Impact.',
  description:
    'Parchar India is Bhagalpur\'s premier full-service marketing and social media agency. We craft campaigns that move Indian consumers and build iconic brands.',
  alternates: { canonical: 'https://parchar-india.netlify.app' },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TickerSection />
      <ServicesSection />
      <WhyUsSection />
      <PortfolioTeaser />
      <TestimonialsSection />
      <StatsSection />
      <FinalCTASection />
    </>
  )
}
