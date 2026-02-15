import { UploadCard } from './components/UploadCard.tsx'
import { InfoBox } from './components/InfoBox.tsx'

interface WelcomeScreenProps {
  uiCount: number
  onUpload: () => void
}

export function WelcomeScreen({ uiCount, onUpload }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] relative z-1">
      <UploadCard onUpload={onUpload} />
      <InfoBox uiCount={uiCount} />
    </div>
  )
}
