# Examples

Real-world usage examples and common workflows for TTRPG Data Forge.

## Basic Workflows

### Example 1: Setting up 5etools Data Processing

This example shows how to set up data collection and generation from 5etools.

```bash
# Install the base framework
npm install -g ttrpg-data-forge

# Install the 5etools plugin
forge plugins install forge-plugin-5etools

# Verify installation
forge plugins --installed
```

```bash
# Collect all 5etools data
forge collect --sources 5etools

# Generate markdown documentation
forge 5etools:generate --format markdown --output ./docs/5e

# Generate specific content types
forge 5etools:generate --format markdown --content spells --output ./spells
forge 5etools:generate --format markdown --content monsters --output ./monsters
```

### Example 2: Multi-Source Data Collection

Working with multiple TTRPG data sources simultaneously.

```bash
# Install multiple plugins
forge plugins install forge-plugin-5etools
forge plugins install forge-plugin-dndbeyond
forge plugins install forge-plugin-pathfinder

# List available sources
forge collect --help

# Collect from all sources
forge collect

# Collect from specific sources
forge collect --sources 5etools,pathfinder

# Generate combined output
forge generate --sources 5etools,pathfinder --format markdown
```

### Example 3: Automated Data Pipeline

Setting up an automated pipeline for regular data updates.

```bash
#!/bin/bash
# update-ttrpg-data.sh

echo "Starting TTRPG data update pipeline..."

# Collect latest data
forge collect --sources 5etools

# Generate documentation
forge 5etools:generate --format markdown --output ./docs

# Generate JSON API data
forge 5etools:generate --format json --output ./api/data

# Generate search index
forge 5etools:index --output ./search

echo "Pipeline completed successfully!"
```

## Plugin-Specific Examples

### 5etools Plugin Examples

```bash
# Collect specific 5e content
forge collect --sources 5etools

# Generate spell reference
forge 5etools:generate \
  --content spells \
  --format markdown \
  --output ./docs/spells \
  --template custom-spell-template

# Generate monster manual
forge 5etools:generate \
  --content monsters \
  --format html \
  --output ./website/monsters \
  --include-images

# Export to VTT format
forge 5etools:export \
  --format foundry \
  --content adventures \
  --output ./foundry-modules
```

### D&D Beyond Plugin Examples

```bash
# Collect character data (requires authentication)
export DNDBEYOND_USERNAME="your-username"
export DNDBEYOND_PASSWORD="your-password"

forge collect --sources dndbeyond

# Generate character sheets
forge dndbeyond:generate \
  --character-id 12345 \
  --format pdf \
  --output ./character-sheets

# Export homebrew content
forge dndbeyond:export \
  --content homebrew \
  --format json \
  --output ./homebrew-backup
```

## Advanced Usage Patterns

### Custom Output Templates

```bash
# Create custom template directory
mkdir -p ./templates/custom

# Use custom templates
forge 5etools:generate \
  --format markdown \
  --template-dir ./templates/custom \
  --output ./custom-docs
```

Example custom template (`./templates/custom/spell.hbs`):

```handlebars
# {{name}}

**Level:** {{level}} {{school}}
**Casting Time:** {{time}}
**Range:** {{range}}
**Components:** {{components}}
**Duration:** {{duration}}

{{description}}

{{#if higher_level}}
**At Higher Levels:** {{higher_level}}
{{/if}}

---
*Source: {{source}}*
```

### Filtering and Transformation

```bash
# Generate only official content
forge 5etools:generate \
  --filter "source:PHB|DMG|MM" \
  --format markdown

# Generate with custom naming
forge 5etools:generate \
  --format json \
  --transform "name:kebabCase" \
  --output ./api/data

# Generate with custom grouping
forge 5etools:generate \
  --format markdown \
  --group-by source \
  --output ./docs/by-source
```

### Validation and Quality Assurance

```bash
# Validate collected data
forge validate --sources 5etools --strict

# Check for missing required fields
forge validate --check missing-fields

# Generate validation report
forge validate --sources all --output ./validation-report.json
```

## Integration Examples

### GitHub Actions Workflow

`.github/workflows/update-docs.yml`:

```yaml
name: Update TTRPG Documentation

on:
  schedule:
    - cron: '0 2 * * 0'  # Weekly on Sunday at 2 AM
  workflow_dispatch:

jobs:
  update-docs:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install TTRPG Data Forge
      run: |
        npm install -g ttrpg-data-forge
        forge plugins install forge-plugin-5etools
        
    - name: Collect Data
      run: forge collect --sources 5etools
      
    - name: Generate Documentation
      run: |
        forge 5etools:generate --format markdown --output ./docs
        
    - name: Commit Changes
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add .
        git commit -m "Update TTRPG documentation" || exit 0
        git push
```

