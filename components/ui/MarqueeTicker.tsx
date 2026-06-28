'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface MarqueeTickerProps {
  items: string[]
  direction?: 'left' | 'right'
  speed?: number
  className?: string
  itemClassName?: string
  separator?: string
}

export default function MarqueeTicker({
  items,
  direction = 'left',
  speed = 25,
  className = '',
  itemClassName = '',
  separator = '◆',
}: MarqueeTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  // Duplicate items for seamless loop
  const doubled = [...items, ...items, ...items, ...items]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const totalW = track.scrollWidth / 2

    const tween = gsap.to(track, {
      x: direction === 'left' ? -totalW : totalW,
      duration: speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (x: string) => {
          const val = parseFloat(x) % totalW
          return direction === 'left'
            ? (val <= 0 ? val : val - totalW) + 'px'
            : (val >= 0 ? val : val + totalW) + 'px'
        },
      },
    })

    tweenRef.current = tween

    // Slow on hover
    const onEnter = () => gsap.to(tween, { timeScale: 0.25, duration: 0.4 })
    const onLeave = () => gsap.to(tween, { timeScale: 1,    duration: 0.4 })

    track.parentElement?.addEventListener('mouseenter', onEnter)
    track.parentElement?.addEventListener('mouseleave', onLeave)

    return () => {
      tween.kill()
    }
  }, [direction, speed])

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex items-center whitespace-nowrap will-change-transform">
        {doubled.map((item, i) => (
          <span key={i} className={`flex items-center gap-4 px-4 ${itemClassName}`}>
            <span>{item}</span>
            <span className="text-vintage-amber opacity-60">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
