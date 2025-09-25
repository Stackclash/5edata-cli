# Getting Started

This guide will help you get up and running with TTRPG Data Forge quickly.

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Install the CLI

```bash
# Install globally via npm
npm install -g ttrpg-data-forge

# Or install via yarn
yarn global add ttrpg-data-forge
```

### Verify Installation

```bash
forge --version
forge --help
```

## Installing Plugins

TTRPG Data Forge uses a plugin system to support different data sources. You need to install plugins for the sources you want to work with.

### Available Plugins

| Plugin | Source | Description |
|--------|--------|-------------|
| `forge-plugin-5etools` | 5etools | D&D 5e data from 5etools.com |
| `forge-plugin-dndbeyond` | D&D Beyond | Character data from D&D Beyond |

### Install Plugins

```bash
# List available plugins
forge plugins

# Install a specific plugin
forge plugins install forge-plugin-5etools

# Install multiple plugins
forge plugins install forge-plugin-5etools forge-plugin-dndbeyond

# List installed plugins
forge plugins --installed
```

## Basic Usage

### Collect Data

The `collect` command gathers data from your installed source plugins.

```bash
# Collect from all installed plugins
forge collect

# Collect from specific sources
forge collect --sources 5etools

# Collect from multiple specific sources
forge collect --sources 5etools,dndbeyond
```

### Generate Output

Each plugin provides its own generation commands. These are typically namespaced under the plugin name.

```bash
# List available commands (including plugin commands)
forge --help

# Example plugin commands (will vary by plugin)
forge 5etools:generate --format markdown
forge dndbeyond:generate --character-id 12345
```

## Configuration

### Plugin Configuration

Each plugin may have its own configuration requirements. Check the plugin's documentation for specific setup instructions.

### Data Directory

By default, TTRPG Data Forge stores data in:
- **Windows**: `%USERPROFILE%\.ttrpg-data-forge`
- **macOS/Linux**: `~/.ttrpg-data-forge`

## Common Workflows

### 1. Full Data Processing Pipeline

```bash
# 1. Install required plugins
forge plugins install forge-plugin-5etools

# 2. Collect data from sources
forge collect --sources 5etools

# 3. Generate processed output
forge 5etools:generate --format markdown --output ./docs
```

### 2. Working with Multiple Sources

```bash
# Install multiple plugins
forge plugins install forge-plugin-5etools forge-plugin-dndbeyond

# Collect from all sources
forge collect

# Or collect selectively
forge collect --sources 5etools
forge collect --sources dndbeyond
```

## Troubleshooting

### Plugin Installation Issues

```bash
# Clear plugin cache
forge plugins:uninstall --all
forge plugins:clear

# Reinstall plugins
forge plugins install forge-plugin-5etools
```

### Data Collection Problems

```bash
# Run collect with verbose output
forge collect --verbose

# Check plugin status
forge plugins --installed
```

### Getting Help

```bash
# General help
forge --help

# Command-specific help
forge collect --help

# Plugin-specific help
forge 5etools:generate --help
```

## Next Steps

- Learn about [Plugin Development](plugin-development.md) to create your own plugins
- Explore the [Architecture](architecture.md) to understand how the system works
- Check out [Examples](examples.md) for real-world usage scenarios
- Browse the detailed [Command Reference](commands/) for all available commands
