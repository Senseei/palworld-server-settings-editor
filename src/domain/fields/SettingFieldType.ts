export type SettingFieldType =
  | { kind: 'boolean' }
  | { kind: 'number'; min: number; max: number; step: number }
  | { kind: 'select'; options: string[] }
  | { kind: 'text' }