### Docker Usage

`Dockerfile`:

```dockerfile
FROM node:18-alpine

# Install TTRPG Data Forge
RUN npm install -g ttrpg-data-forge

# Install plugins
RUN forge plugins install forge-plugin-5etools

# Create working directory
WORKDIR /app

# Copy scripts
COPY scripts/ ./scripts/

# Default command
CMD ["forge", "collect"]
```

Usage:

```bash
# Build image
docker build -t ttrpg-data-forge .

# Run data collection
docker run -v $(pwd)/data:/app/data ttrpg-data-forge

# Run with custom command
docker run -v $(pwd)/output:/app/output \
  ttrpg-data-forge forge 5etools:generate --output /app/output
```

### API Server Integration

`server.js`:

```javascript
const express = require('express')
const { exec } = require('child_process')
const app = express()

// Endpoint to trigger data collection
app.post('/api/collect/:source', (req, res) => {
  const source = req.params.source
  
  exec(`forge collect --sources ${source}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    
    res.json({ 
      message: 'Collection completed',
      output: stdout 
    })
  })
})

// Endpoint to generate documentation
app.post('/api/generate/:source', (req, res) => {
  const source = req.params.source
  const format = req.body.format || 'json'
  
  exec(`forge ${source}:generate --format ${format}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    
    res.json({
      message: 'Generation completed',
      output: stdout
    })
  })
})

app.listen(3000, () => {
  console.log('TTRPG Data Forge API server running on port 3000')
})
```

## Troubleshooting Examples

### Common Issues and Solutions

#### Plugin Installation Problems

```bash
# Clear plugin cache
forge plugins uninstall --all
rm -rf ~/.ttrpg-data-forge/plugins

# Reinstall with verbose output
forge plugins install forge-plugin-5etools --verbose

# Check plugin status
forge plugins --installed --verbose
```

#### Data Collection Failures

```bash
# Run with debug output
DEBUG=* forge collect --sources 5etools

# Check network connectivity
curl -I https://5e.tools

# Verify plugin configuration
forge 5etools:config --check
```

#### Generation Issues

```bash
# Verify collected data exists
ls -la ~/.ttrpg-data-forge/data/

# Run generation with verbose output
forge 5etools:generate --verbose --format markdown

# Check output directory permissions
ls -la ./output/
```

### Performance Optimization

```bash
# Parallel collection from multiple sources
forge collect --sources 5etools,dndbeyond --parallel

# Incremental updates only
forge collect --sources 5etools --incremental

# Generate with caching
forge 5etools:generate --format markdown --cache
```

## Real-World Case Studies

### Case Study 1: D&D Campaign Documentation

A DM setting up comprehensive campaign documentation:

```bash
# 1. Install and configure
forge plugins install forge-plugin-5etools forge-plugin-dndbeyond

# 2. Collect official content
forge collect --sources 5etools

# 3. Generate player handbook
forge 5etools:generate \
  --content "spells,classes,races" \
  --format markdown \
  --output ./campaign/player-guide

# 4. Generate DM resources
forge 5etools:generate \
  --content "monsters,adventures,items" \
  --format html \
  --output ./campaign/dm-resources

# 5. Create quick reference
forge 5etools:generate \
  --content "conditions,rules" \
  --format pdf \
  --output ./campaign/quick-ref
```

### Case Study 2: Homebrew Content Management

Managing and sharing homebrew content:

```bash
# 1. Collect official baseline
forge collect --sources 5etools

# 2. Import homebrew content
forge homebrew:import --file ./my-homebrew.json

# 3. Validate homebrew against official content
forge validate --homebrew --strict

# 4. Generate combined documentation
forge generate \
  --sources 5etools,homebrew \
  --format markdown \
  --output ./complete-guide

# 5. Export for sharing
forge homebrew:export \
  --format gmbinder \
  --output ./homebrew-share
```

### Case Study 3: Multi-System Campaign

Running campaigns across multiple RPG systems:

```bash
# Install multiple system plugins
forge plugins install forge-plugin-5etools
forge plugins install forge-plugin-pathfinder
forge plugins install forge-plugin-starfinder

# Collect all system data
forge collect --sources 5etools,pathfinder,starfinder

# Generate system comparison
forge compare:systems \
  --systems 5e,pathfinder,starfinder \
  --format html \
  --output ./system-comparison

# Generate unified monster manual
forge generate:monsters \
  --sources all \
  --format markdown \
  --group-by system \
  --output ./universal-bestiary
```
