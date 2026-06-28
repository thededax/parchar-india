interface StampBadgeProps {
  text?: string
  size?: number
  className?: string
  animate?: boolean
}

export default function StampBadge({
  text = 'Parchar India • ESTD. 2024 •',
  size = 96,
  className = '',
  animate = true,
}: StampBadgeProps) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full brutalist-border bg-vintage-maroon ${animate ? 'animate-spin-seal' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full text-vintage-cream p-2">
        <path
          id="stamp-curve"
          d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="transparent"
        />
        <text className="text-[10px] font-bold uppercase tracking-widest" fill="currentColor" fontSize="10">
          <textPath href="#stamp-curve">{text}</textPath>
        </text>
      </svg>
    </div>
  )
}
