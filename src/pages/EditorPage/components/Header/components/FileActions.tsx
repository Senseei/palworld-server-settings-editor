import { Upload, Download, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileActionsProps {
  hasConfig: boolean
  onUpload: () => void
  onDownloadNew: () => void
  onOverwrite: () => void
}

export function FileActions({ hasConfig, onUpload, onDownloadNew, onOverwrite }: FileActionsProps) {
  if (!hasConfig) {
    return (
      <Button onClick={onUpload}>
        <Upload size={20} />
        Import Settings
      </Button>
    )
  }

  return (
    <div className="flex gap-3">
      <Button variant="download" onClick={onDownloadNew}>
        <Download size={18} />
        Save as New
      </Button>
      <Button variant="overwrite" onClick={onOverwrite}>
        <Save size={18} />
        Overwrite
      </Button>
    </div>
  )
}
