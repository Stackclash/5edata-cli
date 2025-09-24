import { Command } from '@oclif/core'

export class FiveETools extends Command {
  static description = 'Command to process 5etools data'

  async run(): Promise<void> {
    this.log('5etools command executed')
  }
}
