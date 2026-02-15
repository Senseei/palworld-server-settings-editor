import type { FileGateway, FileReadResult } from './FileGateway.ts'
import { UserCancelledError } from './FileGateway.ts'

export class BrowserFileGateway implements FileGateway {
  readFile(): Promise<FileReadResult> {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.ini'

      input.addEventListener('change', () => {
        const file = input.files?.[0]
        if (!file) {
          reject(new UserCancelledError())
          return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          resolve({
            content: e.target?.result as string,
            filename: file.name,
          })
        }
        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsText(file)
      })

      input.addEventListener('cancel', () => {
        reject(new UserCancelledError())
      })

      input.click()
    })
  }

  writeFile(content: string, filename: string): Promise<void> {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    return Promise.resolve()
  }
}
