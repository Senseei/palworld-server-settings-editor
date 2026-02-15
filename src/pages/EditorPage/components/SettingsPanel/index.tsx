import type { ConfigSection } from '@/domain/sections/ConfigSection.ts'
import type { PrimitiveValue } from '@/domain/values/SettingValue.ts'
import { SettingRow } from './components/SettingRow.tsx'

interface SettingsPanelProps {
  section: ConfigSection
  onUpdateSetting: (key: string, value: PrimitiveValue) => void
}

export function SettingsPanel({ section, onUpdateSetting }: SettingsPanelProps) {
  return (
    <div className="bg-card backdrop-blur-[20px] border-2 border-border rounded-2xl p-8 relative z-1 animate-slideUp">
      {section.fields.map((field) => (
        <SettingRow
          key={field.key}
          field={field}
          accentColor={section.color}
          onChange={(value: PrimitiveValue) => onUpdateSetting(field.key, value)}
        />
      ))}
    </div>
  )
}
