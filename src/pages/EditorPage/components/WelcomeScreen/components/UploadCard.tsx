import { Sparkles, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface UploadCardProps {
  onUpload: () => void
}

export function UploadCard({ onUpload }: UploadCardProps) {
  return (
    <Card className="border-primary/20 p-16 text-center max-w-[600px]">
      <Sparkles size={64} className="text-primary mx-auto mb-6 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse" />
      <h2 className="text-3xl font-bold mb-4 text-foreground">Welcome, Pal Trainer!</h2>
      <p className="text-muted-foreground mb-8 text-lg">
        Upload your PalWorldSettings.ini file to start customizing your adventure
      </p>
      <Button size="lg" onClick={onUpload}>
        <Upload size={24} />
        Select Configuration File
      </Button>
    </Card>
  )
}
