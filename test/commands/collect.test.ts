import { expect } from 'chai'
import { type SinonSpyCall } from 'sinon'

import Collect from '../../src/commands/collect.js'
import { createMockedCommand } from '../utils/mock-command.js'

describe('Collect', () => {
  describe('sources argument', () => {
    it('should handle sources argument parsing', async () => {
      const { command, mocks } = createMockedCommand(Collect, ['-s', '5etools,dndbeyond'])

      await command.run()

      const sourcesLogCall = mocks.log
        .getCalls()
        .find((call: SinonSpyCall) => call.firstArg.includes('Sources to collect from'))
      expect(sourcesLogCall).to.not.be.undefined
      expect(sourcesLogCall?.firstArg).to.include('5etools')
      expect(sourcesLogCall?.firstArg).to.include('dndbeyond')
    })

    // it('should error with empty sources', async () => {
    //   const { command, mocks } = createMockedCommand(Collect, ['-s', ''])
    //   let errorLogCall: SinonSpyCall | undefined

    //   try {
    //     await command.run()
    //   } catch {
    //     // error expected
    //     const errorLogCalls = mocks.error.getCalls()
    //     errorLogCall = errorLogCalls.find((call: SinonSpyCall) => call.firstArg.includes('No valid sources specified'))
    //     console.log(errorLogCall)
    //   }

    //   expect(errorLogCall).to.not.be.undefined
    // })

    it('should handle whitespace in sources')

    it('should handle case sensitivity')

    it('should handle multiple source processing')

    it('should handle empty strings in source list')

    it('should error with invalid source')
  })

  describe('plugin discovery', () => {
    it('should identify ttrpg-data-forge plugins')

    it('should identify forge-plugin plugins')

    it('should error when no source plugins are present')
  })

  describe('plugin name extraction', () => {
    it('should extract source name from ttrpg-data-forge plugins')

    it('should extract source name from forge-plugin plugins')

    it('should handle complex plugin names')
  })

  describe('source validation', () => {
    it('should identify valid sources')

    it('should identify provided invalid sources')
  })

  describe('command ID detection', () => {
    it('should find collect command')

    it('should find data:collect command')
  })
})
