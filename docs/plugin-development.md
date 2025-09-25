# Plugin Development

Learn how to create plugins for TTRPG Data Forge to support new data sources.

## Overview

TTRPG Data Forge plugins extend the framework to support different TTRPG data sources. Each plugin follows a standardized structure and implements required commands.

## Plugin Requirements

### Naming Convention

Plugins must follow the naming pattern: `forge-plugin-{sourcename}`

Examples:
- `forge-plugin-5etools` (for 5etools.com)
- `forge-plugin-dndbeyond` (for D&D Beyond)
- `forge-plugin-pathfinder` (for Pathfinder data)

### Required Commands

Every plugin must implement:

1. **`collect`** - Collect data from the source
2. **`generate`** - Generate output from collected data

### Optional Commands

Plugins may implement additional commands as needed:
- Data validation commands
- Import/export utilities
- Source-specific tools

## Creating a Plugin

### 1. Initialize Plugin Project

```bash
# Create new oclif plugin
npx oclif generate plugin forge-plugin-mysource
cd forge-plugin-mysource

# Install TTRPG Data Forge as dependency
npm install ttrpg-data-forge
```

### 2. Configure package.json

```json
{
  "name": "forge-plugin-mysource",
  "version": "1.0.0",
  "description": "TTRPG Data Forge plugin for MySource",
  "keywords": ["ttrpg-data-forge", "plugin", "mysource"],
  "oclif": {
    "commands": "./lib/commands",
    "bin": "forge-plugin-mysource",
    "plugins": [
      "@oclif/plugin-help"
    ]
  }
}
```

### 3. Implement the Collect Command

Create `src/commands/collect.ts`:

```typescript
import { Args, Command, Flags } from '@oclif/core'

export default class Collect extends Command {
  static description = 'Collect data from MySource'
  
  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --format json'
  ]

  static flags = {
    format: Flags.string({
      char: 'f',
      description: 'output format',
      options: ['json', 'yaml'],
      default: 'json'
    }),
    output: Flags.string({
      char: 'o',
      description: 'output directory',
      default: './data'
    })
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Collect)
    
    this.log('Collecting data from MySource...')
    
    // Implement your data collection logic here
    const data = await this.collectFromSource()
    
    // Save collected data
    await this.saveData(data, flags.output, flags.format)
    
    this.log(`Data collected and saved to ${flags.output}`)
  }

  private async collectFromSource(): Promise<any> {
    // Implement source-specific collection logic
    // This could involve:
    // - API calls
    // - File parsing
    // - Web scraping (with appropriate permissions)
    // - Database queries
    
    return {}
  }

  private async saveData(data: any, outputDir: string, format: string): Promise<void> {
    // Implement data saving logic
    // Save in the specified format and location
  }
}
```

### 4. Implement the Generate Command

Create `src/commands/generate.ts`:

```typescript
import { Command, Flags } from '@oclif/core'

export default class Generate extends Command {
  static description = 'Generate output from collected MySource data'
  
  static examples = [
    '<%= config.bin %> <%= command.id %> --format markdown',
    '<%= config.bin %> <%= command.id %> --input ./data --output ./docs'
  ]

  static flags = {
    input: Flags.string({
      char: 'i',
      description: 'input directory with collected data',
      default: './data'
    }),
    output: Flags.string({
      char: 'o',
      description: 'output directory for generated files',
      default: './output'
    }),
    format: Flags.string({
      char: 'f',
      description: 'output format',
      options: ['markdown', 'html', 'json'],
      default: 'markdown'
    })
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Generate)
    
    this.log('Generating output from MySource data...')
    
    // Load collected data
    const data = await this.loadData(flags.input)
    
    // Generate output
    await this.generateOutput(data, flags.output, flags.format)
    
    this.log(`Output generated in ${flags.output}`)
  }

  private async loadData(inputDir: string): Promise<any> {
    // Load previously collected data
    return {}
  }

  private async generateOutput(data: any, outputDir: string, format: string): Promise<void> {
    // Generate output in the specified format
    // This could involve:
    // - Markdown generation
    // - HTML templating
    // - JSON transformation
    // - PDF generation
  }
}
```

## Plugin Patterns

