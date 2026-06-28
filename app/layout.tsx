import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/layout/PageTransition'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp'

export const metadata: Metadata = {
  metadataBase: new URL('https://parchar-india.netlify.app'),
  title: 'Parchar India — Timeless Messages. Lasting Impact.',
  description:
    'Parchar India is a full-service marketing and social media agency in Bhagalpur, Bihar. We help Indian businesses communicate powerfully, build iconic brands, and grow faster.',
  keywords: [
    'marketing agency Bhagalpur',
    'social media agency Bihar',
    'digital marketing India',
    'Parchar India',
    'branding agency Bihar',
    'content creation Bhagalpur',
    'advertising agency Bihar',
  ],
  authors: [{ name: 'Parchar India' }],
  openGraph: {
    title: 'Parchar India — Timeless Messages. Lasting Impact.',
    description: 'Full-service marketing & social media agency for Indian businesses.',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Parchar India — Timeless Messages. Lasting Impact.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parchar India — Timeless Messages. Lasting Impact.',
    description: 'Full-service marketing & social media agency for Indian businesses.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-vintage-amber focus:text-vintage-charcoal focus:px-4 focus:py-2 focus:font-bold"
        >
          Skip to main content
        </a>

        <SmoothScrollProvider>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          <PageTransition>
            <main id="main-content">{children}</main>
          </PageTransition>

          <Footer />
          <FloatingWhatsApp />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
