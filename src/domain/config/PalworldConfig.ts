import { ConfigSection } from '../sections/ConfigSection.ts'
import type { SettingValue } from '../values/SettingValue.ts'

export interface RawPair {
  key: string
  rawValue: string
}

export class PalworldConfig {
  constructor(
    public readonly sections: ConfigSection[],
    public readonly rawPairs: RawPair[],
    public readonly allValues: Map<string, SettingValue>,
    public readonly sectionHeader: string,
  ) {}

  withUpdatedSetting(sectionId: string, key: string, value: SettingValue): PalworldConfig {
    const newSections = this.sections.map(s =>
      s.id === sectionId ? s.withUpdatedField(key, value) : s
    )
    const newAllValues = new Map(this.allValues)
    newAllValues.set(key, value)
    return new PalworldConfig(newSections, this.rawPairs, newAllValues, this.sectionHeader)
  }

  getSection(id: string): ConfigSection | undefined {
    return this.sections.find(s => s.id === id)
  }

  get totalSettingsCount(): number {
    return this.allValues.size
  }

  get uiSettingsCount(): number {
    return this.sections.reduce((sum, s) => sum + s.fields.length, 0)
  }
}
