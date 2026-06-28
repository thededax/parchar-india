import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { TextPlugin } from 'gsap/TextPlugin'
import { CustomEase } from 'gsap/CustomEase'

// DrawSVGPlugin requires Club GreenSock license — we use a CSS-based fallback
// SplitText is available as our custom splitText utility in lib/splitText.ts

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, CustomEase)

  // Custom eases matching Parchar India's heritage-premium feel
  CustomEase.create('parchar.reveal',  '0.16, 1, 0.3, 1')    // Smooth, confident
  CustomEase.create('parchar.bounce',  '0.34, 1.56, 0.64, 1') // Slight overshoot
  CustomEase.create('parchar.drift',   '0.25, 0.46, 0.45, 0.94') // Gentle drift

  // GSAP defaults
  gsap.defaults({
    ease: 'parchar.reveal',
    duration: 0.8,
  })

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
  })
}

export { gsap, ScrollTrigger, ScrollToPlugin, TextPlugin, CustomEase }
