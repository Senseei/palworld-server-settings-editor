import type { SettingFieldType } from '../fields/SettingFieldType.ts'

export interface SettingMeta {
  key: string
  label: string
  fieldType: SettingFieldType
}

export interface SectionMeta {
  id: string
  label: string
  icon: string
  color: string
  settings: SettingMeta[]
}

export const SECTIONS: SectionMeta[] = [
  {
    id: 'gameplay',
    label: 'Gameplay',
    icon: 'Gamepad2',
    color: '#10b981',
    settings: [
      { key: 'Difficulty', label: 'Difficulty', fieldType: { kind: 'select', options: ['None', 'Easy', 'Normal', 'Hard'] } },
      { key: 'ExpRate', label: 'EXP Rate', fieldType: { kind: 'number', min: 0.1, max: 10, step: 0.1 } },
      { key: 'PalCaptureRate', label: 'Pal Capture Rate', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'PalSpawnNumRate', label: 'Pal Spawn Rate', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'WorkSpeedRate', label: 'Work Speed', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'CollectionDropRate', label: 'Drop Rate', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'EnemyDropItemRate', label: 'Enemy Drop Rate', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'DeathPenalty', label: 'Death Penalty', fieldType: { kind: 'select', options: ['None', 'Item', 'ItemAndEquipment', 'All'] } },
      { key: 'bEnableFastTravel', label: 'Fast Travel', fieldType: { kind: 'boolean' } },
      { key: 'ItemWeightRate', label: 'Item Weight', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
    ],
  },
  {
    id: 'time',
    label: 'Time & Rates',
    icon: 'Zap',
    color: '#f59e0b',
    settings: [
      { key: 'DayTimeSpeedRate', label: 'Day Speed', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'NightTimeSpeedRate', label: 'Night Speed', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'PalEggDefaultHatchingTime', label: 'Egg Hatch Time', fieldType: { kind: 'number', min: 0.1, max: 10, step: 0.1 } },
      { key: 'AutoSaveSpan', label: 'Auto-Save (minutes)', fieldType: { kind: 'number', min: 1, max: 120, step: 1 } },
      { key: 'SupplyDropSpan', label: 'Supply Drop (seconds)', fieldType: { kind: 'number', min: 10, max: 600, step: 10 } },
    ],
  },
  {
    id: 'player',
    label: 'Player Stats',
    icon: 'User',
    color: '#8b5cf6',
    settings: [
      { key: 'PlayerDamageRateAttack', label: 'Attack Damage', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'PlayerDamageRateDefense', label: 'Defense', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'PlayerStomachDecreaceRate', label: 'Hunger Rate', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'PlayerStaminaDecreaceRate', label: 'Stamina Rate', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'PlayerAutoHPRegeneRate', label: 'HP Regen', fieldType: { kind: 'number', min: 0.1, max: 10, step: 0.1 } },
      { key: 'PlayerAutoHpRegeneRateInSleep', label: 'Sleep HP Regen', fieldType: { kind: 'number', min: 0.1, max: 10, step: 0.1 } },
    ],
  },
  {
    id: 'pals',
    label: 'Pal Stats',
    icon: 'Heart',
    color: '#ec4899',
    settings: [
      { key: 'PalDamageRateAttack', label: 'Pal Attack', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'PalDamageRateDefense', label: 'Pal Defense', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'PalStomachDecreaceRate', label: 'Pal Hunger', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'PalStaminaDecreaceRate', label: 'Pal Stamina', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'PalAutoHPRegeneRate', label: 'Pal HP Regen', fieldType: { kind: 'number', min: 0.1, max: 10, step: 0.1 } },
      { key: 'PalAutoHpRegeneRateInSleep', label: 'Pal Sleep Regen', fieldType: { kind: 'number', min: 0.1, max: 10, step: 0.1 } },
    ],
  },
  {
    id: 'base',
    label: 'Base & Building',
    icon: 'Building',
    color: '#06b6d4',
    settings: [
      { key: 'BaseCampMaxNum', label: 'Max Bases', fieldType: { kind: 'number', min: 1, max: 200, step: 1 } },
      { key: 'BaseCampWorkerMaxNum', label: 'Workers per Base', fieldType: { kind: 'number', min: 1, max: 30, step: 1 } },
      { key: 'BaseCampMaxNumInGuild', label: 'Guild Bases', fieldType: { kind: 'number', min: 1, max: 20, step: 1 } },
      { key: 'BuildObjectHpRate', label: 'Building HP', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'BuildObjectDamageRate', label: 'Building Damage', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
      { key: 'CollectionObjectRespawnSpeedRate', label: 'Resource Respawn', fieldType: { kind: 'number', min: 0.1, max: 5, step: 0.1 } },
    ],
  },
  {
    id: 'multiplayer',
    label: 'Multiplayer',
    icon: 'Users',
    color: '#3b82f6',
    settings: [
      { key: 'bIsMultiplay', label: 'Multiplayer', fieldType: { kind: 'boolean' } },
      { key: 'bIsPvP', label: 'PvP Enabled', fieldType: { kind: 'boolean' } },
      { key: 'CoopPlayerMaxNum', label: 'Coop Players', fieldType: { kind: 'number', min: 1, max: 32, step: 1 } },
      { key: 'ServerPlayerMaxNum', label: 'Server Max Players', fieldType: { kind: 'number', min: 1, max: 32, step: 1 } },
      { key: 'GuildPlayerMaxNum', label: 'Guild Max Players', fieldType: { kind: 'number', min: 1, max: 100, step: 1 } },
      { key: 'bEnablePlayerToPlayerDamage', label: 'PvP Damage', fieldType: { kind: 'boolean' } },
      { key: 'bEnableFriendlyFire', label: 'Friendly Fire', fieldType: { kind: 'boolean' } },
    ],
  },
  {
    id: 'server',
    label: 'Server Config',
    icon: 'Server',
    color: '#64748b',
    settings: [
      { key: 'ServerName', label: 'Server Name', fieldType: { kind: 'text' } },
      { key: 'ServerDescription', label: 'Description', fieldType: { kind: 'text' } },
      { key: 'ServerPassword', label: 'Password', fieldType: { kind: 'text' } },
      { key: 'AdminPassword', label: 'Admin Password', fieldType: { kind: 'text' } },
      { key: 'PublicPort', label: 'Port', fieldType: { kind: 'number', min: 1024, max: 65535, step: 1 } },
      { key: 'PublicIP', label: 'Public IP', fieldType: { kind: 'text' } },
      { key: 'Region', label: 'Region', fieldType: { kind: 'text' } },
      { key: 'bUseAuth', label: 'Use Auth', fieldType: { kind: 'boolean' } },
    ],
  },
]

/** Set of all keys that appear in the UI */
export const UI_KEYS = new Set(SECTIONS.flatMap(s => s.settings.map(m => m.key)))
