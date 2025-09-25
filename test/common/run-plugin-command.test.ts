import { expect } from 'chai'

import { RunPluginCommand } from '../../src/common/run-plugin-command.js'
import { createMockConfig, createMockedCommand } from '../utils/mock-command.js'

class TestCommand extends RunPluginCommand<typeof TestCommand> {
  async run(): Promise<void> {
    // no-op
  }
}

describe('RunPluginCommand', () => {
  describe('extractSourceNameByPluginName', () => {
    it('should extract source name correctly', () => {
      const { command } = createMockedCommand(TestCommand)

      expect(command.extractSourceNameByPluginName('forge-plugin-5etools')).to.equal('5etools')
      expect(command.extractSourceNameByPluginName('forge-plugin-dndbeyond')).to.equal('dndbeyond')
      expect(command.extractSourceNameByPluginName('some-other-plugin')).to.be.null
      expect(command.extractSourceNameByPluginName('invalidpluginname')).to.be.null
    })
  })

  describe('getAvailableSourceNames', () => {
    it('should return available source names from plugins', () => {
      const mockConfig = createMockConfig(
        new Map<string, { commandIDs: string[] }>([
          ['forge-plugin-5etools', { commandIDs: ['collect', '5etools'] }],
          ['forge-plugin-dndbeyond', { commandIDs: ['data:collect', 'dndbeyond'] }],
          ['some-other-plugin', { commandIDs: ['other:command'] }],
        ]),
      )
      const { command } = createMockedCommand(TestCommand, [], mockConfig)

      const sourceNames = command.getAvailableSourceNames()
      expect(sourceNames).to.be.an('array').that.has.lengthOf(2)
      expect(sourceNames).to.include('5etools')
      expect(sourceNames).to.include('dndbeyond')
      expect(sourceNames).to.not.include('some-other-plugin')
    })
  })

  describe('getAvailableSourcePluginNames', () => {
    it('should return available source plugin names', () => {
      const mockConfig = createMockConfig(
        new Map<string, { commandIDs: string[] }>([
          ['forge-plugin-5etools', { commandIDs: ['collect', '5etools'] }],
          ['forge-plugin-dndbeyond', { commandIDs: ['data:collect', 'dndbeyond'] }],
          ['some-other-plugin', { commandIDs: ['other:command'] }],
        ]),
      )
      const { command } = createMockedCommand(TestCommand, [], mockConfig)

      const pluginNames = command.getAvailableSourcePluginNames()
      expect(pluginNames).to.be.an('array').that.has.lengthOf(2)
      expect(pluginNames).to.include('forge-plugin-5etools')
      expect(pluginNames).to.include('forge-plugin-dndbeyond')
      expect(pluginNames).to.not.include('some-other-plugin')
    })

    it('should return empty array if no source plugins are available', () => {
      const mockConfig = createMockConfig(
        new Map<string, { commandIDs: string[] }>([['some-other-plugin', { commandIDs: ['other:command'] }]]),
      )
      const { command } = createMockedCommand(TestCommand, [], mockConfig)

      const pluginNames = command.getAvailableSourcePluginNames()
      expect(pluginNames).to.be.an('array').that.is.empty
    })
  })

  describe('getPluginCommandId', () => {
    it('should find command ID for given plugin and action', () => {
      const mockConfig = createMockConfig(
        new Map<string, { commandIDs: string[] }>([
          ['forge-plugin-5etools', { commandIDs: ['collect', '5etools'] }],
          ['forge-plugin-dndbeyond', { commandIDs: ['data:collect', 'dndbeyond'] }],
          ['some-other-plugin', { commandIDs: ['other:command'] }],
        ]),
      )
      const { command } = createMockedCommand(TestCommand, [], mockConfig)

      const collectCmdId = command.getPluginCommandId('forge-plugin-5etools', 'collect')
      expect(collectCmdId).to.equal('collect')

      const dataCollectCmdId = command.getPluginCommandId('forge-plugin-dndbeyond', 'collect')
      expect(dataCollectCmdId).to.equal('data:collect')

      const nonExistentCmdId = command.getPluginCommandId('some-other-plugin', 'collect')
      expect(nonExistentCmdId).to.be.undefined
    })
  })

  describe('getSourcePluginNameBySource', () => {
    it('should find plugin name for given source name', () => {
      const mockConfig = createMockConfig(
        new Map<string, { commandIDs: string[] }>([
          ['forge-plugin-5etools', { commandIDs: ['collect', '5etools'] }],
          ['forge-plugin-dndbeyond', { commandIDs: ['data:collect', 'dndbeyond'] }],
          ['some-other-plugin', { commandIDs: ['other:command'] }],
        ]),
      )
      const { command } = createMockedCommand(TestCommand, [], mockConfig)

      const pluginName1 = command.getSourcePluginNameBySource('5etools')
      expect(pluginName1).to.equal('forge-plugin-5etools')

      const pluginName2 = command.getSourcePluginNameBySource('dndbeyond')
      expect(pluginName2).to.equal('forge-plugin-dndbeyond')

      const nonExistentPlugin = command.getSourcePluginNameBySource('nonexistent')
      expect(nonExistentPlugin).to.be.null
    })
  })

  describe('pluginExistsForSourceName', () => {
    it('should verify existence of plugin for given source name', () => {
      const mockConfig = createMockConfig(
        new Map<string, { commandIDs: string[] }>([
          ['forge-plugin-5etools', { commandIDs: ['collect', '5etools'] }],
          ['forge-plugin-dndbeyond', { commandIDs: ['data:collect', 'dndbeyond'] }],
          ['some-other-plugin', { commandIDs: ['other:command'] }],
        ]),
      )
      const { command } = createMockedCommand(TestCommand, [], mockConfig)

      expect(command.pluginExistsForSourceName('5etools')).to.be.true
      expect(command.pluginExistsForSourceName('dndbeyond')).to.be.true
      expect(command.pluginExistsForSourceName('nonexistent')).to.be.false
    })
  })
})