### Configuration Management

```typescript
import { Config } from '@oclif/core'

export class MySourceConfig {
  private config: Config

  constructor(config: Config) {
    this.config = config
  }

  get apiKey(): string {
    return process.env.MYSOURCE_API_KEY || ''
  }

  get baseUrl(): string {
    return process.env.MYSOURCE_BASE_URL || 'https://api.mysource.com'
  }
}
```

### Data Validation

```typescript
import Ajv from 'ajv'

export class DataValidator {
  private ajv: Ajv

  constructor() {
    this.ajv = new Ajv()
  }

  validateCollectedData(data: any): boolean {
    const schema = {
      type: 'object',
      properties: {
        // Define your data schema
      },
      required: ['id', 'name']
    }

    return this.ajv.validate(schema, data) as boolean
  }
}
```

### Error Handling

```typescript
export class MySourceError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'MySourceError'
  }
}

// Usage in commands
try {
  await this.collectFromSource()
} catch (error) {
  if (error instanceof MySourceError) {
    this.error(`MySource error: ${error.message}`, { code: error.code })
  }
  throw error
}
```

## Testing Your Plugin

### Unit Tests

```typescript
import { expect, test } from '@oclif/test'

describe('collect', () => {
  test
    .stdout()
    .command(['collect'])
    .it('runs collect command', ctx => {
      expect(ctx.stdout).to.contain('Collecting data from MySource')
    })

  test
    .stdout()
    .command(['collect', '--format', 'yaml'])
    .it('runs collect with yaml format', ctx => {
      expect(ctx.stdout).to.contain('Data collected')
    })
})
```

### Integration Tests

```typescript
import { expect, test } from '@oclif/test'
import * as fs from 'fs'

describe('integration', () => {
  test
    .stdout()
    .command(['collect', '--output', './test-data'])
    .it('collects data to specified directory', ctx => {
      expect(fs.existsSync('./test-data')).to.be.true
      expect(ctx.stdout).to.contain('Data collected')
    })
})
```

## Publishing Your Plugin

### 1. Prepare for Publishing

```bash
# Build the plugin
npm run build

# Test the plugin locally
npm link
forge plugins link .

# Test installation
forge collect --help
```

### 2. Publish to npm

```bash
# Login to npm
npm login

# Publish
npm publish

# Or publish with specific tag
npm publish --tag beta
```

### 3. Register with TTRPG Data Forge

Create a pull request to add your plugin to the official plugin registry.

## Plugin Examples

### Example: File-based Data Source

```typescript
import * as fs from 'fs/promises'
import * as path from 'path'

export default class Collect extends Command {
  async collectFromSource(): Promise<any> {
    const dataDir = './source-files'
    const files = await fs.readdir(dataDir)
    
    const allData = []
    for (const file of files) {
      if (path.extname(file) === '.json') {
        const content = await fs.readFile(path.join(dataDir, file), 'utf8')
        allData.push(JSON.parse(content))
      }
    }
    
    return allData
  }
}
```

### Example: API-based Data Source

```typescript
import axios from 'axios'

export default class Collect extends Command {
  async collectFromSource(): Promise<any> {
    const apiKey = process.env.MYSOURCE_API_KEY
    const baseUrl = 'https://api.mysource.com'
    
    const response = await axios.get(`${baseUrl}/data`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })
    
    return response.data
  }
}
```

## Best Practices

1. **Follow the Plugin Naming Convention**: Always use `forge-plugin-{sourcename}`
2. **Implement Both Required Commands**: Don't skip `collect` or `generate`
3. **Handle Errors Gracefully**: Provide meaningful error messages
4. **Validate Data**: Ensure collected data meets expected schemas
5. **Document Your Plugin**: Include comprehensive README and examples
6. **Test Thoroughly**: Write unit and integration tests
7. **Use TypeScript**: Leverage type safety for better development experience
8. **Follow oclif Conventions**: Use oclif patterns for consistency

## Getting Help

- Check existing plugins for examples
- Read the [oclif documentation](https://oclif.io)
- Open an issue on the [TTRPG Data Forge repository](https://github.com/Stackclash/ttrpg-data-forge/issues)
- Join community discussions
