# TTRPG Data Forge

Welcome to TTRPG Data Forge, a powerful CLI framework for collecting and processing tabletop RPG data from various sources through a modular plugin system.

## What is TTRPG Data Forge?

TTRPG Data Forge is a command-line tool designed to serve as a base framework for processing TTRPG (Tabletop Role-Playing Game) data. It uses a plugin-based architecture where each plugin handles a different TTRPG data source like 5etools, D&D Beyond, or other platforms.

## Key Features

- **🔌 Plugin-based Architecture**: Extensible system for adding new TTRPG data sources
- **📊 Standardized Commands**: All plugins implement `collect` and `generate` commands
- **🛠️ CLI Framework**: Built on oclif for robust command-line interface
- **📝 Data Processing**: Convert various TTRPG data formats to standardized outputs
- **🏗️ TypeScript**: Full TypeScript support with type safety

## Core Concepts

### Plugin System
Each plugin follows the naming convention `forge-plugin-{sourcename}` and provides:
- **`collect` command**: Gathers data from the source
- **`generate` command**: Processes collected data into desired formats

### Data Flow
1. **Install** plugins for your desired TTRPG sources
2. **Collect** data using the `collect` command
3. **Generate** processed output using plugin-specific generation commands

## Quick Start

{%
    include-markdown "getting-started.md"
    start="## Installation"
    end="## Next Steps"
%}

## Documentation Structure

- **[Getting Started](getting-started.md)** - Installation and basic usage
- **[Plugin Development](plugin-development.md)** - Create your own plugins
- **[Architecture](architecture.md)** - Understanding the framework
- **[Commands](commands/)** - Detailed command reference
- **[Examples](examples.md)** - Real-world usage examples

## Community and Support

- **Issues**: [GitHub Issues](https://github.com/ttrpg-data-forge/core/issues)
- **Repository**: [GitHub](https://github.com/ttrpg-data-forge/core)
- **License**: [MIT License](https://github.com/ttrpg-data-forge/core/blob/main/LICENSE)
