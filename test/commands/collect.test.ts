import { expect, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { type SinonSpyCall } from 'sinon'
use(chaiAsPromised)

import Collect from '../../src/commands/collect.js'
import { createMockConfig, createMockedCommand } from '../utils/mock-command.js'

describe('Collect', () => {
  describe('sources argument', () => {
    it('should handle sources argument parsing', async () => {
      const { command, mocks } = createMockedCommand(Collect, ['-s', '5etools,dndbeyond'])

      await command.run()

      const foundSourcesLogCall = mocks.log
        .getCalls()
        .find((call: SinonSpyCall) => call.firstArg.includes('Sources to collect from'))
      expect(foundSourcesLogCall).to.not.be.undefined
      expect(foundSourcesLogCall?.firstArg).to.include('5etools')
      expect(foundSourcesLogCall?.firstArg).to.include('dndbeyond')
    })

    it('should filter sources correctly', async () => {
      const { command, mocks } = createMockedCommand(Collect, ['-s', '5etools'])

      await command.run()

      const foundSourcesLogCall = mocks.log
        .getCalls()
        .find((call: SinonSpyCall) => call.firstArg.includes('Sources to collect from'))
      expect(foundSourcesLogCall).to.not.be.undefined
      expect(foundSourcesLogCall?.firstArg).to.include('5etools')
      expect(foundSourcesLogCall?.firstArg).to.not.include('dndbeyond')
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

    it('should handle case sensitivity', async () => {
      const { command, mocks } = createMockedCommand(Collect, ['-s', '5ETOOLS,DndBeyond'])

      await command.run()

      const foundSourcesLogCall = mocks.log
        .getCalls()
        .find((call: SinonSpyCall) => call.firstArg.includes('Sources to collect from'))
      expect(foundSourcesLogCall).to.not.be.undefined
      expect(foundSourcesLogCall?.firstArg).to.include('5etools')
      expect(foundSourcesLogCall?.firstArg).to.include('dndbeyond')
    })

    // it('should error with invalid source', async () => {
    //   const { command, mocks } = createMockedCommand(Collect, ['-s', 'invalidsource'])
    //   let errorLogCall: SinonSpyCall | undefined

    //   try {
    //     await command.run()
    //   } catch {
    //     // error expected
    //     const errorLogCalls = mocks.error.getCalls()
    //     errorLogCall = errorLogCalls.find((call: SinonSpyCall) => call.firstArg.includes('Invalid sources specified'))
    //   }

    //   expect(errorLogCall).to.not.be.undefined
    // })
  })

  describe('plugin discovery', () => {
    it('should identify forge-plugin plugins', async () => {
      const mockConfig = createMockConfig(
        new Map<string, { commandIDs: string[] }>([
          ['forge-plugin-test1', { commandIDs: ['collect', '5etools'] }],
          ['some-other-plugin', { commandIDs: ['other:command'] }],
          ['test-forge-plugin-test2', { commandIDs: ['data:collect', 'dndbeyond'] }],
        ]),
      )
      const { command, mocks } = createMockedCommand(Collect, [], mockConfig)

      await command.run()

      const foundPluginsLogCall = mocks.log
        .getCalls()
        .find((call: SinonSpyCall) => call.firstArg.includes('Found source plugins'))
      expect(foundPluginsLogCall).to.not.be.undefined
      expect(foundPluginsLogCall?.firstArg).to.include('forge-plugin-test1')
      expect(foundPluginsLogCall?.firstArg).to.include('test-forge-plugin-test2')
      expect(foundPluginsLogCall?.firstArg).to.not.include('some-other-plugin')
    })

    it.only('should error when no source plugins are present', async (done) => {
      const mockConfig = createMockConfig(
        new Map<string, { commandIDs: string[] }>([
          ['another-plugin', { commandIDs: ['data:collect', 'dndbeyond'] }],
          ['some-other-plugin', { commandIDs: ['other:command'] }],
        ]),
      )
      const { command, mocks } = createMockedCommand(Collect, [], mockConfig)

      expect(command.run()).to.eventually.throw()
      const errorLogCall = mocks.error
        .getCalls()
        .find((call: SinonSpyCall) => call.firstArg.includes('No source plugins found'))
      expect(errorLogCall).to.not.be.undefined
      done()
    })
  })

  describe('source name extraction', () => {
    it('should extract source name from forge-plugin plugins', async () => {
      const mockConfig = createMockConfig(
        new Map<string, { commandIDs: string[] }>([
          ['complex-forge-plugin-name-example', { commandIDs: ['collect'] }],
          ['forge-plugin-5etools', { commandIDs: ['collect', '5etools'] }],
          ['forge-plugin-dndbeyond', { commandIDs: ['data:collect', 'dndbeyond'] }],
          ['some-other-plugin', { commandIDs: ['other:command'] }],
        ]),
      )
      const { command, mocks } = createMockedCommand(Collect, [], mockConfig)

      await command.run()

      const foundPluginsLogCall = mocks.log
        .getCalls()
        .find((call: SinonSpyCall) => call.firstArg.includes('Sources to collect from'))
      expect(foundPluginsLogCall).to.not.be.undefined
      expect(foundPluginsLogCall?.firstArg).to.include('5etools')
      expect(foundPluginsLogCall?.firstArg).to.include('dndbeyond')
      expect(foundPluginsLogCall?.firstArg).to.include('name-example')
      expect(foundPluginsLogCall?.firstArg).to.not.include('some-other-plugin')
    })
  })

  describe('command ID discovery', () => {
    it('should find collect command', async () => {
      const mockConfig = createMockConfig(
        new Map<string, { commandIDs: string[] }>([
          ['forge-plugin-5etools', { commandIDs: ['collect', '5etools'] }],
          ['forge-plugin-dndbeyond', { commandIDs: ['data:collect', 'dndbeyond'] }],
          ['some-other-plugin', { commandIDs: ['other:command'] }],
        ]),
      )
      const { command, mocks } = createMockedCommand(Collect, [], mockConfig)

      await command.run()

      expect(mocks.runCommand.calledTwice).to.be.true
      expect(mocks.runCommand.firstCall.args[0]).to.equal('collect')
      expect(mocks.runCommand.secondCall.args[0]).to.equal('data:collect')
    })

    it('should warn if plugin has no collect command', async () => {
      const mockConfig = createMockConfig(
        new Map<string, { commandIDs: string[] }>([
          ['forge-plugin-5etools', { commandIDs: ['5etools'] }],
          ['forge-plugin-dndbeyond', { commandIDs: ['data:collect', 'dndbeyond'] }],
          ['some-other-plugin', { commandIDs: ['other:command'] }],
        ]),
      )
      const { command, mocks } = createMockedCommand(Collect, [], mockConfig)

      await command.run()

      expect(mocks.runCommand.calledOnce).to.be.true
      expect(mocks.runCommand.firstCall.args[0]).to.equal('data:collect')
      const warnLogCall = mocks.warn
        .getCalls()
        .find((call: SinonSpyCall) => call.firstArg.includes('does not have a collect command'))
      expect(warnLogCall).to.not.be.undefined
      expect(warnLogCall?.firstArg).to.include('forge-plugin-5etools')
    })
  })
})
