import { useState, useCallback, useMemo } from 'react'
import type { PalworldConfig } from '@/domain/config/PalworldConfig.ts'
import type { ConfigSection } from '@/domain/sections/ConfigSection.ts'
import type { PrimitiveValue } from '@/domain/values/SettingValue.ts'

export function useSettings() {
  const [config, setConfig] = useState<PalworldConfig | null>(null)
  const [activeTab, setActiveTab] = useState('gameplay')

  const loadConfig = useCallback((newConfig: PalworldConfig) => {
    setConfig(newConfig)
  }, [])

  const resetConfig = useCallback(() => {
    setConfig(null)
    setActiveTab('gameplay')
  }, [])

  const updateSetting = useCallback((sectionId: string, key: string, value: PrimitiveValue) => {
    setConfig(prev => {
      if (!prev) return prev
      const existingValue = prev.allValues.get(key)
      if (!existingValue) return prev
      const newSettingValue = existingValue.withValue(value)
      return prev.withUpdatedSetting(sectionId, key, newSettingValue)
    })
  }, [])

  const activeSection: ConfigSection | undefined = useMemo(
    () => config?.getSection(activeTab),
    [config, activeTab]
  )

  return {
    config,
    activeTab,
    setActiveTab,
    loadConfig,
    resetConfig,
    updateSetting,
    activeSection,
  }
}
