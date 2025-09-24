import { Command } from '@oclif/core'
import fs from 'node:fs'
import path from 'node:path'

export class FiveETools extends Command {
  static description = 'Command to process 5etools data'

  async init(): Promise<void> {
    const dataDir = path.join(this.config.configDir, '5etools/data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
      await this.config.runCommand('5etools:reload')
    }
  }

  async run(): Promise<void> {
    await this.init()
    this.log('5etools command executed')
  }
}
