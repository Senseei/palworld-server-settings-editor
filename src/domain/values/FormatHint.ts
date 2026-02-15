export interface FormatHint {
  readonly rawString: string
  readonly isQuoted: boolean
  readonly isDecimal: boolean
  readonly decimalPlaces: number
  readonly isTuple: boolean
}

export function createFormatHint(rawString: string): FormatHint {
  const isQuoted = rawString.startsWith('"') && rawString.endsWith('"')
  const isTuple = rawString.startsWith('(') && rawString.endsWith(')')

  let isDecimal = false
  let decimalPlaces = 0

  if (!isQuoted && !isTuple) {
    const dotIndex = rawString.indexOf('.')
    if (dotIndex !== -1 && !isNaN(Number(rawString))) {
      isDecimal = true
      decimalPlaces = rawString.length - dotIndex - 1
    }
  }

  return { rawString, isQuoted, isDecimal, decimalPlaces, isTuple }
}
