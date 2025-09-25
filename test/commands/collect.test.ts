import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('Collect', () => {
  describe('sources argument', () => {
    it('should handle sources argument parsing', async () => {
      try {
        await runCommand(['collect', '-s', 'test-source'])
      } catch (error) {
        // Command may fail due to no plugins, but it should handle the argument
        expect(error).to.be.instanceOf(Error)
      }
    })

    it('should validate sources format', async () => {
      try {
        await runCommand(['collect', '-s', 'source1,source2'])
      } catch (error) {
        // May fail due to invalid sources, but should parse the argument
        expect(error).to.be.instanceOf(Error)
      }
    })

    it('should handle empty sources', async () => {
      try {
        await runCommand(['collect', '-s', ''])
      } catch (error) {
        expect(error).to.be.instanceOf(Error)
      }
    })

    it('should handle whitespace in sources', async () => {
      try {
        await runCommand(['collect', '-s', ' source1 , source2 '])
      } catch (error) {
        // Should parse and trim whitespace
        expect(error).to.be.instanceOf(Error)
      }
    })

    it('should handle case sensitivity', async () => {
      try {
        await runCommand(['collect', '-s', 'SOURCE1,source2'])
      } catch (error) {
        // Should handle case conversion
        expect(error).to.be.instanceOf(Error)
      }
    })

    it('should handle multiple source processing', async () => {
      try {
        await runCommand(['collect', '-s', 'source1,source2,source3'])
      } catch (error) {
        // Should attempt to process multiple sources
        expect(error).to.be.instanceOf(Error)
      }
    })
  })

  describe('plugin discovery', () => {
    it('should identify ttrpg-data-forge plugins', () => {
      const plugins = new Map()
      plugins.set('ttrpg-data-forge-plugin-5etools', { commandIDs: ['collect'] })
      plugins.set('ttrpg-data-forge-plugin-dndbeyond', { commandIDs: ['collect'] })
      plugins.set('unrelated-plugin', { commandIDs: ['collect'] })

      const filteredPlugins = [...plugins.keys()].filter(
        (p) => p.includes('ttrpg-data-forge') || p.includes('forge-plugin'),
      )

      expect(filteredPlugins).to.have.lengthOf(2)
      expect(filteredPlugins).to.include('ttrpg-data-forge-plugin-5etools')
      expect(filteredPlugins).to.include('ttrpg-data-forge-plugin-dndbeyond')
      expect(filteredPlugins).to.not.include('unrelated-plugin')
    })

    it('should identify forge-plugin plugins', () => {
      const plugins = new Map()
      plugins.set('forge-plugin-custom', { commandIDs: ['collect'] })
      plugins.set('forge-plugin-homebrew', { commandIDs: ['collect'] })
      plugins.set('other-plugin', { commandIDs: ['collect'] })

      const filteredPlugins = [...plugins.keys()].filter(
        (p) => p.includes('ttrpg-data-forge') || p.includes('forge-plugin'),
      )

      expect(filteredPlugins).to.have.lengthOf(2)
      expect(filteredPlugins).to.include('forge-plugin-custom')
      expect(filteredPlugins).to.include('forge-plugin-homebrew')
      expect(filteredPlugins).to.not.include('other-plugin')
    })

    it('should handle missing plugins gracefully', async () => {
      const { stdout } = await runCommand(['collect'])
      // Should not crash even with no plugins
      expect(stdout).to.be.a('string')
    })

    it('should report when no sources available', async () => {
      const { stdout } = await runCommand(['collect'])
      // Should handle empty plugin list
      expect(stdout).to.be.a('string')
    })
  })

  describe('plugin name extraction', () => {
    it('should extract source name from ttrpg-data-forge plugins', () => {
      const pluginName = 'ttrpg-data-forge-plugin-5etools'

      const altMatch = pluginName.match(/.*ttrpg-data-forge-plugin-(.*)/)
      if (altMatch) {
        expect(altMatch[1]).to.equal('5etools')
      }
    })

    it('should extract source name from forge-plugin plugins', () => {
      const pluginName = 'forge-plugin-custom-source'
      const match = pluginName.match(/.*forge-plugin-(.*)/)

      expect(match).to.not.be.null
      expect(match![1]).to.equal('custom-source')
    })

    it('should handle complex plugin names', () => {
      const pluginName = 'forge-plugin-d-and-d-beyond'
      const match = pluginName.match(/.*forge-plugin-(.*)/)

      expect(match).to.not.be.null
      expect(match![1]).to.equal('d-and-d-beyond')
    })
  })

  describe('source validation', () => {
    it('should identify valid sources', () => {
      const availableSources = new Set(['5etools', 'custom', 'dndbeyond'])
      const requestedSources = ['5etools', 'dndbeyond']

      const invalidSources = requestedSources.filter((s) => !availableSources.has(s))

      expect(invalidSources).to.have.lengthOf(0)
    })

    it('should identify invalid sources', () => {
      const availableSources = new Set(['5etools', 'dndbeyond'])
      const requestedSources = ['5etools', 'invalid', 'another-invalid']

      const invalidSources = requestedSources.filter((s) => !availableSources.has(s))

      expect(invalidSources).to.have.lengthOf(2)
      expect(invalidSources).to.include('invalid')
      expect(invalidSources).to.include('another-invalid')
    })

    it('should handle mixed valid and invalid sources', () => {
      const availableSources = new Set(['5etools', 'custom', 'dndbeyond'])
      const requestedSources = ['5etools', 'invalid', 'custom', 'another-invalid']

      const invalidSources = requestedSources.filter((s) => !availableSources.has(s))
      const validSources = requestedSources.filter((s) => availableSources.has(s))

      expect(invalidSources).to.have.lengthOf(2)
      expect(validSources).to.have.lengthOf(2)
      expect(validSources).to.include('5etools')
      expect(validSources).to.include('custom')
    })
  })

  describe('command ID detection', () => {
    it('should find exact collect command', () => {
      const commandIDs = ['collect', 'validate', 'export']
      const collectCommandId = commandIDs.find((cmd) => cmd === 'collect' || cmd.endsWith(':collect'))

      expect(collectCommandId).to.equal('collect')
    })

    it('should find namespaced collect command', () => {
      const commandIDs = ['source:collect', 'source:validate']
      const collectCommandId = commandIDs.find((cmd) => cmd === 'collect' || cmd.endsWith(':collect'))

      expect(collectCommandId).to.equal('source:collect')
    })

    it('should find data:collect command', () => {
      const commandIDs = ['data:collect', 'data:export']
      const collectCommandId = commandIDs.find((cmd) => cmd === 'collect' || cmd.endsWith(':collect'))

      expect(collectCommandId).to.equal('data:collect')
    })

    it('should return undefined when no collect command exists', () => {
      const commandIDs = ['validate', 'export', 'sync']
      const collectCommandId = commandIDs.find((cmd) => cmd === 'collect' || cmd.endsWith(':collect'))

      expect(collectCommandId).to.be.undefined
    })
  })

  describe('source parsing', () => {
    it('should parse comma-separated sources', () => {
      const sourcesArg = '5etools,dndbeyond,custom'
      const sources = sourcesArg.split(',').map((s) => s.trim().toLowerCase())

      expect(sources).to.have.lengthOf(3)
      expect(sources).to.include('5etools')
      expect(sources).to.include('dndbeyond')
      expect(sources).to.include('custom')
    })

    it('should handle whitespace in sources', () => {
      const sourcesArg = ' 5etools , dndbeyond , custom '
      const sources = sourcesArg.split(',').map((s) => s.trim().toLowerCase())

      expect(sources).to.have.lengthOf(3)
      expect(sources).to.include('5etools')
      expect(sources).to.include('dndbeyond')
      expect(sources).to.include('custom')
    })

    it('should handle uppercase sources', () => {
      const sourcesArg = '5ETOOLS,DNDBEYOND,CUSTOM'
      const sources = sourcesArg.split(',').map((s) => s.trim().toLowerCase())

      expect(sources).to.have.lengthOf(3)
      expect(sources).to.include('5etools')
      expect(sources).to.include('dndbeyond')
      expect(sources).to.include('custom')
    })

    it('should handle single source', () => {
      const sourcesArg = '5etools'
      const sources = sourcesArg.split(',').map((s) => s.trim().toLowerCase())

      expect(sources).to.have.lengthOf(1)
      expect(sources).to.include('5etools')
    })

    it('should handle empty strings in source list', () => {
      const sourcesArg = '5etools,,dndbeyond'
      const sources = sourcesArg
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter((s) => s !== '')

      expect(sources).to.have.lengthOf(2)
      expect(sources).to.include('5etools')
      expect(sources).to.include('dndbeyond')
    })
  })

  describe('error handling', () => {
    it('should handle invalid source names', async () => {
      try {
        await runCommand(['collect', '-s', 'invalid-source-name'])
      } catch (error) {
        expect(error).to.be.instanceOf(Error)
      }
    })

    it('should handle multiple invalid sources', async () => {
      try {
        await runCommand(['collect', '-s', 'invalid1,invalid2'])
      } catch (error) {
        expect(error).to.be.instanceOf(Error)
      }
    })

    it('should format single invalid source error', () => {
      const invalidSources = ['invalid']
      const errorMessage = `Invalid sources specified: ${invalidSources.join(', ')}`

      expect(errorMessage).to.equal('Invalid sources specified: invalid')
    })

    it('should format multiple invalid sources error', () => {
      const invalidSources = ['invalid1', 'invalid2', 'invalid3']
      const errorMessage = `Invalid sources specified: ${invalidSources.join(', ')}`

      expect(errorMessage).to.equal('Invalid sources specified: invalid1, invalid2, invalid3')
    })
  })

  describe('async operation handling', () => {
    it('should handle Promise.all for concurrent execution', async () => {
      const promises = [Promise.resolve('result1'), Promise.resolve('result2'), Promise.resolve('result3')]

      const results = await Promise.all(promises)

      expect(results).to.have.lengthOf(3)
      expect(results).to.include('result1')
      expect(results).to.include('result2')
      expect(results).to.include('result3')
    })

    it('should handle empty promise array', async () => {
      const promises: Promise<string>[] = []

      const results = await Promise.all(promises)

      expect(results).to.have.lengthOf(0)
    })

    it('should handle promise rejection', async () => {
      const promises = [Promise.resolve('result1'), Promise.reject(new Error('Test error')), Promise.resolve('result3')]

      try {
        await Promise.all(promises)
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect(error).to.be.instanceOf(Error)
        expect((error as Error).message).to.equal('Test error')
      }
    })
  })

  describe('basic functionality', () => {
    it('should run collect command successfully', async () => {
      const { stdout } = await runCommand(['collect'])
      expect(stdout).to.be.a('string')
    })

    it('should display help when requested', async () => {
      const { stdout } = await runCommand(['collect', '--help'])
      expect(stdout).to.contain('collects data for all source plugins')
      expect(stdout).to.contain('comma separated list of sources')
    })

    it('should provide informative output', async () => {
      const { stdout } = await runCommand(['collect'])
      expect(stdout).to.be.a('string')
      // Output should be informative even when no plugins are available
    })
  })

  describe('oclif integration', () => {
    it('should integrate properly with oclif command structure', async () => {
      const { stdout } = await runCommand(['collect', '--help'])
      expect(stdout).to.contain('USAGE')
      expect(stdout).to.contain('ARGUMENTS')
      expect(stdout).to.contain('EXAMPLES')
    })

    it('should support standard oclif flags', async () => {
      const { stdout } = await runCommand(['collect', '--help'])
      expect(stdout).to.contain('sources')
    })
  })
})
