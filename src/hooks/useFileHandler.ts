import { useState, useCallback, useRef } from 'react'
import { parse } from '@/domain/parser/IniParser.ts'
import { write } from '@/domain/writer/IniWriter.ts'
import type { PalworldConfig } from '@/domain/config/PalworldConfig.ts'
import { createFileGateway } from '@/adapters/createFileGateway.ts'
import { UserCancelledError } from '@/adapters/FileGateway.ts'

export function useFileHandler() {
  const gatewayRef = useRef(createFileGateway())
  const [filename, setFilename] = useState('')
  const [parseError, setParseError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = useCallback(
    async (onConfigLoaded: (config: PalworldConfig) => void) => {
      setParseError(null)
      setIsLoading(true)

      try {
        const { content, filename: name } = await gatewayRef.current.readFile()
        setFilename(name)
        const config = parse(content)
        onConfigLoaded(config)
      } catch (err) {
        if (err instanceof UserCancelledError) return
        setParseError(err instanceof Error ? err.message : 'Failed to parse INI file')
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const handleDownload = useCallback(
    async (config: PalworldConfig) => {
      const content = write(config)

      try {
        await gatewayRef.current.writeFile(content, filename)
      } catch (err) {
        if (err instanceof UserCancelledError) return
        throw err
      }
    },
    [filename]
  )

  return {
    filename,
    parseError,
    isLoading,
    handleFileUpload,
    handleDownload,
  }
}
