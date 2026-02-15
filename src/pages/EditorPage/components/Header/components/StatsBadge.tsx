import { Info } from 'lucide-react'

interface StatsBadgeProps {
  uiCount: number
  totalCount: number
}

export function StatsBadge({ uiCount, totalCount }: StatsBadgeProps) {
  return (
    <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium">
      <Info size={16} />
      Editing {uiCount} settings &bull; {totalCount} total settings preserved
    </div>
  )
}
