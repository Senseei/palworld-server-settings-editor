import type { SettingFieldType } from './SettingFieldType.ts'
import type { SettingValue } from '../values/SettingValue.ts'

export class SettingField {
  constructor(
    public readonly key: string,
    public readonly label: string,
    public readonly fieldType: SettingFieldType,
    public readonly value: SettingValue | null,
  ) {}

  withUpdatedValue(newValue: SettingValue | null): SettingField {
    return new SettingField(this.key, this.label, this.fieldType, newValue)
  }
}
