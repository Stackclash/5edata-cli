# API Reference

Complete API documentation for TTRPG Data Forge framework and plugin development.

## Core API

### Command Base Classes

#### `RunPluginCommand`

Base class for all plugin commands that need to interact with data.

```typescript
import { RunPluginCommand } from 'ttrpg-data-forge'

export class MyCommand extends RunPluginCommand {
  static description = 'Description of your command'
  
  static examples = [
    '<%= config.bin %> <%= command.id %> --help',
  ]
  
  static flags = {
    output: Flags.string({
      char: 'o',
      description: 'output directory',
      default: './output'
    })
  }
  
  async run(): Promise<void> {
    const { flags } = await this.parse(MyCommand)
    
    // Access collected data
    const data = await this.loadData('5etools')
    
    // Perform command logic
    await this.processData(data, flags.output)
  }
  
  private async processData(data: any, output: string): Promise<void> {
    // Implementation
  }
}
```

**Properties:**
- `dataDirectory: string` - Path to collected data directory
- `pluginConfig: PluginConfig` - Current plugin configuration

**Methods:**
- `loadData(source: string): Promise<any>` - Load collected data for a source
- `saveData(source: string, data: any): Promise<void>` - Save data for a source
- `getDataPath(source: string): string` - Get path to source data directory

#### `Command`

Standard oclif Command class for non-data commands.

```typescript
import { Command, Flags } from '@oclif/core'

export class ConfigCommand extends Command {
  static description = 'Configure plugin settings'
  
  static flags = {
    set: Flags.string({
      description: 'set configuration value',
      multiple: true
    })
  }
  
  async run(): Promise<void> {
    const { flags } = await this.parse(ConfigCommand)
    // Implementation
  }
}
```

### Data Management

#### `DataManager`

Central data management utilities.

```typescript
import { DataManager } from 'ttrpg-data-forge'

// Initialize data manager
const dataManager = new DataManager()

// Load data
const spells = await dataManager.load('5etools', 'spells')

// Save data
await dataManager.save('5etools', 'spells', processedSpells)

// Check if data exists
const exists = await dataManager.exists('5etools', 'monsters')

// Get data schema
const schema = dataManager.getSchema('5etools', 'spells')
```

**Methods:**
- `load(source: string, type?: string): Promise<any>` - Load data
- `save(source: string, type: string, data: any): Promise<void>` - Save data
- `exists(source: string, type?: string): Promise<boolean>` - Check existence
- `getSchema(source: string, type: string): Schema` - Get data schema
- `validate(source: string, type: string, data: any): ValidationResult` - Validate data

#### `SourceClient`

Base class for data source clients.

```typescript
import { SourceClient, CollectionOptions } from 'ttrpg-data-forge'

export class MySourceClient extends SourceClient {
  constructor(config: SourceConfig) {
    super(config)
  }
  
  async collect(options: CollectionOptions): Promise<CollectionResult> {
    // Implement data collection logic
    const data = await this.fetchData(options)
    
    return {
      source: this.name,
      collected: data.length,
      timestamp: new Date(),
      data
    }
  }
  
  async validate(data: any): Promise<ValidationResult> {
    // Implement validation logic
  }
  
  private async fetchData(options: CollectionOptions): Promise<any[]> {
    // Implementation
  }
}
```

**Properties:**
- `name: string` - Source name
- `config: SourceConfig` - Source configuration
- `rateLimiter: RateLimiter` - Rate limiting instance

**Methods:**
- `collect(options: CollectionOptions): Promise<CollectionResult>` - Collect data
- `validate(data: any): Promise<ValidationResult>` - Validate collected data
- `getMetadata(): SourceMetadata` - Get source metadata

### Configuration

#### `Config`

Configuration management for plugins and sources.

```typescript
import { Config } from 'ttrpg-data-forge'

// Load configuration
const config = await Config.load()

// Get plugin configuration
const pluginConfig = config.getPlugin('forge-plugin-5etools')

// Set configuration value
await config.set('sources.5etools.apiKey', 'your-api-key')

// Save configuration
await config.save()
```

**Methods:**
- `static load(): Promise<Config>` - Load configuration
- `get(key: string): any` - Get configuration value
- `set(key: string, value: any): Promise<void>` - Set configuration value
- `getPlugin(name: string): PluginConfig` - Get plugin configuration
- `save(): Promise<void>` - Save configuration

### Plugin Management

#### `PluginManager`

Manage plugin installation, discovery, and loading.

