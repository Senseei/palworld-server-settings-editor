import { Info } from 'lucide-react'

interface InfoBoxProps {
  uiCount: number
}

export function InfoBox({ uiCount }: InfoBoxProps) {
  return (
    <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center gap-4 text-left text-muted-foreground text-sm">
      <Info size={20} className="shrink-0 text-blue-500" />
      <div>
        <strong className="text-foreground">Safe Editing:</strong> All settings are preserved.
        Only the {uiCount} settings shown in the UI will be editable.
      </div>
    </div>
  )
}
