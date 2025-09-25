# TTRPG Data Forge

A powerful CLI framework for collecting and processing tabletop RPG data from various sources through a modular plugin system.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/ttrpg-data-forge.svg)](https://npmjs.org/package/ttrpg-data-forge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

TTRPG Data Forge is designed as a base CLI framework that enables plugin-based data collection and generation from various TTRPG sources like 5etools, D&D Beyond, and others. Each plugin provides standardized `collect` and `generate` commands for their respective data sources.

## Features

- 🔌 **Plugin-based Architecture**: Extensible system for adding new TTRPG data sources
- 📊 **Standardized Commands**: All plugins implement `collect` and `generate` commands
- 🛠️ **CLI Framework**: Built on oclif for robust command-line interface
- 📝 **Data Processing**: Convert various TTRPG data formats to standardized outputs
- 🏗️ **TypeScript**: Full TypeScript support with type safety

## Quick Start

### Installation

```bash
npm install -g ttrpg-data-forge
```

### Install Plugins

```bash
# Install source plugins (examples)
forge plugins install forge-plugin-5etools
forge plugins install forge-plugin-dndbeyond
```

### Basic Usage

```bash
# Collect data from all installed source plugins
forge collect

# Collect data from specific sources
forge collect --sources 5etools,dndbeyond

# Generate output from collected data
forge generate

# List available plugins
forge plugins
```

## Plugin Development

To create a new plugin, follow the naming convention `forge-plugin-{sourcename}` and implement the required commands:

- `collect` - Collect data from your source
- `generate` - Generate output from collected data

See the [Plugin Development Guide](https://ttrpg-data-forge.github.io/core/plugin-development/) for detailed instructions.

## Documentation

Full documentation is available at: https://ttrpg-data-forge.github.io/core/

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

<!-- toc -->
* [TTRPG Data Forge](#ttrpg-data-forge)
* [Install source plugins (examples)](#install-source-plugins-examples)
* [Collect data from all installed source plugins](#collect-data-from-all-installed-source-plugins)
* [Collect data from specific sources](#collect-data-from-specific-sources)
* [Generate output from collected data](#generate-output-from-collected-data)
* [List available plugins](#list-available-plugins)
* [Usage](#usage)
* [Commands](#commands)
* [Command Topics](#command-topics)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g ttrpg-data-forge
$ forge COMMAND
running command...
$ forge (--version)
ttrpg-data-forge/0.0.0 win32-x64 node-v22.17.0
$ forge --help [COMMAND]
USAGE
  $ forge COMMAND
...
```
<!-- usagestop -->

# Commands
<!-- commands -->
# Command Topics

* [`forge collect`](docs/commands/collect.md) - collects data for all source plugins
* [`forge generate`](docs/commands/generate.md) - generates output from collected data
* [`forge help`](docs/commands/help.md) - Display help for forge.
* [`forge plugins`](docs/commands/plugins.md) - List installed plugins.
* [`forge version`](docs/commands/version.md)

<!-- commandsstop -->
