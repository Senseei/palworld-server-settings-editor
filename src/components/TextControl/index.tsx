import { Input } from '@/components/ui/input'

interface TextControlProps {
  value: string
  onChange: (value: string) => void
}

export function TextControl({ value, onChange }: TextControlProps) {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
