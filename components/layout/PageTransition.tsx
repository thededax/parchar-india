'use client'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } }}
    >
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
    </motion.div>
  )
}

