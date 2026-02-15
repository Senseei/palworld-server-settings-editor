import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface TabButtonProps {
  id: string
  label: string
  icon: string
  color: string
  isActive: boolean
  onClick: () => void
}

export function TabButton({ label, icon, color, isActive, onClick }: TabButtonProps) {
  const IconComp = (Icons as unknown as Record<string, LucideIcon>)[icon] ?? Icons.Settings

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-5 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 backdrop-blur-[10px] border-2",
        isActive
          ? "text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          : "bg-[rgba(30,41,59,0.6)] border-border text-muted-foreground hover:bg-[rgba(51,65,85,0.7)] hover:text-foreground hover:-translate-y-0.5"
      )}
      style={
        isActive
          ? { backgroundColor: color, borderColor: color }
          : { '--hover-border': color } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        if (!isActive) (e.currentTarget.style.borderColor = color)
      }}
      onMouseLeave={(e) => {
        if (!isActive) (e.currentTarget.style.borderColor = '')
      }}
    >
      <IconComp size={20} />
      {label}
    </button>
  )
}
