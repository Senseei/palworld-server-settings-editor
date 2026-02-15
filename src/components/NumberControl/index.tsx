import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

interface NumberControlProps {
  value: number
  min: number
  max: number
  step: number
  accentColor?: string
  onChange: (value: number) => void
}

export function NumberControl({ value, min, max, step, accentColor, onChange }: NumberControlProps) {
  return (
    <div className="flex flex-col gap-2">
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || min)}
        min={min}
        max={max}
        step={step}
        className="text-center font-semibold"
      />
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        accentColor={accentColor}
      />
    </div>
  )
}
