import type { FileGateway } from './FileGateway.ts'
import { BrowserFileGateway } from './BrowserFileGateway.ts'
import { TauriFileGateway } from './TauriFileGateway.ts'

function isTauriEnvironment(): boolean {
  return '__TAURI_INTERNALS__' in window || '__TAURI__' in window
}

export function createFileGateway(): FileGateway {
  const isTauri = isTauriEnvironment()
  return isTauri ? new TauriFileGateway() : new BrowserFileGateway()
}
