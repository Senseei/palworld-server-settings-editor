import { SettingField } from '../fields/SettingField.ts'
import type { SettingValue } from '../values/SettingValue.ts'

export class ConfigSection {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly icon: string,
    public readonly color: string,
    public readonly fields: SettingField[],
  ) {}

  withUpdatedField(key: string, value: SettingValue): ConfigSection {
    const newFields = this.fields.map(f =>
      f.key === key ? f.withUpdatedValue(value) : f
    )
    return new ConfigSection(this.id, this.label, this.icon, this.color, newFields)
  }
}
