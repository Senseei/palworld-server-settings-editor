import type { ReactNode } from 'react'

export function EditorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] font-sans text-foreground p-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.08)_0%,transparent_40%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.08)_0%,transparent_40%),radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_50%)]" />
      {children}
    </div>
  )
}
