import type { FileGateway } from './FileGateway.ts'
import { BrowserFileGateway } from './BrowserFileGateway.ts'
import { TauriFileGateway } from './TauriFileGateway.ts'

export function createFileGateway(): FileGateway {
  if ('__TAURI__' in window) return new TauriFileGateway()
  return new BrowserFileGateway()
}
