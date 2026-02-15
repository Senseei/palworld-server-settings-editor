import { createFormatHint } from '../values/FormatHint.ts'
import { SettingValue, type PrimitiveValue } from '../values/SettingValue.ts'
import { SettingField } from '../fields/SettingField.ts'
import { ConfigSection } from '../sections/ConfigSection.ts'
import { PalworldConfig, type RawPair } from '../config/PalworldConfig.ts'
import { SECTIONS } from '../config/settingsMetadata.ts'
import { tokenize } from './IniTokenizer.ts'

function parseRawValue(raw: string): PrimitiveValue {
  if (raw.startsWith('"') && raw.endsWith('"')) {
    return raw.slice(1, -1)
  }
  if (raw === 'True') return true
  if (raw === 'False') return false
  if (raw.startsWith('(') && raw.endsWith(')')) return raw
  if (!isNaN(Number(raw)) && raw !== '') return parseFloat(raw)
  return raw
}

export function parse(content: string): PalworldConfig {
  const { sectionHeader, tokens } = tokenize(content)

  const rawPairs: RawPair[] = tokens.map(t => ({ key: t.key, rawValue: t.rawValue }))

  const allValues = new Map<string, SettingValue>()
  for (const token of tokens) {
    const hint = createFormatHint(token.rawValue)
    const value = parseRawValue(token.rawValue)
    allValues.set(token.key, new SettingValue(value, hint))
  }

  const sections = SECTIONS.map(meta => {
    const fields = meta.settings.map(sm => {
      const sv = allValues.get(sm.key) ?? null
      return new SettingField(sm.key, sm.label, sm.fieldType, sv)
    })
    return new ConfigSection(meta.id, meta.label, meta.icon, meta.color, fields)
  })

  return new PalworldConfig(sections, rawPairs, allValues, sectionHeader)
}
