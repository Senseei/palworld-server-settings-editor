import type { SettingField } from '@/domain/fields/SettingField.ts'
import type { PrimitiveValue } from '@/domain/values/SettingValue.ts'
import { BooleanControl } from '@/components/BooleanControl/index.tsx'
import { NumberControl } from '@/components/NumberControl/index.tsx'
import { SelectControl } from '@/components/SelectControl/index.tsx'
import { TextControl } from '@/components/TextControl/index.tsx'

interface SettingRowProps {
  field: SettingField
  accentColor: string
  onChange: (value: PrimitiveValue) => void
}

export function SettingRow({ field, accentColor, onChange }: SettingRowProps) {
  const rawValue = field.value?.value

  function renderControl() {
    switch (field.fieldType.kind) {
      case 'boolean':
        return (
          <BooleanControl
            value={(rawValue as boolean) ?? false}
            onChange={onChange}
          />
        )
      case 'number':
        return (
          <NumberControl
            value={(rawValue as number) ?? field.fieldType.min}
            min={field.fieldType.min}
            max={field.fieldType.max}
            step={field.fieldType.step}
            accentColor={accentColor}
            onChange={onChange}
          />
        )
      case 'select':
        return (
          <SelectControl
            value={(rawValue as string) ?? field.fieldType.options[0]}
            options={field.fieldType.options}
            onChange={onChange}
          />
        )
      case 'text':
        return (
          <TextControl
            value={(rawValue as string) ?? ''}
            onChange={onChange}
          />
        )
    }
  }

  return (
    <div className="flex justify-between items-center px-5 py-4 border-b border-border/30 last:border-b-0 transition-colors duration-200 hover:bg-[rgba(51,65,85,0.2)]">
      <div className="flex-1">
        <span className="block font-semibold text-base text-foreground mb-1">
          {field.label}
        </span>
        <span className="block text-xs text-[#64748b] font-mono">
          {field.key}
        </span>
      </div>
      <div className="min-w-[250px]">
        {renderControl()}
      </div>
    </div>
  )
}
