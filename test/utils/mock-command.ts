/**
 * Mock Command Utility
 *
 * This utility provides a reusable way to create mocked oclif Command instances for testing.
 * It automatically mocks the `config`, `log`, `error`, and `warn` properties/methods,
 * allowing you to test command functionality without actual I/O operations.
 *
 * @example
 * ```typescript
 * import { createMockedCommand } from '../utils/mock-command.js'
 * import MyCommand from '../../src/commands/my-command.js'
 *
 * // Basic usage
 * const { command, mocks } = createMockedCommand(MyCommand)
 * await command.run()
 * expect(mocks.log.calledWith('Hello')).to.be.true
 *
 * // With arguments
 * const { command, mocks } = createMockedCommand(MyCommand, ['--flag', 'value'])
 *
 * // With custom config
 * const customConfig = createMockConfig(customPluginsMap)
 * const { command, mocks } = createMockedCommand(MyCommand, [], undefined, customConfig)
 * ```
 */

import { Command, type Config } from '@oclif/core'
import { stub } from 'sinon'

const defaultMockCommandConfig = {
  plugins: new Map<string, { commandIDs: string[] }>([
    ['forge-plugin-5etools', { commandIDs: ['collect', '5etools'] }],
    ['forge-plugin-dndbeyond', { commandIDs: ['data:collect', 'dndbeyond'] }],
    ['some-other-plugin', { commandIDs: ['other:command'] }],
  ]),
  runCommand: stub().resolves(),
  runHook: stub().resolves({ failures: [], successes: [] }),
}

export function createMockConfig(
  plugins: Map<string, { commandIDs: string[] }> = defaultMockCommandConfig.plugins,
): typeof defaultMockCommandConfig {
  return {
    plugins,
    runCommand: stub().resolves(),
    runHook: stub().resolves({ failures: [], successes: [] }),
  }
}

interface MockedCommand<T extends Command> {
  command: T
  mocks: {
    config: typeof defaultMockCommandConfig
    error: ReturnType<typeof stub>
    log: ReturnType<typeof stub>
    runCommand: ReturnType<typeof stub>
    warn: ReturnType<typeof stub>
  }
}

export function createMockedCommand<T extends Command>(
  CommandClass: new (args: string[], config: Config) => T,
  args: string[] = [],
  config = undefined as never,
  mockConfig = defaultMockCommandConfig,
): MockedCommand<T> {
  const mockLog = stub()
  const mockError = stub()
  const mockWarn = stub()

  const command = new CommandClass(args, config)

  Object.defineProperties(command, {
    config: {
      configurable: true,
      get: () => mockConfig,
    },
    error: {
      configurable: true,
      value: mockError,
    },
    log: {
      configurable: true,
      value: mockLog,
    },
    warn: {
      configurable: true,
      value: mockWarn,
    },
  })

  return {
    command,
    mocks: {
      config: mockConfig,
      error: mockError,
      log: mockLog,
      runCommand: mockConfig.runCommand,
      warn: mockWarn,
    },
  }
}
