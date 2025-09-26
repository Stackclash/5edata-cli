import { RunPluginCommand } from '../common/run-plugin-command.js'

export default class Collect extends RunPluginCommand<typeof Collect> {
  static override description = 'collects data for all source plugins'
  static override examples = ['<%= config.bin %> <%= command.id %> -s 5etools,dndbeyond']

  public async run(): Promise<void> {
    const { flags } = await this.parse(Collect)

    const availableSourcePluginNames = this.getAvailableSourcePluginNames()

    if (availableSourcePluginNames.length === 0) {
      this.error('No source plugins found. Please install source plugins to collect data from.')
    } else {
      this.log(`Found source plugins: ${availableSourcePluginNames.join(', ')}`)
    }

    let sourcesToUse: string[] = []
    if (flags.sources) {
      sourcesToUse = flags.sources.split(',').map((s: string) => s.trim().toLowerCase())

      const invalidSources = sourcesToUse.filter((s) => !this.pluginExistsForSourceName(s))
      if (invalidSources.length > 0) {
        this.error(`Invalid sources specified: ${invalidSources.join(', ')}`)
      }
    } else {
      sourcesToUse = this.getAvailableSourceNames()
    }

    this.log(`Sources to collect from: ${sourcesToUse.join(', ')}`)

    const collectPromises = []
    for (const source of sourcesToUse) {
      const pluginName = this.getSourcePluginNameBySource(source)
      if (pluginName) {
        this.log(`Collecting data from source: ${source} using plugin: ${pluginName}`)
        try {
          const pluginCollectCommandId = this.getPluginCommandId(pluginName, 'collect')
          if (pluginCollectCommandId) {
            collectPromises.push(this.config.runCommand(pluginCollectCommandId))
          } else {
            this.warn(`Plugin ${pluginName} does not have a collect command`)
          }
        } catch (error) {
          this.error(`Failed to load or run plugin ${pluginName}: ${(error as Error).message}`)
        }
      }
    }

    await Promise.all(collectPromises)
    this.log('All data collection tasks completed.')
  }
}
