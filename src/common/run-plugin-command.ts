import { Command, Flags, Interfaces } from '@oclif/core'

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<
  (typeof RunPluginCommand)['baseFlags'] & T['flags']
>

export abstract class RunPluginCommand<T extends typeof Command> extends Command {
  static baseFlags = {
    sources: Flags.string({
      char: 's',
      description: 'comma separated list of sources to use',
      required: false,
    }),
  }
  protected flags!: Flags<T>

  public extractSourceNameByPluginName(pluginName: string): null | string {
    const match = pluginName.match(/.*forge-plugin-(.*)/)
    return match ? match[1] : null
  }

  public getAvailableSourceNames(): string[] {
    return this.getAvailableSourcePluginNames()
      .map((plugin) => this.extractSourceNameByPluginName(plugin))
      .filter((name): name is string => name !== null)
  }

  public getAvailableSourcePluginNames(): string[] {
    return [...this.config.plugins.keys()].filter((p) => p.includes('forge-plugin'))
  }

  public getPluginCommandId(pluginName: string, action: string): string | undefined {
    const plugin = this.config.plugins.get(pluginName)
    return plugin?.commandIDs.find((cmd) => cmd === action || cmd.endsWith(`:${action}`))
  }

  public getSourcePluginNameBySource(source: string): null | string {
    return (
      this.getAvailableSourcePluginNames().find((plugin) => {
        const sourceName = this.extractSourceNameByPluginName(plugin)
        return sourceName && sourceName === source
      }) || null
    )
  }

  public pluginExistsForSourceName(source: string): boolean {
    return this.getAvailableSourcePluginNames().some((plugin) => {
      const sourceName = this.extractSourceNameByPluginName(plugin)
      return sourceName && sourceName === source
    })
  }
}
