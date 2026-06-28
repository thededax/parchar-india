'use client'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { ScrollTrigger } from '@/lib/gsap'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Wait for the transition to finish and layouts to settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 600)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {children}

      {/* Cream sweep overlay */}
      <motion.div
        className="fixed inset-0 z-[200] bg-vintage-cream pointer-events-none flex items-center justify-center"
        initial={{ scaleY: 1, originY: '0%' }}
        animate={{ scaleY: 0, originY: '0%', transition: { duration: 0.8, ease: [0.86, 0, 0.07, 1] } }}
      >
        <span className="font-cinzel text-vintage-maroon text-2xl tracking-[0.4em] opacity-40 uppercase">
          Parchar India
        </span>
      </motion.div>
    </>
  )
}

