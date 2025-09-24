import { Command } from '@oclif/core'
import path from 'node:path'

import { GitHubClient } from '../../clients/github.js'
import { writeFile } from '../../utils/file-system-tools.js'

export class FiveEToolsReload extends Command {
  static description = 'Reload 5etools data from GitHub'
  GitHubClient = new GitHubClient()

  async run(): Promise<void> {
    this.log('Retrieving 5etools data from GitHub...')
    const response = await this.GitHubClient.fetchGitHubDirectoryContent('5etools-mirror-3', '5etools-src', 'data')
    this.log('Data retrieval complete. Writing files...')
    for (const file of response) {
      const filePath = path.join(this.config.configDir, '5etools/data', file.path)
      writeFile(filePath, file.content)
    }
  }
}
