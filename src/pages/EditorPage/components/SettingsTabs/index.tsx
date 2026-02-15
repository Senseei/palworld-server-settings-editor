import type { ConfigSection } from '@/domain/sections/ConfigSection.ts'
import { TabButton } from './components/TabButton.tsx'

interface SettingsTabsProps {
  sections: ConfigSection[]
  activeTab: string
  onTabChange: (id: string) => void
}

export function SettingsTabs({ sections, activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="flex gap-3 mb-8 flex-wrap relative z-1">
      {sections.map((section) => (
        <TabButton
          key={section.id}
          id={section.id}
          label={section.label}
          icon={section.icon}
          color={section.color}
          isActive={activeTab === section.id}
          onClick={() => onTabChange(section.id)}
        />
      ))}
    </div>
  )
}
