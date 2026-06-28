'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { BRAND } from '@/constants/content'

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  const message = encodeURIComponent('Namaste! I want to know more about Parchar India\'s services.')
  const href = `https://wa.me/${BRAND.whatsapp}?text=${message}`

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-[90] flex items-center gap-3"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Expanded label */}
          <AnimatePresence>
            {expanded && (
              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-vintage-maroon text-vintage-cream font-lato font-bold text-sm px-4 py-3 brutalist-border brutalist-shadow whitespace-nowrap uppercase tracking-widest"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                Chat with Parchar India
              </motion.a>
            )}
          </AnimatePresence>

          {/* WhatsApp button */}
          <div className="relative">
            {/* Pulse rings */}
            <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ backgroundColor: '#25D366', opacity: 0.4 }} />
            <span className="absolute inset-0 rounded-full animate-pulse-ring-2" style={{ backgroundColor: '#25D366', opacity: 0.3 }} />

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp with Parchar India"
              onMouseEnter={() => setExpanded(true)}
              onMouseLeave={() => setExpanded(false)}
              className="relative flex items-center justify-center w-14 h-14 rounded-full brutalist-border z-10"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
