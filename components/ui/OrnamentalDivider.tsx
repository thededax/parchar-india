export default function OrnamentalDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`ornament-divider ${className}`}>
      <span className="font-lato text-vintage-amber text-lg">◆</span>
    </div>
  )
}