```typescript
import { PluginManager } from 'ttrpg-data-forge'

const pluginManager = new PluginManager()

// Install plugin
await pluginManager.install('forge-plugin-5etools')

// List installed plugins
const plugins = await pluginManager.list()

// Load plugin
const plugin = await pluginManager.load('forge-plugin-5etools')

// Uninstall plugin
await pluginManager.uninstall('forge-plugin-5etools')
```

**Methods:**
- `install(name: string, version?: string): Promise<void>` - Install plugin
- `uninstall(name: string): Promise<void>` - Uninstall plugin
- `list(): Promise<PluginInfo[]>` - List installed plugins
- `load(name: string): Promise<Plugin>` - Load plugin
- `discover(): Promise<PluginInfo[]>` - Discover available plugins

## Type Definitions

### Core Types

```typescript
// Configuration types
export interface PluginConfig {
  name: string
  version: string
  enabled: boolean
  settings: Record<string, any>
}

export interface SourceConfig {
  name: string
  baseUrl: string
  apiKey?: string
  rateLimit?: {
    requests: number
    window: number
  }
  timeout?: number
}

// Data types
export interface CollectionOptions {
  sources?: string[]
  types?: string[]
  incremental?: boolean
  parallel?: boolean
  filter?: FilterOptions
}

export interface CollectionResult {
  source: string
  collected: number
  skipped?: number
  errors?: Error[]
  timestamp: Date
  data: any[]
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

// Plugin types
export interface PluginInfo {
  name: string
  version: string
  description: string
  author: string
  main: string
  commands: string[]
  dependencies: Record<string, string>
}

export interface Plugin {
  info: PluginInfo
  commands: Command[]
  client?: SourceClient
}
```

### Data Schema Types

```typescript
// Schema definition
export interface Schema {
  type: 'object' | 'array' | 'string' | 'number' | 'boolean'
  properties?: Record<string, Schema>
  items?: Schema
  required?: string[]
  description?: string
  examples?: any[]
}

// Validation types
export interface ValidationError {
  path: string
  message: string
  value: any
  schema: Schema
}

export interface ValidationWarning {
  path: string
  message: string
  suggestion?: string
}
```

### Generator Types

```typescript
export interface GenerateOptions {
  format: 'json' | 'yaml' | 'markdown' | 'html' | 'pdf'
  output: string
  template?: string
  filter?: FilterOptions
  transform?: TransformOptions
}

export interface FilterOptions {
  source?: string | string[]
  type?: string | string[]
  tags?: string[]
  custom?: (item: any) => boolean
}

export interface TransformOptions {
  groupBy?: string
  sortBy?: string
  fields?: string[]
  rename?: Record<string, string>
}
```

## Utility Functions

### Data Processing

```typescript
import { 
  filterData, 
  transformData, 
  validateSchema,
  mergeData 
} from 'ttrpg-data-forge/utils'

// Filter data
const filteredSpells = filterData(spells, {
  level: { $gte: 1, $lte: 3 },
  school: ['evocation', 'enchantment']
})

// Transform data
const transformedData = transformData(data, {
  groupBy: 'source',
  sortBy: 'name',
  fields: ['name', 'description', 'source']
})

// Validate against schema
const result = validateSchema(data, schema)

// Merge multiple datasets
const merged = mergeData([dataset1, dataset2], {
  key: 'id',
  strategy: 'merge'
})
```

### File Operations

```typescript
import { 
  readDataFile, 
  writeDataFile, 
  ensureDir,
  copyTemplate 
} from 'ttrpg-data-forge/utils'

// Read data file
const data = await readDataFile('./data/spells.json')

// Write data file
await writeDataFile('./output/processed.json', processedData)

// Ensure directory exists
await ensureDir('./output/images')

// Copy template
await copyTemplate('./templates/spell.hbs', './custom/spell.hbs')
```

### Template Engine

```typescript
import { renderTemplate, registerHelper } from 'ttrpg-data-forge/templates'

// Register custom helper
registerHelper('capitalize', (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

// Render template
const html = await renderTemplate('spell.hbs', {
  spell: spellData,
  options: { includeImages: true }
})
```

## Plugin Hooks

### Lifecycle Hooks

