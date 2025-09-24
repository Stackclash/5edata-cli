import { Command } from '@oclif/core'
import { Octokit } from 'octokit'

const octokit = new Octokit()

export async function fetch5eToolsData(): Promise<unknown> {
  const response = await octokit.request('GET /repos/5etools-mirror-3/5etools-src/contents/data', {
    headers: {
      Accept: 'application/vnd.github.v3.object+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  return response.data
}

export class FiveEToolsConfig extends Command {
  static description = 'Configure 5etools settings'

  async run(): Promise<void> {
    const data = await fetch5eToolsData()
    console.log(data)
    this.log('5etools config command executed')
  }
}
