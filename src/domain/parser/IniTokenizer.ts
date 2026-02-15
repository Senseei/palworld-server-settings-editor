export interface RawToken {
  key: string
  rawValue: string
}

export interface TokenizeResult {
  sectionHeader: string
  tokens: RawToken[]
}

export function tokenize(content: string): TokenizeResult {
  const optMatch = content.match(/OptionSettings=\((.*?)\)(?:\s|$)/s)
  if (!optMatch) {
    throw new Error('Invalid INI format: could not find OptionSettings=(...)')
  }

  // Everything before "OptionSettings=" is the header
  const optIndex = content.indexOf('OptionSettings=')
  const sectionHeader = content.substring(0, optIndex).trimEnd()

  const settingsStr = optMatch[1]
  const tokens: RawToken[] = []
  const regex = /(\w+)=((?:"[^"]*"|\([^)]*\)|[^,])+)/g
  let m: RegExpExecArray | null

  while ((m = regex.exec(settingsStr)) !== null) {
    tokens.push({ key: m[1], rawValue: m[2] })
  }

  return { sectionHeader, tokens }
}
