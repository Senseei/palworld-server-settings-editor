import type { FileGateway, FileReadResult } from './FileGateway.ts'
import { UserCancelledError } from './FileGateway.ts'

export class TauriFileGateway implements FileGateway {
  async readFile(): Promise<FileReadResult> {
    const { open } = await import('@tauri-apps/plugin-dialog')
    const { readTextFile } = await import('@tauri-apps/plugin-fs')

    const path = await open({
      filters: [{ name: 'INI Files', extensions: ['ini'] }],
      multiple: false,
    })

    if (path === null) throw new UserCancelledError()

    const content = await readTextFile(path as string)
    const filename = (path as string).split(/[\\/]/).pop() ?? 'PalWorldSettings.ini'

    return { content, filename }
  }

  async writeFile(content: string, filename: string): Promise<void> {
    const { save } = await import('@tauri-apps/plugin-dialog')
    const { writeTextFile } = await import('@tauri-apps/plugin-fs')

    const path = await save({
      defaultPath: filename,
      filters: [{ name: 'INI Files', extensions: ['ini'] }],
    })

    if (path === null) throw new UserCancelledError()

    await writeTextFile(path, content)
  }
}
