import { Upload, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileActionsProps {
  hasConfig: boolean
  onUpload: () => void
  onSave: () => void
}

export function FileActions({ hasConfig, onUpload, onSave }: FileActionsProps) {
  if (!hasConfig) {
    return (
      <Button onClick={onUpload}>
        <Upload size={20} />
        Import Settings
      </Button>
    )
  }

  return (
    <Button variant="overwrite" onClick={onSave}>
      <Save size={18} />
      Save
    </Button>
  )
}
