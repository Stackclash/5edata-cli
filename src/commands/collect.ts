import { Command, Flags } from '@oclif/core'

export default class Collect extends Command {
  static override description = 'collects data for all source plugins'
  static override examples = ['<%= config.bin %> <%= command.id %> -s 5etools,dndbeyond']
  static override flags = {
    sources: Flags.string({
      char: 's',
      description: 'comma separated list of sources to collect from (uses source plugin name)',
      required: false,
    }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Collect)

    const pluginSourceMap = new Map<string, string>()
    const availableSourcePlugins = [...this.config.plugins.keys()].filter(
      (p) => p.includes('ttrpg-data-forge') || p.includes('forge-plugin'),
    )

    for (const plugin of availableSourcePlugins) {
      const match = plugin.match(/.*forge-plugin-(.*)/)
      if (match) {
        pluginSourceMap.set(match[1], plugin)
      }
    }

    if (pluginSourceMap.size === 0) {
      this.error('No source plugins found. Please install source plugins to collect data from.')
    } else {
      this.log(`Found source plugins: ${[...pluginSourceMap.values()].join(', ')}`)
    }

    let sourcesToUse: string[] = []
    if (flags.sources) {
      sourcesToUse = flags.sources.split(',').map((s: string) => s.trim().toLowerCase())
      if (sourcesToUse.length === 0) {
        this.error('No valid sources specified. Please provide at least one source.')
      }

      const invalidSources = sourcesToUse.filter((s) => !pluginSourceMap.has(s))
      if (invalidSources.length > 0) {
        this.error(`Invalid sources specified: ${invalidSources.join(', ')}`)
      }
    } else {
      sourcesToUse = [...pluginSourceMap.keys()]
    }

    this.log(`Sources to collect from: ${sourcesToUse.join(', ')}`)

    const collectPromises = []
    for (const source of sourcesToUse) {
      const pluginName = pluginSourceMap.get(source)
      if (pluginName) {
        this.log(`Collecting data from source: ${source} using plugin: ${pluginName}`)
        try {
          const plugin = this.config.plugins.get(pluginName)
          const pluginCollectCommandId = plugin?.commandIDs.find((cmd) => cmd === 'collect' || cmd.endsWith(':collect'))
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
