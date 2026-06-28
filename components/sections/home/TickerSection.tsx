'use client'
import MarqueeTicker from '@/components/ui/MarqueeTicker'
import { TICKER_ITEMS } from '@/constants/content'

export default function TickerSection() {
  // Two rows, opposite directions — creates dual-marquee depth effect
  return (
    <section className="py-0 overflow-hidden border-t-8 border-b-8 border-vintage-maroon" aria-label="Services ticker">
      {/* Lane 1: left */}
      <MarqueeTicker
        items={TICKER_ITEMS}
        direction="left"
        speed={30}
        className="bg-vintage-maroon py-4"
        itemClassName="font-cinzel font-black text-sm uppercase tracking-widest text-vintage-cream"
        separator="★"
      />
      {/* Lane 2: right */}
      <MarqueeTicker
        items={[...TICKER_ITEMS].reverse()}
        direction="right"
        speed={35}
        className="bg-vintage-amber py-4"
        itemClassName="font-cinzel font-black text-sm uppercase tracking-widest text-vintage-maroon"
        separator="◆"
      />
    </section>
  )
}
