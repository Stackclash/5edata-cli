import { RunPluginCommand } from '../common/run-plugin-command.js'

export default class Generate extends RunPluginCommand<typeof Generate> {
  static override description = 'generates data for all source plugins'
  static override examples = ['<%= config.bin %> <%= command.id %> -s 5etools,dndbeyond']

  public async run(): Promise<void> {
    const { flags } = await this.parse(Generate)

    const availableSourcePluginNames = this.getAvailableSourcePluginNames()

    if (availableSourcePluginNames.length === 0) {
      this.error('No source plugins found. Please install source plugins to generate data from.')
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

    this.log(`Sources to generate from: ${sourcesToUse.join(', ')}`)

    const generatePromises = []
    for (const source of sourcesToUse) {
      const pluginName = this.getSourcePluginNameBySource(source)
      if (pluginName) {
        this.log(`Generateing data from source: ${source} using plugin: ${pluginName}`)
        try {
          const pluginGenerateCommandId = this.getPluginCommandId(pluginName, 'generate')
          if (pluginGenerateCommandId) {
            generatePromises.push(this.config.runCommand(pluginGenerateCommandId))
          } else {
            this.warn(`Plugin ${pluginName} does not have a generate command`)
          }
        } catch (error) {
          this.error(`Failed to load or run plugin ${pluginName}: ${(error as Error).message}`)
        }
      }
    }

    await Promise.all(generatePromises)
    this.log('All data generateion tasks completed.')
  }
}
