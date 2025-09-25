# Test Utils

This directory contains reusable utilities for testing the ttrpg-data-forge CLI application.

## mock-command.ts

A utility for creating mocked oclif Command instances in unit tests. This solves the common problem of testing Command classes that depend on the oclif framework's config, logging, and other injected dependencies.

### Key Features

- **Generic TypeScript support**: Works with any Command subclass
- **Automatic mocking**: Mocks `config`, `log`, `error`, and `warn` by default
- **Flexible configuration**: Supports custom arguments, argv, and config
- **Sinon integration**: Returns sinon stubs for easy assertion testing

### Usage Examples

```typescript
import { createMockedCommand } from './mock-command.js'
import MyCommand from '../../src/commands/my-command.js'

// Basic usage
const { command, mocks } = createMockedCommand(MyCommand)
await command.run()
expect(mocks.log.calledWith('Expected message')).to.be.true

// With command line arguments
const { command, mocks } = createMockedCommand(MyCommand, ['--flag', 'value'])

// With custom config (useful for plugin testing)
const customConfig = createMockConfig(customPluginsMap)
const { command, mocks } = createMockedCommand(MyCommand, [], undefined, customConfig)
```

### Why This Utility?

The oclif framework injects dependencies like `config` into Command instances at runtime. This makes unit testing challenging because:

1. Commands expect `this.config` to be available with plugin information
2. The `this.config.runCommand()` method needs to be mockable for testing
3. Logging methods (`log`, `error`, `warn`) need to be stubbed to avoid console output

This utility solves all these problems by creating properly mocked Command instances that behave like real commands but allow for isolated unit testing.
