import {Args, Command} from '@oclif/core'

export default class Collect extends Command {
  static override args = {
    sources: Args.string({
      char: 's',
      description: 'comma separated list of sources to collect from (uses source plugin name)',
      required: false,
    }),
  }
  static override description = 'collects data for all source plugins'
  static override examples = [
    '<%= config.bin %> <%= command.id %> -s 5etools,dndbeyond',
  ]

  public async run(): Promise<void> {
    const {args} = await this.parse(Collect)

    const pluginSourceMap = new Map<string, string>()
    const availableSourcePlugins = [...this.config.plugins.keys()].filter(p => p.includes('ttrpg-data-forge') || p.includes('forge-plugin'))

    for (const plugin of availableSourcePlugins) {
      const match = plugin.match(/.*forge-plugin-(.*)/)
      if (match) {
        pluginSourceMap.set(match[1], plugin)
      }
    }

    let sourcesToUse: string[] = []
    if (args.sources) {
      sourcesToUse = args.sources.split(',').map(s => s.trim().toLowerCase())
      const invalidSources = sourcesToUse.filter(s => !pluginSourceMap.has(s))
      if (invalidSources.length > 0) {
        this.error(`Invalid sources specified: ${invalidSources.join(', ')}`)
      }
    } else {
      sourcesToUse = [...pluginSourceMap.keys()]
    }

    const collectPromises = []
    for (const source of sourcesToUse) {
      const pluginName = pluginSourceMap.get(source)
      if (pluginName) {
        this.log(`Collecting data from source: ${source} using plugin: ${pluginName}`)
        try {
          const plugin = this.config.plugins.get(pluginName)
          const pluginCollectCommandId = plugin?.commandIDs.find(cmd => cmd === 'collect' || cmd.endsWith(':collect'))
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
    if (collectPromises.length === 0) {
      this.log('No sources to collect from.')
    } else {
      this.log('All data collection tasks completed.')
    }
  }
}