```typescript
export class MyPlugin {
  // Called when plugin is loaded
  async onLoad(): Promise<void> {
    console.log('Plugin loaded')
  }
  
  // Called before data collection
  async beforeCollect(options: CollectionOptions): Promise<CollectionOptions> {
    // Modify collection options
    return options
  }
  
  // Called after data collection
  async afterCollect(result: CollectionResult): Promise<CollectionResult> {
    // Process collection result
    return result
  }
  
  // Called before generation
  async beforeGenerate(options: GenerateOptions): Promise<GenerateOptions> {
    // Modify generation options
    return options
  }
  
  // Called after generation
  async afterGenerate(result: GenerationResult): Promise<void> {
    console.log(`Generated ${result.files.length} files`)
  }
  
  // Called when plugin is unloaded
  async onUnload(): Promise<void> {
    console.log('Plugin unloaded')
  }
}
```

### Event System

```typescript
import { EventEmitter } from 'ttrpg-data-forge/events'

// Subscribe to events
EventEmitter.on('data:collected', (result: CollectionResult) => {
  console.log(`Collected ${result.collected} items from ${result.source}`)
})

EventEmitter.on('generation:complete', (result: GenerationResult) => {
  console.log(`Generated files: ${result.files.join(', ')}`)
})

// Emit custom events
EventEmitter.emit('plugin:custom', { data: 'custom event data' })
```

## Error Handling

### Custom Error Types

```typescript
import { 
  CollectionError, 
  ValidationError, 
  GenerationError,
  PluginError 
} from 'ttrpg-data-forge/errors'

// Collection errors
try {
  await client.collect(options)
} catch (error) {
  if (error instanceof CollectionError) {
    console.error(`Collection failed: ${error.message}`)
    console.error(`Source: ${error.source}`)
    console.error(`Details:`, error.details)
  }
}

// Validation errors
try {
  const result = validateSchema(data, schema)
  if (!result.valid) {
    throw new ValidationError('Schema validation failed', result.errors)
  }
} catch (error) {
  if (error instanceof ValidationError) {
    error.errors.forEach(err => {
      console.error(`Validation error at ${err.path}: ${err.message}`)
    })
  }
}
```

### Error Recovery

```typescript
import { RetryManager, CircuitBreaker } from 'ttrpg-data-forge/resilience'

// Retry failed operations
const retryManager = new RetryManager({
  maxRetries: 3,
  backoff: 'exponential',
  baseDelay: 1000
})

const result = await retryManager.execute(async () => {
  return await client.collect(options)
})

// Circuit breaker for external services
const circuitBreaker = new CircuitBreaker({
  threshold: 5,
  timeout: 30000,
  resetTimeout: 60000
})

const data = await circuitBreaker.execute(async () => {
  return await fetchExternalData()
})
```

## Testing Utilities

### Mock Helpers

```typescript
import { 
  mockCommand, 
  mockClient, 
  mockData,
  TestRunner 
} from 'ttrpg-data-forge/testing'

// Mock command for testing
const command = mockCommand(MyCommand, {
  flags: { output: './test-output' },
  config: { dataDirectory: './test-data' }
})

// Mock client
const client = mockClient('5etools', {
  mockData: sampleSpells,
  delay: 100
})

// Run tests
const runner = new TestRunner()
await runner.runCommand(command)
```

### Test Data Generation

```typescript
import { generateTestData } from 'ttrpg-data-forge/testing'

// Generate sample spell data
const testSpells = generateTestData('spells', {
  count: 10,
  schema: spellSchema,
  seed: 'consistent-test-data'
})

// Generate sample monster data
const testMonsters = generateTestData('monsters', {
  count: 5,
  template: 'balanced-encounters'
})
```

## Plugin Development Examples

### Complete Plugin Structure

```typescript
// src/index.ts
export { default as CollectCommand } from './commands/collect'
export { default as GenerateCommand } from './commands/generate'
export { default as Client } from './client'

// src/commands/collect.ts
import { RunPluginCommand } from 'ttrpg-data-forge'
import Client from '../client'

export default class CollectCommand extends RunPluginCommand {
  static description = 'Collect data from my source'
  
  async run(): Promise<void> {
    const client = new Client(this.pluginConfig)
    const result = await client.collect()
    
    await this.saveData('mysource', result.data)
    this.log(`Collected ${result.collected} items`)
  }
}

// src/client.ts
import { SourceClient } from 'ttrpg-data-forge'

export default class MySourceClient extends SourceClient {
  async collect(): Promise<CollectionResult> {
    // Implementation
  }
}

// package.json
{
  "name": "forge-plugin-mysource",
  "version": "1.0.0",
  "main": "lib/index.js",
  "oclif": {
    "commands": "./lib/commands",
    "topicSeparator": ":"
  }
}
```

This comprehensive API reference provides all the tools needed to develop plugins and extend the TTRPG Data Forge framework. For more examples and detailed implementation guides, see the [Plugin Development Guide](plugin-development.md).
