import type { FormatHint } from './FormatHint.ts'

export type PrimitiveValue = boolean | number | string

export class SettingValue {
  constructor(
    public readonly value: PrimitiveValue,
    public readonly formatHint: FormatHint,
  ) {}

  toIniString(): string {
    if (!this.isModified()) {
      return this.formatHint.rawString
    }

    const v = this.value

    if (typeof v === 'boolean') {
      return v ? 'True' : 'False'
    }

    if (typeof v === 'number') {
      if (this.formatHint.isDecimal) {
        return v.toFixed(this.formatHint.decimalPlaces)
      }
      return String(Math.round(v))
    }

    if (typeof v === 'string') {
      if (this.formatHint.isTuple) {
        return v
      }
      if (this.formatHint.isQuoted) {
        return `"${v}"`
      }
      return v
    }

    return String(v)
  }

  withValue(newValue: PrimitiveValue): SettingValue {
    return new SettingValue(newValue, this.formatHint)
  }

  isModified(): boolean {
    return String(this.value) !== this.parsedOriginal()
  }

  private parsedOriginal(): string {
    const raw = this.formatHint.rawString

    if (this.formatHint.isQuoted) {
      return raw.slice(1, -1)
    }
    if (raw === 'True') return 'true'
    if (raw === 'False') return 'false'
    if (this.formatHint.isTuple) return raw

    if (!isNaN(Number(raw)) && raw !== '') {
      return String(parseFloat(raw))
    }

    return raw
  }
}
