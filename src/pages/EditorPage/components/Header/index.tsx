import { Sparkles } from 'lucide-react'
import { StatsBadge } from './components/StatsBadge.tsx'
import { FileActions } from './components/FileActions.tsx'

interface HeaderProps {
  hasConfig: boolean
  uiCount: number
  totalCount: number
  onUpload: () => void
  onSave: () => void
}

export function Header({ hasConfig, uiCount, totalCount, onUpload, onSave }: HeaderProps) {
  const isTauri = '__TAURI_INTERNALS__' in window || '__TAURI__' in window
  
  return (
    <div className="flex justify-between items-center mb-8 relative z-1">
      <div className="flex-1">
        <h1 className="text-[2.5rem] font-extrabold m-0 flex items-center gap-4 bg-gradient-to-br from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent animate-shimmer">
          <Sparkles size={40} className="text-primary drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-float" />
          Palworld Settings Editor
          <span className={`text-xs font-normal px-2 py-1 rounded ${isTauri ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
            {isTauri ? '🚀 Tauri' : '🌐 Browser'}
          </span>
        </h1>
        <p className="mt-2 text-lg text-muted-foreground font-light tracking-wide">
          Configure your perfect Palworld experience
        </p>
        {hasConfig && <StatsBadge uiCount={uiCount} totalCount={totalCount} />}
      </div>

      <FileActions
        hasConfig={hasConfig}
        onUpload={onUpload}
        onSave={onSave}
      />
    </div>
  )
}
