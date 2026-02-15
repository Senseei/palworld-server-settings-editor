import type { PalworldConfig } from '../config/PalworldConfig.ts'

export function write(config: PalworldConfig): string {
  const emitted = new Set<string>()
  const pairs: string[] = []

  // 1. Iterate rawPairs in original order
  for (const rp of config.rawPairs) {
    const sv = config.allValues.get(rp.key)
    if (sv) {
      pairs.push(`${rp.key}=${sv.toIniString()}`)
    } else {
      // Key was in original but not in allValues (shouldn't happen, but preserve)
      pairs.push(`${rp.key}=${rp.rawValue}`)
    }
    emitted.add(rp.key)
  }

  // 2. Append any new settings not in rawPairs
  for (const [key, sv] of config.allValues) {
    if (!emitted.has(key)) {
      pairs.push(`${key}=${sv.toIniString()}`)
    }
  }

  return `${config.sectionHeader}\nOptionSettings=(${pairs.join(',')})`
}
