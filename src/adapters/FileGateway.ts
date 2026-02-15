export interface FileReadResult {
  content: string
  filename: string
}

export interface FileGateway {
  readFile(): Promise<FileReadResult>
  writeFile(content: string, filename: string): Promise<void>
}

export class UserCancelledError extends Error {
  constructor() {
    super('User cancelled file operation')
    this.name = 'UserCancelledError'
  }
}
