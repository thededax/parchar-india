import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

// DrawSVGPlugin requires Club GreenSock license — we use a CSS-based fallback
// SplitText is available in GSAP free tier via gsap/SplitText

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase)

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

export { gsap, ScrollTrigger, CustomEase }
